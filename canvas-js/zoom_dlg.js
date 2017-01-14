/*--------------------------------------------------------------------------*/
/*  ZOOM_DLG.JS								    */
/*    Routines to manage the zoom lens dialog				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  glue_r = 40;			// Radius of glue region
var  zoom_canvas_x;			// Current mouse X-position on canvas
var  zoom_canvas_y;			// Current mouse Y-position on canvas
var  zoom_f = 2.0;			// Zoom factor
var  zoom_off = { x: 0, y: 0 };		// Zoom canvas offset in tweet canvas
var  zoom_timer_ID = -1;		// Current zoom setTimeout ID


function draw_zoom_bbox()

  //  Draw zoom'd cluster bounding boxes, we call the topic canvas the
  //  draw canvas and the lens canvas the zoom canvas
{
  var  a;				// Global alpha value
  var  bbox;				// Bounding box corners, width, height
  var  ctx;				// Canvas 2d context
  var  draw_c;  			// Canvas where tweets are drawn
  var  draw_h;				// Draw canvas height
  var  draw_w;				// Draw canvas width
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  pt = [ ];			// Original bounding box corners
  var  remap = [ ];			// Remapped bounding box corners
  var  tw_n;				// Number of tweets in cluster
  var  zoom_c;  			// Zoom canvas


  if ( !( draw_c = get_canvas( "topic-canvas" ) ) ) {
    return;
  }
  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return;
  }

  draw_w = draw_c.width - 50;		// Draw width, height minus border
  draw_h = draw_c.height - 50;

  ctx = zoom_c.getContext( "2d" );      // Get context, set fill colour
  a = ctx.globalAlpha;			// Save current globalAlpha

  ctx.strokeStyle = default_txt_c();
  ctx.fillStyle = default_txt_c();

  for( i = 0; i < C_bbox.length; i++ ) {

  //  Calculate initial bounding box corners

    bbox = get_bbox( i, draw_w, draw_h );

    pt[ 0 ] = { x: 25 + bbox.x0 - zoom_off.x, y: 25 + bbox.y0 - zoom_off.y };
    pt[ 1 ] = { x: pt[ 0 ].x, y: 25 + bbox.y1 - zoom_off.y };
    pt[ 2 ] = { x: 25 + bbox.x2 - zoom_off.x, y: pt[ 1 ].y };
    pt[ 3 ] = { x: pt[ 2 ].x, y: pt[ 0 ].y };

  //  Remap bounding box corners with respect to zoom lens

    remap[ 0 ] = remap_tweet_pos( pt[ 0 ], 1 );
    remap[ 1 ] = remap_tweet_pos( pt[ 1 ], 1 );
    remap[ 2 ] = remap_tweet_pos( pt[ 2 ], 1 );
    remap[ 3 ] = remap_tweet_pos( pt[ 3 ], 1 );

    ctx.beginPath();			// Draw remapped bounding box
    ctx.globalAlpha = 0.05;
    ctx.moveTo( remap[ 0 ].x, remap[ 0 ].y );
    ctx.lineTo( remap[ 1 ].x, remap[ 1 ].y );
    ctx.lineTo( remap[ 2 ].x, remap[ 2 ].y );
    ctx.lineTo( remap[ 3 ].x, remap[ 3 ].y );
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();			// Draw remapped bounding box border
    ctx.globalAlpha = 0.25;
    ctx.moveTo( remap[ 0 ].x, remap[ 0 ].y );
    ctx.lineTo( remap[ 1 ].x, remap[ 1 ].y );
    ctx.lineTo( remap[ 2 ].x, remap[ 2 ].y );
    ctx.lineTo( remap[ 3 ].x, remap[ 3 ].y );
    ctx.closePath();
    ctx.stroke();
  }

  ctx.globalAlpha = a;			// Restore globalAlpha
}					// End function draw_zoom_bbox


function draw_zoom_term()

  //  Draw zoom'd cluster terms and tweet counts, we call the topic
  //  canvas the draw canvas and the lens canvas the zoom canvas
{
  var  bbox;				// Bounding box corners, width, height
  var  ctx;				// Canvas 2d context
  var  draw_c;  			// Canvas where tweets are drawn
  var  draw_h;				// Draw canvas height
  var  draw_w;				// Draw canvas width
  var  i;				// Loop counter
  var  pt = [ ];			// Original bounding box corners
  var  remap;				// Remapped bounding box corner
  var  tw_n;				// Number of tweets in cluster
  var  txt_asc;				// Keyword ascender height
  var  txt_h;				// Keyword height
  var  txt_w;				// Keyword width
  var  zoom_c;  			// Zoom canvas


  if ( !( draw_c = get_canvas( "topic-canvas" ) ) ) {
    return;
  }
  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return;
  }

  draw_w = draw_c.width - 50;		// Draw width, height minus border
  draw_h = draw_c.height - 50;

  ctx = zoom_c.getContext( "2d" );      // Get context, set fill colour

  //  Draw semi-opaque backgrounds for each list of keywords, and
  //  cluster tweet count

  for( i = 0; i < C_bbox.length; i++ ) {

  //  Calculate upper-left, lower-right bounding box corners

    bbox = get_bbox( i, draw_w, draw_h );

    pt[ 0 ] = { x: 25 + bbox.x0 - zoom_off.x, y: 25 + bbox.y0 - zoom_off.y };
    pt[ 1 ] = { x: 25 + bbox.x2 - zoom_off.x, y: 25 + bbox.y1 - zoom_off.y };

  //  Draw cluster keyword above center of bounding box

    remap = remap_tweet_pos(
              { x: pt[ 0 ].x + ( bbox.w / 2 ), y: pt[ 0 ].y - 5 }, 1 ); 

  //  Semi-opaque background for keyword list

    ctx.font = ( 9 * remap.r ).toString() + "px " + default_txt_fm();

    txt_w = ctx.measureText( C_term[ i ] ).width;
    txt_h = 11 * remap.r;
    txt_asc = 9 * remap.r;

    ctx.fillStyle = "rgba( 255, 255, 255, 0.5 )";
    ctx.fillRect( remap.x - txt_w / 2, remap.y - txt_asc, txt_w, txt_h );

  //  Draw keyword list

    ctx.textAlign = "center";

    ctx.fillStyle = default_txt_c();
    ctx.fillText( C_term[ i ], remap.x, remap.y );

  //  Draw cluster count below lower-right corner of bounding box

    remap = remap_tweet_pos( { x: pt[ 1 ].x, y: pt[ 1 ].y + 12 }, 1 );

  //  Semi-opaque background for cluster count

    ctx.font = ( 9 * remap.r ).toString() + "px " + default_txt_fm();

    tw_n = Object.keys( C[ i ] ).length.toString();

    txt_w = ctx.measureText( tw_n ).width;
    txt_h = 11 * remap.r;
    txt_asc = 9 * remap.r;

    ctx.fillStyle = "rgba( 255, 255, 255, 0.5 )";
    ctx.fillRect( remap.x - txt_w, remap.y - txt_asc, txt_w, txt_h );

  //  Draw cluster count

    ctx.textAlign = "right";
    tw_n = Object.keys( C[ i ] ).length.toString();

    ctx.fillStyle = default_txt_c();
    ctx.fillText( tw_n, remap.x, remap.y );
  }
}					// End function draw_zoom_bbox


function draw_zoom_tooltip()

  //  This routine draws a tooltip with the body of (all) tweet
  //  circles under the mouse pointer
{
  var  anchor;				// Anchor corner of tooltip
  var  draw_c;  			// Canvas where tweets are drawn
  var  draw_off;			// Draw canvas offset on page
  var  draw_x;				// Mouse X-position on canvas
  var  draw_y;				// Mouse Y-position on canvas
  var  dt;				// Current date
  var  i;				// Loop counter
  var  msg;				// Tooltip message (tweet bodies)
  var  pos_x, pos_y;			// Position of tooltip
  var  tweet;				// Current tweet
  var  tweet_ID;			// Indices of tweets under mouse
  var  zoom_c;				// Zoom canvas


  if ( !get_canvas() ) {		// No canvas element to zoom?
    return;
  }

  if ( !zoom_focus() ) {		// Ensure canvas has focus
    return;
  }

  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return;
  }

  tweet_ID = within_zoom_tweet();	// Identify tweets
  if ( tweet_ID.length == 0 ) {		// No tweets under mouse?
    return;
  }

  msg = "";
  for( i = 0; i < tweet_ID.length; i++ ) {
    tweet = tw[ tweet_ID[ i ] ];

  //  Uses moment.js format() function (http://momentjs.com)
   
    msg = msg + moment( new Date( tweet.time ) ).format( "MMM D, h:mma<br>" );
    msg = msg + "<b>" + tweet.name + "</b>: " + tweet.tip + "<br>";
  }

  $("#zoom-canvas").qtip( {		// Setup tooltip on canvas
    content: msg,
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  //  Tooltip flows bottom in top half of canvas and top in bottom
  //  half, right in left half of canvas and left in right half,
  //  recall canvas_x/y is mouse position in canvas, mouse_x/y is
  //  mouse position on page

  if ( tab_ID() == 0 ) {		// Get draw canvas offset
    draw_c = get_canvas( "tweet-canvas" );
  } else {
    draw_c = get_canvas( "topic-canvas" );
  }
  draw_off = elem_offset( canvas );

  draw_x = mouse_x() - draw_off.x;
  draw_y = mouse_y() - draw_off.y;

  if ( draw_y < draw_c.height / 2 ) {
    pos_y = mouse_y() - 3;
    anchor = "top ";
  } else {
    pos_y = mouse_y() - 3;
    anchor = "bottom ";
  }
  if ( draw_x < draw_c.width / 2 ) {
    pos_x = mouse_x() + 3;
    anchor = anchor + "left";
  } else {
    pos_x = mouse_x() - 3;
    anchor = anchor + "right";
  }
  $("#zoom-canvas").qtip( "option", "position.my", anchor );
  $("#zoom-canvas").qtip( "option", "position.target", [ pos_x, pos_y ] );

  $("#zoom-canvas").qtip( "show" );	// Display tooltip
}					// End routine draw_zoom_tooltip


function draw_zoom_tweet()

  //  Draw zoom'd tweets, we call the underlying canvas the draw
  //  canvas and the lens canvas the zoom canvas
{
  var  ang = 2.0 * Math.PI;		// Arc angle for full circle
  var  col;				// Tweet circle colour
  var  ctx;				// Canvas 2d context
  var  draw_c;  			// Canvas where tweets are drawn
  var  draw_h;				// Draw canvas height
  var  draw_w;				// Draw canvas width
  var  focus;				// Focus (x,y) center, radius r
  var  i;				// Loop counter
  var  pos;				// Tweet position
  var  r;				// Radius of tweet circle
  var  remap;				// Remapped tweet position and radius
  var  zoom_c;				// Zoom canvas


  if ( !( draw_c = get_canvas() ) ) {
    return;
  }
  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return;
  }

  draw_w = draw_c.width - 50;		// Draw width, height minus border
  draw_h = draw_c.height - 50;

  focus = focus_size();			// Zoom canvas width, height, center

  clear_canvas( "zoom-canvas" );	// Clear zoom canvas

  ctx = zoom_c.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  if ( tab_ID() == 1 ) {		// If topic tab, draw zoom'd..
    draw_zoom_bbox();			// ..cluster bounding boxes
  }

  for( i = 0; i < tw.length; i++ ) {	// For all tweets

  //  Get position of tweet on active canvas (by leaving final
  //  canvas_ID argument to tweet_pos() unspecified)

    pos = tweet_pos( tw[ i ], draw_w, draw_h );

    pos.x = 25 + ( pos.x - zoom_off.x );
    pos.y = 25 + ( pos.y - zoom_off.y );
    r = tw[ i ].rad;

  //  Skip tweet if not visible within zoom canvas

    if ( pos.x < -r || pos.x > zoom_c.width + r ||
         pos.y < -r || pos.y > zoom_c.height + r ) {
      continue;
    }

    remap = remap_tweet_pos( pos, r );	// Map tweet pos to zoom canvas

    col = tweet_colour( tw[ i ] );	// Colour tweet circle
    ctx.fillStyle = "rgba(" +
      col.r + "," + col.g + "," + col.b + "," + ( 1.0 - col.a ) + ")";

    ctx.beginPath();			// Draw tweet circle
    ctx.arc( remap.x, remap.y, remap.r, 0.0, ang, false );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  if ( tab_ID() == 1 ) {		// If topic tab, draw zoom'd..
    draw_zoom_term();			// ..keywords, cluster counts
  }

  ctx.strokeStyle = "rgba( 192, 192, 192, 0.5 )";

  ctx.beginPath();			// Draw inner focus region boundary
  ctx.arc( focus.x, focus.y, focus.r, ang, false );
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();			// Draw outer focus region boundary
  ctx.arc( focus.x, focus.y, focus.r + glue_r, ang, false );
  ctx.stroke();
  ctx.closePath();
}					// End function draw_zoom_tweet


function focus_size()

  //  Return center and radius of focus region
{
  var  focus = { x: 0, y: 0, r: 0 };	// Focus center, radius
  var  zoom_c;  			// Zoom canvas


  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return focus;
  }

  focus.x = zoom_c.width / 2.0;		// Focus region center
  focus.y = zoom_c.height / 2.0;

  focus.r =				// Focus region radius
    ( focus.x > focus.y ) ? focus.y - glue_r - 5 : focus.x - glue_r - 5;

  return focus;
}					// End function focus_size


function get_zoom_offset()

  //  Calculate the offset of the zoom canvas within the tweet canvas
{
  var  canvas_ID;			// HTML id of active canvas
  var  dlg;				// Zoom dialog


  //  Global offset of zoom canvas minus global offset of tweet canvas
  //  is offset of zoom canvas in tweet canvas (NB: assumes border and
  //  padding on dialog are both zero)

  dlg = zoom_dlg();

  zoom_off.x = dlg.offset().left;	// Get zoom dialog's offset
  zoom_off.y = dlg.offset().top;

  canvas_ID = "#" + get_canvas_ID();
  zoom_off.x -= $(canvas_ID).offset().left;
  zoom_off.y -= $(canvas_ID).offset().top;
}					// End function get_zoom_offset


function hide_zoom_dlg()

  //  Hide the zoom dialog
{
  zoom_dlg().dialog( "close" );
}					// End function hide_zoom_dlg


function init_zoom_dlg()

  //  Build the zoom dialog
{
  var  dlg;				// Zoom dialog
  var  html;				// HTML within dialog
  var  zoom_c;				// Zoom canvas


  dlg = zoom_dlg();

  //  Build canvas and two radio buttons for setting zoom factor

  html  = "<canvas id=\"zoom-canvas\"></canvas>";
  html += "<div id=\"canvas-zoom\" ";
  html += "style=\"position:absolute; top:5px; left:5px\">";
  html += "<input type=\"radio\" id=\"canvas-zoom-1\" name=\"canvas-zoom\"";
  html += "checked=\"checked\">";
  html += "<label for=\"canvas-zoom-1\">2x</label>";
  html += "<input type=\"radio\" id=\"canvas-zoom-2\" name=\"canvas-zoom\">";
  html += "<label for=\"canvas-zoom-2\">4x</label>";
  html += "</div>";

  dlg.html( html );

  dlg.dialog(				// Build dialog
  {
    title: "Zoom Lens",			// Dialog title
    autoOpen: false,			// Delay showing dialog
    dragStart: function() {		// Start dialog drag

  //  Theoretically, the drag event track's dialog movement, but (for
  //  some reason) it doesn't consistently update the dialog's
  //  offset(), so we track mousemove during dragStart/dragEnd

      $(document).mousemove( function( e ) {
        get_zoom_offset();
        draw_zoom_tweet();
      } );
    },
    dragStop: function() {		// Stop dialog drag
      $(document).unbind( "mousemove" );
    },
    minWidth: 350,			// Fixed 350x350 size
    minHeight: 365,
    resizable: false
  } );

  //  Remove space between dialog and canvas edge, size canvas to fill
  //  dialog

  dlg.css( { "border": "0px", "padding": "0px" } );

  zoom_c = $("#zoom-canvas" );
  zoom_c.hover(
    function() {
      zoom_focus( true );	// Mouse in function
    },
    function() {
      zoom_focus( false );	// Mouse out function
    }
  );

  //  Setup radio button style and callbacks

  $("#canvas-zoom").buttonset();

  $("#canvas-zoom-1").click( function() {
    zoom_f = 2.0;			// Update to 2x zoom
    update_zoom_dlg();
  } );
  $("#canvas-zoom-2").click( function() {
    zoom_f = 4.0;			// Update to 4x zoom
    update_zoom_dlg();
  } );

  //  Add event handler for mouse clicks, to trigger info dialogs

  zoom_c[ 0 ].addEventListener( "click", function( e ) {
    var  off;				// Canvas offset on page

    mouse_x( e.pageX );			// Raw mouse position
    mouse_y( e.pageY );

    off = elem_offset( this );		// Canvas offset on page

    zoom_canvas_x = mouse_x() - off.x;
    zoom_canvas_y = mouse_y() - off.y;

    show_info_dlg( within_zoom_tweet() );
  }, 0 );

  //  Add event handler for mouse moves, to trigger tooltips

  zoom_c[ 0 ].addEventListener( "mousemove", function( e ) {
    var  off;				// Canvas offset on page

    mouse_x( e.pageX );			// Raw mouse position
    mouse_y( e.pageY );

    off = elem_offset( this );		// Canvas offset on page

    zoom_canvas_x = mouse_x() - off.x;
    zoom_canvas_y = mouse_y() - off.y;

    reset_zoom_tooltip();
  }, 0 );
}					// End function init_zoom_dlg


function remap_tweet_pos( pos, r )

  //  Remap tweet's position to zoomed position in the fisheye lens
  //
  //  pos:  Tweet position
  //  r:    Tweet radius
{
  var  dist;				// Distance from center to tweet
  var  focus;				// Focus (x,y) center, radius r
  var  inner_b;				// Inner boundary position
  var  map = { x: 0, y: 0 };		// Remapped tweet position
  var  map_r;				// Remapped tweet radius
  var  norm_p;				// Normalized tweet position
  var  outer_b;				// Outer boundary position
  var  rel;				// Tweet position relative to center
  var  zoom_c;  			// Zoom canvas


  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return { x: 0, y: 0, r: 0 };
  }

  focus = focus_size();			// Get focus center, radius

  dist = d( focus, pos );		// Distance to tweet
  if ( dist < focus.r / zoom_f ) {	// Within focus region?
    
  //  Determine positive relative to center of zoom
      
    rel = { x: pos.x - focus.x, y: pos.y - focus.y };
            
    rel.x /= dist;			// Normalize relative pos
    rel.y /= dist;

    rel.x *= ( zoom_f * dist );		// Zoom relative position
    rel.y *= ( zoom_f * dist );
            
    map.x = rel.x + focus.x;		// Un-translate from center..
    map.y = rel.y + focus.y;		// ..of zoom region
    map_r = zoom_f * r;			// Zoom tweet circle radius

  } else
    if ( dist < focus.r + glue_r ) {	// Within glue region
    
  //  Determine positive relative to center of zoom
      
    rel = { x: pos.x - focus.x, y: pos.y - focus.y };
      
  //  Pos of tweet is focus.r/zoom_f .. focus.r+glue_r, and we want to
  //  remap that to focus.r .. focus.r+glue_r
      
    inner_b = 1.0 / zoom_f;		// Inner, outer range limits
    outer_b = 1.0 - inner_b;
      
  //  Determine tweet pos as a normalize position along range
  //  focus.r/zoom_f .. focus.r+glue_r

    norm_p = ( dist - ( focus.r * inner_b ) );
    norm_p /= ( focus.r * outer_b ) + glue_r;
      
    rel.x /= dist;			// Normalize relative position
    rel.y /= dist;
      
  //  Remap pos to be norm_p along line focus.r .. focus.r+glue_r
      
    map.x = rel.x * ( focus.r + ( norm_p * glue_r ) );
    map.y = rel.y * ( focus.r + ( norm_p * glue_r ) );

    map.x += focus.x;			// Un-translate from center..
    map.y += focus.y;			// ..of zoom region

  //  Smoothly increase tweet radius along line
      
    map_r = ( 1 + ( ( 1 - norm_p ) * ( zoom_f - 1 ) ) ) * r;

  } else {				// Outside zoom lens
    map.x = pos.x;
    map.y = pos.y;
    map_r = r;
  }

  return { x: map.x, y: map.y, r: map_r };
}					// End function remap_tweet_pos


function reset_zoom_tooltip()

  //  Destroy any previously shown tooltip, and reset the mouse move
  //  timeout delay to re-display a new tooltip
{
 if ( $("#zoom-canvas").data( "qtip" ) ) {
    $("#zoom-canvas").qtip( "destroy" );
  }

  clearTimeout( zoom_timer_ID );	// Set mouse hover timeout
  zoom_timer_ID = setTimeout( "draw_zoom_tooltip()", 665 );
}					// End function reset_zoom_tooltip


function show_zoom_dlg()

  //  Show the zoom dialog, update its canvas
{
  var  dlg;				// Zoom dialog
  var  zoom_c;  			// Zoom canvas


  if ( !get_canvas() ) {		// No zoom dialog allowed?
    return;
  }

  dlg = zoom_dlg();
  dlg.dialog( "open" );			// Display zoom dialog

  zoom_c = $("#zoom-canvas" );		// Update canvas size to dialog size
  zoom_c.attr( "width", $(zoom_c).parent().width() );
  zoom_c.attr( "height", $(zoom_c).parent().height() - 3 );

  get_zoom_offset();			// Draw initial dialog contents
  draw_zoom_tweet();
}					// End function show_zoom_dlg


function update_zoom_dlg()

  //  Call to update dialog's contents if dialog is visible (e.g.,
  //  after new tweets queried)
{
  if ( tab_ID() > 1 ) {			// Close zoom dialog when it doesn't..
    hide_zoom_dlg();			// ..apply
    return;
  }

  if ( zoom_dlg().dialog( "isOpen" ) != true ) {
    return;
  }

  get_zoom_offset();
  draw_zoom_tweet();
}					// End function update_zoom_dlg


function within_zoom_tweet()

  //  This routine identifes all tweets on the zoom canvas under the
  //  mouse pointer
{
  var  draw_c;  			// Canvas where tweets are drawn
  var  draw_h;				// Draw canvas height
  var  draw_w;				// Draw canvas width
  var  i;				// Loop counter
  var  pos;				// Tweet position
  var  r;				// Radius of tweet circle
  var  tweet_ID = [ ];			// Indices of tweets under mouse
  var  zoom_c;  			// Zoom canvas
  var  zoom_h;				// Canvas height
  var  zoom_w;				// Canvas width


  if ( !( draw_c = get_canvas() ) ) {
    return tweet_ID;
  }
  if ( !( zoom_c = get_canvas( "zoom-canvas" ) ) || !zoom_c.getContext ) {
    return tweet_ID;
  }

  draw_w = draw_c.width - 50;		// Draw width, height minus border
  draw_h = draw_c.height - 50;

  for( i = 0; i < tw.length; i++ ) {	// For all tweets

  //  Get position of tweet on active canvas (by leaving final
  //  canvas_ID argument to tweet_pos() unspecified)

    pos = tweet_pos( tw[ i ], draw_w, draw_h );

    pos.x = 25 + ( pos.x - zoom_off.x );
    pos.y = 25 + ( pos.y - zoom_off.y );
    r = tw[ i ].rad;

  //  Skip tweet if not visible within zoom canvas

    if ( pos.x < -r || pos.x > zoom_c.width + r ||
         pos.y < -r || pos.y > zoom_c.height + r ) {
      continue;
    }

    pos = remap_tweet_pos( pos, r );	// Map tweet pos to zoom canvas

    if ( zoom_canvas_x > pos.x - pos.r && zoom_canvas_x < pos.x + pos.r &&
         zoom_canvas_y > pos.y - pos.r && zoom_canvas_y < pos.y + pos.r ) {
      tweet_ID.push( i );
    }
  }

  return tweet_ID;
}					// End routine within_zoom_tweet
