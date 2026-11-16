import { Router } from "express";
import { authorize, tokenService, jobEventController } from "../../container";
import { authenticateJwt } from "../middlewares/authenticate-jwt";
import { RoleEnum } from "../../domain/enums/role-enum";

const router = Router();

router.post("/job-events/:jobId", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobEventController.createJobEvent(req, res, next);
});

router.put("/job-events/:jobId/:jobEventId", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobEventController.updateJobEvent(req, res, next);
});

router.get("/job-events/:jobId/:jobEventId", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobEventController.getJobEvent(req, res, next);
});

router.get("/job-events/:jobId", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobEventController.getAllJobEvent(req, res, next);
});

router.delete("/job-events/:jobId/:jobEventId", authenticateJwt(tokenService), authorize(RoleEnum.USER), (req, res, next) => {
    void jobEventController.deleteJobEvent(req, res, next);
});

export default router;