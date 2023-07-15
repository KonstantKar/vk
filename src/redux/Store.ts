import {
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import hackerNewsSlice from "./hackerNewsSlice";

export type RootState = CombinedState<{
  news: ReturnType<typeof hackerNewsSlice>;
}>;

const rootReducer = combineReducers({
  news: hackerNewsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
