const { serializeUser } = require('passport');
const { userAuth, userRegister, userLogin, checkRole } = require('../utils/Auth');

const router = require('express').Router();


router.post('/register-user', async (req, res) => {
    console.log(req.body);
    await userRegister(req.body, "user", res);
});

router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, "admin", res);
});

router.post('/register-super-admin', async (req, res) => {
    await userRegister(req.body, "superadmin", res);
});

router.post('/login-user', async (req, res) => {
    await userLogin(req.body, "user", res);
});

router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, "admin", res);
});

router.post('/login-super-admin', async (req, res) => {
    await userLogin(req.body, "superadmin", res);
});

router.get('/profile', userAuth, async (req, res) => {
    return res.json(serializeUser(req.user));
});


router.get(
    "/user-protected",
    userAuth,
    checkRole(["user"]),
    async (req, res) => {
        return res.json("hello user");
    }
);

router.get(
    "/admin-protected",
    userAuth,
    checkRole(["admin"]),
    async (req, res) => {
        return res.json("Hello Admin");
    }
);

router.get(
    "/super-admin-protected",
    userAuth,
    checkRole(["superadmin"]),
    async (req, res) => {
        return res.json("Hello Super Admin");
    }
);

module.exports = router;
