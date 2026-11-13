import { Router } from "express";
import { authorize, tokenService, jobController } from "../../container";
import { authenticateJwt } from "../middlewares/authenticate-jwt";

const router = Router();

router.post("/jobs", (req, res, next) => {
    void jobController.createJob(req, res, next);
});

router.put("/jobs", authenticateJwt(tokenService), (req, res, next) => {
    void jobController.updateJob(req, res, next);
});

router.get("/jobs/:id", (req, res, next) => {
    void jobController.getJob(req, res, next);
});

router.get("/jobs/paginated/:pageNumber/:pageSize/:sortBy/:sortOrder", (req, res, next) => {
    void jobController.getPaginatedJob(req, res, next);
});

router.get("/jobs/stats/status", (req, res, next) => {
    void jobController.getStatsJobStatus(req, res, next);
});

router.get("/jobs/stats/work-model", (req, res, next) => {
    void jobController.getStatsJobWorkModel(req, res, next);
});

router.delete("/jobs", (req, res, next) => {
    void jobController.deleteJob(req, res, next);
});

export default router;