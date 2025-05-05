import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect, useRouter } from "expo-router";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Platform,
	Pressable,
	RefreshControl,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FadeInView from "../components/animation_providers/FadeInView";
import AddIcon from "../components/icons/AddIcon";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import { useModal } from "../context/ModalContext";
import { useProduct } from "../context/ProductContext";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../utils/constants";
import { formatToCurrency } from "../utils/helper";

interface Category {
	id: number;
	name: string;
	description: string | null;
	createdAt: string;
	products: Product[];
}

interface Product {
	id: number;
	name: string;
	price: number;
	categoryId: number;
	category: Category;
	createdAt: string;
	description: string | null;
	expirationDate: string;
}

const Product = ({ item }: { item: Product }) => {
	const { showActionModal } = useModal();

	const [lastPress, setLastPress] = useState(0);

	const handlePress = () => {
		const currentTime = new Date().getTime();

		if (currentTime - lastPress <= 300) showActionModal();

		setLastPress(currentTime);
	};

	return (
		<Pressable onPress={handlePress} delayLongPress={45}>
			<View style={styles.productCard}>
				<View style={{ gap: 12 }}>
					<Text style={styles.productName}>{item.name}</Text>
					<Text style={styles.productPrice}>
						{formatToCurrency(item.price)}
					</Text>
				</View>
				<View style={styles.productBadge}>
					<Text style={styles.productBadgeText}>{item.category.name}</Text>
				</View>
			</View>
		</Pressable>
	);
};

const ProductsPage = () => {
	const { toggleModal, showLogoutModal } = useModal();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const isFocused = useIsFocused();
	const { fetchProducts, reset, products, loading, hasMore, page, loadMore } =
		useProduct();
	const searchInputRef = useRef<TextInput>(null);

	const [search, setSearch] = useState("");

	const searchProduct = useCallback(
		debounce((text: string) => {
			setSearch(text);
		}, 300),
		[]
	);

	useFocusEffect(
		useCallback(() => {
			reset();
			fetchProducts(1, undefined);
		}, [isFocused])
	);

	useEffect(() => {
		fetchProducts(page, search);
	}, [page, search]);

	useEffect(() => {
		reset();
	}, [search]);

	return (
		<FadeInView style={{ ...styles.container }}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
					<LeftArrowIcon onPress={() => router.back()} />
					<Text style={styles.title}>Products</Text>
				</View>
				<SettingsIcon onPress={showLogoutModal} />
			</View>
			<TextInput
				autoCapitalize="none"
				ref={searchInputRef}
				onChangeText={searchProduct}
				placeholder="Search..."
				style={styles.searchInput}
			/>
			<FlatList
				contentContainerStyle={{
					paddingBottom: insets.bottom,
					paddingHorizontal: 24,
				}}
				keyExtractor={(item) => "item-" + item.id.toString()}
				onEndReachedThreshold={0.5}
				data={products}
				renderItem={({ item }) => <Product item={item} />}
				onEndReached={loadMore}
				ListFooterComponent={
					loading ? <ActivityIndicator size="large" /> : null
				}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={() => {
							searchInputRef.current?.clear();
							setSearch("");
							reset();
							fetchProducts(1, "");
						}}
					/>
				}
			/>
			<TouchableOpacity
				onPress={() => toggleModal()}
				style={{
					...styles.addButton,
					bottom: insets.bottom + (Platform.OS === "ios" ? -15 : 15),
					right: insets.right + 15,
				}}
			>
				<AddIcon width={24} height={24} color={PRIMARY_COLOR} />
			</TouchableOpacity>
		</FadeInView>
	);
};

export default ProductsPage;

const styles = StyleSheet.create({
	container: {
		paddingVertical: Platform.OS === "ios" ? 16 : 16,

		gap: 16,
		position: "relative",
		height: "100%",
		backgroundColor: "white",
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		paddingBottom: 16,
		paddingHorizontal: 24,
	},
	title: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 24,
		color: PRIMARY_COLOR,
		textAlign: "left",
	},
	searchInput: {
		height: 50,
		borderColor: "#e8a123",
		borderWidth: 0.5,
		borderRadius: 8,
		fontFamily: "Archivo-Reg",
		paddingHorizontal: 10,
		marginHorizontal: 24,
	},
	productCard: {
		padding: 16,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		backgroundColor: "#ffffff",
		borderRadius: 8,
		borderColor: SECONDARY_COLOR,
		borderWidth: 0.2,
		marginBottom: 16,
		gap: 8,
	},
	productName: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 16,
		color: SECONDARY_COLOR,
	},
	productPrice: {
		fontSize: 24,
		color: PRIMARY_COLOR,
		fontFamily: "Archivo-Bold",
	},
	productBadge: {
		backgroundColor: PRIMARY_COLOR,
		padding: 4,
		paddingHorizontal: 12,
		borderRadius: 12,
	},
	productBadgeText: {
		fontSize: 12,
		color: "white",
	},
	addButton: {
		backgroundColor: "white",
		borderWidth: 0.2,
		borderColor: PRIMARY_COLOR,
		position: "absolute",
		width: 60,
		borderRadius: "100%",
		fontSize: 16,
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
	},
});
// const fetchData = async () => {
// 	if (loading || !hasMore) return;

// 	setLoading(true);

// 	if ((page - 1) * 10 >= data.totalProducts) setHasMore(false);

// 	setProducts((prev) => {
// 		const existingIds = new Set(prev.map((p) => p.id));
// 		const newProducts = data.products.filter(
// 			(p: Product) => !existingIds.has(p.id)
// 		);
// 		return [...prev, ...newProducts];
// 	});
// 	setPage((prev) => prev + 1);
// 	setLoading(false);
// };
