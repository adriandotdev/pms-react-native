import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Platform,
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
	return (
		<View style={styles.productCard}>
			<View>
				<Text style={styles.productName}>{item.name}</Text>
				<Text style={styles.productPrice}>{item.price}</Text>
			</View>
			<View style={styles.productBadge}>
				<Text style={styles.productBadgeText}>{item.category.name}</Text>
			</View>
		</View>
	);
};

const ProductsPage = () => {
	const { toggleModal } = useModal();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const isFocused = useIsFocused();
	const [search, setSearch] = useState("");

	const fetchProducts = async (pageNumber: number) => {
		setLoading(true);
		try {
			// @TODO It must be in environment variables
			const response = await axios.get(
				`https://accurately-factual-troll.ngrok-free.app/api/v1/products?pageNumber=${pageNumber}&filter=${search}`
			);

			const newProducts = response.data.products;
			if (newProducts.length === 0) {
				setHasMore(false);
			} else {
				setProducts((prev) => {
					const existingIds = new Set(prev.map((p) => p.id));
					const filtered = newProducts.filter(
						(p: Product) => !existingIds.has(p.id)
					);
					return pageNumber === 1 ? newProducts : [...prev, ...filtered];
				});
			}
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	const searchProduct = useCallback(
		debounce((text: string) => {
			setSearch(text);
		}, 300),
		[]
	);

	useFocusEffect(
		useCallback(() => {
			setPage(1);
			setHasMore(true);
			setProducts([]);
			fetchProducts(1);
		}, [isFocused])
	);

	useEffect(() => {
		if (page > 1) {
			console.log("effect");

			fetchProducts(page);
		}
	}, [page]);

	useEffect(() => {
		setPage(1);
		setHasMore(true);
		setProducts([]);
		fetchProducts(1);
	}, [search]);

	const loadMore = () => {
		if (!loading && hasMore) {
			setPage((prev) => prev + 1);
		}
	};

	return (
		<FadeInView style={{ ...styles.container }}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
					<LeftArrowIcon onPress={() => router.back()} />
					<Text style={styles.title}>Products</Text>
				</View>
				<SettingsIcon />
			</View>
			<TextInput
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
				renderItem={Product}
				onEndReached={loadMore}
				ListFooterComponent={
					loading ? <ActivityIndicator size="large" /> : null
				}
			/>
			<TouchableOpacity
				onPress={() => toggleModal()}
				style={{
					...styles.addButton,
					bottom: insets.bottom + 15,
					right: insets.right + 15,
				}}
			>
				<AddIcon width={24} height={24} color={"#e8a123"} />
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
		marginHorizontal: 24,
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
	addButton: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#e8a123",
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
