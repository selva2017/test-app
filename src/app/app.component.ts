import { Component } from '@angular/core';
import { ServerService } from './shared/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private serverService: ServerService) { }
  title = 'app';
}
