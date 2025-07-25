import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                phone,
                name,
                password: hashPassword(password),
                id: v4()
            }
        })
        console.log(response)
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        console.log("token", token)
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is successfully !' : 'Phone number has been aldready used !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})
export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)
        console.log("isCorrectPassword", isCorrectPassword)
        const token = isCorrectPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully !' : response ? 'Password is wrong !' : 'Phone number not found !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})
export const changePasswordService = ({ phone, password, newPassword }) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({ where: { phone } });
        if (!user) {
            return resolve({ err: 1, msg: 'User not found' });
        }
        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {
            return resolve({ err: 2, msg: 'Current password is incorrect' });
        }
        user.password = hashPassword(newPassword);
        await user.save();
        resolve({ err: 0, msg: 'Password changed successfully' });
    } catch (error) {
        reject(error);
    }
});