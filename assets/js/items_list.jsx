function NoTagsError() {}
NoTagsError.prototype = Object.create(Error.prototype);

var ItemsList = React.createClass({
  getInitialState: function() {
    return { items: [] };
  },
  componentDidMount: function() {
    this.load();
  },
  load: function() {
    var _that = this;
    return axios.get('/items/')
      .then(function(response) {
        return Promise.all(response.data.map(function(item) {
          return axios.get('/item/' + item.id + '/tags/');
        }));
      })
      .then(function(response) {
        var items = response.map(function(item) {
          return item.data;
        });
        return new Promise(function(resolve, reject) {
          _that.setState({ items: items }, resolve);
        });
      });
  },
  save: function(itemId, state) {
    return axios.put('/item/' + itemId, JSON.stringify(state))
      .then(function(response) {
        return this.load();
      }.bind(this));
  },
  addTag: function(itemId, tagId) {
    return axios.post('/item/' + itemId + '/tag/' + tagId)
      .then(function(response) {
        return this.load();
      }.bind(this));
  },
  removeTag: function(itemId, tagId) {
    return axios.delete('/item/' + itemId + '/tag/' + tagId)
      .then(function(response) {
        return this.load();
      }.bind(this));
  },
  findAndAddTag: function(itemId, searchTerm) {
    return axios.get('/item/' + itemId + '/tag_search/', { search_term: searchTerm })
      .then(function(response) {
        return response.data;
      })
      .then(function(tags) {
        if (tags.length == 1) {
          return this.addTag(itemId, tags[0].id);
        }
        throw new NoTagsError();
      }.bind(this));
  },
  render: function() {
    var items = this.state.items.map(function(item) {
      return <Item data={item} onSave={this.save} addTag={this.addTag} removeTag={_.partial(this.removeTag, item.id)} findAndAddTag={_.partial(this.findAndAddTag, item.id)} />;
    }, this);
    return (<div className="row">{items}</div>);
  }
});
