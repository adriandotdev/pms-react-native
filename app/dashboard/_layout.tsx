import { Slot } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardIcon from "../components/icons/DashboardIcon";
import ProductsIcon from "../components/icons/ProductsIcon";

const TopBorderView = () => {
	return <View style={styles.borderView} />;
};

const DashboardLayout = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Slot />
			<TopBorderView />
			<View style={styles.tabs}>
				<TouchableOpacity>
					<View style={styles.tab}>
						<DashboardIcon color={"#e8a123"} width={32} height={32} />
						<Text style={styles.tabLabel}>Dashboard</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={styles.tab}>
						<ProductsIcon color={"#e8a123"} width={32} height={32} />
						<Text style={styles.tabLabel}>Products</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default DashboardLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	tabs: {
		backgroundColor: "white",
		height: 70,
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",

		paddingHorizontal: 48,
	},
	borderView: {
		borderTopWidth: 2,
		borderTopColor: "#e8a123",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: "hidden", // required for clipping the corners properly
		backgroundColor: "white", // or any background you want
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		height: 80,
		width: "100%",
	},
	tab: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
	},
	tabLabel: {
		fontFamily: "Archivo-Med",
	},
});
