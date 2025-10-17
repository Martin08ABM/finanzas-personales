// Importación de Day.js
import dayjs from "dayjs";
import { supabase } from "../../lib/supabase";

// Saber que día es hoy
const today = dayjs().format("YYYY-MM-DD");

// GET: devolver transacciones del usuario autenticado
export const GET = async ({ request }) => {
  // Obtener usuario desde supabase (usa cookies/headers del request automáticamente)
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

// Datos del formulario
export const POST = async ({ request }) => {
  // Obtener los datos del formulario
  const formData = await request.formData();
  const type = formData.get("type");
  const amount = parseFloat(formData.get("amount")) || 0;
  const category = formData.get("category");
  const description = formData.get("description");

  // Recoger el user_id de la sesión
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }

  // Crear objeto con datos del formulario
  const transaction = {
    user_id: user.id,
    type,
    amount,
    category,
    description,
    created_at: new Date().toISOString(),
  };

  // Subir los datos a Supabase
  const { data, error } = await supabase.from("transactions").insert(transaction).select();

  if (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  console.log("Se ha conseguido guardar la transacción");
  return new Response(JSON.stringify(data[0] || {}), { status: 201 });
};
