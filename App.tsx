import "react-native-gesture-handler";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigation from "@/navigation/AppNavigation";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { Colors } from "@/constants/Colors";
import { persistor, store } from "./redux/store/store";
import { authStateChanged } from "./utils/auth";

export default function App() {
  const [fontsLoaded] = useCustomFonts();

  const loader = <ActivityIndicator size="large" color={Colors.orange} />;

  if (!fontsLoaded) {
    return loader;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={loader} persistor={persistor}>
        <AuthListener />
      </PersistGate>
    </Provider>
  );
}

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return <AppNavigation />;
};
