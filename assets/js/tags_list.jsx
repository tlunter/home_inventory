var TagsList = React.createClass({
  render: function() {
    var tags = this.props.tags.map(function(tag) {
      return <li key={tag.id}>{tag.name}</li>
    });
    return (
      <ul>
        {tags}
      </ul>
    );
  }
});
