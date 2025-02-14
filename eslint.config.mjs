import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    }, 
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-unused-private-class-members": ["warn"],
      "no-extra-parens": ["warn"],
      "no-extra-boolean-cast": ["warn"],
      eqeqeq: ["error", "always"],
    }
  }
];