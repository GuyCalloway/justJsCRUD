import {
    expect
} from "chai";
import MessageApp from "./app.js";

describe("app", function () {
    let testApp = new MessageApp();
    it("app has messages", function () {
        expect(testApp.messages).to.deep.equal([]);
    });

    it("app creates message (post)", function () {
        testApp.post('hi world')
        expect(testApp.messages.length).to.equal(1)
    });

    it("message has content, date, and id", function () {
        expect(testApp.messages[0].content).to.equal("hi world")
        expect(testApp.messages[0].date).not.to.equal(undefined)
        expect(testApp.messages[0].id).to.equal(1)
    });

});