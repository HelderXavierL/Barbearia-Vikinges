// =============================================
// Barbearia Vikings — Shared Constants: Booking
// =============================================

/** Duração padrão de cada atendimento em minutos */
export const SLOT_DURATION_MINUTES = 35;

/** Máximo de dias no futuro que um cliente pode agendar */
export const MAX_ADVANCE_DAYS = 30;

/** Horas mínimas de antecedência para cancelamento */
export const MIN_CANCEL_HOURS = 2;

/** Quantidade mínima de visitas para ser considerado recorrente */
export const RECURRING_THRESHOLD = 3;

/** Buffer em minutos entre atendimentos (0 = slots consecutivos) */
export const SLOT_BUFFER_MINUTES = 0;
