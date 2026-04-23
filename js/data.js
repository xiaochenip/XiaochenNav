// 网站数据配置 - 可随时增删改
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
        {
            id: "ai-tools", 
            name: "AI工具集", 
            icon: "🤖", 
            order: 2,
            subcategories: [
                { id: "ai-chat", name: "AI对话" },
                { id: "ai-code", name: "AI编程" },
                { id: "ai-design", name: "AI设计工具" },
                { id: "ai-agent", name: "AI智能体" },
                { id: "ai-image", name: "AI图像处理" }
            ]
        },
        { id: "utility", name: "实用工具", icon: "🔧", order: 3 },
        { id: "gallery", name: "图库壁纸", icon: "🖼️", order: 4 },
        {
            id: "entertainment", 
            name: "影音娱乐", 
            icon: "🎮", 
            order: 5,
            subcategories: [
                { id: "entertainment-video", name: "影视专区" },
                { id: "entertainment-music", name: "音乐专区" },
                { id: "entertainment-anime", name: "动漫专区" },
                { id: "entertainment-reading", name: "阅读专区" },
                { id: "entertainment-game", name: "游戏专区" }
            ]
        },
        { id: "design", name: "设计灵感", icon: "✨", order: 6 },
        { id: "office", name: "办公学习", icon: "📚", order: 7 },
        { id: "life", name: "生活服务", icon: "🏠", order: 8 },
        { id: "resources", name: "资源网站", icon: "📦", order: 9 }
    ],
    sites: [
        // 1. 常用网站
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
        {
            id: 2,
            title: "Google",
            description: "全球最大的搜索引擎",
            url: "https://www.google.com/",
            category: "common",
            subcategory: "common-media",
            icon: "https://f1.allesedv.com/16/google.com/favicon.ico",
            order: 2
        },
        {
            id: 3,
            title: "GitHub",
            description: "全球最大的代码托管平台",
            url: "https://github.com/",
            category: "common",
            subcategory: "common-work",
            icon: "https://f1.allesedv.com/16/github.com/favicon.ico",
            order: 3
        },
        {
            id: 4,
            title: "知乎",
            description: "中文问答社区",
            url: "https://www.zhihu.com/",
            category: "common",
            subcategory: "common-social",
            icon: "https://f1.allesedv.com/16/zhihu.com/favicon.ico",
            order: 4
        },
        
        // 2. AI工具集
        {
            id: 5,
            title: "ChatGPT",
            description: "OpenAI 推出的对话式AI",
            url: "https://chat.openai.com/",
            category: "ai-tools",
            subcategory: "ai-chat",
            icon: "https://f1.allesedv.com/16/openai.com/favicon.ico",
            order: 1
        },
        {
            id: 6,
            title: "Midjourney",
            description: "顶尖AI绘画工具",
            url: "https://www.midjourney.com/",
            category: "ai-tools",
            subcategory: "ai-design",
            icon: "https://f1.allesedv.com/16/midjourney.com/favicon.ico",
            order: 2
        },
        {
            id: 7,
            title: "DeepSeek",
            description: "深度求索AI助手",
            url: "https://chat.deepseek.com/",
            category: "ai-tools",
            subcategory: "ai-chat",
            icon: "https://f1.allesedv.com/16/deepseek.com/favicon.ico",
            order: 3
        },
        
        // 3. 实用工具
        {
            id: 8,
            title: "草料二维码",
            description: "二维码生成工具",
            url: "https://cli.im/",
            category: "utility",
            icon: "https://f1.allesedv.com/16/cli.im/favicon.ico",
            order: 1
        },
        {
            id: 9,
            title: "在线PS",
            description: "浏览器中的Photoshop",
            url: "https://www.photopea.com/",
            category: "utility",
            icon: "https://f1.allesedv.com/16/photopea.com/favicon.ico",
            order: 2
        },
        
        // 4. 图库壁纸
        {
            id: 10,
            title: "Unsplash",
            description: "免费高清图片",
            url: "https://unsplash.com/",
            category: "gallery",
            icon: "https://f1.allesedv.com/16/unsplash.com/favicon.ico",
            order: 1
        },
        {
            id: 11,
            title: "Pexels",
            description: "免费库存照片",
            url: "https://www.pexels.com/",
            category: "gallery",
            icon: "https://f1.allesedv.com/16/pexels.com/favicon.ico",
            order: 2
        },
        
        // 5. 影音娱乐
        {
            id: 12,
            title: "B站",
            description: "哔哩哔哩视频网站",
            url: "https://www.bilibili.com/",
            category: "entertainment",
            subcategory: "entertainment-video",
            icon: "https://f1.allesedv.com/16/bilibili.com/favicon.ico",
            order: 1
        },
        {
            id: 13,
            title: "网易云音乐",
            description: "音乐 streaming 平台",
            url: "https://music.163.com/",
            category: "entertainment",
            subcategory: "entertainment-music",
            icon: "https://f1.allesedv.com/16/music.163.com/favicon.ico",
            order: 2
        },
        
        // 6. 设计灵感
        {
            id: 14,
            title: "Dribbble",
            description: "设计师作品分享平台",
            url: "https://dribbble.com/",
            category: "design",
            icon: "https://f1.allesedv.com/16/dribbble.com/favicon.ico",
            order: 1
        },
        {
            id: 15,
            title: "Behance",
            description: "创意作品展示平台",
            url: "https://www.behance.net/",
            category: "design",
            icon: "https://f1.allesedv.com/16/behance.net/favicon.ico",
            order: 2
        },
        
        // 7. 办公学习
        {
            id: 16,
            title: "Notion",
            description: "一站式工作空间",
            url: "https://www.notion.so/",
            category: "office",
            icon: "https://f1.allesedv.com/16/notion.so/favicon.ico",
            order: 1
        },
        {
            id: 17,
            title: "腾讯文档",
            description: "在线协作文档",
            url: "https://docs.qq.com/",
            category: "office",
            icon: "https://f1.allesedv.com/16/docs.qq.com/favicon.ico",
            order: 2
        },
        
        // 8. 生活服务
        {
            id: 18,
            title: "美团",
            description: "外卖、团购服务",
            url: "https://www.meituan.com/",
            category: "life",
            icon: "https://f1.allesedv.com/16/meituan.com/favicon.ico",
            order: 1
        },
        {
            id: 19,
            title: "高德地图",
            description: "地图导航服务",
            url: "https://www.amap.com/",
            category: "life",
            icon: "https://f1.allesedv.com/16/amap.com/favicon.ico",
            order: 2
        },
        
        // 9. 资源网站
        {
            id: 20,
            title: "GitHub Trending",
            description: "热门开源项目",
            url: "https://github.com/trending",
            category: "resources",
            icon: "https://f1.allesedv.com/16/github.com/favicon.ico",
            order: 1
        },
        {
            id: 21,
            title: "Stack Overflow",
            description: "编程问答社区",
            url: "https://stackoverflow.com/",
            category: "resources",
            icon: "https://f1.allesedv.com/16/stackoverflow.com/favicon.ico",
            order: 2
        }
    ]
};

// 辅助：按order排序
siteData.categories.sort((a, b) => a.order - b.order);
siteData.sites.sort((a, b) => a.order - b.order);
