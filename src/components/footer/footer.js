import { Container } from '../container/container';
import styles from './footer.module.scss';

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<Container maxWidth={1168}>footer</Container>
		</div>
	);
};
