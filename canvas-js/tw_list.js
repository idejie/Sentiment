/*--------------------------------------------------------------------------*/
/*  TW_LIST.JS								    */
/*    Routines to display tweets in a Datatable table			    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  18-Apr-13	Christopher G. Healey	Initial implementation		    */
/*  17-Feb-14	Christopher G. Healey	Added support for optional URL	    */
/*--------------------------------------------------------------------------*/

function update_tw_list()

  //  Update the table with new tweet information
{
  var  col;				// Link colour
  var  dt;				// Tweet's date
  var  dt_str;				// Date string MM/DD/YYYY HH:MM:SS
  var  i;				// Loop counter
  var  tbl;				// Datatable to update
  var  tw_date;				// Formatted date/time
  var  tw_fmt = [ ];			// Formatted tweets
  var  tw_name;				// Formatted name w/optional link


  col = rgb2hex( default_txt_c() );

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    dt = new Date( tw[ i ].time );	// Format date to short form

    tw_date = ("00" + ( dt.getMonth() + 1 )).slice( -2 );
    tw_date = tw_date + "-";
    tw_date = tw_date + ("00" + dt.getDate()).slice( -2 );
    tw_date = tw_date + "-";
    tw_date = tw_date + dt.getFullYear().toString().slice( -2 );
    tw_date = tw_date + " ";
    tw_date = tw_date + ("00" + dt.getHours()).slice( -2 );
    tw_date = tw_date + ":" + ("00" + dt.getMinutes()).slice( -2 );

    if ( tw[ i ].link != null ) {	// Link around name, if it exists
      tw_name = "<a href=\"" + tw[ i ].link + "\" ";
      tw_name = tw_name + "style=\"color: " + col + "\" target=\"_blank\">";
      tw_name = tw_name + tw[ i ].name + "</a>";
    } else {
      tw_name = tw[ i ].name;
    }

    tw_fmt.push( {			// Add a row to the tweet list
      time: tw_date,
      name: tw_name,
      val: tw[ i ].avg[ VAL ].toFixed( 2 ),
      aro: tw[ i ].avg[ ARO ].toFixed( 2 ),
      fmt: tw[ i ].fmt
    } );
  }

  tbl = $("#tweet-tbl").DataTable();

  tbl.clear().draw();			// Clear table
  tbl.rows.add( tw_fmt ).draw();	// Add data to table
  tbl.columns.adjust();			// Adjust column widths to fit data
}					// End function update_tw_list


function init_tw_list()

  //  Initialize the tweet list table
{
  //  To sort our short date format:
  //
  //  - mm-dd-yy hh:mm
  //
  //  we need to define custom ascending and descending sort functions
  //  for Datatable to use

  jQuery.fn.dataTableExt.oSort[ 'date-time-asc' ] = function( x, y ) {
    var  x_tok;
    var  y_tok;

    x_tok = x.split( /[-: ]/ );
    y_tok = y.split( /[-: ]/ );

    //  Check for earlier year

    if ( parseInt( x_tok[ 2 ] ) < parseInt( y_tok[ 2 ] ) )
      return -1;
    else if ( parseInt( x_tok[ 2 ] ) > parseInt( y_tok[ 2 ] ) )
      return 1;

    //  Check for earlier month

    else if ( parseInt( x_tok[ 0 ] ) < parseInt( y_tok[ 0 ] ) )
      return -1;
    else if ( parseInt( x_tok[ 0 ] ) > parseInt( y_tok[ 0 ] ) )
      return 1;

    //  Check for earlier day

    else if ( parseInt( x_tok[ 1 ] ) < parseInt( y_tok[ 1 ] ) )
      return -1;
    else if ( parseInt( x_tok[ 1 ] ) > parseInt( y_tok[ 1 ] ) )
      return 1;

    //  Check for earlier hour (we use 24-hr format to simplify this)

    else if ( parseInt( x_tok[ 3 ] ) < parseInt( y_tok[ 3 ] ) )
      return -1;
    else if ( parseInt( x_tok[ 3 ] ) > parseInt( y_tok[ 3 ] ) )
      return 1;

    //  Check for earlier minute

    else if ( parseInt( x_tok[ 4 ] ) < parseInt( y_tok[ 4 ] ) )
      return -1;
    else if ( parseInt( x_tok[ 4 ] ) > parseInt( y_tok[ 4 ] ) )
      return 1;

    else				// Return dates are identical
      return 0;
  }					// End date-time-asc sort function

  jQuery.fn.dataTableExt.oSort[ 'date-time-desc' ] = function( x, y ) {
    var  x_tok;
    var  y_tok;

    x_tok = x.split( /[-: ]/ );
    y_tok = y.split( /[-: ]/ );

    if ( parseInt( x_tok[ 2 ] ) < parseInt( y_tok[ 2 ] ) )
      return 1;
    else if ( parseInt( x_tok[ 2 ] ) > parseInt( y_tok[ 2 ] ) )
      return -1;

    else if ( parseInt( x_tok[ 0 ] ) < parseInt( y_tok[ 0 ] ) )
      return 1;
    else if ( parseInt( x_tok[ 0 ] ) > parseInt( y_tok[ 0 ] ) )
      return -1;

    else if ( parseInt( x_tok[ 1 ] ) < parseInt( y_tok[ 1 ] ) )
      return 1;
    else if ( parseInt( x_tok[ 1 ] ) > parseInt( y_tok[ 1 ] ) )
      return -1;

    else if ( parseInt( x_tok[ 3 ] ) < parseInt( y_tok[ 3 ] ) )
      return 1;
    else if ( parseInt( x_tok[ 3 ] ) > parseInt( y_tok[ 3 ] ) )
      return -1;

    else if ( parseInt( x_tok[ 4 ] ) < parseInt( y_tok[ 4 ] ) )
      return 1;
    else if ( parseInt( x_tok[ 4 ] ) > parseInt( y_tok[ 4 ] ) )
      return -1;

    else
      return 0;
  }					// End date-time-desc sort function

  tbl = $("#tweet-tbl").DataTable( {	// Build the table structure
    "scrollY": "309px",			// Fixed-height scrolling
    "paginate": false,			// Don't paginate
    "scrollCollapse": false,		// Collapse table height for few rows
    "columns": [			// Column names, JSON identifiers
      {					//  Date column
        "title": "Date",
        "data": "time",
        "className": "tbl_nowrap",	//  HTML style so nowrap on date column
        "orderDataType": "date-time" 	//  Used to enable date-time sort fns
      },
      {					//  Username column
        "title": "User", "data": "name"
      },
      {					//  Valence column
        "title": "<i>v</i>", "data": "val"
      },
      {					//  Arousal column
        "title": "<i>a</i>", "data": "aro"
      },
      {					//  Tweet body column
        "title": "Tweet", "data": "fmt"
      }
    ]
  } );

  //  If user clicks on a tweet row, show the tweet in an info dialog

  $("#tweet-tbl tbody").on( "click", "tr", function() {
    var  i;				// Row index clicked
    var  tbl;				// Datatable clicked

    tbl = $("#tweet-tbl").DataTable();
    i = tbl.row( this ).index();

    show_info_dlg( [ i ] );
  } );
}					// End function init_tw_list()
