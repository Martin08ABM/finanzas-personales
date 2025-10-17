import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUtYkpRA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BEeywYFk.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dinario - Registro" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="px-4 py-2"> <h1 class="text-black text-xl font-bold md:text-2xl lg:text-2xl">
Registrate en Dinario:
</h1> <!-- Formulario de registro --> <form action="/api/auth/register" method="post" class="flex flex-col border-2 border-neutral-900 rounded-xl p-2 shadow-2xl shadow-neutral-400 mt-4"> <!-- Correo electrónico --> <label for="email" class="font-semibold">Correo electrónico:</label> <input type="email" name="email" id="email" class="border-1 border-neutral-800 rounded-2xl outline-none px-2 py-1 text-sm sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%]" autocomplete="email" required> <!-- Contraseña --> <label for="password" class="mt-4 font-semibold">Contraseña:</label> <div class="flex items-center gap-x-2 sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%]"> <input type="password" name="password" id="password" class="border-1 border-neutral-800 rounded-2xl outline-none px-2 py-1 text-sm w-full" autocomplete="new-password" required> <!-- Ver la contraseña contraseña --> <input type="checkbox" onclick="password.type = this.checked ? 'text' : 'password'"> </div> <!-- Enviar el formulario --> <button type="submit" class="bg-green-600 w-auto p-1 font-bold border-none rounded-2xl mt-4">Registrarse</button> </form> <!-- Mensaje de confirmación --> <p class="text-black text-sm font-semibold text-center mt-2">
*Revise su email para verificar su cuenta
</p> <!-- Botón de inicio de sesión --> <p class="text-md font-semibold mt-2 text-center">
Ya tienes una cuenta? <a href="/signin" class="text-green-600">Iniciar sesión</a> </p> </main> ` })}`;
}, "C:/Users/marti/Desktop/finanzas-personales/src/pages/register.astro", void 0);

const $$file = "C:/Users/marti/Desktop/finanzas-personales/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
