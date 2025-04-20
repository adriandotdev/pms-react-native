// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import Alert from "../components/Alert";
import DashboardIcon from "../components/icons/DashboardIcon";
import ProductsIcon from "../components/icons/ProductsIcon";
import Modal from "../components/Modal";
import { useModal } from "../context/ModalContext";

export default function TabLayout() {
	const { isOpen, alert } = useModal();

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarStyle: {
						backgroundColor: "white",
						paddingTop: Platform.OS === "ios" ? 12 : 12,
						height: Platform.OS === "ios" ? 90 : 80,

						borderColor: "#C48414",
						borderRightColor: "#C48414",
						borderLeftColor: "#C48414",
						borderTopColor: "#C48414",
						borderTopWidth: 0.5,
						borderRightWidth: 0.5,
						borderLeftWidth: 0.5,
						borderTopRightRadius: 24,
						borderTopLeftRadius: 24,
						...Platform.select({
							ios: {
								shadowColor: "#C48414",
								shadowOffset: { width: 0, height: -4 },
								shadowOpacity: 0.1,
								shadowRadius: 20,
							},
							android: {
								elevation: 5,
							},
						}),
					},

					tabBarLabelStyle: {
						color: "#e8a123",
						fontFamily: "Archivo-Exp-Bold",
						marginTop: 4,
					},
				}}
			>
				<Tabs.Screen
					name="dashboard"
					options={{
						title: "Dashboard",
						headerShown: false,
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<DashboardIcon
									focused={focused}
									size={size}
									width={32}
									height={32}
									activeColor="#C48414"
									color={"#e8a123"}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="products"
					options={{
						title: "Products",
						headerShown: false,
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<ProductsIcon
									focused={focused}
									size={size}
									width={32}
									height={32}
									activeColor="#C48414"
									color={"#e8a123"}
								/>
							);
						},
					}}
				/>
			</Tabs>
			<Modal addModal={isOpen} />
			<Alert show={alert.show} />
		</>
	);
}
