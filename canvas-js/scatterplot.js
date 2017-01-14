/*--------------------------------------------------------------------------*/
/*  SCATTERPLOT.JS							    */
/*    Routines to draw the sentiment canvas				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  26-May-13	Christopher G. Healey	Refactored from draw.js		    */
/*--------------------------------------------------------------------------*/


function draw_tweet()

  //  Draw tweets on sentiment canvas
{
  var  ang = 2.0 * Math.PI;		// Angle for full circle
  var  canvas;  			// Canvas element on page
  var  col;				// Tweet circle colour
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  pos;				// Tweet position
  var  w;                               // Canvas width


  if ( !( canvas = get_canvas( "tweet-canvas" ) ) ) {
    return;
  }

  w = canvas.width - 50;		// Width, height minus border
  h = canvas.height - 50;

  clear_canvas( "tweet-canvas" );	// Clear canvas contents

  draw_tweet_axis( canvas );		// Draw scatterplot axis/labels
  draw_query_term( "tweet-canvas" );	// Draw query term and tweet count

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    col = tweet_colour( tw[ i ] );
    ctx.fillStyle =
      "rgba(" + col.r + "," + col.g + "," + col.b + "," + ( 1.0-col.a ) + ")";

    pos = tweet_pos( tw[ i ], w, h, "tweet-canvas" );
    
    ctx.beginPath();
    ctx.arc( 25 + pos.x, 25 + pos.y, tw[ i ].rad, 0.0, ang, false );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}					// End function draw_tweet


function draw_tweet_axis( canvas )

  // Draw pleasure/arousal axes on sentiment canvas
{
  var  ang;                             // Angle for label, in radians
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  step;                            // Step distance between ticks
  var  w;                               // Canvas width
  var  x, y;                            // Label's (x,y) position

  var  label = [                        // Emotion label text
    "pleasant", "unpleasant", "active", "subdued",
    "happy", "upset", "sad", "contented",
    "elated", "stressed", "unhappy", "serene",
    "excited", "nervous", "depressed", "relaxed",
    "alert", "tense", "bored", "calm"
  ];


  if ( !( canvas = get_canvas( "tweet-canvas" ) ) ) {
    return;
  }

  w = canvas.width;			// Get width, height of canvas
  h = canvas.height;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  ctx.beginPath();                      // Draw pleasure/arousal axes
  ctx.moveTo( w / 2, 25 );
  ctx.lineTo( w / 2, h - 25 );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo( 25, h / 2 );
  ctx.lineTo( w - 25, h / 2 );
  ctx.stroke();

  step = ( w - 50.0 ) / 8.0;
  for( i = 0; i < 9; i++ ) {            // Draw pleasure axis ticks
    ctx.beginPath();
    ctx.moveTo( 25 + ( i * step ), ( h / 2 ) - 5 );
    ctx.lineTo( 25 + ( i * step ), ( h / 2 ) + 5 );
    ctx.stroke();
  }

  step = ( h - 50.0 ) / 8.0;
  for( i = 0; i < 9; i++ ) {            // Draw arousal axis ticks
    ctx.beginPath();
    ctx.moveTo( ( w / 2 ) - 5, 25 + ( i * step ) );
    ctx.lineTo( ( w / 2 ) + 5, 25 + ( i * step ) );
    ctx.stroke();
  }

  ctx.textAlign = "center";             // Draw labels
  ctx.fillStyle = default_txt_c();
  ctx.font = default_txt_sz() + " " + default_txt_fm();

  //  Label at ends of axes (pleasant, unpleasant, active, subdued)
  //  must be placed explicitly

  ctx.fillText( label[ 0 ], w - 25, ( h / 2 ) - 10 );
  ctx.fillText( label[ 1 ], 30, ( h / 2 ) - 10 );
  ctx.fillText( label[ 2 ], w / 2, 15 );
  ctx.fillText( label[ 3 ], w / 2, h - 10 );

  for( i = 1; i < 5; i++ ) {		// Remaining labels around a circle
    ang = ( i * 18.0 ) / 180.0 * Math.PI;
    x = ( w / 2 ) + ( Math.cos( ang ) * ( ( w - 50 ) / 2 ) );
    y = ( h / 2 ) - ( Math.sin( ang ) * ( ( h - 50 ) / 2 ) );

    ctx.fillText( label[ ( i * 4 ) ], x, y );
    ctx.fillText( label[ ( i * 4 ) + 1 ], w - x, y );
    ctx.fillText( label[ ( i * 4 ) + 2 ], w - x, h - y );
    ctx.fillText( label[ ( i * 4 ) + 3 ], x, h - y );
  }
}					// End function draw_tweet_axis


function init_tweet()

  //  Initialize topic cluster canvas
{
  var  canvas;  			// Canvas element on page


  if ( !( canvas = get_canvas( "tweet-canvas" ) ) ) {
    return;
  }

  //  Add event handle for mouse clicks, to trigger info dialog

  canvas.addEventListener( "click", function( e ) {
    handle_click_evt( e, "#tweet-canvas" );
  }, 0 );

  //  Add event handler for mouse moves, to trigger tooltips

  canvas.addEventListener( "mousemove", function( e ) {
    handle_mousemove_evt( e, "#tweet-canvas" );
  }, 0 );
}					// End routine init_tweet


function resize_tweet()

  //  When tab is shown or resized, resize the tweet canvas
{
  var  canvas;  			// Canvas element on page
  var  w;				// Tab width


  if ( !( canvas = get_canvas( "tweet-canvas" ) ) ) {
    return;
  }
  w = $("#sentiment-tab").width();

  if ( canvas.width != w - 100 ) {	// Width needs to be updated?
    canvas.width = w - 100;
    draw_tweet();
  }
}					// End function resize_tweet
