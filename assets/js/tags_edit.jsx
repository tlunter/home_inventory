import React from 'react';

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

var TagsEdit = React.createClass({
  getInitialState: function() {
    return {
      allTags: [],
      searchedTag: ''
    };
  },

  load: function() {
    axios.get('/tags/')
      .then(function(response) {
        this.setState({ allTags: response.data });
      }.bind(this));
  },

  inputOnKeyDown: function(event) {
    if (event.keyCode == 13 || event.keyCode == 9) {
      if (this.state.searchedTag.length > 0) {
        event.preventDefault();
        event.nativeEvent.stopPropagation();
        event.stopPropagation();

        this.props.findAndAddTag(this.state.searchedTag)
          .then(function() {
            this.setState({ searchedTag: '' });
          }.bind(this))
          .catch(function() {
            console.log("No tags");
          });
      }
    }
  },
  onChange: function(event) {
    this.setState({ searchedTag: event.target.value });
  },
  renderTag: function(tag) {
    var classes = classNames({ fixed: true, badge: true, bordered: true });
    return (<div className={classes} key={tag.id}>
      {tag.name}{' '}
      <span onClick={_.partial(this.props.removeTag, tag.id)} className="clickable">&times;</span>
    </div>);
  },
  render: function() {
    return (
      <div className="tags-input">
        <div className="tags-edit">
          <div className="tags-list">
            {this.props.tags.map(this.renderTag)}
            <input id="tags" onKeyDown={this.inputOnKeyDown} onChange={this.onChange} type="text" value={this.state.searchedTag} className="the-rest" />
          </div>
          <label className="active" htmlFor="tags">Tags</label>
        </div>
      </div>
    );
  }
});

export default TagsEdit;
