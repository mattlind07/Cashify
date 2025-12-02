// /api/testdb.js
import { q } from "./shared/db.js";

export default async function handler(req, res) {
  try {
    const r = await q("SELECT 1 AS ok");
    res.status(200).json(r[0]); // { ok: 1 }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
