import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT id, name, address, city, image FROM schools ORDER BY created_at DESC"
    );
    res.status(200).json({ success: true, schools: rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
}
