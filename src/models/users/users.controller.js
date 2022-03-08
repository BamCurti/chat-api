const User = require("./users.model");

const UserController = {
    getAll(req, res) {
        const users = new User();
        users.getAll().then(results => {
            res.send(results);
        });
    }
}

module.exports = UserController;