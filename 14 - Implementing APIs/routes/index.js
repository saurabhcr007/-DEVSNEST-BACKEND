var express = require('express');
var router = express.Router();
var registerInitialCheck = require('../middlewares/registerChecks')
var { register, registerSuperAdmin } = require('../controllers/register');
var checkSuperAdmin = require('../middlewares/checkSuperAdmin');

/* GET home page. */
router.get('/', function (req, res, next) {
  const sess = req.session;
  sess.username = "Nikhil";
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  console.log("redis ", req.session.username);
  res.render('index', { title: 'Express' });
});

router.post('/register', registerInitialCheck, register);
router.post('/register-super-admin', registerInitialCheck, registerSuperAdmin);
router.get('/super', checkSuperAdmin);

module.exports = router;
