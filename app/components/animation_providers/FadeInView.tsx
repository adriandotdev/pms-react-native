import React, { PropsWithChildren, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
	const fadeAnim = useSharedValue(0);

	useEffect(() => {
		fadeAnim.value = withTiming(1, { duration: 300 });
	}, [fadeAnim]);

	return (
		<Animated.View
			style={{
				...props.style,
				opacity: fadeAnim,
			}}
		>
			{props.children}
		</Animated.View>
	);
};

export default FadeInView;
