import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "@/config";
import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/store/store";
import { addUser } from "./firestore";

// Типи для реєстрації та авторизації
interface AuthCredentials {
  name?: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

// Функція для реєстрації користувача
export const registerDB = async ({ name, email, password, profilePhoto = "" }: AuthCredentials) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    await addUser(user.uid, { uid: user.uid, email: email, displayName: name, profilePhoto: profilePhoto });
  } catch (error) {
    console.error("Registration error: ", error);
    throw new Error("Unable to register user");
  }
};

// Функція для логіну користувача та збереження його в Redux
export const loginDB = async ({ email, password }: AuthCredentials, dispatch: AppDispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user?.email || "",
        displayName: user?.displayName || "",
        profilePhoto: user?.photoURL || "",
      })
    );
    return user;
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error("Unable to login user");
  }
};

// Функція для логауту
export const logoutDB = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    // Очистити інформацію про користувача у Redux
    dispatch(clearUserInfo());
  } catch (error) {
    console.error("Logout error: ", error);
    throw new Error("Unable to logout user");
  }
};

// Відстеження змін у стані аутентифікації
export const authStateChanged = (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUserInfo({
          uid: user.uid,
          email: user.email ? user.email : "",
          displayName: user.displayName ? user.displayName : "",
          profilePhoto: user.photoURL ? user.photoURL : "",
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};

// Оновлення профілю користувача
export const updateUserProfile = async (update: { displayName?: string; photoURL?: string }) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      console.error("Update profile error: ", error);
      throw new Error("Unable to update user profile");
    }
  }
};
