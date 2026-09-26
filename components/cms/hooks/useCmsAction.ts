"use client";

import { App } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import type { ActionResult, ApiError } from "@/lib/types/result";
import { isNavigation } from "./is-navigation";

type RunOptions = {
  /** Toast shown on success. */
  success?: string;
  /** Skip the generic error toast (the caller renders field errors inline). */
  silentValidation?: boolean;
};

const NETWORK_ERROR: ApiError = {
  code: "INTERNAL",
  message: "Could not reach the server. Check your connection and try again.",
};

type Outcome<T> = { kind: "result"; result: ActionResult<T> } | { kind: "navigated" };

/**
 * Runs a server action and turns its ActionResult into consistent UI:
 * toasts, stale-write reloads and session-expiry redirects. Always resolves.
 * The server re-renders the current route in the same response, so callers never refresh.
 */
export function useCmsAction() {
  const { message, modal } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const inFlight = useRef(0);

  const execute = useCallback(
    async <I, T>(action: (input: I) => Promise<ActionResult<T>>, input: I, options: RunOptions): Promise<Outcome<T>> => {
      inFlight.current++;
      setPending(true);
      let result: ActionResult<T>;
      try {
        result = await action(input);
        if (!result || typeof result !== "object" || !("ok" in result)) result = { ok: false, error: NETWORK_ERROR };
      } catch (err) {
        if (isNavigation(err)) {
          if (options.success) message.success(options.success);
          return { kind: "navigated" };
        }
        result = { ok: false, error: NETWORK_ERROR };
      } finally {
        inFlight.current--;
        if (inFlight.current === 0) setPending(false);
      }

      if (result.ok) {
        if (options.success) message.success(options.success);
        return { kind: "result", result };
      }

      const { error } = result;
      switch (error.code) {
        case "UNAUTHENTICATED":
          message.warning("Your session expired. Please sign in again.");
          router.replace(`/admin/login?next=${encodeURIComponent(pathname ?? "/admin")}`);
          break;
        case "STALE":
          modal.confirm({
            title: "Newer changes exist",
            content: error.message,
            okText: "Reload",
            cancelText: "Keep editing",
            onOk: () => router.refresh(),
          });
          break;
        case "VALIDATION":
          if (!options.silentValidation) message.error(error.message);
          break;
        default:
          message.error(error.message || "Something went wrong.");
      }
      return { kind: "result", result };
    },
    [message, modal, pathname, router],
  );

  /** For actions that stay on the current route. */
  const run = useCallback(
    async <I, T>(action: (input: I) => Promise<ActionResult<T>>, input: I, options: RunOptions = {}): Promise<ActionResult<T>> => {
      const outcome = await execute(action, input, options);
      if (outcome.kind === "navigated") return new Promise<never>(() => {});
      return outcome.result;
    },
    [execute],
  );

  /**
   * For actions that redirect server-side on success. Resolves to null once the
   * navigation has started, or to the failure result.
   */
  const navigate = useCallback(
    async <I, T>(action: (input: I) => Promise<ActionResult<T>>, input: I, options: RunOptions = {}) => {
      const outcome = await execute(action, input, options);
      if (outcome.kind === "navigated" || outcome.result.ok) return null;
      return outcome.result;
    },
    [execute],
  );

  return { run, navigate, pending };
}
