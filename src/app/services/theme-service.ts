import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Theme } from '../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem(this.THEME_KEY);

      if (theme) {
        this.setTheme(theme as Theme);
      } else {
        this.setTheme('system');
      }
    }
  }

  private readonly platformId = inject(PLATFORM_ID);
  private readonly THEME_KEY = 'theme';
  private readonly theme = signal('system' as Theme);
  readonly selectedTheme = this.theme.asReadonly();

  setTheme(theme: Theme) {
    if (isPlatformBrowser(this.platformId)) {
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
}
