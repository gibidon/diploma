import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.centeringParent}>
			<div className={styles.container}>
				<div className={styles.spinner}></div>
			</div>
		</div>
	);
};
