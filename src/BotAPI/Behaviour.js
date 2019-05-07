export default class Behaviour {
    constructor(triggers, replies, type, id) {
        if ((!triggers || triggers.length === 0) ||
            (!replies || replies.length === 0) ||
            (!type)) {
                throw 'Invalid parameters';
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
            if (this.type === 1) {
                this.regex = new RegExp(this.triggers.reduce((regex, current) => `${regex}|${current}`));
            } else if (this.type === 2) {
                this.regex = new RegExp(this.triggers.reduce((regex, current) => `${regex}(?=.*${current})`, ''));
            } else {
                throw 'Behaviour with invalid type';
            }
        }
        return this.regex;
    }
}
