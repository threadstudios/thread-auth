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
        key: 'query',
        value: function query(params) {
            return this.driver.query(this.context, params);
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return this.driver.getAll(this.context);
        }
    }, {
        key: 'getById',
        value: function getById(id) {
            return this.query([{ type: '=', field: 'id', value: id }]);
        }
    }, {
        key: 'getByEmail',
        value: function getByEmail(email) {
            return this.query([{ type: '=', field: 'email', value: email }]);
        }
    }, {
        key: 'getByToken',
        value: function getByToken(token) {
            return this.query([{ type: '=', field: 'token', value: token }]);
        }
    }]);

    return UserRepository;
}();

exports.default = UserRepository;