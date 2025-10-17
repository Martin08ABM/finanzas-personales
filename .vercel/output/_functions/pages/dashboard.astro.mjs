import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUtYkpRA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BEeywYFk.mjs';
import { s as supabase } from '../chunks/supabase_Bv9NJ-1h.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const accessToken = Astro2.cookies.get("sb-access-token");
  const refreshToken = Astro2.cookies.get("sb-refresh-token");
  if (!accessToken || !refreshToken) {
    return Astro2.redirect("/signin");
  }
  let session;
  try {
    session = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value
    });
    if (session.error) {
      Astro2.cookies.delete("sb-access-token", {
        path: "/"
      });
      Astro2.cookies.delete("sb-refresh-token", {
        path: "/"
      });
      return Astro2.redirect("/signin");
    }
  } catch (error) {
    Astro2.cookies.delete("sb-access-token", {
      path: "/"
    });
    Astro2.cookies.delete("sb-refresh-token", {
      path: "/"
    });
    return Astro2.redirect("/signin");
  }
  const email = session.data.user?.email;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dinario - Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="px-4 py-2"> <h1 class="text-xl text-green-950 font-bold">
Bienvenido <em class="font-extrabold">${email}</em> </h1> <p class="text-neutral-800 font-semibold">Estamos felices de verte por aquí</p> <h2 class="font-bold text-lg mt-2">¿Que quieres hacer?</h2> <!-- TODO: Cuando la web este con las funciones mas avanzadas de añadir os datos actualizar esta parte para enviar a esas partes específicas --> <form action="/api/auth/signout"> <button type="submit" class="border-none rounded-2xl bg-red-700 px-2 py-1 font-bold text-white">Cerrar sesión</button> </form> </main> ` })}`;
}, "C:/Users/marti/Desktop/finanzas-personales/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/marti/Desktop/finanzas-personales/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
