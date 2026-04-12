// Icons
import WhatsAppContact from "../assets/Icons/Contact/whatsapp-contact-icon.svg";
import EmailContact from "../assets/Icons/Contact/email-contact-icon.svg";
import FacebookContact from "../assets/Icons/Contact/facebook-contact-icon.svg";
import InstagramContact from "../assets/Icons/Contact/instagram-contact-icon.svg";

const CONTACTS = [
    {
        icon: WhatsAppContact,
        text: "+00 000 000 0000",
        link: "#",
    },
    {
        icon: EmailContact,
        text: "contato@exemplo.com",
        link: "#",
    },
    {
        icon: FacebookContact,
        text: "/sua-pagina",
        link: "#",
    },
    {
        icon: InstagramContact,
        text: "@seu_perfil",
        link: "#",
    },
];

const useContacts = () => {
    return { contacts: CONTACTS, loading: false, error: null };
};

export default useContacts;

