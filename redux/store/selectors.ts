import { RootState } from "@/redux/store/store";

export const getCurrentUser = (state: RootState) => state.user.userInfo;
