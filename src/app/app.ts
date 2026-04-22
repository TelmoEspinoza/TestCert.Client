// Imports the Component decorator, which is used to define an Angular component
import { Component } from '@angular/core';

// Imports routing-related directives used inside the template
// RouterOutlet: enables <router-outlet> in app.html (this is where routed pages load)
// RouterLink: enables routerLink and [routerLink] on <a> / buttons for navigation without page refresh
// RouterLinkActive: enables routerLinkActive and [routerLinkActiveOptions] to highlight the active menu link
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  // Defines the custom HTML tag for this component
  // <app-root> is the root element of the Angular application used inside index.html
  selector: 'app-root',

  // Tells Angular that this is a Standalone Component (no AppModule required)
  // With standalone, every component explicitly declares what directives/components it uses via `imports`.
  standalone: true,

  // Registers routing directives that are used in the template (app.html)
  // RouterOutlet      → Acts as a placeholder where routed components are displayed
  // RouterLink        → Enables navigation between routes without page reload
  // RouterLinkActive  → Automatically adds/removes CSS classes for active links
  imports: [RouterOutlet, RouterLink, RouterLinkActive],

  // External template file for the layout (navbar + footer + router-outlet)
  templateUrl: './app.html',
})
export class App {
  // This root component acts as the layout shell of the application.
  // It usually contains shared UI (header/navbar/footer) and a <router-outlet> for page content.
}
