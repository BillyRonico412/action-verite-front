import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store";
import { getTraductionByFr } from "./utils";

const App = () => {
    const navigate = useNavigate();
    const lang = useSelector((state: RootState) => state.app.lang);
    return (
        <main className="h-screen flex flex-col  font-black tracking-wide">
            <div
                className="flex-grow flex justify-center text-5xl items-center bg-black text-white cursor-pointer"
                onClick={() => {
                    navigate("/action");
                }}
            >
                {getTraductionByFr("action", lang)}
            </div>
            <div
                className="flex-grow flex justify-center text-5xl items-center cursor-pointer"
                onClick={() => {
                    navigate("/verite");
                }}
            >
                {getTraductionByFr("vérité", lang)}
            </div>
        </main>
    );
};

export default App;
