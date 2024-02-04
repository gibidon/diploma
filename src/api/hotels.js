export async function all(
	searchPhrase,
	page,
	PAGINATION_LIMIT,
	country,
	min,
	max,
	rating,
) {
	const response = await fetch(
		`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&min=${min}&max=${max}&rating=${rating}`,
	);
	const data = await response.json();

	return data;
}

export async function one(id) {
	const response = await fetch(`/hotel/${id}`);
	console.log('in one: ', response);
	const { data } = await response.json();
	console.log('in one:', data);
	return data;
}
