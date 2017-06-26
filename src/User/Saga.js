import User from './User';

export function register(userData, password, userRepository, userMapper) {

    const user = User.create(userData);

    return Promise.all([
        user.isValid(),
        userRepository.getByEmail(user.get('email')),
        user.setPassword(password)
    ]).then((results) => {
        const [ valid, existingUser, userHash ] = results;
        if(valid && !existingUser.state && userHash) {
            return userMapper.save(user);
        } else {
            return Promise.reject({
                code : 'USR001', 
                message : 'User is not valid', 
                results : {valid : valid, existingUser : (existingUser.id)}
            })
        }
    })
    .then((saveResult) => {
        return Promise.resolve(saveResult.record);
    })
    .catch((err) => {
        return Promise.reject({
            code : 'USR002', 
            message : 'User could not be saved', 
            core : err
        });
    })

}

export function completeReset(token, newPassword, userRepo, userMapper) {
    return userRepo.getByToken(token)
    .then((results) => {
        if(!results.length) {
            return Promise.reject({
                code: 'USR006',
                message: 'This token is invalid or has expired'
            })
        }
        const [ userData ] = results;
        const user = User.create(userData)
        return user.setPassword(newPassword)
    })
    .then((user) => {
        return userMapper.save(user);
    }).then((saveResult) => {
        return Promise.resolve(saveResult.record);
    })
}

export function initiateReset(email, userRepo, userMapper) {
    return userRepo.getByEmail(email)
    .then((results) => {
        if(!results.length) {
            return Promise.reject({
                code: 'USR005',
                message: 'Please check the credentials you supplied'
            })
        }
        const [ userData ] = results;
        const user = User.create(userData);
        return user.generateResetToken()
    })
    .then((user) => {
        return userMapper.save(user)
    })
    .then((saveResult) => {
        return Promise.resolve(saveResult.record.token)
    });
}

export function login(email, password, userRepo, userMapper) {
    let user;

    return userRepo.getByEmail(email)
    .then((results) => {
        if(!results.length) {
            return Promise.reject({
                code : 'USR003',
                message: 'Please check your credentials'
            })
        }

        const [ userData ] = results;
        user = User.create(userData);

        return user.checkPassword(password);
    })
    .then((passwordCorrect) => {
        if(!passwordCorrect) {
            return Promise.reject({
                code : 'USR004',
                message: 'Please check your credentials'
            })
        }
        user.set({lastAuth : (new Date()).toISOString()});
        return userMapper.save(user);
    });

}

export default {
    register,
    completeReset,
    login,
    initiateReset
}