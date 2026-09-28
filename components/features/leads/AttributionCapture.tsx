"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/leads/client";

/** Records landing page, external referrer and UTM parameters for lead attribution. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
