const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testRegex: ".*.(test|spec).(j|t)s[x]?$",
  transform: {
      "node_modules/(react-dnd|dnd-core|@react-dnd|react-dnd-html5-backend)/.+\\.(j|t)sx?$": "ts-jest",
      "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: [`/node_modules/(?!(somePkg)|react-dnd|dnd-core|@react-dnd|react-dnd-html5-backend)`],
};

module.exports = config;