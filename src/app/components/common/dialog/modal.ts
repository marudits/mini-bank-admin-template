import { Component, Input} from '@angular/core';

import { MODAL_TYPE } from '../../../utils/config/modal';

@Component({
	selector: 'dialog-modal',
	templateUrl: './modal.html'
})



export class DialogModal {
	@Input()info: Object;
	@Input()type: string;
	@Input()actionList: Object;
	@Input()materializeParams;
	@Input()modalActions;

	private MODAL_TYPE = MODAL_TYPE;	

	constructor(){}
}