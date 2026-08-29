import { gsap } from "gsap";

/**
 * منطق مشترك لتأثير "ورق الشجر" اللي بيحصل مرة واحدة مع كل hover على
 * الكروت (تصنيفات ومنتجات مع بعض) — مستخرج هنا عشان الكومبوننتين
 * (CategorySection وProductsSection) يستخدموا نفس المنطق بالظبط، مش نسخة
 * منفصلة لكل واحد.
 */
export const LEAF_EMOJIS = ["🍃", "🍂", "🌿", "🌱"];

// تدوير 3 ثيمات ألوان على الكروت حسب الترتيب — نفس فكرة bgAccent/textColor
// الأصلية، بس مربوطة بتوكينز الهوية بتاعتنا
export const ACCENT_THEMES = [
  { badgeBg: "bg-mint-pale", badgeText: "text-olive", glow: "bg-mint" },
  { badgeBg: "bg-wheat-pale", badgeText: "text-ink", glow: "bg-wheat" },
  { badgeBg: "bg-secondary", badgeText: "text-clay", glow: "bg-clay" },
];

/**
 * burst ورق شجر بيحصل مرة واحدة بس مع كل hover — محتوى جوه إطار الصورة
 * بس (الحاوية اللي بتتبعت)، بحركة أفقية من الشمال لليمين.
 *
 * count اختياري (افتراضي 8) — عشان أماكن فيها صورة أعرض (زي ProductsShowcase)
 * تقدر تطلب عدد أكتر من غير ما تأثر على كروت التصنيف/المنتج العادية.
 */
export const spawnLeafBurst = (container, activeTweensRef, count = 8) => {
  if (!container) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rect = container.getBoundingClientRect();
  const totalLeaves = count;

  for (let i = 0; i < totalLeaves; i++) {
    const leaf = document.createElement("span");
    leaf.textContent = LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)];
    leaf.className = "absolute text-base pointer-events-none select-none";
    leaf.style.top = `${Math.random() * 75 + 5}%`;
    leaf.style.left = "-24px";
    leaf.style.opacity = "0";
    container.appendChild(leaf);

    const tl = gsap.timeline({ onComplete: () => leaf.remove() });
    tl.to(leaf, { opacity: 0.9, duration: 0.35 }, 0);
    tl.to(
      leaf,
      {
        x: rect.width + 48,
        y: (Math.random() - 0.5) * 26,
        rotation: Math.random() * 180 - 90,
        duration: 1.5 + Math.random() * 0.6,
        delay: Math.random() * 0.4,
        ease: "power1.inOut",
      },
      0
    );
    tl.to(leaf, { opacity: 0, duration: 0.4 }, ">-0.4");

    activeTweensRef.current.push(tl);
  }
};