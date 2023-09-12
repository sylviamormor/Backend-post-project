const { 
    addUser, 
    findUserByEmail, 
    getAllUsers,
    getSingleUser,
    updateUserById
} = require('../queries/users');

const { runQuery } = require('../config/database.config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env/index')


/**
 * Create new user
 */
const createUser = async (body) => {
    const { password, name, email } = body
    // Check if user already exist in db
    const userExist = await runQuery(findUserByEmail, [email])
    if (userExist.length > 0) {
        throw {
            code: 409,
            message: 'User already exists',
            data: null,
            status: 'error'
        }
    }

    // Encrypt password
    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(addUser, [name, email, hash, "user"])

    return {
        code: 201,
        status: 'success',
        message: 'New user added successfully',
        data: response[0]
    }
}

const loginUser = async (body) => {
    const { email, password } = body;

    // Check if that user exists inside the db
    const user = await runQuery(findUserByEmail, [email]);
    if (user.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        }
    }
    // Compare user passwords
    const { password: dbPassword, role, name, id } = user[0];
    console.log(user[0])
    const userPassword = bcrypt.compareSync(password, dbPassword); // Boolean true/false
    if (!userPassword) {
        throw {
            code: 400,
            status: 'error',
            message: 'Wrong email and password combination',
            data: null
        }
    }

    const options = {
        'expiresIn': '1d'
    }

    // Generate token for authentication purposes
    const token = jwt.sign({
        id,
        name,
        email,
        role
    }, config.JWT_SECRET_KEY, options);
    return {
        status: 'success',
        message: 'User login successfully',
        code: 200,
        data: {
            id,
            name,
            email,
            role,
            token
        }
    }
}

// Get all books

const retrieveAllUsers = async () => {
    const data = await runQuery(getAllUsers);
    return {
        code: 200,
        status: 'success',
        message: 'Users fetched successfully',
        data
    }
}

const retrieveSingleUser = async (id) => {
    const result = await runQuery(getSingleUser, [id]);
    return {
        code: 200,
        status: 'success',
        message: 'Single user fetched successfully',
        data: result[0]
    }
}

const updateUser = async (id, body) => {
    const { name, email } = body;

    // Check if user exists
    const existingUser = await runQuery(getSingleUser, [id]);
    if (!existingUser || existingUser.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        };
    }

    // Attempt to update the user
    try {
        const result = await runQuery(updateUserById, [name, email, id]);

        return {
            code: 200,
            status: 'success',
            message: 'User updated successfully',
            data: result[0]
        };
    } catch (error) {
        // Handle any errors that occurred during the update
        throw {
            code: 500,
            status: 'error',
            message: 'Failed to update user',
            data: null
        };
    }
}



module.exports = {
    createUser,
    loginUser,
    retrieveAllUsers,
    retrieveSingleUser,
    updateUser
}