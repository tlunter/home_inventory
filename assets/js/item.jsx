import React from 'react';

import TagsBadges from 'tags_badges.jsx';
import TagsEdit from 'tags_edit.jsx';

var Item = React.createClass({
  getInitialState: function() {
    return {
      edit: false,
      name: this.props.data.name,
      amount: this.props.data.amount,
      unit: this.props.data.unit
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      name: nextProps.data.name,
      amount: nextProps.data.amount,
      unit: nextProps.data.unit
    });
  },
  handleEditClicked: function(event) {
    event.preventDefault();

    this.setState({ edit: true });
  },
  handleSaveClicked: function(event) {
    event.preventDefault();

    this.setState({ edit: false });
    this.props.onSave(this.props.data.id, {
      name: this.state.name,
      amount: this.state.amount,
      unit: this.state.unit
    });
  },
  handleCancelClicked: function(event) {
    event.preventDefault();

    this.setState({ edit: false });
  },
  onDragOver: function(event) {
    event.preventDefault();
  },
  onDrop: function(event) {
    event.preventDefault();
    var tagJson = event.dataTransfer.getData('tag');
    if (tagJson.length > 0) {
      var tag = JSON.parse(tagJson);
      this.props.addTag(this.props.data.id, tag.id);
    }
  },
  change: function(field) {
    return function(field, event) {
      var updates = {};
      updates[field] = event.target.value;
      this.setState(updates);
    }.bind(this, field);
  },
  renderStatic: function() {
    return (
      <div className="card" onDragOver={this.onDragOver} onDrop={this.onDrop}>
        <div className="card-content black-text">
          <TagsBadges tags={this.props.data.tags} />
          <span className="card-title black-text">{this.state.name}</span>
          <p>{this.state.amount} {this.state.unit}</p>
        </div>
        <div className="card-action">
          <a href="#" onClick={this.handleEditClicked}>Edit</a>
          <a href="#">Delete</a>
        </div>
      </div>
    );
  },
  renderEditable: function() {
    var item = this.props.data;
    return (
      <div className="card">
        <div className="card-content black-text">
          <div className="row">
            <div className="input-field col s12">
              <input id="name" type="text" value={this.state.name} onChange={this.change('name')} />
              <label className="active" htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="amount" type="text" value={this.state.amount} onChange={this.change('amount')} />
              <label className="active" htmlFor="amount">Amount</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="unit" type="text" value={this.state.unit} onChange={this.change('unit')} />
              <label className="active" htmlFor="unit">Unit</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <TagsEdit tags={item.tags} removeTag={this.props.removeTag} findAndAddTag={this.props.findAndAddTag} />
            </div>
          </div>
        </div>
        <div className="card-action">
          <a href="#" onClick={this.handleSaveClicked}>Save</a>
          <a href="#" onClick={this.handleCancelClicked}>Cancel</a>
        </div>
      </div>
    );
  },
  render: function() {
    var cardContent;
    if (this.state.edit) {
      cardContent = this.renderEditable();
    } else {
      cardContent = this.renderStatic();
    }

    return (
      <div key={this.props.data.id} className="col s12 m6">
        {cardContent}
      </div>
    );
  }
});

export default Item;
