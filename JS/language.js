const languageBtn = document.getElementById("language-btn");

const supportedLangs = ["ar", "en"];

let currentLang = localStorage.getItem("lang") || document.documentElement.lang || "ar";

if (!supportedLangs.includes(currentLang)) {
    currentLang = "ar";
}

function getNestedValue(obj, path) {

    return path.split(".").reduce((value, key) => {

        return (value && value[key] !== undefined) ? value[key] : undefined;

    }, obj);

}

function applyTranslations(translations) {

    document.querySelectorAll("[data-i18n]").forEach((el) => {

        const key = el.getAttribute("data-i18n");

        const value = getNestedValue(translations, key);

        if (value === undefined) return;

        const attr = el.getAttribute("data-i18n-attr");

        if (attr) {
            el.setAttribute(attr, value);
        } else {
            el.innerHTML = value;
        }

    });

}

function setLanguage(lang) {

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    localStorage.setItem("lang", lang);

    currentLang = lang;

    if (languageBtn) {
        languageBtn.textContent = lang === "ar" ? "English" : "العربية";
    }

    fetch(`lang/${lang}.json`)
        .then((res) => res.json())
        .then((translations) => applyTranslations(translations))
        .catch((err) => console.error("Language load error:", err));

}

if (languageBtn) {

    languageBtn.addEventListener("click", () => {

        setLanguage(currentLang === "ar" ? "en" : "ar");

    });

}

setLanguage(currentLang);
