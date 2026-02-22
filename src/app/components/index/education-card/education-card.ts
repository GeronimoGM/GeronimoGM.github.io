import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education } from '../../../types/education';

@Component({
  selector: 'app-education-card',
  imports: [],
  template: `
    <article class="flex flex-col gap-4 px-responsive py-6 lg:flex-row">
      <p class="text-text-secondary lg:w-1/4">{{ education().time }}</p>
      <div class="flex gap-4">
        <img
          class="object-cover h-16 rounded"
          [src]="education().imgSrc"
          [alt]="education().imgAlt"
        />
        <div>
          <h3 class="text-accent text-xl">{{ education().degree }}</h3>
          <div
            class="flex flex-col items-start justify-between sm:flex-row sm:items-center sm:gap-2"
          >
            <p class="text-text-primary text-lg">{{ education().university }}</p>
            <p class="text-text-secondary text-md">{{ education().gpa }}</p>
          </div>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationCard {
  readonly education = input.required<Education>();
}
