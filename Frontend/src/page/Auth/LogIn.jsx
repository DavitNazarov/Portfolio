import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { LogIn as LogInIcon, ArrowLeft, Loader2 } from "lucide-react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        body: { email, password },
      });
      if (data.token) login(data.token);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--muted)_0%,transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-muted/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-muted/10 blur-3xl" />

      <div className="relative w-full max-w-[400px]">
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20 p-8 space-y-8">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-foreground/10 text-foreground mb-2">
              <LogInIcon className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-border bg-background/50",
                  "placeholder:text-muted-foreground placeholder:opacity-70",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "transition-shadow duration-200"
                )}
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">Password</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-border bg-background/50",
                  "placeholder:text-muted-foreground placeholder:opacity-70",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "transition-shadow duration-200"
                )}
              />
            </label>
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-2.5">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3.5 rounded-xl bg-foreground text-background font-medium",
                "hover:opacity-95 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none",
                "transition-all duration-200 flex items-center justify-center gap-2"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center">
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
