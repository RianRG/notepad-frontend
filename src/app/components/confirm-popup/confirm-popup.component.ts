import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  imports: [],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.css'
})
export class ConfirmPopupComponent {
  @Output() confirmation = new EventEmitter()
  popupClass: boolean = false;
  overlayClass: boolean = false;

  confirmDelete(){
    this.confirmation.emit(true)
    this.togglePopup()
  }

  cancelDelete(){
    this.togglePopup()
  }

  togglePopup(){
    this.popupClass = !this.popupClass
    this.overlayClass = !this.overlayClass
  }
}
