"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  LinkOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Collapse, Empty, Flex, Form, Input, InputNumber, Tooltip, Typography, type FormInstance, type FormRule } from "antd";
import { useMemo, type ReactNode } from "react";

/** The subset of JSON Schema (plus our field meta) emitted by z.toJSONSchema for section content. */
export type JsonSchemaNode = {
  type?: string | string[];
  properties?: Record<string, JsonSchemaNode>;
  required?: string[];
  items?: JsonSchemaNode;
  maxLength?: number;
  maxItems?: number;
  label?: string;
  widget?: "text" | "textarea" | "url" | "number";
  help?: string;
  itemLabel?: string;
};

const ITEM_ID = "_id";
const LINK_RE = /^(\/|#|https?:\/\/|mailto:|tel:)/;

export function newItemId(): string {
  const c = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  return c?.randomUUID ? c.randomUUID().slice(0, 12) : Math.random().toString(36).slice(2, 14);
}

function humanize(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function typeOf(node: JsonSchemaNode): string | undefined {
  return Array.isArray(node.type) ? node.type.find((t) => t !== "null") : node.type;
}

/** Builds an empty value that satisfies the item schema (used by "Add item"). */
export function emptyValue(node: JsonSchemaNode): unknown {
  switch (typeOf(node)) {
    case "string":
      return "";
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object": {
      const out: Record<string, unknown> = {};
      for (const [k, child] of Object.entries(node.properties ?? {})) {
        out[k] = k === ITEM_ID ? newItemId() : emptyValue(child);
      }
      return out;
    }
    default:
      return null;
  }
}

/** Gives copies fresh ids so duplicated items never share an `_id` with their source. */
function reId(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(reId);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = k === ITEM_ID ? newItemId() : reId(v);
    return out;
  }
  return value;
}

function itemTitle(value: unknown, fallback: string): string {
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k !== ITEM_ID && typeof v === "string" && v.trim()) return v.trim().slice(0, 70);
    }
  }
  if (typeof value === "string" && value.trim()) return value.trim().slice(0, 70);
  return fallback;
}

type FieldProps = {
  name: (string | number)[];
  /** Full path from the form root, for useWatch / getFieldValue inside Form.List. */
  fullPath: (string | number)[];
  node: JsonSchemaNode;
  fieldKey: string;
  form: FormInstance;
};

function stringRules(node: JsonSchemaNode, label: string): FormRule[] {
  const rules: FormRule[] = [];
  if (node.maxLength) rules.push({ max: node.maxLength, message: `${label} must be at most ${node.maxLength} characters.` });
  if (node.widget === "url") {
    rules.push({
      validator: (_, v: unknown) =>
        typeof v !== "string" || v === "" || LINK_RE.test(v)
          ? Promise.resolve()
          : Promise.reject(new Error("Use a path (/about), anchor (#id), https://, mailto: or tel: link.")),
    });
  }
  return rules;
}

function ScalarField({ name, node, fieldKey }: Omit<FieldProps, "form" | "fullPath">) {
  const label = node.label ?? humanize(fieldKey);
  const t = typeOf(node);
  if (t === "number" || t === "integer") {
    return (
      <Form.Item label={label} name={name} tooltip={node.help} rules={[{ type: "number", message: `${label} must be a number.` }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
    );
  }
  if (t === "boolean") return null;
  const rules = stringRules(node, label);
  const long = node.widget === "textarea" || (node.maxLength ?? 0) > 500;
  return (
    <Form.Item label={label} name={name} tooltip={node.help} rules={rules}>
      {node.widget === "url" ? (
        <Input prefix={<LinkOutlined style={{ color: "rgba(0,0,0,0.35)" }} />} placeholder="/path, #anchor or https://" spellCheck={false} />
      ) : long ? (
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 12 }} />
      ) : (
        <Input />
      )}
    </Form.Item>
  );
}

function ListControls({
  index,
  count,
  move,
  remove,
  duplicate,
  label,
}: {
  index: number;
  count: number;
  move: (from: number, to: number) => void;
  remove: (index: number) => void;
  duplicate: () => void;
  label: string;
}) {
  return (
    <Flex gap={2} onClick={(e) => e.stopPropagation()}>
      <Tooltip title="Move up">
        <Button size="small" type="text" icon={<ArrowUpOutlined />} disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={`Move ${label} up`} />
      </Tooltip>
      <Tooltip title="Move down">
        <Button size="small" type="text" icon={<ArrowDownOutlined />} disabled={index === count - 1} onClick={() => move(index, index + 1)} aria-label={`Move ${label} down`} />
      </Tooltip>
      <Tooltip title="Duplicate">
        <Button size="small" type="text" icon={<CopyOutlined />} onClick={duplicate} aria-label={`Duplicate ${label}`} />
      </Tooltip>
      <Tooltip title="Remove">
        <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => remove(index)} aria-label={`Remove ${label}`} />
      </Tooltip>
    </Flex>
  );
}

function ArrayField({ name, fullPath, node, fieldKey, form }: FieldProps) {
  const label = node.label ?? humanize(fieldKey);
  const itemLabel = node.itemLabel ?? "Item";
  const itemNode = node.items ?? { type: "string" };
  const isObjectItems = typeOf(itemNode) === "object";
  const max = node.maxItems ?? 100;

  return (
    <Form.Item label={label} tooltip={node.help} required={false} style={{ marginBottom: 20 }}>
      <Form.List name={name}>
        {(fields, { add, remove, move }) => {
          const addItem = (value?: unknown, index?: number) => add(value ?? emptyValue(itemNode), index);
          const duplicate = (index: number) => {
            const current = form.getFieldValue([...fullPath, index]);
            addItem(reId(structuredClone(current)), index + 1);
          };
          return (
            <Flex vertical gap={8}>
              {fields.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`No ${itemLabel.toLowerCase()}s`} style={{ margin: 0 }} />}
              {isObjectItems ? (
                <Collapse
                  size="small"
                  items={fields.map((field, index) => ({
                    key: field.key,
                    label: (
                      <Form.Item noStyle shouldUpdate>
                        {() => (
                          <Typography.Text ellipsis style={{ maxWidth: 360 }}>
                            <Typography.Text type="secondary">{index + 1}.</Typography.Text>{" "}
                            {itemTitle(form.getFieldValue([...fullPath, field.name]), `${itemLabel} ${index + 1}`)}
                          </Typography.Text>
                        )}
                      </Form.Item>
                    ),
                    extra: (
                      <ListControls index={index} count={fields.length} move={move} remove={remove} duplicate={() => duplicate(index)} label={`${itemLabel} ${index + 1}`} />
                    ),
                    children: (
                      <ObjectFields
                        name={[field.name]}
                        fullPath={[...fullPath, field.name]}
                        node={itemNode}
                        form={form}
                      />
                    ),
                  }))}
                />
              ) : (
                fields.map((field, index) => (
                  <Flex key={field.key} gap={8} align="flex-start">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Form.Item name={[field.name]} rules={stringRules(itemNode, itemLabel)} style={{ marginBottom: 0 }}>
                        {itemNode.widget === "text" ? <Input aria-label={`${itemLabel} ${index + 1}`} /> : <Input.TextArea autoSize={{ minRows: 1, maxRows: 8 }} aria-label={`${itemLabel} ${index + 1}`} />}
                      </Form.Item>
                    </div>
                    <ListControls index={index} count={fields.length} move={move} remove={remove} duplicate={() => duplicate(index)} label={`${itemLabel} ${index + 1}`} />
                  </Flex>
                ))
              )}
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => addItem()} disabled={fields.length >= max} block>
                Add {itemLabel.toLowerCase()}
              </Button>
            </Flex>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}

function ObjectFields({ name, fullPath, node, form }: Omit<FieldProps, "fieldKey">) {
  const entries = Object.entries(node.properties ?? {});
  return (
    <>
      {entries.map(([key, child]) => {
        const childName = [...name, key];
        const childPath = [...fullPath, key];
        if (key === ITEM_ID) {
          return <Form.Item key={key} name={childName} hidden noStyle><Input type="hidden" /></Form.Item>;
        }
        return <SchemaField key={key} name={childName} fullPath={childPath} node={child} fieldKey={key} form={form} />;
      })}
    </>
  );
}

function SchemaField(props: FieldProps) {
  const t = typeOf(props.node);
  if (t === "array") return <ArrayField {...props} />;
  if (t === "object") {
    const label = props.node.label ?? humanize(props.fieldKey);
    return (
      <Card size="small" title={label} style={{ marginBottom: 16 }} styles={{ body: { paddingBottom: 0 } }}>
        <ObjectFields name={props.name} fullPath={props.fullPath} node={props.node} form={props.form} />
      </Card>
    );
  }
  if (!t) {
    return (
      <Typography.Paragraph type="secondary" style={{ fontSize: 12 }}>
        {props.node.label ?? humanize(props.fieldKey)} is managed by developers.
      </Typography.Paragraph>
    );
  }
  return <ScalarField name={props.name} node={props.node} fieldKey={props.fieldKey} />;
}

type SchemaFormProps<T extends Record<string, unknown>> = {
  form: FormInstance<T>;
  schema: JsonSchemaNode | null | undefined;
  initialValues: T;
  disabled?: boolean;
  onDirtyChange?: (dirty: boolean) => void;
  header?: ReactNode;
};

/** Renders an editable form for any section content schema. Structure and system props are never exposed. */
export default function SchemaForm<T extends Record<string, unknown>>({
  form,
  schema,
  initialValues,
  disabled,
  onDirtyChange,
  header,
}: Readonly<SchemaFormProps<T>>) {
  const hasFields = useMemo(() => Object.keys(schema?.properties ?? {}).some((k) => k !== ITEM_ID), [schema]);
  if (!schema || typeOf(schema) !== "object") {
    return <Empty description="This section type has no editable schema." />;
  }
  if (!hasFields) {
    return <Empty description="This section has no editable text. Its content is managed in code." />;
  }
  return (
    <Form<T>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      disabled={disabled}
      onValuesChange={() => onDirtyChange?.(form.isFieldsTouched())}
      requiredMark={false}
      scrollToFirstError={{ behavior: "smooth", block: "center" }}
    >
      {header}
      <ObjectFields name={[]} fullPath={[]} node={schema} form={form as FormInstance} />
    </Form>
  );
}