# 上海百鱼电子科技有限公司 · 企业官网

> **Shanghai Baiyu Electronic Technology Co., Ltd. Official Website**
> 静态 HTML · 中英文切换 · GitHub Pages 一键部署

一个零依赖、纯静态、支持中英文双语切换的企业官网，适合本地直接打开预览，也可直接推到 GitHub Pages / 任意静态托管。

预览：直接双击 `index.html`，或在仓库根目录执行 `python -m http.server 8080`。

- **官网**：https://www.petzest.cn
- **电话**：021-57475098
- **邮箱**：feng@petzest.cn

---

## ✨ 特性

- 🌍 **中英双语切换** —— 右上一键切换，偏好持久化到 localStorage
- 📱 **响应式设计** —— 桌面 / 平板 / 手机三套断点，hamburger 菜单
- 🎨 **视觉吸睛** —— 蓝白商务风 + 金橙点缀，渐变 / 卡片 / 阴影 / 微动效
- ⚡ **零依赖** —— 纯 HTML + CSS + 原生 JS，无 jQuery / Bootstrap / Tailwind 等
- 🚀 **秒级部署** —— 推 GitHub 即可走 Pages，国内可部署到 Gitee Pages / Vercel / Netlify
- 🔍 **SEO 友好** —— 语义化标签、Meta description、懒加载图片

---

## 📁 目录结构

```
baiyu-website/
├── index.html             # 主页面（所有 section 都在单页）
├── css/
│   └── style.css          # 唯一样式表（变量化设计）
├── js/
│   ├── lang.js            # i18n 字典 + 语言切换
│   └── main.js            # 交互（滚动动画 / 菜单 / 数字滚动）
├── images/
│   ├── logo.png           # Baiyu 蓝白 logo
│   ├── pets-banner.jpg    # Hero 背景（宠物/公司元素）
│   ├── pets-product.jpg   # 宠物食品展示
│   ├── project-qiuling.jpg  # 金山秋灵路地块商品房
│   ├── project-jindi.jpg   # 车墩俞塘北（金地·新乐里）
│   └── project-chedun.jpg  # 南桥 29-02 地块
├── README.md
├── .gitignore
└── _config.yml             # Jekyll 配置（不影响纯静态）
```

---

## 🛠️ 本地预览

### 方式 1：直接打开

双击 `index.html` 即可在浏览器中查看（最简单）。

### 方式 2：本地 HTTP server（推荐）

避免 `file://` 协议下某些浏览器对相对路径的怪异行为，建议起一个静态 server：

```bash
# Python 3
cd baiyu-website
python -m http.server 8080
# 浏览器打开 http://localhost:8080

# Node.js 22
npx --yes serve -l 8080

# PowerShell 自带
python -m http.server 8080
```

---

## 🌐 部署到 GitHub Pages

### 一、最简单：直接 push 到 `main`

1. 在 GitHub 新建仓库 `baiyu-website`（Public）。
2. 推送到 `main` 分支：

```bash
cd baiyu-website
git init
git add .
git commit -m "feat: initial commit - Baiyu official website"
git branch -M main
git remote add origin https://github.com/<your-org>/baiyu-website.git
git push -u origin main
```

3. 仓库 → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save。
4. 等 1-3 分钟，访问 `https://<your-org>.github.io/baiyu-website/` 即可看到站点。

### 二、自定义域名（已配置好）

仓库根目录的 `CNAME` 已经写好：

```
www.petzest.cn
```

GitHub Pages 会自动读取。你只需要在 DNS 服务商处添加一条 CNAME 记录：

| 类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | `www` | `<your-org>.github.io` |

> 💡 建议同时把根域名 `petzest.cn` 做 URL 转发到 `www.petzest.cn`（显性转发，301）。
> 若你要用 apex 裸域（`petzest.cn` 不带 www），则改为添加 A 记录指向 GitHub Pages 的四个 IP：
> `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`

DNS 生效后，在 Settings → Pages → Custom domain 填入 `www.petzest.cn`，勾选 **Enforce HTTPS**，等证书签发即可。

---

## 🈯 中英文切换实现说明

- 所有需要翻译的 HTML 元素加上 `data-i18n="key"` 属性。
- `js/lang.js` 中维护 `i18n.zh` / `i18n.en` 两个字典对象。
- 切换时遍历所有 `[data-i18n]` 元素，写入对应语言的值。
- 用户偏好写入 `localStorage.by-lang`，下次访问自动应用。

新增翻译字段的方法：

1. 在 HTML 中加 `<span data-i18n="foo">默认文案</span>`。
2. 在 `js/lang.js` 的 `zh` 和 `en` 中都加一条 `"foo": "..."`。

---

## 📞 公司信息

| 项目 | 内容 |
|---|---|
| 公司全称 | 上海百鱼电子科技有限公司 |
| English | Shanghai Baiyu Electronic Technology Co., Ltd. |
| 官网 | https://www.petzest.cn |
| 成立 | 2011-04-06 |
| 注册资本 | 1000 万元 |
| 地址 | 上海市奉贤区光宾路 458 号 6 幢三层 |
| 统一社会信用代码 | 91310120572666203H |
| 建筑业企业资质 | D231595057（施工劳务不分等级） |
| 安许证 | 〔沪〕JZ安许证字〔2019〕040975 |
| **电话** | **021-57475098** |
| **邮箱** | **feng@petzest.cn** |

> ⚠️ 上线前只剩一处待替换：`沪 ICP 备 XXXXXXXX 号`（页脚备案号），请填入真实 ICP 备案号。
> 电话/邮箱已做成 `tel:` / `mailto:` 可点击链接，手机端点一下即可拨打或发信。

---

## 🧰 技术栈

- **HTML5** 语义化标签
- **CSS3** 自定义属性 / Grid / Flexbox / 动画
- **JS** 原生 ES6+，无任何运行时依赖
- **图片**：JPG / PNG，本地静态资源

---

## 📜 License

Copyright © Shanghai Baiyu Electronic Technology Co., Ltd. All Rights Reserved.
Re-use of the layout code is permitted for company-internal use only.

---

_Made with 🐂 for a steadier foundation._
