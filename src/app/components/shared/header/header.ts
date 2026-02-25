import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../../services/language-service';
import { ThemeService } from '../../../services/theme-service';
import { Theme } from '../../../types/theme';
import { Button } from '../button/button';
import { Overlay } from '../overlay/overlay';
import { Svg } from '../svg/svg';

@Component({
  selector: '[app-header]',
  imports: [Svg, Overlay, Button],
  template: `
    <a href="/">
      <app-svg name="logo" />
    </a>
    <div class="flex items-center gap-4">
      <nav
        class="hidden self-start items-center justify-between gap-4 sm:flex text-sm [&>a]:text-text-secondary [&>a]:hover:text-accent [&>a]:transition-colors [&>a]:duration-300 [&>a]:border-b [&>a]:border-transparent [&>a]:hover:border-accent translate-y-0.5"
      >
        <a i18n="@@nav.about" href="#about">Sobre mí</a>
        <a i18n="@@nav.experience" href="#experience">Experiencia</a>
        <a i18n="@@nav.education" href="#education">Educación</a>
        <a i18n="@@nav.contact" href="#contact">Contacto</a>
      </nav>
      <app-overlay [buttonLabel]="themeLabel()" [buttonIcon]="theme()" [(visible)]="visible">
        <button
          i18n="@@theme.light"
          class="w-full"
          app-button
          variant="simple"
          icon="light"
          size="sm"
          iconSize="xs"
          (click)="changeTheme('light')"
        >
          Claro
        </button>
        <button
          i18n="@@theme.dark"
          class="w-full"
          app-button
          variant="simple"
          icon="dark"
          size="sm"
          iconSize="xs"
          (click)="changeTheme('dark')"
        >
          Oscuro
        </button>
        <button
          i18n="@@theme.system"
          class="w-full"
          app-button
          variant="simple"
          icon="system"
          size="sm"
          iconSize="xs"
          (click)="changeTheme('system')"
        >
          Sistema
        </button>
      </app-overlay>
      <app-overlay
        [buttonLabel]="languageLabel()"
        [buttonIcon]="languageIcon()"
        [(visible)]="languageVisible"
      >
        <button
          class="w-full"
          app-button
          variant="simple"
          icon="flag-ar"
          size="sm"
          iconSize="xs"
          (click)="changeLanguage('es')"
        >
          Español
        </button>
        <button
          class="w-full"
          app-button
          variant="simple"
          icon="flag-us"
          size="sm"
          iconSize="xs"
          (click)="changeLanguage('en')"
        >
          English
        </button>
      </app-overlay>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'sticky top-0 z-50 backdrop-blur border-b border-border bg-bg-primary/80 flex items-center justify-between px-responsive py-4',
  },
})
export class Header {
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);

  protected readonly visible = signal(false);
  protected readonly languageVisible = signal(false);
  protected readonly theme = this.themeService.selectedTheme;

  protected readonly themeLabel = computed(() => {
    switch (this.theme()) {
      case 'light':
        return $localize`:@@theme.light:Claro`;
      case 'dark':
        return $localize`:@@theme.dark:Oscuro`;
      case 'system':
        return $localize`:@@theme.system:Sistema`;
    }
  });

  protected readonly languageLabel = () =>
    this.languageService.locale === 'en' ? 'English' : 'Español';
  protected readonly languageIcon = () =>
    this.languageService.locale === 'en' ? 'flag-us' : 'flag-ar';

  protected changeTheme(theme: Theme) {
    this.visible.set(false);
    this.themeService.setTheme(theme);
  }

  protected changeLanguage(language: 'es' | 'en') {
    this.languageVisible.set(false);
    this.languageService.changeLanguage(language);
  }
}
