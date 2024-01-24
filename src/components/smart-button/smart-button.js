import styles from './smart-button.module.css';

export const SmartButton = ({ children, disabled, ...props }) => {
	return (
		<button
			className={disabled ? styles.disabledBtn : styles.btn}
			aria-disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};
