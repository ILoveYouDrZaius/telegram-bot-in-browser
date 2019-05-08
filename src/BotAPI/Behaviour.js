export default class Behaviour {
    constructor(triggers, replies, type, id) {
        if ((!triggers || triggers.length === 0) ||
            (!replies || replies.length === 0) ||
            (!type)) {
                throw new Error('Invalid parameters');
            }
        this.triggers = triggers;
        this.replies = replies;
        this.type = type;
        if (id) {
            this.id = id;
        } else {
            this.id = (new Date()).getTime();
        }
    }

    restart() {
        this.triggers = null;
        this.replies = null;
        this.type = null;
        this.id = null;
        this.regex = null;
    }

    getRegex() {
        if (!this.regex) {
            const type = Number(this.type);
            if (type === 1) {
                this.regex = new RegExp(this.triggers.reduce((total, current) => `${total}(?=.*${current.text})`, ''));
            } else if (type === 2) {
                this.regex = new RegExp(this.triggers.reduce((total, current) => `${total}|${current.text}`, '').substr(1));
            } else {
                throw new Error('Behaviour with invalid type');
            }
        }
        return this.regex;
    }
}
