import * as services from '../services/province';
 export const getProvinces=async (req, res) => {
    try{
        const response = await services.getProvincesService();
        return res.status(200).json(response);

    }
    catch(error){
       return res.status(500).json({
            msg: 'Internal Server Error' +error,
            err: -1
        });
    }
}