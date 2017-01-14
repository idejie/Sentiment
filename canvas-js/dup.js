/*--------------------------------------------------------------------------*/
/*  DUP.JS								    */
/*    Routine to detect and manage "similar" or "duplicate" text bodies	    */
/*    in a cluster of tweet and URL bodies				    */
/*									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/*									    */
/*  12-Dec-12	Christopher G. Healey	Initial implementation		    */
/*  15-Dec-12	Christopher G. Healey	Added ability for "relaxed" match   */
/*  19-Dec-12	Christopher G. Healey	Don't collapse different types of   */
/*					bodies, i.e. tweets to tweets only  */
/*					and URLs to URLs only		    */
/*--------------------------------------------------------------------------*/

var  RELAX_MIN_PCT = 0.8;		// Percentage minimum for relaxed match
var  S = { };				// Array of matched text bodies

  //  Structure of JSON fields in S:
  //
  //  n:           Number of bodies
  //  body[]:      Array of original bodies
  //  body_n[]:    Array of occurrences of each body (>1 if duplicates seen)
  //  strip[]:     Array of stripped bodies
  //  disp[]:      Array of modified bodies suitable for display
  //  tags[]:      Array of arrays of hash tags in each body
  //  index[]:     Array of caller-provided indices of each body
  //
  //  s:           Number of sets of identical bodies
  //  set_ID[]:    Array of indices (into body) of bodies in each identical set
  //  set_n[]:     Total number of tweets in set (including duplicates)
  //  tag_list[]:  Array of strings of each set's hashtag list
  //  anchor[]:    Array of indices (into body) of each set's anchor body


function anchor( idx )

  //  Return the anchor text for the collapsed set containing the
  //  given ORIGINAL index
  //
  //  idx:  ORIGINAL index to query
{
  var  mat;				// Set index of target


  mat = find_set( idx );

  if ( mat == -1 ) {			// No match on index?
    return ( "No index " + idx );
  } else {
    return S.disp[ S.anchor[ mat ] ];
  }
}					// End function anchor


function build_disp_body( tw_body )

  //  Strip hashtags from stripped body
  //
  //  tw_body:  Tweet body
{
  var  tw_strip;                        // Stripped body


  tw_strip = tw_body;                   // Copy original body text

  //  Strip hashtag text, compress/remove multiple separators

  tw_strip = strip_substr( tw_strip, /#/, /[\s:]/ );
  tw_strip = compress( tw_strip );

  return tw_strip;
}                                       // End function build_disp_body


function build_strip_body( tw_body )

  //  Strip extraneous text from tweet body
  //
  //  tw_body:  Tweet body
{
  var  tw_strip;                        // Stripped body


  tw_strip = tw_body;                   // Copy original body text

  //  Strip: RT @user; #hashtag; http://urls, and "..." at end of RT,
  //  regex's for url_beg and url_end defined at end of query.js

  tw_strip = strip_substr( tw_strip, /RT\s*@/, /[\s:]/, 3 );
  tw_strip = strip_substr( tw_strip, /#/, /[\s:]/ );
  tw_strip = strip_substr( tw_strip, url_beg, url_end );
  tw_strip = strip_substr( tw_strip, /\.{3,}/, /\s/ );

  //  Split and re-build the string to remove multiple separators,
  //  separators at start/end of string, etc.

  tw_strip = compress( tw_strip );

  return tw_strip;
}                                       // End function build_strip_body


function cmp_body( b1, b2, relax )

  //  Compare two body strings on their maximum overlap
  //
  //  b1:     First body string to compare
  //  b2:     Second body string to compare
  //  relax:  Perform a fallback, more relaxed search (default=false)
{
  var  match = false;			// Bodies match flag


  if ( typeof relax === "undefined" ) {
    relax = false;
  }

  if ( b1.length < b2.length ) {
    match = ( b1 == b2.substr( 0, b1.length ) );
  } else {
    match = ( b1.substr( 0, b2.length ) == b2 );
  }

  if ( !match && relax ) {
    match = cmp_fallback( b1, b2, RELAX_MIN_PCT );
  }

  return match;
}					// End function cmp_body


function cmp_fallback( b1, b2, pct )

  //  Compare two body strings token by token, and if a set percentage
  //  match, consider this a body-level match
  //
  //  b1:   First body string to compare
  //  b2:   Second body string to compare
  //  pct:  Percentage of tokens that need to match
{
  var  b1_len;				// Number of tokens in first body
  var  b1_next;				// Next match on first body's token
  var  b1_tok;				// First body's tokens
  var  b2_len;				// Number of tokens in second body
  var  b2_next;				// Next match on second body's token
  var  b2_tok;				// Second body's tokens
  var  i, j;				// Indices into body token arrays
  var  len_max;				// Longest body length
  var  len_min;				// Shortest body length
  var  n;				// Number of token matches


  b1_tok = b1.toLowerCase().split( /[\s.():;]+/ );
  b2_tok = b2.toLowerCase().split( /[\s.():;]+/ );

  //  Remove empty tokens

  for( i = 0; i < b1_tok.length; i++ ) {
    if ( b1_tok[ i ].length <= 0 ) {
      b1_tok.splice( i, 1 );
    }
  }
  for( i = 0; i < b2_tok.length; i++ ) {
    if ( b2_tok[ i ].length <= 0 ) {
      b2_tok.splice( i, 1 );
    }
  }

  b1_len = b1_tok.length;		// Get surviving token counts
  b2_len = b2_tok.length;

  if ( b1_len < b2_len ) {		// Get min/max body lengths
    len_min = b1_len;
    len_max = b2_len;
  } else {
    len_min = b2_len;
    len_max = b1_len;
  }

  if ( len_min / len_max < pct ) {	// If threshold pct impossible, return
    return false;
  }

  n = 0;				// Initialize no token matches

  i = 0;				// Start at front of token arrays
  j = 0;
  while( i < b1_len && j < b2_len ) {
    if ( b1_tok[ i ] == b2_tok[ j ] ) {
      i++;
      j++;
      n++;

    } else {
      b1_next = look_ahead( b2_tok[ j ], b1_tok, j );
      b2_next = look_ahead( b1_tok[ i ], b2_tok, i );

  //  Search ahead for b1's token in b2's list and vice versa; if
  //  match found, choose closest match, and if no match on either
  //  side, assume both tokens unique and step ahead on both lists

      if ( b1_next != -1 && ( b2_next == -1 || b1_next < b2_next ) ) {
        i = b1_next;
      } else if ( b2_next != -1 ) {
        j = b2_next;
      } else {				// No match, both tokens unique?
        i++;
        j++;
      }
    }
  }

  //  Pick shorter token array, use its length to determine
  //  "percentage" match for true/false decision

  if ( n / len_min >= pct ) {
    return true;
  } else {
    return false;
  }
}					// End function cmp_fallback


function collapse( body_list, relax )

  //  Build sets of "textually identical" text bodies
  //
  //  body_list:  List of text bodies to cluster
  //  relax:      Perform a fallback, more relaxed search flag (default=false)
{
  var  avail = [ ];			// Body available array
  var  i, j, k;				// Loop counters
  var  len;				// Maximum body length
  var  sum;				// Sum of tweets (w/duplicates) in set


  if ( typeof relax === "undefined" ) {
    relax = false;
  }

  S = new Object();
  S[ "n" ] = body_list.length;
  S[ "body" ] = new Array();
  S[ "body_n" ] = new Array();
  S[ "strip" ] = new Array();
  S[ "disp" ] = new Array();
  S[ "tags" ] = new Array();
  S[ "index" ] = new Array();

  //  Strip bodies of extraneous text, and collect hashtags and indices

  for( i = 0; i < body_list.length; i++ ) {
    S.index[ i ] = i;
    S.body[ i ] = body_list[ i ].raw;
    S.body_n[ i ] = body_list[ i ].dup + 1;
    S.disp[ i ] = build_disp_body( S.body[ i ] );
    S.strip[ i ] = build_strip_body( S.body[ i ] );
    S.tags[ i ] = find_hashtag( S.body[ i ] );

    avail.push( true );
  }

  //  Build sets of "identical" bodies

  S[ "s" ] = 0;				// Initialize set count
  S[ "set_ID" ] = new Array();
  S[ "set_n" ] = new Array();
  S[ "tag_list" ] = new Array();
  S[ "anchor" ] = new Array();

  for( i = 0; i < S.strip.length; i++ ) {
    if ( !avail[ i ] ) {		// Skip already processed bodies
      continue;
    }

    S.set_ID[ S.s ] = new Array();	// Create new array of body IDs
    S.set_ID[ S.s ].push( i );

    sum = S.body_n[ i ];		// Initialize set's tweet count

    S.tag_list[ S.s ] = "";		// Initialize set's tag list
    for( k = 0; k < S.tags[ i ].length; k++ ) {
      S.tag_list[ S.s ] += ( S.tag_list[ S.s ].length > 0 ) ? " " : "";
      S.tag_list[ S.s ] += S.tags[ i ][ k ];
    }

    S.anchor[ S.s ] = i;		// Initialize set's anchor body
    len = S.strip[ i ].length;

    for( j = i + 1; j < S.strip.length; j++ ) {
      if ( !avail[ j ] ) {		// Skip already processed bodies
        continue;
      }

    //  In order for bodies to match, they must be close enough in
    //  content to be considered the same

      if ( cmp_body( S.strip[ i ], S.strip[ j ], relax ) ) {
        S.set_ID[ S.s ].push( j );	// Save ID of "identical" body
        avail[ j ] = false;

        sum += S.body_n[ j ];		// Increment set's tweet count

      //  Update anchor tweet if new body is longest body seen so far

        if ( S.strip[ j ].length > len ) {
          S.anchor[ S.s ] = j;
          len = S.strip[ j ].length;
        }

      //  For all hashtags in tweet, add unique tags to the collapsed
      //  set's list of hashtags

        for( k = 0; k < S.tags[ j ].length; k++ ) {
          if ( S.tag_list[ S.s ].search( S.tags[ j ][ k ] ) == -1 ) {
            S.tag_list[ S.s ] += ( S.tag_list[ S.s ].length > 0 ) ? " " : "";
            S.tag_list[ S.s ] += S.tags[ j ][ k ];
          }
        }
      }
    }

    S.set_n[ S.s ] = sum;		// Save set's tweet count
    S.s++;				// Increase number of sets
  }

  dump_set();				// Debugging dump of collapse sets
}					// End function collapse


function common_set( idx_1, idx_2 )

  //  Return TRUE if indices idx_1 and idx_2 occur in a common
  //  collapsed set, FALSE otherwise
  //
  //  idx_1:  First index
  //  idx_2:  Second index
{
  var  mat_1;				// Set index of first target


  mat_1 = find_set( idx_1 );
  if  ( mat_1 == -1 ) {			// First target doesn't exist?
    return false;
  }

  return ( mat_1 == find_set( idx_2 ) );// Check for a common set
}					// End function common_set


function compress( tw_body )

  //  Compress multiple separators, remove any leading or trailing
  //  separators
  //
  //  tw_body:  Body to compress
{
  var  i;				// Loop counter
  var  tok;				// Array of tokens in tweet body
  var  tw_strip;                        // Stripped body


  tok = tw_body.split( /\s+/ );		// Split into tokens across separators

  tw_strip = "";
  for( i = 0; i < tok.length; i++ ) {
    if ( tok[ i ].length <= 0 ) {
      continue;
    }

    tw_strip += ( tw_strip.length > 0 ) ? " " : "";
    tw_strip += tok[ i ];
  }

  return tw_strip;
}					// End function compress


function dump_set( disp_min )

  //  Dump the set in a readable format to the console
  //
  //  disp_min:  Threshold set size for display (default=3)
{
  var  i, j;				// Loop counter
  var  str;				// Output string


  if ( typeof disp_min == "undefined" ) {
    disp_min = 3;
  }

  for( i = 0; i < S.s; i++ ) {		// For all sets of bodies
    if ( S.set_ID[ i ].length < disp_min ) {
      continue;
    }

    //  Dump collapsed set's anchor body

    console.log( "Anchor:" );

    str = "  " + S.index[ S.anchor[ i ] ] + ": " + anchor( S.anchor[ i ] );
    console.log( str );

    //  Dump collapsed set's hashtag list

    console.log( "Hashtags:" );
    if ( S.tag_list[ i ].length > 0 ) {
      console.log( "  " + S.tag_list[ i ] );
    }

    //  Dump all bodies that "matched" anchor body

    console.log( "Matches (" + ( S.set_ID[ i ].length - 1 ) + "):" );
    for( j = 0; j < S.set_ID[ i ].length; j++ ) {
      if ( S.set_ID[ i ][ j ] == S.anchor[ i ] ) {
        continue;
      }

      console.log( "  " +
        S.index[ S.set_ID[ i ][ j ] ] + ": " + S.body[ S.set_ID[ i ][ j ] ] );
    }

    console.log( "" );			// Newline
  }
}					// End function dump_set


function find_hashtag( tw_body )

  //  Find and return all hashtags from a tweet body
  //
  //  tw_body:  Tweet body
{
  var  m;				// Regex match array


  m = tw_body.toLowerCase().match( /#\w+/g );

  if ( m != null ) {			// Hashtags exist?
    return m;
  } else {
    return [ ];
  }
}					// End function find_hashtag


function find_set( idx )

  //  Find the collapsed set that contains the ORIGINAL index, return
  //  set's index if found, -1 otherwise
  //
  //  idx:  ORIGINAL index to find
{
  var  i;				// Loop counters
  var  orig;				// Original index provided by caller


  for( i = 0; i < S.s; i++ ) {		// For all collapsed sets

  //  Run through all indices (originally provided by caller) for text
  //  bodies in the current set, if both target indices match, return
  //  TRUE for the common set query

    for( j = 0; j < S.set_ID[ i ].length; j++ ) {

  //  set_ID[] has the index of the tweet in S's index[] array, and
  //  that has the original index passed by the caller

      orig = S.index[ S.set_ID[ i ][ j ] ];

      if ( orig == idx ) {		// Index found?
        return i;
      }
    }
  }

  return -1;				// No match on index
}					// End function find_set


function get_set( sz_min )

  //  Return array of equivalent tweet sets { anchor, ID, tags }
  //  where:
  //
  //    - anchor:  Index into tw[] for set's anchor tweet
  //    - n:       Number of tweets, including duplicates
  //    - ID:      Array of tw[] indicies for tweets in set
  //    - tags:    Object list of hashtags
  //
  //  sz_min:  Threshold set size for display (default=3)
{
  var  eq = [ ];			// Equivalent set array
  var  i, j, k;				// Loop counter
  var  ID;				// Current set member's tw[] index
  var  set;				// Current set object


  if ( typeof sz_min == "undefined" ) {
    sz_min = 3;
  }

  for( i = 0; i < S.s; i++ ) {		// For all sets of bodies
    //if ( S.set_ID[ i ].length < sz_min ) {
    if ( S.set_n[ i ] < sz_min ) {
      continue;
    }

    set = { };				// Create new set object
    set[ "anchor" ] = S.anchor[ i ];	// Save set's anchor index
    set[ "n" ] = S.set_n[ i ];		// Save tweet count w/duplicates

    set[ "ID" ] = [ ];			// Init member indices, hashtags
    set[ "tags" ] = { };

    for( j = 0; j < S.set_ID[ i ].length; j++ ) {
      ID = S.set_ID[ i ][ j ];

    //  Add unique hashtags from current tweet in set

      for( k = 0; k < S.tags[ ID ].length; k++ ) {
        if ( !set[ "tags" ].hasOwnProperty( S.tags[ ID ][ k ] ) ) {
          set[ "tags" ][ S.tags[ ID ][ k ] ] = 1;
        }
      }

      set[ "ID" ].push( ID );		// Save tw[] index
    }

    eq.push( set );			// Push set onto equialence list
  }

  return eq;
}					// End function get_set


function hashtags( idx )

  //  Return the hashtags for the collapsed set containing the given
  //  ORIGINAL index
  //
  //  idx:  ORIGINAL index to query
{
  var  mat;				// Set index of target


  mat = find_set( idx );

  if ( mat == -1 ) {			// No match on index?
    return ( "No index " + idx );
  } else {
    return S.tag_list[ mat ];
  }
}					// End function anchor


function look_ahead( s, tok_list, pos )

  //  Look ahead in an array of tokens for a target token, returning
  //  its index or -1 if no such token found
  //
  //  s:         Token to search for
  //  tok_list:  List of tokens to search within
  //  pos:       Position to start search
{
  var  i;				// Loop counter


  for( i = pos; i < tok_list.length; i++ ) {
    if ( s == tok_list[ i ] ) {		// Match?
      return i;				// Return match position
    }
  }

  return -1;
}					// End function look_ahead


function strip_substr( body, beg_RE, end_RE, beg_len )

  //  Strip a substring from the text body
  //
  //  body:     Body to strip
  //  beg_RE:   Regex identifying beginning of substring
  //  end_RE:   Regex identifying end of substring
  //  beg_len:  Minimum length of beginning of substr (default=1)
{
  var  beg;                             // Beginning of extraneous text
  var  end;                             // End of extraneous text
  var  tok;				// Array of tokens in tweet body
  var  tw_strip;                        // Stripped body


  if ( typeof beg_len === "undefined" ) {
    beg_len = 1;
  }

  tw_strip = body;			// Copy original body text

  beg = tw_strip.search( beg_RE );	// Find first substr
  while( beg != -1 ) {			// While substr exists
    end = tw_strip.substr( beg + beg_len ).search( end_RE );
    end = ( end != -1 ) ? end + beg_len : end;

    if ( end == -1 ) {			// Substr ends body?
      tw_strip = tw_strip.substr( 0, beg );
    } else {				// Substr internal to body?
      tw_strip = tw_strip.substr( 0, beg ) + tw_strip.substr( beg + end + 1 );
    }

    beg = tw_strip.search( beg_RE );	// Find next substr
  }

  return tw_strip;			// Return stripped body
}					// End function strip_substr
