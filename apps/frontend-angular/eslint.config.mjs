import nx from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.mjs";
import overrides from "../../.eslintrc.overrides.json" with { type: "json" };

export default [
  ...baseConfig,
  ...nx.configs["flat/angular"],
  ...nx.configs["flat/angular-template"],
  overrides,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/use-lifecycle-interface": ["error"],
      "@angular-eslint/no-empty-lifecycle-method": ["warn"],
      "@angular-eslint/prefer-inject": ["off"],
      "@angular-eslint/prefer-standalone": ["off"],
      "jsx-a11y/click-events-have-key-events": ["off"],
    },
  },
  {
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/click-events-have-key-events": ["off"],
      "@angular-eslint/template/interactive-supports-focus": ["off"],
      "@angular-eslint/template/elements-content": ["off"],
    },
  },
  {
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-unused-vars": ["off"],
    },
  },
];
