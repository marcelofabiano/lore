/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');
var Header = require('./Header');
var List = require('./List');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    var location = this.props.location;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <List location={location} />
            </div>
          </div>
        </div>
      </div>
    );
  }

});