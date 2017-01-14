/*--------------------------------------------------------------------------*/
/*  TFIDF.JS								    */
/*    Routines to calculate document similarity with TF-IDF		    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  stop_w = {				// Stop word list
  "a": true, "about": true, "above": true, "across": true, "after": true, 
  "again": true, "against": true, "all": true, "almost": true, 
  "alone": true, "along": true, "already": true, "also": true, 
  "although": true, "always": true, "among": true, "an": true, 
  "and": true, "another": true, "any": true, "anybody": true, 
  "anyone": true, "anything": true, "anywhere": true, "are": true, 
  "area": true, "areas": true, "around": true, "as": true, "ask": true, 
  "asked": true, "asking": true, "asks": true, "at": true, "away": true, 
  "b": true, "back": true, "backed": true, "backing": true, 
  "backs": true, "be": true, "became": true, "because": true, 
  "become": true, "becomes": true, "been": true, "before": true, 
  "began": true, "behind": true, "being": true, "beings": true, 
  "best": true, "better": true, "between": true, "big": true, 
  "both": true, "but": true, "by": true, "c": true, "came": true, 
  "can": true, "cannot": true, "case": true, "cases": true, 
  "certain": true, "certainly": true, "clear": true, "clearly": true, 
  "come": true, "could": true, "d": true, "did": true, "differ": true, 
  "different": true, "differently": true, "do": true, "does": true, 
  "done": true, "down": true, "down": true, "downed": true, 
  "downing": true, "downs": true, "during": true, "e": true, 
  "each": true, "early": true, "either": true, "end": true, 
  "ended": true, "ending": true, "ends": true, "enough": true, 
  "even": true, "evenly": true, "ever": true, "every": true, 
  "everybody": true, "everyone": true, "everything": true, 
  "everywhere": true, "f": true, "face": true, "faces": true, 
  "fact": true, "facts": true, "far": true, "felt": true, "few": true, 
  "find": true, "finds": true, "first": true, "for": true, "four": true, 
  "from": true, "full": true, "fully": true, "further": true, 
  "furthered": true, "furthering": true, "furthers": true, "g": true, 
  "gave": true, "general": true, "generally": true, "get": true, 
  "gets": true, "give": true, "given": true, "gives": true, "go": true, 
  "going": true, "good": true, "goods": true, "got": true, "great": true, 
  "greater": true, "greatest": true, "group": true, "grouped": true, 
  "grouping": true, "groups": true, "h": true, "had": true, "has": true, 
  "have": true, "having": true, "he": true, "her": true, "here": true, 
  "herself": true, "high": true, "high": true, "high": true, 
  "higher": true, "highest": true, "him": true, "himself": true, 
  "his": true, "how": true, "however": true, "i": true, "if": true, 
  "important": true, "in": true, "interest": true, "interested": true, 
  "interesting": true, "interests": true, "into": true, "is": true, 
  "it": true, "its": true, "itself": true, "j": true, "just": true, 
  "k": true, "keep": true, "keeps": true, "kind": true, "knew": true, 
  "know": true, "known": true, "knows": true, "l": true, "large": true, 
  "largely": true, "last": true, "later": true, "latest": true, 
  "least": true, "less": true, "let": true, "lets": true, "like": true, 
  "likely": true, "long": true, "longer": true, "longest": true, 
  "m": true, "made": true, "make": true, "making": true, "man": true, 
  "many": true, "may": true, "me": true, "member": true, "members": true, 
  "men": true, "might": true, "more": true, "most": true, "mostly": true, 
  "mr": true, "mrs": true, "much": true, "must": true, "my": true, 
  "myself": true, "n": true, "necessary": true, "need": true, 
  "needed": true, "needing": true, "needs": true, "never": true, 
  "new": true, "new": true, "newer": true, "newest": true, "next": true, 
  "no": true, "nobody": true, "non": true, "noone": true, "not": true, 
  "nothing": true, "now": true, "nowhere": true, "number": true, 
  "numbers": true, "o": true, "of": true, "off": true, "often": true, 
  "old": true, "older": true, "oldest": true, "on": true, "once": true, 
  "one": true, "only": true, "open": true, "opened": true, 
  "opening": true, "opens": true, "or": true, "order": true, 
  "ordered": true, "ordering": true, "orders": true, "other": true, 
  "others": true, "our": true, "out": true, "over": true, "p": true, 
  "part": true, "parted": true, "parting": true, "parts": true, 
  "per": true, "perhaps": true, "place": true, "places": true, 
  "point": true, "pointed": true, "pointing": true, "points": true, 
  "possible": true, "present": true, "presented": true, 
  "presenting": true, "presents": true, "problem": true, 
  "problems": true, "put": true, "puts": true, "q": true, "quite": true, 
  "r": true, "rather": true, "really": true, "right": true, 
  "right": true, "room": true, "rooms": true, "s": true, "said": true, 
  "same": true, "saw": true, "say": true, "says": true, "second": true, 
  "seconds": true, "see": true, "seem": true, "seemed": true, 
  "seeming": true, "seems": true, "sees": true, "several": true, 
  "shall": true, "she": true, "should": true, "show": true, 
  "showed": true, "showing": true, "shows": true, "side": true, 
  "sides": true, "since": true, "small": true, "smaller": true, 
  "smallest": true, "so": true, "some": true, "somebody": true, 
  "someone": true, "something": true, "somewhere": true, "state": true, 
  "states": true, "still": true, "still": true, "such": true, 
  "sure": true, "t": true, "take": true, "taken": true, "than": true, 
  "that": true, "the": true, "their": true, "them": true, "then": true, 
  "there": true, "therefore": true, "these": true, "they": true, 
  "thing": true, "things": true, "think": true, "thinks": true, 
  "this": true, "those": true, "though": true, "thought": true, 
  "thoughts": true, "three": true, "through": true, "thus": true, 
  "to": true, "today": true, "together": true, "too": true, "took": true, 
  "toward": true, "turn": true, "turned": true, "turning": true, 
  "turns": true, "two": true, "u": true, "under": true, "until": true, 
  "up": true, "upon": true, "us": true, "use": true, "used": true, 
  "uses": true, "v": true, "very": true, "w": true, "want": true, 
  "wanted": true, "wanting": true, "wants": true, "was": true, 
  "way": true, "ways": true, "we": true, "well": true, "wells": true, 
  "went": true, "were": true, "what": true, "when": true, "where": true, 
  "whether": true, "which": true, "while": true, "who": true, 
  "whole": true, "whose": true, "why": true, "will": true, "with": true, 
  "within": true, "without": true, "work": true, "worked": true, 
  "working": true, "works": true, "would": true, "x": true, "y": true, 
  "year": true, "years": true, "yet": true, "you": true, "young": true, 
  "younger": true, "youngest": true, "your": true, "yours": true, 
  "z": true
};

var  C = [ ];				// Topic clusters
var  C_bbox = [ ];			// Topic cluster bounding boxes
var  C_term = [ ];			// Topic cluster representative terms
var  df = { };				// Term document frequencies
var  dissim = [ ];			// Dissimilarity matrix
var  S = { };				// Singleton (non-clustered) tweets
var  tf = [ ];				// Tweet term frequencies


function add_tweet( ID, tw_term )

  //  Create a term frequency vector for a new tweet
  //
  //  ID:       Tweet's ID
  //  tw_term:  Tweet's term list
{
  var  i;				// Loop counter
  var  term;				// Current term


  tf[ ID ] = new Object();		// Create/zero tweet's term list

  for( i = 0; i < tw_term.length; i++ ) {

    //  If term seen for the first time, initialize its count and
    //  increment its document frequency

    if ( !tf[ ID ].hasOwnProperty( tw_term[ i ] ) ) {
      tf[ ID ][ tw_term[ i ] ] = 1;

      if ( !df.hasOwnProperty( tw_term[ i ] ) ) {
        df[ tw_term[ i ] ] = 1;
      } else {
        df[ tw_term[ i ] ]++;
      }

    } else {				// Otherwise update term frequency
      tf[ ID ][ tw_term[ i ] ]++;
    }
  }
}					// End function add_tweet


function build_dissim_sub( tw_ID )

  //  Build a dissimilarity submatrix containing a subset of tweets
  //
  //  tw_ID:  Tweet IDs to include in submatrix
{
  var  D_sub = [ ];			// Dissimmilarity submatrix
  var  i, j;				// Loop counters
  var  tw_n;				// Number of tweets


  tw_n = tw_ID.length;			// Query number of tweet IDs
  D_sub = new Array( tw_n );		// Build dissimilarity submatrix

  for( i = 0; i < tw_n; i++ ) {		// For all rows
    D_sub[ i ] = new Array( tw_n );

    for( j = 0; j < tw_n; j++ ) {	// For all columns
      D_sub[ i ][ j ] =
        dissim[ parseInt( tw_ID[ i ] ) ][ parseInt( tw_ID[ j ] ) ];
    }
  }

  return D_sub;
}					// End function build_dissim_sub


function choose_cluster()

  //  Identify tweets as either in a cluster, or part of the singleton
  //  list
{
  var  D_sub = [ ];			// Dissimmilarity submatrix
  var  e = [ ];				// Edge array
  var  i, j;				// Loop counters
  var  max;				// Maximum tweets in cluster
  var  mst;				// Minimum spanning tree
  var  P;				// Projected tweet positions
  var  thresh;				// Current MST edge threshold
  var  tw_ID;				// Tweets in current cluster
  var  tw_n;				// Number of tweets in current cluster
  var  v = [ ];				// Vertex array


  S = new Object();			// Reset singleton array
  C_term.length = 0;			// Reset cluster term lists

  if ( tw.length <= 1 ) {		// Zero or one tweet?
    if ( tw.length == 1 ) {		// Single tweet?
      S[ 0 ] = true;
    }

    C = [ ];				// No clusters
    return;
  }

  //  Build edge list between tweets, to ensure at least one complete
  //  path all edges (v0=0, v1=i) are included, plus any edge with
  //  dissimilarity below a cutoff (without this, the graph is too
  //  large to MST efficiently)

  for( i = 0; i < tf.length; i++ ) {	// Build vertex array
    v[ i ] = { x: i, y: 0 };
  }

  //  Use j >= i because dissim[ i ][ j ] == dissim[ j ][ i ]

  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    for( j = i; j < tw.length; j++ ) {	// For all pairwise tweets
      if ( i == 0 || dissim[ i ][ j ] < 1 ) {
        e.push( { v0: i, v1: j, w: dissim[ i ][ j ] } );
      }
    }
  }

  thresh = 0.8;				// Start with edge threshold of 0.8
  do {					// Build clusters until max size <= 50
    //C = build_cluster_alt( v, d, thresh );
    C = build_cluster( v, dissim, thresh );
    thresh -= 0.05;

    max = 0;				// Initialize largest cluster size
    for( i = 0; i < C.length; i++ ) {	// Scan for largest cluster
      tw_n = Object.keys( C[ i ] ).length;
      max = Math.max( tw_n, max );
    }
  } while( max > 50 );			// Stop if max cluster <= 50 tweets

  i = 0;				// For all clusters
  while( i < C.length ) {
    tw_ID = Object.keys( C[ i ] );	// Get cluster's tweet IDs
    tw_n = tw_ID.length;

    if ( tw_n <= MIN_TW ) {		// Cluster too small?
      for( j = 0; j < tw_n; j++ ) {	// Move tweets to singleton list
        S[ tw_ID[ j ] ] = true;
      }
      C.splice( i, 1 );			// Remove cluster

    } else {				// Position cluster's tweets
      D_sub = build_dissim_sub( tw_ID );
      P = mds( D_sub );

    //  For all tweets in cluster, replace boolean placeholder with
    //  tweet's projected position

      for( j = 0; j < tw_n; j++ ) {
        C[ i ][ tw_ID[ j ] ] = { x: P[ j ].x, y: P[ j ].y };
      }
/*
      for( j = 0; j < tw_n; j++ ) {
        var msg = j + ": ";
        for( var k = j; k < tw_n; k++ ) {
          var dist = d(
            C[ i ][ parseInt( tw_ID[ j ] ) ],
            C[ i ][ parseInt( tw_ID[ k ] ) ] );
          msg += dist.toFixed( 3 ) + "/" + D_sub[ j ][ k ].toFixed( 2 ) + "; ";
        }
        console.log( msg );
      }
      console.log( "---" );
*/
      C_term[ i ] = choose_rep_term( tw_ID, tw_n );
      i++;				// Move to next cluster
    }					// End if cluster should be retained
  }					// End for all clusters

/*  Turn this on if you want to get all the edges in each cluster in E

  var  E = [ ];
  var  edge;
  var  k;
  var  v0, v1;

  for( i = 0; i < C.length; i++ ) {
    E[ i ] = new Array();

    tw_ID = Object.keys( C[ i ] );
    tw_n = tw_ID.length;

    for( j = 0; j < tw_n; j++ ) {
      for( k = j + 1; k < tw_n; k++ ) {
        v0 = parseInt( tw_ID[ j ] );
        v1 = parseInt( tw_ID[ k ] );

        if ( dissim[ v0 ][ v1 ] <= thresh ) {
          edge = new Object();
          edge[ "v0" ] = v0;
          edge[ "v1" ] = v1;
          edge[ "w" ] = dissim[ v0 ][ v1 ];

          E[ i ].push( edge );
        }
      }
    }
  }
*/

  print_cluster();
}					// End function choose_cluster


function choose_rep_term( tw_ID, tw_n )

  //  Choose "top" representative terms for the given cluster
  //
  //  tw_ID:  Terms in cluster
  //  tw_n:   Number of terms
{
  var  i;				// Loop counter
  var  term;				// Current term in tweet
  var  term_n;				// Number of terms
  var  term_list;			// List of representative terms
  var  term_wt;				// List of tweets' term weights
  var  term_sort;			// Tweets' terms sorted by term weight
  var  wt;				// TF-IDF term weight


  term_n = 0;				// Initialize term weight list
  term_wt = { };

  for( i = 0; i < tw_n; i++ ) {		// For all tweets in cluster
    for( term in tf[ tw_ID[ i ] ] ) {	// Sum TF-IDF term weights
      wt = tf[ tw_ID[ i ] ][ term ];
      term_wt[ term ] =
        ( term_wt.hasOwnProperty( term ) ) ? term_wt[ term ] + wt : wt;
      term_n++;
    }
  }

  if ( term_n == 0 ) {			// No terms?
    return "";
  }

  term_sort = [ ];			// Initialize sorted term list
  for( term in term_wt ) {		// Assign terms, weights to sort list
    term_sort.push( { key: term, val: term_wt[ term ] } );
  }

  term_sort.sort( function( t0, t1 ) {	// Sort term list by term weight
      return t1.val - t0.val;
    }
  );

  //  Build a list of top 3 (or more) terms for cluster

  term_list = term_sort[ 0 ].key;	// First term in term list
  for( i = 1; i < term_sort.length; i++ ) {

  //  If at least 3 terms, and if next term has lower weight than
  //  previous term, stop adding terms, to a max of 5 terms

    if ( ( i >= 3 && term_sort[ i ].val < term_sort[ i - 1 ].val ) || i > 4 ) {
      break;
    }

    term_list = term_list + "," + term_sort[ i ].key;
  }

  return term_list;
}					// End function choose_rep_term


function cluster_dissim( c0, c1 )

  //  Calculate TF-IDF dissimilarity between two clusters
  //
  //  c0:  First cluster
  //  c1:  Second cluster
{
  var  i;				// Loop counter
  var  key = [ ];			// Clusters' keys
  var  key_n = [ ];			// Number of keys in clusters
  var  sum;				// Sum of max dissimilarities


  if ( c0 < 0 || c0 >= C.length || c1 < 0 || c1 >= C.length ) {
    return 0;
  }

  if ( c0 == c1 ) {			// Same cluster?
    return 0;
  }

  key[ 0 ] = Object.keys( C[ c0 ] );
  key[ 1 ] = Object.keys( C[ c1 ] );
  key_n[ 0 ] = key[ 0 ].length;
  key_n[ 1 ] = key[ 1 ].length;

  //  Sum distances between tweet in one cluster and most distant
  //  neighbour in the other cluster

  sum = 0;

  for( i = 0; i < key_n[ 0 ]; i++ ) {	// For all keys in first cluster
    for( j = 0; j < key_n[ 1 ]; j++ ) {	// For all keys in second cluster
      sum += dissim[ parseInt( key[ 0 ][ i ] ) ][ parseInt( key[ 1 ][ j ] ) ];
    }
  }

  sum /= ( key_n[ 0 ] * key_n[ 1 ] );
  return sum;
}					// End function cluster_dissim


function comp_dissim()

//  Calculate normalized dissimliarty between all pairs of tweets
{
  var  i, j;				// Loop counters
  var  max;				// Maximum dissimilarity


  dissim.length = 0;			// Free existing dissimilarity matrix
  for( i = 0; i < tw.length; i++ ) {	// Create matrix rows
    dissim[ i ] = new Array();
  }

  max = tweet_sim( 0, 1 );		// Initialize maximum similarity
  for( i = 0; i < tw.length; i++ ) {	// Build upper diagonal sim matrix
    for( j = i; j < tw.length; j++ ) {
      dissim[ i ][ j ] = tweet_sim( i, j );
      max = Math.max( dissim[ i ][ j ], max );
      //max = ( dissim[ i ][ j ] > max ) ? dissim[ i ][ j ] : max;
    }
  }

  //  Convert to dissimilarities by taking ( max - dissim[ i ][ j ] ),
  //  then normalize by dividing by max

  for( i = 0; i < tw.length; i++ ) {
    for( j = i; j < tw.length; j++ ) {
      dissim[ i ][ j ] = ( max - dissim[ i ][ j ] ) / max;
      dissim[ j ][ i ] = dissim[ i ][ j ];
    }
  }
}					// End function comp_dissim


function fit_bbox( P, x_orig, y_orig, w, h )

  //  This method fits a set of points w/x,y positions to a bounding
  //  box with a given width and height, with the lower-left corner
  //  anchored at a given (x,y) position
  //
  //  P:       Pointset to fit
  //  w:       Bounding box width
  //  h:       Bounding box height
  //  x_orig:  Lower-left x-corner
  //  y_orig:  Lower-left y-corner
{
  var  cur_h;				// Current height of pointset
  var  cur_w;				// Current width of pointset
  var  i;				// Loop counter
  var  key;				// Element keys in pointset
  var  key_n;				// Number of keys in pointset
  var  ll;				// Lower-left corner of pointset
  var  ur;				// Upper-right corner of pointset


  //  Requesting keys() works for both normal arrays, which return
  //  their index list as keys, and associative objects, which return
  //  their actual keys

  key = Object.keys( P );		// Get pointset "keys"
  key_n = key.length;

  ll = { x: P[ key[ 0 ] ].x, y: P[ key[ 0 ] ].y };
  ur = { x: P[ key[ 0 ] ].x, y: P[ key[ 0 ] ].y };

  for( i = 1; i < key_n; i++ ) {	// Find LL, UR corners of pointset
    if ( P[ key[ i ] ].x < ll.x ) {
      ll.x = P[ key[ i ] ].x;
    } else if ( P[ key[ i ] ].x > ur.x ) {
      ur.x = P[ key[ i ] ].x;
    }

    if ( P[ key[ i ] ].y < ll.y ) {
      ll.y = P[ key[ i ] ].y;
    } else if ( P[ key[ i ] ].y > ur.y ) {
      ur.y = P[ key[ i ] ].y;
    }
  }

  cur_w = ur.x - ll.x;			// Calculate current bbox width, height
  cur_h = ur.y - ll.y;

  //  Scale points to fit new bbox, then shift them to anchor at the
  //  requested (x,y) position

  for( i = 0; i < key_n; i++ ) {
    P[ key[ i ] ].x = ( ( P[ key[ i ] ].x - ll.x ) / cur_w * w ) + x_orig;
    P[ key[ i ] ].y = ( ( P[ key[ i ] ].y - ll.y ) / cur_h * h ) + y_orig;
  }
}					// End function fit_bbox
var  dissim = [ ];			// Dissimilarity matrix


function get_dissim( i, j )

  //  Get dissimilarity between pair of tweets
  //
  //  i, j:  Tweets to query
{
  //  Recall dissim[] is an upper-triangular matrix, so any row i only
  //  has entries j >= i

  if ( i <= j ) {
    if ( typeof dissim[ i ][ j ] == "undefined" ) {
      return 1.0;
    } else {
      return dissim[ i ][ j ];
    }

  } else {
    if ( typeof dissim[ j ][ i ] == "undefined" ) {
      return 1.0;
    } else {
      return dissim[ j ][ i ];
    }
  }
}					// End function get_dissim


function idf()

  //  Weight each document's term frequencies by collection's inverse
  //  document frequencies
{
  var  doc_n;				// Total number of tweets
  var  i;				// Loop counter
  var  sum;				// Sum of squared term TF-IDF values
  var  term;				// Current term


  doc_n = tf.length;

  for( i = 0; i < doc_n; i++ ) {	// For all tweets
    sum = 0;
    for( term in tf[ i ] ) {		// For all terms in tweet
      tf[ i ][ term ] *= Math.log( doc_n / df[ term ] );
      sum += Math.pow( tf[ i ][ term ], 2.0 );
    }

    sum = Math.sqrt( sum );		// Normalize term vector length
    for( term in tf[ i ] ) {
      tf[ i ][ term ] /= sum;
    }
  }
}					// End function idf


function max_dissim( t, c )

  //  Calculate maximum dissimilarity from target tweet to any tweet in
  //  a given cluster
  //
  //  t:  ID of target tweet
  //  c:  Cluster to probe
{
  var  i;				// Loop counter
  var  key;				// Keys in cluster
  var  key_n;				// Number of keys
  var  max = 0;				// Maximum distance


  if ( c < 0 || c >= C.length ) {	// Validate clsuter index
    return 0;
  }

  key = Object.keys( C[ c ] );
  key_n = key.length;

  for( i = 0; i < key_n; i++ ) {	// For all keys in cluster
    if ( max < dissim[ t ][ parseInt( key[ i ] ) ] ) {
      max = dissim[ t ][ parseInt( key[ i ] ) ];
    }
  }

  return max;
}					// End function max_dissim


function position_cluster()

  //  Position tweets in clusters by offsetting clusters relative to one
  //  another based on cluster-cluster similarity
{
  var  D = [ ];				// Dissimilarity between clusters
  var  i, j;				// Loop counters
  var  P;				// Position of clusters
  var  siz;				// Cluster bounding box size
  var  siz_2;				// Cluster bounding box hal-fsize
  var  tw_ID;				// Tweet IDs in current cluster
  var  tw_n;				// Number of tweets in cluster
  var  x, y;				// Tweet position on canvas


  C_bbox.length = 0;			// Reset cluster bounding boxes

  if ( C.length < 1 ) {			// No clusters?
    return;

  } else if ( C.length == 1 ) {		// Single cluster?
    P = new Array( { x: 3.0, y: 5 } );	// Center cluster's centroid

  } else if ( C.length == 2 ) {		// Two clusters?
    P = new Array( 2 );
    P[ 0 ] = { x: 0, y: cluster_dissim( 0, 1 ) };
    P[ 1 ] = { x: cluster_dissim( 0, 1 ), y: 0 };

    fit_bbox( P, 1.5, 1.5, 3.5, 6 );	// Shift centroids to larger box

  } else {				// Position clusters by similarity
    D = new Array( C.length );		// Build cluster dissimilarity matrix

    for( i = 0; i < C.length; i++ ) {	// For all clusters
      D[ i ] = new Array( C.length );

      for( j = 0; j < C.length; j++ ) {	// For all pairwise partners
        D[ i ][ j ] = cluster_dissim( i, j );
      }
    }

    P = mds( D );			// Position cluster centroids
    fit_bbox( P, 1.5, 1.5, 3.5, 6 );	// Shift centroids to larger box
  }

  for( i = 0; i < C.length; i++ ) {	// For all clusters
    tw_ID = Object.keys( C[ i ] );	// Get tweet IDs in cluster
    tw_n = tw_ID.length;

    siz = 0.1 + ( tw_n / 25.0 );	// Fit tweets to bounding box
    siz = ( siz > 1.0 ) ? 1.0 : siz;
    siz_2 = siz / 2.0;

    fit_bbox( C[ i ], -siz_2, -siz_2, siz, siz );

  //  Assign tweet's final position (in bounding box, offset by
  //  bounding box's centroid) back to the original tweet

    for( j = 0; j < tw_n; j++ ) {
      x = C[ i ][ tw_ID[ j ] ].x + P[ i ].x;
      y = C[ i ][ tw_ID[ j ] ].y + P[ i ].y;

      if ( isNaN( x ) ) {
        x = ( ( Math.random() * siz ) - siz_2 ) + P[ i ].x;
      }
      if ( isNaN( y ) ) {
        y = ( ( Math.random() * siz ) - siz_2 ) + P[ i ].y;
      }

      tw[ tw_ID[ j ] ][ "c_pos" ] = { x: x, y: y };
    }

    C_bbox[ i ] =			// Record bounding box of cluster
      { ll_x: -siz_2 + P[ i ].x, ll_y: -siz_2 + P[ i ].y, w: siz, h: siz };
  }
}					// End function position_cluster


function position_singleton()

  //  Position singleton tweets randomly on the right-hand side of the
  //  canvas
{
  var  tw_ID;				// Singleton tweet ID
  var  x, y;				// Tweet position on canvas


  for( tw_ID in S ) {			// For all singleton tweets
    x = 6.0 + ( Math.random() * 3.0 );
    y = 1.0 + ( Math.random() * 7.0 );

    tw[ tw_ID ][ "c_pos" ] = { x: x, y: y };
  }
}					// End function position_singleton


function print_cluster()

  //  Print the tweets that form valid clusters
{
  var  i, j;				// Loop counters
  var  tw_ID;				// Tweet IDs in current cluster


  for( i = 0; i < C.length; i++ ) {
    tw_ID = Object.keys( C[ i ] );
    console.log( "Cluster " + i + ": " + tw_ID.length );

    for( j = 0; j < tw_ID.length; j++ ) {
      console.log( tw_ID[ j ] + ": " + tw[ parseInt( tw_ID[ j ] ) ].body );
    }

    console.log( C_term[ i ] );
    console.log( "---" );
  }
}					// End function print_cluster


function tweet_sim( t0, t1 )

  //  Calculate TF-IDF similarity between two tweets
  //
  //  t0:  First tweet
  //  t1:  Second tweet
{
  var  sum;				// Dot product sum
  var  term;				// Current term


  if ( t0 < 0 || t1 < 0 || t0 >= tf.length || t1 >= tf.length ) {
    return 0.0;
  }

  if ( t0 == t1 ) {			// Self-similarity?
    return 1.0;
  }

  sum = 0;				// Calc dot prod of term freq vecs
  for( term in tf[ t0 ] ) {
    if ( tf[ t1 ].hasOwnProperty( term ) ) {
      sum += tf[ t0 ][ term ] * tf[ t1 ][ term ];
    }
  }

  return sum;
}					// End function tweet_sim


function update_tfidf()

  //  Update TF and IDF for all tweets
{
  var  i;				// Loop counters


  df = new Object();			// Reset term document frequencies

  C.length = 0;				// Reset clusters
  C_bbox.length = 0;			// Reset cluster bounding boxes
  tf.length = 0;			// Reset term frequencies

  if ( tw.length <= 0 ) {		// No tweets?
    return;
  }

  for( i = 0; i < tw.length; i++ ) {	// Process tweet bodies
    add_tweet( i, tw[ i ].term );
  }
  idf();				// Weight term freq by IDF

  comp_dissim();			// Create dissimilarity matrix
  choose_cluster();			// Choose clusters and singleton tweets

  position_cluster();			// Position cluster, singleton tweets
  position_singleton();
}					// End function update_tfidf
