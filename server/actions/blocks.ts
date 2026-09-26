"use server";

import { blockRefSchema, convertToBlockSchema, updateBlockSchema } from "@/lib/cms/inputs";
import { cms } from "@/server/cms";
import { invalidateBlock } from "./invalidate";
import { withAction } from "./with-action";

export const convertToBlockAction = withAction("blocks.convert", convertToBlockSchema, async (input, { session }) => {
  const { block, lockVersion } = await cms.blocks.convertSectionToBlock(input, session.userId);
  return { blockId: block.id, lockVersion };
});

export const updateBlockAction = withAction("blocks.update", updateBlockSchema, async (input, { session }) => {
  const block = await cms.blocks.updateBlock(input, session.userId);
  return { lockVersion: block.lockVersion };
});

/** One publish updates every page that references the block (render-time resolution). */
export const publishBlockAction = withAction("blocks.publish", blockRefSchema, async (input, { session }) => {
  const block = await cms.blocks.publishBlock(input, session.userId);
  invalidateBlock(block.id);
  return { lockVersion: block.lockVersion, publishedVersion: block.publishedVersion };
});

export const deleteBlockAction = withAction(
  "blocks.delete",
  blockRefSchema,
  async (input, { session }) => {
    const result = await cms.blocks.deleteBlock(input, session.userId);
    invalidateBlock(result.blockId);
    return result;
  },
  { redirectTo: () => "/admin/blocks" },
);
