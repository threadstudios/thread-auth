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

var _threadUtils = require('thread-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var schema = _yup2.default.object().shape({
    email: _yup2.default.string().email().required()
});

var User = function (_Model) {
    _inherits(User, _Model);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, User));
    }

    _createClass(User, [{
        key: 'exists',
        value: function exists() {
            return this.getId();
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return schema.isValid(this.get());
        }
    }, {
        key: 'setPassword',
        value: function setPassword(password) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _bcryptNode2.default.hash(password, null, null, function (err, hash) {
                    if (err) reject(err);
                    _this2.set({ hash: hash });
                    resolve(_this2);
                });
            });
        }
    }, {
        key: 'checkPassword',
        value: function checkPassword(submitted) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _bcryptNode2.default.compare(submitted, _this3.get('hash'), function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        }
    }, {
        key: 'generateResetToken',
        value: function generateResetToken() {
            this.set({ token: (0, _v2.default)() });
            return Promise.resolve(this);
        }
    }]);

    return User;
}(_threadUtils.Model);

User.fields = ["email", "hash", "lastAuth", "deleted", "firstName", "lastName", "token", "state"];
exports.default = User;