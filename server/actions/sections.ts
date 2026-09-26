"use server";

import {
  addSectionSchema,
  moveSectionSchema,
  sectionRefSchema,
  toggleSectionSchema,
  updateSectionSchema,
} from "@/lib/cms/inputs";
import { cms } from "@/server/cms";
import { withAction } from "./with-action";

export const addSectionAction = withAction("sections.add", addSectionSchema, (input, { session }) =>
  cms.sections.addSection(input, session.userId),
);

export const updateSectionAction = withAction("sections.update", updateSectionSchema, (input, { session }) =>
  cms.sections.updateSection(input, session.userId),
);

export const moveSectionAction = withAction("sections.move", moveSectionSchema, (input, { session }) =>
  cms.sections.moveSection(input, session.userId),
);

export const duplicateSectionAction = withAction("sections.duplicate", sectionRefSchema, (input, { session }) =>
  cms.sections.duplicateSection(input, session.userId),
);

export const toggleSectionAction = withAction("sections.toggle", toggleSectionSchema, (input, { session }) =>
  cms.sections.toggleSection(input, session.userId),
);

export const deleteSectionAction = withAction("sections.delete", sectionRefSchema, (input, { session }) =>
  cms.sections.deleteSection(input, session.userId),
);

export const detachSectionAction = withAction("sections.detach", sectionRefSchema, (input, { session }) =>
  cms.sections.detachSection(input, session.userId),
);
