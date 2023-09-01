import { configureStore } from "@reduxjs/toolkit";
import reducer from "./logintask";

const store = configureStore({ reducer: reducer });

export default store;
