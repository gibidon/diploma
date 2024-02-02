export async function all() {
	const response = await fetch('/users');
	const data = await response.json();

	console.log(data);
	return data;
}
