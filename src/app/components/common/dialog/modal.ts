import { Component, Input, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { MODAL_TYPE } from '../../../utils/config/modal';

@Component({
	selector: 'dialog-modal',
	templateUrl: './modal.html'
})

export class DialogModal {
	@Input()info: Object;
	@Input()type: string;
	@Input()actionList: Object;
	@Input()modalActions;

	private MODAL_TYPE = MODAL_TYPE;

	@ViewChild('modalWindow') public modal: ModalDirective;	

	constructor(){

	}

	show(){
		this.modal.show();
	}
}