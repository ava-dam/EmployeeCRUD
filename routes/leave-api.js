var express = require('express');
var router = express.Router();
var ctrlLeave = require('../controllers/leave-controller');

router.post('/add-leave', ctrlLeave.addLeave);
router.post('/edit-leave', ctrlLeave.editLeave);
router.get('/:id', ctrlLeave.getLeaveData);
router.get('/', ctrlLeave.getAll);

module.exports = router;