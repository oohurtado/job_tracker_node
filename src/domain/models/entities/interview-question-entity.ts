export class InterviewQuestionEntity {

    constructor(
        public readonly id: number,
        public readonly question: string,
        public readonly answer: string | null,
        public readonly notes: string | null,
        public readonly jobEventId: number
    ) { }

}