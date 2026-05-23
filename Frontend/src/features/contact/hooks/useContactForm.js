import { useMemo, useState } from "react";
import { apiPublic } from "@/lib/api";
import {
  ALL_CONTACT_FIELDS_TOUCHED,
  CONTACT_ENDPOINT,
  EMPTY_CONTACT_FORM,
} from "@/features/contact/constants/contact";
import { contactPayload, validateContactForm } from "@/features/contact/utils/contactForm";

export function useContactForm() {
  const [form, setForm] = useState(EMPTY_CONTACT_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const errors = useMemo(() => validateContactForm(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;
  const isSubmitting = status === "loading";

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setServerMessage("");
    }
  };

  const touchField = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched(ALL_CONTACT_FIELDS_TOUCHED);
    setServerMessage("");

    if (hasErrors) {
      setStatus("error");
      setServerMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    try {
      const response = await apiPublic(CONTACT_ENDPOINT, {
        method: "POST",
        body: contactPayload(form),
      });
      setStatus("success");
      setServerMessage(response.message ?? "Message sent. A copy was sent to your email.");
      setForm(EMPTY_CONTACT_FORM);
      setTouched({});
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message || "Message could not be sent. Please try again.");
    }
  };

  return {
    errors,
    form,
    handleSubmit,
    isSubmitting,
    serverMessage,
    status,
    touchField,
    touched,
    updateField,
  };
}
