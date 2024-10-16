import { configureStore } from "@reduxjs/toolkit";
//this is how to import the default module name from the file
import userSliceReducer from "./userSlice";

export const store = configureStore({
  reducer: { user: userSliceReducer },
});
