// Importación de Day.js
import dayjs from "dayjs";
import { supabase } from "../../lib/supabase";

// Saber que día es hoy
const today = dayjs().format("YYYY-MM-DD");
//const DayOfWeek = dayjs().format("dddd");

// Datos del formulario
export const POST = async ({ request, redirect }) => {
  // Obtener los datos del formulario
  const formData = await request.formData();
  const type = formData.get("type");
  const amount = formData.get("amount");
  const category = formData.get("category");
  const description = formData.get("description");

  // Recoher el user_id de la sesión
  const { user } = await supabase.auth.getUser();

  // Crear objeto con datos del formulario
  const transaction = {
    user_id: user,
    type,
    amount,
    category,
    description,
    date: today,
  };

  // Subir los datos a Supabase
  const { error } = await supabase.from("transactions").insert(transaction);

  if (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
  
  console.log("Se ha conseguido guardar la transacción chaval");
  return redirect("/");
};
