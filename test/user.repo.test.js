import MockDriver from './fixings/MockDataDriver';
import { User, Repo, Mapper } from '../src/User';

describe("A User repository", () => {

    const driver = new MockDriver();

    let repo = new Repo(driver);
    let mapper = new Mapper(driver);

    beforeAll((done) => {
        const users = [{
            email : "paul@example.com",
            firstName : "Paul",
            lastName : "Westerdale"
        }, {
            email : "joe.bloggs@example.com",
            firstName : "Joe",
            lastName : "bloggs"
        }]

        const promises = users.map((user) => {
            return mapper.save(user);
        });

        Promise.all(promises).then((results) => {
            done();
        });

    });
    
    it("should allow me to find all users", (done) => {
        repo.getAll()
        .then((users) => {
            expect(users.length).toBe(2);
            done();
        });
    });

    it("should allow me to find a user by Id", (done) => {
        repo.getById(1)
        .then((users) => {
            const user = users[0];
            expect(user.id).toBe(1);
            expect(user.firstName).toBe("Joe");
            done();
        });
    })

    it("should allow me to find a user by E-mail", (done) => {
        repo.getByEmail("paul@example.com")
        .then((users) => {
            const user = users[0];
            expect(user.id).toBe(0);
            expect(user.firstName).toBe("Paul");
            done();
        });
    });

});