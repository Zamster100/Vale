import type { QuoteRequest } from "@/lib/adminData";

export interface QuoteRequestRow {
  id: string;
  fd_id: string;
  fd_name: string;
  family_name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: string;
  created_at: string;
}

export function mapQuoteRequestRow(row: QuoteRequestRow): QuoteRequest {
  return {
    id: row.id,
    fdId: row.fd_id,
    fdName: row.fd_name,
    familyName: row.family_name,
    email: row.email,
    phone: row.phone,
    serviceType: row.service_type,
    message: row.message,
    status: row.status as QuoteRequest["status"],
    createdAt: row.created_at,
  };
}
