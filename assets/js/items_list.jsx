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
  save: function(itemId, state) {
    axios.put('/item/' + itemId, JSON.stringify(state))
      .then(function(response) {
        this.load();
      }.bind(this));
  },
  render: function() {
    var items = this.state.items.map(function(item) {
      return <Item data={item} onSave={this.save} />;
    }, this);
    return (<div className="row">{items}</div>);
  }
});
