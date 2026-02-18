export const fetchMonthlyReport = async () => {
  const res = await fetch("/api/transactions/reports/barchart", {
    method: "GET",
    credentials: "include", // important for JWT cookie
  });

  if (!res.ok) {
    throw new Error("Failed to fetch monthly report");
  }

  return res.json();
};
