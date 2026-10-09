import type { MetadataRoute } from "next";
import { buildRobots } from "@/lib/seo/robots";
import { cms } from "@/server/cms";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return buildRobots(await cms.published.getSiteSeo());
}
