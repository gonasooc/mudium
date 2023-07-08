import { configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // a non-serializable value was detected in an action, in the path: `payload`. value: 관련 이슈
});

export default store;
