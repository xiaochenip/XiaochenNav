# 小辰导航（ChenNav）

一个简洁清爽、实用高效的个人网址导航网站，为日常上网、学习办公、娱乐生活提供分类清晰、无广告、极速访问的网址集合。

## 🌟 项目特点

- **简约美观**：现代化的界面设计，采用玻璃拟态效果，视觉效果出色
- **本地部署**：无需服务器，本地部署，安全可靠
- **响应式布局**：适配不同屏幕尺寸，从手机到桌面设备都能良好显示
- **分类清晰**：9个精心划分的分类，涵盖常用网站、AI工具、实用工具等
- **二级分类**：支持子分类功能，更细致地组织网站内容
- **智能搜索**：支持站内搜索和全网搜索，快速找到所需网站
- **主题切换**：支持明暗两种主题，自动保存用户偏好
- **点击排行**：实时统计网站点击量，展示日榜、周榜、月榜
- **自动获取图标**：自动为网站生成favicon图标，提升视觉体验
- **自定义网址**：支持用户添加和管理个人常用网址

## 🛠️ 技术栈

- **前端框架**：HTML5 + TailwindCSS
- **JavaScript**：原生JavaScript，数据驱动视图
- **数据管理**：本地存储（localStorage）用于主题偏好和点击统计
- **图标服务**：自动获取网站favicon
- **响应式设计**：TailwindCSS内置响应式工具

## 📁 项目结构

```
ChenNav/
├── index.html          # 主页面
├── about.html          # 关于页面
├── submit.html         # 网站投稿页面
├── css/
│   └── style.css       # 自定义样式
├── js/
│   ├── main.js         # 主逻辑
│   ├── data.js         # 网站数据
│   └── theme.js        # 主题切换
├── assets/
│   ├── logo.png        # 网站logo
│   └── logohen.png     # 展开状态logo
├── LICENSE             # 许可证
└── README.md           # 项目说明
```

## 🚀 快速开始

1. **克隆项目**
   ```bash
   git clone https://gitee.com/xiaochenip/chennav.git
   cd xiaonav
   ```
2. **本地预览**
   - 直接在浏览器中打开 `index.html` 文件
   - 或使用本地服务器（推荐）：
     ```bash
     # 使用Python
     python -m http.server 8080
     # 或使用Node.js
     npx http-server -p 8080
     ```
3. **访问网站**
   打开浏览器访问 `http://localhost:8080`

## 📚 功能说明

### 1. 分类导航

- 点击左侧边栏的分类图标或顶部导航栏的分类链接
- 支持展开/收起侧边栏，优化空间使用
- **二级分类**：部分分类支持子分类，点击子分类标签可快速切换查看

### 2. 搜索功能

- **站内搜索**：搜索网站标题和描述
- **全网搜索**：支持百度、必应、Google搜索引擎

### 3. 主题切换

- 点击顶部导航栏右侧的主题切换按钮
- 自动保存主题偏好到本地存储

### 4. 点击排行

- 统计网站访问量
- 展示日榜、周榜、月榜
- 帮助用户发现热门网站

### 5. 自定义网址

- 支持添加个人常用网站
- 方便快速访问个人收藏

### 6. 网站投稿

- 用户可以提交新网站
- 支持选择分类和子分类
- 提交后保存在本地存储中

### 7. 关于页面

- 详细介绍项目信息
- 展示所有功能特性

## 🎨 界面设计

- **玻璃拟态**：使用 `backdrop-blur-md` 实现现代玻璃效果
- **平滑动画**：所有交互都有平滑的过渡效果
- **响应式**：适配移动端和桌面端
- **深色模式**：支持系统级深色模式

## 📝 数据管理

网站数据存储在 `js/data.js` 文件中，采用JSON格式：

```javascript
const siteData = {
    categories: [
        {
            id: "common", 
            name: "常用网站", 
            icon: "🌐", 
            order: 1,
            subcategories: [
                { id: "common-work", name: "工作" },
                { id: "common-social", name: "社交" },
                { id: "common-media", name: "媒体" },
                { id: "common-hot", name: "热点" }
            ]
        },
        // 其他分类...
    ],
    sites: [
        {
            id: 1,
            title: "百度",
            description: "中国最大的搜索引擎",
            url: "https://www.baidu.com/",
            category: "common",
            subcategory: "common-media",
            icon: "https://f1.allesedv.com/16/baidu.com/favicon.ico",
            order: 1
        },
        // 其他网站...
    ]
};
```

## 🔧 自定义

1. **添加网站**：编辑 `js/data.js` 文件，在 `sites` 数组中添加新网站
2. **添加分类**：在 `categories` 数组中添加新分类
3. **添加子分类**：在分类对象中添加 `subcategories` 数组
4. **修改样式**：编辑 `css/style.css` 文件自定义样式
5. **修改逻辑**：编辑 `js/main.js` 文件修改功能逻辑

## 📞 联系我们

- QQ：2062077505
- 项目地址：<https://gitee.com/xiaochenip/chennav.git>

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request，一起改进小辰导航！
