import ContactForm from "../components/contacto/ContactForm";
import ContactInfo from "../components/contacto/ContactInfo";

const Contacto = () => {
  return (
    <div className="max-w-6xl px-4 py-12 mx-auto">
      <div className="grid items-start grid-cols-1 gap-16 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contacto;