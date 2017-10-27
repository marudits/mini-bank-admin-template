import { key } from '../config/app';

export function getImgStreetView(coords, size = '400x200'){
	return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${coords.lat},${coords.lng}&heading=151.78&pitch=-0.76&&key=${key.google}`
};
