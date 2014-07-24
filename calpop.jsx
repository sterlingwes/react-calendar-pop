/** @jsx React.DOM */

var React = require('react');

var isLeapYear = function(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
};

var daysInMonth = function(date) {
  return [31, (isLeapYear(date.getYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
};

var currentDate = new Date();

module.exports = React.createClass({
  
  getDefaultProps: function() {
    return {
      cssClass:   'calendar_pop'
    };
  },
  
  render: function() {
    
    // values determining calendar layout
    var month = (isNaN(this.props.month) || this.props.month === null) ? currentDate.getMonth() + 1 : this.props.month
      , year  = (isNaN(this.props.year) || this.props.year === null) ? currentDate.getFullYear() : this.props.year
      , firstDay = new Date(year, month - 1, 1)
      , startDay = firstDay.getDay()
      , monthLength = daysInMonth(firstDay)
      , dates = this.props.dates || []
      , cssClass = this.props.cssClass
    ;
    
    var rows = []
      , rowMax = Math.ceil((monthLength + startDay)/7)
      , day = 1
      , emptyDay = '<div class="'+cssClass+'_empty">&nbsp;</div>';
      
    for(var r=0; r<rowMax; r++) {
      var cols = [];
      
      if(r===0 && startDay > 0) {
        for(var s=1;s<=startDay;s++) {
          cols.push(emptyDay);
        }
      }
      
      for(var c=0; c<7; c++) {
        if(day <= monthLength && (r > 0 || c >= startDay)) {
          var calData = [year,month,day].join('/');
          if(dates.indexOf(day)!=-1)  cols.push('<div class="'+cssClass+'_day '+cssClass+'_highlight" data-cal="'+ calData +'">'+day+'</div>');
          if(dates.indexOf(day)==-1)  cols.push('<div class="'+cssClass+'_day" data-cal="'+ calData +'">'+day+'</div>');
          day++;
        }
        else if(r==(rowMax-1)) {
          cols.push(emptyDay);
        }
        cols.push();
      }
      rows.push( '<td>' + cols.join('</td><td>') + '</td>' );
    }
    
    if(rowMax<6) {
      var filler = [];
      for(var e=0; e<7; e++) {
        filler.push(emptyDay);
      }
      if(rowMax==4) rows.push('<td>'+ filler.join('</td><td>') +'</td>');
      rows.push('<td>'+ filler.join('</td><td>') +'</td>');
    }
    
    rows = '<tr>' + rows.join('</tr><tr>') + '</tr>';
    
    return <tbody dangerouslySetInnerHTML={{__html: rows }} />;
    
  }
  
});
