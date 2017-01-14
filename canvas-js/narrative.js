/*- NARRATIVE.JS -----------------------------------------------------------*/
/*    Routines to calculate narrative threads				    */
/* 									    */
/*    1. Find all tweets above a threshold similarity epsilon of a user	    */
/*       chosen "anchor" tweet defining narrative threads we want	    */
/*    2. Bundle similar tweets plus anchor into sim_set			    */
/*    3. Build sim_set into dag (directed acyclic graph) where:		    */
/*       - two tweets connected if their similarity above threshold tau,    */
/*         tau <= epsilon						    */
/*       - direction of edge based on time, from older to newer tweet	    */
/*    4. Apply Bellman-Ford on dag to find longest path from every source   */
/*       node (node w/no incoming edges)				    */
/*    5. Keep any longest path that contains anchor, these are narrative    */
/*       threads							    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  19-Jun-14	Christopher G. Healey	Initial implementation		    */
/*  20-Feb-16	Christopher G. Healey	Added code to structure threads	as  */
/*					a tree for visualization	    */
/*--------------------------------------------------------------------------*/

//  Module global variables

//  Nodes in the tree have the following structure:
//  {
//    parent:  Parent node, null for none
//    child:   Child node(s), empty list for none
//    pos:     Relative row position, e.g. 0, 1, -1, 2, -2, etc.
//    x, y:    Absolute center-of-ndoe position on SVG canvas
//  }
//
//  anchor, prev_tree, and post_tree are nodes or lists of nodes

var  active_path = [ ];			// Active paths during hover over link
var  anchor_node = { };			// Anchor node structure
var  anchor_tbl;			// Tbl of tweets w/possible narratives
var  auth = { };			// Author dictionary
var  cur_anchor = -1;			// Current anchor node
var  dag = { };				// Similarity DAG
var  narr_mouse_x = -1;			// Current mouse x-position
var  narr_mouse_y = -1;			// Current mouse y-position
var  narr_timer_ID = -1;		// Current narrative setTimeout ID
var  prev_tree = [ ];			// Nodes before anchor structure..
					// ..as a tree by column, see
					// ..build_narr_tree() for details
var  post_tree = [ ];			// Nodes after anchor
var  sim_set = { };			// Similarity set
var  sim_thresh = 0.3;			// Overall similarity threshold
var  sim_thresh_txt = 0.1;		// Text similarity threshold

//  Enumerations

var  dir = {				// Direction to walk tree
       "bak": "away-from",		//  Walk away from anchor
       "fwd": "toward"			//  Walk towards anchor
     };
var  updt = {				// Path update types
       "beg": "prepend",		//  Prepend node to front of path
       "end": "append"			//  Append ndoe to end of path
     };


function add_path_node( path, node, add )

  //  This routine either prepends or appends a set of nodes to an
  //  existing narrative thread path, creating new paths, one per node
  //  to prepend/append
  //
  //  path:  Path to update, stored as list [ ] of nodes
  //  node:  List of node(s) to append
  //  add:   Update position: beg (prepend) or end (append)
{
  var  i;				// Loop counter
  var  path_cp;				// Copy of path argument
  var  path_list = [ ];			// List of path(s) created after add



  for( i = 0; i < node.length; i++ ) {
    path_cp = path.slice( 0 );		// Clone original path, add new node

    ( add == updt.beg ) ?
      path_cp.unshift( node[ i ] ) : path_cp.push( node[ i ] );

    path_list.push( path_cp );		// Save new path on path list
  }

  return path_list;
}					// End function add_node


function bellman_ford( s, topo )

  //  Apply Bellman-Ford algorithm to identify longest path from given
  //  source node
  //
  //  Bellman-Ford computes SHORTEST path to all nodes from a source
  //  node in a weighted graph by relaxing initial estimates (infinite
  //  distance) over a sequence of iterations. Unlike Dijkstra,
  //  Bellman-Ford handles negative edge weights as long as the graph
  //  has no a negative cycles; DAG has no cycles by definition so
  //  Bellman-Ford is applicable
  //
  //  If you want the LONGEST path, negate the edge weights, then
  //  negate the final result for a node to get its true longest path
  //  length
  //
  //  http://en.wikipedia.org/wiki/Bellman-Ford_algorithm
  //
  //  s:     Source node's tweet ID
  //  topo:  Topological sort of DAG
{
  var  dist = { };			// Distance matrix
  var  i, j, l;				// Loop counters
  var  k;				// Adjacent nodes for current node
  var  len;				// Current maximum path length
  var  path = [ ];			// Nodes on longest path
  var  pred = { };			// Predecessor nodes
  var  v_lf;				// Edge's left vertex (tweet ID)
  var  v_rt;				// Edge's right vertex (tweet ID)


  //  Keys are always strings, but we expect integers for tweet IDs,
  //  so after getting the keys, we .map( Number ) to convert to int

  k = Object.keys( dag ).map( Number );	// Tweet IDs in DAG

  //  Edges in DAG are similarities <= 1.0, so longest possible path
  //  weight is |DAG| - 1 (maximum number of edges, all weight 1), so
  //  initialize estimated path lengths to |DAG|, except for source

  for( i = 0; i < k.length; i++ ) {
    if ( k[ i ] == s ) {		// Source node? If so, length is 0
      dist[ k[ i ] ] = 0;
    } else {				// "Infinite" length to other verts
      dist[ k[ i ] ] = k.length;
    }

    pred[ k[ i ] ] = "-1";
  }

  //  Iterate |G|-1 times to fully expand longest paths

  for( i = 0; i < k.length - 1; i++ ) {

    //  Iterate over all edges in the DAG

    for( j = 0; j < k.length; j++ ) {
      v_lf = k[ j ];

    //  Interate over all edges for current node in DAG

      for( l = 0; l < dag[ v_lf ].length; l++ ) {
        v_rt = dag[ v_lf ][ l ].rt_vert;

    //  Remember, Bellman-Ford gives SHORTEST path, so negate edge
    //  weights for longest path. We're assuming static edge weights,
    //  so each edge's negated weight is -1

        if ( dist[ v_lf ] - 1 < dist[ v_rt ] ) {
          dist[ v_rt ] = dist[ v_lf ] - 1;
          pred[ v_rt ] = v_lf;
        } 				// End if distance should be updated
      } 				// End for all edges for current node
    } 					// End for all nodes in graph
  }					// End for all expand iterations

  v_lf = k[ 0 ];			// Find longest path
  len = dist[ k[ 0 ] ];

  for( i = 1; i < k.length; i++ ) {
    if ( dist[ k[ i ] ] < len ) {
      v_lf = k[ i ];
      len = dist[ k[ i ] ];
    }
  }

  do {					// Construct nodes on longest path
    path.unshift( v_lf );
    v_lf = pred[ v_lf ];
  } while( v_lf != "-1" );

  return path;
}					// End function bellman_ford


function build_anchor()

//  Build the specific of the anchor node structure
//
//  NOTE: This MUST be called after build_narr_tree to construct
//        prev_tree and post_tree
{
  var  k;				// Keys in col left/right of anchor
  var  node = { };			// Anchor node structure


  node[ "child" ] = [ ]
  node[ "parent" ] = [ ];
  node[ "pos" ] = 0;

  if ( prev_tree.length > 0 ) {		// Add nodes in prev_tree first column

    //  Keys are always strings, but we expect integers for tweet IDs,
    //  so after getting the keys, we .map( Number ) to convert to int

    node[ "parent" ] = Object.keys( prev_tree[ 0 ] ).map( Number );
  }

  if ( post_tree.length > 0 ) {		// Add nodes in post_tree first column
    node[ "child" ] = Object.keys( post_tree[ 0 ] ).map( Number );
  }

  return node;				// Return anchor node
}					// End function build_anchor


function build_auth_dict()

  //  Build an "author" dictionary, where key is screen name and value
  //  is a list of tweet IDs with reference in the tweet body to the
  //  given user
{
  var  i;				// Loop counter
  var  re = /@\S*\w/g;			// Regex to find @person strings
  var  str;				// Temporary string value


  auth = { };				// Free existing dictionary

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    str = re.exec( tw[ i ].raw );	// Search for regex @...

    while( str !== null ) {
      str = str[ 0 ].slice( 1 );	// Remove @ symbol from front of string

      if ( !( str in auth ) ) {
        auth[ str ] = { }
      }
      auth[ str ][ i ] = true;

      str = re.exec( tw[ i ].raw );	// Search for next regex @...
    }
  }
}					// End function build_auth_dict


function build_dag( txt_sim, thresh )

  //  Build a directed acyclic graph (DAG) based on similarity and
  //  time
  //
  //  txt_sim:  Minimum text similarity (default=0.1)
  //  thresh:   Similarity threshold (default=0.3)
{
  var  i, j;				// Loop counters
  var  k;				// Tweets in similarity set
  var  sim;				// Tweets' similarity
  var  tm_i;				// Tweet i's epoch time
  var  tm_j;				// Tweet j's epoch time
  var  tw_i;				// Tweet i's index
  var  tw_j;				// Tweet j's index


  if ( typeof txt_sim === "undefined" || txt_sim < 0 || txt_sim > 1 ) {
    txt_sim = 0.1;
  }
  if ( typeof thresh === "undefined" || thresh < 0 || thresh > 1 ) {
    thresh = 0.3;
  }

  //  Keys are always strings, but we expect integers for tweet IDs,
  //  so after getting the keys, we .map( Number ) to convert to int

  k = Object.keys( sim_set ).map( Number );

  //  DAG is a dict, key represents tweet ID of the start of a DAG
  //  edge, and value(s) represents tweet IDs of all tweets at the end
  //  of the edge (i.e. all tweets this tweet points to)
  //
  //  Value is array of objects w/structure:
  //  - { "rt_vert": tweet-ID, "sim": pariwise simliarty }

  dag = { };

  for( i = 0; i < k.length; i++ ) {
    dag[ k[ i ] ] = [ ];
  } 

  //  Test all tweet pairs (i,j) for similarity

  for( i = 0; i < k.length; i++ ) {
    for( j = i + 1; j < k.length; j++ ) {
      tw_i = k[ i ];
      tw_j = k[ j ];

      sim = comp_narr_sim( tw_i, tw_j, txt_sim );
      if ( sim < thresh ) {
        continue;
      }

    //  If two tweets i, j in the similarity set are within the
    //  threshold similarity, save the simliarity in dag[i,j] if i
    //  posted before j, or in dag[j,i] if j posted before i

      tm_i = new Date( tw[ tw_i ].time ).getTime();
      tm_j = new Date( tw[ tw_j ].time ).getTime();

      if ( tm_i <= tm_j ) {		// Edge directed by tweets' times
        dag[ tw_i ].unshift( { "rt_vert": tw_j, "sim": sim } );
      } else {
        dag[ tw_j ].unshift( { "rt_vert": tw_i, "sim": sim } );
      }					// End else tweet i's time > tweet j's
    }					// End inner tweet loop
  }					// End outer tweet loop
}					// End function build_dag


function build_narr_tree( anchor, mov )

  //  This routine builds a narrative tree by walking backwards or
  //  forwards in time along each thread, looking at connectivity to
  //  the anchor. E.g., suppose we had the following narrative threads
  //
  //  anchor = 60
  //  narr_thread = [
  //    [ 237, 163, 125, 92, 60, 58 ],
  //    [ 207, 203, 69, 34, 60, 58 ],
  //    [ 198, 124, 69, 34, 60, 58 ],
  //    [ 96, 60, 58 ],
  //    [ 79, 60, 58 ]
  //  ]
  //
  //  Then, then narrative tree should look like this:
  //
  //                        79 --+
  //                              \
  //  198 -- 124 --+               |
  //                \              |
  //  207 -- 203 --  69 --  34 --+ |
  //                              \|
  //  237 -- 163 -- 125 --  92 --  60 --  58
  //                              /
  //                        96 --+
  //
  //  We call the funtion twice (mov = dir.bak, inc = dir.fwd) to
  //  build two list of dicts, prev_tree and post_tree, that hold the
  //  COLUMNS of nodes prior to and after the anchor. The key is the
  //  tweet ID, and the value is a vertical position relative to the
  //  anchor (positive for above, negative for below) plus a list of
  //  all the tweets previous (or post) the node connects to. E.g.,
  //  for the above example:
  //
  //  prev_tree = [
  //    {
  //       79: { pos:  3, parent:  [ 60 ], child: [ ] },
  //       34: { pos:  1, parent:  [ 60 ], child: [ 69 ] },
  //       92: { pos:  0, parent:  [ 60 ], child: [ 125 ] },
  //       96: { pos: -1, parent:  [ 60 ], child: [ ] }
  //    },
  //    {
  //       69: { pos:  1, parent:  [ 34 ], child: [ 124, 203 ] },
  //      125: { pos:  0, parent:  [ 92 ], child: [ 163 ] }
  //    },
  //    {
  //      124: { pos:  2, parent:  [ 69 ], child: [ 198 ] },
  //      203: { pos:  1, parent:  [ 69 ], child: [ 207 ] },
  //      163: { pos:  0, parent: [ 125 ], child: [ 237 ] }
  //    },
  //    {
  //      198: { pos:  2, parent: [ 124 ], child: [ ] },
  //      207: { pos:  1, parent: [ 203 ], child: [ ] },
  //      237: { pos:  0, parent: [ 163 ], child: [ ] }
  //    }
  //  ]
  //
  //  post_tree = [
  //    {
  //       58: { pos: 0, parent:  [ 60 ], child: [ ] }
  //    }
  //  ]
  //
  //  anchor:  Anchor tweet ID
  //  mov:     Dir to move, dir.fwd for forward, dir.bak for backwards
{
  var  child;				// Child ID
  var  col;				// Current column object
  var  col_pos;				// Index of current column
  var  i, j;				// Loop counters
  var  id;				// Current tweet ID
  var  parent_pos;			// Position of current node's parent
  var  tree = [ ];			// Threads following anchor in tree
  var  y_pos = [ ];			// Post/neg y-pos for nodes..
					// ..each inner list is a column


  for( i = 0; i < narr_thread.length; i++ ) {

  //  Search for anchor in thread; -1 means no anchor found, if prev_tree
  //  and anchor @ 0 or post_tree and anchor @ end-of-thread, no children

    j = find_anchor( i, anchor );

    if ( ( j == 0 && mov == dir.bak ) ||
         ( j == narr_thread[ i ].length - 1 && mov == dir.fwd ) ) {
      continue;
    }

    col_pos = 0;			// Start at first column

    //  Follow child nodes, since we may be going backwards or
    //  forwards check both ends of thread to see when we "step out"

    while( ( mov == dir.bak && j > 0 ) ||
           ( mov == dir.fwd && j < narr_thread[ i ].length - 1 ) ) {

      //  Ensure dict and top/bottom positions exist for current column

      if ( tree.length <= col_pos ) {
        tree.push( { } );
        y_pos.push( [ 0, -1 ] );
      }

      id = narr_thread[ i ][ j ];	// Get current, prev/next tweet IDs
      child = ( mov == dir.bak ) ?
        narr_thread[ i ][ j - 1 ] : narr_thread[ i ][ j + 1 ];

      //  If previous node already in column, grab reference to it,
      //  otherwise build and add it

      if ( child in tree[ col_pos ] ) {
        col = tree[ col_pos ][ child ];

      } else {
        col = { parent: [ id ], child: [ ] };

        //  Determine parent y-position, -1 if no parent node

        if ( col_pos > 0 ) {
          parent_pos = find_node_pos( tree, id, col_pos - 1 );
        } else {
          parent_pos = -1;
        }

        //  Calculate current node's y-position

        col[ "pos" ] = comp_node_y_pos( col_pos, y_pos, parent_pos );
        tree[ col_pos ][ child ] = col;
      }

      //  Ensure child of current node is on it's child list

      //  j is index of current node, j +/- 1 is index of col (child),
      //  j +/- 2 is index of col's child, so if moving backwards, j
      //  must be 2 or more; if moving forwards, j must be
      //  narr_thread.length -2 or less

      if ( ( mov == dir.bak && j > 1 ) ||
           ( mov == dir.fwd && j < narr_thread[ i ].length - 2 ) ) {
        child = ( mov == dir.bak ) ?
          narr_thread[ i ][ j - 2 ] : narr_thread[ i ][ j + 2 ];

        if ( col.child.indexOf( child ) == -1 ) {
          col.child.push( child  );
        }
      }

      j = ( mov == dir.fwd ) ? j + 1 : j - 1;
      col_pos = col_pos + 1;
    }					// End for all nodes in thread
  }					// End for all narrative threads

  return tree;
}					// End function build_narr_tree


function build_thread_list( link )

  //  Build all paths that pass through the given link in the
  //  narrative thread tree
  //
  //  link:  Connecting link, form "link-xx-yy"
{
  var  add;				// How to update path, at beg or end
  var  anchor_tm;			// Anchor node post time
  var  lf_id;				// Left endpoint ID
  var  lf_pos;				// Position of left endpoitn in tree
  var  link_tm;				// Link left endpoint post time
  var  path = [ ];			// Paths passing through selected link
  var  path_bak = [ ];			// Path(s) away from anchor
  var  path_fwd = [ ];			// Path(s) towards anchor
  var  narr_tree;			// Complete narrative tree w/anchor
  var  prev;				// Link before anchor flag
  var  rt_id;				// Right endpoint ID


  //  Splice prev_tree, anchor, post_tree so tree columns run left to
  //  right in time (e.g., narr_tree[ 0 ] is column of "oldest" nodes)

  narr_tree = splice_tree();

  //  Get endpoint IDs

  lf_id = parseInt( link.split( "-" )[ 1 ] );
  rt_id = parseInt( link.split( "-" )[ 2 ] );

  //  Find position of link [ column, column index ] in narrative
  //  thread tree

  lf_pos = find_link( lf_id, rt_id, narr_tree );
  if ( lf_pos == -1 ) {
    console.log( "build_thread_list(), cannot locate target link " + link );
    return;
  }

  //  Determine if link time is prior to anchor, or at/after anchor

  link_tm = Date.parse( tw[ lf_id ].time );
  anchor_tm = Date.parse( tw[ cur_anchor ].time );

  prev = ( link_tm < anchor_tm ) || ( rt_id == cur_anchor );

  //  Get all paths as we walk towards the anchor node, then as we
  //  walk away from the anchor node, starting at selected link

  add = ( prev ) ? updt.end : updt.beg;
  path_fwd = walk_tree( narr_tree, lf_id, rt_id, lf_pos, prev, dir.fwd, add );

  add = ( prev ) ? updt.beg : updt.end;
  path_bak = walk_tree( narr_tree, lf_id, rt_id, lf_pos, prev, dir.bak, add );

  //  Splice together all paths away from anchor (through link),
  //  towards anchor, and the anchor itself

  path = splice_pairs( prev, path_fwd, path_bak );

  //  Now, we have all paths on the link-side of the anchor, plus the
  //  anchor. We splice all paths opposite the link-side of the anchor

  path = splice_opposite( narr_tree, prev, path );

  return path;
}					// End function build_thread_list


function find_link( lf_id, rt_id, tree )

  //  Find a link in either the prev or post tree
  //
  //  lf_id:  Link's left endpoint ID
  //  rt_id:  Link's right endpoint ID
  //  tree:   Tree to search
{
  var  anchor;				// Anchor is endpoing flag
  var  i;				// Loop counter
  var  key;				// Tweet ID keys in current tree column
  var  len;				// Length of tree to search
  var  lf_pos = -1;			// Index of left endpoint in column
  var  rt_pos;				// Index of right endpoint in column


  for( i = 0; i < tree.length; i++ ) {	// Search target tree

    //  Keys are always strings, but we expect integers for tweet IDs,
    //  so after getting the keys, we .map( Number ) to convert to int

    key = Object.keys( tree[ i ] ).map( Number );
    lf_pos = key.indexOf( lf_id );

    if ( lf_pos != -1 ) {		// Left endpoint in current column?
      if ( i >= tree.length - 1 ) {	// Left endoint at end of tree?
        console.log( "find_link(), left endpoint found at end of tree" );
        return -1;
      }

      //  Search for right endpoint in next column

      key = Object.keys( tree[ i + 1 ] ).map( Number );
      rt_pos = key.indexOf( rt_id );

      if ( rt_pos == -1 ) {		// Right endpoint not in next tree col?
        console.log( "find_link(), right endpoint not in expected position" );
        return -1;
      }
      break;
    }					// End for all nodes in column
  }					// End for all columns in tree

  return ( ( i >= tree.length ) ? -1 : i );
}					// End function find_link


function build_sim_set( anchor, txt_sim, thresh )

  //  Build an initial set of similar threads relative to the anchor
  //  thread
  //
  //  anchor:   Anchor tweet ID
  //  txt_sim:  Minimum text similarity (default=0.1)
  //  thresh:   Similarity threshold (default=0.3)
{
  var  i;				// Loop counter
  var  sim;				// Tweets' similarity


  if ( typeof txt_sim === "undefined" || txt_sim < 0 || txt_sim > 1 ) {
    txt_sim = 0.1;
  }
  if ( typeof thresh === "undefined" || thresh < 0 || thresh > 1 ) {
    thresh = 0.3;
  }

  for( i = 0; i < dissim[ anchor ].length; i++ ) {
    if ( i == anchor ) {		// Always add anchor tweet
      sim_set[ i ] = 1.0;

    } else {
      sim = comp_narr_sim( anchor, i, txt_sim );
      if ( sim >= thresh ) {
        sim_set[ i ] = sim;
      }
    }
  }
}					// End function build_sim_set


function comp_narr_sim( anchor, cmp, txt_sim )

  //  Compute narrative thread similarity between an anchor tweet and
  //  a candidate tweet:
  //
  //  - 50% for tweet similarity
  //  - 15% for hashtag overlap (5% per tag up to 15% for 3+ tags)
  //  - 10% for time difference, linear decrease, cutoff at 24-hours
  //  - 25% if tweet mentions author
  //  -  5% "bonus" if tweets are by the same author
  //
  //  anchor:   Anchor tweet ID
  //  cmp:      Candidate tweet ID to compare against
  //  txt_sim:  Minimum text similarity
{
  var  i;				// Loop counter
  var  tag_n;				// Number of tag matches
  var  sim_au = 0.0;			// Same author similarity
  var  sim_rt = 0.0;			// Author mentioned similarity
  var  sim_tg = 0.0;			// Tweet tag similarity
  var  sim_tm = 0.0;			// Time similarity
  var  sim_tw = 0.0;			// Tweet text similarity
  var  tm_anchor;			// Time for anchor in epoch
  var  tm_dif;				// Time difference in seconds


  //  If minimum text similarity not met, return no similarty

  if ( 1.0 - dissim[ anchor ][ cmp ] < txt_sim ) {
    return 0;
  }

  sim_tw = ( 1.0 - dissim[ anchor ][ cmp ] ) * 0.5;

  //  Check for hashtag overlap (up to 3), use jQuery's inArray helper
  //  function because array.indexOf( obj ) isn't supported in IE 8 or
  //  below

  tag_n = 0;
  for( i = 0; tag_n < 3 && i < tw[ anchor ].tags.length; i++ ) {
    if ( $.inArray( tw[ anchor ].tags[ i ], tw[ cmp ].tags ) != -1 ) {
      tag_n++;
    }
  }

  sim_tg = tag_n / 3.0 * 0.15;

  // Calculate time difference w/linear falloff

  tm_anchor = new Date( tw[ anchor ].time ).getTime();
  tm_dif = Math.abs( new Date( tw[ cmp ].time ).getTime() - tm_anchor );

  if ( tm_dif < 86400000 ) {		// 24 hours in msec = 86400000
    sim_tm = ( 86400000 - tm_dif ) / 86400000.0 * 0.10;
  }

  //  Check if author had @refs, and if @ref is in candidate tweet

  if ( tw[ anchor ].name in auth && cmp in auth[ tw[ anchor ].name ] ) {
    sim_rt = 0.25;
  }

  //  Check if authors of both tweets are the same

  if ( tw[ anchor ].name == tw[ cmp ].name ) {
    sim_au = 0.05;
  }

  sim = sim_tw + sim_tg + sim_tm + sim_rt + sim_au;
  return sim;
}					// End function comp_narr_sim


function comp_node_abs_pos()

  //  Calculate absolute node (x,y) positions in narrative tree
  //  structure, based on the width and height of the tree, and the
  //  width and height of the SVG displaying the tree
  //
  //  Return false on failsure (e.g., SVG not rendered yet), true on
  //  success
{
  var  gap_w;				// Width of gap between nodes
  var  gap_h;				// Height of gap between nodes
  var  i, j;				// Loop counters
  var  id;				// ID of current node
  var  k;				// Node IDs in current tree column
  var  rng;				// Range of node relative positions
  var  svg;				// SVG containing tree
  var  svg_h;				// Container SVG height
  var  svg_w;				// Container SVG width
  var  tree_h;				// Narrative tree height, in nodes
  var  tree_w;				// Narrative tree width, in nodes
  var  x, y;				// Absolute node center


  svg = $("#narrative-svg" )[ 0 ];
  svg_h = svg.getBoundingClientRect().height;
  svg_w = svg.getBoundingClientRect().width;

  if ( svg_w == 0 ) {			// SVG hasn't rendered in tab yet
    return false;
  }

  tree_h = narr_tree_h();
  tree_w = narr_tree_w();

  gap_h = svg_h / ( tree_h + 1 );	// Gap height between node centers
  gap_w = svg_w / ( tree_w + 1 );	// Gap width between node centers

  rng = narr_tree_pos_range();

  //  Calculate absolute (x,y) positions for prev nodes

  x = prev_tree.length * gap_w;		// First x-pos, since we walk backwards
  for( i = 0; i < prev_tree.length; i++ ) {
    k = Object.keys( prev_tree[ i ] ).map( Number );

    for( j = 0; j < k.length; j++ ) {	// Handle all nodes in current column
      id = k[ j ];

      y = ( rng.max - prev_tree[ i ][ id ].pos + 1 ) * gap_h;
      prev_tree[ i ][ id ][ "x" ] = x;
      prev_tree[ i ][ id ][ "y" ] = y;
    }					// End for all nodes in current column

    x = x - gap_w;			// Next x-position
  }					// End for all prev_tree columns

  //  Calculate absolute (x,y) positions for post nodes

  x = ( prev_tree.length + 2 ) * gap_w;	// First x-pos, past prev tree + anchor
  for( i = 0; i < post_tree.length; i++ ) {
    k = Object.keys( post_tree[ i ] ).map( Number );

    for( j = 0; j < k.length; j++ ) {	// Handle all nodes in current column
      id = k[ j ];

      y = ( rng.max - post_tree[ i ][ k[ j ] ].pos + 1 ) * gap_h;
      post_tree[ i ][ id ][ "x" ] = x;
      post_tree[ i ][ id ][ "y" ] = y;
    }					// End for all nodes in current column

    x = x + gap_w;
  }					// End for all prev_tree columns

  //  Calculate absolute (x,y) position for anchor node

  x = ( prev_tree.length + 1 ) * gap_w;
  y = ( rng.max + 1 ) * gap_h;

  anchor_node[ "x" ] = x;
  anchor_node[ "y" ] = y;

  return true;
}					// End function comp_node_abs_pos


function comp_node_y_pos( col, y_pos, par_pos )

  //  Calculate the proper relative y-position for a node in narrative
  //  tree structure, given y-positions assigned to previous nodes
  //
  //  col:      Node's column
  //  y_pos:    Array of previous y-positions by column
  //  par_pos:  Parent node position (-1 if no parent)
{
  //  Each y_pos is a list representing a column; position entries
  //  within that list are themselves 2-valued list: [ top, bot ],
  //  where top is current (relative) positive y-pos, bot is current
  //  negative y-pos

  //  If this is the first column past the anchor, there's no parent
  //  node position to consider, so we simply look to see which side
  //  (top or bot) is "smaller", and assign to that side

  if ( col == 0 && y_pos[ 0 ][ 0 ] <= -y_pos[ 0 ][ 1 ] ) {
    y_pos[ 0 ][ 0 ]++;
    return y_pos[ 0 ][ 0 ] - 1;

  } else if ( col == 0 ) {
    y_pos[ 0 ][ 1 ]--;
    return y_pos[ 0 ][ 1 ] + 1;

  //  Otherwise, we want this node's position to be on the same "side"
  //  as its parent, either positive side or negative side

  } else {

    //  Force node position to positive side like its parent

    if ( par_pos > 0 ) {
      y_pos[ col ][ 0 ]++;
      return y_pos[ col ][ 0 ] - 1;

    //  Force node position to negative side like its parent

    } else if ( par_pos < 0 ) {
      y_pos[ col ][ 1 ]--;
      return y_pos[ col ][ 1 ] + 1;

    //  Parent is at position 0, so like with nodes without parents,
    //  find the "smaller" side (top or bot) and assign to that side

    } else if ( y_pos[ col ][ 0 ] <= -y_pos[ col ][ 1 ] ) {
      y_pos[ col ][ 0 ]++;
      return y_pos[ col ][ 0 ] - 1;

    } else {
      y_pos[ col ][ 1 ]--;
      return y_pos[ col ][ 1 ] + 1;
    }
  }					// End else parent node exists
}					// End function comp_node_y_pos


function find_anchor( i, anchor )

  //  This routine finds the anchor tweet in the given narrative
  //  thread
  //
  //  i:       Index of thread to search
  //  anchor:  Anchor tweet ID
{
  var  j;				// Loop counter


  for( j = 0; j < narr_thread[ i ].length; j++ ) {
    if ( narr_thread[ i ][ j ] == anchor ) {
      break;
    }
  }

  if ( j >= narr_thread[ i ].length ) {
    console.log( "find_anchor(), no anchor " + anchor + " in thread " + i );
    console.log( "find_anchor(), thread[ " + i + " ]: " + narr_thread[ i ] );
    return -1;
  }

  return j;
}					// End function find_anchor


function find_node_pos( tree, id, col )

  //  Find y-position of given node in narrative tree structure
  //
  //  tree:  Tree to search
  //  id:    ID of node to find
  //  col:   Optional column to search within
{
  var  beg;				// Beginning column of search
  var  end;				// Ending column of search
  var  i;				// Loop counter
  var  k;				// Keys in current tree column


  if ( typeof col !== "undefined" && ( col < 0 || col >= tree.length ) ) {
    return null;
  }

  if ( typeof col !== "undefined" ) {	// Set bounds on columns to search
    beg = col;				// Only search specified column
    end = col + 1;
  } else {
    beg = 0;				// Search all columns
    end = tree.length;
  }


  for( i = beg; i < end; i++ ) {	// Search for target node
    if ( id in tree[ col ] ) {
      return tree[ col ][ id ].pos;
    }
  }

  return null;
}					// End function find_node_pos


function highlight_active_path( hilite )

  //  On mouse hover over link, highlight all paths that pass through
  //  the link
  //
  //  hilite:  Highlight flag, true to highlight, false to unhighlight
{
  var  i, j;				// Loop counters
  var  link_ID;				// Link ID
  var  link_svg;			// SVG for current link


  for( i = 0; i < active_path.length; i++ ) {
    for( j = 1; j < active_path[ i ].length; j++ ) {
      if ( active_path[ i ][ j ] == cur_anchor ||
           active_path[ i ][ j - 1 ] == cur_anchor ) {
        link_ID = "anchor-";
      } else {
        link_ID = "link-";
      }

      link_ID = link_ID +
        active_path[ i ][ j - 1 ] + "-" + active_path[ i ][ j ];
      link_svg = document.getElementById( link_ID );

      if ( hilite ) {
        link_svg.setAttribute( "stroke", default_txt_c() );
        link_svg.setAttribute( "stroke-width", "3px" );
        link_svg.setAttribute( "stroke-opacity", "0.5" );
      } else {
        link_svg.setAttribute( "stroke", "rgb(192,192,192)" );
        link_svg.setAttribute( "stroke-width", "2px" );
        link_svg.setAttribute( "stroke-opacity", "1.0" );
      }
    }
  }
}					// End function highlight_active_path


function init_narrative()

  //  Initialize narrative anchor table, add a callback on mousemove
  //  to track raw mouse position
{
  var  svg;				// Narrative SVG element for rendering


  //  Event listener to update raw mouse position on mousemove and
  //  process mouse clicks

  svg = document.getElementById( "narrative-svg" );

  svg.addEventListener( "mousemove", function( e ) {
    mouse_x( e.pageX );			// Raw mouse position
    mouse_y( e.pageY );
  }, 0 );

  //  Initialize table of potential anchor tweets

  anchor_tbl =
  $("#narrative-tbl").DataTable( {	// Build the table structure
    "scrollY": "309px",			// Fixed-height scrolling
    "paging": false,			// Don't paginate
    "scrollCollapse": false,		// Don't collapse table for a few rows
    "autoWidth": false,			// Don't autoresize the table
    "ordering": false,			// Don't reorder the rows
    "columns": [
      { "title": "ID", "data": "id", "visible": false },
      {
        "title": "Tweet",
        "data": "fmt",
        "render": function( data, type, row, meta ) {
          var  s;

          s = "<span style=\"display: block; ";
          s = s + "overflow-wrap: break-word; width: 275px\";>"
          s = s + data + "</span>";
          return s;
        }
      }
    ]
  } );

  //  Callback to catch row selection of new anchor tweet

  $("#narrative-tbl tbody").on( "click", "tr", function() {
    var  id;				// Tweet id of row struct clicked
    var  index;				// Table index of row struct clicked
    var  tr;				// Table row struct clicked

    //  If row is re-selected, unselect it and empty SVG, otherwise
    //  select it and display corresponding narrative threads

    if ( $(this).hasClass( "selected" ) ) {
      $(this).removeClass( "selected" );
      $("#narrative-svg").empty();
      draw_query_term( "#narrative-svg" );
      return;
    }

    anchor_tbl.$( "tr.selected" ).removeClass( "selected" );
    $(this).addClass( "selected" );
    
    tr = $(this).closest( "tr" );
    index = tr.index();

    //  We need to specify rows with search (possibly) applied,
    //  otherwise if search is specified, we get row index from search
    //  list, not full table list

    id = anchor_tbl.rows( { search: "applied" } ).data()[ index ].id;

    set_anchor( id );			// Set anchor, render threads
  } );
}					// End function init_narrative


function longest_path( anchor )

  //  Topologically sort DAG, then use Bellman-Ford to find longest
  //  path from every source node (i.e., every node with no incoming
  //  edges), these represent maximal narrative threads
  //
  //  anchor:  Anchor tweet ID
{
  var  cur_path;			// Current longest path
  var  i, j, l;				// Loop counters
  var  paths = [ ];			// List of longest paths from source
  var  topo;				// Topological ordering of DAG


  topo = topo_sort();			// Topologically sort DAG

  for( i = 0; i < topo.length; i++ ) {	// For all source nodes
    if ( !source_vert( topo[ i ] ) ) {
      continue;
    }

    cur_path = bellman_ford( topo[ i ], topo );
    if ( cur_path.indexOf( anchor ) != -1 ) {
      paths.push( bellman_ford( topo[ i ], topo ) );
    }
  }

  return paths;
}					// End function longest_path


function narr_click_evt( id )

  //  Callback to handle clicks over tweet circles on threads
  //
  //  id:  Tweet ID represented by node being clicked
{
  //  If tooltip exists, remove it before showing detail dialog

  if ( $("#narrative-svg").data( "qtip" ) ) {
    $("#narrative-svg").qtip( "destroy" );
  }

  show_info_dlg( [ id ] );
}					// End function narr_click_evt


function narr_tree_h()

  //  Return height of narrative tree, in nodes
{
  var  rng;				// Max/min position range for tree


  //  If no prev or post tree, height is 1 node, the anchor

  if ( prev_tree.length == 0 && post_tree.length == 0 ) {
    return 1;
  }

  //  Find highest and lowest nodes in the prev_tree node list

  rng = narr_tree_pos_range();

  // Return combined height, plus 1 for the anchor

  return rng.max - rng.min + 1;
}					// End function narr_tree_h


function narr_tree_pos_range()

  //  Return maximum positive and minimum negative height of narrative
  //  tree, in nodes, as dict: { max: n, min: -n }
{
  var  i, j;				// Loop counters
  var  k;				// Keys in current tree column
  var  min_pos = undefined;		// Minimum node position
  var  max_pos = undefined;		// Maximum node position
  var  pos;				// Current node position


  //  If no prev or post tree, height is 0, position of anchor node

  if ( prev_tree.length == 0 && post_tree.length == 0 ) {
    return { max: 0, min: 0 };
  }

  //  Find highest node in the prev_tree node list

  for( i = 0; i < prev_tree.length; i++ ) {
    k = Object.keys( prev_tree[ i ] ).map( Number );

    for( j = 0; j < k.length; j++ ) {
      pos = prev_tree[ i ][ k[ j ] ].pos;

      max_pos = ( max_pos < pos || max_pos == undefined ) ? pos : max_pos;
      min_pos = ( min_pos > pos || min_pos == undefined ) ? pos : min_pos;
    }
  }

  //  Find highest and lowest nodes in the post_tree node list

  for( i = 0; i < post_tree.length; i++ ) {
    k = Object.keys( post_tree[ i ] ).map( Number );

    for( j = 0; j < k.length; j++ ) {
      pos = post_tree[ i ][ k[ j ] ].pos;

      max_pos = ( max_pos < pos || max_pos == undefined ) ? pos : max_pos;
      min_pos = ( min_pos > pos || min_pos == undefined ) ? pos : min_pos;
    }
  }

  // Return dict with max and min position encoded

  return { max: max_pos, min: min_pos };
}					// End function narr_tree_pos_range


function narr_reset_tooltip()

  //  Destroy any existing tooltip and reset any existing setTimeout
  //  timer
{
  if ( $("#narrative-svg").data( "qtip" ) ) {
    $("#narrative-svg").qtip( "destroy" );
  }

  if ( narr_timer_ID != -1 ) {
    clearTimeout( narr_timer_ID );
    narr_timer_ID = -1;
  }
}					// End function narr_reset_tooltip


function narr_tooltip( msg )

  //  Draw tooltip of tweet content when mouse cursor hovers over
  //  tweet node
  //
  //  msg:  Message to display in tooltip
{
  var  h;				// Narrative SVG height
  var  pos_txt;				// Text position of tooltip
  var  pos_x, pos_y;			// Position of tooltip
  var  svg;				// Narrative SVG element for rendering
  var  w;				// Narrative SVG width


  svg = $("#narrative-svg")[ 0 ];	// Get SVG height, width
  h = svg.getBoundingClientRect().height;
  w = svg.getBoundingClientRect().width;

  $("#narrative-svg").qtip( {		// Create qTip tooltip
    content: msg,
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  if ( narr_mouse_y > h / 2 ) {		// Position tooltip below mouse
    pos_y = mouse_y() - 3;
    pos_txt = "bottom ";
  } else {
    pos_y = mouse_y() + 3;
    pos_txt = "top ";
  }

  if ( narr_mouse_x < w / 2 ) {		// Position tooltip right of mouse
    pos_x = mouse_x() + 3;
    pos_txt = pos_txt + "left";
  } else {
    pos_x = mouse_x() - 3;
    pos_txt = pos_txt + "right";
  }

  $("#narrative-svg").qtip( "option", "position.my", pos_txt );
  $("#narrative-svg").qtip( "option", "position.target", [ pos_x, pos_y ] );

  $("#narrative-svg").qtip( "show" );
}					// End function narr_tooltip


function narr_tree_w()

  //  Return width of narrative tree, in nodes
{
  var  w;				// Tree width


  //  Width is columns in prev and post trees, plus 1 for anchor

  w = prev_tree.length + 1 + post_tree.length;
  return w;
}					// End function narr_tree_w


function narr_within_tweet()

  //  Check if mouse is within a tweet node, if so, return (x,y) of
  //  node, or empty list if no node under mouse cursor
{
  var  done = false;			// Done processing flag
  var  i, j;				// Loop counters
  var  key;				// Tweet ID keys in current tree column
  var  radius;				// Radius of current tweet
  var  tree = undefined;		// Tree to walk (start prev, then post)
  var  x = { };				// X-range of current tweet
  var  y = { };				// X-range of current tweet


  //  Check for overlap with anchor tweet

  if ( tw[ cur_anchor ] == undefined ) {
    return [ ];
  }

  //  Calculate radius around tweet, add -1 and +1 for tweet's outline
  //  (so +2 and -2 for anchor, which has a 2-pixel outine)

  radius = tw[ cur_anchor ].rad / 2.0;
  x[ "min" ] = anchor_node.x - radius - 2;
  x[ "max" ] = anchor_node.x + radius + 2;
  y[ "min" ] = anchor_node.y - radius - 2;
  y[ "max" ] = anchor_node.y + radius + 2

  if ( narr_mouse_x >= x[ "min" ] && narr_mouse_x <= x[ "max" ] &&
       narr_mouse_y >= y[ "min" ] && narr_mouse_y <= y[ "max" ] ) {
    return [ cur_anchor ];
  }

  while ( !done ) {
    if ( tree == undefined ) {		// Pick tree to walk
      tree = prev_tree;
    } else {
      tree = post_tree;
      done = true;
    }

    for( i = 0; i < tree.length; i++ ) {// For all columns in tree
      key = Object.keys( tree[ i ] ).map( Number );

      for( j = 0; j < key.length; j++ ) {

      //  Calculate the radius and (x,y) position of the tweet circle
      //  for the current tweet

        radius = tw[ key[ j ] ].rad / 2.0;
        x[ "min" ] = tree[ i ][ key[ j ] ].x - radius - 1;
        x[ "max" ] = tree[ i ][ key[ j ] ].x + radius + 1;
        y[ "min" ] = tree[ i ][ key[ j ] ].y - radius - 1;
        y[ "max" ] = tree[ i ][ key[ j ] ].y + radius + 1

      //  Check if mouse position within tweet circle + outline

        if ( narr_mouse_x >= x[ "min" ] && narr_mouse_x <= x[ "max" ] &&
             narr_mouse_y >= y[ "min" ] && narr_mouse_y <= y[ "max" ] ) {
          return [ key[ j ] ];
        }				// End for all tweet IDs in column
      }					// End for all columns in tree
    }					// End while not done
  }

  return [ ];				// Return no tweet under mouse cursor
}					// End function narr_within_tweet


function narrative_threads( anchor )

  //  Create narrative threads from a given anchor tweet, return an
  //  array of "thread arrays", time-sorted lists of tweets IDs that
  //  form a narrative thread passing through the anchor
  //
  //  anchor:  Anchor tweet ID
{
  var  i;				// Loop counter


  sim_set = { };			// Clear similarity set
  narr_thread = [ ];			// Clear narrative thread list

  if ( anchor < 0 || anchor >= tw.length ) {
    return narr_thread;
  }

  //  Find tweets similar to the anchor tweet

  build_sim_set( anchor, sim_thresh_txt, sim_thresh );
  if ( Object.keys( sim_set ).length == 0 ) {
    return narr_thread;
  }

  build_dag( 0.1, 0.25 );		// Build similar tweets into DAG
  narr_thread = longest_path( anchor );	// Find narrative threads in DAG

  //  Structure threads into a tree, one for tweets prior to the
  //  anchor, one for tweets following the anchor, and the anchor

  //post_tree = build_narr_tree( anchor, 1 );
  //prev_tree = build_narr_tree( anchor, -1 );
  post_tree = build_narr_tree( anchor, dir.fwd );
  prev_tree = build_narr_tree( anchor, dir.bak );
  anchor_node = build_anchor();

  return narr_thread;
}					// End function narrative_threads


function order_sim_set()

  //  Find all sets of tweets similar to anchor of size > 1, then
  //  order them by size so they can be displayed in descending size
  //  order in the anchor tweet table
{
  var  i;				// Loop counter
  var  id = [ ];			// Tweet IDs, sorted by sim set size
  var  k;				// Keys in similarity set


  if ( Object.keys( auth ) == 0 ) {
    console.log( "order_sim_set(), empty auth dict, no build_auth_dict()?" );
    return id;
  }

  for( i = 0; i < tw.length; i++ ) {

    //  For each tweet, determine how many other tweets are similar

    sim_set = { };			// Clear similarity set
    build_sim_set( i, sim_thresh_txt, sim_thresh );

    //  Ignore threads that are only the anchor, since they cannot
    //  form a narrative thread

    k = Object.keys( sim_set ).map( Number );
    if ( k.length == 1 ) {
      continue;
    }

    id.push( { "n": k.length, "tw_ID": i } );
  }

  id.sort( function( a, b ) {
    return b.n - a.n;
  } );

  return id;				// Return list of potential anchors
}					// End function order_sim_set


function order_tweet( tw_A, tw_B )

  //  Order two tweets by date for the built-in sort function
  //
  //  tw_A:  First tweet
  //  tw_B:  Second tweet
{
  var  dt_tm_A;				// First tweet's date-time, in epoch
  var  dt_tm_B;				// Second tweet's date-time, in epoch


  dt_tm_A = new Date( tw[ tw_A ].time ).getTime();
  dt_tm_B = new Date( tw[ tw_B ].time ).getTime();

  return dt_tm_A - dt_tm_B;
}					// End function order_tweet


function print_active_path()

  //  Convert active path into lists of nodes, then print them in a
  //  standard dialog
{
  var  i, j;				// Loop counters
  var  ID;				// Tweet ID of current node
  var  path_str = "";			// String containing path tweet bodies
  var  rep = [ ];			// Representative terms per path
  var  title = "";			// Tit\le string


  for( i = 0; i < active_path.length; i++ ) {
    rep.push( choose_rep_term( active_path[ i ], active_path[ i ].length ) );
  }

  title = "Narrative Threads: " + active_path.length + "\n";
  title = title + "<ul ";
  title = title +
    "style=\"padding-left: 1.5em; margin-top: 0.5em; margin-bottom: 0em;\">\n";

  for( i = 0; i < active_path.length; i++ ) {
    title = title + "<li style=\"padding: 2px 0px; font-size: 0.8em;\">";
    title = title + "Thread " + ( i + 1 ) + " (";
    title = title + rep[ i ] + "), ";
    title = title + active_path[ i ].length + " tweets</li>\n";
  }

  title = title + "</ul>\n";

  for( i = 0; i < active_path.length; i++ ) {
    path_str = path_str + "<p><b>Thread " + ( i + 1 ) + " (";
    path_str = path_str + rep[ i ] + ")</b></p>\n";

    path_str = path_str + "<ol style=\"padding-left: 1.5em;\">\n";
    path_str = path_str + "<li style=\"padding: 2px 0px;\">";

    //  Uses moment.js format() function (http://momentjs.com)

    ID = active_path[ i ][ 0 ];
    path_str = path_str +
      moment( new Date( tw[ ID ].time ) ).format( "MMM D, h:mma, " );

    path_str = path_str + "<a href=\"" + tw[ ID ].link + "\" ";
    path_str = path_str + "style=\"color: " + default_txt_c() + "\" ";
    path_str = path_str + "target=\"_blank\">";
    path_str = path_str + tw[ ID ].name + "</a>: ";

    path_str = path_str + tw[ ID ].fmt + "</li>\n";

    for( j = 1; j < active_path[ i ].length; j++ ) {
      ID = active_path[ i ][ j ];

      path_str = path_str + "<li style=\"padding: 2px 0px;\">";
      path_str = path_str +
        moment( new Date( tw[ ID ].time ) ).format( "MMM D, h:mma, " );

      path_str = path_str + "<a href=\"" + tw[ ID ].link + "\" ";
      path_str = path_str + "style=\"color: " + default_txt_c() + "\" ";
      path_str = path_str + "target=\"_blank\">";
      path_str = path_str + tw[ ID ].name + "</a>: ";

      path_str = path_str + tw[ ID ].fmt + "</li>\n";
    }

    path_str = path_str + "</ol></p>\n";
  }

  show_alert_dlg( title, path_str, "Info", "Narrative Threads" );
}					// End function print_active_path


function print_threads( anchor )

  //  Print narrative threads for debugging
{
  var  i, j;				// Loop counters
  var  str;				// Temporary string value
  var  tw_ID;				// Current tweet ID


  narrative_threads( anchor );		// Build narrative thread list

  for( i = 0; i < narr_thread.length; i++ ) {

    //  Print cluster enumerator, number of tweets it contains, and
    //  details on each tweet

    str = "Thread " + i + " (" + narr_thread[ i ].length + "): [\n";

    for( j = 0; j < narr_thread[ i ].length; j++ ) {
      tw_ID = narr_thread[ i ][ j ]

    //  Print tweet's ID, it's dissimilarity to anchor, it's raw body

      str = str + "  " + tw_ID + "/" + tw[ tw_ID ].name + " ";

      if ( tw_ID == anchor ) {		// Anchor not in sim_set
        str = str + "(1.00/0.00): ";
      } else {
        str = str + "(" + sim_set[ tw_ID ].toFixed( 2 ) + "/";
        str = str + ( 1.0 - dissim[ anchor ][ tw_ID ] ).toFixed( 2 ) + "): ";
      }

      str = str + tw[ tw_ID ].time + ", ";
      str = str + tw[ tw_ID ].raw + "\n";
    }

    str = str + "]";
    console.log( str );
  }
}					// End function print_threads


function render_anchor_links()

  //  Render anchor's prev and post links
{
  var  child_id;			// ID of current child node
  var  beg = { };			// Current node center: { x: , y: }
  var  end = { };			// Child node center: { x: , y: }
  var  i;				// Loop counters
  var  svg;				// Narrative SVG element for rendering


  svg = d3.select( "#narrative-svg" );	// Point to SVG to update

  beg[ "x" ] = anchor_node.x;		// Starting point for all links
  beg[ "y" ] = anchor_node.y;

  //  Render post links

  for( i = 0; i < anchor_node.child.length; i++ ) {
    child_id = anchor_node.child[ i ];
    end[ "x" ] = post_tree[ 0 ][ child_id ].x;
    end[ "y" ] = post_tree[ 0 ][ child_id ].y;

    render_SVG_link( svg, "anchor-" + cur_anchor + "-" + child_id, beg, end );
  }

  //  Render prev links

  if ( anchor_node.parent.length == 0 ) {
    return;
  }

  for( i = 0; i < anchor_node.parent.length; i++ ) {
    child_id = anchor_node.parent[ i ];
    end[ "x" ] = prev_tree[ 0 ][ child_id ].x;
    end[ "y" ] = prev_tree[ 0 ][ child_id ].y;

    render_SVG_link( svg, "anchor-" + child_id + "-" + cur_anchor, beg, end );
  }
}					// End function render_anchor_links


function render_anchor_node( anchor )

  //  Render anchor's node
  //
  //  anchor:  Anchor tweet ID
{
  var  svg;				// SVG for anchor node
  var  tree;				// Tree contaiing anchor node only


  if ( anchor < 0 || anchor >= tw.length ) {
    return;
  }

  tree = [ { } ];			// Build tree w/anchor node
  tree[ 0 ][ anchor ] = anchor_node;
  render_subtree_nodes( tree );		// Render anchor node

  //  Update border of anchor node to be thicker red

  svg = document.getElementById( "node-" + anchor );

  svg.setAttribute( "id", "anchor-" + anchor );
  svg.setAttribute( "stroke-width", "2px" )
  svg.setAttribute( "stroke", "rgb(255,0,0)" )
  svg.setAttribute( "stroke-opacity", "0.75" )
}					// End function render_anchor_node


function render_subtree_links( tree, prev )

  //  Render either a prev or a post subtree's links
  //
  //  tree:  Tree to render
  //  prev:  True if this is tree previous to anchor, false otherwise
{
  var  child_id;			// ID of current child node
  var  beg = { };			// Current node center: { x: , y: }
  var  end = { };			// Child node center: { x: , y: }
  var  i, j, k;				// Loop counters
  var  id;				// ID of current node
  var  key;				// Keys in current tree column
  var  svg;				// Narrative SVG element for rendering
  var  svg_id;				// SVG id


  svg = d3.select( "#narrative-svg" );	// Point to SVG to update

  //  Draw links first, then nodes over links

  for( i = 0; i < tree.length; i++ ) {	// For all columns in tree
    key = Object.keys( tree[ i ] );	// Get column tweet IDs

    for( j = 0; j < key.length; j++ ) {	// For all column tweet IDs
      id = key[ j ];

      beg[ "x" ] = tree[ i ][ id ].x;
      beg[ "y" ] = tree[ i ][ id ].y;

    //  For all children of current node, draw a link from node to
    //  child

      for( k = 0; k < tree[ i ][ id ].child.length; k++ ) {
        child_id = tree[ i ][ id ].child[ k ];
        end[ "x" ] = tree[ i + 1 ][ child_id ].x;
        end[ "y" ] = tree[ i + 1 ][ child_id ].y;
 
      //  If this is the prev tree, then nodes run backwards in time,
      //  so we want to reverse beg and end; for the post tree, it
      //  runs forwards in time, so no reversal needed

        if ( prev ) {
          svg_id = "link-" + child_id + "-" + id;
        } else {
          svg_id = "link-" + id + "-" + child_id;
        }

        render_SVG_link( svg, svg_id, beg, end );
      }					// End for all children of tweet ID
    }					// End for all tweet IDs in column
  }					// End for all columns in tree
}					// End function render_subtree_links


function render_subtree_nodes( tree )

  //  Render either a prev or a post subtree's nodes
  //
  //  tree:  Tree to render
{
  var  beg = { };			// Current node center: { x: , y: }
  var  col;				// Colour of node
  var  col_svg;				// SVG string for node colour
  var  i, j;				// Loop counters
  var  id;				// ID of current node
  var  key;				// Keys in current tree column
  var  svg;				// Narrative SVG element for rendering


  svg = d3.select( "#narrative-svg" );	// Point to SVG to update

  //  Draw nodes

  for( i = 0; i < tree.length; i++ ) {	// For all columns in tree
    key = Object.keys( tree[ i ] );	// Get column tweet IDs

    for( j = 0; j < key.length; j++ ) {	// For all column tweet IDs
      id = key[ j ];
      beg[ "x" ] = tree[ i ][ id ].x;
      beg[ "y" ] = tree[ i ][ id ].y;

      col = tweet_colour( tw[ id ] );
      col_svg =
        "rgba(" + col.r + "," + col.g + "," + col.b + "," + col.a + ")";

      svg.append( "svg:circle" )
        .on( "mouseenter", function() {		// Show tooltip
          var  msg;				// Tooltip message
          var  id;				// Tweet ID for SVG node

          //  Update current mouse position

          narr_mouse_x = this.getAttribute( "cx" );
          narr_mouse_y = this.getAttribute( "cy" );

          //  Nodes have id "node-xxx", where xxx is tweet ID

          id = this.id.split( "-" )[ 1 ]

          //  Uses momemt.js format() function (http://momentjs.com)

          msg =
            moment( new Date( tw[ id ].time ) ).format( "MMM D, h:mma<br>" );
          msg = msg + "<b>" + tw[ id ].name + "</b>: " + tw[ id ].tip;

          narr_timer_ID = setTimeout( function() {
            narr_tooltip( msg );
          }, 665 );
        } )
        .on( "mouseleave", function() {		// Destroy tooltip, reset timer
          narr_reset_tooltip();
        } )
        .on( "click", function() {		// Handle node clicks
          var  id;				// Tweet ID for SVG node

          id = this.id.split( "-" )[ 1 ]
          narr_click_evt( id );
        } )
        .attr( "id", "node-" + id )
        .attr( "cx", beg[ "x" ] )
        .attr( "cy", beg[ "y" ] )
        .attr( "r", tw[ id ].rad )
        .attr( "fill", col_svg )
        .attr( "stroke-width", "1px" )
        .attr( "stroke", "rgb(192,192,192)" )
    }					// End for all tweet IDs in column
  }					// End for all columns in tree
}					// End function render_subtree_nodes


function render_SVG_link( svg, id, beg, end )

  //  This method renders a spline link between the given endpoints
  //
  //  svg:  SVG canvas to render into
  //  id:   ID for link
  //  beg:  Start endpoint
  //  end:  End endpoint
{
  var  mid_x;				// Midpoint X-position
  var  svg_str;				// SVG string for node/link


  mid_x = beg[ "x" ] - ( ( beg[ "x" ] - end[ "x" ] ) / 2.0 );

  svg_str = "M";
  svg_str = svg_str + beg[ "x" ] + " " + beg[ "y" ];
  svg_str = svg_str + " C ";
  svg_str = svg_str + mid_x + " " + beg[ "y" ] + ",";
  svg_str = svg_str + mid_x + " " + end[ "y" ] + ",";
  svg_str = svg_str + end[ "x" ] + " " + end[ "y" ];

  svg.append( "svg:path" )
    .on( "mouseenter", function() {
      var  i;				// Loop counter
      var  lf;				// Tweet ID for left SVG node
      var  n;				// Number of tweets in current path
      var  msg;				// Tooltip message
      var  pt;				// Control points on path
      var  rt;				// Tweet ID for right SVG node
      var  rep = [ ];			// Representative terms per path

      //  Highlight all threads passing through this link

      active_path = build_thread_list( this.id );
      highlight_active_path( true );

      //  Set appearance of selected link

      this.setAttribute( "stroke", default_txt_c() );
      this.setAttribute( "stroke-width", "5px" );
      this.setAttribute( "stroke-opacity", "0.5" );

      //  Update current mouse position

      pt = this.getAttribute( "d" ).split( /[\ ,]/ );
      narr_mouse_x = ( parseFloat( pt[ 3 ] ) + parseFloat( pt[ 7 ] ) ) / 2.0;
      narr_mouse_y = ( parseFloat( pt[ 4 ] ) + parseFloat( pt[ 6 ] ) ) / 2.0;

      //  node has id "[link | anchor]-xxx-yyy", where xxx/yyy are
      //  tweet IDs

      lf = this.id.split( "-" )[ 1 ]
      rt = this.id.split( "-" )[ 2 ]

      //  Uses momemt.js format() function (http://momentjs.com)

      msg = moment( new Date( tw[ lf ].time ) ).format( "MMM D, h:mma<br>" );
      msg += "<b>" + tw[ lf ].name + "</b>: " + tw[ lf ].tip;
      msg += "<br><br>";
      msg += moment( new Date( tw[ rt ].time ) ).format( "MMM D, h:mma<br>" );
      msg += "<b>" + tw[ rt ].name + "</b>: " + tw[ rt ].tip;

      for( i = 0; i < active_path.length; i++ ) {
        n = active_path[ i ].length;
        rep.push( choose_rep_term( active_path[ i ], n ) );

        //  Put spaces after commas for better word-wrap in dialog

        rep[ rep.length - 1 ] = rep[ rep.length - 1 ].replace( /,/g, ', ' );
      }

      msg = "Narrative Threads: " + active_path.length + "\n";
      msg += "<ul style=\"";
      msg += "padding-left: 1.5em; margin-top: 0.5em; margin-bottom: 0em;\">\n";

      for( i = 0; i < active_path.length; i++ ) {
        msg += "<li style=\"padding: 2px 0px;\">";
        msg += "Thread " + ( i + 1 ) + " (" + rep[ i ] + "), ";
        msg += active_path[ i ].length + " tweets</li>\n";
      }

      msg += "</ul>\n";

      narr_timer_ID = setTimeout( function() {
        narr_tooltip( msg );
      }, 665 );
    } )
    .on( "mouseleave", function() {

      //  Unhighlight all threads passing through this link

      highlight_active_path( false );

      //  Reset appearance of link

      this.setAttribute( "stroke", "rgb(192,192,192)" );
      this.setAttribute( "stroke-width", "2px" );
      this.setAttribute( "stroke-opacity", "1.0" );

      narr_reset_tooltip();
    } )
    .on( "click", function() {		// Handle node clicks
      narr_reset_tooltip();
      print_active_path();
    } )
    .attr( "id", id )
    .attr( "d", svg_str )
    .attr( "stroke", "rgb(192,192,192)" )
    .attr( "stroke-width", "2px" )
    .attr( "fill", "transparent" );
}					//  End function render_SVG_link


function render_tree( anchor )

  //  Render the prev and post tree, and the anchor, as SVG circles
  //  and edges
  //
  //  anchor:  Anchor tweet ID
{
  $("#narrative-svg").empty();		// Empty SVG container
  draw_query_term( "#narrative-svg" );

  if ( !comp_node_abs_pos() ) {		// Not reader to position nodes?
    return;
  }

  if ( narr_thread.length <= 0 ) {	// No narrative threads?
    return;
  }

  //  Render subtree and anchor links

  render_subtree_links( prev_tree, true );
  render_subtree_links( post_tree, false );
  render_anchor_links();

  render_subtree_nodes( prev_tree );	// Render subtree nodes
  render_subtree_nodes( post_tree );
  render_anchor_node( anchor );
}					// End function render_tree


function resize_narrative()

  //  Resize SVG viewbox and force layout's size on window resize
{
  var  h;				// Height of SVG element
  var  w;				// Width of SVG element


  w = $("#narrative-div").width();	// Force SVG to match div's size
  h = $("#narrative-div").height();

  d3.select( "#narrative-svg" ).attr( "width", w );
  d3.select( "#narrative-svg" ).attr( "height", h );

  //  Redraw narrative graph to "fit" new SVG size

  narrative_threads( cur_anchor );
  render_tree( cur_anchor );
}					//  End function resize_narrative


function set_anchor( a )

  //  This method sets the current anchor node
  //
  //  a:  Tweet ID of new anchor node
{
  if ( a < 0 || a > tw.length ) {
    console.log( "set_anchor(), anchor " + a + " is outside range of tweets" );
    return;
  }

  cur_anchor = a;

  narrative_threads( a );		// Build new narrative threads
  render_tree( a );			// Visualize threads
}					// End function set_anchor


function source_vert( v )

  //  Determine if vertex v is a source vertex in the DAG, i.e. if no
  //  other node u connects via a directed edge to v
  //
  //  v:  Vertex to test
{
  var  i;				// Loop counter
  var  k;				// Keys (left tweet IDs ) in DAG
  var  tw_ID;				// Current vertex's tweet ID


  k = Object.keys( dag );		// Get tweet IDs of DAG vertices

  for( i = 0; i < k.length; i++ ) {	// For all nodes in DAG
    tw_ID = k[ i ];

    for( j = 0; j < dag[ tw_ID ].length; j++ ) {
      if ( dag[ tw_ID ][ j ].rt_vert == v ) {
        return false;
      }
    }
  }

  return true;
}					// End function source_vert


function splice_opposite( tree, prev, path )

  //  Given a set of paths from the anchor in one direction, splice
  //  all paths i the opposite direction to get a complete set of
  //  paths (passing through a link selected by the user)
  //
  //  tree:  Complete narrative tree
  //  prev:  True if link is before the current anchor, false otherwise
  //  path:  List of paths on link-side of anchor
{
  var  add;				// How to update path, at beg or end
  var  i, j, k;				// Loop counters
  var  key;				// Tweet ID keys in cur tree column
  var  new_path = [ ];			// Path updated with child node(s)
  var  path_n;				// Number of paths to splice
  var  pos;				// Position along path


  if ( prev ) {				// Splicing post_tree
    key = ( post_tree.length == 0 ) ?
      [ ] : Object.keys( post_tree[ 0 ] ).map( Number );
  } else {				// Splicing prev_tree
    key = ( prev_tree.length == 0 ) ?
      [ ] : Object.keys( prev_tree[ 0 ] ).map( Number );
  }

  //  Prepend if splicing post_tree, append if splicing prev_tree

  add = ( prev ) ? updt.end : updt.beg;
  pos = ( prev ) ? prev_tree.length : prev_tree.length - 1;

  path_n = path.length;
  for( i = 0; i < path_n; i++ ) {	// Extend all paths up to anchor
    for( j = 0; j < key.length; j++ ) { // For all paths leaving anchor
      new_path =
        walk_tree( tree, cur_anchor, key[ j ], pos, !prev, dir.bak, add );

      //  Extend current path with all new path branches

      for( k = 0; k < new_path.length; k++ ) {
        if ( prev ) {
          new_path[ k ] = path[ i ].concat( new_path[ k ] );
        } else {
          new_path[ k ] = new_path[ k ].concat( path[ i ] );
        }
      }

      //  If more new paths, maintain cur path (used in next concat
      //  operation above), otherwise replace cur path with first new
      //  path, then append remaining new paths to end of path list.
      //  This ensures loop properly touches all original paths, but
      //  terminates before new ones

      if ( j < key.length - 1 ) {	// More new paths to splice?
        path = path.concat( new_path );
      } else {
        path = path.slice( 0, i ).	// Everything up to cur path
          concat( [ new_path[ 0 ] ] ).	// Replace cur path with first new path
          concat( path.slice( i + 1 ) ).// All original paths kept in place
          concat( new_path.slice( 1 ) );// All remaining new paths
      }
    }
  }

  return path;
}					// End function splice_opposite


function splice_pairs( prev, path_fwd, path_bak )

  //  Given two sets of paths passing through a link, splice them
  //  together with the anchor to produce all paths through the link
  //  up to the anchor
  //
  //  prev:      True if link between path_fwd and path_bak is before
  //             the current anchor, false otherwise
  //  path_fwd:  Paths moving towards the anchor
  //  path_bak:  Paths moving away from the anchor
{
  var  fwd;				// Forward path with link removed
  var  i, j;				// Loop counters
  var  path = [ ];			// List of spliced paths


  //  Splice all pairs of path_fwd and path_bak lists

  for( i = 0; i < path_fwd.length; i++ ) {
    for( j = 0; j < path_bak.length; j++ ) {

    //  path_fwd[ i ] and path_bak[ j ] should both have the link on
    //  them, as the first two entries on path_fwd, and as the last
    //  two entries on path_bak, confirm and remove the duplicate
    //  entries from path_fwd

    //  Either path length could be one if left or right link endpoint
    //  was anchor node

      if ( path_fwd[ i ].length == 1 || path_bak[ j ].length == 1 ) {
        fwd = path_fwd[ i ].slice( 1 );
      } else if ( prev ) {
        fwd = path_fwd[ i ].slice( 2 );
      } else {
        fwd = path_fwd[ i ].slice( 0, -2 );
      }

      if ( prev ) {			// Link prior to anchor?
        path.push( path_bak[ j ].concat( fwd ).concat( [ cur_anchor ] ) );
      } else {				// Link after anchor
        path.push( [ cur_anchor ].concat( fwd ).concat( path_bak[ j ] ) );
      }
    }					// End for all paths away from link
  }					// End for all paths towards link

  return path;
}					// End function splice_pairs


function splice_tree()

  //  Splice prev and post tree with anchor node to create a complete
  //  tree structure
{
  var  i, j;				// Loop counters
  var  list;				// Temporary list object
  var  narr_tree;			// Complete narrative tree w/anchor
  var  obj = { };			// Object holding anchor nodde


  obj[ cur_anchor ] = anchor_node;	// Add anchor node w/tweet ID key

  //  First, reverse prev_tree so it moves forward in time, then
  //  concatenate anchor node w/tweet ID key, then post_tree, use
  //  slice( 0 ) to duplicate/preserve prev_tree before splice()

  narr_tree = prev_tree.slice( 0 ).splice( 0 ).reverse();
  narr_tree = narr_tree.concat( obj );
  narr_tree = narr_tree.concat( post_tree );

  return narr_tree;
}					// End function splice_tree


function topo_sort()

  //  Topologically sort the DAG, such that for every directed edge uv
  //  u occurs before v in the sorted result. Basic algorithm:
  //
  //  - for every node u in DAG
  //  - if u not visited, visit all its adjacent nodes v
  //  - place adjacent nodes on a stack in topologically sorted order
  //  - then place u on the stack
  //
  //  Visiting partners and recursively applying this algorithm will
  //  produce a final, topologically sorted list
{
  var  i;				// Loop counter
  var  k;				// Keys (left tweet IDs) in DAG
  var  topo = [ ];			// Toplogical sort result
  var  visit = { };			// Vertex visited flags


  k = Object.keys( dag );

  for( i = 0; i < k.length; i++ ) {	// Initialize visit dictionary
    visit[ k[ i ] ] = false;
  }

  for( i = 0; i < k.length; i++ ) {	// Process every vertex
    if ( !visit[ k[ i ] ] ) {
      topo_sort_vert( parseInt( k[ i ] ), visit, topo );
    }
  }

  return topo;
}					// End function topo_sort


function topo_sort_vert( par, visit, topo )

  //  Recursively topologically order all nodes adjacent to parent
  //
  //  par:    Parent node to begin recursion
  //  visit:  Node already visited flags
  //  topo:   Topological sort stack
{
  var  i;				// Loop counter


  visit[ par ] = true;

  if ( dag[ par ] === undefined ) {	// No adjacent nodes?
    topo.unshift( par );
    return;
  }

  //  Recursively process nodes adjacent to parent node

  for( i = 0; i < dag[ par ].length; i++ ) {
    if ( !visit[ dag[ par ][ i ].rt_vert ] ) {
      topo_sort_vert( parseInt( dag[ par ][ i ].rt_vert ), visit, topo );
    }
  }

  topo.unshift( par );			// Place parent BEFORE adjacent nodes
}					// End function topo_sort_vert


function update_narrative()

  //  Update narrative threads by emptying any existing threads, then
  //  re-populating the tweet table to allow new anchor threads to be
  //  selected
{
  var  anchor_tw = [ ];			// Potential anchor tweets
  var  i;				// Loop counter
  var  ID;				// ID of current tweet
  var  tbl;				// Datatable to update
  var  tw_fmt = [ ];			// Formatted tweets


  cur_anchor = -1;			// Invalidate anchor tweet

  $("#narrative-svg").empty();		// Empty SVG container
  draw_query_term( "#narrative-svg" );
  
  tbl = $("#narrative-tbl").DataTable();// Clear anchor tweet table
  tbl.clear().draw();

  if ( tw.length == 0 ) {		// Return if no tweets to process
    return;
  }

  //  For all tweets, only those that have similar tweets can possibly
  //  form narrative threads, so only add those to anchor list

  build_auth_dict();			// Build author dictionary

  anchor_tw = order_sim_set();		// Get tweets w/similar tweets..
  if ( anchor_tw.length == 0 ) {	// ..ordered by num of similar tweets
    return;
  }

  //  Update data in anchor table

  for( i = 0; i < anchor_tw.length; i++ ) {
    ID = anchor_tw[ i ].tw_ID;

    tw_fmt.push( {			// Add a row to the anchor list
      "id": ID,
      "fmt": tw[ ID ].name + ": " + tw[ ID ].fmt
    } );
  }

  tbl.rows.add( tw_fmt ).draw();	// Add data to table
  tbl.columns.adjust();			// Adjust column widths to fit data
}					// End function update_narrative


function walk_tree( tree, lf_id, rt_id, lf_pos, prev, walk, add )

  //  Walk through the narrative tree towards the anchor, building all
  //  paths from a starting link
  //
  //  tree:    Tree to walk
  //  lf_id:   Link's left endpoint ID
  //  rt_id:   Link's right endpoint ID
  //  lf_pos:  Position of left endpoing in tree's columns
  //  prev:    Link prior (in time) to anchor flag
  //  walk:    Direction to walk (towards or away from anchor)
  //  add:     Position to add nodes: prepend or append
{
  var  add;				// How to update path, at beg or end
  var  adj;				// Adjacent nodes (in dir we're moving)
  var  col;				// Current column in prev/post tree
  var  cur;				// Current node in current column
  var  fin;				// Finished processing flag
  var  i;				// Loop counters
  var  new_path = [ ];			// Path updated with child node(s)
  var  path = [ ];			// Paths passing through selected link
  var  path_n;				// Length of path list


  //  Check if one of the endpoints is the anchor

  if ( rt_id == cur_anchor ) {
    if ( !prev && walk != dir.bak ) {	// This should be impossible
      console.log( "walk_tree(), right endpoint is anchor in post tree?" )
      return [ [ ] ];
    } else if ( walk == dir.fwd ) {	// Walked forward into anchor?
      return [ [ lf_id ] ];
    } else {				// Initialize path as left endpoint
      path.push( [ lf_id ] );
    }

  } else if ( lf_id == cur_anchor ) {
    if ( prev && walk != dir.bak ) {	// This should be impossible
      console.log( "walk_tree(), left endpoing is anchor in prev tree?" )
      return [ [ ] ];
    } else if ( walk == dir.fwd ) {	// Walk forward into anchor?
      return [ [ rt_id ] ];
    } else {
      path.push( [ rt_id ] );
    }

  } else {				// No anchor hits, init path as link
     path.push( [ lf_id, rt_id ] );
  }

  //  Setup initial column to start walk from

  if ( ( prev && walk == dir.fwd ) || ( !prev && walk == dir.bak ) ) {
    col = lf_pos + 1;
  } else {
    col = lf_pos;
  }

  fin = false;
  //while( !fin && col >= 0 && col < narr_tree.length ) {
  while( !fin && col >= 0 && col < tree.length ) {
    new_path = [ ];
    fin = true;

    path_n = path.length;
    for( i = 0; i < path_n; i++ ) {	// For all partial paths

      //  If appending, get last node on list, otherwise prepending,
      //  get first node on list

      cur = ( add == updt.end ) ?
              path[ i ][ path[ i ].length - 1 ] : path[ i ][ 0 ];

      //  Check if node is in narrative tree's current column, if not,
      //  path has previously terminated, so skip it

      //if ( !( cur in narr_tree[ col ] ) ) {
      if ( !( cur in tree[ col ] ) ) {
        continue;
      }

      //  Get adjacent node list, if empty or anchor node, path terminated

      adj = ( walk == dir.fwd ) ?
        //narr_tree[ col ][ cur ].parent : narr_tree[ col ][ cur ].child;
        tree[ col ][ cur ].parent : tree[ col ][ cur ].child;

      if ( adj.length == 0 || adj.indexOf( cur_anchor ) != -1 ) {
        continue;
      }

      //  Children exist, for each child, duplicate current path and add
      //  child to proper position, then CAREFULLY update path list

      fin = false;
      new_path = add_path_node( path[ i ], adj, add );

      //  Replace cur path with first new path, then append remaining
      //  new paths to end of path list, ensures loop properly touches
      //  all original paths, but terminates before new ones

      path = path.slice( 0, i ).	// Everything up to cur path
        concat( [ new_path[ 0 ] ] ).	// Replace cur path with first new path
        concat( path.slice( i + 1 ) ).	// All original paths kept in place
        concat( new_path.slice( 1 ) );	// All remaining new paths
    }

    if ( ( prev && walk == dir.fwd ) || ( !prev && walk == dir.bak ) ) {
      col++;
    } else {
      col--;
    }
  }

  return path;
}					// End function walk_tree
