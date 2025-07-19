import * as services from '../services/price.js';
export const getPrices = async (req, res) => {
    try {
        const response = await services.getPriceService();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail at price controller',
            data: error
        });
    }
}