import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactForm } from '../../components/index/contact-form/contact-form';
import { EducationCard } from '../../components/index/education-card/education-card';
import { ExperienceCard } from '../../components/index/experience-card/experience-card';
import { Button } from '../../components/shared/button/button';
import { Pill } from '../../components/shared/pill/pill';
import { Svg } from '../../components/shared/svg/svg';
import { Education } from '../../types/education';
import { Experience } from '../../types/experience';

@Component({
  selector: 'app-index-page',
  imports: [Button, Svg, ExperienceCard, Pill, EducationCard, ContactForm],
  template: `
    <section class="flex min-h-[calc(100dvh-80px)] justify-center items-center">
      <div class="flex flex-col max-w-2xl mx-auto gap-4">
        <div class="flex items-center gap-4 mb-2">
          <img
            class="size-24 object-cover rounded-full ring-2 ring-highlight"
            src="/assets/img/me.jpeg"
            alt="Foto de perfil de Gerónimo"
          />
          <div>
            <h1 i18n="@@title" class="text-4xl font-bold">
              Hola, soy <span class="text-highlight">Gerónimo</span>
            </h1>
            <h2 i18n="@@subtitle" class="text-xl text-text-secondary font-semibold">
              Full Stack Developer
            </h2>
          </div>
        </div>
        <div class="space-y-1">
          <p i18n="@@presentation.role" class="text-lg text-text-secondary">
            Especializado en arquitectura backend y experiencias frontend modernas.
          </p>
          <p i18n="@@presentation.experience" class="text-lg text-text-secondary">
            Fundador de <span class="text-text-primary">CompraAcá</span>. Diseño y construyo
            aplicaciones robustas con Spring y Angular, priorizando rendimiento, seguridad y
            experiencia de usuario.
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <a
            i18n="@@button.contact"
            href="mailto:geronimogonzalezmartino@gmail.com"
            icon="mail"
            iconSize="xs"
            variant="contrast"
            app-button
            >Contactame</a
          >
          <a
            i18n="@@button.cvDownload"
            [href]="cvHref"
            download
            icon="download"
            iconSize="xs"
            variant="highlight"
            app-button
            >Descargar CV</a
          >
        </div>
      </div>
    </section>

    <section>
      <h2
        id="experience"
        i18n="@@header.experience"
        class="inline-flex items-center gap-2 text-text-primary text-2xl"
      >
        <app-svg name="briefcase" /> Experiencia
      </h2>
      <app-experience-card [experience]="compraaca">
        <p
          class="bg-linear-to-r from-blue-500 via-fuchsia-500 to-red-500 text-white"
          app-pill
          icon="angular"
        >
          Angular
        </p>
        <p class="bg-white text-black border border-bg-contrast" app-pill icon="tailwindcss">
          Tailwind
        </p>
        <p class="bg-white text-green-500 border border-bg-contrast" app-pill icon="spring">
          Spring
        </p>
        <p class="bg-sky-900 text-amber-400" app-pill icon="mysql">MySQL</p>
        <p class="bg-white text-red-500 border border-bg-contrast" app-pill icon="redis">Redis</p>
        <p class="bg-white text-orange-500  border border-bg-contrast" app-pill icon="rabbitmq">
          RabbitMQ
        </p>
        <p class="bg-blue-500 text-white" app-pill icon="mercado-pago">Mercado Pago</p>
        <p class="bg-white text-sky-600 border border-bg-contrast" app-pill icon="docker">Docker</p>
        <p class="bg-white text-black border border-bg-contrast" app-pill icon="aws">AWS</p>
        <p class="bg-white text-green-700 border border-bg-contrast" app-pill icon="nginx">Nginx</p>
        <p class="bg-black text-white" app-pill icon="github">GitHub Actions</p>
      </app-experience-card>
      <app-experience-card [experience]="utnEmpleos">
        <p
          class="bg-linear-to-r from-blue-500 via-fuchsia-500 to-red-500 text-white"
          app-pill
          icon="angular"
        >
          Angular
        </p>
        <p class="bg-white text-green-500 border border-bg-contrast" app-pill icon="spring">
          Spring
        </p>
        <p class="bg-white text-black border border-bg-contrast" app-pill icon="google-drive">
          Google Drive
        </p>
        <p class="bg-sky-900 text-amber-400" app-pill icon="mysql">MySQL</p>
        <p class="bg-white text-green-700 border border-bg-contrast" app-pill icon="nginx">Nginx</p>
      </app-experience-card>
    </section>

    <section>
      <h2
        id="education"
        i18n="@@header.education"
        class="inline-flex items-center gap-2 text-text-primary text-2xl"
      >
        <app-svg name="graduation-cap" /> Educación
      </h2>
      @for (education of educations; track $index) {
        <app-education-card [education]="education" />
      }
    </section>

    <section>
      <h2
        id="contact"
        i18n="@@header.contact"
        class="inline-flex items-center gap-2 text-text-primary text-2xl"
      >
        <app-svg name="mail" /> Contacto
      </h2>
      <app-contact-form class="flex justify-center items-center" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPage {
  protected readonly cvHref = $localize`:@@cv.href:/assets/pdf/cv-es.pdf`;

  protected readonly compraaca: Experience = {
    time: $localize`:@@compraaca.time:Enero 2025 - Presente`,
    imgSrc: '/assets/img/compraaca-cover.png',
    imgAlt: $localize`:@@compraaca.imgAlt:Previsualización de la página de CompraAcá`,
    routerLink: '/experience/compraaca', // TODO: cambiar
    position: 'Founder & Full Stack Developer',
    company: 'CompraAcá',
    summary: $localize`:@@compraaca.summary:Plataforma que ayuda a comercios locales y emprendimientos a tener presencia digital sin complejidad técnica. Permite publicar productos, recibir pedidos en tiempo real y administrar su tienda online de manera intuitiva y eficiente.`,
    externalLink: 'https://compraaca.com.ar',
  };
  protected readonly utnEmpleos: Experience = {
    time: $localize`:@@utn-empleos.time:Junio 2024 - Presente`,
    imgSrc: '/assets/img/utn-empleos-cover.webp',
    imgAlt: $localize`:@@utn-empleos.imgAlt:Previsualización de la página de UTN Empleos`,
    routerLink: '/experience/utn-empleos', // TODO: cambiar
    position: 'Full Stack Developer',
    company: 'Universidad Tecnológica Nacional',
    summary: $localize`:@@utn-empleos.summary:Plataforma institucional orientada a conectar estudiantes y graduados con oportunidades laborales. Permite la publicación y gestión de ofertas, facilitando el vínculo entre empresas y la comunidad académica.`,
    externalLink: 'https://bolsatrabajo.mdp.utn.edu.ar',
  };

  protected readonly educations: Education[] = [
    {
      time: $localize`:@@utn.time:Marzo 2022 - Febrero 2025`,
      imgSrc: '/assets/img/utn-logo.png',
      imgAlt: $localize`:@@utn.imgAlt:Logo de la Universidad Tecnológica Nacional`,
      degree: $localize`:@@utn.degree:Tecnicatura Universitaria en Programación`,
      university: 'Universidad Tecnológica Nacional',
      gpa: $localize`:@@utn.gpa:Promedio: 8,95`,
    },
    {
      time: $localize`:@@cambridge.time:Diciembre 2024`,
      imgSrc: '/assets/img/cambridge-logo.webp',
      imgAlt: $localize`:@@cambridge.imgAlt:Logo de Cambridge`,
      degree: 'First Certificate in English (B2)',
      university: 'Cambridge University',
      gpa: $localize`:@@cambridge.gpa:Nota: 176/200`,
    },
  ];
}
