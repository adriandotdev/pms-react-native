import Svg, { Circle, Rect, SvgProps } from "react-native-svg";

const ProductsIcon = (props: SvgProps) => {
	return (
		<Svg
			width={props.width}
			height={props.height}
			viewBox="0 0 14 8"
			fill="none"
		>
			<Circle cx="1" cy="1" r="1" fill={props.color} />
			<Rect x="3" width="11" height="2" rx="1" fill={props.color} />
			<Circle cx="1" cy="4" r="1" fill={props.color} />
			<Rect x="3" y="3" width="11" height="2" rx="1" fill={props.color} />
			<Circle cx="1" cy="7" r="1" fill={props.color} />
			<Rect x="3" y="6" width="11" height="2" rx="1" fill={props.color} />
		</Svg>
	);
};

export default ProductsIcon;
