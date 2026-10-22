# 🎮 NiktoBlox 联络我表单 (Opera GX 电竞红黑版)

本项目是专为创作者与社区定制的 **简体中文「联系我」表单系统**，视觉采用 **Opera GX 标志性电竞红黑配色**（Neon Crimson `#FA1E4E` 与 Deep Obsidian 暗夜黑），搭配赛博朋克 HUD 切角与 Web Audio 电竞反馈音效。

> 仓库地址：[https://github.com/NiktoBlox/niktoblox-contact-form-cn](https://github.com/NiktoBlox/niktoblox-contact-form-cn)

---

## 🎨 视觉与交互特色

1. **Opera GX 经典红黑配色与氛围**
   - 核心强调色：Opera GX 经典绯红 `#FA1E4E` 与霓虹红 `#FF2E63`
   - 背景质感：深黑曜石渐变网格、动态光晕（Ambient Glow）与扫描线层
   - 几何切角（Chamfered HUD）电竞风格按钮与状态卡片
2. **Opera GX 交互反馈音效**
   - 基于浏览器 Web Audio API 合成音效（无需加载庞大音频文件）
   - 包含获得焦点、点击、提交成功、校验提示音效
   - 支持一键切换静音并持久保存设置
3. **针对中国大陆与极简中文社区定制**
   - 全简体中文界面、高质量排版字体栈（PingFang SC, Microsoft YaHei, Noto Sans SC）
   - 包含中国常见平台与开发者平台（QQ、GitCode、GitHub、Discord 等）

---

## 📋 表单栏位规范

| 编号 | 字段名称 | 类型 | 说明 / 选项 |
| :--- | :--- | :--- | :--- |
| **01** | **您的昵称** | 文本输入 | 必填，支持中英文昵称与名字 |
| **02** | **您的电子邮箱** | 邮箱输入 | 必填，内置格式校验（`name@example.com`） |
| **03** | **你是怎么找到我的？** | 下拉式菜单 | 1. QQ<br>2. GitCode<br>3. Github<br>4. Discord<br>5. 官方社区<br>6. **其他**（选择后即时平滑展开详细输入框） |
| **04** | **联系类型** | 下拉式菜单 | 1. 一般联系<br>2. 紧急联系<br>3. 合作<br>4. 送礼<br>5. 赞助<br>6. **其他**（选择后即时平滑展开详细输入框） |
| **05** | **消息内容** | 多行文本域 | 必填，支持回车换行与自由垂直拉伸，带实时字符计数 |

---

## 📬 邮件自动推送说明

- 表单提交后无需跳转页面，通过 AJAX 直接提交至 `boedblox1112@gmail.com`。
- **首次激活说明**：
  在首次上线并提交第一封测试消息后，FormSubmit 会发送一封激活确认信到 `boedblox1112@gmail.com`。点击邮件中的 **"Activate Form"** 确认一次后，后续所有访客留言便会实时整洁地以表格形式推送至您的邮箱。

---

## 🚀 部署与上线指南（使用 GitCode / GitCode Pages）

本项目已针对 **GitCode Pages** 进行专属适配（内置 `.gitlab-ci.yml` 自动流水线配置）。

---

### 步骤 1：同步或推送代码到 GitCode

#### 方式 A：从本地直接推送到 GitCode
在本地终端执行：
```powershell
cd "C:\Users\user\.gemini\antigravity\scratch\niktoblox-contact-form-cn"

# 添加 GitCode 远端
git remote add gitcode https://gitcode.com/NiktoBlox/niktoblox-contact-form-cn.git

# 推送到 GitCode
git push -u gitcode main
```

#### 方式 B：在 GitCode 仓库中从 GitHub 强制同步
若仓库是通过 GitHub 导入的，直接在 GitCode 仓库页面右侧点击 **「刷新 / 同步」** 按钮，拉取最新包含 `.gitlab-ci.yml` 的代码。

---

### 步骤 2：自动触发 GitCode Pages 流水线部署

因为项目中已内置了 [`.gitlab-ci.yml`](.gitlab-ci.yml) 配置文件：
1. 每次代码推送到 `main` 分支后，GitCode 会自动运行 **CI/CD 流水线**（点击左侧菜单的 **「CI/CD」➔「流水线 Pipelines」** 可以看到部署进度，显示绿色对勾即代表成功）。
2. 流水线执行完毕后，前往仓库左侧菜单的 **「设置」➔「Pages」**（或直接查看仓库服务中的 Pages）。
3. 页面上会显示分配给您的专属静态网站链接（例如：`https://niktoblox.gitcode.host/niktoblox-contact-form-cn/`）。

---

### 步骤 3：首次启用接收邮箱（重要）

1. 打开部署好的 GitCode Pages 网页，填写一笔测试信息并点击「发送联络消息」。
2. 打开您的 `boedblox1112@gmail.com` 邮箱。
3. 您会收到一封来自 FormSubmit 的确认信，点击信中的 **「Activate Form」**。
4. 激活完成后，今后所有在 GitCode Pages 提交的表单信息，都会直接以结构化表格发送至您的邮箱。

---

## 💻 本地预览测试

- 直接双击打开 `index.html` 即可在任一浏览器中体验完整的界面与音效。
- 或在项目目录下运行简易静态服务器：
  ```bash
  python -m http.server 3000
  ```
  在浏览器访问 `http://localhost:3000` 即可。
