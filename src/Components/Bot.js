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
  }

  handleTokenChange(event) {
    if (event.target.value.length === 45) {
      this.setState({
        token: event.target.value
      });
      console.log(event.target.value);
      this.bot = new BotAPI(event.target.value);
      const behaviourObject = new BehaviourAPI([ 'haha', 'no', 'maybe' ], [ 'omggggggg' ], 1);
      this.bot.addBehaviour(behaviourObject);
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
