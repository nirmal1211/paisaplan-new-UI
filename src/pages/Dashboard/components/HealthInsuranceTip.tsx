import React from "react";
import { HeartPulse, ShieldPlus, Stethoscope, Activity } from "lucide-react";
import { Button } from "../../../components/UI/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../../components/UI/carousel";

interface TipItem {
  id: string;
  title: string;
  highlight: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: React.ReactNode;
  tone?: "success" | "primary";
}

const tips: TipItem[] = [
  {
    id: "weather",
    title: "Health Insurance Tip",
    highlight: "High humidity & monsoon season",
    description:
      "increases the risk of waterborne and vector-borne diseases. Strengthen preparedness with comprehensive cover.",
    bullets: [
      "Cashless hospitalization for seasonal illnesses",
      "Coverage for dengue, malaria, viral fevers",
      "24x7 telemedicine & doctor consultations",
      "Wellness benefits & preventive checkups",
    ],
    ctaLabel: "Explore Health Plans",
    ctaHref: "/buy-policy/health-insurance",
    icon: <HeartPulse className="h-5 w-5" />,
    tone: "success",
  },
  {
    id: "preventive",
    title: "Preventive Care Boost",
    highlight: "Early screening & diagnostics",
    description:
      "reduce long-term costs and improve health outcomes. Plans with wellness add-ons amplify value.",
    bullets: [
      "Annual full-body checkup allowance",
      "No-claim wellness rewards & OPD cover",
      "Chronic condition management support",
      "Digital health records & tracking",
    ],
    ctaLabel: "Compare Preventive Covers",
    ctaHref: "/buy-policy/health-insurance",
    icon: <Stethoscope className="h-5 w-5" />,
    tone: "primary",
  },
  {
    id: "critical",
    title: "Critical Illness Strategy",
    highlight: "Rising treatment inflation",
    description:
      "makes a dedicated critical illness rider essential for financial resilience & recovery time.",
    bullets: [
      "Lump-sum payout on diagnosis",
      "Covers 30+ major illnesses",
      "Income replacement support",
      "Tax benefits under 80D",
    ],
    ctaLabel: "Add Critical Cover",
    ctaHref: "/buy-policy/health-insurance",
    icon: <ShieldPlus className="h-5 w-5" />,
    tone: "primary",
  },
  {
    id: "activity",
    title: "Lifestyle Optimization",
    highlight: "Activity tracking & wellness",
    description:
      "incentivize healthy habits with plans that reward daily movement & nutrition adherence.",
    bullets: [
      "Wearable integration discounts",
      "Dynamic premium benefit tiers",
      "Nutritionist & coach access",
      "Step-based reward multipliers",
    ],
    ctaLabel: "See Wellness Plans",
    ctaHref: "/buy-policy/health-insurance",
    icon: <Activity className="h-5 w-5" />,
    tone: "success",
  },
];

export const HealthInsuranceTip: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    if (paused) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = window.setInterval(() => {
      if (!api) return;
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 5000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [api, paused]);

  // Dynamic background based on active tip tone
  const activeTip = tips[current];
  const activeToneColor =
    activeTip.tone === "success"
      ? "var(--color-success)"
      : "var(--color-primary)";
  const fg = "var(--color-primary-foreground)";
  const mutedOnTone = "rgba(255,255,255,0.75)";

  return (
    <div className="mb-16" aria-label="Health insurance tips carousel">
      <div
        className="rounded-2xl p-5 md:p-7 relative overflow-hidden border transition-colors duration-500"
        style={{
          backgroundColor: activeToneColor,
          borderColor: activeToneColor,
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* subtle ambient shapes */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute -top-14 -right-14 w-52 h-52 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="absolute -bottom-16 -left-10 w-44 h-44 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
            }}
          />
        </div>

        <Carousel
          className="relative"
          opts={{ loop: true, align: "start" }}
          setApi={setApi}
        >
          <CarouselContent>
            {tips.map((tip) => (
              <CarouselItem key={tip.id} className="basis-full">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: fg,
                          color: activeToneColor,
                        }}
                      >
                        {tip.icon}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="font-poppins font-semibold text-base md:text-lg tracking-tight"
                          style={{ color: fg }}
                        >
                          {tip.title}
                        </h3>
                        <div
                          className="text-[10px] md:text-xs font-roboto uppercase tracking-wide"
                          style={{ color: mutedOnTone }}
                        >
                          Smart Advisory
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-[11px] md:text-xs font-roboto mb-2 leading-relaxed"
                      style={{ color: mutedOnTone }}
                    >
                      <span className="font-semibold" style={{ color: fg }}>
                        {tip.highlight}
                      </span>{" "}
                      {tip.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6 text-[11px] font-roboto mb-4">
                      {tip.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className="mt-1 inline-block h-1.5 w-1.5 rounded-sm"
                            style={{ background: fg }}
                          />
                          <span
                            className="leading-snug"
                            style={{ color: mutedOnTone }}
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="py-2 px-4 rounded-lg font-roboto font-semibold text-[11px] md:text-xs transition-transform duration-300 hover:scale-[1.03]"
                      style={{
                        backgroundColor: fg,
                        color: activeToneColor,
                      }}
                      asChild
                    >
                      <a href={tip.ctaHref}>{tip.ctaLabel}</a>
                    </Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="relative">
                      <img
                        src="/weatherHealth.png"
                        alt="Health Tip Visual"
                        className="w-24 md:w-32 h-auto drop-shadow-xl select-none pointer-events-none"
                        style={{
                          filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.15))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
            {/* dots */}
            <div className="flex items-center gap-1" aria-label="slides">
              {tips.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => api && api.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-primary-foreground)] ${
                    current === i ? "w-5" : "w-3"
                  }`}
                  style={{
                    backgroundColor:
                      current === i
                        ? "var(--color-foreground)"
                        : "rgba(0,0,0,0.38)",
                    opacity: current === i ? 0.9 : 0.55,
                    boxShadow:
                      current === i
                        ? "0 0 0 1px rgba(255,255,255,0.4)"
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
