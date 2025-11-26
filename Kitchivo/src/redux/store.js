import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import CommanStore from "./slices/CommanSlice";

const rootReducer = combineReducers({
    authStore: AuthSlice,
    commanStore: CommanStore
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;