import React, { PropsWithChildren, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

type AnimationProp = {
	delay?: number;
	actionModal: boolean;
};
type SlideUpViewProps = PropsWithChildren<{ style?: ViewStyle }> &
	AnimationProp;

const SlideDownView: React.FC<SlideUpViewProps> = (props) => {
	const translateY = useSharedValue(100);
	const opacity = useSharedValue(0);

	useEffect(() => {
		if (props.actionModal) {
			translateY.value = withDelay(
				props.delay ?? 0,
				withTiming(0, { duration: 400 })
			);
			opacity.value = withDelay(
				props.delay ?? 0,
				withTiming(1, { duration: 400 })
			);
		} else {
			translateY.value = withTiming(100, { duration: 400 });
			opacity.value = withTiming(0, { duration: 400 }, (finished) => {
				if (finished) {
					runOnJS(() => {
						console.log("exiting");
					})();
				}
			});
		}
	}, [props.actionModal]);

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

export default SlideDownView;
