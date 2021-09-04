import express from 'express';
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from '../controllers/user';
import advancedResult from '../middlewares/advancedResult';
import { authorizeRole, authRoute, UserRole } from '../middlewares/authRoute';
import User from '../models/User';

const router = express.Router();
router.use(authRoute);
router.use(authorizeRole(UserRole.ADMIN));

router.get('/', advancedResult(User), getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
