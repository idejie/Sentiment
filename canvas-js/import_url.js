/*--------------------------------------------------------------------------*/
/*  IMPORT_URL.JS							    */
/*    Routines to import a URL file via HTTP, with the format:		    */
/* 									    */
/*      author,[lon lat],body,date					    */
/* 									    */
/*    where 								    */
/* 									    */
/*     - author:     Author of tweet					    */
/*     - [lon lat]:  Optional geocode (blank for none)			    */
/*     - body:       Body of tweet					    */
/*     - date:       Date of tweet					    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  03-Jul-04	Christopher G. Healey	Initial implementation		    */
/*  13-Jul-14	Christopher G. Healey	Switched separator from | to ,	    */
/*  28-Jul-14	Christopher G. Healey	Added ability to read local files   */
/*--------------------------------------------------------------------------*/

//  Module global varialbes

var  CSV_fname;				// CSV filename from file browser
var  load_ID = -1;			// Progress bar timeout ID
var  load_inst;				// Load instructions in dialog
var  load_URL_dlg;			// Load URL dialog
var  parse_err_dlg;			// Parse error dialog
var  import_URL;			// URL to import from
var  skip_all;				// Skip all invalid lines flag
var  tw_cap_file;			// TweetCapture CSV file flag
var  tw_prev;				// Previous tweet set
var  URL_line = [ ];			// Individual lines from URL
var  URL_line_n = 0;			// Current line in data line array


function close_import_prog_bar()

  //  Close the progress bar dialog
{
  query_dlg().dialog( "close" );	// Close progress bar dialog

  if ( load_ID != -1 ) {		// Reset progress bar update callback
    clearTimeout( load_ID );
    load_ID = -1;
  }
}					// End function close_import_prog_bar


function err_bad_browse( msg, fname )

  //  Error to report when user has not used the Browse... button to
  //  build the CSV_fname object needed to read a local file
  //
  //  msg:    Main descriptive error message
  //  fname:  Filename that caused the error
{
  var  err_msg;				// Summary message on error
  var  exp_msg;				// Explanatory message on error


  err_msg = msg;
  exp_msg = "Please use the Browse... button to choose a local file to load";

  show_alert_dlg( err_msg, exp_msg );
}					// End function err_bad_browse


function err_forbidden( msg, URL )

  //  Error to report when client forbidden to access URL
  //
  //  msg:  Main descriptive error message
  //  URL:  URL that caused error
{
  var  err_msg;				// Summary message on error
  var  exp_msg;				// Explanatory message on error


  close_import_prog_bar();

  err_msg = msg;

  exp_msg = "The server stated you do not have permission to access the URL";
  exp_msg += "<p style=\"margin: 10px;\">";
  exp_msg += "<a href=\"" + URL + "\" target=\"_blank\">";
  exp_msg += URL + "</a></p>";

  show_alert_dlg( err_msg, exp_msg );
}					// End function err_forbidden


function err_not_found( msg, URL )

  //  Error to report when URL not found or cannot be read
  //
  //  msg:  Main descriptive error message
  //  URL:  URL that caused error
{
  var  err_msg;				// Summary message on error
  var  exp_msg;				// Explanatory message on error


  close_import_prog_bar();

  err_msg = msg;

  exp_msg = "The URL"
  exp_msg += "<p style=\"margin: 10px;\">";
  exp_msg += "<a href=\"" + URL + "\" target=\"_blank\">";
  exp_msg += URL + "</a></p>";
  exp_msg += "could not be read";

  show_alert_dlg( err_msg, exp_msg );
}					// End function err_not_found


function err_read_file( e )

  //  Error handling during local file read
  //
  //  e:  Error event
{
  var  err_msg;				// Summary message on error
  var  exp_msg;				// Explanatory message on error


  close_import_prog_bar();

  exp_msg = "<p style=\"margin: 10px;\"><b>" + CSV_fname.name + "</b></p>";

  switch( e.target.error.code ) {
  case e.target.error.NOT_FOUND_ERR:
    err_msg = "Unknown input file";
    exp_msg = "The CSV file " + exp_msg + " could not be found";
    break;

  case e.target.error.NOT_READABLE_ERR:
    err_msg = "Unreadable input file";
    exp_msg = "The CSV file " + exp_msg + " could not be read";
    break;

  case e.target.error.NOT_ABORT_ERR:
    err_msg = "File reading terminated";
    exp_msg = "Reading of the CSV file " + exp_msg + " was terminated";
    break;

  default:
    err_msg = "File reading error";
    exp_msg = "An error occured reading CSV file " + exp_msg;
    break;
  }

  show_alert_dlg( err_msg, exp_msg );
}					// End function file_read_err


function err_throw_err( msg, err )

  //  Error reported by either get_url.php or AJAX itself
  //
  //  msg:  Main descriptive error message
  //  err:  Error message thrown
{
  var  err_msg;				// Summary message on error
  var  exp_msg;				// Explanatory message on error


  close_import_prog_bar();

  err_msg = msg;

  exp_msg = "The attempt to load URL";
  exp_msg += "<p style=\"margin: 10px;\">";
  exp_msg += "<a href=\"" + import_URL + "\" target=\"_blank\">";
  exp_msg += import_URL + "</a></p>";
  exp_msg += "produce an error message";
  exp_msg += "<p style=\"margin: 10px;\">" + err + "</p>";

  show_alert_dlg( err_msg, exp_msg );
}					// End function err_throw_err


function finalize_import()

  //  Report number of tweets imported, then update the visualization
  //  to include those tweets
{
  var  exp;				// Loaded versus accepted tweets msg
  var  msg;				// Tweets w/estimated sentiment msg


  $( "#prog-bar" ).progressbar( "value", 100.0 );
  close_import_prog_bar();

  msg = "Sentiment estimated on " + tw.length + " unique tweets";
  exp = "A total of " + URL_line.length + " tweets were read. Of those, "
  exp = exp + tw.length + " tweets were unique had two or more recognized "
  exp = exp + "terms, allowing for an estimate of their sentiment.";

  show_alert_dlg( msg, exp, "Info", "Import Tweets" );
  update_load();
}					// End function finalize_import


function import_data()

  //  Request that data be imported from an external URL or file
{
  tw_cap_file = false;			// Not importing TweetCapture data

  if ( typeof load_URL_dlg == "undefined" ) {
    init_load_URL_dlg();
  }

  load_URL_dlg.dialog( "open" );	// Open Load URL dialog
  $("#load-url-inp").focus();		// Focus, select URL text field
  $("#load-url-inp").select();
}					// End function import_data


function init_load_URL_dlg()

  //  Initialize the load URL dialog
{
  var  html = '\
\
<div>\
\
<p>\
  <span id="load-url-inst">\
    Specify the URL for the data you want to load, or use the Browse button\
    to choose a file.\
  </span>\
</p>\
<p>\
  <div style="overflow: hidden; margin-left: 5px; margin-right: 5px;">\
    <label id="load-url-lbl"\
    style="float: left;\ margin-right: 5px; padding: 0; line-height: 26px;">\
      URL:\
    </label>\
    <button id="browse-btn"\
    style="float: right; margin-left: 5px; margin-right: 5px; padding: 0;">\
      Browse...\
    </button>\
    <span style="display: block; overflow: hidden; line-height: 26px;">\
      <input id="load-url-inp" type="text"\
      style="width: 100%; -moz-box-sizing: border-box;\
      -webkit-box-sizing: border-box; box-sizing: border-box;" />\
    </span>\
    <input id="browse-invoke" type="file" name="files[]"\
    style="display: block; visibility: hidden; width: 0; height: 0;" />\
  </div>\
</p>\
\
<div id="load-url-accordion" style="margin-top: 20px;">\
  <h3>Instructions</h3>\
  <div>\
    <p style="margin-top: 0px;">\
      An external message file is made up of one message per line.\
      Fields on each line are separated with the "," comma character.\
      Each line has the format:\
    </p>\
    <ul style="margin-left: 0px; padding-left: 30px;">\
      <li>author,[longitude latitude],body,date\
    </ul>\
    <p>The four fields have the following meanings:</p>\
    <ul style="margin-left: 0px; padding-left: 30px;">\
      <li><span style="margin-right: 0.25em;">\
        <b>author:</b></span> message author\
      <li><span style="margin-right: 0.25em;">\
        <b>longitude latitude:</b></span> optional message geolocation\
      <li><span style="margin-right: 0.25em;">\
        <b>body:</b></span> message body\
      <li><span style="margin-right: 0.25em;">\
        <b>date:</b></span> message date, formatted <i>MM/DD/YYYY HH:MM:SS</i>\
    </ul>\
    <p>Here are three lines from a hypothetical message file.</p>\
    <p style="margin-left: 15px;">\
      tooscenic,,No geocode is specified for this message,06/29/2013\
      09:11:23<br>\
      GooseHound,-118.25 34.05,Geocodes are longitude latitude,07/02/2013\
      22:12:14<br>\
      redslice,,"Separators,in,quoted,text" are ignored,07/03/2013 00:09:21\
    </p>\
    <p style="margin-bottom: 0px;">\
      Because of the time it takes to process messages, a maximum of\
      1500 messages with estimated sentiment are allowed.\
    </p>\
  </div>\
</div>\
\
</div>\
  ';


  load_URL_dlg = $("<div id=\"load-url-dlg\"></div>" );
  load_URL_dlg.html( html );

  load_URL_dlg.dialog( {
    title: "Load Data",			// Dialog title
    autoOpen: false,
    buttons: {
      "Load": function() {		// Load data from URL button
        var  url;			// URL specified by user

        url = document.getElementById( "load-url-inp" ).value;

        if ( url.length == 0 ) {	// No URL specified?
          show_alert_dlg( "No data source specified",
            "Enter a valid URL or choose a file to load data." );
        } else {			// Load URL's data
          $(this).dialog( "close" );

          //  If URL starts with "file://" assume we're trying to read
          //  a local file, otherwise a URL

          if ( url.indexOf( "file://" ) == 0 ) {
            read_file_data();
          } else {
            read_URL_data( url );
          }
        }
      },
      "Cancel": function() {		// Cancel button
        $(this).dialog( "close" );
      }
    },
    open: function() {

  //  Initialize instruction accordion on first dialog open

      if ( typeof load_inst == "undefined" ) {
        load_inst = $("#load-url-accordion").accordion( {
          collapsible: true,		// All panels can be collapsed
          active: 0,			// Instructions initially open
          autoHeight: true		// Fit to height of content
        } );
      }
    },
    dialogClass: "dialog-drop-shadow",
    resizable: false,
    width: 550,
    modal: true				// Modal so must be dismissed
  } );

  style_txt( "#load-url-lbl" );		// Style URL text field label

  //  First, check to see if the browser supports FileReader
  //  operations, if not, hide Browse button functionality

  if ( !window.File || !window.FileReader ) {
    $("#load-url-inst").
      text( "Specify the URL for the data you want to load." );

    $("#browse-btn").hide();
    $("#browse-invoke").hide();

  } else {

  //  The standard type="file" input displays a Browse... button and
  //  a file label. Since all we want is a jQuery Browse... button,
  //  we must:
  //
  //  - position the Browse... button (id="browse-btn") on our form
  //  - add a hidden input with type="file" (id="browse-invoke") on
  //    our form as well
  //  - when browse-btn is clicked, pass the click to browse-invoke

    $("#browse-btn").button( { label: "Browse..." } );
    $("#browse-invoke").on( "change", set_file );

    $("#browse-btn").click( function() {
      $("#browse-invoke").click();
      $("#load-url-inp").focus();
    } );
  }

  //  Set the URL input field to trigger on Return

  $("#load-url-inp").keydown( function( e ) {
    var  url;				// URL specified by user

    if ( ( e.keyCode == 13 ) ) {
      url = document.getElementById( "load-url-inp" ).value;

      if ( url.length == 0 ) {		// No URL specified?
        show_alert_dlg(
          "No URL specified", "Enter a valid URL to load data." );
      } else {				// Load URL's data
        load_URL_dlg.dialog( "close" );
        read_URL_data( url );
      }

      e.stopPropagation();		// Don't propagate keypress up
      return false;			// Stop IE event bubbling
    }
  } );
}					// End function init_load_URL_dlg


function init_parse_err_dlg()

  //  Initialize the parse error dialog
{
  var  c;				// jQuery theme colour
  var  html;				// HTML to insert into dialog


  c = $(".ui-icon").css( "color" );

  html = "<div>";			// Create dialog's HTML
  html += "<table>";
  html += "<tr style=\"vertical-align: middle;\">";
  html += "<td style=\"padding-left: 1em; padding-right: 1em;\">";
  html += "<i class=\"icon-warning-sign icon-2x\" ";
  html += "style=\"color: " + c + ";\"></i>";
  html += "</td>";
  html += "<td style=\"font-weight: bold; font-size: 1.2em;\">";
  html += "<span id=\"parse-err-msg\"></span>";
  html += "</td>";
  html += "</tr>";
  html += "<tr>";
  html += "<td></td>";
  html += "<td style=\"font-weight: normal; padding-top: 1em;\">";
  html += "<span id=\"parse-err-info\"></span>";
  html += "</td>";
  html += "</tr>";
  html += "</table>";
  html += "</div>";

  parse_err_dlg = $("<div id=\"parse-err-dlg\"></div>" );
  parse_err_dlg.html( html );

  parse_err_dlg.dialog( {
    title: "Parse Error",		// Dialog title
    autoOpen: false,
    buttons: {
      "Skip": function() {		// Skip bad line button
        $(this).dialog( "close" );

        URL_line_n++;			// Skip current line, continue
        setTimeout( parse_import, 4 );
      },
      "Skip All": function() {		// Auto skip all bad lines
        $(this).dialog( "close" );
        skip_all = true;

        URL_line_n++;			// Skip current line, continue
        setTimeout( parse_import, 4 );
      },
      "Stop": function() {		// Stop on bad line button
        $(this).dialog( "close" );
        finalize_import();
      },
      "Cancel": function() {		// Cancel on bad line
        $(this).dialog( "close" );	// Abandon import
        tw = tw_prev;

        close_import_prog_bar();
      }
    },
    dialogClass: "dialog-drop-shadow",
    resizable: false,
    width: 500,
    modal: true				// Modal so must be dismissed
  } );
}					// End function init_parse_err_dlg();


function parse_import( data )

  //  Parse an input file of tweets of format:
  //
  //    - author,[lon lat],body,date
  //
  //  data:  Entire input file's contents
{
  var  i, j;				// Loop counters
  var  geo;				// Geocode { lon, lat }
  var  link;				// User's profile link on twitter
  var  ln;				// Currrent line
  var  err_msg;				// Summary message on error
  var  exp_msg;				// Explanatory message on error
  var  tok;				// Tokens in current line
  var  tw_obj;				// Current tweet object


  while( URL_line_n < URL_line.length && URL_line[ URL_line_n ].length == 0 ) {
    URL_line_n++;
  }

  //  If all lines processed, update the visualization, stop recursion

  if ( URL_line_n >= URL_line.length ) {
    finalize_import();
    return;
  }

  //  Strip off any spurious PC-based "\r" at the end of the line

  while( URL_line[ URL_line_n ].slice( -1 ) == "\r" ) {
    URL_line[ URL_line_n ] = URL_line[ URL_line_n ].slice( 0, -1 );
  }

  //  We want to allow data from the TweetCapture utility to be
  //  imported directly, but it has a different format from what we
  //  expect, so we detect a TweetCapture CSV file based on its header
  //  line, and set a flag to transform its format to ours

  if ( URL_line_n == 0 &&
       URL_line[ 0 ] == "id,dt_tm,lang,retweet,name,body,lat,lon" ) {
    tw_cap_file = true;
    URL_line.splice( 0, 1 );
  }

  //  First, divide line into unquoted and quoted blocks, for each
  //  quoted block temporarily replace , with :comma:, reassemble the
  //  line and we can now split on ,

  tok = URL_line[ URL_line_n ].match( /("[^"]+"|[^"]+)/g );
  if ( tok == null ) {
    URL_line_n++;
    setTimeout( parse_import, 4 );
    return;
  }

  ln = "";
  for( i = 0; i < tok.length; i++ ) {
    if ( tok[ i ].indexOf( "\"" ) != -1 ) {

  //  If quoted block has commas, replace them with :comma: and remove
  //  the quotes, otherwise leave the quoted block unchanged

      if ( tok[ i ].indexOf( "," ) != -1 ) {
        ln = ln + tok[ i ].replace( /\,/g, ":comma:" ).replace( /"/g, "" );
      } else {
        ln = ln + tok[ i ];
      }

    } else {				// Unquoted block, leave unchanged
      ln = ln + tok[ i ];
    }
  }

  tok = ln.split( /\,/ );

  if ( tw_cap_file ) {			// TweetCapture input file?
    tok = parse_tw_cap_line( tok );	// Convert to our expected format
  }

  if ( tok.length != 4 ) {		// Invalid token count?
    err_msg = "Incorrect number of tokens";
    exp_msg = "Four tokens were expected on line " + ( URL_line_n + 1 );
    exp_msg += ", but " + tok.length + " tokens were found.";

    show_parse_err_dlg( err_msg, exp_msg, URL_line[ URL_line_n ] );
    return;
  }

  for( i = 0; i < tok.length; i++ ) {	// Restore original , characters
    tok[ i ] = tok[ i ].replace( /:comma:/g, "," );
  }

  geo = tok[ 1 ].split( " " );		// Try to parse geocode
  if ( geo.length != 2 ) {
    geo = null;
  } else {
    geo = { "coordinates": [ geo[ 0 ], geo[ 1 ] ] };
  }

  //  Check for valid date format

  if ( isNaN( Date.parse( tok[ 3 ] ) ) ) {
    err_msg = "Incorrect date";
    exp_msg = "The date \"<i>" + tok[ 3 ] + "</i>\" ";
    exp_msg += "on line " + ( URL_line_n + 1 ) + " is not valid.";

    show_parse_err_dlg( err_msg, exp_msg, URL_line[ URL_line_n ] );
    return;
  }

  //  Check for valid latitude and longitude

  if ( geo != null ) {
    if ( isNaN( geo.coordinates[ 0 ] ) || isNaN( geo.coordinates[ 1 ] ) ) {
      err_msg = "Incorrect geolocation";
      exp_msg = "The latitude and longitude \"<i>" + tok[ 1 ] + "</i>\" ";
      exp_msg += "on line " + ( URL_line_n + 1 ) + " are not valid.";

      show_parse_err_dlg( err_msg, exp_msg, URL_line[ URL_line_n ] );
      return;
    }

    if ( geo.coordinates[ 0 ] < -180 || geo.coordinates[ 0 ] > 180 ) {
      err_msg = "Longitude out-of-range";
      exp_msg = "The longitude \"<i>" + geo.coordinates[ 0 ] + "</i>\" ";
      exp_msg += "on line " + ( URL_line_n + 1 ) + " is not in the ";
      exp_msg += "valid range of -180..180";

      show_parse_err_dlg( err_msg, exp_msg, URL_line[ URL_line_n ] );
      return;
    }

    if ( geo.coordinates[ 1 ] < -90 || geo.coordinates[ 1 ] > 90 ) {
      err_msg = "Latitude out-of-range";
      exp_msg = "The latitude \"<i>" + geo.coordinates[ 1 ] + "</i>\" ";
      exp_msg += "on line " + ( URL_line_n + 1 ) + " is not in the ";
      exp_msg += "valid range of -90..90";

      show_parse_err_dlg( err_msg, exp_msg, URL_line[ URL_line_n ] );
      return;
    }
  }

  //  Use a standard link to twitter user's public stream

  link = "http://twitter.com/" + tok[ 0 ];

  tw_obj = build_tweet_obj( tok[ 2 ], tok[ 0 ], tok[ 3 ], geo, link, false );

  if ( typeof tw_obj != "undefined" ) {
    if ( tw.length >= 1500 ) {		// Only allow 1500 tweets w/sentiment
      err_msg = "The import file is too large";
      exp_msg = "The number of messages being imported exceeds the ";
      exp_msg += "maximum allowed limit of 1500 messages. Only the first ";
      exp_msg += "1500 messages with sentiment estimates will be shown.";

      show_alert_dlg( err_msg, exp_msg );
      setTimeout( finalize_import, 100 );
      return;
    }

    tw.push( tw_obj );
  }

  URL_line_n++;				// Parse next line
  setTimeout( parse_import, 4 );
}					// End function parse_import


function parse_tw_cap_line( tok )

  //  In order to integrate with the TweetCapture utility, if we
  //  recognize the input is from TweetCapture, we convert its input
  //  format to the format requried by TweetViz
  //
  //  TweetCapture output format:
  //  - id, dt_tm, lang, retweet, name, body, [lat], [lon]
  //
  //  TweetViz import format:
  //  - name, [lon lat], body, dt_tm
  //
  //  tok:  Array of tokens from original TweetCapture input line
{
  var  tw_date;				// Formatted tweet date
  var  tz_pos;				// Timezone position in date
  var  viz_tok = [ ];			// Tokens in proper import format
  var  yr_pos;				// Year position in date


  viz_tok.push( tok[ 4 ] );		// Author

  //  Longitude and latitude, if they exist

  if ( tok.length >= 8 && tok[ 6 ].length > 0 && tok[ 7 ].length > 0 ) {
    viz_tok.push( tok[ 7 ] + " " + tok[ 6 ] );
  } else {
    viz_tok.push( "" );
  }

  viz_tok.push( tok[ 5 ] );		// Body

  //  Use moment.js (http://momentjs.com) to convert Twitter date,
  //  which uses format: Tue Jul 29 15:08:15 +0000 2014, into an
  //  import date, which uses format: 07/29/2014 15:08:15

  tw_date = moment( tok[ 1 ], "ddd MMM DD HH:mm:ss +0000 YYYY" );
  viz_tok.push( tw_date.format( "MM/DD/YYYY HH:mm:ss" ) );

  return viz_tok;
}					// End function parse_tw_cap_line


function process_file_data( e )

  //  Parse data read from a local file
  //
  //  e:  Event object
{
  var  data;				// Data to parse


  tw_prev = tw;				// Save old tweet set, init new one
  tw = [ ];

  query_term = CSV_fname.name;

  $( "#prog-bar" ).progressbar( "value", 0 );
  load_ID = setTimeout( update_prog_bar, 3000 );

  //  Results often has trailing newlines, so remove them

  data = e.target.result;

  while( data.length > 0 && data[ data.length - 1 ] == '\n' ) {
    data = data.slice( 0, -1 );
  }
    
  URL_line_n = 0;			// Start parsing data lines
  URL_line = data.split( "\n" );
  setTimeout( parse_import, 4 );
}					// End function process_file_data


function read_file_data()

  //  Read data from a local file
{
  var  fname;				// Base filename to read load
  var  reader;				// Filereader object


  //  Ensure CSV filename was properly populated through an <input
  //  type="file"> Browse button operation

  if ( Object.prototype.toString.call( CSV_fname ) != "[object File]" ) {
    err_bad_browse( "Invalid file selection", "unknown" );
    return;
  }

  //  Ensure filename requested matches filename chosen during browse,
  //  i.e., ensure user didn't manually change filename after browse

  fname = document.getElementById( "load-url-inp" ).value.substr( 7 );
  if ( fname != CSV_fname.name ) {
    err_bad_browse( "Invalid filename", fname );
    return;
  }

  query_dlg().dialog( "open" );		// Open query dialog w/progress bar
  query_dlg_title( "Import Tweets" );
  query_dlg_msg( "Importing tweets from file..." );

  $( "#prog-bar" ).progressbar( "value", 0 );

  reader = new FileReader();
  reader.onload = process_file_data;
  reader.onerror = err_read_file;

  reader.readAsText( CSV_fname );
}					// End function read_file_data


function read_URL_data( url )

  //  Read data from a URL file
  //
  //  url:  URL of file to read from
{
  var  import_PHP;			// PHP + URL to import


  skip_all = false;			// Don't auto skip invalid lines

  query_dlg().dialog( "open" );		// Open query dialog w/progress bar
  query_dlg_title( "Import Tweets" );
  query_dlg_msg( "Importing tweets from URL..." );

  $( "#prog-bar" ).progressbar( "value", 0 );
  load_ID = setTimeout( update_prog_bar, 3000 );

  import_URL = url;
  import_PHP = PHP_URL() + "get_url.php?fname=" + import_URL;

  $.ajax( {
    url: import_PHP,
    dataType: "jsonp",
    timeout: 15000,			// 15-second timeout

    success: function( data, status, jqXHR ) {
      var  err_msg;			// Summary message on error
      var  exp_msg;			// Explanatory message on error

      //  No data returned or NULL data returned

      if ( data == false || data == null ) {
        err_not_found( "An error occurred reading data", import_URL );

      //  Server returned "403 Forbidden" error

      } else if ( typeof( data ) == "string" &&
                  data.toLowerCase().indexOf( "403 forbidden" ) != -1 ) {
        err_forbidden( "Server reported URL cannot be accessed", import_URL );

      //  Server returned "404 Not Found" error

      } else if ( typeof( data ) == "string" &&
                  data.toLowerCase().indexOf( "404 not found" ) != -1 ) {
        err_not_found( "Server reported URL does not exist", import_URL );

      //  get_php.url error message returned

      } else if ( data.hasOwnProperty( 'msg' ) ) {
        err_throw_err( "An error occurred importing data", data.msg );

      //  Real data returned

      } else {
        tw_prev = tw;			// Save old tweet set, init new one
        tw = [ ];

	if ( import_URL.lastIndexOf( '/' ) >= 0 ) {
          query_term = import_URL.substr( import_URL.lastIndexOf( '/' ) + 1 );
        } else {
          query_term = import_URL;
        }

	//  Results often has trailing newlines, so remove them

        while( data.length > 0 && data[ data.length - 1 ] == '\n' ) {
          data = data.slice( 0, -1 );
        }
    
        URL_line_n = 0;			// Start parsing data lines
        URL_line = data.split( "\n" );
        setTimeout( parse_import, 4 );
      }
    },

    error: function( jqXHR, status, err ) {
      if ( typeof err == "undefined" ) {
        err = "Error loading URL";
      }

      err_throw_err( "An error occurred importing data", err );
    }
  } );
}					// End function read_URL_data


function set_file( e )

  //  Store file info as chosen by the user through the file browser
  //
  //  e:  Event result
{
  CSV_fname = e.target.files[ 0 ];
  $("#load-url-inp").val( "file://" + CSV_fname.name );
}					// End function set_file


function show_parse_err_dlg( msg, exp, line )

  //  Show the parse error dialog
  //
  //  msg:   Main dialog message
  //  exp:   Explanation of error
  //  line:  Line causing parse error
{
  var  sub;				// Sub-message string


  if ( skip_all ) {			// User asked to skip all bad lines?
    URL_line_n++;			// Skip current line, continue
    setTimeout( parse_import, 4 );

  } else {
    if ( typeof parse_err_dlg == "undefined" ) {
      init_parse_err_dlg();
    }

    sub = exp;
    sub += "<p style=\"margin: 15px;\"><b>" + line + "</b></p>";
    sub += "Choose wheher to skip this line, stop importing, or cancel ";
    sub += "the import operation.";

    $("#parse-err-msg").html( msg );
    $("#parse-err-info").html( sub );

    parse_err_dlg.dialog( "open" );
  }
}					// End function show_parse_err_dlg


function update_prog_bar()

  //  Update the load progress bar for URL reading
{
  var  pct;				// Percentage of tweets read from URL


  if ( URL_line.length > 0 ) {
    pct = Math.floor( URL_line_n / URL_line.length * 75.0 );
  } else {
    pct = 100;
  }
  $( "#prog-bar" ).progressbar( "value", pct );

  load_ID = setTimeout( update_prog_bar, 3000 );
}					// End function update_prog_bar
