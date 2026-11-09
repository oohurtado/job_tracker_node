import { Router } from "express";
import { authorize, tokenService, userController } from "../../container";
import { authenticateJwt } from "../middlewares/authenticate-jwt";

const router = Router();

router.post("/users/register", (req, res, next) => {
    void userController.register(req, res, next);
});

router.post("/users/authenticate", (req, res, next) => {
    void userController.authenticate(req, res, next);
});

router.get("/users", authenticateJwt(tokenService), authorize("admin"), (req, res, next) => {
    void userController.getPaginated(req, res, next);
});

router.put("/users/password", authenticateJwt(tokenService), (req, res, next) => {
    void userController.changePassword(req, res, next);
});

router.put("/users/forgot-password-1", (req, res, next) => {
    void userController.forgotPasswordStep1(req, res, next);
});

router.put("/users/forgot-password-2", (req, res, next) => {
    void userController.forgotPasswordStep2(req, res, next);
});

router.get("/users/me", authenticateJwt(tokenService), (req, res, next) => {
    void userController.getMe(req, res, next);
});

router.get("/users/personal-information", authenticateJwt(tokenService), (req, res, next) => {
    void userController.getUserPersonalInformation(req, res, next);
});

router.put("/users/personal-information", authenticateJwt(tokenService), (req, res, next) => {
    void userController.updateUserPersonalInformation(req, res, next);
});

router.delete("/users/personal-information", authenticateJwt(tokenService), (req, res, next) => {
    void userController.deleteUserPersonalInformation(req, res, next);
});

export default router;