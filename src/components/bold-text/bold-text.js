export const BoldText = ({ children, fontWeight }) => {
	return (
		<span style={{ fontWeight: fontWeight ? fontWeight : 600 }}>
			{children}
		</span>
	);
};
