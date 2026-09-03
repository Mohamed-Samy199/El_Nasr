import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const LATITUDE = 30.276005;
const LONGITUDE = 30.983408;
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/ENwc7c96cmJBJFgk9";

const LocationSection = ({ isAr }) => {
  const embedSrc = `https://www.google.com/maps?q=${LATITUDE},${LONGITUDE}&hl=${isAr ? "ar" : "en"}&z=16&output=embed`;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-mint bg-mint-pale rounded-full px-3 py-1 mb-4">
          {isAr ? "موقعنا" : "Our Location"}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
          {isAr ? "زورونا في مصنعنا" : "Visit Us at Our Facility"}
        </h2>
      </div>

      <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-stretch">
        {/* الخريطة */}
        <div className="md:col-span-3 relative rounded-[2rem] overflow-hidden border border-line shadow-card min-h-[320px] sm:min-h-[420px]">
          <iframe
            title={isAr ? "موقع الشركة على الخريطة" : "Company location map"}
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, position: "absolute", inset: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* بطاقة المعلومات */}
        <div className="md:col-span-2 bg-card border border-line rounded-[2rem] shadow-card p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-mint-pale text-olive  flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink mb-1">
                  {isAr ? "العنوان" : "Address"}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr ? "أشمون، المنوفية، مصر" : "Asmoun, El Menoufia, Egypt"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-wheat-pale text-ink  flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink mb-1">
                  {isAr ? "الهاتف" : "Phone"}
                </div>
                <a
                  href="tel:01140156010"
                  className="text-sm text-muted-foreground hover:text-mint transition-colors numeric"
                >
                  01140156010
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary text-clay  flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink mb-1">
                  {isAr ? "ساعات العمل" : "Working Hours"}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr ? "السبت - الخميس: 9 ص - 5 م" : "Sat - Thu: 9 AM - 5 PM"}
                </p>
              </div>
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2  bg-olive text-paper px-5 py-3 rounded-xl font-medium text-sm hover:bg-[#1f6b47] transition-colors group"
          >
            <span>{isAr ? "الحصول على الاتجاهات" : "Get Directions"}</span>
            <Navigation size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;