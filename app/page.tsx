import { register } from "@/instrumention";

export default function Home() {
  if (typeof window === "undefined") {
    // Run MongoDB connection once
    register().catch(console.error);
  }

  return <main></main>;
}
