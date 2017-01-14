/*--------------------------------------------------------------------------*/
/*  AFFINITY.JS								    */
/*    Routines to build an affinity graph and visualize it as a d3 force    */
/*    directed graph							    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  28-May-13	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Some notes on how to dynamically update a d3 force-directed graph
//
//  1. Create global node[ ] and edge[ ] arrays
//  2. Create a force object, and attach the node and edge arrays to
//     that object:
//
//     force = d3.layout.force()
//       .nodes( node )
//       .links( link ) ...
//
//     From here on, you can append new data to node or link, BUT
//     NEVER directly manipulate existing data (you can add or remove
//     nodes, but don't touch their values), because force has
//     modified it and those modifications need to be maintained
//
//  3. Create global n_list[ ] and l_list[ ] arrays of SVG elements to
//     represent nodes (e.g. a circle) and SVG elements to represent
//     links (e.g. a line)
//
//  4. To attach visible elements to the nodes and links, use the
//     normal selectAll(), enter(), exit() procedure. NOTICE that we
//     ask force for the node list!
//
//       n_list = svg.selectAll( ".node" )
//         .data( force.nodes() );
//       n_list.exit().remove();
//       n_list.enter()
//         .append( "circle" )
//         .append( "class", "node" )
//         .attr( "r", 5 )
//         .attr( "fill", "#ff0000 );
//
//     Remember that existing nodes are referencing their data back
//     through force. Now you see why YOU MUST NEVER directly
//     manipulate the node list's data. The only reason the graph
//     "looks" the same, with a few new nodes is because the previous
//     nodes have their positions already set by the previous call to
//     force.start(). So don't touch them.
//
//  5. One final node on SVG groups, if you use these to hold a set of
//     SVG elements (e.g. a circle plus a label), you must ensure you
//     empty the group before appending new data back into it,
//     otherwise you'd be multiple elements in each group:
//
//       n_list.exit().remove();
//
//       //  Now enter() will re-use existing SVG groups, so empty
//       //  them first
//
//       g_list = svg.selectAll( ".node" )[ 0 ];
//       for( i = 0; i < g_list.length; i++ ) {
//         while( g_list[ i ].lastChild ) {
//           g_list[ i ].removeChild( g_list[ i ].lastChild );
//         }
//       }
//
//       n_list.enter()
//         .append( "g" )
//         .class( "node" );
//       n_list
//         .append( "circle" )
//         .attr( "r", 5 )
//         .attr( "fill", "#ff0000 );


//  Module global variables

var  affinity_timer_ID = -1;		// Current tooltip setTimeout ID
var  click_x = -1;			// Mouse x-position on mouse down
var  click_y = -1;			// Mouse y-position on mouse down
var  cutoff;				// Minimum set size cutoff
var  graph_svg;				// SVG to draw into
var  force;				// d3 force directed graph
var  graph = {				// Graph data
       "node": [ ],			//  Nodes: { name:, group: }
       "edge": [ ]			//  Edges: { source:, target:, value: }
     };
var  l_list;				// List of current link elements
var  n_list;				// List of current node elements
var  node_sz;				// Log scale for node size
var  req_n;				// Number of URL expand requests
var  xhr_list = [ ];			// List of active AJAX calls

//  Hashtag, person, and URL nodes, array of unique values with JSON format:
//    - g_ID:  Unique graph node ID
//    - n:     Number of occurrences of value
//    - ID:    Array [] of tw[] indices of tweets with this value

var  h_node = { };			// Hashtag nodes
var  p_node = { };			// Person nodes
var  u_node = { };			// URL nodes

//  Tweet nodes, array of tweet "equivalence sets" with JSON format:
//    - anchor:  tw[] index of set's anchor tweet
//    - g_ID:    Unique graph node ID
//    - n:       Number of tweets in set, including duplicates
//    - ID:      Array [] of tw[] indices of tweets in set
//    - tags:    Object list {} of unique hashtags in set's tweets

var  t_node = [ ];			// Tweet nodes (see above)


function add_hashtag( min_fq )

  //  This function finds all frequent hashtags
  //
  //  min_fq:  Threshold frequency to keep node, default=5
{
  var  i, j;				// Loop counters
  var  key;				// All hashtag nodes
  var  m;				// Regex retweet matches


  h_node = { };				// Empty hashtag node list

  if ( typeof min_fq == "undefined" ) {
    min_fq = 5;
  }

  for( i = 0; i < tw.length; i++ ) {	// For all tweets

    //  Regex to match #hashtags but not &#8812; HTML extended chars

    m = tw[ i ].raw.toLowerCase().match( /[^&]#\w+/g );

    if ( m != null ) {			// Hashtags exist?
      for( j = 0; j < m.length; j++ ) {
        add_node( h_node, m[ j ], i );
      }					// End for all hashtags
    }					// End if hashtags exist
  }					// End for all tweets

  key = Object.keys( h_node );		// Get all hashtags

  for( i = 0; i < key.length; i++ ) {	// Remove tags w/out min frequency
    if ( h_node[ key[ i ] ].n < min_fq ) {
      delete h_node[ key[ i ] ];
    }
  }
}					// End function add_hashtag


function add_node( list, val, i )

  //  Add node key to list of node keys
  //
  //  list:  List to update
  //  val:   Key value to add
  //  i:     Tweet index that caused the add
{
  if ( !list.hasOwnProperty( val ) ) {	// New value in list?
    list[ val ] = { "n": 1, "ID": [ i ] };

  } else {				// Update count, tweet index list
    list[ val ][ "n" ]++;
    list[ val ][ "ID" ].push( i );
  }
}					// End function add_node


function add_people( min_fq )

  //  This function finds all frequent people
  //
  //  min_fq:  Threshold frequency to keep node, default=5
{
  var  i, j;				// Loop counters
  var  key;				// All people nodes
  var  m;				// Regex retweet matches
  var  p_list = [ ];			// Array of person IDs
  var  pos;				// Position of @ character


  p_node = { };				// Empty people node list

  if ( typeof min_fq == "undefined" ) {
    min_fq = 5;
  }

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    add_node( p_node, "@" + tw[ i ].name, i );

    //  Look for retweets, they have the form:
    //
    //    - Optional RT either at front of string, or after non-word char
    //    - 0 or more spaces
    //    - @ sign
    //    - 0 or more spaces
    //    - 1 or more word characters
    //
    //  Match is case insensitive, and global to find all "@" occurrences

    m = tw[ i ].raw.match( /(^rt *@|\W+rt *@|^@|\W+@) *\w+/ig );

    if ( m != null ) {			// "@" matches exist?
      for( j = 0; j < m.length; j++ ) {

    //  Find person ID after "@" sign and 0 or more withspace chars

        pos = m[ j ].indexOf( "@" );
        p_list = m[ j ].substring( pos ).match( /\w+/ );

        add_node( p_node, "@" + p_list[ 0 ], i );
      }					// End for all "@" in tweet body
    }					// End if "@" matches exist
  }					// End for all tweets

  key = Object.keys( p_node );		// Get all people ID "keys"

  for( i = 0; i < key.length; i++ ) {	// Remove people w/out min frequency
    if ( p_node[ key[ i ] ].n < min_fq ) {
      delete p_node[ key[ i ] ];
    }
  }
}					// End function add_people


function add_url()

  //  This function finds URLs and starts their expansion
{
  var  amp;				// Position of ampersand in URL
  var  i;				// Loop counter
  var  m;				// Regex URL matches


  u_node = { };				// Empty URL node list

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    m = tw[ i ].raw.match( url_tag );

    if ( m != null ) {			// URLs exist?
      for( j = 0; j < m.length; j++ ) {

    //  Sometimes short URLs have an ampersand argument, this needs to
    //  be removed

        if ( ( amp = m[ j ].indexOf( "&" ) ) != -1 ) {
          m[ j ] = m[ j ].substr( 0, amp ); 
        }
        add_node( u_node, m[ j ], i );
      }					// End for all URLs in tweet body
    }					// End if URLs exist
  }					// End for all tweets

  expand_url();				// Expand all shortened URLs
}					// End function add_url


function affinity_reset_tooltip()

  //  Destroy any existing tooltip and reset any existing setTimeout
  //  timer
{
  if ( $("#affinity-svg").data( "qtip" ) ) {
    $("#affinity-svg").qtip( "destroy" );
  }

  clearTimeout( affinity_timer_ID );
}					// End function cloud_reset_tooltip


function affinity_tooltip( group, ID )

  //  Draw a qTip tooltip to show a node's descripton
  //
  //  group:  Node group (1=tweet, 2=person, 3=hashtag, 4=URL)
  //  ID:     Index or key within group list
{
  var  list;				// Reference to group's list
  var  msg;				// Tooltip text
  var  pos_txt;				// Text position of tooltip
  var  pos_x, pos_y;			// Position of tooltip
  var  tweet;				// Reference to anchor tweet in tw[]
  var  w;				// Cloud SVG width


  if ( group == 1 ) {			// Tweet
    tweet = tw[ t_node[ ID ].anchor ];

    //  Uses moment.js format() function (http://momentjs.com)
   
    msg = moment( new Date( tweet.time ) ).format( "MMM D, h:mma<br>" );
    msg = msg + "<b>" + tweet.name + "</b>: " + tweet.tip + "&nbsp;&nbsp;";
    msg = msg + "(x" + t_node[ ID ].n + ")";

  } else {
    if ( group == 2 ) {			// Person
      list = p_node;
    } else if ( group == 3 ) {		// Hashtag
      list = h_node;
    } else {				// URL
      list = u_node;
    }

    msg = ID + "  ";			// Build message as ID plus freq count
    msg = msg + "(x" + list[ ID ].ID.length + ")";
  }

  $("#affinity-svg").qtip( {		// Create qTip tooltip on SVG
    content: msg,
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  w = $("#affinity-div").width();

  if ( mouse_x() < w / 2 ) {		// Position up, right of mouse
    pos_x = mouse_x() + 3;
    pos_y = mouse_y() - 3;
    pos_txt = "bottom left";
  } else {				// Position up, left of mouse
    pos_x = mouse_x() - 3;
    pos_y = mouse_y() - 3;
    pos_txt = "bottom right";
  }

  $("#affinity-svg").qtip( "option", "position.my", pos_txt );
  $("#affinity-svg").qtip( "option", "position.target", [ pos_x, pos_y ] );

  $("#affinity-svg").qtip( "show" );	// Show tooltip
}					// End function affinity_tooltip


function assign_graph_ID()

  //  Every node in the graph needs a unique graph ID, so we assign
  //  them here after all nodes are constructed; order is text nodes,
  //  then people nodes, then hashtag nodes, then URL nodes
{
  var  fq_max;				// Maximum node value frequency
  var  fq_min;				// Minimum node value frequency
  var  i, j;				// Loop counters
  var  ID;				// Current node ID
  var  n;				// Number of values attached to node
  var  node_list;			// Current node list to process
  var  key;				// Keys from node list


  if ( graph.node.length != 0 ) {	// Graph should be empty
    clear_graph();
  }

  fq_max = 0;				// Intialize frequency ranges
  fq_min = Number.MAX_VALUE;

  for( i = 0; i < t_node.length; i++ ) {
    t_node[ i ][ "g_ID" ] = graph.node.length;

    n = t_node[ i ].n;
    graph.node.push( { "ID": i,
      "name": anchor( t_node[ i ][ "anchor" ] ), "size": n, "group": 1 } );

    fq_max = Math.max( fq_max, t_node[ i ].n );
    fq_min = Math.min( fq_min, t_node[ i ].n );
  }

  //  Process p_node and h_node lists here but not u_node, that's done
  //  in insert_url_node_edge() after all the URLs are expanded

  for( i = 0; i < 2; i++ ) {		// Process p_node, h_node lists
    if ( i == 0 ) {			// p_node
      node_list = p_node;
    } else {				// h_node
      node_list = h_node;
    }

    key = Object.keys( node_list );	// Keys in list

    for( j = 0; j < key.length; j++ ) {
      node_list[ key[ j ] ][ "g_ID" ] = graph.node.length;

      n = node_list[ key[ j ] ].n;
      graph.node.push(
        { "ID": key[ j ], "name": key[ j ], "size": n, "group": ( i + 2 ) } );

      fq_max = Math.max( fq_max, node_list[ key[ j ] ].n );
      fq_min = Math.min( fq_min, node_list[ key[ j ] ].n );
    }
  }

  node_sz = d3.scale.log();		// Log scale to map node size
  node_sz.domain( [ fq_min, fq_max ] );	// Log scale sizes to range 5..20
  node_sz.rangeRound( [ 5, 20 ] );

  for( i = 0; i < graph.node.length; i++ ) {
    graph.node[ i ][ "size" ] = node_sz( graph.node[ i ][ "size" ] );
  }
}					// End function assign_graph_ID


function build_affinity_edge()

  //  Build the affinity graph edge table; remember that URL edges
  //  will come later, after URLs are expanded via build_url_edge()
{
  var  i, j;				// Loop counters
  var  lf;				// Left endpoint node
  var  rt;				// Right endpoint node


  if ( graph.edge.length != 0 ) {	// Graph should be empty
    clear_graph();
  }

  assign_graph_ID();			// Assign unique IDs to all nodes

  //  Dissimilarity matrix should already be available from
  //  update_tfidf(), if it's not, create it

  if ( dissim.length != tw.length ) {
    comp_dissim();
  }

  //  Build text-text edges if nodes' anchors are < 0.8 dissimilar

  for( i = 0; i < t_node.length; i++ ) {
    for( j = i + 1; j < t_node.length; j++ ) {
      lf = t_node[ i ].anchor;
      rt = t_node[ j ].anchor;

      if ( dissim[ lf ][ rt ] < 0.8 ) {
        graph.edge.push( { "value": 1,
          "source": t_node[ i ].g_ID, "target": t_node[ j ].g_ID } );
      }
    }
  }

  build_txt_node_edge( p_node );	// Build text-person edges
  build_txt_node_edge( h_node );	// Build text-hashtag edges
}					// End function build_affinity_edge


function build_txt_node_edge( list )

  //  Helper function to add text-node edges for a person, hashtag, or
  //  url node list
  //
  //  list:  List to match against
{
  var  i, j;				// Loop counters
  var  key;				// Keys from node list


  key = Object.keys( list );
  for( i = 0; i < key.length; i++ ) {
    if ( typeof list[ key[ i ] ] == "undefined" ) {
      console.log( "build_txt_node_edge(), missing entry @ " + key[ i ] );
      continue;
    }

  //  For all text equivalence sets, check if any of the set's tweet
  //  IDs show up in the current node's tweet IDs

    for( j = 0; j < t_node.length; j++ ) {
      if ( tw_list_overlap( list[ key[ i ] ].ID, t_node[ j ].ID ) ) {
        graph.edge.push( { "value": 1,
          "source": list[ key[ i ] ].g_ID, "target": t_node[ j ].g_ID } );
      }					// End for all tweets in text node
    }					// End for all text nodes
  }					// End for all list nodes
}					// End function build_txt_node_edge


function cancel_ajax_req()

//  Cancel any pending AJAX requests
{
  var  i;				// Loop counter


  if ( xhr_list.length > 0 ) {	// Cancel pending AJAX requests?
    for( i = 0; i < xhr_list.length; i++ ) {
      console.log( "expand_url(), abort pending AJAX call " + xhr_list[ i ] );
      xhr_list[ i ].abort();
    }

    xhr_list.length = 0;
  }
}					// End function cancel_ajax_req


function clear_graph()

  //  Clear all nodes and links in the current graph
{
  var  vis;				// SVG element to draw into


  //  Note, we must empty the existing array, NOT assign a new, empty
  //  array, because force is referencing the array, so assigning a
  //  new one through graph.node or graph.edge wouldn't affect force

  graph.node.length = 0;		// Remove all entries from array
  graph.edge.length = 0;

  //  Drawing the now emtpy graph will apply exit(), which will remove
  //  all the node and link SVG elements

  draw_affinity();

  //  Remove tweet query term and count

  vis = d3.select( "#affinity-svg" );
  vis.selectAll( ".affinity-count" ).remove();

  //  Hide the "spinner" for pendnig AJAX requests, if its visible

  $("#affinity-spinner").css( "display", "none" );
}					// End function clear_graph


function draw_affinity()

  //  Update graph with current nodes and edges
{
  var  c;				// Tweet colour
  var  g_list;				// List of SVG group elements
  var  i;				// Loop counters
  var  link;				// Enter, exit, transition links
  var  node;				// Enter, exit, transition nodes


  //  Here we update the current list of nodes (n_list) and links
  //  (l_list) to a new list to hold the new data, notice WE MUST ask
  //  force for the nodes and links

  n_list = n_list.data( force.nodes() );
  l_list = l_list.data( force.links() );

  //  Draw links, then nodes, so nodes appear on top of links

  l_list.exit()				// Remove ALL old links
    .remove();

  l_list.enter()			// Add new links as SVG line
    .append( "line" )
    .attr( "class", "link" )
    .style( "stroke", "#ccc" )
    .style( "stroke-width", function( d ) {
      return Math.sqrt( d.value );
    } );

  n_list.exit()				// Remove nodes no longer needed
    .remove();

  //  At this point, SVG groups for previous nodes have a circle +
  //  label, if we just append() in enter() we'll add ANOTHER circle +
  //  label, so we need to clean out each group in the transition

  g_list = d3.selectAll( ".node" )[ 0 ];
  for( i = 0; i < g_list.length; i++ ) {
    while( g_list[ i ].lastChild ) {
      g_list[ i ].removeChild( g_list[ i ].lastChild );
    }
  }

  n_list.enter()			// Add new nodes
    .append( "g" )			//  SVG group for circle + label
    .attr( "class", "node" )
    .call( force.drag );

  n_list.append( "circle" )		// Add circle for node
    .on( "mouseenter", function( d ) {	// Show tooltip

      //  If we're currently dragging the circle, don't show tooltip

      if ( click_x != -1 || click_y != -1 ) {
        return;
      }

      affinity_timer_ID = setTimeout( function() {
        affinity_tooltip( d.group, d.ID );
      }, 665 );
    } )
    .on( "mouseleave", function( d ) {	// Destroy tooltip, reset timer
      affinity_reset_tooltip();
    } )
    .on( "mousedown", function( d ) {
      click_x = mouse_x();		// Grab mouse position
      click_y = mouse_y();
      affinity_reset_tooltip();
    } )
    .on( "click", function( d ) {	// Handle node clicks
      var  drag;			// Circle was dragged flag

      //  If mouse position now is different from original mousedown,
      //  then the circle was dragged, not clicked

      drag = click_x != mouse_x() || click_y != mouse_y();

      if ( !drag ) {			// Info dialogs, but not if dragged
        if ( d.group == 1 ) {		//  Click on tweet, info dialog
          show_affinity_info_dlg( t_node[ d.ID ].ID, 10 );
        } else if ( d.group == 2 ) {	//  Click on person
          show_affinity_info_dlg( p_node[ d.ID ].ID, 10 );
        } else if ( d.group == 3 ) {	//  Click on hashtag
          show_affinity_info_dlg( h_node[ d.ID ].ID, 10 );
        } else if ( d.group == 4 ) {	//  Click on URL, spawn page
          window.open( d.name, "_blank" );
        }
      }

      click_x = -1;			// Reset mousedown position
      click_y = -1;
    } )
    .attr( "r", function( d ) {
      return d.size;
    } )
    .style( "fill", function( d ) {
      switch( d.group ) {
      case 1:				// Tweet, sentiment colour
        c = tweet_colour( tw[ t_node[ d.ID ].anchor ] );
        return "rgba(" + c.r + "," + c.g + "," + c.b + ",0.85)";
      //return "rgba(" + c.r + "," + c.g + "," + c.b + "," + ( 1.0-c.a ) + ")";
      case 2:				// Person, orange
        return "rgba(255,166,0,0.85)";
      case 3:				// Hashtag, brown
        return "rgba(222,222,0,0.85)";
      default:				// URL, red
        return "rgba(201,0,0,0.85)";
      }
    } );

  n_list.append( "text" )		// Add label for node
    .attr( "dx", 0 )			//  Position label below circle
    .attr( "dy", function( d ) {
      return d.size + 10;
    } )
    .attr( "font-size", default_txt_sz() )
    .attr( "font-family", default_txt_fm() )
    .attr( "fill", default_txt_c() )
    .attr( "text-anchor", "middle" )
    .text( function( d ) {
      var  end;				// Position of end of URL root
      var  pos;				// Position of end of http[s]://
      var  url;				// URL root

      if ( d.group == 1 ) {		//  No label for tweets (too long)
        return "";
      } else if ( d.group == 2 ) {	//  Label for person node is name
        return d.name;
      } else if ( d.group == 3 ) {	//  Label for tag node is hashtag
        return d.name;
      } else {

    //  Grab the start of the URL, stripping http:// if it exists

        if ( ( pos = d.name.indexOf( "://" ) ) != -1 ) {
          url = d.name.substring( pos + 3 );
        } else {
          url = d.name;
        }

        if ( ( end = url.indexOf( "/" ) ) != -1 ) {
          url = url.substring( 0, end );
        }

        return url;
      }
    } );

  force.start();			// Start force layout algorithm
}					// End function draw_affinity


function expand_url()

  //  This function builds a list of all URLs, then calls PHP to
  //  expand them
{
  var  base_url =			// Base PHP URL
       PHP_URL() + "multi_trace_url.php?url=";
  var  i, j;				// Loop counters
  var  key;				// All URL nodes
  var  m;				// Regex retweet matches
  var  num_url = 25;			// Number of URLs per PHP query
  var  url;				// URL query string
  var  xhr;				// Ajax request ID


  cancel_ajax_req();			// Cancel pending AJAX requests

  key = Object.keys( u_node );		// Get all URLs to expand
  if ( key.length == 0 ) {
    return;
  }

  //  Show spinner to indicate URL expansion is running

  $("#affinity-spinner").css( "display", "block" );

  req_n = 0;				// Initialize URL blocks requested
  url = base_url;			// Initialize PHP query

  for( i = 0; i < key.length; i++ ) {	// For all URLs

  //  Do we need encodeURIComponent( key[ i ] ) here?

    url = url + key[ i ] + ",";		// Add URL to PHP query

  //  Only fire AJAX request if threshold number of URLs queued, or if
  //  this is the last URL

    if ( ( i + 1 ) % num_url != 0 && i != key.length - 1 ) {
      continue;
    }

    req_n++;				// Increment URL blocks requested

    xhr = $.ajax( {			// Post query to PHP server
      url: url.substr( 0, url.length - 1 ),
      dataType: "jsonp",
      timeout: 45000,			//  45-second timeout

      success: function( data, status, jqXHR ) {
        var  pos;			// Index into XHR list

        if ( typeof data.url != "undefined" ) {
          console.log( "Success on " + data.url.length + " URLs" );
        } else {
          console.log( "Success but no URLs: " + data );
        }

     //  Attempt to find and remove AJAX request on pending XHR list

        if ( ( pos = xhr_list.indexOf( jqXHR ) ) == -1 ) {
          console.log( "expand_url(), no match to success's jqXHR" );
        } else {
          req_n--;			// Decrement requests remaining
          xhr_list.splice( pos, 1 );
        }

        if ( typeof data.url != "undefined" ) {
          update_url( data.url );	// Update short URLs to long's
        }

    //  If all requests processed, insert final URL nodes and edges, and
    //  turn off progress spinner on affinity tab

        if ( req_n == 0 ) {
          insert_url_node_edge( cutoff );
          $("#affinity-spinner").css( "display", "none" );
        }
      },				// End successful AJAX call

      error: function( jqXHR, status, err ) {
        console.log( "Error during expand_url()\nError: " + err );
        req_n--;

    //  If all requests processed, turn off progress spinner on
    //  affinity tab, and if final request wasn't aborted, try to
    //  process URLs we received

        if ( req_n == 0 ) {
          $("#affinity-spinner").css( "display", "none" );

          if ( err != "abort" ) {	// If not abort, try to process URLs
            insert_url_node_edge( cutoff );
          }
        }
      }					// End error on AJAX call
    } );				// End AJAX call

    xhr_list.push( xhr );		// Save AJAX call's XHR
    url = base_url;			// Reset URL string
  }					// End for all URLs
}					// End function expand_url


function graph_tick()

  //  Function to call on force directed graph tick to adjust
  //  positions of link endpoints and SVG groups containing circle and
  //  label
{
  var  h;				// Current SVG height
  var  w;				// Current SVG width


  w = $("#affinity-div").width();
  h = $("#affinity-div").height();

  //  Since we've significantly reduced gravity, nodes will try to fly
  //  outside the SVG, so we constrain their positions here

  n_list
    .attr( "transform", function( d ) {
      var  size;			// Buffer border in SVG
      var  x, y;			// Position of SVG group

      size = d.size + 15;		// Buffer width of element + 15 px

    //  Constrain position of group to lie within SVG

      x = Math.max( size, Math.min( d.x, w - size ) );
      y = Math.max( size, Math.min( d.y, h - size ) );

      return "translate(" + x + "," + y + ")";
    } );

  l_list
    .attr( "x1", function( d ) {
      var  size;			// Buffer border in SVG

      size = d.source.size + 15;	// Buffer width of element + 15 px

    //  Apply constraints to link endpoints identical to SVG group
    //  positions

      return Math.max( size, Math.min( d.source.x, w - size ) );
    } )
    .attr( "y1", function( d ) {
      var  size;			// Buffer border in SVG

      size = d.source.size + 15;	// Buffer width of element + 15 px
      return Math.max( size, Math.min( d.source.y, h - size ) );
    } )
    .attr( "x2", function( d ) {
      var  size;			// Buffer border in SVG

      size = d.target.size + 15;	// Buffer width of element + 15 px
      return Math.max( size, Math.min( d.target.x, w - size ) );
    } )
    .attr( "y2", function( d ) {
      var  size;			// Buffer border in SVG

      size = d.target.size + 15;	// Buffer width of element + 15 px
      return Math.max( size, Math.min( d.target.y, h - size ) );
    } );
}


function init_affinity()

  //  Initialize d3 force-directed graph object
{
  var  h;				// Height of SVG element
  var  w;				// Width of SVG element
  var  svg;				// Affinity SVG element


  //  Set graph SVG's initial viewBox and aspect ratio rules

  w = $("#affinity-div").width();
  h = $("#affinity-div").height();

  graph_svg = d3.select( "#affinity-svg" );
  //graph_svg.attr( "viewBox", "0 0 " + w + " " + h );
  //graph_svg.attr( "preserveAspectRatio", "xMidYMid meet" );

  force = d3.layout.force()		// Create force graph
    .nodes( graph.node )		//  Link to node list
    .links( graph.edge )		//  Link to edge list
    .charge( -120 )
    .linkDistance( 100 )
    .gravity( 0.02 )			//  Low gravity allows nodes to spread
    .size( [ w, h ] )
    .on( "tick", graph_tick );		//  Global tick function

  //  Initiailze the list of node and link SVG elements, these will be
  //  empty arrays at this point, but will be constantly updated in
  //  draw_affinity()
  //
  //  Edges are in an SVG group BEFORE nodes, so that nodes draw on top
  //  of edges

  n_list = d3.select( "#nodes" ).selectAll( ".node" );
  l_list = d3.select( "#edges" ).selectAll( ".link" );

  //  Event listener to update raw mouse position on mousemove and
  //  process mouse clicks

  svg = document.getElementById( "affinity-svg" );

  svg.addEventListener( "mousemove", function( e ) {
    mouse_x( e.pageX );			// Raw mouse position
    mouse_y( e.pageY );
  } );
}					// End init_affinity


function insert_url_node_edge( min_fq )

  //  Called after URLs are expanded, identifies surviving URL nodes
  //  and inserts them, with their edges, into the graph
  //
  //  min_fq:  Threshold frequency to keep node, default=5
{
  var  i, j;				// Loop counters
  var  key;				// All hashtag nodes
  var  m;				// Regex retweet matches
  var  sz;				// Scaled node size


  if ( typeof min_fq == "undefined" ) {
    min_fq = 5;
  }

  key = Object.keys( u_node );		// Get all URLs
  console.log( u_node );

  for( i = 0; i < key.length; i++ ) {	// Remove URLs w/out min frequency
    if ( typeof u_node[ key[ i ] ] == "undefined" ) {
      console.log(
        "insert_url_node_edge(), couldn't find URL w/key: " + key[ i ] );
      continue;
    }

    if ( u_node[ key[ i ] ].n < min_fq ) {
      delete u_node[ key[ i ] ];

    } else {				// Add surviving URL to node list
      u_node[ key[ i ] ][ "g_ID" ] = graph.node.length;

  //  It's possible URL node's n is less than scale's minimum frequency,
  //  if so, assign smallest possible radius to node

      if ( u_node[ key[ i ] ].n < node_sz.domain()[ 0 ] ) {
        sz = node_sz.range()[ 0 ];
      } else {
        sz = node_sz( u_node[ key[ i ] ].n );
      }

      graph.node.push(
        { "ID": key[ i ], "name": key[ i ], "size": sz, "group": 4 } );
    }
  }

  build_txt_node_edge( u_node );	// Build text-URL edges

  draw_affinity();			// Draw updated graph
}					// End function insert_URL_node_edge


function resize_affinity()

  //  Resize SVG viewbox and force layout's size on window resize
{
  var  h;				// Height of SVG element
  var  w;				// Width of SVG element


  w = $("#affinity-div").width();	// Force SVG to match div's size
  h = $("#affinity-div").height();

  d3.select( "#affinity-svg" ).attr( "width", w );
  d3.select( "#affinity-svg" ).attr( "height", h );
  //graph_svg.attr( "viewBox", "0 0 " + w + " " + h );
  //graph_svg.attr( "preserveAspectRatio", "xMidYMid meet" );

  force.size( [ w, h ] ).start();	// Update graph to new SVG size
  draw_query_term( "#affinity-svg" );
}					// End function resize_affinity


function show_affinity_info_dlg( ID, max )

  //  Show info dialogs for a set of tweets, but cap it at some maximum
  //  since tweet affinity sets can get very large
  //
  //  ID:   List of tw[] tweet indices to show
  //  max:  Maximum number of dialogs to display
{
  var  cur;				// Current ID element
  var  i;				// Loop counter
  var  step;				// Step within ID list
  var  tw_list = [ ];			// List of tweets to display


  if ( ID.length <= max ) {		// Total IDs within limit?
    step = 1.0;
  } else {				// Otherwise uniformly sample IDs
    step = ID.length / max;
  }

  cur = 0.0;
  while( cur < ID.length ) {
    tw_list.push( ID[ Math.floor( cur ) ] );
    cur += step;
  }

  show_info_dlg( tw_list );
}					// End function show_affinity_info_dlg


function tw_list_overlap( list_A, list_B )

  //  Check for an overlap between two lists of tweet indices
  //
  //  list_A:  First list
  //  list_B:  Second list
{
  var  i, j;				// Loop counters

  for( i = 0; i < list_A.length; i++ ) {
    if ( list_B.indexOf( list_A[ i ] ) != -1 ) {
      return true;
    }
  }

  return false;
}					// End function tw_list_overlap


function update_affinity()

  //  Update affinity graph based current tweet set
{
  var  i;				// Loop counter


  if ( typeof force == "undefined" ) {
    init_affinity();
  }

  clear_graph();			// Clear graph before adding new data

  if ( tw.length == 0 ) {		// No tweets to process?
    cancel_ajax_req();			// Cancel pending AJAX requests
    return;
  }

  if ( tw.length < 500 ) {		// Set threshold for inclusion in graph
    cutoff = 5;
  } else if ( tw.length < 1000 ) {
    cutoff = 10;
  } else {
    cutoff = 15;
  }

  collapse( tw, true );			// Build tweet equivalence sets
  t_node = get_set( cutoff );		// Retrieve sets with >= 5 tweets

  add_people( cutoff );			// Add people, hashtag, URL nodes
  add_hashtag( cutoff );

  build_affinity_edge();		// Build edge list

  //  URLs must be identified and expanded, which is slow; we start
  //  with add_url(), which builds u_node and calls expand_url(); AJAX
  //  does the expansion, so we get control back and show the partial
  //  graph, when AJAX calls are done final URLs are inserted in the
  //  graph and draw_affinity() is called to show them

  //  Also, check if uniq_PHP_delay() is defined, it asks us to wait
  //  to give other PHP stuff priority before calling add_url()

  if ( typeof uniq_PHP_delay != "undefined" ) {
    if ( uniq_PHP_delay() >= 0 ) {	// Negative delay means don't expand
      setTimeout( add_url, uniq_PHP_delay() );
    }
  } else {
    add_url();
  }

  draw_affinity();			// Draw (partial) graph
  draw_query_term( "#affinity-svg" );
}					// End function update_affinity


function update_url( url )

  //  This function takes a list of { long, short } URL pairs, and
  //  walks the u_node list replacing and consolodating short URLs
  //  into their long versions
  //
  //  url:  Array of URL pairs
{
  var  i, j;				// Loop counters
  var  u_ln;				// Long URL entry in u_node
  var  u_sh;				// Short URL entry in u_node


  for( i = 0; i < url.length; i++ ) {
    if ( url[ i ].long !== null ) {	// Long URL was resolved?
      u_ln = u_node[ url[ i ].long ];
      u_sh = u_node[ url[ i ].short ];

   //  If first time we've seen long URL, convert short to long

      if ( typeof u_ln == "undefined" ) {
        u_node[ url[ i ].long ] = u_sh;

   //  Repeated long URL, copy short's tweet ID list to long's

      } else {
        for( j = 0; j < u_sh.ID.length; j++ ) {
          u_ln.ID.push( u_sh.ID[ j ] );
        }
        u_ln.n += u_sh.n;
      }
    }

    delete u_node[ url[ i ].short ];	// Remove short URL entry from URL list
  }					// End for all URL pairs
}					// End function update_url
