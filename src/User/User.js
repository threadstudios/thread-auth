import v from 'yup';
import bcrypt from 'bcrypt-node';
import uuid from 'uuid/v1';
import { Model } from 'thread-utils';

const schema = v.object().shape({
    email : v.string().email().required(),
});

class User extends Model {
    static fields = ["email", "hash", "lastAuth", "deleted", "firstName", "lastName", "token", "state"];
    constructor() {
        super(User);
    }
    exists() {
        return (this.getId());
    }
    isValid() {
        return schema.isValid(this.get());
    }
    setPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, (err, hash) => {
                if(err) reject(err);
                this.set({hash : hash});
                resolve(this);
            })
        })
    }
    checkPassword(submitted) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(submitted, this.get('hash'), (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
    generateResetToken() {
        this.set({token : uuid()});
        return Promise.resolve(this);
    }
}

export default User;