import { useState } from 'react';

export const Dropdown = ({ children, openBtnText, closeBtnText }) => {
	const [state, setState] = useState(false);

	return (
		<div>
			<button onClick={() => setState(!state)}>
				{state ? closeBtnText : openBtnText}
			</button>
			<div>{state && children}</div>
		</div>
	);
};
