/*--------------------------------------------------------------------------*/
/*  TIMELINE.JS								    */
/*    Routines to visualize tweet counts by time as a positive-negative	    */
/*    stacked column chart (top for green, positive tweet counts, bottom    */
/*    for blue, negative tweet counts). Highcarts series map as follows:    */
/*									    */
/*      - 0: Relaxed, valence >= 5, arousal < 5				    */
/*      - 1: Happy, valence >= 5, arousal >= 5				    */
/*      - 2: Unhappy, valence < 5, arousal < 5				    */
/*      - 3: Upset, valence < 5, arousal >= 5				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  24-Apr-13	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  chart;				// Stacked cloumn chart
var  div = [				// Bin sizes in msec
  1000, 5000, 15000, 30000,		//  1 sec, 5 sec, 15 sec, 30 sec
  60000, 300000, 900000, 1800000,	//  1 min, 5 min, 15 min, 30 min
  3600000, 21600000, 43200000,		//  1 hr, 6 hr, 12 hr
  86400000, 1296000000, 2592000000,	//  1 day, 15 days, 30 days
  15552000000				//  180 days
];
var  div_i = 0;				// Index of current bin size


function custom_tooltip_fmt( col )

  //  Custom formatter for tooltips for stacked columns
  //
  //  col:  Column information passed to tooltip
{
  var  body =				// Body of tooltip, initially default
         col.series.tooltipOptions.pointFormat;
  var  dt_fmt;				// Formatted X-axis date
  var  head =				// Header of tooltip, initially default
         col.series.tooltipOptions.headerFormat;
  var  i, j;
  var  s = col.series.chart.series;	// Chart's series array
  var  tot = 0;				// Sum of column's stacks
  var  x = col.point.x;			// X-position of column


  //  Format date, replace placeholder in header with results

  if ( div_i < 4 ) {			// Bin size is seconds?
    dt_fmt = Highcharts.dateFormat( "%b %e %l:%M:%S%P", col.x );
  } else if ( div_i < 11 ) {		// Bin size is minutes or hours?
    dt_fmt = Highcharts.dateFormat( "%b %e %l:%M%P", col.x );
  } else if ( div_i < 12 ) {		// Bin size is day
    dt_fmt = Highcharts.dateFormat( "%b %e", col.x );
  } else if ( div_i < 13 ) {		// Bin size is days
    dt_fmt = Highcharts.dateFormat( "%b %e/%y", col.x );
  } else {				// Bin size is months
    dt_fmt = Highcharts.dateFormat( "%b %y", col.x );
  }

  head = head.replace( "{point.key}", dt_fmt );

  //  Format body by replacing placeholders and Math.abs()'ing the
  //  Y-value so it's always shown positive

  body = body.replace( "{series.color}", col.series.color );
  body = body.replace( "{series.name}", col.series.name );
  body = body.replace( "{point.y}", Math.abs( col.point.y ) );

  //  Find which data element this X-position corresponds to

  for( i = 0, j = -1; i < s[ 0 ].data.length; i++ ) {
    if ( s[ 0 ].data[ i ].x == x ) {
      j = i;
      break;
    }
  }

  if ( j != -1 ) {			// If valid X-position found
    for( i = 0; i < s.length; i++ ) {	// Sum heights of stacks
      tot += Math.abs( s[ i ].data[ j ].y );
    }

    //  Append a "Total" line to the tooltip's body

    body = body + "<span>Total: <b>" + tot + "</b></span><br/>";
  }

  return head + body;			// Return formatted result
}					// End function custom_tooltip_fmt


function init_timeline()

  //  Initialize Highchart to show chart of tweet volume over time
{
  Highcharts.setOptions( {
    global: {
      useUTC: false			// Use browser's local timezone
    }
  } );

  chart = new Highcharts.Chart( {
    chart: {
      renderTo: "timeline-div",		// ID of div to hold chart
      type: "column"
    },
    credits: {
      enabled: false			// No Highcharts.com text
    },
    legend: {
      backgroundColor: "#ffffff",
      align: "left",
      floating: true,
      verticalAlign: "top",
      x: 50,
      y: 0 
    },
    plotOptions: {
      column: {
        borderWidth: 1,
        stacking: "normal"
      },
      series: {
        pointPadding: 0.1,		// Tight padding between columns
        groupPadding: 0
      }
    },
    series: [ {
      color: "rgb(67,155,112)",
      data: [ ],
      name: "Relaxed",
    }, {
      color: "rgb(101,169,139)",
      data: [ ],
      name: "Happy",
    }, {
      color: "rgb(62,145,206)",
      data: [ ],
      name: "Unhappy"
    }, {
      color: "rgb(100,161,209)",
      data: [ ],
      name: "Upset",
    } ],
    subtitle: {
      align: "right"
    },
    title: {
      text: null			// No chart title
    },
    tooltip: {
      formatter: function() {		// Custom format tooltip
        return custom_tooltip_fmt( this );
      }
    },
    xAxis: {
      type: "datetime",			// X-axis is time
      title: {
        text: "Time"
      },
      dateTimeLabelFormats: {
        millisecond: "%%l:%M:%S.%L",
        second: "%l:%M:%S",
        minute: "%l:%M%P",
        hour: "%l:%M%P",
        day: "%b %e",
        week: "%b %e",
        month: "%b '%y",
        year: "%Y"
      }
    },
    yAxis: {
      allowDecimals: false,		// No decimals on Y-labels
      labels: {
        formatter: function() {		// Remove negative from lower columns
          return Math.abs( this.value );
        }
      },
      title: {
        text: "Tweet Count"
      }
    }
  } );
}					// End functon init_timeline


function resize_timeline()

  //  Resize timeline's width to its div's width
{
  var  w;				// Div width


  w = $("#timeline-div").width();
  chart.setSize( w, 400, false );
}					// End function resize_timeline


function update_timeline()

  //  Update timeline graph after new tweets are loaded
{
  var  bin_max = 75;			// Maximum allowed bins
  var  dt = [ ];			// Tweet's dates, in msec
  var  dt_min;				// Minimum date, in msec
  var  dt_max;				// Maximum date, in msec
  var  i;				// Loop counter
  var  h;				// Histogram entry
  var  h_i;				// Histogram index
  var  hist = [ { }, { }, { }, { } ];	// Temporal histograms
  var  msec;				// Tweet bin's time in msec
  var  n;				// Number of bins in histogram


  chart.series[ 0 ].setData( [ ] );	// Clear chart's data
  chart.series[ 1 ].setData( [ ] );
  chart.series[ 2 ].setData( [ ] );
  chart.series[ 3 ].setData( [ ] );

  if ( tw.length <= 0 ) {		// No tweets to plot?
    chart.setTitle( { }, { text: "" } );
    return;
  }

  //  Calculate tweets' dates and date range, in milliseconds

  dt.push( new Date( tw[ 0 ].time ).getTime() );
  dt_max = dt[ 0 ];
  dt_min = dt[ 0 ];

  for( i = 1; i < tw.length; i++ ) {
    dt.push( new Date( tw[ i ].time ).getTime() );
    dt_max = Math.max( dt[ i ], dt_max );
    dt_min = Math.min( dt[ i ], dt_min );
  }

  div_i = 0;				// Start at smallest bin width

  do {					// Find bin width s.t. # bin <= bin_max
    n = Math.ceil( ( dt_max / div[ div_i ] ) - ( dt_min / div[ div_i ] ) );
    div_i++;
  }
  while( n > bin_max && div_i < div.length );

  div_i--;				// Back up to bin width actually used

  for( i = 0; i < tw.length; i++ ) {	// Build histogram counts
    dt[ i ] = Math.round( dt[ i ] / div[ div_i ] );

    //  Choose histogram to inc based on tweet's sentiment position

    if ( tw[ i ].avg[ VAL ] >= 5 && tw[ i ].avg[ ARO ] < 5 ) {
      h_i = 0;
    } else if ( tw[ i ].avg[ VAL ] >= 5 && tw[ i ].avg[ ARO ] >= 5 ) {
      h_i = 1;
    } else if ( tw[ i ].avg[ VAL ] < 5 && tw[ i ].avg[ ARO ] < 5 ) {
      h_i = 2;
    } else {
      h_i = 3;
    }

    //  If this is the first time the given bin position is seen,
    //  initialize its count in all the histograms

    if ( !hist[ h_i ].hasOwnProperty( dt[ i ] ) ) {
      hist[ 0 ][ dt[ i ] ] = 0;
      hist[ 1 ][ dt[ i ] ] = 0;
      hist[ 2 ][ dt[ i ] ] = 0;
      hist[ 3 ][ dt[ i ] ] = 0;
    }

    hist[ h_i ][ dt[ i ] ]++;		// Increment target histogram's count
  }					// End for all tweets

  //  Highcharts goes wonky if the dates aren't added to the chart in
  //  sorted order (?), so we and sort them

  dt = [ ];
  for( h in hist[ 0 ] ) {
    dt.push( h );
  }

  dt.sort( function( t0, t1 ) {
    return t0 - t1;
  } );

  //  Because of how we built the histograms, they all have exactly
  //  the same set of bin keys

  for( i = 0; i < dt.length; i++ ) {

    //  For a datetime axis, x-value is number of UTC milliseconds since
    //  0-time (Jan 1, 1970)

    msec = dt[ i ] * div[ div_i ];

    //  Add data to chart, but don't redraw until we're done adding

    chart.series[ 0 ].addPoint( [ msec, hist[ 0 ][ dt[ i ] ] ], false );
    chart.series[ 1 ].addPoint( [ msec, hist[ 1 ][ dt[ i ] ] ], false );
    chart.series[ 2 ].addPoint( [ msec, -hist[ 2 ][ dt[ i ] ] ], false );
    chart.series[ 3 ].addPoint( [ msec, -hist[ 3 ][ dt[ i ] ] ], false );
  }

  draw_query_term( "timeline-div" );
  chart.redraw();			// Redraw updated chart
}					// End function update_timeline
