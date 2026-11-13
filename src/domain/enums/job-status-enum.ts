export enum JobStatusEnum {
    SAVED = "saved",                 // Vacante guardada para aplicar posteriormente.
    APPLIED = "applied",             // Solicitud enviada a la empresa.
    IN_REVIEW = "in_review",         // La empresa está revisando la solicitud.
    CONTACTED = "contacted",         // La empresa se puso en contacto con el candidato.
    INTERVIEWING = "interviewing",   // El candidato está participando en entrevistas.
    ASSESSMENT = "assessment",       // El candidato está realizando una prueba técnica, evaluación o examen.
    OFFER = "offer",                 // La empresa realizó una oferta laboral.
    ACCEPTED = "accepted",           // El candidato aceptó la oferta laboral.
    REJECTED = "rejected",           // La empresa rechazó al candidato.
    DECLINED = "declined",           // El candidato rechazó la oferta laboral.
    NO_RESPONSE = "no_response",     // No se recibió respuesta de la empresa después de aplicar.
    CLOSED = "closed"                // El proceso de selección terminó o la vacante fue cerrada.
}

export enum JobStatusCreateEnum {
    SAVED = "saved",                 // Vacante guardada para aplicar posteriormente.
    APPLIED = "applied",             // Solicitud enviada a la empresa.
    CONTACTED = "contacted",         // La empresa se puso en contacto con el candidato.
}
