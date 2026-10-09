// ===== 导航栏滚动效果 =====
const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// ===== 返回顶部 =====
backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 导航链接平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===== 技能条动画（滚动触发） =====
const skillFills = document.querySelectorAll(".skill-fill");
let skillsAnimated = false;

function animateSkills() {
    const aboutSection = document.querySelector(".about");
    const rect = aboutSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0 && !skillsAnimated) {
        skillFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = "0%";
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
        skillsAnimated = true;
    }
}

window.addEventListener("scroll", animateSkills);

// ===== 项目卡片入场动画 =====
const projectCards = document.querySelectorAll(".project-card");

function checkCards() {
    const triggerBottom = window.innerHeight * 0.85;

    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, index * 150);
        }
    });
}

// 初始化卡片状态
projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s";
});

window.addEventListener("scroll", checkCards);
checkCards();

// ===== 统计数字动画 =====
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
    const aboutSection = document.querySelector(".about");
    const rect = aboutSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0 && !statsAnimated) {
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isPercent = finalValue.includes("%");
            const target = parseInt(finalValue);
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (isPercent ? "%" : "");
            }, 40);
        });
        statsAnimated = true;
    }
}

window.addEventListener("scroll", animateStats);
