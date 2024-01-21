import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
// import api from './api';
// import { ApiContext } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <ApiContext value={api}> */}
			<BrowserRouter>
				<App />
			</BrowserRouter>
			{/* </ApiContext> */}
		</Provider>
		,
	</React.StrictMode>,
);
