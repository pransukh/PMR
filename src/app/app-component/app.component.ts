import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Header from '../components/header/header.component';
import { SidebarToggleService } from '../services/sidebarToggle.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CompSom';

  protected sidebarService = inject(SidebarToggleService);
}
