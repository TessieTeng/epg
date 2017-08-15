# set up beautify in vs code

1. 在应用商店中安装`beautify`插件

2. 打开`文件`-->`首选项` ---> `设置` 添加下面的选项

   ```json
   {
     "editor.formatOnSave": true,
     "autoprefixer.formatOnSave": true
   }
   ```

3. 在项目根目录下新建文件`.jsbeautifyrc` , 复制下面内容到该文件中

```json
{
  "indent_char": " ",
  "indent_size": 4,
  "max_preserve_newlines": 2,
  "preserve_newlines": true,
  "keep_array_indentation": true,
  "break_chained_methods": true,
  "wrap_line_length": 120,
  "end_with_newline": true,
  "space_around_combinator": true,
  "wrap_attributes": "force-aligned",
  "brace_style": "collapse,preserve-inline"
}
```

For help on the settings in the `.jsbeautifyrc` see [Settings.md](https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md)