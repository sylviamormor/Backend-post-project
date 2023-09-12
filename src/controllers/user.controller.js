const UserService = require('../services/user.service');

/**
 * Controller creating a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns JSON object as response data
 */
const createUser = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response)
    } catch (error) {
        next(error)
    }
}

/**
 * Controller for login user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const signInUser = async (req, res, next) => {
    try {
        const result = await UserService.loginUser(req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        next(error)
    }
}

const fetchAllUsers = async (req, res, next) => {
    try {
        const result = await UserService.retrieveAllUsers();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const fetchSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await UserService.retrieveSingleUser(id);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const updateUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await UserService.updateUser(id, req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    signInUser,
    fetchAllUsers,
    fetchSingleUser,
    updateUsers
}