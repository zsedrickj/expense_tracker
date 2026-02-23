export const fetchHorizontalData = async () => {
  const res = await fetch("/api/transactions/reports/horizontalchart", {
    method: "GET",
    credentials: "include", // important for JWT cookie
  });

  if (!res.ok) {
    throw new Error("Failed to fetch monthly report");
  }

  return res.json();
};
