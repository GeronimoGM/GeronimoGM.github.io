import { Injectable, signal } from '@angular/core';
import { Theme } from '../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    const theme = localStorage.getItem(this.THEME_KEY);

    if (theme) {
      this.setTheme(theme as Theme);
    } else {
      this.setTheme('system');
    }
  }

  private readonly THEME_KEY = 'theme';
  private readonly theme = signal('system' as Theme);
  readonly selectedTheme = this.theme.asReadonly();

  setTheme(theme: Theme) {
    this.theme.set(theme);

    const html = document.documentElement;
    html.classList.remove('light', 'dark');

    if (theme === 'system') {
      localStorage.removeItem(this.THEME_KEY);
    } else {
      localStorage.setItem(this.THEME_KEY, theme);
      html.classList.add(theme);
    }
  }
}
