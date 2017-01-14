/*--------------------------------------------------------------------------*/
/*  DRAW.JS								    */
/*    Routines to draw the sentiment and topic canvases			    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  canvas_x;				// Current mouse X-position on canvas
var  canvas_y;				// Current mouse X-position on canvas
var  timer_ID = -1;			// Current setTimeout ID


function clear_canvas( canvas_ID )

  //  Clear the given canvas's drawing area
{
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  h;				// Canvas height
  var  w;				// Canvas width


  if ( !( canvas = get_canvas( canvas_ID ) ) ) {
    return;
  }

  w = canvas.width;			// Width, height
  h = canvas.height;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour

  ctx.save();				// Clear untransformed canvas
  ctx.setTransform( 1, 0, 0, 1, 0, 0 );
  ctx.clearRect( 0, 0, w, h );
  ctx.restore();
}					// End function clear_canvas


function draw_legend()

  //  Draw tweet canvas legend (sized, transparent circles of varying
  //  blue-green colours) in both sentiment and topic tabs
{
  var  a;				// Circle alpha
  var  canvas;  			// Canvas element on page
  var  canvas_ID;			// Canvas HTML id
  var  col;				// Circle colour
  var  ctx;				// Canvas 2d context
  var  i;				// Loop counter
  var  L;				// Circle luminance
  var  r;				// Circle radius
  var  tab;				// Tab index loop counter
  var  top;				// Top of legend within canvas
  var  w;                               // Canvas width
  var  x, y;                            // Label's (x,y) position


  for( tab = 0; tab <= 5; tab++ ) {	// For all tabs with legends
    switch( tab ) {			// Get legend's canvas ID
    case 0:				// Sentiment tab
      canvas_ID = "tweet-legend";
      break;
    case 1:				// Topic tab
      canvas_ID = "topic-legend";
      break;
    case 5:				// Map tab
      canvas_ID = "map-legend";
      break;
    default:				// Skip all other tabs
      continue;
    }

    if ( !( canvas = get_canvas( canvas_ID ) ) ) {
      continue;
    }

    w = canvas.width;			// Get canvas width, height
    h = canvas.height;
    top = ( h - 330 ) / 2.0;		// Legend needs 330 pix

    ctx = canvas.getContext( "2d" );	// Get context

    ctx.save();				// Clear untransformed canvas
    ctx.setTransform( 1, 0, 0, 1, 0, 0 );
    ctx.clearRect( 0, 0, w, h );
    ctx.restore();

    y = top + 40;			// Center of first circle in legend
    ctx.strokeStyle = "rgb( 192, 192, 192 )";

    for( i = 0; i < 25; i++ ) {		// For 25 circles in legend
      r = 13 - ( i / 2.0 );		// Radius decreases along circles
      a = 1.0 - ( i / 25.0 * 0.9 );	// Alpha decreases along circles
      L = 0.4 + ( i / 25.0 * 0.5 );	// Luminance increases along circles

      if ( i < 7 ) {			// First 7 circles are green..
        col = get_colour_w_L( L, 0.55 );
      } else {				// ..remaining circles are blue
        col = get_colour_w_L( L, 0.75 );
      }
      ctx.fillStyle =
        "rgba( " + col.r + "," + col.g + "," + col.b + "," + a + " )";
    
      ctx.beginPath();			// Draw circle
      ctx.arc( w / 2, y, r, 0.0, 2.0 * Math.PI, false );
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      y += ( r * 2 ) - 4;		// Move to center of next circle
    } 

    ctx.textAlign = "center";		// Draw labels
    ctx.fillStyle = default_txt_c();
    ctx.font = default_txt_sz() + " " + default_txt_fm();

    ctx.fillText( "pleasant", w / 2, top );
    ctx.fillText( "high confidence", w / 2, top + 15 );
    ctx.fillText( "unpleasant", w / 2, top + 315 );
    ctx.fillText( "low confidence", w / 2, top + 330 );
  }					// End for all tabs
}					// End function draw_legend


function draw_query_term( ID, n )

  //  Draw query term and tweet count on given tab
  //
  //  ID:  HTML id of drawing element
  //  n:   Count to display (default is number of tweets)
{
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  fnt;				// Font formatting string
  var  lbl;				// Query term label
  var  query_div;			// Div on map to hold label
  var  svg_ID;				// ID of SVG (cloud or narrative)
  var  vis;				// SVG element to draw into


  if ( tw.length <= 0 ) {		// No query terms?
    return;
  }

  if ( typeof n == "undefined" ) {	// Default to number of tweets?
    lbl = query_term + " (" + tw.length + ")";
  } else {				// Use custom count
    lbl = query_term + " (" +n + ")";
  }

  //  First, see if the requested drawing element is the sentiment,
  //  topic, or heatmap canvas

  if ( ( canvas = get_canvas( ID ) ) != false ) {
    ctx = canvas.getContext( "2d" );	// Get context

    ctx.textAlign = "right";		// Right-justify query term
    ctx.fillStyle = default_txt_c();	// Theme-chosen text colour
    ctx.font = "bold " + default_txt_sz() + " " + default_txt_fm();

    ctx.fillText( lbl, ( canvas.width - 50 ) + 40, 10 );

  //  If not an HTML canvas, check to see if the requested drawing
  //  element is the tag cloud SVG element

  } else if ( ID.indexOf( "#cloud-svg" ) != -1 ||
              ID.indexOf( "#narrative-svg" ) != -1 ) {
    if ( typeof ( vis = d3.select( ID ) ) == "undefined" ) {
      return;
    }

    fnt = "font: bold " + default_txt_sz() + " " + default_txt_fm() + "; ";
    fnt = fnt + "fill: " + default_txt_c() + ";";

    if ( ID.indexOf( "#cloud-svg" ) != -1 ) {
      svg_ID = "cloud";
    } else {
      svg_ID = "narrative";
    }

    vis.selectAll( "." + svg_ID + "-count" ).remove();

    vis.append( "svg:text" )		// Draw query term
      .attr( "class", svg_ID + "-count" )
      .attr( "x", ( $("#" + svg_ID + "-div").width() - 50 ) + 40 )
      .attr( "y", 10 )
      .attr( "text-anchor", "end" )
      .attr( "style", fnt )
      .text( lbl );

  //  Next, check if requested element is in map's div

  } else if ( ID.indexOf( "#map-div" ) != -1 ) {
    query_div = document.createElement( "div" );
    query_div.style.fontSize = default_txt_sz();
    query_div.style.fontFamily = default_txt_fm();
    query_div.style.color = default_txt_c();
    query_div.style.paddingTop = "5px";
    query_div.style.paddingRight = "10px";
    query_div.innerHTML = "<b>" + lbl + "</b>";

    map.controls[ google.maps.ControlPosition.TOP_RIGHT ].clear();
    map.controls[ google.maps.ControlPosition.TOP_RIGHT ].push( query_div );

  //  Mext, check if requested drawing element is affinity graph

  } else if ( ID.indexOf( "#affinity-svg" ) != -1 ) {
    if ( typeof ( vis = d3.select( ID ) ) == "undefined" ) {
      return;
    }

    fnt = "font: bold " + default_txt_sz() + " " + default_txt_fm() + "; ";
    fnt = fnt + "fill: " + default_txt_c() + ";";

    vis.selectAll( ".affinity-count" ).remove();

    vis.append( "svg:text" )		// Draw query term
      .attr( "class", "affinity-count" )
      .attr( "x", ( $("#affinity-div").width() - 50 ) + 40 )
      .attr( "y", 10 )
      .attr( "text-anchor", "end" )
      .attr( "style", fnt )
      .text( lbl );

  //  Next, check if requested drawing element is timeline's div

  } else if ( ID.indexOf("timeline-div" ) != -1 ) {
    chart.setTitle( { }, { text: "<b>" + lbl + "</b>" } );
  }
}					// End function draw_query_term


function draw_tooltip()

  //  This routine draws a tooltip:
  //
  //  - in Sentiment and Topic tabs, with the body of (all) tweet
  //    circles under the mouse pointer
{
  var  anchor;				// Anchor corner of tooltip
  var  canvas;  			// Canvas element on page
  var  canvas_ID;			// Canvas HTML id
  var  cell_ID;				// Heatmap cell information
  var  dt;				// Current date
  var  i;				// Loop counter
  var  id;				// Tab ID
  var  msg;				// Tooltip message (tweet bodies)
  var  pos_x, pos_y;			// Position of tooltip
  var  tweet;				// Current tweet
  var  tweet_ID;			// Indices of tweets under mouse


  //  Tooltips are only for tweet circles on the sentiment and topic
  //  tabs, heatmap cells on the heatmap tab; tooltips on the
  //  narrative tab are handled independently in narrative.js

  id = tab_ID();
  if ( id != 0 && id != 1 && id != 2 ) {
    return;
  }

  //  Ensure canvas has focus before trying to draw tooltip

  if ( ( id == 0 && !tweet_focus() ) || ( id == 1 && !topic_focus() ) ) {
    return;				// If not, don't draw tooltip
  }

  canvas_ID = get_canvas_ID();
  if ( !( canvas = get_canvas( canvas_ID ) ) ) {
    return;
  }

  if ( id < 2 ) {			// Tooltips for tweet circles?
    if ( id == 0 || id == 1 ) {		// Sentiment or topic canvases?
      tweet_ID = within_tweet();
    } else {				// Narrative SVG
      return;
    }

    if ( tweet_ID.length == 0 ) {	// No tweets under mouse?
      return;
    }

    msg = "";
    for( i = 0; i < tweet_ID.length; i++ ) {
      tweet = tw[ tweet_ID[ i ] ];

    //  Uses moment.js format() function (http://momentjs.com)
   
      msg =
        msg + moment( new Date( tweet.time ) ).format( "MMM D, h:mma<br>" );
      msg = msg + "<b>" + tweet.name + "</b>: " + tweet.tip + "<br>";
    }

    //  Tooltip flows bottom in top half of canvas and top in bottom
    //  half, right in left half of canvas and left in right half,
    //  recall canvas_x/y is mouse position in canvas, mouse_x/y is
    //  mouse position on page

    if ( canvas_y < canvas.height / 2 ) {	// Choose top/bottom
      pos_y = mouse_y() - 3;
      anchor = "top ";
    } else {
      pos_y = mouse_y() - 3;
      anchor = "bottom ";
    }
    if ( canvas_x < canvas.width / 2 ) {	// Choose left/right
      pos_x = mouse_x() + 3;
      anchor = anchor + "left";
    } else {
      pos_x = mouse_x() - 3;
      anchor = anchor + "right";
    } 

  } else {				// Tooptip for heatmap cells
    cell_ID = within_heatmap_cell();
    if ( !cell_ID.hasOwnProperty( "v" ) ) {
      return;
    }

    msg = cell_ID.fq + " tweets";

    pos_x = mouse_x() + 3;
    pos_y = mouse_y() - 3;
    anchor = "bottom left";
  }

  canvas_ID = "#" + canvas_ID;		// Update ID to point to HTML element

  $(canvas_ID).qtip( {			// Setup tooltip on canvas
    content: msg,
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  $(canvas_ID).qtip( "option", "position.my", anchor );
  $(canvas_ID).qtip( "option", "position.target", [ pos_x, pos_y ] );

  $(canvas_ID).qtip( "show" );		// Display tooltip
}					// End routine draw_tooltip


function handle_click_evt( e, ID )

  //  Callback to handle mouse clicks on a tweet circle
  //
  //
  //  e:   Click event info struct
  //  ID:  Parent canvas ID
{
  update_mouse_pos( e.pageX, e.pageY, ID );
  show_info_dlg( within_tweet() );	// Show tweets under mouse cursor
}					// End function handle_click_evt


function handle_mousemove_evt( e, ID )

  //  Callback to handle mouse moves over tweet circles on a canvas
  //
  //  e:   Click event info struct
  //  ID:  Parent canvas ID
{
  update_mouse_pos( e.pageX, e.pageY, ID );
  reset_tooltip();			// Destroy tooltip(s) on mousemove
}					// End function handle_mousemove_evt


function reset_tooltip()

  //  Destroy any previously shown tooltip, and reset the mouse move
  //  timeout delay to re-display a new tooltip
{
  if ( $("#tweet-canvas").data( "qtip" ) ) {
    $("#tweet-canvas").qtip( "destroy" );
  }
  if ( $("#topic-canvas").data( "qtip" ) ) {
    $("#topic-canvas").qtip( "destroy" );
  }
  if ( $("#heatmap-canvas").data( "qtip" ) ) {
    $("#heatmap-canvas").qtip( "destroy" );
  }

  clearTimeout( timer_ID );		// Set mouse hover timeout
  timer_ID = setTimeout( "draw_tooltip()", 665 );
}					// End function reset_tooltip


function resize_canvas()

  //  When tab is shown or resized, resize its corresponding canvas to
  //  fit the tab
{
  var  id;				// Active tab's ID


  id = tab_ID();

  if ( id == 0 ) {			// Scatterplot is active?
    resize_tweet();

  } else if ( id == 1 ) {		// Topic cluster is active?
    resize_topic();

  } else if ( id == 2 ) {		// Heatmap is active?
    resize_heatmap();

  } else if ( id == 3 ) {		// Tag cloud is active?
    resize_cloud();

  } else if ( id == 4 ) {		// Timeline is active?
    resize_timeline();

  } else if ( id == 5 ) {		// Map is active?
    resize_map();

  } else if ( id == 6 ) {		// Affinity graph is active?
    resize_affinity();

  } else if ( id == 7 ) {		// Narrative threads are active?
    resize_narrative();
    $("#narrative-tbl").dataTable().fnAdjustColumnSizing();

  } else if ( id == 8 ) {		// Tweet listing is active?
    $("#tweet-tbl").dataTable().fnAdjustColumnSizing();

  } else {				// Project-specific tab active?
    uniq_resize( id );			// Handle project-specific tab resize
  }
}					// End function resize_canvas


function term_colour( term )

  //  Determine a single term's colour and alpha
  //
  //  term:  Term to inspect
{
  var  anew;				// ANEW information on term
  var  col;				// Term colour
  var  L;				// Term luminance
  var  term_avg;			// Term avg and std averages


  //  Default colour is opaque grey

  col = { r: 128, g: 128, b: 128, a: 1.0 };

  //  If term is undefined or isn't an ANEW term, return default grey,
  //  find_term returns term, term is -1 if not in dictionaries

  if ( term.length == 0 || ( anew = find_term( term ) ) == -1 ) {
    return col;
  }

  L = 0.4 + ( ( ( anew.avg[ ARO ] - 1 ) / 8.0 ) * 0.5 );
  if ( anew.avg[ VAL ] < 5 ) {
    col = get_colour_w_L( L, 0.75 );
  } else {
    col = get_colour_w_L( L, 0.55 );
  }

  //  Add an alpha channel value based on overall standard deviation

  term_avg = comp_avg( anew.avg, anew.std );

  col[ "a" ] = ( term_avg.std - 1.5 ) / 2.0;
  if ( col.a < 0 ) {
    col.a = 0;
  } else if ( col.a > 1 ) {
    col.a = 1;
  }

  return col;
}


function tweet_colour( tweet )

  //  Determine a tweet's color and alpha
  //
  //  tweet:  Tweet to inspect
{
  var  col;				// Tweet colour
  var  L;				// Tweet luminance


  //  Determine tweet's colour w/arousal controlling luminance and
  //  valence controlling blue-green hue

  //  If user has re-queried before the affinity URLs are unshortened,
  //  the target tweet may no longer exist, so catch that

  try {
    L = 0.4 + ( ( ( tweet.avg[ ARO ] - 1 ) / 8.0 ) * 0.5 );
    if ( tweet.avg[ VAL ] < 5 ) {
      col = get_colour_w_L( L, 0.75 );
    } else {
      col = get_colour_w_L( L, 0.55 );
    }

    //  Add an alpha channel value based on overall standard deviation

    col[ "a" ] = ( tweet.std[ TOT ] - 1.5 ) / 2.0;
    if ( col.a < 0 ) {
      col.a = 0;
    } else if ( col.a > 1 ) {
      col.a = 1;
    }

  } catch( err ) {
    L = 0.4 + 0.45;
    col = get_colour_w_L( L, 0.55 );
    col[ "a" ] = 0.5;
  }

  return col;
}					// End function tweet_colour


function tweet_pos( tweet, w, h, canvas_ID )

  //  Determine a tweet's position, which varies based on which tab
  //  (sentiment or topic) is active
  //
  //  tweet:      Tweet to inspect
  //  w, h:       Width, height of canvas
  //  canvas_ID:  Canvas HTML id, if this is not passed the routine
  //              will assume the currently active tab
{
  var  x = 0;				// X-position of tweet
  var  y = 0;				// Y-position of tweet


  if ( typeof canvas_ID == "undefined" ) {
    canvas_ID = ( tab_ID() == 0 ) ? "tweet-canvas" : "topic-canvas";
  }

  if ( canvas_ID == "tweet-canvas" ) {
    x = ( tweet.avg[ VAL ] - 1 ) / 8.0 * w;
    y = ( 8.0 - ( tweet.avg[ ARO ] - 1 ) ) / 8.0 * h;

  } else if ( canvas_ID == "topic-canvas" ) {
    x = ( tweet.c_pos.x - 1 ) / 8.0 * w;
    y = ( 8.0 - ( tweet.c_pos.y - 1 ) ) / 8.0 * h;

  } else {
    alert( "tweet_pos(), unknown canvas ID " + canvas_ID );
  }

  return { x: Math.round( x ), y: Math.round( y ) };
}					// End function tweet_pos


function update_mouse_pos( x, y, ID )

  //  Update mouse position on canvas
  //
  //  x, y:  Raw mouse (x,y) position on page
  //  ID:    Parent canvas ID
{
  var  off;				// Canvas offset on page


  mouse_x( x );				// Raw mouse position
  mouse_y( y );

  //  jQuery $(ID)[ 0 ] equivalent to raw Javascript
  //  document.getElementById( ID )

  off = elem_offset( $(ID)[ 0 ] );	// Canvas's offset on page

  canvas_x = mouse_x() - off.x;		// Mouse position on canvas
  canvas_y = mouse_y() - off.y;
}					// End function update_mouse_pos


function within_tweet()

  //  This routine identifes all tweets under the mouse pointer
{
  var  canvas;  			// Canvas element on page
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  pos;				// Tweet position
  var  tweet_ID = [ ];			// Indices of tweets under mouse
  var  w;                               // Canvas width


  if ( !( canvas = get_canvas() ) ) {	// Get ref to ACTIVE TAB's canvas
    return tweet_ID;
  }

  w = canvas.width - 50;		// Width, height minus border
  h = canvas.height - 50;

  for( i = 0; i < tw.length; i++ ) {	// For all tweets

  //  NOT specifying a canvas ID to tweet_pos() forces it to default
  //  to use the canvas on the currently active tab

    pos = tweet_pos( tw[ i ], w, h );	// Get position on active tab
    pos.x += 25;			// Adjust to account for border
    pos.y += 25;

    if ( canvas_x > pos.x - tw[ i ].rad && canvas_x < pos.x + tw[ i ].rad &&
         canvas_y > pos.y - tw[ i ].rad && canvas_y < pos.y + tw[ i ].rad ) {
      tweet_ID.push( i );
    }
  }

  return tweet_ID;
}					// End routine within_tweet
