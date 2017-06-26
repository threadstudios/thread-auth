import { User } from '../src/User';

describe("A User", () => {

    let dummyUser = User.create({id : 1, firstName : "Paul", lastName : "Westerdale"});

    it("should be able to be instantiated empty", () => {
        const user = User.create();
        expect(user.exists()).toBeFalsy();
    });

    it("should be able to be partially instantiated", () => {
        expect(dummyUser.exists()).toBeTruthy();
        const userData = dummyUser.get();
        expect(userData.firstName).toBe("Paul");
    });

    it("should fail validation without an e-mail address", (done) => {
        dummyUser.isValid().then((valid) => {
            expect(valid).toBeFalsy();
            done();
        });
    });

    it("should pass validation with an e-mail address", (done) => {
        dummyUser.set({email : "paul@westerdale.me"});
        dummyUser.isValid().then((valid) => {
            expect(valid).toBeTruthy();
            done();
        })
    });

    it("should allow for a password to be set", (done) => {
        dummyUser.setPassword('cakeIsALie').then((user) => {
            expect(dummyUser.get('hash')).toBeTruthy();
            done();
        });
    });

    it("should allow for a password to be checked for validity", (done) => {
        Promise.all([
            dummyUser.checkPassword('Blah'), 
            dummyUser.checkPassword('cakeIsALie')
        ]).then((results) => {
            expect(results[0]).toBeFalsy();
            expect(results[1]).toBe(true);
            done();
        })
    });

});
