import DbConnection from "@/lib/mongodb";

export async function register() {
  try {
    await DbConnection();
    console.log("✅ MongoDB connected (instrumentation)");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}
