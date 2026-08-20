import SpotlightCard from "@/components/ui/SpotlightCard";
import { PERSONAL } from "@/constants/personal";
import ContactField from "@/features/contact/components/ContactField";
import ContactStatus from "@/features/contact/components/ContactStatus";
import ContactSubmitButton from "@/features/contact/components/ContactSubmitButton";
import { CONTACT_FIELDS, CONTACT_TINT } from "@/features/contact/constants/contact";

export default function ContactForm({
  errors,
  form,
  isSubmitting,
  onSubmit,
  serverMessage,
  status,
  touchField,
  touched,
  updateField,
}) {
  return (
    <SpotlightCard tint={CONTACT_TINT} className="p-5 sm:p-6" hover={false}>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <p
            className="text-[10px] font-mono uppercase tracking-[0.28em]"
            style={{ color: `rgba(${CONTACT_TINT}, 0.85)` }}
          >
            Feedback form
          </p>
          <h3 className="mt-2 text-xl sm:text-2xl font-light tracking-tight text-foreground">
            Send a message
          </h3>
          <p className="mt-3 text-[12.5px] leading-5 text-ink-1">
            Email delivery is powered by Resend. While the sending domain is being verified,
            copies can be delivered only to the verified owner email:{" "}
            <span className="font-mono text-foreground/75">{PERSONAL.email}</span>.
          </p>
        </div>

        {CONTACT_FIELDS.map((field) => (
          <ContactField
            key={field.name}
            {...field}
            value={form[field.name]}
            error={touched[field.name] ? errors[field.name] : ""}
            onBlur={() => touchField(field.name)}
            onChange={(value) => updateField(field.name, value)}
          />
        ))}

        <ContactStatus message={serverMessage} status={status} />
        <ContactSubmitButton isSubmitting={isSubmitting} />
      </form>
    </SpotlightCard>
  );
}
