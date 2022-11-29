class UserStorage {
    static #users = {
        id: ["이순신", "홍길동"],
        pw: ["1234", "1234"],
        name: ["user1", "user2"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;