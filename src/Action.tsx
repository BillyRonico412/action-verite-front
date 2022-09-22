import { useEffect, useState } from "react";
import { FaArrowLeft, FaRedoAlt, FaSlidersH } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import { appAction, RootState } from "./store";
import {
    getAction,
    getTraductionByFr,
    getVerite,
    LangEnum,
    speek,
    VeriteInterface,
} from "./utils";
const Action = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lang = useSelector((state: RootState) => state.app.lang);
    const rating = useSelector((state: RootState) => state.app.rating);
    const isSetting = useSelector((state: RootState) => state.app.isSetting);
    const [action, setAction] = useState<VeriteInterface | null>();
    const [textAction, setTextAction] = useState("");
    const speekAction = () => {
        if (action) {
            switch (lang) {
                case LangEnum.En:
                    setTextAction(action.question);
                    speek(action.question, lang);
                    break;
                case LangEnum.Fr:
                    setTextAction(action.translations.fr);
                    speek(action.translations.fr, lang);
                    break;
                case LangEnum.Es:
                    setTextAction(action.translations.es);
                    speek(action.translations.es, lang);
                    break;
            }
        }
    };
    useEffect(() => {
        (async () => {
            setAction(await getAction(rating));
        })();
    }, []);
    useEffect(() => {
        if (action) {
            speekAction();
        }
    }, [action]);
    useEffect(() => {
        if (action) {
            speekAction();
        }
    }, [lang]);
    const onClickRedo = async () => {
        setAction(await getAction(rating));
    };
    const onClickBack = () => {
        navigate("/");
    };
    const onClickSetting = () => {
        dispatch(appAction.setIsSetting(true));
    };
    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
                <h2 className="font-black text-4xl tracking-wide">
                    {getTraductionByFr("action", lang)}
                </h2>
                <div className="h-64 max-w-xs flex items-center justify-center mx-auto text-center text-lg">
                    {textAction}
                </div>
                <div className="flex gap-x-6">
                    <button
                        className="bg-white rounded w-12 h-8 text-lg flex justify-center items-center text-black"
                        onClick={onClickBack}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        className="bg-white rounded w-12 h-8 text-lg flex justify-center items-center text-black"
                        onClick={onClickRedo}
                    >
                        <FaRedoAlt />
                    </button>
                    <button
                        className="bg-white rounded w-12 h-8 text-lg flex justify-center items-center text-black"
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

export default Action;
