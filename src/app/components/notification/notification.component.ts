import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notificationMessage: string  = '';
  
  showNotification(msg: string){
    this.notificationMessage = msg
    setTimeout(() =>{
      this.notificationMessage = '';
    }, 2000)
  }

}
