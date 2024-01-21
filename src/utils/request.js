export function request(url, method, data) {
	console.log('data in request: ', data);

	return fetch(url, {
		headers: { 'content-type': 'application/json' },
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
