export const getHotels = () =>
	fetch('http://localhost:3000/hotels')
		.then((hotels) => hotels.json())
		.then((hotels) => hotels);
