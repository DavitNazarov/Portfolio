const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function visitorMeta() {
  return {
    path: window.location?.pathname + window.location?.search,
    referrer: document.referrer || undefined,
    locale: navigator.language || undefined,
  };
}

export function validateContactForm(values) {
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
  if (values.comment.trim().length > 2000) {
    errors.comment = "Comment must be 2000 characters or fewer.";
  }
  return errors;
}

export function contactPayload(form) {
  return {
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    comment: form.comment.trim(),
    ...visitorMeta(),
  };
}
