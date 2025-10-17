import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUtYkpRA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BEeywYFk.mjs';
export { renderers } from '../renderers.mjs';

const $$AddTransactionForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dinario - A\xF1adir transacci\xF3n" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col px-4 py-2"> <h1 class="text-xl text-black font-bold">Añadir transacción</h1> <form action="/api/transactions" method="post" class="flex flex-col px-2 py-2"> <!-- Tipo de transacción (ingreso o gasto) --> <label for="type" class="font-semibold text-black text-lg">Tipo de transacción:</label> <select name="type" id="type" class="max-w-40 border-2 border-black rounded-2xl px-2 py-2 outline-none" required> <option value="income" class="font-semibold text-black text-lg bg-green-600">Ingreso</option> <option value="spent" class="font-semibold text-black text-lg bg-red-500">Gasto</option> </select> <!-- Cantidad de dinero --> <label for="amount" class="font-semibold text-black text-lg mt-4">Cantidad de dinero:</label> <input type="number" name="amount" id="amount" class="max-w-60 border-2 border-black rounded-2xl px-2 py-2 outline-none" placeholder="0.00 €" required> <!-- Categoría de la transacción --> <label class="font-semibold text-black text-lg mt-4">Categoría:</label> <div class="flex flex-col md:flex-row md:space-x-4"> <div class="flex flex-col"> <p class="font-normal text-black text-md">Ingresos:</p> <select name="category" id="category" class="mt-1 border-2 border-black rounded-2xl px-2 py-2"> <option value="">---</option> <option value="salary">Salario</option> <option value="freelance">Freelance o trabajo extra</option> <option value="investments">Inversiones</option> <option value="sale">Ventas</option> <option value="present">Regalos y presentes</option> <option value="refund">Devoluciones</option> <option value="donations">Donaciones</option> <option value="other">Otros</option> </select> </div> <div class="flex flex-col mt-4 md:mt-0"> <p class="font-normal text-black text-md">Gastos:</p> <select name="category" id="category" class="mt-1 border-2 border-black rounded-2xl px-2 py-2"> <option value="">---</option> <option value="alimentation">Alimentación</option> <option value="transport">Transporte</option> <option value="apartment">Vivienda</option> <option value="entertainment">Entretenimiento</option> <option value="health">Salud</option> <option value="education">Educación</option> <option value="clothing">Ropa y belleza</option> <option value="pets">Mascotas</option> <option value="technology">Tecnología</option> <option value="travels">Viajes</option> <option value="donations">Donaciones</option> <option value="other">Otros</option> </select> </div> </div> <!-- Descripción de la transacción --> <label for="description" class="font-semibold text-black text-lg mt-4">Descripción:</label> <textarea name="description" id="description" class="md:w-[80%] lg:w-[70%] w-60% border-2 border-black rounded-2xl px-2 py-2 outline-none" placeholder="Descripción de la transacción" required></textarea> <!-- Botón de guardar --> <button type="submit" class="mt-4 self-start rounded-xl bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Guardar</button> </form> </main> ` })}`;
}, "C:/Users/marti/Desktop/finanzas-personales/src/pages/AddTransactionForm.astro", void 0);

const $$file = "C:/Users/marti/Desktop/finanzas-personales/src/pages/AddTransactionForm.astro";
const $$url = "/AddTransactionForm";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AddTransactionForm,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
