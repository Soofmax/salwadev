// Fichier : eslint.config.mjs

import globals from "globals";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-config-prettier";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  // Ajoute cette section pour ignorer les fichiers non pertinents
  {
    ignores: [
      ".next/",       // Ignore le dossier de build de Next.js
      "node_modules/", // Ignore les dépendances
    ],
  },

  // Le reste de la configuration
  {
    files: ["*/.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  
  ...tseslint.configs.recommended,
  pluginPrettier, 
];
