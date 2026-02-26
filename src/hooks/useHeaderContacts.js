import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../utils/googleSheet";

// Icons (same set used in the header)
import WhatsApp from "../assets/Icons/Social media/whatsapp-icon.svg";
import Facebook from "../assets/Icons/Social media/facebook-icon.svg";
import Instagram from "../assets/Icons/Social media/instagram-icon.svg";
import Email from "../assets/Icons/Social media/email-icon.svg";

const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv&gid=1612423487";

const ICON_MAP = {
    whatsapp: WhatsApp,
    email: Email,
    facebook: Facebook,
    instagram: Instagram,
};

function mapSheetRowToSocialMedia(row) {
    const tipo = (row.Tipo || "").trim().toLowerCase();
    const icon = ICON_MAP[tipo] || null;
    return {
        icon: { [tipo]: icon },
        link: row.Link,
        tooltip: row["Subtítulo"] || row["Subtitulo"] || "",
    };
}

const useHeaderContacts = () => {
    const [socialMedia, setSocialMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGoogleSheetCSV(SHEET_URL)
            .then((rows) => setSocialMedia(rows.map(mapSheetRowToSocialMedia)))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { socialMedia, loading, error };
};

export default useHeaderContacts;
