import { Mail, MessageSquare, Phone, User } from "lucide-react";

export const CONTACT_TINT = "167, 139, 250";
export const CONTACT_ENDPOINT = "/api/notify/contact";
export const COPY_RESET_MS = 1600;

export const EMPTY_CONTACT_FORM = {
  name: "",
  phone: "",
  email: "",
  comment: "",
};

export const ALL_CONTACT_FIELDS_TOUCHED = {
  name: true,
  phone: true,
  email: true,
  comment: true,
};

export const CONTACT_FIELDS = [
  {
    name: "name",
    id: "contact-name",
    label: "Name",
    icon: User,
    autoComplete: "name",
    placeholder: "Ada Lovelace",
  },
  {
    name: "phone",
    id: "contact-phone",
    label: "Phone",
    icon: Phone,
    type: "tel",
    autoComplete: "tel",
    placeholder: "+995 555 000 000",
  },
  {
    name: "email",
    id: "contact-email",
    label: "Email",
    icon: Mail,
    type: "email",
    autoComplete: "email",
    placeholder: "you@company.com",
  },
  {
    name: "comment",
    id: "contact-comment",
    label: "Comment",
    icon: MessageSquare,
    multiline: true,
    placeholder: "What are you building, and where could I help?",
  },
];
