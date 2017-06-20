import MockDriver from './fixings/MockDataDriver';
import { User, Mapper } from '../src/User';

describe("A User datamapper", () => {

    let user = new User({
        email: "paul@westerdale.me",
        firstName: "Paul",
        lastName: "Westerdale"
    });

    const driver = new MockDriver();

    let mapper = new Mapper(driver);
    
    it("should allow me to save a user", (done) => {
        mapper.save(user).then((status) => {
            expect(status.state).toBeTruthy();
            user = status.record;
            done();
        })
    })

    it("should allow me to update the same user", (done) => {
        user.firstName = "Paula";
        mapper.save(user).then((status) => {
            expect(status.state).toBeTruthy();
            expect(status.record.firstName).toBe("Paula");
            done();
        })
    });

    it("should allow me to delete the same user", (done) => {
        mapper.delete(user).then((status) => {
            expect(status.state).toBeTruthy();
            expect(user.deleted).toBe(true);
            done();
        });
    })
    

});