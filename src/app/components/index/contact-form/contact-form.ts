import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-contact-form',
  imports: [Button, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="flex flex-col gap-4 bg-card p-8 shadow-2xl rounded w-full *:flex *:flex-col *:gap-1 sm:max-w-1/2"
    >
      <div>
        <label for="email"> Email </label>
        <input
          class="border rounded-md p-2 outline-accent outline-offset-1 focus:outline-2"
          type="email"
          id="email"
          name="email"
          formControlName="email"
        />
        @if (getError('email', 'required')) {
          <i
            i18n="@@error.email.required"
            class="text-xs text-red-500"
            animate.enter="animate-fade-in"
            animate.leave="animate-fade-out"
            >El email es obligatorio</i
          >
        }
        @if (getError('email', 'email')) {
          <i
            i18n="@@error.email.email"
            class="text-xs text-red-500"
            animate.enter="animate-fade-in"
            animate.leave="animate-fade-out"
            >Ingrese un email válido</i
          >
        }
      </div>
      <div>
        <label i18n="@@form.message" for="message"> Mensaje </label>
        <textarea
          class="border rounded-md p-2 outline-accent outline-offset-1 focus:outline-2"
          id="message"
          name="message"
          formControlName="message"
        ></textarea>
        @if (getError('message', 'required')) {
          <i
            i18n="@@error.message.required"
            class="text-xs text-red-500"
            animate.enter="animate-fade-in"
            animate.leave="animate-fade-out"
            >El mensaje es obligatorio</i
          >
        }
      </div>
      <button app-button variant="highlight" type="submit">Send</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formspree.io/f/xnjbgkll';

    Object.entries(this.form.getRawValue()).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  protected getError(controlName: string, error: string) {
    const control = this.form.get(controlName);
    return !!(control?.hasError(error) && (control.dirty || control.touched));
  }
}
