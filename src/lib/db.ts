import { Pool, PoolConfig } from 'pg';

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  min: parseInt(process.env.DB_POOL_MIN || '2', 10),
  max: parseInt(process.env.DB_POOL_MAX || '10', 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool(poolConfig);

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function queryOne<T>(text: string, params?: unknown[]): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] || null;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export const sql = {
  vendors: {
    findAll: `
      SELECT * FROM vendors
      ORDER BY risk_level DESC, security_score ASC
    `,
    findById: `
      SELECT * FROM vendors WHERE id = $1
    `,
    create: `
      INSERT INTO vendors (
        name, service_type, security_score, compliance_certifications,
        risk_level, last_assessment_date, next_assessment_date,
        assessment_status, contact_email, contract_end_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `,
    update: `
      UPDATE vendors SET
        name = $2, service_type = $3, security_score = $4,
        compliance_certifications = $5, risk_level = $6,
        last_assessment_date = $7, next_assessment_date = $8,
        assessment_status = $9, contact_email = $10,
        contract_end_date = $11, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    delete: `
      DELETE FROM vendors WHERE id = $1
    `,
    getSummary: `
      SELECT
        COUNT(*) as total_vendors,
        COUNT(*) FILTER (WHERE risk_level = 'High') as high_risk_count,
        COUNT(*) FILTER (WHERE risk_level = 'Medium') as medium_risk_count,
        COUNT(*) FILTER (WHERE risk_level = 'Low') as low_risk_count,
        COUNT(*) FILTER (WHERE assessment_status = 'Pending') as pending_assessments,
        COUNT(*) FILTER (WHERE assessment_status = 'Overdue') as overdue_assessments,
        ROUND(AVG(security_score), 1) as average_security_score
      FROM vendors
    `,
  },
};
