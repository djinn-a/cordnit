"use client";

import {
  ArrowLeftOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExportOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  HistoryOutlined,
  LayoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { arrayMove } from "@dnd-kit/sortable";
import { App, Button, Card, Dropdown, Flex, Input, Modal, Space, Tooltip, Typography, type MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HOME_SLUG, slugToPath } from "@/lib/cms/document";
import { SECTION_CATALOG } from "@/lib/cms/registry/catalog";
import { isSectionType, type SectionType } from "@/lib/cms/types";
import { convertToBlockAction } from "@/server/actions/blocks";
import { deletePageAndExitAction } from "@/server/actions/pages";
import { publishPageAction, unpublishPageAction } from "@/server/actions/publish";
import {
  addSectionAction,
  deleteSectionAction,
  detachSectionAction,
  duplicateSectionAction,
  moveSectionAction,
  toggleSectionAction,
} from "@/server/actions/sections";
import { saveTemplateAction } from "@/server/actions/templates";
import { useCmsAction } from "../hooks/useCmsAction";
import { useRevealKey } from "../hooks/useRevealKey";
import NameKeyModal from "../shared/NameKeyModal";
import StatusTag from "../shared/StatusTag";
import AddSectionModal, { type AddSource } from "./AddSectionModal";
import PageSettingsDrawer from "./PageSettingsDrawer";
import PreviewPane from "./PreviewPane";
import SectionList, { type SectionMenuAction } from "./SectionList";
import SectionPanel from "./SectionPanel";
import type { EditorData, EditorPage, EditorSection } from "./types";
import VersionsDrawer from "./VersionsDrawer";

const typeLabel = (type: SectionType) => SECTION_CATALOG[type]?.label ?? type;

type SectionRowLike = Pick<EditorSection, "id" | "label" | "isHidden" | "globalBlockId"> & { type: string; content: unknown };

export default function PageEditor({ data }: Readonly<{ data: EditorData }>) {
  const router = useRouter();
  const { modal, message } = App.useApp();
  const { run, navigate, pending } = useCmsAction();
  const revealKey = useRevealKey();

  // Server data is the source of truth; local state carries optimistic edits until the action's re-render lands.
  const [synced, setSynced] = useState(data);
  const [page, setPage] = useState<EditorPage>(data.page);
  const [sections, setSections] = useState<EditorSection[]>(data.sections);
  const [selectedId, setSelectedId] = useState<string | null>(data.sections[0]?.id ?? null);
  if (synced !== data) {
    setSynced(data);
    setPage(data.page);
    setSections(data.sections);
    // A rollback recreates sections with new ids: keep the cursor at the same position.
    if (selectedId && !data.sections.some((s) => s.id === selectedId)) {
      const index = sections.findIndex((s) => s.id === selectedId);
      setSelectedId(data.sections[Math.min(Math.max(index, 0), data.sections.length - 1)]?.id ?? null);
    }
  }

  const [dirty, setDirty] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [addAfter, setAddAfter] = useState<string | null | undefined | false>(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [converting, setConverting] = useState<EditorSection | null>(null);
  const [savingLayout, setSavingLayout] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishNote, setPublishNote] = useState("");
  const [publishErrors, setPublishErrors] = useState<Record<string, string[]>>({});

  const selected = useMemo(() => sections.find((s) => s.id === selectedId) ?? null, [sections, selectedId]);
  const blockById = useMemo(() => new Map(data.blocks.map((b) => [b.id, b])), [data.blocks]);
  const errorIds = useMemo(() => new Set(Object.keys(publishErrors)), [publishErrors]);

  const labelFor = useCallback(
    (s: EditorSection) => s.label || (s.globalBlockId ? blockById.get(s.globalBlockId)?.name : undefined) || typeLabel(s.type),
    [blockById],
  );

  const applyLock = useCallback((lockVersion: number) => {
    setPage((p) => ({ ...p, lockVersion, hasUnpublishedChanges: true }));
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const confirmDiscard = useCallback(
    (proceed: () => void) => {
      if (!dirty) return proceed();
      modal.confirm({
        title: "Discard unsaved changes?",
        content: "The section you are editing has changes that are not saved.",
        okText: "Discard",
        okButtonProps: { danger: true },
        onOk: () => {
          setDirty(false);
          proceed();
        },
      });
    },
    [dirty, modal],
  );

  const ref = { pageId: page.id, lockVersion: page.lockVersion };

  async function onMove(sectionId: string, from: number, to: number) {
    const before = sections;
    const next = arrayMove(sections, from, to);
    setSections(next);
    const result = await run(moveSectionAction, {
      ...ref,
      sectionId,
      prevId: next[to - 1]?.id ?? null,
      nextId: next[to + 1]?.id ?? null,
    });
    if (result.ok) {
      applyLock(result.data.lockVersion);
    } else {
      setSections(before);
    }
  }

  /** Shows a server-created section immediately; the action's re-render then brings canonical data. */
  function insertLocal(row: SectionRowLike, afterId: string | null | undefined) {
    if (!isSectionType(row.type)) return;
    const section: EditorSection = {
      id: row.id,
      type: row.type,
      label: row.label,
      content: (row.content ?? {}) as Record<string, unknown>,
      isHidden: row.isHidden,
      globalBlockId: row.globalBlockId,
    };
    setSections((prev) => {
      if (prev.some((s) => s.id === section.id)) return prev;
      const at = afterId === undefined ? prev.length : afterId === null ? 0 : prev.findIndex((s) => s.id === afterId) + 1;
      return [...prev.slice(0, at), section, ...prev.slice(at)];
    });
    setSelectedId(section.id);
  }

  async function onAdd(source: AddSource) {
    if (addAfter === false) return;
    const afterId = addAfter;
    const result = await run(addSectionAction, { ...ref, afterSectionId: afterId, source }, { success: "Section added" });
    setAddAfter(false);
    if (result.ok) {
      applyLock(result.data.lockVersion);
      insertLocal(result.data.section, afterId);
    }
  }

  function onSectionAction(action: SectionMenuAction, s: EditorSection) {
    switch (action) {
      case "addBelow":
        setAddAfter(s.id);
        return;
      case "duplicate":
        void run(duplicateSectionAction, { ...ref, sectionId: s.id }, { success: "Section duplicated" }).then((r) => {
          if (r.ok) {
            applyLock(r.data.lockVersion);
            insertLocal(r.data.section, s.id);
          }
        });
        return;
      case "toggle":
        void run(
          toggleSectionAction,
          { ...ref, sectionId: s.id, isHidden: !s.isHidden },
          { success: s.isHidden ? "Section shown" : "Section hidden from the page" },
        ).then((r) => {
          if (r.ok) {
            applyLock(r.data.lockVersion);
            setSections((all) => all.map((x) => (x.id === s.id ? { ...x, isHidden: !s.isHidden } : x)));
          }
        });
        return;
      case "convert":
        setConverting(s);
        return;
      case "detach":
        detach(s);
        return;
      case "delete":
        modal.confirm({
          title: `Delete “${labelFor(s)}”?`,
          content: "It is removed from the draft. The live page changes only when you publish.",
          okText: "Delete",
          okButtonProps: { danger: true },
          onOk: async () => {
            const r = await run(deleteSectionAction, { ...ref, sectionId: s.id }, { success: "Section deleted" });
            if (r.ok) {
              applyLock(r.data.lockVersion);
              setSections((all) => all.filter((x) => x.id !== s.id));
              if (selectedId === s.id) setSelectedId(null);
            }
          },
        });
    }
  }

  function detach(s: EditorSection) {
    modal.confirm({
      title: "Detach from Global Block?",
      content: "This page gets its own editable copy. Future block edits will no longer apply here.",
      okText: "Detach",
      onOk: async () => {
        const r = await run(detachSectionAction, { ...ref, sectionId: s.id }, { success: "Detached. You can now edit it here." });
        if (r.ok) {
          applyLock(r.data.lockVersion);
        }
      },
    });
  }

  async function publish() {
    const result = await run(publishPageAction, { ...ref, note: publishNote.trim() || undefined }, { silentValidation: true });
    if (result.ok) {
      setPublishErrors({});
      setPublishOpen(false);
      setPublishNote("");
      message.success(`Published v${result.data.version}. The live page is updated.`);
      setPage((p) => ({ ...p, lockVersion: result.data.lockVersion, hasUnpublishedChanges: false, publishedVersion: result.data.version, liveSlug: result.data.slug }));
      return;
    }
    if (result.error.code === "VALIDATION") {
      const bySection: Record<string, string[]> = {};
      for (const [key, msgs] of Object.entries(result.error.fieldErrors ?? {})) {
        if (key.startsWith("section:")) bySection[key.slice(8)] = msgs;
      }
      setPublishErrors(bySection);
      setPublishOpen(false);
      const first = Object.keys(bySection)[0];
      if (first) confirmDiscard(() => setSelectedId(first));
      message.error(result.error.message);
    }
  }

  const moreItems: MenuProps["items"] = [
    { key: "preview", icon: <ExportOutlined />, label: <a href={`/preview/${page.id}`} target="_blank" rel="noreferrer">Open draft preview</a> },
    page.liveSlug
      ? { key: "live", icon: <ExportOutlined />, label: <a href={slugToPath(page.liveSlug)} target="_blank" rel="noreferrer">View live page</a> }
      : null,
    { key: "layout", icon: <LayoutOutlined />, label: "Save as layout", onClick: () => setSavingLayout(true) },
    { type: "divider" },
    page.liveSlug
      ? {
          key: "unpublish",
          icon: <EyeInvisibleOutlined />,
          label: "Unpublish",
          onClick: () =>
            modal.confirm({
              title: "Unpublish this page?",
              content: "Visitors will get a 404 until you publish again. The draft is kept.",
              okText: "Unpublish",
              okButtonProps: { danger: true },
              onOk: async () => {
                const r = await run(unpublishPageAction, ref, { success: "Page unpublished" });
                if (r.ok) {
                  setPage((p) => ({ ...p, lockVersion: r.data.lockVersion, liveSlug: null }));
                }
              },
            }),
        }
      : null,
    {
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
      label: "Delete page",
      onClick: () =>
        modal.confirm({
          title: `Delete “${page.title}”?`,
          content: page.liveSlug ? "It is live: visitors will get a 404. This cannot be undone." : "The draft and its history will be removed.",
          okText: "Delete",
          okButtonProps: { danger: true },
          onOk: () => navigate(deletePageAndExitAction, ref, { success: "Page deleted" }),
        }),
    },
  ];

  const canPublish = page.hasUnpublishedChanges || !page.liveSlug;

  return (
    <Flex vertical gap={16} style={{ minHeight: "calc(100vh - 104px)" }}>
      <Flex justify="space-between" align="center" gap={12} wrap>
        <Flex align="center" gap={12} style={{ minWidth: 0 }}>
          <Tooltip title="All pages">
            <Button icon={<ArrowLeftOutlined />} onClick={() => confirmDiscard(() => router.push("/admin"))} aria-label="Back to pages" />
          </Tooltip>
          <div style={{ minWidth: 0 }}>
            <Flex align="center" gap={8}>
              <Typography.Title level={4} style={{ margin: 0 }} ellipsis>
                {page.title}
              </Typography.Title>
              <StatusTag isLive={Boolean(page.liveSlug)} hasUnpublishedChanges={page.hasUnpublishedChanges} publishedVersion={page.publishedVersion} />
            </Flex>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {slugToPath(page.slug)}
              {page.liveSlug && page.liveSlug !== page.slug && ` (live at ${slugToPath(page.liveSlug)} until you publish)`}
            </Typography.Text>
          </div>
        </Flex>
        <Space wrap>
          <Button icon={previewOpen ? <EyeInvisibleOutlined /> : <EyeOutlined />} onClick={() => setPreviewOpen((v) => !v)}>
            {previewOpen ? "Hide preview" : "Preview"}
          </Button>
          <Button icon={<SettingOutlined />} onClick={() => setSettingsOpen(true)}>
            Settings
          </Button>
          <Button icon={<HistoryOutlined />} onClick={() => setVersionsOpen(true)}>
            History
          </Button>
          <Dropdown key={revealKey} menu={{ items: moreItems }} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} aria-label="More actions" />
          </Dropdown>
          <Tooltip title={dirty ? "Save the section you are editing first" : canPublish ? undefined : "Everything is already live"}>
            <Button type="primary" icon={<CloudUploadOutlined />} onClick={() => setPublishOpen(true)} disabled={dirty || !canPublish}>
              Publish
            </Button>
          </Tooltip>
        </Space>
      </Flex>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: previewOpen ? "280px minmax(360px, 1fr) minmax(0, 1.1fr)" : "300px minmax(0, 1fr)",
          gap: 16,
          flex: 1,
          minHeight: 0,
        }}
      >
        <Card size="small" title={`Sections (${sections.length})`} styles={{ body: { maxHeight: "calc(100vh - 230px)", overflowY: "auto" } }}>
          <SectionList
            sections={sections}
            selectedId={selectedId}
            labelFor={labelFor}
            typeLabelFor={(s) => typeLabel(s.type)}
            errorIds={errorIds}
            disabled={pending}
            onSelect={(id) => id !== selectedId && confirmDiscard(() => setSelectedId(id))}
            onMove={onMove}
            onAction={onSectionAction}
            onAdd={() => setAddAfter(undefined)}
          />
        </Card>

        <SectionPanel
          key={selected?.id ?? "none"}
          pageId={page.id}
          lockVersion={page.lockVersion}
          section={selected}
          schema={selected ? data.schemas[selected.type] : undefined}
          typeLabel={selected ? typeLabel(selected.type) : ""}
          block={selected?.globalBlockId ? blockById.get(selected.globalBlockId) : undefined}
          serverError={selected ? publishErrors[selected.id] : undefined}
          onDirtyChange={setDirty}
          onDetach={detach}
          onSaved={(saved, lockVersion) => {
            applyLock(lockVersion);
            setSections((all) => all.map((x) => (x.id === saved.id ? saved : x)));
            setPublishErrors((prev) => {
              if (!(saved.id in prev)) return prev;
              const next = { ...prev };
              delete next[saved.id];
              return next;
            });
          }}
        />

        {previewOpen && (
          <div style={{ minHeight: 480, height: "calc(100vh - 180px)", position: "sticky", top: 72 }}>
            <PreviewPane pageId={page.id} lockVersion={page.lockVersion} />
          </div>
        )}
      </div>

      <AddSectionModal
        open={addAfter !== false}
        onClose={() => setAddAfter(false)}
        onPick={onAdd}
        typeOptions={data.typeOptions}
        blocks={data.blocks}
        typeLabel={typeLabel}
        confirmLoading={pending}
      />

      <PageSettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} page={page} onSaved={applyLock} />

      <VersionsDrawer
        open={versionsOpen}
        onClose={() => setVersionsOpen(false)}
        page={page}
        versions={data.versions}
        onRolledBack={(lv) => {
          setPage((p) => ({ ...p, lockVersion: lv }));
          setVersionsOpen(false);
        }}
      />

      <Modal
        title="Publish page"
        open={publishOpen}
        onCancel={() => setPublishOpen(false)}
        onOk={publish}
        okText={page.liveSlug ? "Publish changes" : "Publish page"}
        confirmLoading={pending}
      >
        <Typography.Paragraph>
          {!page.liveSlug
            ? `The page goes live at ${slugToPath(page.slug)}.`
            : page.liveSlug === page.slug
              ? `The live page at ${slugToPath(page.slug)} will be replaced with the current draft.`
              : page.liveSlug === HOME_SLUG
                ? `The page moves from ${slugToPath(page.liveSlug)} to ${slugToPath(page.slug)}.`
                : `The page moves from ${slugToPath(page.liveSlug)} to ${slugToPath(page.slug)}. The old URL permanently redirects to the new one.`}
        </Typography.Paragraph>
        <Input.TextArea
          value={publishNote}
          onChange={(e) => setPublishNote(e.target.value)}
          placeholder="What changed? (optional, shown in history)"
          maxLength={200}
          showCount
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
      </Modal>

      <NameKeyModal
        open={converting !== null}
        title="Make Global Block"
        okText="Create Global Block"
        help="The section's text becomes a shared block you can add to any page. Editing it updates every page that uses it."
        initialName={converting ? labelFor(converting) : ""}
        onCancel={() => setConverting(null)}
        onSubmit={async (values) => {
          if (!converting) return { ok: false, error: { code: "VALIDATION", message: "No section selected." } };
          const r = await run(convertToBlockAction, { ...ref, sectionId: converting.id, name: values.name, key: values.key }, { success: "Global Block created", silentValidation: true });
          if (r.ok) {
            applyLock(r.data.lockVersion);
            setConverting(null);
          }
          return r;
        }}
      />

      <NameKeyModal
        open={savingLayout}
        title="Save as layout"
        okText="Save layout"
        withDescription
        help="Captures this page's sections and text as a starting point for new pages."
        initialName={`${page.title} layout`}
        onCancel={() => setSavingLayout(false)}
        onSubmit={async (values) => {
          const r = await run(saveTemplateAction, { pageId: page.id, ...values }, { success: "Layout saved", silentValidation: true });
          if (r.ok) setSavingLayout(false);
          return r;
        }}
      />
    </Flex>
  );
}
