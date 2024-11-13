import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@/types/types";

// Типи для початкового стану
interface UserState {
  userInfo: UserData;
}

const initialState: UserState = {
  userInfo: {
    uid: "",
    email: "",
    displayName: "",
    profilePhoto: "",
  },
};

// Створення slice для користувача
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState["userInfo"]>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = initialState.userInfo;
    },
  },
});

// Експорт дій для використання у компонентах
export const { setUserInfo, clearUserInfo } = userSlice.actions;

// Експорт ред'юсера для підключення до Store
export default userSlice.reducer;
