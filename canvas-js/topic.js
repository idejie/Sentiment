/*--------------------------------------------------------------------------*/
/*  TOPIC.JS								    */
/*    Routines to draw the sentiment and topic canvases			    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  26-May-13	Christopher G. Healey	Refactored from draw.js		    */
/*--------------------------------------------------------------------------*/


function draw_topic()

  //  Draw tweets on topic cluster canvas
{
  var  ang = 2.0 * Math.PI;		// Angle for full circle
  var  canvas;  			// Canvas element on page
  var  col;				// Tweet circle colour
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  pos;				// Tweet position
  var  w;                               // Canvas width


  if ( !( canvas = get_canvas( "topic-canvas" ) ) ) {
    return;
  }

  w = canvas.width - 50;		// Width, height adjusted for border
  h = canvas.height - 50;

  clear_canvas( "topic-canvas" );	// Clear canvas contents

  draw_topic_axis();			// Draw cluster axis, labels
  draw_topic_bbox();			// Draw cluster bounding boxes
  draw_query_term( "topic-canvas" );	// Draw query term and tweet count

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    col = tweet_colour( tw[ i ] );
    ctx.fillStyle =
      "rgba(" + col.r + "," + col.g + "," + col.b + "," + ( 1.0-col.a ) + ")";
    
    pos = tweet_pos( tw[ i ], w, h, "topic-canvas" );

    ctx.beginPath();
    ctx.arc( 25 + pos.x, 25 + pos.y, tw[ i ].rad, 0.0, ang, false );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  draw_topic_term();			// Draw cluster keywords, tweet counts
}					// End function draw_topic


function draw_topic_axis()

  // Draw divider and section labels on topic canvas
{
  var  canvas;				// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  fnt;				// Font formatting string
  var  h;				// Canvas height
  var  w;				// Canvas width
  var  x;				// Divider between cluster/singleton


  if ( !( canvas = get_canvas( "topic-canvas" ) ) ) {
    return;
  }

  w = canvas.width;			// Get width, height of canvas
  h = canvas.height;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  x = ( 4.75 / 8.0 ) * w;		// Divider between cluster/singleton

  ctx.beginPath();                      // Draw divider
  ctx.moveTo( x, 25 );
  ctx.lineTo( x, h - 25 );
  ctx.stroke();

  ctx.textAlign = "center";             // Draw labels
  ctx.fillStyle = default_txt_c();

  fnt = default_txt_sz() + " " + default_txt_fm();
  ctx.font = fnt;

  ctx.fillText( "clusters", ( 2.25 / 8.0 ) * w, 40 );
  ctx.fillText( "singletons", ( 6.5 / 8.0 ) * w, 40 );
}					// End function draw_topic_axis


function draw_topic_bbox()

  //  Draw topic cluster bounding boxes
{
  var  a;				// Global alpha value
  var  bbox;				// Bounding box corners, width, height
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  w;                               // Canvas width


  if ( !( canvas = get_canvas( "topic-canvas" ) ) ) {
    return;
  }

  w = canvas.width - 50;		// Width, height adjusted for border
  h = canvas.height - 50;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour

  ctx.font = "9px " + default_txt_fm();
  ctx.fillStyle = default_txt_c();
  ctx.strokeStyle = default_txt_c();

  a = ctx.globalAlpha;			// Save current globalAlpha

  for( i = 0; i < C_bbox.length; i++ ) {
    bbox = get_bbox( i, w, h );

  //  Draw bounding box filled @ 95% transparency, stroked @ 75%
  //  transparency

    ctx.globalAlpha = 0.05;
    ctx.fillRect( 25 + bbox.x0, 25 + bbox.y0, bbox.w, bbox.h );
    ctx.globalAlpha = 0.25;
    ctx.strokeRect( 25 + bbox.x0, 25 + bbox.y0, bbox.w, bbox.h );
  }

  ctx.globalAlpha = a;			// Restore globalAlpha
}					// End function draw_topic_bbox


function draw_topic_term()

  //  Draw topic cluster representative terms
{
  var  bbox;				// Bounding box corners, width, height
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  tw_n;				// Number of tweets in cluster
  var  txt_w;				// Text label width
  var  txt_h;				// Text label height
  var  txt_x;				// Text X-position
  var  txt_y;				// Text Y-position
  var  w;                               // Canvas width


  if ( !( canvas = get_canvas( "topic-canvas" ) ) ) {
    return;
  }

  w = canvas.width - 50;		// Width, height adjusted for border
  h = canvas.height - 50;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour

  ctx.font = "9px " + default_txt_fm();
  ctx.fillStyle = "rgba( 255, 255, 255, 0.5 )";

  txt_h = 13;				// Fixed height for 9px text

  //  Draw semi-opaque backgrounds for each list of keywords, and
  //  cluster tweet count

  for( i = 0; i < C_bbox.length; i++ ) {
    bbox = get_bbox( i, w, h );

  //  Semi-opaque background for keyword list

    txt_w = ctx.measureText( C_term[ i ] ).width;
    txt_x = ( 25 + bbox.x0 + ( bbox.w / 2 ) ) - ( txt_w / 2 );
    txt_y = 20 + bbox.y0 - ( txt_h - 2 );

  //  If background draws past left edge of canvas, shift it right

    txt_x = ( txt_x < 1 ) ? 1 : txt_x;
    ctx.fillRect( txt_x - 1, txt_y - 1, txt_w + 2, txt_h + 2 );

  //  Semi-opaque background for cluster tweet count

    tw_n = Object.keys( C[ i ] ).length.toString();

    txt_w = ctx.measureText( tw_n ).width;
    txt_x = 25 + bbox.x0 + bbox.w - txt_w;
    txt_y = 25 + bbox.y0 + bbox.h + 12 - ( txt_h - 2 );

    ctx.fillRect( txt_x - 1, txt_y - 1, txt_w + 2, txt_h + 2 );
  }

  ctx.fillStyle = default_txt_c();	// Set default text colour
  ctx.textAlign = "center";		// Center justify cluster terms

  //  Draw keywords over semi-opaque backgrounds

  for( i = 0; i < C_bbox.length; i++ ) {
    bbox = get_bbox( i, w, h );

  //  If terms draw past left edge of canvas, shift them right

    txt_w = ctx.measureText( C_term[ i ] ).width;
    txt_x = 25 + bbox.x0 + ( bbox.w / 2 );
    if ( txt_x < txt_w / 2 ) {
      txt_x = txt_w / 2;
    }

    ctx.fillText( C_term[ i ], txt_x, 20 + bbox.y0 );
  }

  ctx.textAlign = "right";		// Right justify tweet count

  //  Draw cluster tweet counts over semi-opaque backgrounds

  for( i = 0; i < C_bbox.length; i++ ) {
    bbox = get_bbox( i, w, h );

    tw_n = Object.keys( C[ i ] ).length.toString();
    ctx.fillText( tw_n, 25 + bbox.x0 + bbox.w, 25 + bbox.y0 + bbox.h + 12 );
  }
}					// End function draw_topic_term


function get_bbox( b, canvas_w, canvas_h )

  //  Return the corners and width of a topic cluster bounding box
  //
  //  b:         Cluster bounding box to query
  //  canvas_w:  Canvas width
  //  canvas_h:  Canvas height
{
  var  bbox = {				// Box w/4 corners, width, height
         x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0, w: 0, h: 0
       };


  if ( b < 0 || b >= C_bbox.length ) {
    return bbox;
  }

  bbox.w = ( C_bbox[ b ].w / 8.0 ) * canvas_w;
  bbox.h = ( C_bbox[ b ].h / 8.0 ) * canvas_h;

  bbox.x0 = ( C_bbox[ b ].ll_x - 1 ) / 8.0 * canvas_w;
  bbox.y0 = ( ( 8.0 - ( C_bbox[ b ].ll_y - 1 ) ) / 8.0 * canvas_h ) - bbox.h;

  bbox.w += 20;				// Grow bounding box by 20 pixels
  bbox.h += 20;

  bbox.x0 = bbox.x0 - 10;		// Update upper-left corner
  bbox.y0 = bbox.y0 - 10;
  bbox.x1 = bbox.x0;			// Counterclockwise order
  bbox.y1 = bbox.y0 + bbox.h;
  bbox.x2 = bbox.x1 + bbox.w;
  bbox.y2 = bbox.y1;
  bbox.x3 = bbox.x2;
  bbox.y3 = bbox.y0;

  return bbox;
}					// End function get_bbox


function init_topic()

  //  Initialize topic cluster canvas
{
  var  canvas;  			// Canvas element on page


  if ( !( canvas = get_canvas( "topic-canvas" ) ) ) {
    return;
  }

  //  Add event handle for mouse clicks, to trigger info dialog

  canvas.addEventListener( "click", function( e ) {
    handle_click_evt( e, "#topic-canvas" );
  }, 0 );

  //  Add event handler for mouse moves, to trigger tooltips

  canvas.addEventListener( "mousemove", function( e ) {
    handle_mousemove_evt( e, "#topic-canvas" );
  }, 0 );
/*
  $("#topic-slider").slider( {		// Init min cluster size slider
    min: 3,
    max: 15,
    slide: function( e, ui ) {		//  Update label value on slide
      $("#min-cluster-val").text( ui.value );
    },
    range: "min",			//  Anchor slider at left endpoint
    step: 1, 
    value: 5				//  Initial min cluster size of 5
  } );

  $("#min-cluster-val").text( $("#topic-slider").slider( "value" ) );

  $("#min-cluster-lbl").html( "Minimum Cluster Size:&nbsp;&nbsp;" );
  style_txt( "#min-cluster-lbl" );
*/
}					// End routine init_topic


function resize_topic()

  //  When tab is shown or resized, resize the topic canvas
{
  var  canvas;  			// Canvas element on page
  var  slider_w;			// Width of min cluster size slider
  var  slider_x;			// X-pos of min cluster size slider
  var  w;				// Tab width


  if ( !( canvas = get_canvas( "topic-canvas" ) ) ) {
    return;
  }
  w = $("#topic-tab").width();		// Get topic tab's width

  if ( canvas.width != w - 100 ) {	// Width needs to be updated?
    canvas.width = w - 100;

  //  Center slider in cluster region of canvas, left-align slider's
  //  label above the slider

    //slider_w = $("#topic-slider").width();
    //slider_x = 90 + ( w * ( 4.75 / 8.0 ) / 2.0 ) - ( slider_w / 2 );

    //$("#topic-slider").css( "left", slider_x );
    //$("#min-cluster-txt").css( "left", slider_x );

    draw_topic();
  }
}					// End function resize_topic
