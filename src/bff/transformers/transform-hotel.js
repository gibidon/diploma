export const transformHotel = (dbHotel) => ({
	id: dbHotel.id,
	title: dbHotel.title,
	rating: dbHotel.rating,
	description: dbHotel.description,
	price: dbHotel.price,
	reviews: dbHotel.reviews,
	images: dbHotel.images,
	booked: dbHotel.booked,
});
