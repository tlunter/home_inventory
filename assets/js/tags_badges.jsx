var TagsBadges = React.createClass({
  renderTagBadge: function(tag) {
    return <div className="badge bordered" key={tag.id}>{tag.name}</div>;
  },
  render: function() {
    return <div style={{float: 'right'}}>{this.props.tags.map(this.renderTagBadge)}</div>;
  }
});
