import { Router } from "express";
import { authorize, tokenService, jobController } from "../../container";
import { authenticateJwt } from "../middlewares/authenticate-jwt";
import { RoleEnum } from "../../domain/enums/role-enum";

const router = Router();

router.post("/jobs", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.createJob(req, res, next);
});

router.put("/jobs/:id", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.updateJob(req, res, next);
});

router.get("/jobs/:id", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.getJob(req, res, next);
});

router.get("/jobs/paginated/:pageNumber/:pageSize/:sortBy/:sortOrder", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.getPaginatedJob(req, res, next);
});

router.get("/jobs/stats/status", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.getStatsJobStatus(req, res, next);
});

router.get("/jobs/stats/work-model", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.getStatsJobWorkModel(req, res, next);
});

router.delete("/jobs/:id", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobController.deleteJob(req, res, next);
});

export default router;