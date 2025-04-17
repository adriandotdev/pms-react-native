import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ModalProvider } from "./context/ModalContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const insets = useSafeAreaInsets();
	const [loaded, error] = useFonts({
		"Archivo-Exp-Bold": require("../assets/fonts/Archivo_Expanded-Bold.ttf"),
		"Archivo-Med": require("../assets/fonts/Archivo-Medium.ttf"),
		"Archivo-Reg": require("../assets/fonts/Archivo-Regular.ttf"),
		"Archivo-SemiBold": require("../assets/fonts/Archivo-SemiBold.ttf"),
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
		<SafeAreaProvider style={{ ...styles.container, paddingTop: insets.top }}>
			<ModalProvider>
				<Slot />
			</ModalProvider>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
