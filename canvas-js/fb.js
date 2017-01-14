/*- FB.JS ------------------------------------------------------------------*/
/*    Dialog to load wall posts from Facebook				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  22-Apr-13	Christopher G. Healey	Initial implementation		    */
/*  09-Feb-14	Christopher G. Healey	Converted flat-file load_dlg.js	    */
/*  14-Feb-14	Christopher G. Healey	Converted load-dlg.js		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  fb_data = [ ];			// Current Facebook wall data array
var  post_max = 750;			// Maximum posts allowed to visualize


function add_fb_data( resp )

  //  Add an array data returned from Facebook to the news feed array
  //
  //  resp:  Facebook query response
{
  var  pct;				// Percentage of max posts loaded
  var  pos;				// Pos of last index ID in response
  var  q;				// Query for next block of posts


  if ( resp.error ) {
    console.log( "add_fb_data(), error returned from Facebook graph API" );
    return;
  }

  fb_data = fb_data.concat( resp.data );

  if ( fb_data.length < post_max &&	// More data to pull?
       resp.hasOwnProperty( "paging" ) &&
       resp.paging.hasOwnProperty( "next" ) ) {
    pos = resp.paging.next.lastIndexOf( "until=" ) + 6;
    q = "/me/home?until=" + resp.paging.next.substr( pos ) + "&limit=250";

    pct = Math.ceil( fb_data.length / post_max * 75.0 );
    $("#prog-bar").progressbar( "option", "value", pct );

    setTimeout( FB.api, 100, q, add_fb_data );

  } else {				// Process all data pulled
    $("#prog-bar").progressbar( "value", 75 );
    setTimeout( process_fb_posts, 100, fb_data );
  }
}					// End function add_fb_data


function fb_auth_change( resp )

  //  Callback when Facebook login status changes
{
  if ( resp.hasOwnProperty( "status" ) ) {
    console.log( "Facebook status: " + resp.status );
  } else {
    console.log( "Facebook status: undefined" );
  }
}					// End function fb_auth_change


function fb_init_sdk()

  //  Initialize Facebook Javascript SDK
{
  //  Load Facebook SDK asynchronously

  (function( d, s, id ) {
    var js;
    var fjs = d.getElementsByTagName(s)[ 0 ];

    if ( d.getElementById( id ) )
      return;

    js = d.createElement( s );
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore( js, fjs );
  }( document, 'script', 'facebook-jssdk' ) );

  window.fbAsyncInit = function() {
    FB.init( { 
      appId: '216418078561602',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.2'
    } );
  };

  $("#fb-btn").click( function() {	// Click handler for FB button
    var  resp;				// Facebook authorization response
    var  status;			// Current Facebook login status

    if ( !window.FB ) {			// Facebook SDK not loaded?
      return;
    }

    FB.getLoginStatus( function( resp ) {
      status = fb_status_change( resp );

      if ( status == "connected" ) {	// User logged into FB and app
        FB.logout( function( resp ) {
          $("#fb-btn").hide();
          console.log( "Facebook logout" );
        } );

      //  Connected to FB, app not authorized

      } else if ( status == "no_auth" ) {
        $("#fb-btn").hide();		// Ensure logout button hidden
        console.log( "Facebook button click w/o authorization" );

      } else if ( status == "no_FB" ) {	// Not connected to FB
        FB.login( function( resp ) {
          status = fb_status_change( resp );

          if ( status != "connected" ) {
            $("#fb-btn").hide();	// Ensure logout button hidden
            console.log( "Facebook button click with no FB login" );
          }
        } )
      }
    });
  });

  $("#fb-btn").hide();			// Initially hide Facebook button
}					// End function fb_init_sdk


function fb_load_news()

  //  A request to load news posts from a Facebook user's wall
{
  //  If Facebook SDK not loaded, set a callback to this function,
  //  then ask to load the SDK (asynchronously)

  if ( !window.FB ) {
    window.fbAsyncInit = fb_load_news;
    fb_init_sdk();
    return;
  }

  FB.getLoginStatus( function( resp ) {
    if ( resp.status == "connected" ) {
      fb_login( resp );
    } else {
      console.log( "fb_load_news(), not connected/authorized" );
      //FB.login( fb_login, { scope: 'read_stream' } );
    }
  }, true );
}					// End function fb_load_news


function fb_login( resp )

  //  After login, query to retrieve user name and initiate pulling
  //  news posts
  //
  //  resp:  Response to FB.login
{
  if ( resp.status != "connected" ) {
    console.log( "fb_login(), login/authorization failed or was cancelled" );
    return;
  }

  FB.api( "/me", fb_set_user );		// Get username
}					// End function fb_login


function fb_set_user( resp )

  //  Receive information about the user, then initiate a pull of the
  //  user's news feed posts
  //
  //  resp:  Response to "/me" API query
{
  if ( resp.hasOwnProperty( "name" ) ) {
    query_term = resp.name;		// User's name as query term
  } else {
    query_term = "Unknown";
  }

  tw.length = 0;			// Clear existing tweets
  fb_data = [ ];			// Empty news post array

  query_dlg().dialog( "open" );		// Initialize progress bar
  query_dlg_title( "Query Facebook" );
  query_dlg_msg( "Loading news feed posts..." );

  $("#prog-bar").progressbar( "value", 0 );

  FB.api( "/me/home?limit=250", add_fb_data );
}					// End function fb_set_user


function fb_status_change( resp )

  //  Callback to handle results of FB.getLoginStatus()
  //
  //  resp:  Response variable
{
  console.log( "fb_status_change:" );
  console.log( resp );

  if ( resp.status == "connected" ) {	// Logged into FB and app
    return "connected";

  } else if ( resp.status == "not_authorized" ) {

    //  Logged into FB, but not into app

    console.log( "Logged into FB, but app not authorized" );
    return "no_auth";

  } else {

    //  Not logged into FB

    console.log( "Not logged into FB" );
    return "no_FB";
  }
}					// End function fb_status_change
    

function parse_fb_post( post )

  //  This function parses a post (e.g. news item or comment)
  //
  //  post:  Post to parse
{
  var  body;				// Post body
  var  dt;				// Formatted creation date
  var  geo;				// Post geolocation
  var  link;				// Optional link in post
  var  mth;				// Month
  var  mth_str = [			// Short month strings
         "Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
       ];


  //  Check for message, then description, then story, to use as the
  //  body of the post

  if ( post == undefined ) {
    console.log( "parse_fb_post(), undefined post seen" );
    return false;
  }

  if ( post.hasOwnProperty( "message" ) ) {
    body = post.message;
  } else if ( post.hasOwnProperty( "description" ) ) {
    body = post.description;
  } else if ( post.hasOwnProperty( "story" ) ) {
    body = post.story;
  } else {
    return false;
  }

  //  Check for optional geolocation

  if ( post.hasOwnProperty( "place" ) &&
       post.place.hasOwnProperty( "location" ) &&
       post.place.location.hasOwnProperty( "latitude" ) &&
       post.place.location.hasOwnProperty( "longitude" ) ) {
    geo = { "coordinates":
            [ post.place.location.longitude, post.place.location.latitude ] };
  } else {
    geo = null;
  }

  //  Check for optional link

  if ( post.hasOwnProperty( "link" ) ) {
    link = post.link;
  } else {
    link = null;
  }

  //  Twitter formats dates as "Mon May 03 17:21:00 +0000 2013", so
  //  convert Facebook format of "2014-02-14T1:05:45+0000" to "Feb 14
  //  1:05:45 +0000 2014" which seems to work OK

  dt = post.created_time.substr( 5 ) + " " + post.created_time.substr( 0, 4 );
  dt = dt.replace( "T", " " );
  dt = dt.replace( "+", " +" );

  mth = parseInt( dt.substr( 0, 2 ) );
  dt = mth_str[ mth - 1 ] + " " + dt.substr( 3 );

  return {
    "body": body, "from": post.from.name, "date": dt, "geo": geo, "link": link
  };
}					// End parse_fb_post


function process_fb_posts( news )

  //  This function processes news feed posts loaded from Facebook
  //
  //  news:  News posts from Facebook's graph API
{
  var  auth;				// Post author
  var  i, j;				// Loop counters
  var  post;				// Formatted data from post
  var  post_n = 0;			// Number of posts plus comments loaded
  var  tw_max;				// Maximum posts to load
  var  tw_n = 0;			// Number of posts loaded
  var  tw_obj;				// Current tweet object


  console.log( "process_fb_posts(), total posts pre-filter: " + news.length );
  tw_max = 1000;

  //  Process until end of list, or maximum allowed tweets pushed

  for( i = 0; i < news.length && tw_n < tw_max; i++ ) {
    if ( ( post = parse_fb_post( news[ i ] ) ) != false ) {
      post_n++;

      tw_obj = build_tweet_obj(
        post.body, post.from, post.date, post.geo, post.link, false );

      if ( typeof tw_obj !== "undefined" ) {
        tw.push( tw_obj );
        tw_n++;
      } 				// End if post had sentiment
    }					// End if post was parsable

  //  Continue if no comments to process

    if ( news[ i ] == undefined ) {
      continue;
    }

    if ( !news[ i ].hasOwnProperty( "comments" ) ||
         !news[ i ].comments.hasOwnProperty( "data" ) ) {
      continue;
    }

    auth = "(&#8618; " + post.from + ")";

    for( j = 0; j < news[ i ].comments.data.length; j++ ) {
      if (( post = parse_fb_post( news[ i ].comments.data[ j ] )) != false ) {
        post_n++;

        tw_obj = build_tweet_obj( auth + " " + post.body,
                   post.from, post.date, post.geo, post.link, false );

        if ( typeof tw_obj !== "undefined" ) {
          tw.push( tw_obj );
          tw_n++;
        } 				// End if comment had sentiment
      }					// End if comment was parsable
    }					// End for all comments
  }					// End for all tweets

  query_dlg().dialog( "close" );

  msg = "Sentiment estimated on " + tw.length + " posts";
  exp = "A total of " + post_n + " news feed posts and comments were read. ";
  exp = exp + "Of those, " + tw.length + " posts had two or more recognized ";
  exp = exp + "terms, allowing for an estimate of their sentiment.";

  show_alert_dlg( msg, exp );
  update_load();

  $("#fb-btn").show();			// Show Facebook button since logged in
}					// End function process_fb_posts
