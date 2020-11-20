import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedPage = 'drivers';

  onNavigate(page: string): void {
    this.loadedPage = page;
  }
}
