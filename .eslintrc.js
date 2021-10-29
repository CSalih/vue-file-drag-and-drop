module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  plugins: [],
  rules: {},
  ignorePatterns: [],
};
