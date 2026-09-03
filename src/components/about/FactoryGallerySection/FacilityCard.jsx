import { useRef, useEffect } from "react";
import { Factory, ZoomIn } from "lucide-react";
import { spawnLeafBurst } from "../../../utils/leafBurst";


const FacilityCard = ({ image, caption, onOpen }) => {
  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);

  useEffect(() => {
    return () => {
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const triggerBurst = () => {
    if (image.src) spawnLeafBurst(leavesRef.current, activeTweensRef, 12);
  };

  return (
    <div
      onClick={() => image.src && onOpen()}
      onMouseEnter={triggerBurst}
      onTouchStart={triggerBurst}
      className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-card border border-line shadow-xl cursor-pointer"
    >
      {image.src ? (
        <img
          src={image.src}
          alt={caption}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
        />
      ) : (
        <div className="w-full h-full bg-mint-pale flex flex-col items-center justify-center gap-2">
          <Factory size={40} className="text-olive/40" strokeWidth={1.5} />
          <span className="text-xs font-medium text-olive/60">Photo coming soon</span>
        </div>
      )}

      {/* تدرّج عند hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* أيقونة التكبير — بدل زرار الـ Play */}
      {image.src && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
          <div className="w-14 h-14 rounded-full bg-paper text-olive flex items-center justify-center shadow-2xl">
            <ZoomIn size={22} />
          </div>
        </div>
      )}

      {/* التسمية */}
      {caption && image.src && (
        <div className="absolute bottom-4 start-4 end-4 z-10 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {caption}
        </div>
      )}

      {/* ورق الشجر بيطير جوه إطار الصورة بس */}
      <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
    </div>
  );
};

export default FacilityCard;