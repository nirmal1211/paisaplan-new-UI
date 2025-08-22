import React from "react";
import { Award, ExternalLink, Phone, CheckCircle } from "lucide-react";
import { governmentSchemes } from "../data";
import { GovernmentScheme } from "../types";
import { Button } from "../../../components/UI/button";

export const GovernmentSchemes: React.FC = () => {
  return (
    <section className="mb-16 relative">
      <div
        className="rounded-2xl shadow-xl p-4 md:p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex items-center space-x-2 mb-6">
          <div
            className="p-2 rounded-xl shadow-lg"
            style={{ backgroundColor: "var(--color-warning)" }}
          >
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              Government Schemes
            </h2>
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Explore government-backed insurance programs with guaranteed
              benefits
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {governmentSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SchemeCard = ({ scheme }: { scheme: GovernmentScheme }) => (
  <div
    className="group border-2 rounded-xl p-4 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
    style={{ borderColor: "var(--color-border)" }}
  >
    <div
      className="absolute top-0 right-0 w-12 h-12 opacity-5 rounded-full -translate-y-6 translate-x-6"
      style={{ backgroundColor: "var(--color-secondary)" }}
    />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
            <span
              className="text-xs font-bold font-roboto uppercase tracking-wide"
              style={{ color: "var(--color-primary)" }}
            >
              Government Scheme
            </span>
          </div>
          <h3
            className="text-base font-bold font-poppins mb-2 group-hover:text-opacity-80 transition-all"
            style={{ color: "var(--color-foreground)" }}
          >
            {scheme.name}
          </h3>
          <p
            className="text-xs font-roboto leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {scheme.description}
          </p>
        </div>
        <div className="ml-2 text-center">
          <div
            className="w-8 h-8 rounded-full border-2 border-opacity-20 flex items-center justify-center"
            style={{ borderColor: "var(--color-primary)" }}
          >
            <span
              className="text-xs font-bold font-poppins"
              style={{ color: "var(--color-primary)" }}
            >
              {scheme.popularity}%
            </span>
          </div>
          <p
            className="text-xs font-roboto mt-1"
            style={{ color: "var(--color-muted)" }}
          >
            Popularity
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-1 gap-2">
          <InfoBlock title="Coverage Amount" value={scheme.coverageAmount} />
          <InfoBlock title="Premium" value={scheme.premium} />
        </div>
        <div>
          <h4
            className="text-xs font-bold font-roboto mb-1"
            style={{ color: "var(--color-foreground)" }}
          >
            Eligibility Criteria
          </h4>
          <ul className="space-y-1">
            {scheme.eligibility.map((c, i) => (
              <li
                key={i}
                className="flex items-center text-xs font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          asChild
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold font-roboto text-xs transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white"
        >
          <a
            href={scheme.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Visit Website</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold font-roboto text-xs transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[var(--color-secondary)] text-[var(--color-primary)]"
        >
          <a
            href="mailto:support@paisaplan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Contact Us</span>
            <Phone className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </div>
);

const InfoBlock = ({ title, value }: { title: string; value: string }) => (
  <div
    className="p-2 rounded-lg"
    style={{ backgroundColor: "var(--color-secondary)" }}
  >
    <h4
      className="text-xs font-bold font-roboto mb-1"
      style={{ color: "var(--color-foreground)" }}
    >
      {title}
    </h4>
    <p
      className="text-base font-bold font-poppins"
      style={{ color: "var(--color-primary)" }}
    >
      {value}
    </p>
  </div>
);
