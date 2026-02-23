import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '../../../types/experience';
import { Svg } from '../../shared/svg/svg';

@Component({
  selector: 'app-experience-card',
  imports: [Svg],
  template: `
    <article class="flex flex-col justify-between gap-4 px-responsive py-6 lg:flex-row">
      <p class="text-text-secondary w-1/2">{{ experience().time }}</p>
      <div class="flex flex-col gap-4">
        <img
          class="self-center object-cover h-64 rounded"
          [src]="experience().imgSrc"
          [alt]="experience().imgAlt"
        />
        <header>
          <a
            class="inline-flex items-center gap-1 text-accent hover:underline"
            [href]="experience().href"
            target="_blank"
          >
            <h3 class=" text-xl">{{ experience().company }}</h3>
            <app-svg name="link" size="xs" />
          </a>
          <p class="text-text-primary text-lg">{{ experience().position }}</p>
        </header>
        <p class="text-text-secondary">{{ experience().summary }}</p>
        <footer class="flex flex-col gap-4 items-start">
          <span class="inline-flex flex-wrap items-center gap-2">
            <ng-content />
          </span>
        </footer>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCard {
  readonly experience = input.required<Experience>();
}
