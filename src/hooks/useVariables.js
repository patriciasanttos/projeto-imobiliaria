import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../utils/googleSheet";

const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv&gid=589812534";

const useVariables = () => {
    const [variables, setVariables] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGoogleSheetCSV(SHEET_URL)
            .then((rows) => {
                const vars = {};
                rows.forEach((row) => {
                    const name = (row.Nombre || "").trim();
                    const value = (row.Valor || "").trim();
                    if (name) {
                        vars[name] = value;
                    }
                });
                setVariables(vars);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { variables, loading, error };
};

export default useVariables;
