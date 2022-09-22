import { FaFire, FaQuestion, FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { appAction, RootState } from "./store";
import { getTraductionByFr, LangEnum, RatingEnum } from "./utils";

const Settings = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state: RootState) => state.app.lang);
    const rating = useSelector((state: RootState) => state.app.rating);
    return (
        <div className="h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
            <div className="h-64 w-[320px] flex flex-col items-center justify-center mx-auto bg-white rounded gap-y-6 relative">
                <h2 className="text-2xl font-black">
                    {getTraductionByFr("paramètres", lang)}
                </h2>
                <div className="flex gap-x-4">
                    <span
                        className={
                            "rounded px-4 font-semibold py-0.5 border bg-gray-100 text-lg  " +
                            (rating === undefined && "bg-gray-300")
                        }
                        onClick={() => dispatch(appAction.setRating())}
                    >
                        🔀
                    </span>
                    <span
                        className={
                            "rounded px-4 font-semibold py-0.5 border bg-gray-100 text-lg " +
                            (rating === RatingEnum.SOFT && "bg-gray-300")
                        }
                        onClick={() =>
                            dispatch(appAction.setRating(RatingEnum.SOFT))
                        }
                    >
                        😌
                    </span>
                    <span
                        className={
                            "rounded px-4 font-semibold py-0.5 border bg-gray-100 text-lg " +
                            (rating === RatingEnum.MEDIUM && "bg-gray-300")
                        }
                        onClick={() =>
                            dispatch(appAction.setRating(RatingEnum.MEDIUM))
                        }
                    >
                        😱
                    </span>
                    <span
                        className={
                            "rounded px-4 font-semibold py-0.5 border bg-gray-100 text-lg " +
                            (rating === RatingEnum.HARD && "bg-gray-300")
                        }
                        onClick={() =>
                            dispatch(appAction.setRating(RatingEnum.HARD))
                        }
                    >
                        🥵
                    </span>
                </div>
                <div className="flex gap-x-4">
                    <span
                        className={
                            "bg-gray-100 border rounded px-4 font-semibold py-0.5 text-white text-xl " +
                            (lang === LangEnum.En && "bg-gray-300")
                        }
                        onClick={() => dispatch(appAction.setLang(LangEnum.En))}
                    >
                        🇺🇸
                    </span>
                    <span
                        className={
                            "bg-gray-100 border rounded px-4 font-semibold py-0.5 text-white text-xl " +
                            (lang === LangEnum.Fr && "bg-gray-300")
                        }
                        onClick={() => dispatch(appAction.setLang(LangEnum.Fr))}
                    >
                        🇫🇷
                    </span>
                    <span
                        className={
                            "bg-gray-100 border rounded px-4 font-semibold py-0.5 text-white text-xl " +
                            (lang === LangEnum.Es && "bg-gray-300")
                        }
                        onClick={() => dispatch(appAction.setLang(LangEnum.Es))}
                    >
                        🇪🇸
                    </span>
                </div>
                <FaTimesCircle
                    className="absolute right-0 top-0 text-2xl -translate-x-1/2 translate-y-1/2"
                    onClick={() => dispatch(appAction.setIsSetting(false))}
                />
            </div>
        </div>
    );
};

export default Settings;
