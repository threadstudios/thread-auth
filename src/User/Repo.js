class UserRepository {
    constructor(storageDriver) {
        this.driver = storageDriver;
        this.context = 'user';
    }
    query(params) {
        return this.driver.query(this.context, params)
    }
    getAll() {
        return this.driver.getAll(this.context)
    }
    getById(id) {
        return this.query([
            { type : '=', field : 'id', value : id }
        ])
    }
    getByEmail(email) {
        return this.query([
            { type : '=', field : 'email', value : email }
        ])
    }
    getByToken(token) {
        return this.query([
            { type: '=', field : 'token', value: token }
        ])
    }
}

export default UserRepository