export interface Matche {
  lieux: any
  id: number
  competition_id: number
  equipe1_id: number
  equipe2_id: number
  score_equipe1?: number | null
  score_equipe2?: number | null
  date_matche: string // ISO date format, e.g., "2023-12-31"
  statut: 'en_attente' | 'termine' | 'annule'
  buteurs?: any[] | null // Array to represent JSON data
  passeurs?: any[] | null
  homme_du_matche?: number | null // Nullable foreign key
  cartons?: any[] | null
  resultat: 'gagne' | 'nul' | 'perdu'
  created_at?: string // Optional, timestamp
  updated_at?: string // Optional, timestamp
}
