const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          [
            "@fullhuman/postcss-purgecss",
            {
              content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          ],
        ]
      : [],
};
