import { InterviewQuestionEntity } from "./interview-question-entity";

export class JobEventEntity {

    public interviewQuestions?: InterviewQuestionEntity[];

    constructor(
        public readonly id: number,
        public readonly status: string,
        public readonly notes: string | null,
        public readonly eventAt: Date | null,
        public readonly jobId: number
    ) { }

}