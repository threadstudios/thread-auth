import MockDriver from './fixings/MockDataDriver';
import { User, Repo, Mapper } from '../src/User';
import { register, login, initiateReset, completeReset } from '../src/User/Saga';


describe("User Sagas", () => {

    const driver = new MockDriver();

    let repo = new Repo(driver);
    let mapper = new Mapper(driver);
    let token;

    it("Should allow me to create a user", (done) => {
        const user = {email : "paul@example.com", firstName: "Paul", lastName: "Westerdale"};
        register(user, "cake", repo, mapper)
        .then((result) => {
            expect(result.id).toBe(0);
            done();
        });
    })
    
    it("should allow me to login", (done) => {

        login("paul@example.com", "cake", repo, mapper)
        .then((result) => {
            expect(result.state).toBe(true);
            expect(result.record.lastAuth).toBeDefined();
            done();
        }).catch((err) => {
            console.log(err);
        });

    });
    
    it("should fail nicely if login fails", (done) => {

        login("paul@example1.com", "cake", repo, mapper)
        .catch((err) => {
            expect(err.code).toBe("USR003");
            done();
        })

        login("paul@example.com", "make", repo, mapper)
        .catch((err) => {
            expect(err.code).toBe("USR004");
            done();
        })

    });

    it("should allow me to initiate a password reset", (done) => {
        initiateReset("paul@example.com", repo, mapper)
        .then((resetToken) => {
            expect(resetToken).toBeDefined();
            token = resetToken;
            done();
        });
    });

    it("should fail nicely if I try to reset password on an incorrect user", (done) => {
        initiateReset("test@example.com", repo, mapper)
        .catch((err) => {
            expect(err.code).toBe("USR005");
            done();
        });
    });

    it("should allow me to reset my password with the token", (done) => {
        completeReset(token, "fake", repo, mapper)
        .then((result) => {
            expect(result.firstName).toBe("Paul")
            done();
        }).catch((err) => {
            console.log(err);
            done();
        });
    });

    it("should allow me to log in with my new password", (done) => {
        login("paul@example.com", "fake", repo, mapper)
        .then((result) => {
            expect(result.state).toBe(true);
            expect(result.record.firstName).toBe("Paul")
            done();
        });
    });


});