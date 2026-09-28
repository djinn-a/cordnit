import { useCallback, useEffect, useRef, useState } from "react";
import type { BotSignals } from "@/lib/leads/schema";

/** Honeypot value plus monotonic fill time for a single form instance. */
export function useBotSignals() {
  const startedAt = useRef<number | null>(null);
  const [hpField, setHpField] = useState("");

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  const getSignals = useCallback(
    (): BotSignals => ({
      hpField,
      elapsedMs: startedAt.current === null ? undefined : Math.round(performance.now() - startedAt.current),
    }),
    [hpField],
  );

  const resetSignals = useCallback(() => {
    setHpField("");
    startedAt.current = performance.now();
  }, []);

  const honeypotProps = {
    value: hpField,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHpField(e.target.value),
  };

  return { honeypotProps, getSignals, resetSignals };
}
