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

    get(id) {
        let index = this.messages.findIndex(message => message.id === id)
        return this.messages[index]
    }


    update(id, update) {
        this.messages.forEach(function (message) {
            if (message.id == id) {
                message.content = update
            }
        })
        return this.messages
    }

    delete(id) {
        this.messages = this.messages.filter(message => message.id != id)
        return this.messages
    }
};

export default MessageApp