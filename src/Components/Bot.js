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
        replies: [],
        status: ""
      }
    ]
  };

  handleBehaviourOnChange(id, event) {
    this.setState(state => ({
      behaviours: state.behaviours.map(behaviour => {
        if (behaviour.id === id) {
          behaviour = event;
        }
        return behaviour;
      })
    }));
    let newBehaviour = { ...event };
    newBehaviour.triggers = newBehaviour.triggers.filter(
      trigger => trigger.text !== ""
    );
    newBehaviour.replies = newBehaviour.replies.filter(
      reply => reply.text !== ""
    );
    this.botApi.removeBehaviour(newBehaviour.id);
    if (
      newBehaviour.triggers &&
      newBehaviour.triggers.length > 0 &&
      (newBehaviour.replies && newBehaviour.replies.length > 0) &&
      newBehaviour.type
    ) {
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
    this.setState({
      token: event.target.value
    });

    if (event.target.value.length === 45) {
      this.botApi = new BotAPI(event.target.value);
      if (this.botApi.bot) {
        this.botApi.bot.on("polling_error", error => {
          this.setState(state => {
            this.botApi.bot.stopPolling();
            return {
              token: "",
              status: "error"
            };
          });
        });
        this.botApi.bot.on("poll", error => {
          console.log('Conexion ok');
          console.log(error);
        });
      }
      if (this.botApi.bot.isPolling()) {
        this.setState({
          status: "connected"
        });
      }
    } else if (event.target.value.length > 45) {
      this.setState({
        token: event.target.value.substring(0, 45),
        status: ""
      });
    }
  }

  handleRemoveBehaviour(id) {
    this.setState(state => ({
      behaviours: state.behaviours.filter(
        behaviour => behaviour.id !== id
      )
    }));
  }

  render() {
    let behaviours;
    if (this.state.status === "connected") {
      behaviours = this.state.behaviours.map(behaviour => (
        <Behaviour
          key={behaviour.id}
          removeBehaviour={this.handleRemoveBehaviour.bind(this, behaviour.id)}
          behaviourOnChange={this.handleBehaviourOnChange.bind(
            this,
            behaviour.id
          )}
          behaviour={behaviour}
        />
      ));
    }
    return (
      <div>
        <div className="bot-title">
          <h4>Bot Token:</h4>{" "}
          <input
            type="text"
            value={this.state.token}
            onChange={this.handleTokenChange.bind(this)}
          />
        </div>
        {behaviours}
      </div>
    );
  }
}

export { Bot };
