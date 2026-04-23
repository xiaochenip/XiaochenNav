// 主逻辑

let currentCategory = "all";      // 当前选中的分类ID
let currentKeyword = "";          // 当前搜索关键词
let sites = [];                   // 存储网站数据
let categories = [];              // 存储分类数据

// DOM 元素
const leftNav = document.getElementById("leftNav");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const noResultsDiv = document.getElementById("noResults");
const latestSitesList = document.getElementById("latestSites");
const hotCategoriesDiv = document.getElementById("hotCategories");
const rankList = document.getElementById("rankList");
const rankTabs = document.querySelectorAll(".rank-tab");

// 从URL提取域名
function getDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (e) {
        return '';
    }
}

// 生成Favicon URL
function getFaviconUrl(url) {
    const domain = getDomain(url);
    if (!domain) return '';
    // 使用国内可访问的服务
    return `https://f1.allesedv.com/16/${domain}/favicon.ico`;
}

// 初始化点击统计数据
function initClickStats() {
    const today = new Date().toDateString();
    const weekKey = `week_${Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))}`;
    const monthKey = `month_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    
    // 初始化本地存储
    if (!localStorage.getItem('clickStats')) {
        localStorage.setItem('clickStats', JSON.stringify({
            [today]: {},
            [weekKey]: {},
            [monthKey]: {}
        }));
    }
}

// 记录点击
function recordClick(siteId) {
    const stats = JSON.parse(localStorage.getItem('clickStats') || '{}');
    const today = new Date().toDateString();
    const weekKey = `week_${Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))}`;
    const monthKey = `month_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    
    // 确保日期键存在
    if (!stats[today]) stats[today] = {};
    if (!stats[weekKey]) stats[weekKey] = {};
    if (!stats[monthKey]) stats[monthKey] = {};
    
    // 增加点击计数
    stats[today][siteId] = (stats[today][siteId] || 0) + 1;
    stats[weekKey][siteId] = (stats[weekKey][siteId] || 0) + 1;
    stats[monthKey][siteId] = (stats[monthKey][siteId] || 0) + 1;
    
    localStorage.setItem('clickStats', JSON.stringify(stats));
}

// 获取排行榜数据
function getRankings(period) {
    const stats = JSON.parse(localStorage.getItem('clickStats') || '{}');
    let periodKey = '';
    
    switch(period) {
        case 'day':
            periodKey = new Date().toDateString();
            break;
        case 'week':
            periodKey = `week_${Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))}`;
            break;
        case 'month':
            periodKey = `month_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
            break;
    }
    
    const periodStats = stats[periodKey] || {};
    const rankings = [];
    
    for (const [siteId, clicks] of Object.entries(periodStats)) {
        const site = sites.find(s => s.id == siteId);
        if (site) {
            rankings.push({ ...site, clicks });
        }
    }
    
    return rankings.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
}

// 渲染排行榜
function renderRankings(period = 'day') {
    const rankings = getRankings(period);
    let html = '';
    
    if (rankings.length === 0) {
        html = `<li class="text-center text-sm text-gray-500 dark:text-gray-400 py-4">暂无数据</li>`;
    } else {
        rankings.forEach((site, index) => {
            const iconUrl = site.icon || getFaviconUrl(site.url);
            html += `
                <li class="flex items-center space-x-3">
                    <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${index === 0 ? 'bg-yellow-400 text-white' : index === 1 ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200' : index === 2 ? 'bg-orange-700 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}">
                        ${index + 1}
                    </span>
                    <img src="${iconUrl}" alt="${site.title}" class="w-5 h-5 rounded" 
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%239CA3AF\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3E%3C/svg%3E'">
                    <div class="flex-1 min-w-0">
                        <a href="${site.url}" target="_blank" rel="noopener noreferrer" 
                           class="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 truncate">
                            ${escapeHtml(site.title)}
                        </a>
                        <span class="text-xs text-gray-500 dark:text-gray-400">${site.clicks} 次点击</span>
                    </div>
                </li>
            `;
        });
    }
    
    rankList.innerHTML = html;
}

// 初始化加载数据
function init() {
    sites = siteData.sites;
    categories = siteData.categories;
    
    // 自动补充图标（如果没有提供）
    sites.forEach(site => {
        if (!site.icon || site.icon === '') {
            site.icon = getFaviconUrl(site.url);
        }
    });
    
    initClickStats();
    renderLeftNav();
    // 设置初始侧边栏宽度和logo
    updateSidebarWidth();
    renderSites();
    renderLatestSites();
    renderHotCategories();
    renderRankings();
    setupEventListeners();
    setupTheme();
}

// 渲染左侧导航
let navCollapsed = true; // 导航栏收起状态

// 更新侧边栏宽度和logo
function updateSidebarWidth() {
    const sidebar = document.querySelector("aside");
    const logo = document.getElementById("logoImage");
    const navItems = document.querySelectorAll("#leftNav .nav-item span.text-sm");
    const mainContent = document.getElementById("mainContent");
    
    // 防止快速点击导致的卡顿
    if (sidebar.dataset.animating) return;
    sidebar.dataset.animating = "true";
    
    if (navCollapsed) {
        // 收起时
        sidebar.style.width = "4rem";
        mainContent.style.marginLeft = "0";
        // 收起时显示默认logo
        logo.src = "assets/logo.png";
        logo.style.width = "32px";
        logo.style.height = "32px";
        // 淡出文字
        navItems.forEach(span => {
            span.style.opacity = "0";
            span.style.pointerEvents = "none";
        });
        // 动画结束
        setTimeout(() => {
            delete sidebar.dataset.animating;
        }, 300);
    } else {
        // 展开时
        sidebar.style.width = "10rem";
        mainContent.style.marginLeft = "0";
        // 展开时显示logohen.png
        logo.src = "assets/logohen.png";
        logo.style.width = "100px";
        logo.style.height = "32px";
        logo.style.objectFit = "contain";
        // 淡入文字
        navItems.forEach(span => {
            span.style.opacity = "1";
            span.style.pointerEvents = "auto";
        });
        // 动画结束
        setTimeout(() => {
            delete sidebar.dataset.animating;
        }, 300);
    }
}

function renderLeftNav() {
    let html = `
        <button data-category="all" class="nav-item w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'all' ? 'active' : 'text-gray-500 dark:text-gray-400'}">
            <span class="text-xl mr-2">🏠</span>
            <span class="text-sm transition-opacity duration-300">全部</span>
        </button>
    `;
    
    categories.forEach(cat => {
        html += `
            <button data-category="${cat.id}" class="nav-item w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === cat.id ? 'active' : 'text-gray-500 dark:text-gray-400'}">
                <span class="text-xl mr-2">${cat.icon}</span>
                <span class="text-sm transition-opacity duration-300">${cat.name}</span>
            </button>
        `;
    });
    
    // 添加收起/展开按钮
    html += `
        <button id="toggleNav" class="nav-item w-full flex items-center px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <span class="text-xl mr-2">${navCollapsed ? '📂' : '📁'}</span>
            <span class="text-sm transition-opacity duration-300">${navCollapsed ? '展开' : '收起'}</span>
        </button>
    `;
    
    leftNav.innerHTML = html;
    
    // 绑定分类点击事件
    document.querySelectorAll("#leftNav .nav-item:not(#toggleNav)").forEach(item => {
        item.addEventListener("click", () => {
            currentCategory = item.dataset.category;
            currentKeyword = "";
            searchInput.value = "";
            renderLeftNav();
            renderSites();
            updateCategoryTitle();
        });
    });
    
    // 绑定收起/展开按钮事件
    document.getElementById("toggleNav").addEventListener("click", () => {
        navCollapsed = !navCollapsed;
        // 更新侧边栏宽度和logo
        updateSidebarWidth();
    });
}

// 获取过滤后的网站列表
function getFilteredSites() {
    let filtered = [...sites];
    
    // 按分类过滤
    if (currentCategory !== "all") {
        filtered = filtered.filter(site => site.category === currentCategory);
    }
    
    // 按关键词过滤
    if (currentKeyword.trim() !== "") {
        const kw = currentKeyword.trim().toLowerCase();
        filtered = filtered.filter(site => 
            site.title.toLowerCase().includes(kw) || 
            site.description.toLowerCase().includes(kw)
        );
    }
    
    return filtered;
}

// 渲染分类区块
function renderSites() {
    const filtered = getFilteredSites();
    const total = filtered.length;
    
    if (total === 0) {
        document.getElementById('categorySections').innerHTML = "";
        noResultsDiv.classList.remove("hidden");
        return;
    }
    noResultsDiv.classList.add("hidden");
    
    let html = "";
    
    // 按分类分组
    const sitesByCategory = {};
    filtered.forEach(site => {
        if (!sitesByCategory[site.category]) {
            sitesByCategory[site.category] = [];
        }
        sitesByCategory[site.category].push(site);
    });
    
    // 按分类顺序渲染
    categories.forEach(cat => {
        const categorySites = sitesByCategory[cat.id];
        if (categorySites && categorySites.length > 0) {
            html += `
                <div id="category-${cat.id}" class="mb-8 scroll-mt-8">
                    <div class="flex items-center mb-4">
                        <h2 class="category-title text-lg font-semibold text-gray-800 dark:text-white">
                            ${cat.icon} ${cat.name}
                        </h2>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            `;
            
            categorySites.forEach(site => {
                const iconUrl = site.icon || getFaviconUrl(site.url);
                html += `
                    <a href="${site.url}" target="_blank" rel="noopener noreferrer" 
                       class="card-hover group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100/50 dark:border-gray-700/50 hover:border-blue-200/70 dark:hover:border-blue-800/70"
                       onclick="recordClick(${site.id})"><div class="flex items-start space-x-3">
                            <img src="${iconUrl}" alt="${site.title}" 
                                 class="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%239CA3AF\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3E%3C/svg%3E'">
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                    ${escapeHtml(site.title)}
                                </h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                    ${escapeHtml(site.description)}
                                </p>
                            </div>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    });
    
    document.getElementById('categorySections').innerHTML = html;
    
    // 如果有特定分类，滚动到该分类
    if (currentCategory !== 'all') {
        const categoryElement = document.getElementById(`category-${currentCategory}`);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        // 选择全部时，滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 渲染最新收录（取最后5个）
function renderLatestSites() {
    const latest = [...sites].reverse().slice(0, 5);
    let html = "";
    
    latest.forEach(site => {
        const iconUrl = site.icon || getFaviconUrl(site.url);
        html += `
            <li>
                <a href="${site.url}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <img src="${iconUrl}" alt="" class="w-4 h-4 rounded"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%239CA3AF\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3E%3C/svg%3E'">
                    <span class="truncate">${escapeHtml(site.title)}</span>
                </a>
            </li>
        `;
    });
    
    latestSitesList.innerHTML = html;
}

// 渲染热门分类
function renderHotCategories() {
    const hotCats = categories.slice(0, 6);
    let html = "";
    
    hotCats.forEach(cat => {
        html += `
            <button onclick="filterByCategory('${cat.id}')" 
                    class="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition">
                ${cat.icon} ${cat.name}
            </button>
        `;
    });
    
    hotCategoriesDiv.innerHTML = html;
}

// 按分类筛选（供右侧热门分类使用）
function filterByCategory(catId) {
    currentCategory = catId;
    currentKeyword = "";
    searchInput.value = "";
    renderLeftNav();
    renderSites();
}





// 搜索功能
function doSearch() {
    const keyword = searchInput.value.trim();
    
    if (keyword === "") return;
    
    if (currentSearchMode === 'site') {
        // 站内搜索
        currentKeyword = keyword;
        renderSites();
    } else {
        // 全网搜索
        const engine = document.querySelector('input[name="searchEngine"]:checked')?.value || 'baidu';
        const searchUrls = {
            baidu: `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`,
            bing: `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`,
            google: `https://www.google.com/search?q=${encodeURIComponent(keyword)}`
        };
        window.open(searchUrls[engine], "_blank");
    }
}

// 主题切换
function setupTheme() {
    const isDark = localStorage.getItem("theme") === "dark" || 
                   (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    
    themeToggle.addEventListener("click", () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });
}

// 返回顶部
function setupBackToTop() {
    const mainContent = document.getElementById('mainContent');
    mainContent.addEventListener("scroll", () => {
        if (mainContent.scrollTop > 300) {
            backToTop.classList.remove("hidden");
        } else {
            backToTop.classList.add("hidden");
        }
    });

    backToTop.addEventListener("click", () => {
        mainContent.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 当前搜索模式
let currentSearchMode = 'site'; // 'site' 或 'web'

// 事件监听
function setupEventListeners() {
    searchBtn.addEventListener("click", doSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") doSearch();
    });
    setupBackToTop();
    
    // 搜索模式切换
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有标签的活跃状态
            document.querySelectorAll('.tab-item').forEach(t => {
                t.classList.remove('active', 'text-gray-900', 'dark:text-white');
                t.classList.add('text-gray-500', 'dark:text-gray-400');
            });
            // 设置当前标签为活跃
            tab.classList.add('active', 'text-gray-900', 'dark:text-white');
            tab.classList.remove('text-gray-500', 'dark:text-gray-400');
            
            // 更新搜索模式
            currentSearchMode = tab.dataset.mode;
            
            // 显示/隐藏搜索引擎选择
            const engineSelect = document.getElementById('searchEngineSelect');
            if (currentSearchMode === 'web') {
                engineSelect.classList.remove('hidden');
            } else {
                engineSelect.classList.add('hidden');
            }
        });
    });
    
    // 排行榜标签切换
    document.querySelectorAll('.rank-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有标签的活跃状态
            document.querySelectorAll('.rank-tab').forEach(t => {
                t.classList.remove('active', 'bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
                t.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300');
            });
            // 设置当前标签为活跃
            tab.classList.add('active', 'bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            tab.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300');
            // 渲染对应周期的排行榜
            renderRankings(tab.dataset.period);
        });
    });
}

// 简单的防XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// 页面启动
init();
