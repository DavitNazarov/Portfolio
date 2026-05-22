import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { SOCIAL_LINKS, PERSONAL } from "@/constants/personal";
import { apiPublic } from "@/lib/api";
import { cn } from "@/lib/utils";

const TINT = "167, 139, 250";
const EMPTY_FORM = { name: "", phone: "", email: "", comment: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function visitorMeta() {
  return {
    path: window.location?.pathname + window.location?.search,
    referrer: document.referrer || undefined,
    locale: navigator.language || undefined,
  };
}

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.phone.trim()) errors.phone = "Phone is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.comment.trim()) errors.comment = "Comment is required.";
  if (values.phone.trim().length > 80) errors.phone = "Phone must be 80 characters or fewer.";
  if (values.comment.trim().length > 2000) errors.comment = "Comment must be 2000 characters or fewer.";
  return errors;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const errors = useMemo(() => validate(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;
  const isSubmitting = status === "loading";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setServerMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, phone: true, email: true, comment: true });
    setServerMessage("");

    if (hasErrors) {
      setStatus("error");
      setServerMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    try {
      const response = await apiPublic("/api/notify/contact", {
        method: "POST",
        body: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          comment: form.comment.trim(),
          ...visitorMeta(),
        },
      });
      setStatus("success");
      setServerMessage(response.message ?? "Message sent. A copy was sent to your email.");
      setForm(EMPTY_FORM);
      setTouched({});
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message || "Message could not be sent. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="06"
        eyebrow="Connect"
        title="Let's"
        accent="build"
        after=" something good."
        description="Use the form for a proper message, or grab the direct links below. Successful submissions send me the message and send you a copy."
        tint={TINT}
      />

      <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="space-y-4">
          <SpotlightCard tint={TINT} className="p-5 sm:p-6" hover={false}>
            <div className="flex items-start gap-4 min-w-0">
              <div className="relative shrink-0">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                  style={{ background: `rgba(${TINT}, 0.45)` }}
                />
                <div
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: `rgba(${TINT}, 0.32)`,
                    backgroundColor: `rgba(${TINT}, 0.14)`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Mail className="h-5 w-5" style={{ color: `rgb(${TINT})` }} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
                  style={{ color: `rgba(${TINT}, 0.8)` }}
                >
                  Direct · Email
                </p>
                <motion.a
                  href={`mailto:${PERSONAL.email}`}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 360, damping: 26 }}
                  className="mt-2 inline-flex items-center gap-2 text-lg sm:text-[1.25rem] font-light tracking-tight text-foreground/95 hover:text-foreground transition-colors duration-300 break-all"
                >
                  <span>{PERSONAL.email}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: `rgba(${TINT}, 0.7)` }} />
                </motion.a>

                <motion.button
                  type="button"
                  onClick={copyEmail}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-mono transition-colors duration-200"
                  style={{
                    borderColor: `rgba(${TINT}, 0.3)`,
                    backgroundColor: `rgba(${TINT}, 0.1)`,
                    color: `rgba(${TINT}, 0.92)`,
                  }}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy email"}
                </motion.button>
              </div>
            </div>
          </SpotlightCard>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {SOCIAL_LINKS.map((social, i) => (
              <SpotlightCard
                key={social.name}
                as="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                tint={TINT}
                delay={i * 0.06}
                className="block p-4 no-underline"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.2em]"
                      style={{ color: `rgba(${TINT}, 0.75)` }}
                    >
                      {social.label}
                    </p>
                    <p className="mt-2 text-[15px] font-medium text-foreground/95 leading-tight">
                      {social.name}
                    </p>
                    <p className="mt-1 text-[12px] font-mono text-muted-foreground/55">
                      {social.handle}
                    </p>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" style={{ color: `rgba(${TINT}, 0.6)` }} />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        <SpotlightCard tint={TINT} className="p-5 sm:p-6" hover={false}>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-[0.28em]"
                style={{ color: `rgba(${TINT}, 0.78)` }}
              >
                Feedback form
              </p>
              <h3 className="mt-2 text-xl sm:text-2xl font-light tracking-tight text-foreground">
                Send a message
              </h3>
              <p className="mt-3 text-[12.5px] leading-5 text-muted-foreground/60">
                Email delivery is powered by Resend. While the sending domain is being verified,
                copies can be delivered only to the verified owner email:{" "}
                <span className="font-mono text-foreground/75">{PERSONAL.email}</span>.
              </p>
            </div>

            <ContactField
              id="contact-name"
              label="Name"
              icon={User}
              value={form.name}
              error={touched.name ? errors.name : ""}
              autoComplete="name"
              onBlur={() => setTouched((current) => ({ ...current, name: true }))}
              onChange={(value) => updateField("name", value)}
            />
            <ContactField
              id="contact-phone"
              label="Phone"
              icon={Phone}
              value={form.phone}
              error={touched.phone ? errors.phone : ""}
              type="tel"
              autoComplete="tel"
              onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
              onChange={(value) => updateField("phone", value)}
            />
            <ContactField
              id="contact-email"
              label="Email"
              icon={Mail}
              value={form.email}
              error={touched.email ? errors.email : ""}
              type="email"
              autoComplete="email"
              onBlur={() => setTouched((current) => ({ ...current, email: true }))}
              onChange={(value) => updateField("email", value)}
            />
            <ContactField
              id="contact-comment"
              label="Comment"
              icon={MessageSquare}
              value={form.comment}
              error={touched.comment ? errors.comment : ""}
              multiline
              onBlur={() => setTouched((current) => ({ ...current, comment: true }))}
              onChange={(value) => updateField("comment", value)}
            />

            {serverMessage && (
              <div
                className={cn(
                  "flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm",
                  status === "success"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    : "border-destructive/25 bg-destructive/10 text-destructive"
                )}
              >
                {status === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{serverMessage}</span>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.01, y: -1 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className={cn(
                "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                "bg-foreground text-background hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-55"
              )}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSubmitting ? "Sending..." : "Send message"}
            </motion.button>
          </form>
        </SpotlightCard>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `rgb(${TINT})` }} />
          </span>
          <p className="text-xs font-mono text-muted-foreground/50">
            © 2026 {PERSONAL.name} · Available for work
          </p>
        </div>
        <p className="text-xs font-mono text-muted-foreground/35">
          Built with React & Framer Motion
        </p>
      </motion.div>
    </div>
  );
}

function ContactField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  autoComplete,
  multiline = false,
}) {
  const controlClass = cn(
    "w-full rounded-xl border bg-background/70 px-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/35",
    "outline-none transition-all focus:border-transparent focus:ring-2",
    error ? "border-destructive/45 focus:ring-destructive/35" : "border-white/10 focus:ring-white/20"
  );

  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label} <span aria-hidden="true">*</span>
      </span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/45" />
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            rows={5}
            maxLength={2000}
            className={cn(controlClass, "min-h-32 resize-y leading-6")}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        ) : (
          <input
            id={id}
            value={value}
            type={type}
            autoComplete={autoComplete}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            maxLength={type === "tel" ? 80 : 160}
            className={controlClass}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}
      </span>
      {error && (
        <span id={`${id}-error`} className="block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
