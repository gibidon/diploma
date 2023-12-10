import { useState } from 'react';
import { images } from '../../data/images';

export const PhotoSlider = () => {
	// const [photos,]
	let [currentPhoto, setCurrentPhoto] = useState(0);
	const length = images.length - 1;

	const moveNext = () => {
		setCurrentPhoto(currentPhoto === length ? 0 : (currentPhoto += 1));
	};

	const movePrev = () => {
		setCurrentPhoto(currentPhoto === 0 ? length : (currentPhoto -= 1));
	};
	return (
		<div>
			{images.map((photoUrl, index) => (
				<div key={index}>
					{/* {photoUrl} */}
					{index === currentPhoto && <img src={photoUrl} alt={photoUrl} />}
				</div>
			))}
			<button onClick={movePrev}>prev</button>
			<button onClick={moveNext}>next</button>
			{/* <img src={currentPhoto}/> */}
		</div>
	);
};
