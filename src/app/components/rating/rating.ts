import { Bank } from '../bank/bank';

export class Rating {
	id: number;
	bankId: number;
	bankName: string;
	text: string;
	value: number;
	name: string;
	email: string;
	createdAt: string;
	bank: Bank;

	constructor(
		id: number,
		bankId: number,
		text: string,
		value: number,
		name: string,
		email: string,
		createdAt: string,
		bank: Bank,
		bankName: string
		){

		this.id = id;
		this.bankId = bankId;
		this.text = text;
		this.value = value;
		this.name = name;
		this.email = email;
		this.createdAt = createdAt;
		this.bank = bank;
		this.bankName = bankName;
	}
}
