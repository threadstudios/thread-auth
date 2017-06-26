'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserDataMapper = function () {
    function UserDataMapper(storageDriver) {
        _classCallCheck(this, UserDataMapper);

        this.driver = storageDriver;
        this.context = 'user';
    }

    _createClass(UserDataMapper, [{
        key: 'save',
        value: function save(user) {
            if (user.getId() === false) {
                return this.driver.create(this.context, user);
            } else {
                return this.driver.update(this.context, user);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(user) {
            if (user.getId() !== false) {
                return this.driver.delete(this.context, user);
            }
        }
    }]);

    return UserDataMapper;
}();

exports.default = UserDataMapper;