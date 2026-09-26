import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const imageSizes = {
  selector:
    'JSXOpeningElement[name.name="Image"]:has(JSXAttribute[name.name="fill"]):not(:has(JSXAttribute[name.name="sizes"]))',
  message:
    "<Image fill> needs a `sizes` prop matching its rendered width, otherwise the browser downloads the largest variant.",
};

const popupRevealKey = {
  selector:
    'JSXOpeningElement[name.name=/^(Popconfirm|Dropdown)$/]:not(:has(JSXAttribute[name.name="key"]))',
  message:
    "Click-triggered antd popups need `key={useRevealKey()}` so they remount after Next restores the route from <Activity>.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-syntax": ["error", imageSizes],
    },
  },
  {
    files: ["components/cms/**/*.tsx"],
    // The shell renders in the persistent dashboard layout, which <Activity> never hides.
    ignores: ["components/cms/shell/**"],
    rules: {
      "no-restricted-syntax": ["error", imageSizes, popupRevealKey],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
