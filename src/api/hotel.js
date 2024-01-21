export async function all(searchPhrase, page, PAGINATION_LIMIT) {
	try {
		const response = await fetch(
			`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		return err;
	}
}

export async function one() {
	try {
	} catch (error) {}
}
