import { register } from "@/instrumention";
import LoginForm from "./login/page";

export default function Home() {
  if (typeof window === "undefined") {
    // Run MongoDB connection once
    register().catch(console.error);
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
}
