-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" SERIAL NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birth_state" VARCHAR(50) NOT NULL,
    "birth_country" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "position_name" VARCHAR(100),
    "work_model" VARCHAR(10),
    "source_detail" TEXT,
    "source_type" VARCHAR(50),
    "notes" TEXT,
    "salary_min" DECIMAL(65,30),
    "salary_max" DECIMAL(65,30),
    "salary_currency" VARCHAR(10),
    "salary_period" VARCHAR(10),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobEvent" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(25) NOT NULL,
    "notes" VARCHAR(250),
    "event_at" TIMESTAMP(3),
    "job_id" INTEGER NOT NULL,

    CONSTRAINT "JobEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_user_id_key" ON "PersonalInformation"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Job_user_id_key" ON "Job"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "JobEvent_job_id_key" ON "JobEvent"("job_id");

-- AddForeignKey
ALTER TABLE "PersonalInformation" ADD CONSTRAINT "PersonalInformation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobEvent" ADD CONSTRAINT "JobEvent_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
