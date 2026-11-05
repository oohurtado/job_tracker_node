-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(50) NOT NULL,
    "answer" VARCHAR(250),
    "notes" VARCHAR(250),
    "job_event_id" INTEGER NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestion_job_event_id_key" ON "InterviewQuestion"("job_event_id");

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_job_event_id_fkey" FOREIGN KEY ("job_event_id") REFERENCES "JobEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
