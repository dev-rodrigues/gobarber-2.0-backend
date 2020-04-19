import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/Users';
import uploadConfig from '../config/upload';

interface Request {
    user_id: string;
    avatar_file_name: string;
}

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatar_file_name,
    }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar');
        }

        // Deletar avata anteriror
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatar_file_name;
        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
