import { redirect } from "next/navigation";

export default function RedirectPage() {
  // This will redirect the user to the home page
  redirect("/");

  // This content will never be shown due to the redirect
  return (
    <div>
      <h1>Redirect Page</h1>
      <p>This content will not be displayed because of the redirect.</p>
    </div>
  );
}
