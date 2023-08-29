module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "node": true,
        "commonjs": true
    },
    "extends": [
        // "airbnb": 这是由 Airbnb 团队维护的一组 JavaScript 代码规范，
        // 它提供了一套严格的、可读性高的代码规则，用于保持代码质量和一致性
        "airbnb",
        // 这个规则集合由 eslint-plugin-import 提供，它包含一些用于检查和约束 ES6 模块导入和导出的规则
        "plugin:import/recommended",
        // 这个规则集合扩展了 "plugin:import/recommended"，添加了一些用于 TypeScript 中的导入和导出的规则
        "plugin:import/typescript",
        // 这个规则集合由 eslint-plugin-promise 提供，它提供了一些规则用于检查和约束 Promise 的使用
        "plugin:promise/recommended",
        // 这个规则集合由 eslint-plugin-react 提供，它包含一些用于检查和约束 React 代码的规则
        "plugin:react/recommended",
        // 这个规则集合由 eslint-plugin-react-hooks 提供，它包含一些用于检查和约束 React Hooks 的规则
        "plugin:react-hooks/recommended",
        // 这个规则集合由 eslint-plugin-jsx-a11y 提供，它包含一些用于检查和约束 JSX 元素上可访问性的规则
        "plugin:jsx-a11y/recommended",
        // 这个规则集合由 @typescript-eslint/eslint-plugin 提供，它包含一些用于检查和约束 TypeScript 代码的规则
        "plugin:@typescript-eslint/recommended",
        // 这个规则集合扩展了 "plugin:@typescript-eslint/recommended"，添加了一些需要类型检查的 TypeScript 规则
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "project": "./tsconfig.json"
    },
    "plugins": [
        "import",
        "promise",
        "react",
        "react-hooks",
        "jsx-a11y",
        "@typescript-eslint"
    ],
    "rules": {
        // 缩进4个空格
        "indent": ["error", 4, { "SwitchCase": 1 }],
        // jsx缩进4个空格
        "react/jsx-indent": ["error", 4],
        // jsx属性缩进4个空格
        "react/jsx-indent-props": ["error", 4],
        // 禁止使用分号
        "semi": ["error", "never"],
        // 只能使用单引号
        "quotes": ["error", "single"],
        // 忽略换行符类型
        "linebreak-style": "off",
        // 可以在tsx文件中使用拓展名为jsx的文件
        "react/jsx-filename-extension": "off",
        // 禁止使用 @ts-ignore
        "@typescript-eslint/ban-ts-ignore": "off",
        // 忽略导入时的文件扩展名
        "import/no-unresolved": "off",
        "import/extensions": "off",
        // 忽略文件结尾必须有一行空行
        "eol-last": "off",
        // 忽略表达式必须单独一行
        "react/jsx-one-expression-per-line": "off",
        // 忽略button必须有类型
        "react/button-has-type": "off",
        // 忽略对象最后一个属性必须有逗号
        "comma-dangle": "off",
        // 忽略行尾不能有空格
        "no-trailing-spaces": "off",
        // 忽略不能有console
        "no-console": "off",
        // 忽略代码块两边不能出现空行
        "padded-blocks": "off",
        // 忽略箭头函数周围出现了非预期的代码块语句
        "arrow-body-style": "off",
        // 忽略Promise的reject中必须传入Error对象
        "prefer-promise-reject-errors": "off",
        // 忽略no-else-return
        "no-else-return": "off",
        // 忽略.then或.catch中return一个值
        "promise/always-return": "off",
        // 设置单行最大长度
        "max-len": [
            "error",
            {
                "code": 150, // 设置每行代码的最大长度为 120 个字符，可以根据需要调整此值
                "tabWidth": 4, // 如果使用缩进，请指定缩进的字符数，比如 2 或 4
                "ignoreComments": false, // 是否忽略注释，默认为 false，即注释也会计算在每行代码长度内
                "ignoreTrailingComments": false, // 是否忽略行尾注释，默认为 false
                "ignoreUrls": true, // 是否忽略 URL 地址，默认为 true，即 URL 不计入每行代码长度内
                "ignoreStrings": true, // 是否忽略字符串，默认为 true，即字符串不计入每行代码长度内
                "ignoreTemplateLiterals": true, // 是否忽略模板字面量，默认为 true，即模板字面量不计入每行代码长度内
                "ignoreRegExpLiterals": true, // 是否忽略正则表达式，默认为 true，即正则表达式不计入每行代码长度内
            },
        ],
        // 忽略默认参数在前
        "default-param-last": "off",
        // 忽略ts不能使用any
        "@typescript-eslint/no-explicit-any": "off",
        // 忽略ts不能返回any
        "@typescript-eslint/no-unsafe-return": "off",
        // 忽略不能修改函数参数
        "no-param-reassign": "off",
        // 忽略必须使用驼峰命名
        "camelcase": "off",
        "@typescript-eslint/unbound-method": "off",
    },
    "globals": {},
    "overrides": [],
}
