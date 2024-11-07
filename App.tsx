import "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store/store";
import AppNavigation from "@/navigation/AppNavigation";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { Colors } from "@/constants/Colors";

export default function App() {
  const [fontsLoaded] = useCustomFonts();

  const loader = <ActivityIndicator size="large" color={Colors.orange} />;

  if (!fontsLoaded) {
    return loader;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={loader} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}
