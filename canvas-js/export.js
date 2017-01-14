/*--------------------------------------------------------------------------*/
/*  EXPORT.JS								    */
/*    Routines to export tweets as a CSV file to a PHP server, then hand    */
/*    them back as a download						    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  25-Jun-13	Christopher G. Healey	Initial implementation		    */
/*  15-Jan-14	Christopher G. Healey	Changed write_CSV_line to write a   */
/*					set of 10 lines, rather than 1 line */
/*--------------------------------------------------------------------------*/

//  Module global varialbes

var  add_line_ID;			// Add CSV line callback ID
var  CSV_cb = null;			// CSV callback on write completed
var  CSV_fname = "export.csv";		// CSV filename
var  CSV_line = [ ];			// CSV lines to write to file
var  CSV_line_n = 0;			// Current CSV line to write
var  prog_bar_ID;			// Progress bar callback ID


function add_CSV_line()

  //  Add next CSV line to list of lines to export, this is done in a
  //  separate thread, alongside the thread that updates the progress
  //  bar, to allow both to run in parallel
{
  var  body;				// Tweet's body, w/o comma, newline
  var  dt;				// Tweet's date
  var  i, j;				// Loop counters
  var  line;				// Current CSV line
  var  tw_date;				// Formatted date/time


  i = CSV_line_n;

  dt = new Date( tw[ i ].time );	// Format date to short form
  tw_date = ("00" + ( dt.getMonth() + 1 )).slice( -2 );
  tw_date = tw_date + "-";
  tw_date = tw_date + ("00" + dt.getDate()).slice( -2 );
  tw_date = tw_date + "-";
  tw_date = tw_date + dt.getFullYear().toString().slice( -2 );
  tw_date = tw_date + " ";
  tw_date = tw_date + ("00" + dt.getHours()).slice( -2 );
  tw_date = tw_date + ":" + ("00" + dt.getMinutes()).slice( -2 );
  tw_date = tw_date + ":" + ("00" + dt.getSeconds()).slice( -2 );

  line = tw_date + ",";
  line = line + tw[ i ].name + ",";

  //  Add raw body, minus commas and newlines

  body = tw[ i ].raw;
  body = body.replace( /,/g, ";" );
  body = body.replace( /\n/g, " " ).replace( /\cM/g, " " );

  line = line + body + ",";

  //  Add valence and arousal averages

  line = line + tw[ i ].avg[ VAL ].toFixed( 2 ) + ",";
  line = line + tw[ i ].avg[ ARO ].toFixed( 2 ) + ",";

  //  Add longitude,latitude if they exist, otherwise blanks

  if ( typeof tw[ i ].geo != "undefined" && tw[ i ].geo != null &&
       tw[ i ].geo.lon != 0 && tw[ i ].geo.lat != 0 ) {
    line = line + tw[ i ].geo.lon + "," + tw[ i ].geo.lat;
  } else {
    line = line + ",";
  }

  CSV_line.push( line );		// Push current tweet's CSV line
  CSV_line_n++;

  //  When tweets are captured duplicates are removed, and the dup
  //  field tracks number of duplicates; if we re-import this file via
  //  upload, we need to restore duplicates for the affinity graph, so
  //  we write out dup-1 extra copies of the line

  if ( tw[ i ].dup > 0 ) {		// Duplicates exist?
    line = line.replace( tw[ i ].name, "duplicate" );
    for( j = 0; j < tw[ i ].dup; j++ ) {
      CSV_line.push( line );		// Push duplicate tweet's CSV line
    }
  }

  //  If all lines processed, write CSV file, otherwise setup callback
  //  to add next line

  if ( CSV_line_n >= tw.length ) {
    add_line_ID = -1;
    write_CSV_file();
  } else {
    add_line_ID = setTimeout( add_CSV_line, 2 );
  }
}					// End function add_CSV_line


function encode_CSV_line( line )

  //  This function encodes a raw line's # (needed for proper
  //  interpretation by PHP server) and " (because CSV files use
  //  quotes to define immutable strings)
  //
  //  line:  Line to encode
{
  var  data;				// Encoded line


  data = line;

  //  Remove smart quotes, smart apostrophes, en, em, and horizontal
  //  dashes, and ellipses

  data = data.replace( /[\u201c\u201d]/g, '"' );
  data = data.replace( /[\u2018\u2019]/g, "'" );
  data = data.replace( /[\u2013\u2014\u2015]/g, "-" );
  data = data.replace( /\u2026/g, "..." );

  //  Remove double quotes and newlines because those don't play well
  //  in CSV files

  data = data.replace( /\"/g, "'" ).replace( /\n/g, " " );

  return encodeURIComponent( data );
}					// End function encode_CSV_line


function export_tweets_CSV()

  //  This function exports the current tweet set as a CSV file in the
  //  format:
  //    -  date,user,body,valence,arousal,longitude,latitude
{
  var  body;				// Tweet's body, w/o comma, newline
  var  csv_line = [ ];			// Array of CSV lines to write
  var  dt;				// Tweet's date
  var  i, j;				// Loop counters
  var  line;				// Current CSV line
  var  tw_date;				// Formatted date/time


  query_dlg().dialog( "open" );		// Open query dialog
  query_dlg_title( "Export Tweets" );
  query_dlg_msg( "Export tweets to CSV file..." );

  $( "#prog-bar" ).progressbar( "value", 0 );
  prog_bar_ID = setTimeout( update_CSV_prog_bar, 500 );

  set_CSV_cb( export_tweets_CSV_cb );	// Callback when writes are done

  dt = new Date();
  tw_date = ("00" + ( dt.getMonth() + 1 )).slice( -2 );
  tw_date = tw_date + "-";
  tw_date = tw_date + ("00" + dt.getDate()).slice( -2 );
  tw_date = tw_date + "-";
  tw_date = tw_date + dt.getFullYear().toString().slice( -2 );
  tw_date = tw_date + ".";
  tw_date = tw_date + ("00" + dt.getHours()).slice( -2 );
  tw_date = tw_date + "-" + ("00" + dt.getMinutes()).slice( -2 );
  tw_date = tw_date + "-" + ("00" + dt.getSeconds()).slice( -2 );

  set_CSV_name( "tweet." + tw_date + ".csv" );

  CSV_line = [ ];			// Reset CSV line count and array
  CSV_line_n = 0;

  CSV_line.push( "Date,User,Body,Valence,Arousal,Longitude,Latitude" );

  //  Set callback to add first line to list of lines to export

  add_line_ID = setTimeout( add_CSV_line, 2 );
/*
  for( i = 0; i < tw.length; i++ ) {
    dt = new Date( tw[ i ].time );	// Format date to short form
    tw_date = ("00" + ( dt.getMonth() + 1 )).slice( -2 );
    tw_date = tw_date + "-";
    tw_date = tw_date + ("00" + dt.getDate()).slice( -2 );
    tw_date = tw_date + "-";
    tw_date = tw_date + dt.getFullYear().toString().slice( -2 );
    tw_date = tw_date + " ";
    tw_date = tw_date + ("00" + dt.getHours()).slice( -2 );
    tw_date = tw_date + ":" + ("00" + dt.getMinutes()).slice( -2 );
    tw_date = tw_date + ":" + ("00" + dt.getSeconds()).slice( -2 );

    line = tw_date + ",";
    line = line + tw[ i ].name + ",";

  //  Add raw body, minus commas and newlines

    body = tw[ i ].raw;
    body = body.replace( /,/g, ";" );
    body = body.replace( /\n/g, " " ).replace( /\cM/g, " " );

    line = line + body + ",";

  //  Add valence and arousal averages

    line = line + tw[ i ].avg[ VAL ].toFixed( 2 ) + ",";
    line = line + tw[ i ].avg[ ARO ].toFixed( 2 ) + ",";

  //  Add longitude,latitude if they exist, otherwise blanks

    if ( typeof tw[ i ].geo != "undefined" && tw[ i ].geo != null &&
         tw[ i ].geo.lon != 0 && tw[ i ].geo.lat != 0 ) {
      line = line + tw[ i ].geo.lon + "," + tw[ i ].geo.lat;
    } else {
      line = line + ",";
    }

    csv_line.push( line );		// Push current tweet's CSV line

    //  When tweets are captured duplicates are removed, and the dup
    //  field tracks number of duplicates; if we re-import this file
    //  via upload, we need to restore duplicates for the affinity
    //  graph, so we write out dup-1 extra copies of the line

    if ( tw[ i ].dup > 0 ) {		// Duplicates exist?
      line = line.replace( tw[ i ].name, "duplicate" );
      for( j = 1; j <= tw[ i ].dup; j++ ) {
        csv_line.push( line );		// Push duplicate tweet's CSV line
      }
    }
  }

  write_CSV_file( csv_line );		// Write CSV lines to tweet.csv
*/
}					// End function export_tweets_CSV


function export_tweets_CSV_cb()

  //  Callback for exporting tweets, this function is called when writing
  //  CSV lines is finished, indicated it's safe to load tweet.csv
{
  query_dlg().dialog( "close" );	// Close progress dialog

  if ( prog_bar_ID != -1 ) {		// Terminate progress bar updates
    clearTimeout( prog_bar_ID );
    prog_bar_ID = -1;
  }

  if ( add_line_ID != -1 ) {		// Terminate adding additional data
    clearTimeout( add_line_ID );
    add_line_ID = -1;
  }
}					// End function export_tweets_cb


function reset_CSV_cb()

  //  Reset end-of-write callback
{
  CSV_cb = null;
}					// End function reset_CSV_cb


function set_CSV_cb( cb )

  //  Set a callback, executed when writing of the CSV file completes
  //
  //  cb:  Reference to callback function
{
  if ( typeof cb == "undefined" ) {	// Trying to reset the callback?
    reset_CSV_cb();
  } else {
    CSV_cb = cb;
  }
}					// End function set_CSV_cb


function set_CSV_name( nm )

  //  Set the CSV export filename
  //
  //  nm:  Export filename
{
  CSV_fname = nm;
}					// End function set_CSV_name


function update_CSV_prog_bar()

  //  Update the CSV export progres bar
{
  var  pct;				// Percentage of tweets written to CSV


  //  If dialog was closed, terminate progress bar update callback

  if ( query_dlg().dialog( "isOpen") != true ) {
    if ( CSV_cb != null ) {
      CSV_cb();
      return;
    }
  }

  if ( CSV_line.length > 0 ) {
    pct = Math.floor( CSV_line_n / tw.length * 100.0 );
  } else {
    pct = 0;
  }
  $( "#prog-bar" ).progressbar( "value", pct );

  console.log( "update_CSV_prog_bar(), " + pct + "% done" );
  prog_bar_ID = setTimeout( update_CSV_prog_bar, 500 );
}					// End function update_CSV_prog_bar


function write_CSV_file()

  //  This function builds a URI-based representation of the tweets
  //  stored in the lines array, then uses a hidden link to download
  //  the result as a CSV file
{
  var  blob;				// Data blob for IE export
  var  blob_data;			// Data to encode as IE blob
  var  data = '';			// Tweets encoded for CSV export
  var  IE = false;			// Running IE flag
  var  lines;				// Lines to write to CSV file
  var  pct;				// Percentage of tweets written to CSV
  var  temp_link;			// Temporary link for URI click
  var  uri;				// URI containing data download info


  IE = ( "navigator" in window ) && ( "msSaveOrOpenBlob" in window.navigator );

  //  Save each line as part of the data string, properly encoding
  //  both the contents of the line and the newline for transport via
  //  an HTTP URI

  lines = CSV_line;

  for( i = 0; i < lines.length; i++ ) {
    if ( IE ) {
      data = data + lines[ i ] + '\r\n';
    } else {
      data = data + encode_CSV_line( lines[ i ] ) + encodeURIComponent( '\n' );
    }
  }

  //  Do some initial setup to create an anchor to "click" to simulate
  //  a user request to export data

  temp_link = document.createElement( "a" );
  temp_link.style = "visibility:hidden";
  document.body.appendChild( temp_link );

  //  IE doesn't support URI navigation, but Chrome and Firefox do
  //  (Safari supports URI navigation, but not file naming, sigh), so
  //  we differentiate between browsers here

  if ( IE ) {				// IE10+?
    blob_data = [ '\ufeff' + data ];
    blob = new Blob( blob_data );
    
    temp_link.onclick = function() {
      window.navigator.msSaveOrOpenBlob( blob, CSV_fname );
    };

  } else {				// Not IE

    //  Build URI string as CSV, UTF-8 encoded

    uri = "data:application/csv;charset=utf-8," + data;

    //  Build a temporary, invisible link that we "click" to invoke the
    //  download of the CSV data

    temp_link.href = uri;
    temp_link.download = CSV_fname;
  }

  //  Click link to export CSV, then remove temporary anchor

  temp_link.click();
  document.body.removeChild( temp_link );

  //  Cleanup with the CSV callback, if it's been set

  if ( CSV_cb != null ) {
    CSV_cb();
  }
}					// End function write_CSV_file
