"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Changes every time Next hides the route in <Activity>. Use it as the `key` of click-triggered antd popups
 * (Popconfirm, Dropdown): their popup node is unmounted while hidden, and on reveal @rc-component/trigger
 * re-runs its effects against the stale node ("trigger element and popup element should in same shadow root").
 */
export function useRevealKey(): number {
  const [key, setKey] = useState(0);
  useLayoutEffect(() => () => setKey((k) => k + 1), []);
  return key;
}
