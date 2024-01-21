import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input } from '#components';
import { useResetForm } from '#hooks';
import { setUser } from '#actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '#selectors';
import { Link, Navigate } from 'react-router-dom';
import { ROLES } from '#constants/roles';
import { request } from '#utils';
import styles from './authorization.module.css';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Enter the password')
		.matches(/^\w+$/, 'Wrong login: numbers and letters only')
		.min(3, 'Login should have at least 3 symbols')
		.max(15, 'Login must be no longer than 15 symbols'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль.Допускаются буквы,цифры и знаки #,%',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Не больше 30 символов'),
});

export const Authorization = () => {
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса, ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLES.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.mainContainer}>
			<section className={styles.authSidebar}>
				<div className={styles.sidebarUpper}>
					Don't just book <br /> Enjoy
				</div>
				<div className={styles.sidebarLower}></div>
			</section>
			<section className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="login">Login</label>
						<br />
						<Input
							type="text"
							placeholder="enter login"
							id="login"
							{...register('login', { onChange: () => {} })}
							autoFocus
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<br />
						<Input
							type="password"
							placeholder="password"
							id="password"
							{...register('password', { onChange: () => {} })}
						/>
					</div>
					<Button className={styles.submitBtn} type="submit">
						Submit
					</Button>
				</form>
				<div>{errorMessage}</div>
				<div>
					<Link to="/register">
						Don't have account yet? Go to register page
					</Link>
				</div>
				<div>
					<a href="/register">Go with reload with a tag</a>
				</div>
			</section>
		</div>
	);
};
