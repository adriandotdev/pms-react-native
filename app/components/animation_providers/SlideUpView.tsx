import React, { PropsWithChildren, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from "react-native-reanimated";

type AnimationProp = {
	delay?: number;
};
type SlideUpViewProps = PropsWithChildren<{ style?: ViewStyle }> &
	AnimationProp;

const SlideUpView: React.FC<SlideUpViewProps> = (props) => {
	const translateY = useSharedValue(100); // Start from bottom
	const opacity = useSharedValue(0); // Start from transparent

	useEffect(() => {
		translateY.value = withDelay(props.delay ?? 0, withSpring(0));
		opacity.value = withDelay(props.delay ?? 0, withSpring(1)); // Fade in

		return () => {
			translateY.value = withSpring(100); // Reset to bottom
			opacity.value = withSpring(0); // Reset to transparent
		};
	}, []);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		opacity: opacity.value,
	}));

	return (
		<Animated.View style={[props.style, animatedStyles]}>
			{props.children}
		</Animated.View>
	);
};

export default SlideUpView;
