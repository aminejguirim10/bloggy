import ContactForm from "@/components/forms/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us for any questions or concerns you may have.",
};

const ContactPage = () => {
  return <ContactForm />;
};

export default ContactPage;
