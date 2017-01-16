/*--------------------------------------------------------------------------*/
/*  QUERY.JS								    */
/*    Routines to query tweets, format them, and ask for them to be	    */
/*    visualized in different ways on each tab				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*  26-Sep-16	Christopher G. Healey	Added term negation support	    */
/*--------------------------------------------------------------------------*/

//  Module global variables

//  tw is a JSON array of tweets, with following format:
//
//  {
//    raw:    raw tweet,
//    body:   tweet body stripped of extraneous text,
//    term:   tweet body terms, minus stop words
//    name:   Twitter ID of poster,
//    dup:    Number of duplicates of this tweet
//    time:   time of post,
//    geo:    { lat, lon },
//    tags:   Hashtags in tweet body
//    link:   URL to tweet user's profile
//    tip:    tweet body HTML-formatted for tooltip,
//    fmt:    tweet body HTML-formatted w/URL anchors for info dialog,
//    anew:   [ ANEW term 1, ... ANEW term n ]
//    avg:    { arousal average, valence average }
//    std:    { arousal standard deviation, valence standard deviation }
//    fq:     term frequency average
//    rad:    tweet circle radius = 1 + logf( fq )
//    c_pos:  { cluster x-pos, cluster y-pos }
//  }

var  tw = new Array();

var  block_sz = 3;			// Recent tweet pages/block queried
var  max_id;				// Current maximum twitter ID
var  max_pg = block_sz * 2;		// Max queries, MUST BE block_sz units
var  query_term;			// Current query term
var  pg;				// Current page to request
var  pg_req;				// Pages requested
var  req;				// Number of requests in subblock
var  req_comp;				// Subblock requests completed


function build_tweet_obj(
  tw_raw, tw_name, tw_dt_tm, tw_geo, tw_link, allow_dup )

  //  Build a single, formatted tweet object from the tweet's raw body
  //  and its date/time stamp
  //
  //  tw_raw:     Raw tweet body
  //  tw_name:    Poster's twitter ID
  //  tw_dt_tm:   Date/time as string
  //  tw_geo:     Geotag (optional, default=undefined)
  //  tw_link:    Profile link (optional, default=undefined)
  //  allow_dup:  Allow duplicates (default=false)
{
  var  stem_flag;			// ANEW terms stemmed flag
  var  i;				// Loop counter
  var  match;				// Tweet body matches existing tweet
  var  neg_tok;				// Negated token list on raw body
  var  tag_list;			// List of hashtags in tweet body
  var  tok;				// Tokens in current tweet body
  var  tw_anew;				// Array of ANEW terms as [term,stem]
  var  tw_avg;				// Overall arousal, valence averages
  var  tw_body;				// Tweet body
  var  tw_date;				// Formatted tweet date
  var  tw_fmt;				// Tweet (URL formatted) tooltip
  var  tw_obj;				// JSON tweet object
  var  tw_term = [ ];			// Tweet terms (minus stop words)
  var  tw_time;				// Reformatted tweet time
  var  tw_tip;				// Tweet (formatted) tooltip
  var  tz_pos;				// Timezone position in date
  var  str;				// Temporary string
  var  yr_pos;				// Year position in date


  if ( typeof allow_dup == "undefined" ) {
    allow_dup = false;
  }

  neg_tok = neg_list( tw_raw );		// Check raw terms for negation

  if ( !neg_tok.every( function( v ) { return !v.neg ^ false; } ) ) {
    var s = "";
    var t;

    for( t = 0; t < neg_tok.length; t++ ) {
      if ( neg_tok[ t ].neg ) {
        s = s + "(" + neg_tok[ t ].term + "," +
                neg_tok[ t ].neg + "," + neg_tok[ t ].type + ") ";
      }
    }
    console.log( s );
  }

  tw_body = strip_body( tw_raw );
  tw_anew = process_anew( tw_body, neg_tok );

  match = match_tweet( tw_body );	// Count duplicates
  if ( match != -1 ) {
    tw[ match ].dup++;
  }

  //  Only add tweet if 2+ ANEW terms, and not a duplicate

  if ( tw_anew.length < 2 || ( !allow_dup && match != -1 ) ) {
    return tw_obj;
  }

  str = tw_body;

  //  Split on punctuation, but apostrophes are special, remove things
  //  like 'this is quoted', but not contractions like I'm and don't

  str = remove_apostrophe( str );

  //  Remove any &...; sequences like &amp;

  str = str.replace( /&\w+; /g, '' );

  tok = str.toLowerCase().
    split( /[@&\?!\.,\-\+\/\|~`\u2018"\u201C\u201D:;^\$\*\(\)\s]+/ );
//  split( /[@&\?!\.,\-\+\/\|~'`\u2018\u2019"\u201C\u201D:;^\$\*\(\)\s]+/ );

  //  Split body into terms, save terms but remove stop words

  for( i = 0; i < tok.length; i++ ) {
    if ( tok[ i ].length > 0 && !stop_w.hasOwnProperty( tok[ i ] ) ) {
      tw_term.push( tok[ i ] );
    }
  }

  tw_tip = fmt_tip( tw_raw, neg_tok );
  tw_fmt = fmt_URL( tw_tip );

  tw_avg = comp_anew_avg( tw_anew );
  if ( tw_avg.fq < 1 ) {		// Possible if ANEW fq=0 is seen
    tw_avg.fq = 1;
  }

  tw_obj = new Object();		// Build JSON tweet object

  //  Extract stem state from tw_anew's dict field

  //stem_flag = tw_anew.map( function( v, i ) {
    //return v.dict.indexOf( "-stem" ) != -1;
  //} );

  tw_obj[ "raw" ] = tw_raw;
  tw_obj[ "body" ] = tw_body;
  tw_obj[ "term" ] = tw_term;
  tw_obj[ "name" ] = tw_name;
  tw_obj[ "dup" ] = 0;
  tw_obj[ "tip" ] = tw_tip;
  tw_obj[ "fmt" ] = tw_fmt;
  tw_obj[ "anew" ] = tw_anew
  //tw_obj[ "stem" ] = stem_flag;
  tw_obj[ "avg" ] = tw_avg.avg;
  tw_obj[ "std" ] = tw_avg.std;
  tw_obj[ "fq" ] = tw_avg.fq;
  tw_obj[ "rad" ] = 1.0 + Math.log( tw_avg.fq );

  //  Use a regex to find hashtags in tweet, save them without the
  //  leading # character

  tw_obj[ "tags" ] = [ ];

  tag_list = tw_raw.toLowerCase().match( /#\w+/g );
  if ( tag_list != null ) {
    for( i = 0; i < tag_list.length; i++ ) {
      tw_obj[ "tags" ].push( tag_list[ i ].substr( 1 ) );
    }
  }

  //  Twitter returns dates as "Mon May 03 17:21:00 +0000 2013", but
  //  IE will only parse dates as "Mon May 03 17:21:00 2013 +0000", so
  //  we swap year and timezone in the date string

  yr_pos = tw_dt_tm.lastIndexOf( " " ) + 1;
  tz_pos = tw_dt_tm.substring( 0, yr_pos - 1 ).lastIndexOf( " " ) + 1;

  tw_date = tw_dt_tm.substring( 0, tz_pos - 1 ) + " ";
  tw_date = tw_date + tw_dt_tm.substring( yr_pos ) + " ";
  tw_date = tw_date + tw_dt_tm.substring( tz_pos, yr_pos - 1 );

  tw_obj[ "time" ] = tw_date;

  //  If geolocation is provided and not (0,0), save it

  if ( typeof tw_geo != "undefined" && tw_geo != null &&
       ( tw_geo.coordinates[ 0 ] != 0 || tw_geo.coordinates[ 1 ] != 0 ) ) {
    tw_obj[ "geo" ] = 
      { lon: tw_geo.coordinates[ 0 ], lat: tw_geo.coordinates[ 1 ] };

  } else {
    tw_obj[ "geo" ] = null;
  }

  //  If profile link is provided, save it

  if ( typeof tw_link != "undefined" && tw_link != null ) {
    tw_obj[ "link" ] = tw_link;
  } else {
    tw_obj[ "link" ] = null;
  }

  //  This should never happen, but if it does, we need to catch it

  if ( tw_obj.rad < 1 ) {
    console.log( "Negative tweet radius: " + tw_obj.rad );
    console.log( "r=1+log(fq), fq=" + tw_avg.fq );

    tw_obj.rad = 1;
  }

  return tw_obj;
}					// End function build_tweet_obj


function comp_anew_avg( tw_anew )

  //  This method computes an average for both ANEW dimensions based
  //  on the means and standard devations for ANEW terms in a tweet
  //
  //  tw_anew:  Array of ANEW [ term, negated ] in tweet
{
  var  avg = [ ];			// ANEW averages
  var  dim = [ { }, { }, { } ];		// ARO, VAL, TOT results
  var  fq_avg = 0;			// Term frequency average
  var  i;				// Loop counter
  var  n;				// Number of ANEW terms in tweet
  var  std = [ ];			// ANEW standard deviations
  var  res = { };			// JSON results to return to caller


  n = tw_anew.length;			// Number of ANEW terms

  for( i = 0; i < n; i++ ) {		// Calculate freq avg
    fq_avg += tw_anew[ i ].fq;
  }
  fq_avg /= n;

  for( i = 0; i < n; i++ ) {		// Calculate ARO overall avg
    avg.push( tw_anew[ i ].avg[ ARO ] );
    std.push( tw_anew[ i ].std[ ARO ] );
  }
  dim[ ARO ] = comp_avg( avg, std );

  avg.length = 0;			// Reset arrays
  std.length = 0;

  for( i = 0; i < n; i++ ) {		// Calculate VAL overall avg
    avg.push( tw_anew[ i ].avg[ VAL ] );
    std.push( tw_anew[ i ].std[ VAL ] );
  }
  dim[ VAL ] = comp_avg( avg, std );

  avg.length = 0;			// Reset arrays
  std.length = 0;

  //  Calculate TOT overall average, which is average of ARO and VAL
  //  averages

  avg.push( dim[ ARO ].avg );
  avg.push( dim[ VAL ].avg );
  std.push( dim[ ARO ].std );
  std.push( dim[ VAL ].std );

  dim[ TOT ] = comp_avg( avg, std );

  //  Build JSON object with combined results

  res[ "avg" ] = [ dim[ ARO ].avg, dim[ VAL ].avg, dim[ TOT ].avg ];
  res[ "std" ] = [ dim[ ARO ].std, dim[ VAL ].std, dim[ TOT ].std ];
  res[ "fq" ] = fq_avg;

  return res;
}					// End function comp_anew_avg


function comp_avg( avg, std )

  //  This method computes an average for an ANEW dimension based on
  //  the means and standard devations for ANEW terms in a tweet
  //
  //  avg:  Array of averages
  //  std:  Array of standard deviations
{
  var  i;				// Loop counter
  var  n;				// Number of ANEW terms in tweet
  var  m_avg = 0.0;			// Mean average
  var  p;				// CDF probs for each ANEW term
  var  p_sum = 0.0;			// Sum of probs
  var  res = { };			// JSON results to return to caller
  var  std_avg = 0.0;			// Stdev average
  var  std_sum = 0.0;			// Sum of sdev^2 - mean^2


  n = avg.length;			// Number of values

  for( i = 0; i < n; i++ ) {		// Calculate overall mean avgs
    m_avg += avg[ i ];
  }
  m_avg /= n;

  for( i = 0; i < n; i++ ) {		// Calculate overall stdev avgs
    std_sum += Math.pow( std[ i ], 2.0 ) + Math.pow( avg[ i ], 2.0 );
  }
  std_avg = Math.sqrt( ( std_sum / n ) - Math.pow( m_avg, 2.0 ) );

  //  Adjust means based on formula for cumulative distriution
  //  function, probability p of value x:
  //
  //  - p = ( 1 / sqrt( 2 pi sigma^2 ) ) e^-( ( x - mu )^2 / ( 2 sigma ^2 ) )
  //
  //  but at x = mu, e^0 so e term drops out:
  //
  //  - p = 1 / sqrt( 2 pi sigma^2 )
  //
  //  Want to weight the each term's contributions to the overall mean
  //  based on its standard deviation: higher sd, lower weight, so we:
  //
  //  1. Calculate p for each term
  //  2. Normalize the p-vector, now each p is weight for each term
  //     compared to unweighted situation where p is 1/n for all n terms.
  //
  //  Note also this adjustment must be done AFTER overall standard
  //  deviation is calculated, because it needs UNADJUSTED overall
  //  mean

  p = new Array();			// Create empty arrays of CDFs

  for( i = 0; i < n; i++ ) {		// Calculate initial probs
    p.push( 1.0 / Math.sqrt( 2.0 * Math.PI * Math.pow( std[ i ], 2.0 ) ) );
    p_sum += p[ i ];
  }

  m_avg = 0;				// Calculated weighted mean averages

  for( i = 0; i < n; i++ ) {		// For all ANEW terms
    m_avg += ( p[ i ] / p_sum ) * avg[ i ];
  }

  //  Build averages into a JSON result to return to caller

  res[ "avg" ] = m_avg;
  res[ "std" ] = std_avg;

  return res;
}					// End function comp_avg


function disp_tweet()

  // Debug function to display the head of the tweet list
{
  var  fmt = "";			// Formatted alert string
  var  i;				// Loop counter
  var  n;				// Number of messages to show


  if ( tw.length < 10 ) {		// Set messages to show
    n = tw.length;
  } else {
    n = 10;
  }

  fmt = "n = " + tw.length + "\n";

  for( i = 0; i < n; i++ ) {		// For all messages at head of list
    if ( i > 0 ) fmt = fmt + "\n";
    fmt = fmt + ( i + 1 ) + ". ";
    fmt = fmt + $.datepicker.formatDate( "dd-M-y", new Date( tw[ i ].time ) );
    fmt = fmt + " " + new Date( tw[ i ].time ).getHours();
    fmt = fmt + ":" + new Date( tw[ i ].time ).getMinutes();
    fmt = fmt + ", " + tw[ i ].name + ": " + tw[ i ].body;
  }

  alert( fmt );				// Display formatted list
}					// End function disp_tweet


function fmt_tip( tw_body, neg_tok )

  //  Format raw body text to highlight (in bold) terms that are
  //  recognized by ANEW
  //
  //  tw_body:  Tweet body
  //  neg_tok:  Negated tokens in raw tweet
{
  var  col;				// ANEW term color
  var  cur;				// Current word boundary
  var  i, j;				// Term index in tweet, neg token list
  var  term;				// ANEW term structure
  var  tip;				// Tip text
  var  tw_strip;                        // Stripped body
  var  word;				// Current word
  var  word_lower;			// Lower-case word


  tip = "";
  col = rgb2hex( default_txt_c() );

  tw_strip = tw_body;                   // Copy original body text

  i = 0;
  j = 0;
  cur = tw_strip.search( /[^\w']/ );	// Skip alphanumeric or apostrophe

  while( cur != -1 ) {
    word = tw_strip.substr( 0, cur );
    word_lower = word.toLowerCase();

  //  The negation list is built on the raw tweet text, but the
  //  tw_body terms have RTs, URLs, etc. stripped out, so need to walk
  //  negation list to find the current tw_body word

    j = neg_term_pos( neg_tok, word_lower, j );

    if ( neg_tok[ j ].neg ) {		// Negated term?
      term = find_neg_term( word_lower );
    } else {
      term = find_term( word_lower );	// Returns [term,stem]
    }

    if ( term != -1 ) {			// Highlight if ANEW term..
      if ( !neg_tok[ j ].neg ) {	// Not negated, so blue
        tip = tip + "<font color=\"" + col + "\"><i><b>";
      } else {				// Negated, so orange
        tip = tip + "<font color=\"#ff8500\"><i><b>";
      }
      tip = tip + word + "</b></i></font>";

    } else {				// ..otherwise just append
      tip = tip + word;
    }
    tip = tip + tw_strip.substr( cur, 1 );

    tw_strip = tw_strip.substr( cur + 1 );

    i++;				// Increment term counter
    j++;				// Increment neg token counter
    cur = tw_strip.search( /[^\w']/ );	// Skip alphanumeric or apostrophe
  }

  word = tw_strip;			// Handle last word in content
  word_lower = word.toLowerCase();

  j = neg_term_pos( neg_tok, word_lower, j );
  term = find_term( word_lower );

  if ( term != -1 ) {			// Highlight if ANEW term..
    if ( !neg_tok[ j ].neg ) {		// Not negated, so blue
      tip = tip + "<font color=\"" + col + "\"><i><b>";
    } else {				// Negated, so orange
      tip = tip + "<font color=\"#ff8500\"><i><b>";
    }
    tip = tip + word + "</b></i></font>";

  } else {				// ..otherwise just append
    tip = tip + word;
  }

  return tip;
}					// End function fmt_tip


function fmt_URL( tw_body )

  //  Format raw body text to highlight (in bold) terms that are
  //  recognized by ANEW
  //
  //  tw_body:  Tweet body
{
  var  col;				// Color for links
  var  cur;				// Current word boundary
  var  fmt;				// Formatted text
  var  pre;				// Previous word boundary
  var  tw_strip;                        // Stripped body
  var  url;				// URL string


  fmt = "";
  //col = rgb2hex( $(".ui-state-default").css( "color" ) );
  col = rgb2hex( default_txt_c() );

  tw_strip = tw_body;                   // Copy original body text

  //pre = tw_strip.search( /\b[a-z]\S*\.\S*\/\S*([a-z]|[A-Z]|[0-9])\b/ );
  pre = tw_strip.search( url_beg );

  while( pre != -1 ) {			// While URL found
    fmt = fmt + tw_strip.substr( 0, pre );
    tw_strip = tw_strip.substr( pre );

    //cur = tw_strip.search( /\s/ );	// Search for end of URL
    //cur = tw_strip.search( /[^A-Za-z0-9./;:@&=?]/ );
    cur = tw_strip.search( url_end );

    if ( cur == -1 ) {			// URL ends tweet text?
      url = tw_strip;
      tw_strip = "";
    } else {				// Tweet text follows URL
      url = tw_strip.substr( 0, cur );
      tw_strip = tw_strip.substr( cur );
    }

  //  Add anchor around URL string, search for next URL

    fmt = fmt + "<a href=\"" + url + "\" ";
    fmt = fmt + "style=\"color: " + col + "\" target=\"_blank\">";
    fmt = fmt + url + "</a>";
    //pre = tw_strip.search( /\b[a-z]\S*\.\S*\/\S*([a-z]|[A-Z]|[0-9])\b/ );
    pre = tw_strip.search( url_beg );
  }

  fmt = fmt + tw_strip;			// Add any remaining tweet text
  return fmt;
}					// End function fmt_URL


function match_tweet( tw_body )

  //  Check to see if a matching (repeated) tweet already exists in
  //  tweet array
  //
  //  tw_body:  New tweet's body
{
  var  i;				// Loop counter


  for( i = 0; i < tw.length; i++ ) {	// For all tweets
    if ( tw[ i ].body == tw_body ) {	// Stripped tweet bodies match?
      return i;				// Return index of match
    }
  }

  return -1;				// Return no match
}					// End function match


function neg_term_pos( neg_tok, term, j )

  //  Search the negation list from a certain position forward for a
  //  given term; return index of term, or last term in list if not
  //  found
  //
  //  neg_tok:  Neg token list
  //  term:     Term to find
  //  j:        Position to start searching from
{
  while( j < neg_tok.length ) {		// Search negation list for word
    if ( neg_tok[ j ].term == term ) {
      return j;
    }
    j++;
  }

  console.log( "neg_term_pos(), negation list incorrectly exceeded" );
  return neg_tok.length - 1;
}					// End function neg_term_pos


function process_anew( tw_body, neg_tok )

  //  Process ANEW words in tweet body
  //
  //  Note: You might think we should use tw_term, the tweet's term
  //  list, rather than re-splitting and processing tw_body, BUT when
  //  process_anew() is called, tw_term isn't built yet, and it's
  //  faster to do this and exit if too few ANEW terms are found,
  //  versus building tw_term first then using it here
  //
  //  tw_body:  Tweet body
  //  neg_tok:  Negated tokens in raw tweet
{
  var  a_avg;				// Arousal average
  var  a_std;				// Arousal standard deviation
  var  anew_term = [ ];			// ANEW terms in tweet body
  var  anew_term_n = 0;			// Number of ANEW terms
  var  body;				// Tweet body w/o apostrophe quotes
  var  happiness_term = [ ];		// Happiness terms in tweet body
  var  happiness_term_n = 0;		// Number of happiness terms
  var  i;				// Loop counter
  var  j;				// Position in negation list
  var  term;				// ANEW term structure
  var  tok;				// Tokens in tweet body
  var  word;				// Current word


  tok = tw_body.toLowerCase().split( /[^\w']/ );

  // For all tokens, i indexes into body token list, j indexes into
  // negated token list

  for( i = 0, j = 0; i < tok.length; i++, j++ ) {
    if ( tok[ i ].length == 0 ) {	// Skip empty tokens
      continue;
    }

    word = tok[ i ].toLowerCase();

  //  The negation list is built on the raw tweet text, but the
  //  tw_body terms have RTs, URLs, etc. stripped out, so need to walk
  //  negation list to find the current tw_body word

    j = neg_term_pos( neg_tok, word, j );

    if ( j >= neg_tok.length ) {	// Somehow walked out of neg list?
      console.log( "process_anew(), negation list incorrectly exceeded" );
      term = find_term( word );
    } else if ( neg_tok[ j ].neg ) {	// Term negated?
      term = find_neg_term( word );
    } else {				// Term not negated
      term = find_term( word );
    }

    if ( term != -1 ) {			// Save term
      anew_term.push( term );
    }
  }

  return anew_term;			// Return array of ANEW terms
}					// End function process_anew


function query_twitter_v_1_0( term, pg_tot )

  //  Query twitter for recent tweets by keyword (old v1.0 code)
  //
  //  term:    Term keyword(s) to query (concatenated with "+")
  //  pg_tot:  Pages to request (max 15)
{
  if ( term.length == 0 ) {		// Empty term?
    $("#query-inp").focus();
    return;
  }

  $.ajaxSetup( { timeout: 5000 } );	// Set 5-second timeout on HTTP get

  //  Ensure requested pages is 1..15

  if ( typeof pg_tot == "undefined" || pg_tot < 1 ) {
    pg_req = 1;
  } else if ( pg_tot > 15 ) {
    pg_req = 15;
  } else {
    pg_req = pg_tot;
  }

  query_dlg().dialog( "open" );		// Init, show progress dialog
  query_dlg_title( "Query Tweets" );
  query_dlg_msg( "Loading tweets from Twitter..." );

  $( "#prog-bar" ).progressbar( "value", 0 );

  tw.length = 0;			// Clear array's contents
  query_term = term;			// Save current query term

  pg = 1;				// Start on first page
  retrieve_page_v_1_0();		// Queue pages
}					// End function query_twitter_v_1_0


function query_twitter_v_1_1( term, pg_tot )

  //  Query twitter for recent tweets by keyword using version 1.1 of
  //  the API, which requires authentication and persistent connection
  //  to Twitter via a PHP helper file
  //
  //  term:    Term keyword(s) to query (concatenated with "+")
  //  pg_tot:  Pages to request (max 10)
{
  if ( term.length == 0 ) {		// Empty term?
    $("#query-inp").focus();
    return;
  }

  if ( term == "fb" ) {			// Special "facebook" query
    fb_load_news();
    return;
  }

  $.ajaxSetup( { timeout: 30000 } );	// Set 30-second timeout on HTTP get

  //  Ensure requested pages is 1..max_pg

  if ( typeof pg_tot == "undefined" || pg_tot < 1 ) {
    pg_req = 1;
  } else if ( pg_tot >= max_pg ) {
    pg_req = max_pg;
  } else {
    pg_req = Math.ceil( pg_tot / float( block_sz ) ) * int( block_sz );
  }

  query_dlg().dialog( "open" );		// Init, show progress dialog
  query_dlg_title( "查询中" );
  query_dlg_msg( "正在生成结果，请稍候..." );

  $( "#prog-bar" ).progressbar( "value", 0 );

  tw.length = 0;			// Clear array's contents
  query_term = term;			// Save current query term

  max_id = -1;				// No initial maximum tweet ID

  pg = 0;				// No pages retrieved
  retrieve_page_v_1_1();		// Queue pages
}					// End function query_twitter_v_1_1


function retrieve_page_v_1_0()

  //  Retrieve a block of pages from Twitter's search API (old v1.0
  //  code)
{
  var  block_sz = 5;			// Block size, in pages
  var  i;				// Loop counter
  var  term;				// Term w/proper encoding
  var  url;				// URL query string


  //  Replace hashtag with %23 to make query term valid

  term = query_term.replace( /\#/g, "%23" );

  //  We ask for pages in blocks, because getJSON runs in parallel,
  //  so, e.g., 3 blocks of 5 pages is 5x faster than 15 separate
  //  requests; We do blocks rather than all pages at once so we can
  //  show progress in the progress dialog's progressbar

  req = block_sz;			// Set pages in block
  req_comp = 0;

  for( i = 0; i < block_sz; i++ ) {	// Retrieve block of pages
    url = "http://search.twitter.com/search.json?callback=?&";
    url = url + "lang=en&";
    url = url + "rpp=100&";
    url = url + "result_type=recent&";
    url = url + "page=" + ( pg + i ) + "&q=" + term; 

    $.getJSON( url )			// Send query to twitter

    //  Parse text on successful query 

    .success( function( data, status, jqXHR ) {
      var  i;				// Loop counters
      var  tw_obj;			// JSON tweet object


    //  Occasionally no data is returned due to a timeout, and the
    //  error condition is not properly triggered, so catch it here

      if ( typeof data == "undefined" ) {

      } else if ( typeof data.results == "undefined" ) {
        if ( data.hasOwnProperty( "error" ) &&
             data.error.indexOf( "rate limit" ) != -1 ) {
          alert( "Twitter is temporarily blocking the application because of too many recent queries. Wait 30 seconds, then try your query again." );
        }

        console.log( "getJSON returns undefined data, suspect rate limit" );
        console.log( data );

      } else {				// Data returned successfully
        for( i = 0; i < data.results.length; i++ ) {
          tw_obj = build_tweet_obj(
            data.results[ i ].text,
            data.results[ i ].from_user,
            data.results[ i ].created_at,
            data.results[ i ].coordinates,
            "http://twitter.com/" + data.results[ i ].from_user );

          if ( typeof tw_obj !== "undefined" ) {
            tw.push( tw_obj );
          }
	} 
      }					// End if data returned successfully

      pg++;				// Update total pages retrieved
      req_comp++;			// Update pages in block retrieved

    //  If block complete or all pages retrieved, either queue another
    //  block or draw tweets

      if ( req_comp == req || pg > pg_req ) {
        $("#prog-bar" ).progressbar( "option", "value", pg / 15 * 100 );

        if ( pg > pg_req ) {		// Requested pages retrieved?
          setTimeout( "update_load()", 100 );
        } else {			// Otherwise queue another block
          setTimeout( "retrieve_page_v_1_0()", 100 );
        }
      }
    } )

    //  Catch and ignore timeouts, report other errors

    .error( function( jqXHR, status, err ) {
      if ( err != "timeout" ) {
        console.log( "Error during tweet query\nError: " + err );
      }

      pg++;				// Update total pages retrieved
      req_comp++;			// Update pages in block retrieved

    //  If block complete or all pages retrieved, either queue another
    //  block or draw tweets

      if ( req_comp == req || pg > pg_req ) {
        $("#prog-bar" ).progressbar( "option", "value", pg / 15 * 100 );

        if ( pg > pg_req ) {		// Requested pages retrieved?
          setTimeout( "update_load()", 100 );
        } else {			// Otherwise queue another block
          setTimeout( "retrieve_page_v_1_0()", 100 );
        }
      }
    } );
  }
}					// End function retrieve_page_v_1_0


function retrieve_page_v_1_1()

  //  Retrieve a block of pages from Twitter's v1.1 search API
{
  var  err_msg;				// Summary meesage on error
  var  exp_msg;				// Explanatory message on error
  var  i;				// Loop counter
  var  term;				// Term w/proper encoding
  var  url;				// URL query string


  //  Replace hashtag with %23 to make query term valid

  term = query_term.replace( /\#/g, "%23" );

  //  We ask for pages in blocks, because getJSON runs in parallel,
  //  so, e.g., 3 blocks of 5 pages is 5x faster than 15 separate
  //  requests; We do blocks rather than all pages at once so we can
  //  show progress in the progress dialog's progressbar

  req = block_sz;			// Set pages in block
  req_comp = 0;

  url = PHP_URL() + "recent.php?callback=?";
  url = url + "&q=" + term;
  url = url + "&pg=" + block_sz;

  if ( max_id != -1 ) {
    url = url + "&max_id=" + max_id;
  }

  $.ajax( {				// Post query to PHP server
    url: url,
    dataType: "jsonp",

  //  Parse text on successful query 

    success: function( data ) {
      var  i;				// Loop counters
      var  tw_obj;			// JSON tweet object

    //  Occasionally no data is returned due to a timeout, and the
    //  error condition is not properly triggered, so catch it here

      //if ( typeof data == "undefined" || max_id == -2 ) {
      if ( typeof data == "undefined" ) {
        console.log( "getJSON returns undefined data" );
        console.log( data );

        //err_msg = "Twitter rate limit";
        //exp_msg = "Twitter has rate limited the application, please try ";
        //exp_msg += "your query again in a few minutes";

	//show_alert_dlg( err_msg, exp_msg );

      } else if ( data.http_code == 429 ) {
        console.log( "getJSON returns rate limit reached" );
        console.log( data );

        err_msg = "Twitter rate limit";
        exp_msg = "Twitter has rate limited the application, please try ";
        exp_msg += "your query again in a few minutes";

	show_alert_dlg( err_msg, exp_msg );

	//  Ensure after exiting conditional pg will be set to pg_req,
	//  forcing an update_load() to process any data received

        pg = pg_req - block_sz;

      } else {				// Data returned successfully
        max_id = data.max_id;

        for( i = 0; i < data.tw.length; i++ ) {

    //  Strangely, twitter occasionally returns tweets with an
    //  undefined user...

          if ( typeof data.tw[ i ].user == "undefined" ) {
            continue;
          }

          tw_obj = build_tweet_obj(
            data.tw[ i ].text,
            data.tw[ i ].user.screen_name,
            data.tw[ i ].created_at,
            data.tw[ i ].coordinates,
            "http://twitter.com/" + data.tw[ i ].user.screen_name );

          if ( typeof tw_obj !== "undefined" ) {
            tw.push( tw_obj );
          } 
        }				// End for all tweets
      }					// End if data returned successfully

      pg += block_sz;			// Update total pages retrieved
      $("#prog-bar" ).progressbar( "option", "value", pg / pg_req * 75 );

      if ( pg >= pg_req ) {		// Requested pages retrieved?
        setTimeout( "update_load()", 100 );
      } else {				// Otherwise queue another block
        setTimeout( "retrieve_page_v_1_1()", 100 );
      }
    },
    
  //  Catch and ignore timeouts, report other errors

    error: function( jqXHR, status, err ) {
      if ( err != "timeout" ) {
        console.log( "Error during tweet v1.1 query\nError: " + err );
      } 

      pg += block_sz;			// Update total pages retrieved
      $("#prog-bar" ).progressbar( "option", "value", pg / pg_req * 75 );

      if ( pg >= pg_req ) {		// Requested pages retrieved?
        setTimeout( "update_load()", 100 );
      } else {				// Otherwise queue another block
        setTimeout( "retrieve_page_v_1_1()", 100 );
      }
    }
  } );
}					// End function retrieve_page_v_1_1


function rgb2hex( rgb )

  //  Convert "rgb(r,g,b)" to "#rrggbb"
  //
  //  rgb:  RGB string to convert
{
  var  hex = "#";			// Hex result


  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  hex = hex + ( "0" + parseInt( rgb[ 1 ] ).toString( 16 ) ).slice( -2 );
  hex = hex + ( "0" + parseInt( rgb[ 2 ] ).toString( 16 ) ).slice( -2 );
  hex = hex + ( "0" + parseInt( rgb[ 3 ] ).toString( 16 ) ).slice( -2 );

  return hex;
}					// End function rgb2hex


function strip_body( tw_body )

  //  Strip extraneous text from tweet body
  //
  //  tw_body:  Tweet body
{
  var  beg;                             // Beginning of extraneous text
  var  end;                             // End of extraneous text
  var  tw_strip;                        // Stripped body


  tw_strip = tw_body;                   // Copy original body text

  //  Strip re-tweet header text, search for first non-whitespace
  //  character after "RT @..." text

  while( tw_strip.search( /RT\s*@/ ) == 0 ) {
    beg = tw_strip.indexOf( "@" );
    beg = beg + 1 + tw_strip.substr( beg + 1 ).search( /\s/ );
    beg = beg + 1 + tw_strip.substr( beg + 1 ).search( /\S/ );

    tw_strip = tw_strip.substr( beg );
  }

  //  Strip out any URLs

  //beg = tw_strip.search( /\b\S*\.\S*\/\S*\b/ );
  beg = tw_strip.search( url_beg );
  while( beg != -1 ) {                  // URL detected?
    //end = tw_strip.substr( beg ).search( /\s/ );
    end = tw_strip.substr( beg ).search( url_end );

    if ( end == -1 ) {                  // URL ends string?
      tw_strip = tw_strip.substr( 0, beg );
    } else {                            // URL interior to string
      tw_strip = tw_strip.substr( 0, beg ) + tw_strip.substr( beg + end + 1 );
    }

    //beg = tw_strip.search( /\b\S*\.\S*\/\S*\b/ );
    beg = tw_strip.search( url_beg );
  }

  return tw_strip;
}                                       // End function strip_body


function update_load()

  //  Update various data structures after the tweet array has been
  //  populated from the preceeding parse_data() function
{
  update_tfidf();			// Cluster tweets
  update_heatmap_hist();		// Update heatmap term fq histogram
  update_tag_term( 20 );		// Update tag cloud term list
  update_timeline();			// Update timeline graph
  update_map();				// Update tweet map
  update_affinity();			// Update affinity graph
  update_narrative();			// Update narrative threads
  update_tw_list();			// Update tweet listing

  uniq_update();			// Update any project-specific tabs

  draw_tweet();				// Draw sentiment scatterplot
  draw_topic();				// Draw topic clusters
  draw_heatmap();			// Draw heatmap

  update_zoom_dlg();			// Update zoom dialog, if req'd

  query_dlg().dialog( "close" );	// Hide progress dialog
}					// End update_load

//  Regex's for start and end of a URL, which are like "http://...",
//  or "bit.ly/..."; we assume a word starting with an optional
//  http://, then 1 or more alphanumerics, a period (.), then ending with
//  a slash (/) is the start of a URL, and the URL ends with a character
//  not alphanumeric or allowed special \.;:@&=?
//
//  url_beg and url_end at defined at the end of this file because
//  having a slash causes emacs's colour formatting to get out of
//  whack

var  url_beg = /\b(http[s]*:\/\/|)[A-Za-z0-9]+\.[A-Za-z0-9.]*\//;
var  url_end = /[^A-Za-z0-9./;:@&=?]/;

//  url_tag matches full URL from beginning to end

var  url_tag =
       /\b(http[s]*:\/\/|)[A-Za-z]+\.[A-Za-z0-9.]*\/[A-Za-z0-9./;:@&=?]+/g;
