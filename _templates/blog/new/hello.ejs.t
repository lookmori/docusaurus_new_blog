---
to: content/blog/<%= title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() %>.mdx
---


---
title: "<%= title %>"
date: "<%= h.date() %>"
excerpt: "简短介绍..."
tags: ["博客", "MDX"]
---

# <%= title %>

## 简介

这是一篇关于 <%= title %> 的博客文章。

## 内容

在这里编写你的博客内容...

### 代码示例

```javascript
function example() {
  console.log("Hello, World!");
}
```

## 总结

感谢阅读！