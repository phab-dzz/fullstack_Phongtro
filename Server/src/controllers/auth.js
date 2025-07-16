import * as authService from '../services/auth';

export const register = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        console.log(req.body);
        if (!name || !phone || !password) {
            return res.status(400).json({
                err: -1,
                message: 'name, phone and password are required'
            });
        }
        const response = await authService.registerService(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'fail at register', error
        });
    }
}
export const login = async (req, res) => {
    const { phone, password } = req.body;
    try {

        if (!phone || !password) {
            return res.status(400).json({
                err: -1,
                message: ' phone and password are required'
            });
        }
        const response = await authService.loginService(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'fail at login', error
        });
    }
}
export const changePassword = async (req, res) => {
    const { phone, password, newPassword } = req.body;
    try {
        if (!phone || !password || !newPassword) {
            return res.status(400).json({
                err: -1,
                message: 'phone, password and newPassword are required'
            });
        }
        const response = await authService.changePasswordService(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'fail at change password', error
        });
    }
}