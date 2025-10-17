import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("No hay usuario autenticado", { status: 401 });
  }

  const { error } = await supabase.rpc('delete_user_data');

  if (error) {
    console.error('Error deleting user data:', error);
    return new Response("Error al eliminar los datos del usuario", { status: 500 });
  }

  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    console.error('Error signing out:', signOutError);
  }

  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });


  return redirect("/");
};
