module.exports = {
  // 环境
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  // 使用的扩展库
  "extends": "airbnb",
  // 解析器用于解析代码
  "parser": "babel-eslint",
  // 解析器配置
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  // 规则
  "rules": {
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "indent": [
      "error",
      "tab"
    ],
    "quote-props": ["off", "always"],
    "linebreak-style": [
      "off",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "off",
      "always"
    ],
    "react/jsx-indent": [ // 解决react里面的缩进问题
      "off",
      "tab"
    ],
    "react/jsx-indent-props": [ //
      "off",
      "tab"
    ],
    "no-tabs": "off", // 禁止缩进错误
    // 允许使用 for in
    "no-restricted-syntax": 0,
    "guard-for-in": 0,
    // 允许在 .js 和 .jsx 文件中使用 jsx
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // 不区分是否是 无状态组件
    "react/prefer-stateless-function": 0,
    "no-var": 0,
    "no-constant-condition": "off",
    "no-console": "off",
    'indent': [2, 4, { 'SwitchCase': 1 }],
    "comma-dangle": [
      "off",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }
    ],
    "react/prop-types": ["off", { ignore: 1, customValidators: 1 }],
    "function-paren-newline": ["off", { "minItems": 3 }],
    "prefer-destructuring": ["off", {"object": true, "array": false}],
    "eol-last": ["off", "always"],
    "arrow-body-style": ["off", "never"],
    "object-shorthand": "off",
    "import/prefer-default-export": "off",
    "spaced-comment": ["off", "always", { "exceptions": ["-", "+"] }],
    "react/jsx-closing-bracket-location": ["off", {
      "nonEmpty":  false,
      "selfClosing":  false
    }],
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-max-props-per-line": "off"
  }
};