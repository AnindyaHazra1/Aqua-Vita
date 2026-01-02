const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Helper to read users
const getUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath);
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

// Helper to write users
const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Helper to find user
const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(u => u.email === email);
};

const findUserById = (id) => {
    const users = getUsers();
    return users.find(u => u.id === id);
};

// Helper to update user
const updateUserById = (id, updates) => {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        return users[index];
    }
    return null;
};

module.exports = {
    getUsers,
    saveUser,
    findUserByEmail,
    findUserById,
    updateUserById,
    usersFilePath // export path for checking
};
