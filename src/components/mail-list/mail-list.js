import styles from './mail-list.module.css';
import { request } from '#utils';

export const MailList = () => {
	const addSubscription = ({ target }) => {
		request('/subscriptions', 'POST', target.value);
	};

	return (
		<div className={styles.mail}>
			<h1 className={styles.mailTitle}>Save time, save money!</h1>
			<span className={styles.mailDesc}>
				Sign up and we'll send the best deals to you
			</span>
			<div className={styles.mailInputContainer}>
				<input type="text" placeholder="Your Email" />
				<button onClick={addSubscription}>Subscribe</button>
			</div>
		</div>
	);
};
