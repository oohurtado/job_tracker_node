import { JobEventEntity } from "./job-event-entity";

export class JobEntity {

    public jobEvents?: JobEventEntity[];

    constructor(
        public readonly id: number,
        public readonly companyName: string,
        public readonly positionName: string | null,
        public readonly workModel: string | null,
        public readonly sourceDetail: string | null,
        public readonly sourceType: string | null,
        public readonly notes: string | null,
        public readonly salaryMin: number,
        public readonly salaryMax: number | null,
        public readonly salaryCurrency: string | null,
        public readonly salaryPeriod: string | null,
        public readonly userId: number
    ) { }

}