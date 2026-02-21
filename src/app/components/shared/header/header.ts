import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
        class="self-start items-center justify-between gap-4 flex text-sm [&>a]:text-text-secondary [&>a]:hover:text-accent [&>a]:transition-colors [&>a]:duration-300 [&>a]:border-b [&>a]:border-transparent [&>a]:hover:border-accent translate-y-0.5"
      >
        <a href="#">Sobre mí</a>
        <a href="#">Experiencia</a>
        <a href="#">Educación</a>
        <a href="#">Contacto</a>
      </nav>
      <app-overlay [buttonLabel]="themeLabel()" [buttonIcon]="theme()" [(visible)]="visible">
        <button
          class="w-full"
          (click)="visible.set(true)"
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
          class="w-full"
          (click)="visible.set(true)"
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
          class="w-full"
          (click)="visible.set(true)"
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

  protected readonly visible = signal(false);
  protected readonly theme = this.themeService.selectedTheme;

  protected readonly themeLabel = () => {
    switch (this.theme()) {
      case 'light':
        return $localize`:@@theme.light:Claro`;
      case 'dark':
        return $localize`:@@theme.dark:Oscuro`;
      case 'system':
        return $localize`:@@theme.system:Sistema`;
    }
  };

  protected changeTheme(theme: Theme) {
    this.visible.set(false);
    this.themeService.setTheme(theme);
  }
}
