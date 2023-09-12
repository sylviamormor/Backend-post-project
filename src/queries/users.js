/**
 * Add New User
 */
const addUser = `
  INSERT INTO users(
    names,
    email,
    password,
    role
  )
  VALUES ($1,$2,$3,$4) RETURNING id, names, email, role, created_at
`;

const findUserByEmail = `
 SELECT id, names, email, role, password FROM users 
 WHERE email=$1
`;

const getAllUsers = `
        SELECT * FROM users
`
const getSingleUser = `
        SELECT id, names, email, role
        FROM books WHERE id=$1
`;

const updateUserById = `
        UPDATE users
        SET names = $1, email = $2
        WHERE id = $3
        RETURNING id, names, email, role
`;
module.exports = {
    addUser,
    findUserByEmail,
    getAllUsers,
    getSingleUser,
    updateUserById
}