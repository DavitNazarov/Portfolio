/**
 * Jump to a section. Uses `scrollIntoView` with the behaviour left to CSS so a
 * reduced-motion preference (which sets `scroll-behavior: auto`) is respected
 * instead of being overridden by an explicit `behavior: "smooth"`.
 */
export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
