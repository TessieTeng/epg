###       vs-code 中eslint的配置

* vs-code 上安装插件ESlint。

* ESLint 不是安装后就可以用的，还需要一些环境和配置：

  ​	首先，需要全局的 ESLint , 如果没有安装可以使用 `npm install -g eslint `来安装。

  ​	其次，vue文件是类 HTML 的文件，为了支持对 vue 文件的 ESLint ，需要 `eslint-plugin-html` 这个插件。可以使用 `npm install -g eslint-plugin-html` 来安装。

* 安装了 HTML 插件后，还需要在 vscode 中配置下 ESLint。》开始》首选项》增加到用户设置。

  ```
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
  "eslint.options": {
    "plugins": ["html"]
  }
  ```

* 项目根目录下创建 `.eslintrc.json`配置文件（可以用命令生成）。为了标准一致请将如下复制到改配置文件上，有不同意见也可提出。

  ​

  ```
  {
    "env": {
      "browser": true,
      "node": true
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },
    "rules": {
      // 变量没有声明
      "no-undef": "warn",
      // 不要使用debugger
      "no-debugger": "warn",
      // 必须使用分号
      "semi": ["error", "always"],
      // js必须使用单引号
      "quotes": ["error", "single"],
      // 禁止条件表达式中出现赋值操作符
      "no-cond-assign": ["error", "always"],
      // 条件语句使用大括号
      "curly": "error",
      // 禁止多次重复声明变量
      "no-redeclare": "error",
      // 禁止出现未申明的变量
      "no-unused-vars": "error",
      // 禁止修改const申明的变量
      "no-const-assign": "error",
      // 禁用拖尾逗号
      "comma-dangle": ["error", "never"],
    }
  }
  ```

* 修改错误，vs-code 上会出现警告和错误提示，可以进行修改（书写的时候就尽量避免）。也可以在控制台上查看所有问题，再进行修改。

  ​

