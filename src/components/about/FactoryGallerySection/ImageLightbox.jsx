import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";


const ImageLightbox = ({ images, activeIndex, isAr, onClose, onNavigate }) => {
  const image = images[activeIndex];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(isAr ? -1 : 1);
      if (e.key === "ArrowLeft") onNavigate(isAr ? 1 : -1);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onNavigate, isAr]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label={isAr ? "إغلاق" : "Close"}
        className="absolute top-5 end-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X size={22} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(isAr ? 1 : -1); }}
        aria-label={isAr ? "السابق" : "Previous"}
        className="absolute top-1/2 -translate-y-1/2 start-3 sm:start-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <ChevronLeft size={22} className={isAr ? "rotate-180" : ""} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(isAr ? -1 : 1); }}
        aria-label={isAr ? "التالي" : "Next"}
        className="absolute top-1/2 -translate-y-1/2 end-3 sm:end-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <ChevronRight size={22} className={isAr ? "rotate-180" : ""} />
      </button>

      <img
        src={image.src}
        alt={isAr ? image.captionAr : image.captionEn}
        className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <div
        className="absolute bottom-6 inset-x-0 text-center text-white/90 text-sm px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {isAr ? image.captionAr : image.captionEn}
      </div>
    </div>
  );
};

export default ImageLightbox;