var ItemsList = React.createClass({
  getInitialState: function() {
    return { items: [] };
  },
  componentDidMount: function() {
    this.load();
  },
  load: function() {
    var _that = this;
    axios.get('/items/')
      .then(function(response) {
        return Promise.all(response.data.map(function(item) {
          return axios.get('/item/' + item.id + '/tags/');
        }));
      })
      .then(function(response) {
        var items = response.map(function(item) {
          return item.data;
        });
        _that.setState({ items: items });
      });
  },
  render: function() {
    var items = this.state.items.map(function(item) {
      return (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <h2>{item.amount} {item.unit}</h2>
          <TagsList tags={item.tags} />
        </div>
      );
    });
    return (<div>{items}</div>);
  }
});
