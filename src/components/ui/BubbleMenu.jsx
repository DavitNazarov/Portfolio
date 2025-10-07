import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navBarItems } from "@/constants/navBarItems";

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentSection, setCurrentSection] = useState("HOME");

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : navBarItems;

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    "left-0 right-0 top-8",
    "flex items-center justify-between",
    "gap-4 px-8",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  // Animate menu open/close
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            "-=" + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  // Rotation on resize
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? item.rotation ?? 0 : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  // Track current section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(
              entry.target.getAttribute("id")?.toUpperCase() || ""
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <>
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
        }
      `}</style>

      <nav
        className={containerClassName}
        style={style}
        aria-label="Main navigation"
      >
        {/* Logo bubble */}
        <div
          className={[
            "bubble logo-bubble",
            "inline-flex items-center justify-center",
            "rounded-full",
            "pointer-events-auto",
            "h-12 md:h-14",
            "px-4 md:px-8",
            "gap-2",
            "will-change-transform",
            "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
          ].join(" ")}
          aria-label="Logo"
          style={{
            background: menuBg,
            minHeight: "48px",
            borderRadius: "9999px",
          }}
        >
          <span
            className="logo-content inline-flex items-center justify-center w-[120px] h-full text-[1.5rem] font-extrabold tracking-wide"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#1e1e1e", // logo text color
            }}
          >
            {typeof logo === "string" ? (
              <img
                src={logo}
                alt="Logo"
                className="bubble-logo max-h-[60%] max-w-full object-contain block"
              />
            ) : (
              logo || "David."
            )}
          </span>
        </div>

        {/* Right side: section label + burger */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Current Section Label */}
          <div className="relative flex items-center">
            <span
              className="relative rounded-l-full rounded-r-md shadow px-3 py-1 text-sm md:text-base font-bold uppercase tracking-wider"
              style={{
                background: "#ffffff",
                color: " #1e1e1e",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {currentSection}
              <span
                className="absolute top-1/2 right-[-7px] -translate-y-1/2 
                           w-0 h-0 border-y-6 border-y-transparent border-l-8"
                style={{ borderLeftColor: "#ffffff" }}
              />
            </span>
          </div>

          {/* Burger button */}
          <button
            type="button"
            className={[
              "bubble toggle-bubble menu-btn",
              isMenuOpen ? "open" : "",
              "inline-flex flex-col items-center justify-center",
              "rounded-full",
              "bg-white",
              "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
              "pointer-events-auto",
              "w-12 h-12 md:w-14 md:h-14",
              "border-0 cursor-pointer p-0",
              "will-change-transform",
            ].join(" ")}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span
              className="menu-line block mx-auto rounded-[2px]"
              style={{
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen
                  ? "translateY(4px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="menu-line short block mx-auto rounded-[2px]"
              style={{
                marginTop: "6px",
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen
                  ? "translateY(-4px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Overlay menu */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            "bubble-menu-items",
            useFixedPosition ? "fixed" : "absolute",
            "inset-0 flex items-center justify-center",
            "pointer-events-none z-[1000]",
          ].join(" ")}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className="pill-list list-none m-0 px-6 w-full max-w-[1600px] mx-auto flex flex-wrap gap-x-0 gap-y-1 pointer-events-auto"
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                className="pill-col flex justify-center items-stretch [flex:0_0_calc(100%/3)] box-border"
              >
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(item.href);
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                    setIsMenuOpen(false);
                  }}
                  className="pill-link w-full rounded-[999px] no-underline bg-white text-inherit shadow-[0_4px_14px_rgba(0,0,0,0.10)] flex items-center justify-center relative transition-[background,color] duration-300 ease-in-out box-border whitespace-nowrap overflow-hidden"
                  style={{
                    ["--item-rot"]: `${item.rotation ?? 0}deg`,
                    ["--pill-bg"]: menuBg,
                    ["--pill-color"]: menuContentColor,
                    ["--hover-bg"]: item.hoverStyles?.bgColor || "#f3f4f6",
                    ["--hover-color"]:
                      item.hoverStyles?.textColor || menuContentColor,
                    background: "var(--pill-bg)",
                    color: "var(--pill-color)",
                    minHeight: "var(--pill-min-h, 160px)",
                    padding: "clamp(1.5rem, 3vw, 8rem) 0",
                    fontSize: "clamp(1.5rem, 4vw, 4rem)",
                    fontWeight: 400,
                    lineHeight: 0,
                    willChange: "transform",
                    height: 10,
                  }}
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label inline-block"
                    style={{
                      willChange: "transform, opacity",
                      height: "1.2em",
                      lineHeight: 1.2,
                    }}
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
