import express from 'express'
import { getNewMail, viewMail } from './application.controller.js';
const applicationRouter = express.Router();

applicationRouter.get('/getnewmail/:studentId', getNewMail);
applicationRouter.post('/viewmessage', viewMail);

export default applicationRouter;