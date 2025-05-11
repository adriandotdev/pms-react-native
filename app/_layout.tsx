import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import PrivateRoute from "./components/PrivateRoute";
import ModalProvider from "./context/ModalContext";
import ProductProvider from "./context/ProductContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
	const insets = useSafeAreaInsets();
	const [loaded, error] = useFonts({
		"Archivo-Exp-Bold": require("../assets/fonts/Archivo_Expanded-Bold.ttf"),
		"Archivo-Med": require("../assets/fonts/Archivo-Medium.ttf"),
		"Archivo-Reg": require("../assets/fonts/Archivo-Regular.ttf"),
		"Archivo-SemiBold": require("../assets/fonts/Archivo-SemiBold.ttf"),
		"Archivo-Bold": require("../assets/fonts/Archivo-Bold.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider style={{ ...styles.container, paddingTop: insets.top }}>
				<ProductProvider>
					<ModalProvider>
						<PrivateRoute>
							<GestureHandlerRootView>
								<Slot />
							</GestureHandlerRootView>
						</PrivateRoute>
					</ModalProvider>
				</ProductProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
