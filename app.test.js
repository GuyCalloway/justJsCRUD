import {
    expect
} from "chai";
import MessageApp from "./app.js";

describe("CRUD app", function () {
    let testApp = new MessageApp();
    beforeEach(() => {
        testApp = new MessageApp
        testApp.post('hi world')
    })

    it("app creates message (post)", function () {
        expect(testApp.messages.length).to.equal(1)
    });

    it("message has content, date, and id", function () {
        expect(testApp.messages[0].content).to.equal("hi world")
        expect(testApp.messages[0].date).not.to.equal(undefined)
        expect(testApp.messages[0].id).to.equal(1)
    });

    it("app reads (get)", function () {
        expect(testApp.get(1).content).to.equal("hi world")
    });
    it("app updates (update)", function () {
        testApp.update(1, "hello world")
        expect(testApp.messages[0].content).to.equal('hello world')
    });
    it("app deletes (delete)", function () {
        testApp.delete(1)
        expect(testApp.messages.length).to.equal(0)
    });

    it("id's are always unique", function () {
        testApp.post('1')
        testApp.post('2')
        testApp.delete(1)
        testApp.post('3')
        expect(testApp.messages[1].id).to.equal(3)
    });
    it("app deletes correctly", function () {
        testApp.post('2')
        testApp.post('3')
        testApp.post('4')
        testApp.delete(1)
        testApp.delete(3)
        expect(testApp.messages[0].content).to.equal('2')
    });
    it("app updates correctly", function () {
        testApp.post('2')
        testApp.post('3')
        testApp.delete(1)
        testApp.update(2, 'update')
        expect(testApp.messages[0].content).to.equal('update')
    });
});