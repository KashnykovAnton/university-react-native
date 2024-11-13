// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_CLOUD_API_KEY } from "@env";

const firebaseConfig = {
  apiKey: GOOGLE_CLOUD_API_KEY,
  authDomain: "social-media-app-3d07f.firebaseapp.com",
  projectId: "social-media-app-3d07f",
  storageBucket: "gs://social-media-app-3d07f.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);

// Ініціалізація Auth з AsyncStorage для роботи редакс персистора
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
