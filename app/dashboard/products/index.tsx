import { useRouter } from "expo-router";
import React from "react";
import {
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import LeftArrowIcon from "../../components/icons/LeftArrowIcon";
import SettingsIcon from "../../components/icons/SettingsIcon";

const ProductsPage = () => {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
					<LeftArrowIcon onPress={() => router.back()} />
					<Text style={styles.title}>Products</Text>
				</View>
				<SettingsIcon />
			</View>
			<TextInput placeholder="Search..." style={styles.searchInput} />
			<FlatList
				contentContainerStyle={{ paddingBottom: 100 }}
				data={[
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
					{ name: "Ajinomoto", price: 45, category: "Beverage" },
				]}
				renderItem={({ item }) => (
					<View style={styles.productCard}>
						<View>
							<Text style={styles.productName}>{item.name}</Text>
							<Text style={styles.productPrice}>{item.price}</Text>
						</View>
						<View style={styles.productBadge}>
							<Text style={styles.productBadgeText}>{item.category}</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default ProductsPage;

const styles = StyleSheet.create({
	container: {
		paddingVertical: Platform.OS === "ios" ? 0 : 48,
		paddingHorizontal: 24,
		gap: 16,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
	},
	title: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 24,
		color: "#e8a123",
		textAlign: "left",
	},
	searchInput: {
		height: 50,
		borderColor: "#e8a123",
		borderWidth: 1,
		borderRadius: 4,
		fontFamily: "Archivo-Reg",
		paddingHorizontal: 10,
	},
	productCard: {
		padding: 16,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		backgroundColor: "#ffffff",
		borderRadius: 8,
		borderColor: "#f4e3ce",
		borderWidth: 1,
		marginBottom: 16,
		gap: 8,
	},
	productName: {
		fontFamily: "Archivo-Med",
		fontSize: 18,
		color: "#201f1d",
	},
	productPrice: {
		fontSize: 24,
		color: "#e8a123",
		fontFamily: "Archivo-Exp-Bold",
	},
	productBadge: {
		backgroundColor: "#f4e3ce",
		padding: 4,
		paddingHorizontal: 12,
		borderRadius: 12,
	},
	productBadgeText: {
		fontSize: 12,
	},
});
