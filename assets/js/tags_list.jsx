import React from 'react';
import axios from 'axios';

var TagsList = React.createClass({
  getInitialState: function() {
    return { tags: [] };
  },
  componentDidMount: function() {
    this.load();
  },
  load: function() {
    var _that = this;
    axios.get('/api/tags/')
      .then(function(response) {
        _that.setState({ tags: response.data });
      });
  },
  onDragStart: function(tag) {
    return function(tag, event) {
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('tag', JSON.stringify(tag));
    }.bind(this, tag);
  },
  renderTag: function(tag) {
    return <div draggable="true"
      onDragStart={this.onDragStart(tag)}
      className="badge bordered"
      key={tag.id}>
        {tag.name}
      </div>;
  },
  render: function() {
    return (
      <div className="row">
        <div className="col s12">
          {this.state.tags.map(this.renderTag)}
        </div>
      </div>
    );
  }
});

export default TagsList;
