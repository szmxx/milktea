module.exports = {
  // 匹配哪些是测试文件
  testMatch: [
    "**src/components/**/*.spec.(js|jsx]ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  // 忽略转换的文件的路径
  transformIgnorePatterns: ["/node_modules/"],
  // 测试文件类型
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  // 不同类型文件配置不同的解释器
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"]
};
