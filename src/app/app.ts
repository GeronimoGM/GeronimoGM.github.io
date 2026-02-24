import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Button } from './components/shared/button/button';
import { Header } from './components/shared/header/header';
import { LanguageService } from './services/language-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Button],
  template: `
    <header app-header></header>

    <main class="flex-1 px-responsive py-8">
      <router-outlet />
    </main>

    <footer class="px-responsive py-6 flex justify-center items-center">
      <a
        aria-label="GitHub"
        app-button
        icon="social-github"
        variant="simple"
        href="https://github.com/GeronimoGM"
        target="_blank"
      ></a>
      <a
        aria-label="LinkedIn"
        app-button
        icon="linkedin"
        variant="simple"
        href="https://linkedin.com/in/geronimogm"
        target="_blank"
      ></a>
      <a
        aria-label="Instagram"
        app-button
        icon="instagram"
        variant="simple"
        href="https://instagram.com/gero.gonzalez.m"
        target="_blank"
      ></a>
    </footer>
  `,
  host: {
    class:
      'min-h-screen flex flex-col text-text-primary transition-colors duration-300 container max-w-6xl mx-auto',
  },
})
export class App {
  constructor() {
    this.setSeo();
  }

  private readonly languageService = inject(LanguageService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  private setSeo(): void {
    const isSpanish = this.languageService.locale.startsWith('es');

    const seo = isSpanish
      ? {
          title: 'Gerónimo | Desarrollador Full Stack',
          description:
            'Desarrollador Full Stack especializado en Angular y Spring Boot. Construyo aplicaciones modernas, escalables y enfocadas en experiencia de usuario.',
          keywords:
            'desarrollador full stack, angular, spring boot, portfolio, programador argentina',
          ogLocale: 'es_AR',
        }
      : {
          title: 'Gerónimo | Full Stack Developer',
          description:
            'Full Stack Developer specialized in Angular and Spring Boot. I build modern, scalable applications focused on user experience.',
          keywords:
            'full stack developer, angular, spring boot, portfolio, software developer argentina',
          ogLocale: 'en_US',
        };

    this.title.setTitle(seo.title);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords });

    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://geronimogm.vercel.app' });
    this.meta.updateTag({ property: 'og:locale', content: seo.ogLocale });
    this.meta.updateTag({ property: 'og:image', content: 'assets/favicon.ico' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: 'assets/favicon.ico' });
  }
}
