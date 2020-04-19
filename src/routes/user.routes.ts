import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const service = new CreateUserService();
        const user = await service.execute({ name, email, password });

        delete user.password;

        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

userRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (req, res) => {
        try {
            const service = new UpdateUserAvatarService();
            const user = await service.execute({
                avatar_file_name: req.file.filename,
                user_id: req.user.id,
            });
            delete user.password;
            return res.json({ user });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
);

export default userRouter;
