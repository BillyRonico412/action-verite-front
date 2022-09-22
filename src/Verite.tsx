import { useEffect, useState } from "react";
import { FaArrowLeft, FaRedoAlt, FaSlidersH } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import { appAction, RootState } from "./store";
import {
    getTraductionByFr,
    getVerite,
    LangEnum,
    speek,
    VeriteInterface,
} from "./utils";
const Verite = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lang = useSelector((state: RootState) => state.app.lang);
    const rating = useSelector((state: RootState) => state.app.rating);
    const isSetting = useSelector((state: RootState) => state.app.isSetting);
    const [verite, setVerite] = useState<VeriteInterface | null>();
    const [textVerite, setTextVerite] = useState("");
    const speekVerite = () => {
        if (verite) {
            switch (lang) {
                case LangEnum.En:
                    setTextVerite(verite.question);
                    speek(verite.question, lang);
                    break;
                case LangEnum.Fr:
                    setTextVerite(verite.translations.fr);
                    speek(verite.translations.fr, lang);
                    break;
                case LangEnum.Es:
                    setTextVerite(verite.translations.es);
                    speek(verite.translations.es, lang);
                    break;
            }
        }
    };
    useEffect(() => {
        (async () => {
            setVerite(await getVerite(rating));
        })();
    }, []);
    useEffect(() => {
        if (verite) {
            speekVerite();
        }
    }, [verite]);
    useEffect(() => {
        if (verite) {
            speekVerite();
        }
    }, [lang]);
    const onClickRedo = async () => {
        setVerite(await getVerite(rating));
    };
    const onClickBack = () => {
        navigate("/");
    };
    const onClickSetting = () => {
        dispatch(appAction.setIsSetting(true));
    };
    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                <h2 className="font-black text-4xl tracking-wide">
                    {getTraductionByFr("vérité", lang)}
                </h2>
                <div className="h-64 max-w-xs flex items-center justify-center mx-auto text-center text-lg">
                    {textVerite}
                </div>
                <div className="flex gap-x-6">
                    <button
                        className="bg-black rounded w-12 h-8 text-lg flex justify-center items-center text-white"
                        onClick={onClickBack}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        className="bg-black rounded w-12 h-8 text-lg flex justify-center items-center text-white"
                        onClick={onClickRedo}
                    >
                        <FaRedoAlt />
                    </button>
                    <button
                        className="bg-black rounded w-12 h-8 text-lg flex justify-center items-center text-white"
                        onClick={onClickSetting}
                    >
                        <FaSlidersH />
                    </button>
                </div>
            </div>
            {isSetting && <Settings />}
        </>
    );
};

export default Verite;
