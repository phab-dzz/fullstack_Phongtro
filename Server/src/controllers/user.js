import * as services from '../services/user.js';

export const getCurrent= async (req, res) => {
    try {
        const { id } = req.user;
        const response = await services.getOne(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get current user',
            error
        });
    }

};
export const updateUser = async (req, res) => {
    try{
        const data = req.body;
        const { id } = req.user;
        console.log('Update user data:', data , 'User ID:', id);
        const response = await services.updateUser(data,id);
        return res.status(200).json(response);

    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to update user',
            error
        });
    }
};