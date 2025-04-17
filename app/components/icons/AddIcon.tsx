import Svg, { Rect, SvgProps } from "react-native-svg";

const AddIcon = (props: SvgProps) => {
	return (
		<Svg
			width={props.width}
			height={props.height}
			viewBox="0 0 12 12"
			fill="none"
		>
			<Rect y="5" width="12" height="2" rx="1" fill={props.color} />
			<Rect
				x="5"
				y="12"
				width="12"
				height="2"
				rx="1"
				transform="rotate(-90 5 12)"
				fill={props.color}
			/>
		</Svg>
	);
};

export default AddIcon;
