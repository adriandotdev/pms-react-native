import React, { PropsWithChildren, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

type SlideUpViewProps = PropsWithChildren<{ style?: ViewStyle }>;

const SlideUpView: React.FC<SlideUpViewProps> = (props) => {
	const translateY = useSharedValue(100); // Start from bottom

	useEffect(() => {
		translateY.value = withSpring(0); // Animate to top (translateY: 0)
	}, []);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	return (
		<Animated.View style={[props.style, animatedStyles]}>
			{props.children}
		</Animated.View>
	);
};

export default SlideUpView;
