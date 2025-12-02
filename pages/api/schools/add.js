import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, address, city, state, contact, image, email_id } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to add school" });
  }
}
