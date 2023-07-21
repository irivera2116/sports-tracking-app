const router = require('express').Router();
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const { Socket } = require('socket.io');

router.use('/users', userRoutes);
//router.use('/rooms', roomRoutes);
//router.use('/socket',socketRoutes);

module.exports = router;
