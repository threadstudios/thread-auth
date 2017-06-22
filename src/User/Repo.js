class UserRepository {
    constructor(storageDriver) {
        this.driver = storageDriver;
        this.context = 'user';
    }
    getBy(field, value) {
        return this.driver.getBy(this.context, field, value)
    }
    getAll() {
        return this.driver.getAll(this.context)
    }
    getById(id) {
        return this.getBy('id', id);
    }
    getByEmail(email) {
        return this.getBy('email', email);
    }
    getByToken(token) {
        return this.getBy('token', token);
    }
}

export default UserRepository