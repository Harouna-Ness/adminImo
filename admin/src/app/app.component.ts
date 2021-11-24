import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/annoces', icon: 'mail' },
    { title: 'teste imPic', url: '/imagepick', icon: 'paper-plane' },
    // { title: 'Rétirées', url: '/retirees', icon: 'paper-plane' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
