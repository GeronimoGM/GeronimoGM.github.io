import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Size } from '../../../types/size';
import { Variant } from '../../../types/variant';
import { Svg } from '../svg/svg';

@Component({
  selector: 'button[app-button], a[app-button]',
  imports: [Svg],
  template: `
    @if (icon(); as icon) {
      <app-svg [name]="icon" [size]="iconSize()" />
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]':
      '"border inline-flex items-center gap-2 rounded-xl transition-colors duration-200 " + sizeClass() + " " + variantClass()',
  },
})
export class Button {
  readonly icon = input<string | null>(null);
  readonly iconSize = input<Size>('sm');
  readonly size = input<Size>('md');
  readonly variant = input<Variant>('secondary');

  protected readonly sizeClass = computed(() => {
    switch (this.size()) {
      case 'xs':
        return 'px-2 py-1 text-xs';
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-5 py-3 text-lg';
      case 'xl':
        return 'px-6 py-4 text-xl';
    }
  });

  protected readonly variantClass = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'bg-bg-primary text-text-primary hover:bg-bg-secondary';
      case 'secondary':
        return 'bg-bg-secondary text-text-secondary hover:bg-bg-primary';
      case 'contrast':
        return 'bg-bg-contrast text-text-contrast hover:bg-bg-primary hover:text-text-primary';
      case 'accent':
        return 'bg-accent text-text-contrast hover:bg-accent/80';
      case 'highlight':
        return 'bg-highlight text-text-contrast hover:bg-highlight/80';
      case 'simple':
        return 'bg-transparent border-transparent text-text-primary hover:text-accent';
    }
  });
}
