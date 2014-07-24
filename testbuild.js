
var React = require('react');
React.renderComponent(require('./calpop-slider.jsx')({ date: new Date(), input: document.getElementsByTagName('input')[0] }), document.getElementById('datepick'));