export async function forgotPasswordRequest(email: string) {
  const res = await fetch("/api/user/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}
