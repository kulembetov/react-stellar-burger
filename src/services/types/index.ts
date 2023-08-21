import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { initialStore } from "../store";

export type RootState = ReturnType<typeof initialStore.getState>;
export type AppDispatch = typeof initialStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
