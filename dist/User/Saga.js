'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.register = register;
exports.completeReset = completeReset;
exports.initiateReset = initiateReset;
exports.login = login;

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register(userData, password, userRepository, userMapper) {

    var user = _User2.default.create(userData);

    return Promise.all([user.isValid(), userRepository.getByEmail(user.get('email')), user.setPassword(password)]).then(function (results) {
        var _results = _slicedToArray(results, 3),
            valid = _results[0],
            existingUser = _results[1],
            userHash = _results[2];

        if (valid && !existingUser.id && userHash) {
            return userMapper.save(user);
        } else {
            return Promise.reject({
                code: 'USR001',
                message: 'User is not valid',
                results: { valid: valid, existingUser: existingUser.id }
            });
        }
    }).then(function (saveResult) {
        return Promise.resolve(saveResult.record);
    }).catch(function (err) {
        return Promise.reject({
            code: 'USR002',
            message: 'User could not be saved',
            core: err
        });
    });
}

function completeReset(token, newPassword, userRepo, userMapper) {
    return userRepo.getByToken(token).then(function (results) {
        if (!results.length) {
            return Promise.reject({
                code: 'USR006',
                message: 'This token is invalid or has expired'
            });
        }

        var _results2 = _slicedToArray(results, 1),
            userData = _results2[0];

        var user = _User2.default.create(userData);
        return user.setPassword(newPassword);
    }).then(function (user) {
        return userMapper.save(user);
    }).then(function (saveResult) {
        return Promise.resolve(saveResult.record);
    });
}

function initiateReset(email, userRepo, userMapper) {
    return userRepo.getByEmail(email).then(function (results) {
        if (!results.length) {
            return Promise.reject({
                code: 'USR005',
                message: 'Please check the credentials you supplied'
            });
        }

        var _results3 = _slicedToArray(results, 1),
            userData = _results3[0];

        var user = _User2.default.create(userData);
        return user.generateResetToken();
    }).then(function (user) {
        return userMapper.save(user);
    }).then(function (saveResult) {
        return Promise.resolve(saveResult.record.token);
    });
}

function login(email, password, userRepo, userMapper) {
    var user = void 0;

    return userRepo.getByEmail(email).then(function (results) {
        if (!results.length) {
            return Promise.reject({
                code: 'USR003',
                message: 'Please check your credentials'
            });
        }

        var _results4 = _slicedToArray(results, 1),
            userData = _results4[0];

        user = _User2.default.create(userData);

        return user.checkPassword(password);
    }).then(function (passwordCorrect) {
        if (!passwordCorrect) {
            return Promise.reject({
                code: 'USR004',
                message: 'Please check your credentials'
            });
        }
        user.set({ lastAuth: new Date().toISOString() });
        return userMapper.save(user);
    });
}