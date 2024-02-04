import { useThemeContext } from '#hooks';
import styles from './footer.module.scss';

export const Footer = () => {
	const { theme } = useThemeContext();

	return (
		<div className={theme === 'light' ? styles.footerLight : styles.footerDark}>
			<div className={styles.content}>© all right reserved</div>
		</div>
	);
};
