'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRepository = function () {
    function UserRepository(storageDriver) {
        _classCallCheck(this, UserRepository);

        this.driver = storageDriver;
        this.context = 'user';
    }

    _createClass(UserRepository, [{
        key: 'getBy',
        value: function getBy(field, value) {
            return this.driver.getBy(this.context, field, value);
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return this.driver.getAll(this.context);
        }
    }, {
        key: 'getById',
        value: function getById(id) {
            return this.getBy('id', id);
        }
    }, {
        key: 'getByEmail',
        value: function getByEmail(email) {
            return this.getBy('email', email);
        }
    }, {
        key: 'getByToken',
        value: function getByToken(token) {
            return this.getBy('token', token);
        }
    }]);

    return UserRepository;
}();

exports.default = UserRepository;