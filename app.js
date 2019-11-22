import fs from 'fs'
import path from 'path'

class MessageApp {
    constructor(filepath) {
        this.filepath = filepath
        this.messages = filepath ? this.readFromJson() : []
    }

    post(message) {
        if (message) {
            this.messages.push({
                id: newId(this.messages),
                content: message,
                date: new Date()
            })
            this.writeToJson()
            return this.messages
        } else if (!message) {
            return []
        }
    }

    getAll() {
        return this.messages
    }

    get(id) {
        let index = this.messages.findIndex(message => message.id === id)
        return this.messages[index]
    }

    update(id, update) {
        let index = findIndexOfID(this.messages, id)
        if (index >= 0) {
            this.messages[index].content = update
            this.writeToJson()
            return this.messages
        } else {
            return []
        }
    }

    // update(id, update) {
    //     this.messages.forEach(function (message) {
    //         if (message.id === id) {
    //             message.content = update
    //         }
    //     })
    //     return this.messages
    // }

    delete(id) {
        let index = findIndexOfID(this.messages, id)
        if (index >= 0) {
            this.messages.splice(index, 1)
            this.writeToJson()
            return this.messages
        } else {
            return "Message not found in database"
        }
    }

    readFromJson() {
        return JSON.parse(fs.readFileSync(
            __dirname + path.normalize(this.filepath), "utf8", (err, data) => {
                if (err) throw err
            }))
    }

    writeToJson() {
        if (this.filepath) {
            const jsonItem = JSON.stringify(this.messages)
            fs.writeFileSync(__dirname + path.normalize(this.filepath), jsonItem, (err) => {
                if (err) throw err;
            });
        }
    }
};

function newId(array) {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    } else {
        return 1
    }
};

function findIndexOfID(array, id) {
    return array.findIndex(message => message.id === id)
}

export default MessageApp