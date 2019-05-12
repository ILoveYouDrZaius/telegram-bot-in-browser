import TelegramBot from 'node-telegram-bot-api';

export default class Bot {
    constructor(token) {
        this.behaviours = [];
        this.bot = new TelegramBot(token, {polling: true});
    }

    addBehaviour(behaviour) {
        this.bot.onText(behaviour.getRegex(), (msg) => {
            const reply = behaviour.replies[Math.floor(Math.random() * behaviour.replies.length)];
            this.bot.sendMessage(msg.chat.id, reply.text);
        });
        this.behaviours.push(behaviour);
    }
    
    removeBehaviour(id) {
        const behaviourToRemove = this.behaviours.find(behaviour => behaviour.id === id);
        if (behaviourToRemove) {
            const regexToRemove = behaviourToRemove.getRegex();
            
            behaviourToRemove.restart();
            this.bot.removeTextListener(regexToRemove);
            this.behaviours = this.behaviours.filter(behaviour => behaviour.id !== id);
        }
    }

}
