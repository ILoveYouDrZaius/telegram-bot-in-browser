import React from "react";
import BotAPI from "../BotAPI/Bot";
import BehaviourAPI from "../BotAPI/Behaviour";

import { Behaviour } from "./Behaviour";

import "./Bot.css";

class Bot extends React.Component {
  state = {
    token: "",
    behaviours: [
      {
        id: 1,
        type: 1,
        triggers: [],
        replies: []
      }
    ]
  };

  handleBehaviourOnChange(id, event) {
    this.setState({
      behaviours: this.state.behaviours.map(behaviour => {
        if (behaviour.id === id) {
          behaviour = event;
        }
        return behaviour;
      })
    });
    let newBehaviour = { ...event };
    newBehaviour.triggers = newBehaviour.triggers.filter(trigger => trigger.text !== '');
    newBehaviour.replies = newBehaviour.replies.filter(reply => reply.text !== '');
    this.botApi.removeBehaviour(newBehaviour.id);
    if (((newBehaviour.triggers && newBehaviour.triggers.length > 0) &&
      (newBehaviour.replies && newBehaviour.replies.length > 0) &&
      (newBehaviour.type))) {
        const behaviourAPI = new BehaviourAPI(
          newBehaviour.triggers,
          newBehaviour.replies,
          newBehaviour.type,
          newBehaviour.id
        );
        this.botApi.addBehaviour(behaviourAPI);
      }
  }

  handleTokenChange(event) {
    if (event.target.value.length === 45) {
      this.setState({
        token: event.target.value
      });
      this.botApi = new BotAPI(event.target.value);
    } else if (event.target.value.length > 45) {
      this.setState({
        token: event.target.value.substring(0, 45)
      });
    }
  }

  render() {
    const behaviours = this.state.behaviours.map(behaviour => (
      <Behaviour
        key={behaviour.id}
        behaviourOnChange={this.handleBehaviourOnChange.bind(
          this,
          behaviour.id
        )}
        behaviour={behaviour}
      />
    ));
    return (
      <div>
        <div className="bot-title">
          <h4>Bot Token:</h4>{" "}
          <input
            type="text"
            onChange={this.handleTokenChange.bind(this)}
          />
        </div>
        {behaviours}
      </div>
    );
  }
}

export { Bot };
