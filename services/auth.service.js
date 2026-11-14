const jwt = require("jsonwebtoken");

const { getPool } = require("../config/db");

const decodeTokenService = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const getActiveUserService = async (userId) => {
  const pool = getPool();

  if (!pool) {
    return null;
  }

  const result = await pool.query(
    `SELECT
       user_id,
       first_name,
       last_name,
       email,
       user_role_type_id
     FROM s_user
     WHERE user_id = $1
       AND is_active = 1
       AND discontinued_at IS NULL
       AND (valid_from_date IS NULL OR valid_from_date <= CURRENT_DATE)
       AND (valid_to_date IS NULL OR valid_to_date >= CURRENT_DATE)
     LIMIT 1`,
    [userId],
  );

  return result.rows[0] || null;
};

module.exports = {
  decodeTokenService,
  getActiveUserService,
};
