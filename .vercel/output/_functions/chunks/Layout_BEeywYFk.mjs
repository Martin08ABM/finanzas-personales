import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, n as renderSlot } from './astro/server_CUtYkpRA.mjs';
import 'kleur/colors';
/* empty css                                      */
import 'clsx';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="w-full h-auto py-2 px-4 flex justify-between items-center bg-green-800 md:px-8"> <a href="/"> <img src="/dinario.png" alt="Logo de Dinario" class="h-7 sm:h-8"> </a> <a href="/dashboard" class="text-white text-sm font-bold sm:text-base">Dashboard</a> </header>`;
}, "C:/Users/marti/Desktop/finanzas-personales/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es-ES" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/marti/Desktop/finanzas-personales/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
