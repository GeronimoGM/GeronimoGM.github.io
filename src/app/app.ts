import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <header app-header></header>

    <main class="flex-1 px-responsive py-8">
      <router-outlet />
    </main>

    <footer class="border-t border-border px-responsive py-6">
      <p class="text-text-secondary">To do...</p>
    </footer>
  `,
  host: {
    class:
      'min-h-screen flex flex-col text-text-primary transition-colors duration-300 container max-w-6xl mx-auto',
  },
})
export class App {}
