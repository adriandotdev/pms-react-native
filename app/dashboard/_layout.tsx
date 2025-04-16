import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardLayout = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Slot />
		</SafeAreaView>
	);
};

export default DashboardLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
