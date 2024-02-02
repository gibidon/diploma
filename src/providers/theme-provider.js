import { useState } from 'react';
import { ThemeContext } from '#contexts';

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	const color = theme === 'light' ? '#333' : '#FFF';
	const backgroundColor = theme === 'light' ? '#FFF' : '#333';

	document.body.style.color = color;
	document.body.style.backgroundColor = backgroundColor;

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
