import React from "react";

import "./Behaviour.css";

class Behaviour extends React.Component {
  handleTriggerChange(id, event) {
    event.persist();
    const behaviour = this.props.behaviour;
    behaviour.triggers = behaviour.triggers.map(trigger => {
      if (trigger.id === id) {
        trigger.text = event.target.value;
      }
      return trigger;
    });
    this.props.behaviourOnChange(behaviour);
  }

  handleReplyChange(id, event) {
    event.persist();
    const behaviour = this.props.behaviour;
    behaviour.replies = behaviour.replies.map(reply => {
      if (reply.id === id) {
        reply.text = event.target.value;
      }
      return reply;
    });
    this.props.behaviourOnChange(behaviour);
  }

  handleRemoveTrigger(id, event) {
    event.persist();
    console.log(id);
    const behaviour = this.props.behaviour;
    behaviour.triggers = behaviour.triggers.filter(
      trigger => trigger.id !== id
    );
    this.props.behaviourOnChange(behaviour);
  }

  handleRemoveReply(id, event) {
    event.persist();
    console.log(id);
    const behaviour = this.props.behaviour;
    behaviour.replies = behaviour.replies.filter(reply => reply.id !== id);
    this.props.behaviourOnChange(behaviour);
  }

  handleTypeChange(id, event) {
    event.persist();
    const behaviour = this.props.behaviour;
    behaviour.type = event.target.value;
    this.props.behaviourOnChange(behaviour);
  }

  handleNewTrigger(event) {
    event.persist();
    const someTriggerIsEmpty = this.props.behaviour.triggers.some(
      trigger => trigger.text === ""
    );
    if (!someTriggerIsEmpty) {
      const behaviour = this.props.behaviour;
      const now = new Date();
      const newId = now.getTime();
      behaviour.triggers = [...behaviour.triggers, { id: newId, text: "" }];
      this.props.behaviourOnChange(behaviour);
    }
  }

  handleNewReply(event) {
    event.persist();
    const someReplyIsEmpty = this.props.behaviour.replies.some(
      reply => reply.text === ""
    );
    if (!someReplyIsEmpty) {
      const behaviour = this.props.behaviour;
      const now = new Date();
      const newId = now.getTime();
      behaviour.replies = [...behaviour.replies, { id: newId, text: "" }];
      this.props.behaviourOnChange(behaviour);
    }
  }

  render() {
    const triggers = this.props.behaviour.triggers.map(trigger => (
      <div key={trigger.id} className="trigger">
        <input
          className="trigger__text"
          type="text"
          onChange={this.handleTriggerChange.bind(this, trigger.id)}
          value={trigger.text}
        />
        <button
          className="trigger__button remove-button"
          onClick={this.handleRemoveTrigger.bind(this, trigger.id)}
        >
          -
        </button>
      </div>
    ));

    const replies = this.props.behaviour.replies.map(reply => (
      <div key={reply.id} className="reply">
        <input
          className="reply__text"
          type="text"
          onChange={this.handleReplyChange.bind(this, reply.id)}
          value={reply.text}
        />
        <button
          className="reply__button remove-button"
          onClick={this.handleRemoveReply.bind(this, reply.id)}
        >
          -
        </button>
      </div>
    ));

    return (
      <div>
        <h3>Behaviour {this.props.behaviour.id}</h3>
        <div className="behaviour-container">
          <select
            value={this.props.behaviour.type}
            onChange={e => this.handleTypeChange(this.props.behaviour.id, e)}
            className="triggers-container__type"
          >
            <option defaultValue value="1">
              All
            </option>
            <option value="2">One</option>
          </select>
          <div className="triggers-container__title">
            <h4>Triggers</h4>
            <button onClick={this.handleNewTrigger.bind(this)}>+</button>
          </div>
          <div className="triggers-container__triggers">{triggers}</div>
          <div className="replies-container__title">
            <h4>Replies</h4>
            <button onClick={this.handleNewReply.bind(this)}>+</button>
          </div>
          <div className="replies-container__replies">{replies}</div>
        </div>
      </div>
    );
  }
}

export { Behaviour };
