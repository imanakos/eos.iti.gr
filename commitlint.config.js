export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "content",
        "style",
        "refactor",
        "chore",
        "docs",
        "test",
        "ci",
      ],
    ],
    "header-max-length": [2, "always", 72],
  },
};
