import { Fragment, type ReactNode } from "react";

/** Renders CMS text where "\n" marks an intentional line break. */
export default function MultilineText({ text }: Readonly<{ text: ReactNode }>) {
  if (typeof text !== "string" || !text.includes("\n")) return <>{text}</>;
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={`${i}-${line}`}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
