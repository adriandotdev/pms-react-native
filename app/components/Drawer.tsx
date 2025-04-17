import type { StyleProp, ViewStyle } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DrawerProps {
	style?: StyleProp<ViewStyle>; // Use proper style type
	open: boolean;
	children: React.ReactNode;
}

export default function Drawer({ style, children, open = true }: DrawerProps) {
	const insets = useSafeAreaInsets();

	return (
		<>
			{open && (
				<Animated.View
					entering={SlideInDown}
					exiting={SlideOutDown}
					style={[
						{
							backgroundColor: "white",
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							top: 0,
							zIndex: 1,
							borderTopEndRadius: 48,
							borderTopStartRadius: 48,
							paddingBottom: insets.bottom,
							overflow: "hidden",
						},
						style,
					]}
				>
					{children}
				</Animated.View>
			)}
		</>
	);
}
