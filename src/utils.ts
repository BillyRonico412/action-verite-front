import axios from "axios";

export interface VeriteInterface {
    question: string;
    rating: string;
    translations: {
        fr: string;
        es: string;
    };
}

export interface TraductionInterface {
    en: string;
    fr: string;
    es: string;
}

export const speek = (text: string, lang: LangEnum): boolean => {
    if (!speechSynthesis) {
        return false;
    }
    let voice: SpeechSynthesisVoice | undefined;
    switch (lang) {
        case LangEnum.En:
            voice = speechSynthesis.getVoices().find((v) => v.lang.match("en"));
            break;
        case LangEnum.Fr:
            voice = speechSynthesis.getVoices().find((v) => v.lang.match("fr"));
            break;
        case LangEnum.Es:
            voice = speechSynthesis.getVoices().find((v) => v.lang.match("es"));
            break;
    }
    if (!voice) {
        return false;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    utterance.voice = voice;
    speechSynthesis.speak(utterance);
    return true;
};

export enum RatingEnum {
    SOFT,
    MEDIUM,
    HARD,
}

export enum LangEnum {
    En,
    Fr,
    Es,
}

export const getVerite = async (
    rating?: RatingEnum
): Promise<VeriteInterface | null> => {
    let uri = import.meta.env.VITE_URL_BACK  + "/verite";
    if (rating !== undefined) {
        switch (rating) {
            case RatingEnum.SOFT:
                uri += "?rating=pg";
                break;
            case RatingEnum.MEDIUM:
                uri += "?rating=pg13";
                break;
            case RatingEnum.HARD:
                uri += "?rating=r";
                break;
        }
    }
    try {
        const res = await axios.get(uri);
        if (res.status === 200) {
            return res.data as VeriteInterface;
        } else return null;
    } catch (err) {
        return null;
    }
};

export const getAction = async (
    rating?: RatingEnum
): Promise<VeriteInterface | null> => {
    let uri = import.meta.env.VITE_URL_BACK  + "/action";
    if (rating !== undefined) {
        switch (rating) {
            case RatingEnum.SOFT:
                uri += "?rating=pg";
                break;
            case RatingEnum.MEDIUM:
                uri += "?rating=pg13";
                break;
            case RatingEnum.HARD:
                uri += "?rating=r";
                break;
        }
    }
    try {
        const res = await axios.get(uri);
        if (res.status === 200) {
            return res.data as VeriteInterface;
        } else return null;
    } catch (err) {
        return null;
    }
};

const traductions: TraductionInterface[] = [
    {
        fr: "action",
        en: "dare",
        es: "accion",
    },
    {
        fr: "vérité",
        en: "truth",
        es: "verdad",
    },
    {
        fr: "paramètres",
        en: "settings",
        es: "configuraciones",
    },
];

const toCapitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

export const getTraductionByFr = (text: string, lang: LangEnum) => {
    const trad = traductions.find((trad) => trad.fr === text);
    if (!trad) {
        return undefined;
    }
    switch (lang) {
        case LangEnum.En:
            return toCapitalize(trad.en);
        case LangEnum.Fr:
            return toCapitalize(trad.fr);
        case LangEnum.Es:
            return toCapitalize(trad.es);
    }
};
