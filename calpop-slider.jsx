/** @jsx React.DOM */

var React = require('react')
  , Calendar = require('./calpop.jsx');

require('./style.css');
require('./calpop.less');

var monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
var dayNames   = ['s', 'm', 't', 'w', 't', 'f', 's'];

var formatDateHeading = function(date) {
  var m = monthNames[date.getMonth()];
  return m.charAt(0).toUpperCase()+m.slice(1) + ' ' + date.getFullYear();
};

module.exports = React.createClass({
  
  getDefaultProps: function() {
    return {
      cssClass:   'calendar_pop',
      date:       new Date()
    };
  },
  
  getInitialState: function() {
    return {
      isOpen:   false
    };
  },
  
  componentWillMount: function() {
    var refDate = this.props.date;
    this.setState({ month: refDate.getMonth() + 1, year: refDate.getFullYear() });
  },
  
  goBack: function() {
    this.setState({ month: this.state.month - 1 });
  },
  
  goForward: function() {
    this.setState({ month: this.state.month + 1 });
  },
  
  show: function() {
    $(document).on('click.calpop', this.onClickOut);
    this.setState({ isOpen: true });
  },
  
  onClickOut: function(e) {
    if(e.target.className.indexOf(this.props.cssClass)==-1 && (e.target.parentNode.className||'').indexOf(this.props.cssClass)==-1) {
      this.setState({ isOpen: false });
      $(document).off('click.calpop');
    }
  },
  
  onClick: function(e) {
    var t = e.target;
    if(t.className=='calendar_pop_day') {
      this.props.input.value = $(t).data('cal');
      this.setState({ isOpen: false });
    }
  },
  
  render: function() {
    
    var monthHead = formatDateHeading(new Date(this.state.year, this.state.month-1, 1))
      , calendar = Calendar({ key: 1, month: this.state.month, year: this.state.year, cssClass: this.props.cssClass })
      , colHeaders = [];
      
    for(var i=0; i<dayNames.length; i++) {
      colHeaders.push(<th key={i} className={this.props.cssClass+'_dayHead'}>{dayNames[i].toUpperCase()}</th>);
    }
    
    return (
      <div className={this.props.cssClass+'_group'}>
        <i className="icon-calpop-icon" onClick={this.show} style={{ display: !this.state.isOpen ? 'inline-block' : 'none' }}></i>
        <table className={this.props.cssClass} onClick={this.onClick} style={{ display: this.state.isOpen ? 'inline-block' : 'none' }}>
          <thead>
            <tr className={this.props.cssClass+'_row'}>
              <th colSpan="7" className={this.props.cssClass+'_head'}>
                { monthHead }
                <i className={this.props.cssClass+'_icon icon-calpop-left'} onClick={this.goBack}></i>
                <i className={this.props.cssClass+'_icon icon-calpop-right'} onClick={this.goForward}></i>
              </th>
            </tr>
            <tr>
              { colHeaders }
            </tr>
          </thead>
          { calendar }
        </table>
      </div>
    );
    
  }
  
});
