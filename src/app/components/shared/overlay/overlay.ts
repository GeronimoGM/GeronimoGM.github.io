import { ChangeDetectionStrategy, Component, HostListener, input, model } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-overlay',
  imports: [Button],
  template: `
    <div class="flex items-center relative">
      <!-- Trigger -->
      <button
        class="cursor-pointer"
        (click)="visible.set(!visible())"
        [icon]="buttonIcon()"
        size="xs"
        iconSize="xs"
        app-button
      >
        {{ buttonLabel() }}
      </button>

      <!-- Overlay -->
      @if (visible()) {
        <div
          class="flex flex-col items-end absolute top-full -left-15 bg-bg-secondary border border-border rounded-xl shadow-lg z-50"
          (click)="$event.stopPropagation()"
        >
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overlay {
  readonly visible = model();
  readonly buttonLabel = input.required<string>();
  readonly buttonIcon = input.required<string>();

  @HostListener('document:click', ['$event'])
  protected onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-overlay')) {
      this.visible.set(false);
    }
  }
}
