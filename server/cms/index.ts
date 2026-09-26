import "server-only";
import * as blocks from "./services/blocks.service";
import * as pages from "./services/pages.service";
import * as publish from "./services/publish.service";
import * as redirects from "./services/redirects.service";
import * as sections from "./services/sections.service";
import * as templates from "./services/templates.service";
import * as published from "./queries/published";
import * as preview from "./queries/preview";
import { listAudit } from "./audit";

/**
 * The CMS Local API: typed, in-process access for RSC, server actions and
 * scripts. No HTTP hop; swap the database or auth underneath without touching callers.
 */
export const cms = {
  pages,
  sections,
  publish,
  blocks,
  templates,
  redirects,
  published,
  preview,
  audit: { list: listAudit },
};
