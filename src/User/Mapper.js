class UserDataMapper {
    constructor(storageDriver) {
        this.driver = storageDriver;
        this.context = 'user';
    }
    save(user) {
        if(isNaN(user.id)) {
            return this.driver.create(this.context, user)
        } else {
            return this.driver.update(this.context, user);
        }
    }
    delete(user) {
        if(!isNaN(user.id)) {
            return this.driver.delete(this.context, user);
        }
    }
}

export default UserDataMapper;