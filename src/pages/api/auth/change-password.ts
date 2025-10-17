import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const oldPassword = formData.get("old_password")?.toString();
  const newPassword = formData.get("new_password")?.toString();
  const confirmPassword = formData.get("confirm_password")?.toString();

  if (newPassword !== confirmPassword) {
    return new Response("Las nuevas contraseñas no coinciden", { status: 400 });
  }

  if (!newPassword) {
    return new Response("La nueva contraseña no puede estar vacía", { status: 400 });
  }

  const { data, error } = await supabase.auth.updateUser({ password: newPassword })

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard");
};
