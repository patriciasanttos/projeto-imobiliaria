import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../utils/googleSheet";

// Icons
import WhatsAppContact from "../assets/Icons/Contact/whatsapp-contact-icon.svg";
import EmailContact from "../assets/Icons/Contact/email-contact-icon.svg";
import FacebookContact from "../assets/Icons/Contact/facebook-contact-icon.svg";
import InstagramContact from "../assets/Icons/Contact/instagram-contact-icon.svg";

const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv&gid=236045491";

const ICON_MAP = {
    whatsapp: WhatsAppContact,
    email: EmailContact,
    facebook: FacebookContact,
    instagram: InstagramContact,
};

function stripQuotes(str) {
    if (!str) return str;
    return str.replace(/^"+|"+$/g, "");
}

function mapSheetRowToContact(row) {
    const tipo = (row.Tipo || "").trim().toLowerCase();
    return {
        icon: ICON_MAP[tipo] || null,
        text: stripQuotes(row.Contacto),
        link: row.Link,
    };
}

const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGoogleSheetCSV(SHEET_URL)
            .then((rows) => setContacts(rows.map(mapSheetRowToContact)))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { contacts, loading, error };
};

export default useContacts;
