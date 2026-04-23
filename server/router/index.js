var Router = require("router");
var router = Router();
var Controller = require("../controller/controller.js");

router.get("/", Controller.welcomeMessage);
router.get("/getUsersInfo", Controller.getUsersInfo);
router.get('/getRegisteredUsers',Controller.getRegisteredUsers);
router.post('/register',Controller.registerEmail);
router.post('/authenticate',Controller.authenticateEmail);
router.post("/saveUserResult",Controller.post);
router.get('/exportToCsv', Controller.exportToExcel);
module.exports = router;
