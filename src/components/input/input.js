import { forwardRef } from 'react';
import styles from './input.module.scss';

export const Input = forwardRef(({ ...props }, ref) => {
	return <input className={styles.input} {...props} ref={ref}></input>;
});
