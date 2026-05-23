import SectionHeader from "@/components/ui/SectionHeader";
import { PERSONAL } from "@/constants/personal";
import ContactDirectCard from "@/features/contact/components/ContactDirectCard";
import ContactFooter from "@/features/contact/components/ContactFooter";
import ContactForm from "@/features/contact/components/ContactForm";
import ContactSocialLinks from "@/features/contact/components/ContactSocialLinks";
import { CONTACT_TINT } from "@/features/contact/constants/contact";
import { useContactForm } from "@/features/contact/hooks/useContactForm";
import { useCopyEmail } from "@/features/contact/hooks/useCopyEmail";

export default function Contact() {
  const contactForm = useContactForm();
  const { copied, copyEmail } = useCopyEmail(PERSONAL.email);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="06"
        eyebrow="Connect"
        title="Let's"
        accent="build"
        after=" something good."
        description="Use the form for a proper message, or grab the direct links below. Successful submissions send me the message and send you a copy."
        tint={CONTACT_TINT}
      />

      <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="space-y-4">
          <ContactDirectCard copied={copied} onCopy={copyEmail} />
          <ContactSocialLinks />
        </div>

        <ContactForm {...contactForm} onSubmit={contactForm.handleSubmit} />
      </div>

      <ContactFooter />
    </div>
  );
}
