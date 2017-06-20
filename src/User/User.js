import v from 'yup';
import bcrypt from 'bcrypt-node';
import uuid from 'uuid/v1';

const schema = v.object().shape({
    email : v.string().email().required(),
});

const fields = [
    "id", 
    "email", 
    "hash", 
    "lastAuth", 
    "deleted", 
    "firstName", 
    "lastName", 
    "token", 
    "state"
];

class User {
    constructor(record) {
        if(record) this.fromData(record);
    }
    fromData(data) {
        Object.keys(data).forEach((key) => {
            if(fields.includes(key)){
                this[key] = data[key];
            }
        });
    }
    exists() {
        return (this.id);
    }
    isValid() {
        return schema.isValid(this);
    }
    setPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, (err, hash) => {
                if(err) reject(err);
                this.hash = hash;
                resolve(this);
            })
        })
    }
    checkPassword(submitted) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(submitted, this.hash, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
    generateResetToken() {
        this.token = uuid();
        return Promise.resolve(this);
    }
    toObject() {
        let userObject = {};
        ["id", "email", "firstName", "lastName"].forEach((key) => {
            return userObject[key] = this[key];
        })
        return userObject;
    }
}

export default User;