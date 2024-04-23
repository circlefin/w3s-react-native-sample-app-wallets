module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "react-native/react-native": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "jsx": "react-jsx",
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-native"
    ],
    "rules": {
      "@typescript-eslint/ban-ts-comment": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/semi": ["error", "never"],
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/space-before-function-paren": [
        "error",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
        }
      ],
      "comma-dangle": [
        "error",
        {
          "arrays": "never",
          "objects": "only-multiline",
          "imports": "only-multiline",
          "exports": "never",
          "functions": "only-multiline"
        }
      ]
    }
}
