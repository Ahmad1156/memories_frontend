import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./AuthSlice";
import postsSlice from './postsSlice';

const store=configureStore({
    reducer:{Posts:postsSlice.reducer,Auth:authSlice.reducer}
});

export default store;