import { z } from "zod";
import { SortOrderEnum } from "../../../domain/enums/sort-order-enum";
import { JobSortByEnum } from "../../../domain/enums/job-sort-by-enum";

export const getPaginatedJobsSchema = z.object({
    userId: z.coerce.number()
        .int("El ID del usuario debe ser un entero")
        .positive("El ID del usuario no es válido"),

    pageNumber: z.coerce.number()
        .int("El número de página debe ser un entero")
        .positive("El número de página debe ser mayor a cero"),

    pageSize: z.coerce.number()
        .int("El tamaño de página debe ser un entero")
        .positive("El tamaño de página debe ser mayor a cero")
        .max(100, "El tamaño máximo de página es 100"),

    sortBy: z.enum(JobSortByEnum),

    sortOrder: z.enum(SortOrderEnum)
});
