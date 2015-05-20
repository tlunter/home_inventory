var TagsList = React.createClass({
  render: function() {
    var tags = this.props.tags.map(function(tag) {
      return <span className="card badge bordered" key={tag.id}>{tag.name}</span>
    });
    return (
      <span>
        {tags}
      </span>
    );
  }
});
