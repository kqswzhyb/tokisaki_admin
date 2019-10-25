module.exports = {
  presets: ["@quasar/babel-preset-app"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
};
