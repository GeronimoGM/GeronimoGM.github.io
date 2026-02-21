import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Svg } from '../svg/svg';

@Component({
  selector: '[app-pill]',
  imports: [Svg],
  template: `
    <app-svg [name]="icon()" size="xs" />
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex items-center gap-2 rounded-full text-xs px-3 py-1 font-medium',
  },
})
export class Pill {
  readonly icon = input.required<string>();
}
