import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  public readonly router = inject(Router);
  public readonly locale = inject(LOCALE_ID);

  public changeLanguage(language: 'es' | 'en') {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `/${language}${this.router.url}`;
    }
  }
}
