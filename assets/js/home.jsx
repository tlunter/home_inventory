import React from 'react';
import ItemsList from "items_list.jsx";
import TagsList from "tags_list.jsx";

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <ItemsList />
        <TagsList />
      </div>
    );
  }
});


React.render(
  <Home />,
  document.querySelector("#content")
);
