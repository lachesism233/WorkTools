# WorkTools · 工作工具箱

在线工具站：**https://lachesism233.github.io/WorkTools/**

纯前端工程计算小工具合集，无需联网、可离线使用。

## 工具列表

| 工具 | 在线地址 | 说明 |
| --- | --- | --- |
| 配合查询 | <https://lachesism233.github.io/WorkTools/peihe-chaxun/> | 依据 GB/T 1800 查询孔轴极限偏差与配合性质，支持基孔制、基轴制与优先配合键盘 |
| 形位公差等级速查 | <https://lachesism233.github.io/WorkTools/gdt-dengji-chaxun/> | 依据 GB/T 1184-1996 查询形位公差等级值（μm）与未注公差值 H/K/L（mm），输入参考尺寸自动落段 |

## 目录结构

每个工具一个文件夹，文件夹名即网址路径，工具入口固定为 `index.html`：

```
index.html            工具站首页（导航卡片）
peihe-chaxun/         配合查询
  └── index.html
gdt-dengji-chaxun/    形位公差等级速查
  └── index.html
.nojekyll             跳过 Jekyll 处理（GitHub Pages 纯静态发布）
```

## 新增 / 更新工具

**新增：**

1. 新建 `工具名/index.html`
2. 在根目录 `index.html` 里复制一张 `.tool-card` 卡片，改链接与文案
3. 提交推送

**更新：** 用新版本覆盖对应文件夹里的 `index.html`，提交推送即可，网址不变。

## 约定

- 文件夹名用全小写英文 / 拼音，链接路径区分大小写、保持一致
- 网页内引用资源用相对路径（`./`、`../assets/`），不要用 `/` 开头的绝对路径
- 需要加载数据时用 `data.js`（`<script src>`）而不是 `fetch`，以保持「双击本地可用」
- 由 GitHub Pages 发布（`main` 分支根目录 + `.nojekyll`）
