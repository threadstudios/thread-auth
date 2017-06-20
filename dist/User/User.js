'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yup = require('yup');

var _yup2 = _interopRequireDefault(_yup);

var _bcryptNode = require('bcrypt-node');

var _bcryptNode2 = _interopRequireDefault(_bcryptNode);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var schema = _yup2.default.object().shape({
    email: _yup2.default.string().email().required()
});

var fields = ["id", "email", "hash", "lastAuth", "deleted", "firstName", "lastName", "token", "state"];

var User = function () {
    function User(record) {
        _classCallCheck(this, User);

        if (record) this.fromData(record);
    }

    _createClass(User, [{
        key: 'fromData',
        value: function fromData(data) {
            var _this = this;

            Object.keys(data).forEach(function (key) {
                if (fields.includes(key)) {
                    _this[key] = data[key];
                }
            });
        }
    }, {
        key: 'exists',
        value: function exists() {
            return this.id;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return schema.isValid(this);
        }
    }, {
        key: 'setPassword',
        value: function setPassword(password) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _bcryptNode2.default.hash(password, null, null, function (err, hash) {
                    if (err) reject(err);
                    _this2.hash = hash;
                    resolve(_this2);
                });
            });
        }
    }, {
        key: 'checkPassword',
        value: function checkPassword(submitted) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _bcryptNode2.default.compare(submitted, _this3.hash, function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        }
    }, {
        key: 'generateResetToken',
        value: function generateResetToken() {
            this.token = (0, _v2.default)();
            return Promise.resolve(this);
        }
    }, {
        key: 'toObject',
        value: function toObject() {
            var _this4 = this;

            var userObject = {};
            ["id", "email", "firstName", "lastName"].forEach(function (key) {
                return userObject[key] = _this4[key];
            });
            return userObject;
        }
    }]);

    return User;
}();

exports.default = User;