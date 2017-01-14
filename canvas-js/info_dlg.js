/*--------------------------------------------------------------------------*/
/*  INFO_DLG.JS								    */
/*    Routines to manage information dialogs, shown when a user clicks on   */
/*    a tweet circle							    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  dlg = [ ];				// Active dialogs
var  dlg_x = 5;				// Current x-offset of dialog in canvas
var  dlg_y = 5;				// Current x-offset of dialog in canvas
var  info_id = 1;			// Current info dialog's unique ID


function close_all_info_dlg()

  //  Close all active info dialogs

{
  var  i;				// Loop counter


  for( i = 0; i < dlg.length; i++ ) {
    dlg[ i ].dialog( "destroy" ).remove();
  }

  dlg.splice( 0, dlg.length );		// Clear active dialog list
}					// End function close_all_info_dlg


function close_info_dlg( tg_dlg )

  //  Close individual info dialog
  //
  //  tg_dlg:  Dialog to close
{
  var  i;				// Loop counter
  var  id;				// Dialog's ID


  id = get_dlg_ID( tg_dlg );		// Get target dialog's ID

  for( i = 0; i < dlg.length; i++ ) {	// Remove reference in dialog array
    if ( get_dlg_ID( dlg[ i ] ) == id ) {
      dlg.splice( i, 1 );
      break;
    }
  }

  tg_dlg.dialog( "destroy" ).remove();
}					// End function close_info_dlg


function get_dlg_ID( tg_dlg )

  //  Get dialog's unique ID
  //
  //  tg_dlg:  Dialog to close
{
  var  beg;				// Beginning of ID string
  var  end;				// End of ID string
  var  html_str;			// Dialog's HTML
  var  id;				// Dialog's ID (index)


  html_str = tg_dlg[ 0 ].innerHTML;
  beg = html_str.indexOf( "txt-" ) + 4;
  end = html_str.substr( beg ).indexOf( "\"" );

  return html_str.substr( beg, end );
}					// End function get_dlg_ID


function show_info_dlg( tw_ID )

  //  Show an information dialog containing the given tweets' text
  //
  //  tw_ID:  ID of tweet(s) to display
{
  var  canvas_ID;			// Canvas HTML id
  var  col_neg;				// Negative term URL color
  var  col_pos;				// Positive term URL color
  var  h;				// Canvas height
  var  i, j;				// Loop counters
  var  info_btn_id;			// Dialog's button ID
  var  info_div_id;			// Dialog's div ID
  var  info_dlg;			// Information dialog
  var  info_txt_id;			// Dialog's label ID
  var  tweet;				// Current tweet object
  var  txt;				// Text for current tweet
  var  off;				// Canvas offset on page
  var  w;				// Canvas width


  if ( tw_ID.length == 0 ) {		// No tweets under mouse?
    return;
  }

  // Only sentiment, topic, or map tabs allow info dialogs

  //if ( tab_ID() > 1 && tab_ID() != 5 ) {
    //return;
  //}

  //col = rgb2hex( $(".ui-state-default").css( "color" ) );
  col_neg = "#ff8500";
  col_pos = rgb2hex( default_txt_c() );

  //  Grab active canvas's width, height, and offset

  canvas_ID = "#" + get_canvas_ID();

  //  Recall: $("#...") gets jQuery obj, adding .get( 0 ) or [ 0 ]
  //  gets (first) DOM object from jQuery obj

  off = elem_offset( $(canvas_ID)[ 0 ] );
  w = $(canvas_ID).width();
  h = $(canvas_ID).height();

  for( i = 0; i < tw_ID.length; i++ ) {
    info_div_id = "div-" + info_id;	// Build IDs
    info_txt_id = "txt-" + info_id;
    info_btn_id = "btn-" + info_id;

    //  Build information dialog w/div, label, buttons

    info_dlg = $( "<div id=\"" + info_div_id + "\"></div>" );
    info_dlg.html( "<label id=\"" + info_txt_id + "\"></label>"  );
    info_dlg.dialog(			// Display dialog
      {
        title: "Tweet Details",		// Dialog title
        autoOpen: false,		// Don't open until text populated
        buttons: {			// Dialog buttons
          "Close All": close_all_info_dlg,
          "Close": function() {
            close_info_dlg( $(this) );
          }
        },
        close: function() {		// Destroy dialog on close button
          close_info_dlg( $(this) );
        },
        dialogClass: "dialog-drop-shadow",
        open: function() {		// Remove focus from Close All button
          var  cur_elem;		// Current element in DOM tree
          var  h;			// Dialog height
          var  w;			// Dialog width
          var  x_off = 0;		// X-offset of dialog on page
          var  y_off = 0;		// X-offset of dialog on page

        //  Use blur() to remove focus from Cancel All button

          $(".ui-dialog :button").blur();

        //  We use hover() to track mouse focus in/out of tweet canvas,
        //  but when dialog appears under mouse cursor, this doesn't
        //  work, so we need to explicitly check for dialog under mouse
        //  and update canvas_focus when it happens

          cur_elem = this;		// Start at dialog
          do {				// Calc offsets up the parent chain
            x_off += cur_elem.offsetLeft;
            y_off += cur_elem.offsetTop;
          } while( cur_elem = cur_elem.offsetParent );

        //  Dialog width is easy, but height requires finding and querying
        //  the jQuery widget holding the dialog's <div>

          w = $(this).dialog( "option", "width" );
          h = $( "#" + info_div_id ).closest( ".ui-widget" ).height();

        //  If mouse cursor in dialog, explicitly remove canvas focus

          if ( mouse_x() >= x_off && mouse_x() <= x_off + w &&
               mouse_y() >= y_off && mouse_y() <= y_off + h ) {
            zoom_focus( false );	// Update zoom focus flag

            switch( tab_ID() ) {	// Update active tab's focus flag
            case 0:
              tweet_focus( false );
              break;
            case 1:
              topic_focus( false );
              break;
            }
          }
        },
        position: [			// Stagger dialog positions
          off.x + dlg_x, off.y + dlg_y
        ],
        width: 400			// Width for valence/arousal details
      }
    );

  //  Populate dialog with tweet's formatted text

    tweet = tw[ tw_ID[ i ] ];

    if ( tweet.link != null ) {		// Add link, if it exists
      txt = "<p><b><a href=\"" + tweet.link + "\" ";
      txt = txt + "style=\"color: " + col_pos + "\" target=\"_blank\">";
      txt = txt + tweet.name + "</a></b></p>";
    } else {
      txt = "<p><b>" + tweet.name + "</b></p>";
    }

  //  Uses moment.js format() function (http://momentjs.com)
   
    txt = txt + "<p><i>";
    txt = txt + moment( new Date( tweet.time ) ).format( "MMM D, h:mma:" );
    txt = txt + "</i> " + tweet.fmt + "</p>";

    txt = txt + "<p><i>v</i> = " + tweet.avg[ VAL ].toFixed( 2 ) + ", ";
    txt = txt + "<i>a</i> = " + tweet.avg[ ARO ].toFixed( 2 ) + "</p>";

    txt = txt + "<div style=\"margin-top: 10px; margin-botton: 10px;\">";
    for( j = 0; j < tweet.anew.length; j++ ) {

  //  Split between different dict term lists, e.g. ANEW and happiness
/*
      if ( j > 0 && tweet.anew[ j - 1 ].dict != tweet.anew[ j ].dict ) {
        txt = txt + "</div>";
        txt = txt + "<div style=\"margin-top: 10px; margin-botton: 10px;\">";
      }
*/

      //  Color text blue for direct evaluation, orange for negated
      //  evaluation

      if ( tweet.anew[ j ].dict.indexOf( "anew-neg" ) != -1 ) {
        txt = txt + '<span style="color: ' + col_neg + '">';
      } else {
        txt = txt + '<span style="color: ' + col_pos + '">';
      }

      //  If stemmed version of term used, display it in info dialog

      if ( tweet.anew[ j ].dict.indexOf( "-stem" ) != -1 ) {
        txt = txt + "<b>" + tweet.anew[ j ].stem + "</b></span>, ";
      } else {
        txt = txt + "<b>" + tweet.anew[ j ].word + "</b></span>, ";
      }
      txt = txt + "<i>v</i> = [ ";
      txt = txt + "&mu;: " + tweet.anew[ j ].avg[ VAL ] + ", ";
      txt = txt + "&sigma;: " + tweet.anew[ j ].std[ VAL ] + " ], ";
      txt = txt + "<i>a</i> = [ ";
      txt = txt + "&mu;: " + tweet.anew[ j ].avg[ ARO ] + ", ";
      txt = txt + "&sigma;: " + tweet.anew[ j ].std[ ARO ] + " ], ";

      txt = txt + "<i>fq</i> = " + tweet.anew[ j ].fq;
      txt = txt + "<br />";
    }
    txt = txt + "</div>";

    $("#" + info_txt_id)[ 0 ].innerHTML = txt;

    reset_tooltip();			// Remove any tweet canvas tooltip
    reset_zoom_tooltip();		// Remove any zoom canvas tooltip

    info_dlg.dialog( "open" );		// Display dialog (after text set)

    dlg.push( info_dlg );		// Save dialog in dialog array

  //  Update dialog offset, wrap dialog if it extends past right or
  //  top of tweet canvas

    dlg_x += 10;
    dlg_y += 10;

    if ( dlg_y + info_dlg.height() > h - 10 ) {
      dlg_y = 5;
    } else if ( dlg_x + info_dlg.width() > w - 10 ) {
      dlg_x = 5;
    }

    info_id++;				// Increment to next ID
  }
}					// End function show_info_dlg

