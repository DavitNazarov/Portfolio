import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!&*?—+";

function random() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

/**
 * Renders `text` with a scramble effect — random chars cycle rapidly then
 * resolve left-to-right into the real letters.
 *
 * @param {string}  text
 * @param {number}  delay         seconds before the effect starts
 * @param {number}  resolveSpeed  ms between each char locking in
 * @param {number}  scrambleSpeed ms between random swaps on unresolved chars
 * @param {string}  className     applied to the outer <span>
 * @param {object}  style         applied to the outer <span>
 */
export default function ScrambleText({
  text,
  delay = 0,
  resolveSpeed = 68,
  scrambleSpeed = 32,
  className = "",
  style,
}) {
  const letters = Array.from(text);

  const [chars, setChars] = useState(() =>
    letters.map((c) => (c === " " ? " " : random()))
  );

  const rafRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let resolved = 0;
    let lastResolve = 0;
    let lastScramble = 0;

    timerRef.current = setTimeout(() => {
      const tick = (now) => {
        setChars((prev) => {
          const next = [...prev];

          // Lock in the next character
          if (now - lastResolve >= resolveSpeed && resolved < letters.length) {
            next[resolved] = letters[resolved];
            resolved++;
            lastResolve = now;
          }

          // Rapidly swap all still-unresolved chars
          if (now - lastScramble >= scrambleSpeed) {
            for (let i = resolved; i < letters.length; i++) {
              if (letters[i] !== " ") next[i] = random();
            }
            lastScramble = now;
          }

          return next;
        });

        if (resolved < letters.length) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Guarantee final state is exact
          setChars(Array.from(text));
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay, resolveSpeed, scrambleSpeed]);

  return (
    <span className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block" aria-hidden="true">
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
