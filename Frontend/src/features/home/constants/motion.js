export const EASE = [0.16, 1, 0.3, 1];

export const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const CARD_VARIANT = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

/** Awards reuse the standard card entrance; kept as an alias for call-site clarity. */
export const AWARD_CARD_VARIANT = CARD_VARIANT;
