const checkSuperAdmin = (req, res, next) => {
    console.log(req.session.User);
    if (req.session.User.role === 'super-admin') {
        res.status(201).send("success");
    }
    else {
        res.status(401).send("needs to be super admin");
    }
};

module.exports = checkSuperAdmin;