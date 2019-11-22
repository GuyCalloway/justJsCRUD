import {
    expect
} from "chai";
import MessageApp from "../lib/model.js";

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

    it("app reads from given filepath", function () {
        let testAppLoadFile = new MessageApp("/\///json/\//testMessages.json")
        expect(testAppLoadFile.messages.length).to.equal(0)
    });

    it("reads and writes from and to given filepath", function () {
        let testFileWriteApp = new MessageApp("/\///json/\//testMessages.json")
        expect(testFileWriteApp.messages.length).to.equal(0)
        testFileWriteApp.post("Hi")
        expect(testFileWriteApp.messages.length).to.equal(1)
    });
    it("reads and deletes from filepath", function () {
        let testFileReadApp = new MessageApp("/\///json/\//testMessages.json")
        expect(testFileReadApp.messages.length).to.equal(1)
        testFileReadApp.delete(1)
        let testFileClearedApp = new MessageApp("/\///json/\//testMessages.json")
        expect(testFileClearedApp.messages.length).to.equal(0)
    });

    it("rejects empty messages", function () {
        let testApp = new MessageApp()
        expect(testApp.post('')).to.deep.equal([])
    })
    it("no messages if no messages are sent", function () {
        let testApp = new MessageApp()
        expect(testApp.getAll()).to.deep.equal([])
    })
    it("rejects false update", function () {
        let testApp = new MessageApp()
        testApp.post("hey")
        expect(testApp.update(2, "")).to.deep.equal([])
    })
    it("errors if no message to delete", function () {
        let testApp = new MessageApp()
        expect(testApp.delete(0)).to.deep.equal('Message not found in database')
    })
});
