"use client";

import { Descriptions, Drawer, Empty, Space, Tag, Typography, type DescriptionsProps } from "antd";
import { LEAD_TYPE_LABELS, type AttributionKey } from "@/lib/leads/schema";
import { LEAD_TYPE_COLORS, leadName, type LeadView } from "./lead-view";

const full = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "medium" });

const ATTRIBUTION_LABELS: Record<AttributionKey, string> = {
  ctaLocation: "CTA location",
  source: "Source",
  landingPage: "Landing page",
  referrer: "Referrer",
  solution: "Solution",
  service: "Service",
  industry: "Industry",
  accelerator: "Accelerator",
  insight: "Insight",
  content: "Content",
  utmSource: "UTM source",
  utmMedium: "UTM medium",
  utmCampaign: "UTM campaign",
  utmContent: "UTM content",
  utmTerm: "UTM term",
};

const dash = <Typography.Text type="secondary">—</Typography.Text>;
const text = (v: string | null | undefined) => (v ? <Typography.Text copyable>{v}</Typography.Text> : dash);
const yesNo = (v: boolean) => (v ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>);

export default function LeadDetailDrawer({ lead, onClose }: Readonly<{ lead: LeadView | null; onClose: () => void }>) {
  const isEnquiry = lead?.type !== "newsletter";

  const contact: DescriptionsProps["items"] = lead
    ? [
        { key: "email", label: "Email", children: <Typography.Link href={`mailto:${lead.email}`} copyable>{lead.email}</Typography.Link> },
        ...(isEnquiry
          ? [
              { key: "name", label: "Name", children: text(leadName(lead)) },
              { key: "company", label: "Company", children: text(lead.company) },
              { key: "jobTitle", label: "Job title", children: text(lead.jobTitle) },
              { key: "phone", label: "Phone", children: text(lead.phone) },
            ]
          : []),
      ]
    : [];

  const enquiry: DescriptionsProps["items"] =
    lead && isEnquiry
      ? [
          {
            key: "interests",
            label: "Interests",
            children: lead.interests.length ? (
              <Space size={[4, 4]} wrap>
                {lead.interests.map((i) => <Tag key={i}>{i}</Tag>)}
              </Space>
            ) : dash,
          },
          {
            key: "message",
            label: "Message",
            children: lead.message ? (
              <Typography.Paragraph style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>{lead.message}</Typography.Paragraph>
            ) : dash,
          },
          { key: "introCall", label: "Intro call requested", children: yesNo(lead.introCall) },
          { key: "booking", label: "Requested slot", children: text(lead.bookingAt) },
        ]
      : [];

  const attributionEntries = lead
    ? (Object.keys(ATTRIBUTION_LABELS) as AttributionKey[]).filter((k) => lead.attribution[k])
    : [];

  const meta: DescriptionsProps["items"] = lead
    ? [
        { key: "received", label: "Received", children: full.format(new Date(lead.createdAt)) },
        { key: "consent", label: isEnquiry ? "Privacy consent" : "Marketing consent", children: yesNo(lead.privacyConsent) },
        { key: "ua", label: "User agent", children: <Typography.Text type="secondary" style={{ fontSize: 12 }}>{lead.userAgent ?? "—"}</Typography.Text> },
        { key: "id", label: "Lead ID", children: <Typography.Text code copyable>{lead.id}</Typography.Text> },
      ]
    : [];

  return (
    <Drawer
      open={lead !== null}
      onClose={onClose}
      size="large"
      title={
        lead && (
          <Space>
            <span>{leadName(lead) || lead.email}</span>
            <Tag color={LEAD_TYPE_COLORS[lead.type]}>{LEAD_TYPE_LABELS[lead.type]}</Tag>
          </Space>
        )
      }
      destroyOnHidden
    >
      {lead && (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Descriptions title="Contact" column={1} bordered size="small" items={contact} />
          {isEnquiry && <Descriptions title="Enquiry" column={1} bordered size="small" items={enquiry} />}
          {attributionEntries.length ? (
            <Descriptions
              title="Attribution"
              column={1}
              bordered
              size="small"
              items={attributionEntries.map((k) => ({ key: k, label: ATTRIBUTION_LABELS[k], children: text(lead.attribution[k]) }))}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No attribution captured" />
          )}
          <Descriptions title="Submission" column={1} bordered size="small" items={meta} />
        </Space>
      )}
    </Drawer>
  );
}
