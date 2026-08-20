import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, KeyRound, Loader2, Lock, Mail } from "lucide-react";
import { api } from "@/lib/api";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/ui/SpotlightCard";

const TINT = "167, 139, 250";
const EASE = [0.16, 1, 0.3, 1];

const fieldClass = cn(
  "w-full rounded-xl border bg-background/70 py-3 pl-11 pr-4 text-sm text-foreground",
  "placeholder:text-ink-3 outline-none transition-all",
  "border-white/10 focus:border-transparent focus:ring-2 focus:ring-white/20"
);

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        body: { email, password },
      });
      if (data.token) login(data.token, data.role);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.3 0 0 / 0.35) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 w-full max-w-[26rem]"
      >
        <div className="mb-7 flex items-center gap-3">
          <motion.span
            className="h-px w-10"
            style={{ backgroundColor: `rgba(${TINT}, 0.55)` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          />
          <span
            className="text-[10px] font-mono uppercase tracking-[0.34em]"
            style={{ color: `rgba(${TINT}, 0.85)` }}
          >
            Admin · Access
          </span>
        </div>

        <h1
          className="mb-2 font-extralight leading-[1.05] tracking-tight text-foreground"
          style={{ fontSize: "clamp(2rem, 6vw, 2.75rem)" }}
        >
          Welcome{" "}
          <span className="font-serif font-normal italic text-white/95">back</span>.
        </h1>
        <p className="mb-8 text-sm leading-6 text-ink-1">
          Sign in to manage the content behind this site.
        </p>

        <SpotlightCard tint={TINT} className="p-5 sm:p-6" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="login-email" className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-ink-1">Email</span>
              <span className="relative block">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-ink-2"
                />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className={fieldClass}
                />
              </span>
            </label>

            <label htmlFor="login-password" className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-ink-1">
                Password
              </span>
              <span className="relative block">
                <Lock
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-ink-2"
                />
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className={fieldClass}
                />
              </span>
            </label>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm text-destructive-foreground"
              >
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? undefined : { scale: 1.01, y: -1 }}
              whileTap={loading ? undefined : { scale: 0.98 }}
              className={cn(
                "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3",
                "bg-foreground text-sm font-medium text-background transition-all",
                "hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-55"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <KeyRound className="h-4 w-4" aria-hidden />
              )}
              {loading ? "Signing in…" : "Sign in"}
            </motion.button>
          </form>
        </SpotlightCard>

        <p className="mt-6 text-center">
          <Link
            to={ROUTES.HOME}
            className="inline-flex min-h-11 items-center gap-2 text-[12px] font-mono uppercase tracking-[0.22em] text-ink-2 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
