import User from './User';

export function register(userData, password, userRepository, userMapper) {

    const user = new User(userData);

    return Promise.all(
        user.isValid(),
        userRepository.getByEmail(user.email),
        user.setPassword(password)
    ).then((results) => {
        const [valid, existingUser, userHash ] = results;
        if(valid && !existingUser.id && userHash) {
            return userMapper.save(user);
        } else {
            return Promise.reject({
                code : 'USR001', 
                message : 'User is not valid', 
                results : {valid : valid, existingUser : (existingUser.id)}
            })
        }
    })
    .then((newUser) => {
        return Promise.resolve(newUser.toObject())
    })
    .catch((err) => {
        return Promise.reject(err);
    })
    
}