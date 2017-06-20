import { User } from '../src/User';

describe("A User", () => {

    let dummyUser = new User({id : 1, firstName : "Paul", lastName : "Westerdale"});

    it("should be able to be instantiated empty", () => {
        const user = new User();
        expect(user.exists()).toBeFalsy();
    });

    it("should be able to be partially instantiated", () => {
        expect(dummyUser.exists()).toBeTruthy();
        expect(dummyUser.firstName).toBe("Paul");
    });

    it("should fail validation without an e-mail address", (done) => {
        dummyUser.isValid().then((valid) => {
            expect(valid).toBeFalsy();
            done();
        });
    });

    it("should pass validation with an e-mail address", (done) => {
        dummyUser.email = "paul@westerdale.me";
        dummyUser.isValid().then((valid) => {
            expect(valid).toBeTruthy();
            done();
        })
    });

    it("should allow for a password to be set", (done) => {
        dummyUser.setPassword('cakeIsALie').then((user) => {
            expect(dummyUser.hash).toBeTruthy();
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
