import { PayloadAction } from "@reduxjs/toolkit";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { LangEnum, RatingEnum } from "./utils";

export interface AppState {
    lang: LangEnum;
    rating?: RatingEnum;
    isSetting: boolean;
}

const initialState: AppState = {
    lang: (() => {
        const lang = window.localStorage.getItem("lang");
        if (lang) {
            return Number(lang);
        }
        if (new RegExp("fr", "i").test(navigator.language)) {
            return LangEnum.Fr;
        }
        if (new RegExp("es", "i").test(navigator.language)) {
            return LangEnum.Es;
        }
        return LangEnum.Fr;
    })(),
    rating: (() => {
        const rating = window.localStorage.getItem("rating");
        if (rating) {
            if (rating === "undefined") {
                return undefined;
            } else {
                return Number(rating);
            }
        }
    })(),
    isSetting: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLang(state, action: PayloadAction<LangEnum>) {
            window.localStorage.setItem("lang", String(action.payload));
            state.lang = action.payload;
        },
        setRating(state, action: PayloadAction<RatingEnum | undefined>) {
            window.localStorage.setItem("rating", String(action.payload));
            state.rating = action.payload;
        },
        setIsSetting(state, action: PayloadAction<boolean>) {
            state.isSetting = action.payload;
        },
    },
});

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
});

export const appAction = appSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
