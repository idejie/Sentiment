/*--------------------------------------------------------------------------*/
/*  CLOUD.JS								    */
/*    Routines to visualize frequent terms as a tag cloud		    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  cloud_timer_ID = -1;		// Current cloud setTimeout ID
var  resize_timer_ID = -1;		// Resize redraw setTimeout ID
var  tag = [ ];				// Tag cloud layouts
var  tag_term = [ [ ], [ ], [ ], [ ] ];	// Sorted (term,freq) list


var  cloud_key = function( d )		// Cloud key function variable

  //  Function to return key value for a tag cloud element
{
  return d.text.toLowerCase();		// Return lowercase term as key
}


function cloud_offset( i, w, h )

  //  Determine offset { x, y } of tag cloud's SVG
  //
  //  i:  Tag cloud ID (0=UL, 1=UR, 2=LL, 3=LR)
  //  w:  Width of SVG
  //  h:  Height of SVG
{
  switch( i ) {				// Return tag cloud's's translation
  case 0:				// Upper-left cloud
    return { x: w / 4, y: h / 4 };
  case 1:				// Upper-right cloud
    return { x: ( w / 4 ) * 3, y: h / 4 };
  case 2:				// Lower-left cloud
    return { x: w / 4, y: ( h / 4 ) * 3 };
  case 3:				// Lower-right cloud
    return { x: ( w / 4 ) * 3, y: ( h / 4 ) * 3 };
  default:
    return { x: 0, y: 0 };
  }
}					// End function cloud_offset


function cloud_reset_tooltip()

  //  Destroy any existing tooltip and reset any existing setTimeout
  //  timer
{
  if ( $("#cloud-svg").data( "qtip" ) ) {
    $("#cloud-svg").qtip( "destroy" );
  }

  clearTimeout( cloud_timer_ID );
}					// End function cloud_reset_tooltip


function cloud_tooltip( fq )

  //  Draw a qTip tooltip to show a term's frequency
  //
  //  fq:  Term frequency
{
  var  msg;				// Tooltip message
  var  pos_txt;				// Text position of tooltip
  var  pos_x, pos_y;			// Position of tooltip
  var  w;				// Cloud SVG width


  msg = fq.toString();			// Build tooltip message string
  if ( fq == 1 ) {
    msg = msg + " occurrence";
  } else {
    msg = msg + " occurrences";
  }

  $("#cloud-svg").qtip( {		// Create qTip tooltip on SVG
    content: msg,
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  w = $("#cloud-svg").width();

  if ( mouse_x() < w / 2 ) {		// Position up, right of mouse
    pos_x = mouse_x() + 3;
    pos_y = mouse_y() - 3;
    pos_txt = "bottom left";
  } else {				// Position up, left of mouse
    pos_x = mouse_x() - 3;
    pos_y = mouse_y() - 3;
    pos_txt = "bottom right";
  }

  $("#cloud-svg").qtip( "option", "position.my", pos_txt );
  $("#cloud-svg").qtip( "option", "position.target", [ pos_x, pos_y ] );

  $("#cloud-svg").qtip( "show" );	// Show tooltip
}					// End function cloud_tooltip


function draw_cloud( w )

  //  Draw words in tag cloud
{
  var  cloud_ID;			// Cloud HTML ID
  var  i, j;				// Loop counters
  var  tag_w;				// Words in target tag cloud
  var  text;				// Enter, exit, transition SVG text
  var  vis;				// SVG group to draw into


  //  Each tag cloud appends its HTML ID to the end of its word list
  //  to identify itself

  if ( w.length < 1 ) {			// No ID provided?
    return;
  }

  cloud_ID = w[ w.length - 1 ].text;	// Grab, validate ID
  if ( cloud_ID.indexOf( "cloud-svg" ) == -1 ) {
    return;
  }

  //  Grab tag cloud SVG group, update terms contained in the cloud

  vis = d3.select( "#cloud-svg" ).select( "g." + cloud_ID );
  text = vis.selectAll( "text" ).data( w, cloud_key );

  text.exit()				// Terms leaving cloud
    .text( function( d ) {		//  Debug by printing terms leaving
      //console.log( "exit(): " + d.text );
      return d.text;
    } )
    .transition()			//  Fade terms out over 500ms
    .duration( 500 )
    .style( "opacity", 1e-6 )
    .remove();				//  Remove text element from SVG

  text.transition()			// Terms remaining in cloud
    .duration( 1000 )
    .style( "font-size", function( d ) {
      return d.size + "px";
    } )
    .attr( "transform", function( d ) {
      return "translate(" + [ d.x, d.y ] + ") rotate(" + d.rotate + ")";
    } )
    .text( function( d ) {		//  Debug by printing terms remaining
      //console.log( "transition(): " + d.text );
      return d.text;
  } );

  text.enter()				// Terms added to cloud
    .append( "text" )			//  Add text element for each new term
    .on( "mouseenter", function( d ) {	//  Fire timer on hover for tooltip
      cloud_timer_ID = setTimeout( function() {
        cloud_tooltip( d.fq );
      }, 665 );
    } )
    .on( "mouseleave", function( d ) {	// Remove tooltip and timer
      cloud_reset_tooltip();
    } )
    .attr( "text-anchor", "middle" )
    .style( "font-size", function( d ) {
      return d.size + "px"; } )
    .style( "font-family", "Impact" )
    .style( "fill", function( d, i ) {	//  Use sentiment to colour text
      var  hex;			// Hex colour

      if ( d === undefined || d.col === undefined ) {
        return "#808080";
      } else {
        hex = '#';
        hex = hex + ( "0" + d.col.r.toString( 16 ) ).slice( -2 );
        hex = hex + ( "0" + d.col.g.toString( 16 ) ).slice( -2 );
        hex = hex + ( "0" + d.col.b.toString( 16 ) ).slice( -2 );
        return hex;
      }
    } )
    .style( "fill-opacity", function( d, i ) {
      if ( d === undefined || d.col === undefined ) {
        return 1.0;
      } else {
        return d.col.a;
      }
    } )
    .attr( "transform", function( d ) {
      return "translate(" + [ d.x, d.y ] + ") rotate(" + d.rotate + ")";
    } )
    .text( function( d ) {		//  Set the term's text
      //console.log( "enter(): " + d.text );
      return d.text;
    } )
    .style( "opacity", 1e-6 )		//  Fade term in over 1000ms
    .transition()
    .duration( 1000 )
    .style( "opacity", 1 );

  draw_cloud_axis();			// Redraw axes
  draw_query_term( "#cloud-svg" );
}					// End function draw_cloud


function draw_cloud_axis()

  //  Add axes to the tag cloud SVG
{
  var  fnt;				// Font formatting string
  var  h;				// Height of SVG element
  var  i;				// Loop counter
  var  step;				// Step distance between ticks
  var  vis;				// SVG element to draw into
  var  w;				// Width of SVG element
  

  w = $("#cloud-div").width();		// Get SVG div's width and height
  h = $("#cloud-div").height();

  vis = d3.select( "#cloud-svg" );

  vis.selectAll( "line.axis" ).remove();// Remove old axis lines and labels
  vis.selectAll( "text.axis" ).remove();

  vis.append( "svg:line" )		// Horizontal axis
    .attr( "class", "axis" )
    .attr( "x1", 25 )
    .attr( "y1", h / 2 )
    .attr( "x2", w - 25 )
    .attr( "y2", h / 2 )
    .attr( "stroke", "rgb( 192, 192, 192 )" );

  vis.append( "svg:line" )		// Vertical axis
    .attr( "class", "axis" )
    .attr( "x1", w / 2 )
    .attr( "y1", 25 )
    .attr( "x2", w / 2 )
    .attr( "y2", h - 25 )
    .attr( "stroke", "rgb( 192, 192, 192 )" );

  step = w - 50.0;
  for( i = 0; i < 2; i++ ) {		// Draw horizontal endpoint ticks
    vis.append( "svg:line" )
      .attr( "class", "axis" )
      .attr( "x1", 25 + ( i * step ) )
      .attr( "y1", ( h / 2 ) - 5 )
      .attr( "x2", 25 + ( i * step ) )
      .attr( "y2", ( h / 2 ) + 5 )
      .attr( "stroke", "rgb( 192, 192, 192 )" );
  }

  step = h - 50.0;
  for( i = 0; i < 2; i++ ) {		// Draw vertical endpoint ticks
    vis.append( "svg:line" )
      .attr( "class", "axis" )
      .attr( "x1", ( w / 2 ) - 5 )
      .attr( "y1", 25 + ( i * step ) )
      .attr( "x2", ( w / 2 ) + 5 )
      .attr( "y2", 25 + ( i * step ) )
      .attr( "stroke", "rgb( 192, 192, 192 )" );
  }

  fnt = "font: " + default_txt_sz() + " " + default_txt_fm() + "; ";
  fnt = fnt + "fill: " + default_txt_c() + ";";

  vis.append( "svg:text" )		// Draw pleasant label
    .attr( "class", "axis" )
    .attr( "x", w - 25 )
    .attr( "y", ( h / 2 ) - 10 )
    .attr( "text-anchor", "middle" )
    .attr( "style", fnt )
    .text( "pleasant" );

  vis.append( "svg:text" )		// Draw unpleasant label
    .attr( "class", "axis" )
    .attr( "x", 30 )
    .attr( "y", ( h / 2 ) - 10 )
    .attr( "text-anchor", "middle" )
    .attr( "style", fnt )
    .text( "unpleasant" );

  vis.append( "svg:text" )		// Draw active label
    .attr( "class", "axis" )
    .attr( "x", w / 2 )
    .attr( "y", 15 )
    .attr( "text-anchor", "middle" )
    .attr( "style", fnt )
    .text( "active" );

  vis.append( "svg:text" )		// Draw subdued label
    .attr( "class", "axis" )
    .attr( "x", w / 2 )
    .attr( "y", h - 10 )
    .attr( "text-anchor", "middle" )
    .attr( "style", fnt )
    .text( "subdued" );
}					// End method draw_cloud_axis


function init_cloud()

  //  Mainline for tag cloud
{
  var  cloud_ID;			// Cloud ID
  var  h;				// Height of SVG element
  var  off;				// {x,y} offset of SVG's origin
  var  svg;				// Cloud SVG element
  var  w;				// Width of SVG element


  w = d3.select( "#cloud-svg" ).attr( "width" );
  h = d3.select( "#cloud-svg" ).attr( "height" );

  for( i = 0; i < 4; i++ ) {		// For all tag clouds in SVG
    cloud_ID = "cloud-svg-0" + i;
    off = cloud_offset( i, w, h );

    d3.select( "#cloud-svg" )		// Add tag cloud to SVG
      .append( "g" )			//  Group in SVG to hold tag cloud
        .attr( "class", cloud_ID )
        .attr(				//  Move origin to center of SVG
          "transform", "translate(" + off.x + "," + off.y + ")" );

    tag.push( { } );
    tag[ i ] = d3.layout.cloud()	// Initialize tag cloud layout engine
      .words( [ ]
        .map( function( d ) {
          return { text: d[ 0 ], size: d[ 1 ] + 25 };
        } )
       )
      .rotate( function() {		// Two orientations: vert, horz
        return ~~( Math.random() * 2 ) * 90;
  	} )
      .size( [ w / 2, h / 2 ] )		// Size of tag cloud in SVG
      .timeInterval( 10 )
      .font( "Impact" )
      .fontSize( function( d ) {
        return +d.size;
      } )
      .on( "end", draw_cloud )
      .start()
  }

  //  Event listener to update raw mouse position on mousemove

  svg = document.getElementById( "cloud-svg" );

  svg.addEventListener( "mousemove", function( e ) {
    mouse_x( e.pageX );			// Raw mouse position
    mouse_y( e.pageY );
  }, 0 );
}					// End init_cloud


function resize_cloud()

  //  Resize the tag cloud SVG's width (BUT NOT height, which is fixed
  //  at 400) whenever the window resizes
{
  var  cloud_ID;			// Cloud ID
  var  h;				// Height of SVG element
  var  i;				// Loop counter
  var  off;				// {x,y} offset of SVG's origin
  var  w;				// Width of SVG element


  w = $("#cloud-div").width();		// Get SVG div's width and height
  h = $("#cloud-div").height();

  draw_cloud_axis();			// Redraw axes
  draw_query_term( "#cloud-svg" );

  if ( d3.select( "#cloud-svg" ).attr( "width" ) == w ) {
    return;
  }

  d3.select( "#cloud-svg" ).attr( "width", w );

  for( i = 0; i < 4; i++ ) {		// For all SVG elements
    cloud_ID = "cloud-svg-0" + i;
    off = cloud_offset( i, w, h );

    d3.select( "#cloud-svg" ).select( "g." + cloud_ID )
      .attr(				//  Move origin to center of SVG
        "transform", "translate(" + off.x + "," + off.y + ")" );

    tag[ i ].size( [ w / 2, h / 2 ] );
  }

  //  Wait until 1 second after last resize, then re-position terms

  if ( resize_timer_ID != -1 ) {	// Clear any pending redraw
    clearTimeout( resize_timer_ID );
  }

  resize_timer_ID = setTimeout( function() {
    var  i;				// Loop counter

    for( i = 0; i < 4; i++ ) {		// For all tag clouds
      tag[ i ].stop();			// Stop layout engine
      tag[ i ].start();			// Start layout engine
    }

    resize_timer_ID = -1;
  }, 1000 );
}					// End function resize_cloud


function tweet_anew_term( tw, term )

  //  This routine returns True if the term is one of the tweet's
  //  ANEW terms, False otherwise; we assume this is faster than calling
  //  anew_find_word() and anew_find_stem() on the term
  //
  //  tw:    Parent tweet
  //  term:  Term to query
{
  var  i;				// Loop counter


  for( i = 0; i < tw.anew.length; i++ ) {
    if ( term == tw.anew[ i ].word ) {
      return true;
    }
  }

  return false;
}					// End tweet_anew_term


function update_tag_term( max )

  //  Update tag clouds' terms
  //
  //  max:  Maximum number of terms per cloud
{
  var  anew;				// ANEW information on current term
  var  fq = [ { }, { }, { }, { } ];	// Term list w/word freq, 1 per cloud
  var  fq_col = [ { }, { }, { }, { } ];	// Term list w/word colours
  var  fq_max;				// Maximum term frequency
  var  fq_min;				// Minimum term frequency
  var  fq_tot;				// Total frequency in emotional region
  var  i, j;				// Loop counters
  var  sz;				// Log scale for font size
  var  t;				// Current term
  var  tag_ID;				// Tag cloud ID for current term
  var  term;				// Current term
  var  term_n;				// Number of terms


  tag_term = [ [ ], [ ], [ ], [ ] ];	// Empty previous terms

  for( i = 0; i < tw.length; i++ ) {	// For all tweets

    //  Use arousal and valence to assign tweets to tag clouds (remember
    //  range is 1..9, so midpoint is 5):
    //
    //   - VAL  < 5, ARO >= 5, cloud-svg-00
    //   - VAL >= 5, ARO >= 5, cloud-svg-01
    //   - VAL  < 5, ARO  < 5, cloud-svg-02
    //   - VAL >= 5, ARO  < 5, cloud-svg-03

    if ( tw[ i ].avg[ VAL ] < 5 && tw[ i ].avg[ ARO ] >= 5 ) {
      tag_ID = 0;
    } else if ( tw[ i ].avg[ VAL ] >= 5 && tw[ i ].avg[ ARO ] >= 5 ) {
      tag_ID = 1;
    } else if ( tw[ i ].avg[ VAL ] < 5 && tw[ i ].avg[ ARO ] < 5 ) {
      tag_ID = 2;
    } else {
      tag_ID = 3;
    }

    //  Process all terms; ANEW terms will be coloured based on
    //  pleasure; non-ANEW terms will be grey

    for( j = 0; j < tw[ i ].term.length; j++ ) {

      //  Skip &#1234; HTML extended charset tags, at this point
      //  they're reduced to #1234

      if ( tw[ i ].term[ j ].search( /#[0-9]/ ) != -1 ) {
        continue;
      }

      //  Grab term, strip specific punctuation and whitespace, strip
      //  http[s], ignore empty terms (\u2026 = ellipsis)

      term = tw[ i ].term[ j ];
      term = term.replace( /[.,?!:;=\+\-\(\)\[\]'`\u2026"/\s]/g, "" );
      term = term.replace( /https/g, "" ).replace( /http/g, "" );
      if ( term.length == 0 ) {
        continue;
      }

      //  If the term contains ONLY digits, ignore it

      if ( term.replace( /\d/g, "" ).length == 0 ) {
        continue;
      }

      //  If term contains only allowed punctuation (#_%), ignore it

      if ( term.replace( /[#_%]/g, "" ).length == 0 ) {
        continue;
      }

      //  If term seen for the first time in a tag cloud, initialize
      //  its count, otherwise increment its document frequency

      if ( !fq[ tag_ID ].hasOwnProperty( tw[ i ].term[ j ] ) ) {
        fq[ tag_ID ][ term ] = 1;

        //  Get colour for term: blue for unpleasant, green for
        //  pleasant, grey for not in ANEW dictionary, adjust alpha to
        //  range 0.1-1.0

        if ( tweet_anew_term( tw[ i ], term ) == true ) {
          fq_col[ tag_ID ][ term ] = term_colour( term );
        } else {
          fq_col[ tag_ID ][ term ] = { r: 128, g: 128, b: 128, a: 1.0 };
        }
        fq_col[ tag_ID ][ term ].a = .1 + ( fq_col[ tag_ID ][ term ].a * .9 );

      } else {
        fq[ tag_ID ][ term ]++;
      }
    }
  }					// End for all tweets

  for( i = 0; i < 4; i++ ) {		// For all term lists
    fq_tot = 0;

    for( t in fq[ i ] ) {		// Save (term,freq) pairs
      fq_tot += fq[ i ][ t ];
      tag_term[ i ].push( [ t, fq[ i ][ t ] ] );
    }

    //  Add percentage frequency and colour to each tag term entry

    for( j = 0; j < tag_term[ i ].length; j++ ) {
      tag_term[ i ][ j ].push( tag_term[ i ][ j ][ 1 ] / fq_tot );
      tag_term[ i ][ j ].push( fq_col[ i ][ tag_term[ i ][ j ][ 0 ] ] );
    }

    //  Sort term array descending by frequency, keep (up to) max terms

    tag_term[ i ].sort( function( t0, t1 ) {
      return t1[ 1 ] - t0[ 1 ];
    } );
    tag_term[ i ] = tag_term[ i ].slice( 0, max );
  }

  //  Determine minimum and maximum term count across all 4 clouds

  fq_max = 0;
  fq_min = Number.MAX_VALUE;

  for( i = 0; i < 4; i++ ) {
    term_n = tag_term[ i ].length;

    if ( term_n > 0 ) {
      fq_max = Math.max( tag_term[ i ][ 0 ][ 1 ], fq_max );
      fq_min = Math.min( tag_term[ i ][ term_n - 1 ][ 1 ], fq_min );
    }
  }

  sz = d3.scale.log();			// Log scale to map fontsize
  sz.domain( [ fq_min, fq_max ] );
  sz.rangeRound( [ 15, 40 ] );

  for( i = 0; i < 4; i++ ) {		// For all tag clouds
    tag[ i ].stop();			// Stop layout engine

    //  All tag clouds use draw_cloud(), but draw_cloud() doesn't know
    //  which tag cloud is calling, so we append the tag cloud's HTML
    //  ID to its tag list

    tag_term[ i ].push( [ "cloud-svg-0" + i, 0, 0 ] );

    tag[ i ].words( tag_term[ i ]	// Update words in tag cloud
      .map( function( d ) {
        return {
          text: d[ 0 ], size: sz( d[ 1 ] ), fq: d[ 1 ], col: d[ 3 ]
        }
      } ) );

    tag[ i ].start();			// Start layout engine
  }
}					// End function update_tag_term
