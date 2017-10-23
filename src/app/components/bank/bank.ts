import { Rating } from '../rating/rating';

class Coordinates {
	lat: string;
	lng: string;
}

export class Bank {
	
	id: number;
	name: string;
	address: string;
	location: Coordinates;
	phone: string;
	rating: number;
	favourites: number;
	officeHours: string[];
	officeDays: number[];
	createdAt: string;
	updatedAt: string;

	constructor(
		id: number, 
		name: string, 
		address: string, 
		rating: number,
		favourites: number,
		){

		this.id = id;
		this.name = name;
		this.address = address;
		this.rating = rating;
		this.favourites = favourites;	
	}
}

