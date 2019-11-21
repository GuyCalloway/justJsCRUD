class MessageApp {
    constructor() {
        this.messages = []
    }

    post(message) {
        let item = {
            id: (this.messages.length + 1),
            content: message,
            date: new Date()
        }
        this.messages.push(item)
        return this.messages
    }
}
export default MessageApp