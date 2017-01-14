/*--------------------------------------------------------------------------*/
/*  HEATMAP.JS								    */
/*    Routines to visualize sentiment frequency bins using a heatmap	    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  18-Apr-13	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  fq_hist = [			// Term frequency histogram
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
       [ 0, 0, 0, 0, 0, 0, 0, 0 ]
     ];
var  fq_hist_avg = 0;			// Term frequency average
var  fq_hist_max = 0;			// Term frequency maximum
var  fq_hist_min = 0;			// Term frequency minimum
var  fq_hist_n = 0;			// Number of non-zero term fq's


function draw_heatmap()

  //  Draw tweets on heatmap canvas
{
  var  canvas;  			// Canvas element on page
  var  col;				// Cell colour
  var  cell_h;				// Cell height
  var  cell_w;				// Cell width
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i, j;				// Loop counters
  var  scale;				// d3 logarithmic colour scale
  var  w;                               // Canvas width
  var  x, y;				// Top-left corner of cell


  if ( !( canvas = get_canvas( "heatmap-canvas" ) ) ) {
    return;
  }

  w = canvas.width;			// Get width, height of canvas
  h = canvas.height;

  clear_canvas( "heatmap-canvas" );	// Clear canvas contents

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  draw_heatmap_axis();			// Draw scatterplot axis/labels
  draw_heatmap_legend();		// Draw legend and limits
  draw_query_term( "heatmap-canvas" );	// Draw query term and tweet count

  //  Setup log scale to map sentiment frequency to colour

  scale = d3.scale.linear();
  scale.domain( [ 0, fq_hist_avg, fq_hist_max ] );

  if ( fq_hist_max == 0 ) {		// No terms, all cells white
    scale.range( [ [ 255, 255, 255 ], [ 255, 255, 255 ], [ 255, 255, 255 ] ] );
  } else {
    scale.range( [ [ 19, 54, 231 ], [ 193, 196, 214 ], [ 223, 14, 14 ] ] );
  }

  //  There's a 25-pixel pad to the right and left of the graph, and
  //  another 20-pixel pad for each quadrant of the heatmap to offset
  //  it within the axes

  cell_w = ( w - 130.0 ) / 8.0;
  cell_h = ( h - 130.0 ) / 8.0;

  y = 45;				// Top of first quadrant
  for( i = 0; i < 8; i++ ) {		// For all rows
    x = 45;				// Left of first quadrant
    for( j = 0; j < 8; j++ ) {		// For all columns
      ctx.beginPath();			// Draw heatmap cell
      ctx.rect( x, y, cell_w, cell_h );
      ctx.stroke();

    //  Colour above average cells red, below average cells blue, and
    //  cells with no tweets white

      if ( fq_hist[ 7 - i ][ j ] > 0 ) {
        col = scale( fq_hist[ 7 - i ][ j ] );
        ctx.fillStyle = d3.rgb( col[ 0 ], col[ 1 ], col[ 2 ] ).toString();
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fill();
 
      if ( j == 3 ) {			// Add offset around Y-axis
        x += 40;
      }
      x += cell_w;			// Move right to next cell
    }

    if ( i == 3 ) {			// Add offset around X-axis
      y += 40;
    }
    y += cell_h;			// Move down to next row of cells
  }
}					// End function draw_heatmap


function draw_heatmap_axis( canvas )

  // Draw pleasure/arousal axes on heatmap canvas
{
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  label = [                        // Emotion label text
    "pleasant", "unpleasant", "active", "subdued"
  ];
  var  off;				// Tick offset
  var  step;                            // Step distance between ticks
  var  w;                               // Canvas width


  if ( !( canvas = get_canvas( "heatmap-canvas" ) ) ) {
    return;
  }

  w = canvas.width;			// Get width, height of canvas
  h = canvas.height;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.strokeStyle = "rgb( 192, 192, 192 )";

  ctx.textAlign = "center";		// Setup label text
  ctx.fillStyle = default_txt_c();
  ctx.font = default_txt_sz() + " " + default_txt_fm();

  ctx.beginPath();                      // Draw pleasure/arousal axes
  ctx.moveTo( w / 2, 25 );
  ctx.lineTo( w / 2, h - 25 );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo( 25, h / 2 );
  ctx.lineTo( w - 25, h / 2 );
  ctx.stroke();

  //  There's a 25-pixel pad to the right and left of the graph, and
  //  another 20-pixel pad for each quadrant of the heatmap to offset
  //  it within the axes, so ticks must be positioned accordingly

  ctx.font = "9px " + default_txt_fm();
  ctx.textBaseline = "top";

  ctx.beginPath();			// Left tick
  ctx.moveTo( 25, ( h / 2 ) - 5 );
  ctx.lineTo( 25, ( h / 2 ) + 5 );
  ctx.stroke();
  ctx.fillText( "1", 25, ( h / 2 ) + 8 );

  ctx.beginPath();			// Right tick
  ctx.moveTo( w - 25, ( h / 2 ) - 5 );
  ctx.lineTo( w - 25, ( h / 2 ) + 5 );
  ctx.stroke();
  ctx.fillText( "9", w - 25, ( h / 2 ) + 8 );

  step = ( w - 130.0 ) / 8.0;		// Step size between ticks
  off = 45 + step;			// Initial tick offset

  for( i = 1; i < 8; i++ ) {
    if ( i == 4 ) {			// Jump over Y-axis
      off += 40;

    } else {
      ctx.beginPath();
      ctx.moveTo( off, ( h / 2 ) - 5 );
      ctx.lineTo( off, ( h / 2 ) + 5 );
      ctx.stroke();
      ctx.fillText( ( i + 1 ).toString(), off, ( h / 2 ) + 7 );
    }

    off += step;
  }

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  ctx.beginPath();			// Top tick
  ctx.moveTo( ( w / 2 ) - 5, 25 );
  ctx.lineTo( ( w / 2 ) + 5, 25 );
  ctx.stroke();
  ctx.fillText( "9", ( w / 2 ) - 8, 25 );

  ctx.beginPath();			// Bottom tick
  ctx.moveTo( ( w / 2 ) - 5, h - 25 );
  ctx.lineTo( ( w / 2 ) + 5, h - 25 );
  ctx.stroke();
  ctx.fillText( "1", ( w / 2 ) - 8, h - 25 );

  step = ( h - 130.0 ) / 8.0;		// Step size between ticks
  off = 45 + step;			// Initial tick offset

  for( i = 1; i < 8; i++ ) {		// Left-side interior ticks
    if ( i == 4 ) {			// Jump over Y-axis
      ctx.fillText( ( i + 1 ).toString(), ( w / 2 ) - 8, off + 32 );
      off += 40;

    } else {
      ctx.beginPath();
      ctx.moveTo( ( w / 2 ) - 5, off );
      ctx.lineTo( ( w / 2 ) + 5, off );
      ctx.stroke();
      ctx.fillText( ( 9 - i ).toString(), ( w / 2 ) - 8, off );
    }

    off += step;
  }

  ctx.textAlign = "center";             // Draw labels
  ctx.fillStyle = default_txt_c();
  ctx.font = default_txt_sz() + " " + default_txt_fm();

  //  Label at ends of axes (pleasant, unpleasant, active, subdued)
  //  must be placed explicitly

  ctx.textBaseline = "alphabetic";

  ctx.fillText( label[ 0 ], w - 25, ( h / 2 ) - 10 );
  ctx.fillText( label[ 1 ], 30, ( h / 2 ) - 10 );
  ctx.fillText( label[ 2 ], w / 2, 15 );
  ctx.fillText( label[ 3 ], w / 2, h - 10 );
}					// End function draw_heatmap_axis


function draw_heatmap_legend()

  //  Draw heatmap canvas legend (a blue-red gradiant rectangle with
  //  min/avg/max labels, and a white rectangle showing a zero
  //  freqeuncy)
{
  var  a;				// Circle alpha
  var  canvas;  			// Canvas element on page
  var  canvas_ID;			// Canvas HTML id
  var  col;				// Circle colour
  var  ctx;				// Canvas 2d context
  var  i;				// Loop counter
  var  L;				// Circle luminance
  var  r;				// Circle radius
  var  top;				// Top of legend within canvas
  var  w;                               // Canvas width
  var  x, y;                            // Label's (x,y) position

  var  grad;				// Colour scale gradient


  if ( !( canvas = get_canvas( "heatmap-legend" ) ) ) {
    return;
  }

  w = canvas.width;			// Get canvas width, height
  h = canvas.height;

  ctx = canvas.getContext( "2d" );	// Get context

  ctx.save();				// Clear untransformed canvas
  ctx.setTransform( 1, 0, 0, 1, 0, 0 );
  ctx.clearRect( 0, 0, w, h );
  ctx.restore();

  x = w - 50;				// Legend 20px wide, 30px right margin
  y = ( h - 300 ) / 2.0;		// Legend 300px tall, centered

  grad = ctx.createLinearGradient( x, y, 0, 300 + y );
  grad.addColorStop( 0.0, "rgb( 223, 14, 14 )" );
  grad.addColorStop( 0.5, "rgb( 213, 192, 192 )" );
  grad.addColorStop( 0.5, "rgb( 193, 196, 214 )" );
  grad.addColorStop( 1.0, "rgb( 19, 54, 231 )" );

  ctx.beginPath();
  ctx.rect( x, y, 20, 300 );
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "rgb( 192, 192, 192 )";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect( x, y + 310, 20, 20 );
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = default_txt_c();	// Draw labels
  ctx.font = default_txt_sz() + " " + default_txt_fm();

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText( "0", w - 60, y + 320 );
  ctx.textBaseline = "bottom";
  ctx.fillText( fq_hist_min.toString(), w - 60, y + 300 );
  ctx.textBaseline = "middle";
  ctx.fillText( Math.round( fq_hist_avg ).toString(), w - 60, y + 150 );
  ctx.textBaseline = "top";
  ctx.fillText( fq_hist_max.toString(), w - 60, y );

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText( "frequency", x + 10, h - 10 );

  ctx.textBaseline = "alphabetic";	// Reset baseline to default
}					// End function draw_heatmap_legend


function init_heatmap()

  //  Initialize heatmap
{
  var  canvas;  			// Canvas element on page


  if ( !( canvas = get_canvas( "heatmap-canvas" ) ) ) {
    return;
  }

  //  Add event handler for mouse moves, to trigger tooltips

  canvas.addEventListener( "mousemove", function( e ) {
    handle_mousemove_evt( e, "#heatmap-canvas" );
  }, 0 );
}					// End routine init_heatmap


function resize_heatmap()

  //  When tab is shown or resized, resize the heatmap canvas
{
  var  canvas;  			// Canvas element on page
  var  w;				// Tab width


  if ( !( canvas = get_canvas( "heatmap-canvas" ) ) ) {
    return;
  }
  w = $("#heatmap-tab").width();

  if ( canvas.width != w - 100 ) {	// Width needs to be updated?
    canvas.width = w - 100;
    draw_heatmap();
  }
}					// End function resize_heatmap


function update_heatmap_hist()

  //  Update the sentiment (valence,arousal) frequency histogram
{
  var  a_bin;				// Arousal bin
  var  i;				// Loop counter
  var  v_bin;				// Valence bin


  fq_hist.length = 0;			// Clear previous histogram

  for( i = 0; i < 8; i++ ) {		// Initialize zero-frequency array
    fq_hist.push( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  }

  fq_hist_avg = 0;			// Reset avg, max
  fq_hist_max = 0;
  fq_hist_min = tf.length;
  fq_hist_n = 0;

  for( i = 0; i < tf.length; i++ ) {	// For all tweets
    a_bin = Math.min( Math.floor( tw[ i ].avg[ ARO ] ), 8 ) - 1;
    v_bin = Math.min( Math.floor( tw[ i ].avg[ VAL ] ), 8 ) - 1;

    fq_hist[ a_bin ][ v_bin ]++;
    fq_hist_max = Math.max( fq_hist_max, fq_hist[ a_bin ][ v_bin ] );
    fq_hist_min = Math.min( fq_hist_min, fq_hist[ a_bin ][ v_bin ] );
  }					// End for all tweets

  for( i = 0; i < 8; i++ ) {		// Calculate average non-zero fq
    for( j = 0; j < 8; j++ ) {
      if ( fq_hist[ i ][ j ] > 0 ) {
        fq_hist_avg += fq_hist[ i ][ j ];
        fq_hist_n++;
      }
    }
  }

  fq_hist_avg /= fq_hist_n;
}					// End function update_heatmap_hist


function within_heatmap_cell()

  //  This routine identifes the heatmap cell and cell frequency under
  //  the mouse pointer
{
  var  canvas;  			// Canvas element on page
  var  cell_h;				// Cell height
  var  cell_w;				// Cell width
  var  h;                               // Canvas height
  var  i, j;				// Indices of cell under mouse
  var  w;                               // Canvas width
  var  x, y;				// Offset mouse position


  if ( !( canvas = get_canvas() ) ) {	// Get ref to ACTIVE TAB's canvas
    return { };
  }

  w = canvas.width;			// Width, height
  h = canvas.height;
  cell_w = ( w - 130.0 ) / 8.0;		// Heatmap cell width, height
  cell_h = ( h - 130.0 ) / 8.0;

  //  If mouse outside left, right, top, or bottom bounds of heatmap,
  //  or if it's in the buffer region around the axes, return no data

  if ( canvas_x < 45 || canvas_x > w - 45 ||
       ( canvas_x > 45 + ( cell_w * 4 ) && canvas_x < 85 + ( cell_w * 4 ) ) ||
       canvas_y < 45 || canvas_y > h - 45 ||
       ( canvas_y > 45 + ( cell_h * 4 ) && canvas_y < 85 + ( cell_h * 4 ) ) ) {
    return { };
  }

  x = canvas_x - 45;			// Adjust for left, center border
  if ( canvas_x > 45 + ( cell_w * 4 ) + 40 ) {
    x -= 40;
  }

  y = canvas_y - 45;			// Adjust for top, center border
  if ( canvas_y > 45 + ( cell_h * 4 ) + 40 ) {
    y -= 40;
  }

  //  Return empty result if mouse pointer outside of heatmap cells

  if ( x < 0 || x >= ( cell_w * 8 ) || y < 0 || y >= ( cell_h * 8 ) ) {
    return { };
  }

  i = 7 - Math.floor( y / cell_h );	// Convert mouse pos to cell index
  j = Math.floor( x / cell_w );

  return { a: i + 1, v: j + 1, fq: fq_hist[ i ][ j ] };
}					// End routine within_heatmap_cell
