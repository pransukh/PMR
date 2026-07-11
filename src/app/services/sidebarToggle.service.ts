import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  // Single source of reactive truth
  private isOpen = signal<boolean>(true);

  // Read-only signal exposed to components
  readonly isSidebarOpen = this.isOpen.asReadonly();

  // Method to change state from anywhere
  toggle(): void {
    this.isOpen.update(state => !state);
  }
}