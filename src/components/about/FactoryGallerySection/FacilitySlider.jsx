// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
// import {
//   ACCENT_THEMES,
//   spawnLeafBurst,
// } from "../../../utils/leafBurst.js";
// import ImageLightbox from "./ImageLightbox.jsx";
// import com1 from '../../../assests/company/com-1.webp';
// import com2 from '../../../assests/company/com-2.webp';
// import com3 from '../../../assests/company/com-3.webp';
// import com4 from '../../../assests/company/com-4.webp';
// import com5 from '../../../assests/company/com-5.webp';
// import com6 from '../../../assests/company/com-6.webp';

// /**
//  * سلايدر منشأة المصنع
//  *
//  * 3 كروت فقط:
//  * - الكارد النشط في المنتصف
//  * - كارد على اليمين
//  * - كارد على اليسار
//  *
//  * الكروت كبيرة ومتداخلة بشكل بسيط
//  */

// const facilityImages = [
//   {
//     src: com1,
//     captionAr: "خط الفرز والتعبئة",
//     captionEn: "Sorting & packing line",
//   },
//   {
//     src: com2,
//     captionAr: "خط التصنيع",
//     captionEn: "Production line",
//   },
//   {
//     src: com3,
//     captionAr: "المخازن",
//     captionEn: "Storage warehouses",
//   },
//   {
//     src: com4,
//     captionAr: "ضمان النقاء",
//     captionEn: "Purity Guarantee",
//   },
//   {
//     src: com5,
//     captionAr: "فحص الجودة",
//     captionEn: "Quality inspection",
//   },
//   {
//     src: com6,
//     captionAr: "تجهيز الشحنات للتصدير",
//     captionEn: "Export shipment prep",
//   },
// ];

// const AUTOPLAY_MS = 4000;

// // ==============================
// // حجم الكروت
// // ==============================
// const CARD_WIDTH = 330;

// const FacilitySlider = ({ isAr }) => {
//   const total = facilityImages.length;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(null);

//   const leafContainerRefs = useRef([]);
//   const tweenRefs = useRef(
//     facilityImages.map(() => ({
//       current: [],
//     }))
//   );

//   // ==============================
//   // Cleanup
//   // ==============================
//   useEffect(() => {
//     return () => {
//       tweenRefs.current.forEach((refObj) => {
//         refObj.current.forEach((tw) => {
//           if (tw && typeof tw.kill === "function") {
//             tw.kill();
//           }
//         });
//       });
//     };
//   }, []);

//   // ==============================
//   // Leaf burst
//   // ==============================
//   const triggerBurst = (index) => {
//     const container = leafContainerRefs.current[index];

//     if (!container) return;

//     spawnLeafBurst(
//       container,
//       tweenRefs.current[index],
//       10
//     );
//   };

//   // ==============================
//   // Navigation
//   // ==============================
//   const goTo = useCallback(
//     (index) => {
//       setCurrentIndex(
//         ((index % total) + total) % total
//       );
//     },
//     [total]
//   );

//   const handleNext = useCallback(() => {
//     goTo(currentIndex + 1);
//   }, [currentIndex, goTo]);

//   const handlePrev = useCallback(() => {
//     goTo(currentIndex - 1);
//   }, [currentIndex, goTo]);

//   // ==============================
//   // Autoplay
//   // ==============================
//   useEffect(() => {
//     if (
//       isPaused ||
//       lightboxIndex !== null
//     ) {
//       return;
//     }

//     const timer = setInterval(
//       handleNext,
//       AUTOPLAY_MS
//     );

//     return () => clearInterval(timer);
//   }, [
//     isPaused,
//     lightboxIndex,
//     handleNext,
//   ]);

//   // ==============================
//   // RTL / LTR
//   // ==============================
//   const dirSign = isAr ? -1 : 1;

//   // ==============================
//   // Relative position
//   // ==============================
//   const getRelativeOffset = (index) => {
//     let diff = index - currentIndex;

//     if (diff > total / 2) {
//       diff -= total;
//     }

//     if (diff < -total / 2) {
//       diff += total;
//     }

//     return diff;
//   };

//   // ==============================
//   // Card positioning
//   // ==============================
//   const getCardStyle = (relOffset) => {
//     const abs = Math.abs(relOffset);

//     // الكارد النشط
//     if (abs === 0) {
//       return {
//         xOffset: 0,
//         scale: 1,
//         opacity: 1,
//         zIndex: 30,
//       };
//     }

//     // الكروت الجانبية
//     if (abs === 1) {
//       return {
//         xOffset:
//           relOffset *
//           CARD_WIDTH *
//           0.62 *
//           dirSign,

//         scale: 0.88,
//         opacity: 0.72,
//         zIndex: 20,
//       };
//     }

//     // أي كروت أخرى تختفي
//     return {
//       xOffset:
//         (relOffset > 0 ? 1 : -1) *
//         CARD_WIDTH *
//         1.45 *
//         dirSign,

//       scale: 0.7,
//       opacity: 0,
//       zIndex: 0,
//     };
//   };

//   return (
//     <section
//       className="
//         relative
//         max-w-7xl
//         mx-auto
//         px-4
//         sm:px-6
//         pb-14
//         sm:pb-20
//       "
//       onMouseEnter={() =>
//         setIsPaused(true)
//       }
//       onMouseLeave={() =>
//         setIsPaused(false)
//       }
//     >
//       {/* ==============================
//           TITLE
//       =============================== */}

//       <h2
//         className="
//           font-display
//           text-2xl
//           font-semibold
//           text-ink
//           mb-3
//           text-center
//           relative
//           z-10
//         "
//       >
//         {isAr
//           ? "داخل مصنعنا"
//           : "Inside Our Factory"}
//       </h2>

//       <p
//         className="
//           text-muted-foreground
//           text-center
//           max-w-xl
//           mx-auto
//           mb-12
//           relative
//           z-10
//         "
//       >
//         {isAr
//           ? "لمحة حقيقية من داخل خطوط الإنتاج والتعبئة والتصدير."
//           : "A real look inside our production, packing, and export lines."}
//       </p>

//       {/* ==============================
//           SLIDER
//       =============================== */}

//       <div
//         className="
//           relative
//           w-full
//           h-[470px]
//           sm:h-[520px]
//           flex
//           items-center
//           justify-center
//           z-10
//         "
//       >
//         {facilityImages.map(
//           (image, index) => {
//             const theme =
//               ACCENT_THEMES[
//                 index %
//                   ACCENT_THEMES.length
//               ];

//             const relOffset =
//               getRelativeOffset(index);

//             const {
//               xOffset,
//               scale,
//               opacity,
//               zIndex,
//             } =
//               getCardStyle(
//                 relOffset
//               );

//             const isActive =
//               relOffset === 0;

//             return (
//               <motion.div
//                 key={image.src}
//                 animate={{
//                   x: xOffset,
//                   scale,
//                   opacity,
//                 }}
//                 transition={{
//                   duration: 0.55,
//                   ease: [
//                     0.16,
//                     1,
//                     0.3,
//                     1,
//                   ],
//                 }}
//                 className={`
//                   absolute
//                   h-[420px]
//                   sm:h-[470px]
//                   rounded-[1.75rem]
//                   overflow-hidden
//                   cursor-pointer
//                   border
//                   border-line
//                   bg-card
//                   ${
//                     isActive
//                       ? "shadow-2xl"
//                       : "shadow-card"
//                   }
//                 `}
//                 style={{
//                   zIndex,
//                   width: CARD_WIDTH,
//                 }}
//                 onClick={() =>
//                   isActive
//                     ? setLightboxIndex(
//                         index
//                       )
//                     : goTo(index)
//                 }
//                 onMouseEnter={() =>
//                   triggerBurst(index)
//                 }
//                 onTouchStart={() =>
//                   triggerBurst(index)
//                 }
//               >
//                 {/* ==============================
//                     IMAGE
//                 =============================== */}

//                 <img
//                   src={image.src}
//                   alt={
//                     isAr
//                       ? image.captionAr
//                       : image.captionEn
//                   }
//                   className="
//                     absolute
//                     inset-0
//                     w-full
//                     h-full
//                     object-cover
//                   "
//                   loading="lazy"
//                 />

//                 {/* ==============================
//                     SIDE OVERLAY
//                 =============================== */}

//                 {!isActive && (
//                   <div
//                     className="
//                       absolute
//                       inset-0
//                       bg-paper/40
//                     "
//                   />
//                 )}

//                 {/* ==============================
//                     GRADIENT
//                 =============================== */}

//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     bg-gradient-to-t
//                     from-ink/75
//                     via-ink/10
//                     to-transparent
//                   "
//                 />

//                 {/* ==============================
//                     THEME GLOW
//                 =============================== */}

//                 <div
//                   className={`
//                     absolute
//                     inset-0
//                     opacity-20
//                     bg-gradient-to-br
//                     ${theme.glow}
//                   `}
//                 />

//                 {/* ==============================
//                     EXPAND BUTTON
//                 =============================== */}

//                 {isActive && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setLightboxIndex(
//                         index
//                       );
//                     }}
//                     aria-label={
//                       isAr
//                         ? "تكبير الصورة"
//                         : "Expand image"
//                     }
//                     className="
//                       absolute
//                       top-4
//                       end-4
//                       z-20
//                       w-11
//                       h-11
//                       rounded-full
//                       bg-white/90
//                       hover:bg-white
//                       text-ink
//                       flex
//                       items-center
//                       justify-center
//                       shadow-md
//                       transition-colors
//                     "
//                   >
//                     <Expand size={18} />
//                   </button>
//                 )}

//                 {/* ==============================
//                     CAPTION
//                 =============================== */}

//                 <div
//                   className="
//                     absolute
//                     bottom-5
//                     start-5
//                     end-5
//                     z-10
//                   "
//                 >
//                   <span
//                     className="
//                       text-white
//                       text-base
//                       sm:text-lg
//                       font-medium
//                       drop-shadow
//                     "
//                   >
//                     {isAr
//                       ? image.captionAr
//                       : image.captionEn}
//                   </span>
//                 </div>

//                 {/* ==============================
//                     LEAF EFFECT
//                 =============================== */}

//                 <div
//                   ref={(el) => {
//                     leafContainerRefs.current[
//                       index
//                     ] = el;
//                   }}
//                   className="
//                     absolute
//                     inset-0
//                     overflow-hidden
//                     pointer-events-none
//                     z-30
//                   "
//                 />
//               </motion.div>
//             );
//           }
//         )}
//       </div>

//       {/* ==============================
//           CONTROLS
//       =============================== */}

//       <div
//         className="
//           flex
//           items-center
//           justify-center
//           gap-6
//           mt-6
//           relative
//           z-10
//         "
//       >
//         {/* Previous */}

//         <button
//           onClick={handlePrev}
//           aria-label={
//             isAr
//               ? "السابق"
//               : "Previous"
//           }
//           className="
//             w-11
//             h-11
//             rounded-full
//             border
//             border-line
//             bg-card
//             flex
//             items-center
//             justify-center
//             text-ink
//             hover:bg-mint
//             hover:text-white
//             hover:border-mint
//             transition-colors
//             shadow-card
//           "
//         >
//           {isAr ? (
//             <ChevronRight size={18} />
//           ) : (
//             <ChevronLeft size={18} />
//           )}
//         </button>

//         {/* Dots */}

//         <div className="flex items-center gap-2">
//           {facilityImages.map(
//             (_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() =>
//                   goTo(idx)
//                 }
//                 aria-label={`${
//                   isAr
//                     ? "الصورة"
//                     : "Slide"
//                 } ${idx + 1}`}
//                 className={`
//                   h-2
//                   rounded-full
//                   transition-all
//                   duration-300
//                   ${
//                     currentIndex ===
//                     idx
//                       ? "w-8 bg-mint"
//                       : "w-2 bg-line hover:bg-mint/50"
//                   }
//                 `}
//               />
//             )
//           )}
//         </div>

//         {/* Next */}

//         <button
//           onClick={handleNext}
//           aria-label={
//             isAr
//               ? "التالي"
//               : "Next"
//           }
//           className="
//             w-11
//             h-11
//             rounded-full
//             border
//             border-line
//             bg-card
//             flex
//             items-center
//             justify-center
//             text-ink
//             hover:bg-mint
//             hover:text-white
//             hover:border-mint
//             transition-colors
//             shadow-card
//           "
//         >
//           {isAr ? (
//             <ChevronLeft size={18} />
//           ) : (
//             <ChevronRight size={18} />
//           )}
//         </button>
//       </div>

//       {/* ==============================
//           LIGHTBOX
//       =============================== */}

//       {lightboxIndex !== null && (
//         <ImageLightbox
//           images={facilityImages}
//           activeIndex={
//             lightboxIndex
//           }
//           isAr={isAr}
//           onClose={() =>
//             setLightboxIndex(null)
//           }
//           onNavigate={(delta) =>
//             setLightboxIndex(
//               (prev) =>
//                 ((prev + delta) %
//                   total +
//                   total) %
//                 total
//             )
//           }
//         />
//       )}
//     </section>
//   );
// };

// export default FacilitySlider;





import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { ACCENT_THEMES, spawnLeafBurst } from "../../../utils/leafBurst.js";
import ImageLightbox from "./ImageLightbox.jsx";
import com1 from "../../../assests/company/com-1.webp";
import com2 from "../../../assests/company/com-2.webp";
import com3 from "../../../assests/company/com-3.webp";
import com4 from "../../../assests/company/com-4.webp";
import com5 from "../../../assests/company/com-5.webp";
import com6 from "../../../assests/company/com-6.webp";

const AUTOPLAY_MS = 4000;
const DESKTOP_CARD_WIDTH = 330;
const CARD_RATIO = 420 / 330;
const SWIPE_THRESHOLD = 45;

const facilityImages = [
  { src: com1, captionAr: "خط الفرز والتعبئة", captionEn: "Sorting & packing line" },
  { src: com2, captionAr: "خط التصنيع", captionEn: "Production line" },
  { src: com3, captionAr: "المخازن", captionEn: "Storage warehouses" },
  { src: com4, captionAr: "ضمان النقاء", captionEn: "Purity Guarantee" },
  { src: com5, captionAr: "فحص الجودة", captionEn: "Quality inspection" },
  { src: com6, captionAr: "تجهيز الشحنات للتصدير", captionEn: "Export shipment prep" },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function getRelativeOffset(index, currentIndex, total) {
  let offset = index - currentIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function getCardStyle(relativeOffset, cardWidth, direction) {
  const absoluteOffset = Math.abs(relativeOffset);

  if (absoluteOffset === 0) {
    return { x: 0, scale: 1, opacity: 1, zIndex: 30 };
  }

  if (absoluteOffset === 1) {
    return {
      x: relativeOffset * cardWidth * 0.62 * direction,
      scale: 0.88,
      opacity: 0.72,
      zIndex: 20,
    };
  }

  return {
    x: (relativeOffset > 0 ? 1 : -1) * cardWidth * 1.45 * direction,
    scale: 0.7,
    opacity: 0,
    zIndex: 0,
  };
}

const sliderTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

const FacilitySlider = ({ isAr }) => {
  const total = facilityImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [cardWidth, setCardWidth] = useState(DESKTOP_CARD_WIDTH);

  const sliderRef = useRef(null);
  const leafContainerRefs = useRef([]);
  const tweenRefs = useRef(
    facilityImages.map(() => ({ current: [] }))
  );
  const touchStartX = useRef(null);

  // Measure the available space once on resize instead of reading layout during every render.
  useEffect(() => {
    const element = sliderRef.current;
    if (!element) return undefined;

    const updateCardWidth = () => {
      const availableWidth = element.clientWidth;
      const responsiveWidth = clamp(availableWidth * 0.78, 250, DESKTOP_CARD_WIDTH);
      setCardWidth((previous) =>
        Math.abs(previous - responsiveWidth) > 1 ? responsiveWidth : previous
      );
    };

    updateCardWidth();
    const observer = new ResizeObserver(updateCardWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Kill any running leaf tweens when the component unmounts.
  useEffect(() => () => {
    tweenRefs.current.forEach(({ current }) => {
      current.forEach((tween) => tween?.kill?.());
    });
  }, []);

  const goTo = useCallback(
    (index) => {
      setCurrentIndex(((index % total) + total) % total);
    },
    [total]
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + total) % total);
  }, [total]);

  // Functional state updates keep autoplay stable and prevent interval recreation on every slide.
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return undefined;

    const timer = window.setInterval(handleNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [handleNext, isPaused, lightboxIndex]);

  const slides = useMemo(
    () => facilityImages.map((image, index) => ({
      image,
      index,
      theme: ACCENT_THEMES[index % ACCENT_THEMES.length],
    })),
    []
  );

  const direction = isAr ? -1 : 1;
  const cardHeight = cardWidth >= DESKTOP_CARD_WIDTH - 1
    ? 470
    : cardWidth * CARD_RATIO;

  const triggerBurst = useCallback((index) => {
    const container = leafContainerRefs.current[index];
    if (!container) return;
    spawnLeafBurst(container, tweenRefs.current[index], 10);
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX < 0) handleNext();
    else handlePrev();
  };

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="relative z-10 mb-3 text-center font-display text-2xl font-semibold text-ink">
        {isAr ? "داخل مصنعنا" : "Inside Our Factory"}
      </h2>

      <p className="relative z-10 mx-auto mb-12 max-w-xl text-center text-muted-foreground">
        {isAr
          ? "لمحة حقيقية من داخل خطوط الإنتاج والتعبئة والتصدير."
          : "A real look inside our production, packing, and export lines."}
      </p>

      <div
        ref={sliderRef}
        className="relative z-10 flex h-[390px] w-full items-center justify-center overflow-hidden sm:h-[520px]"
        style={{ touchAction: "pan-y" }}
      >
        {slides.map(({ image, index, theme }) => {
          const relativeOffset = getRelativeOffset(index, currentIndex, total);
          const card = getCardStyle(relativeOffset, cardWidth, direction);
          const isActive = relativeOffset === 0;

          return (
            <motion.div
              key={image.src}
              initial={false}
              animate={{ x: card.x, scale: card.scale, opacity: card.opacity }}
              transition={sliderTransition}
              className={`absolute cursor-pointer overflow-hidden rounded-[1.75rem] border border-line bg-card ${isActive ? "shadow-2xl" : "shadow-card"}`}
              style={{ width: cardWidth, height: cardHeight, zIndex: card.zIndex, willChange: "transform, opacity" }}
              onClick={() => (isActive ? setLightboxIndex(index) : goTo(index))}
              onMouseEnter={() => triggerBurst(index)}
            >
              <img
                src={image.src}
                alt={isAr ? image.captionAr : image.captionEn}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />

              {!isActive && <div className="absolute inset-0 bg-paper/40" />}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${theme.glow}`} />

              {isActive && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setLightboxIndex(index);
                  }}
                  aria-label={isAr ? "تكبير الصورة" : "Expand image"}
                  className="absolute end-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-white"
                >
                  <Expand size={18} />
                </button>
              )}

              <div className="absolute bottom-5 start-5 end-5 z-10">
                <span className="text-base font-medium text-white drop-shadow sm:text-lg">
                  {isAr ? image.captionAr : image.captionEn}
                </span>
              </div>

              <div
                ref={(element) => {
                  leafContainerRefs.current[index] = element;
                }}
                className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
              />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label={isAr ? "السابق" : "Previous"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink shadow-card transition-colors hover:border-mint hover:bg-mint hover:text-white"
        >
          {isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label={isAr ? "شرائح الصور" : "Image slides"}>
          {facilityImages.map((_, index) => (
            <button
              type="button"
              role="tab"
              key={index}
              aria-selected={currentIndex === index}
              aria-label={`${isAr ? "الصورة" : "Slide"} ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "w-8 bg-mint" : "w-2 bg-line hover:bg-mint/50"}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label={isAr ? "التالي" : "Next"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink shadow-card transition-colors hover:border-mint hover:bg-mint hover:text-white"
        >
          {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={facilityImages}
          activeIndex={lightboxIndex}
          isAr={isAr}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(delta) => {
            setLightboxIndex((index) => ((index + delta) % total + total) % total);
          }}
        />
      )}
    </section>
  );
};

export default FacilitySlider;
