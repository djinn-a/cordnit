import "server-only";

type Level = "debug" | "info" | "warn" | "error";
type Fields = Record<string, unknown>;

function serializeError(err: unknown): Fields | undefined {
  if (err === undefined || err === null) return undefined;
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack, cause: err.cause };
  }
  return { value: String(err) };
}

/** Structured JSON logs: stdout on Vercel today, CloudWatch-ready on AWS. */
function write(level: Level, msg: string, fields?: Fields) {
  if (level === "debug" && process.env.NODE_ENV === "production") return;
  const { err, ...rest } = fields ?? {};
  const line = JSON.stringify({
    level,
    msg,
    time: new Date().toISOString(),
    ...rest,
    ...(err !== undefined ? { err: serializeError(err) } : {}),
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (msg: string, fields?: Fields) => write("debug", msg, fields),
  info: (msg: string, fields?: Fields) => write("info", msg, fields),
  warn: (msg: string, fields?: Fields) => write("warn", msg, fields),
  error: (msg: string, fields?: Fields) => write("error", msg, fields),
};
