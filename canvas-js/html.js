/*--------------------------------------------------------------------------*/
/*  HTML.JS								    */
/*    Routines to initiate the Twitter sentiment app (so a mainline, in a   */
/*    sense)
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/


$(document).ready( function() {
  var  q;				// Query string on URL
  var  script;				// Google maps API script
  var  src;				// Google maps API script source URL


//  Stub out console.log() calls, if the function doesn't exist (IE!)

  if ( !window.console ) window.console = { };
  if ( !window.console.log ) window.console.log = function() { };

//  Set the label on the query button, and set it to trigger on click,
//  NB, this also "initializes" .ui-state-default, which is needed
//  later in this script (so do this step first)

  $("#query-btn").button( { label: "查询" } );
  $("#query-btn").click( function() {
    var  resp;				// Facebook authorization response

  //  If we see an "fb" query, assume we want to query the user's
  //  Facebook news feed, this has to be done in click() otherwise the
  //  login popup is likely to be blocked

    if ( $("#query-inp").val() == "fb" ) {
      $("#query-inp").val( "" );	// Clear special input

      if ( !window.FB ) {		// Facebook API not loaded?
        console.log( "Facebook pull requested but API not loaded" );
        return;
      }

      FB.Event.subscribe( 'auth.statusChange', fb_auth_change );

      resp = FB.getAuthResponse();
      if ( resp != null ) {		// Already authorized
        fb_load_news();
      } else {				// Must login and/or authorize
        FB.login( fb_load_news, { scope: 'read_stream' } );
      }

    } else {				// Regular Twitter query
      //query_twitter( document.getElementById( "query-inp" ).value, 15 );
      query_twitter_v_1_1( document.getElementById( "query-inp" ).value, 15 );
    }
  } );

//  Grab the default text colour, so it can be used elsewhere, even if
//  jQuery changes it, we do this IMMEDIATELY AFTER the first jQuery
//  call to setup the colour

  default_txt_c( $(".ui-state-default").css( "color" ) );

//  Set the icon on the zoom button, and set it to trigger on click,
//  NB, it's CRITICAL that text "Zoom In" is in HTML between
//  <button></button> tags, because that sets button's width and
//  height; the text flag disables DRAWING text in the button

  $("#zoom-btn").button( {
    icons: {
      primary: "ui-icon-zoomin"
    },
    text: false
  } );

  $("#zoom-btn").click( function() {
    if ( zoom_dlg().dialog( "isOpen" ) ) {
      hide_zoom_dlg();
    } else {
      show_zoom_dlg();
    }
  } );

//  Register callbacks to track which tab is active, and to resize a
//  tab's content (and hide or show the zoom button) when tab is shown
//  or window is resized

  $("#canvas-tab").tabs( {
    active: 0,
    beforeActivate: function( e, ui ) {
      tab_ID( ui.newTab.index() );
    },
    activate: function( e, ui ) {
      switch( tab_ID() ) {		// Control display of zoom button
      case 0:				// Tweet canvas
      case 1:				// Topic canvas
        $("#zoom-btn").show();
        break;
      default:				// All other tabs
        $("#zoom-btn").hide();
        break;
      }

      resize_canvas();
      update_zoom_dlg();
    }
  } );

  $(window).resize( function() {
    resize_canvas();
    update_zoom_dlg();
  } );

//  Sentiment tab is active (above) when tabs created, but we still
//  need to explicitly update the tab ID and the tab's width/height

  tab_ID( 0 );
  resize_canvas();

//  Set the "Keyword:" label to have the same font and colour as the
//  "Query" button

  style_txt( "#query-lbl" );

//  Set the query input field to trigger on Return

  $("#query-inp").keydown( function( e ) {
    if ( ( e.keyCode == 13 ) ) {
      //query_twitter( document.getElementById( "query-inp" ).value, 15 );
      query_twitter_v_1_1( document.getElementById( "query-inp" ).value, 15 );

      e.stopPropagation();		// Don't propagate keypress up
      return false;			// Stop IE event bubbling
    }
  } );

//  Set a qtip tooltip to provide instructions when the user mouses
//  over the query input field, and focus on the field

  $("#query-inp").qtip( {
    content: "Choose one or more keywords to query from Twitter\'s recent tweet stream",
    show: { delay: 665 },
    position: { my: "bottom left", at: "top right" },
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );
  $("#query-inp").focus();

//  Set a qtip tooltip to provide instructions when the user mouses
//  over the visualization legend

  $("#tweet-legend").qtip( {
    content: "Pleasant tweets are green, and unpleasant tweets are blue. Larger or more opaque tweets represent more confident sentiment estimates, while smaller or more transparent tweets represent less confident estimates.",
    show: { delay: 665 },
    position: { my: "center left", at: "center right" },
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  $("#topic-legend").qtip( {
    content: "Pleasant tweets are green, and unpleasant tweets are blue. Larger or more opaque tweets represent more confident sentiment estimates, while smaller or more transparent tweets represent less confident estimates.",
    show: { delay: 665 },
    position: { my: "center left", at: "center right" },
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

  $("#heatmap-legend").qtip( {
    content: "Grid cells with more than an average number of tweets are red, and cells with less than an average number of tweets are blue. Grid cells with no ttweets are white.",
    show: { delay: 665 },
    position: { my: "center left", at: "center right" },
    style: { classes: "qtip-blue qtip-shadow qtip-rounded" }
  } );

//  Track mouse focus on the sentiment and topic canvases, to diallow
//  tooltips if the canvas doesn't have focus

  $("#tweet-canvas").hover(
    function() {			// Mouse in function
      tweet_focus( true );
    },
    function() {			// Mouse out function
      tweet_focus( false );
    }
  );

  $("#topic-canvas").hover(
    function() {			// Mouse in function
      topic_focus( true );
    },
    function() {			// Mouse out function
      topic_focus( false );
    }
  );

//  Enable jQuery's active counter on the number of pending AJAX
//  requests

  jQuery.ajaxPrefilter( function( options ) {
    options.global = true;
  } );

//  - Ctrl+B (hidden) shortcut to import Facebook news feed posts
//  - Ctrl+E (hidden) shortcut to export tweets to a CSV file
//  - Ctrl+I (hidden) shortcut to import Linkedin status
//  - Ctrl+U (hidden) shortcut to import tweets from external URL

  $(document).keydown( function( e ) {
    if ( e.ctrlKey &&
         ( e.which == 66 ||		// Ctrl+B, Facebook
           e.which == 69 ||		// Ctrl+E, export
           //e.which == 73 ||		// Ctrl+I, LinkedIn
           e.which == 85 ) ) {		// Ctrl+U, upload
      e.preventDefault();		// Don't propegate event

      if ( e.which == 66 )  {		// Import news posts from Facebook

  //  Unfortunately, to avoid popup blocking, we need to kick off a
  //  Facebook login in a click() function, so we load the query field
  //  with a special "fb" query, then invoke the field's click handler

        $("#query-inp").val( "fb" );
        $("#query-btn").click();

      } else if ( e.which == 69 ) {	// Export tweets to CSV file
        export_tweets_CSV();
/*
      } else if ( e.which == 73 ) {	// Import status from LinkedIn
        if ( !IN.User.isAuthorized() ) {
          IN.User.authorize( linkedin_load );
        } else {
          linkedin_load();
        }
*/
      } else if ( e.which == 85 ) {	// Import tweets from URL file
        import_data();
      }

      return false;			// Don't propegate event
    }
  } );

  init_tweet();				// Initialize scatterplot
  init_topic();				// Initialize topic clusters
  init_heatmap();			// Initialize heatmap
  init_cloud();				// Initialize tag cloud
  init_timeline();			// Initialize timeline
  init_affinity();			// Initialize affinity graph
  init_narrative();			// Initialize narrative threads
  init_tw_list();			// Initialize tweet table listing

  //  Note: Because of how Google maps work, we defer init_map() until
  //  the first time the tab is shown, this is caught in resize_map()

  init_alert_dlg();			// Initialize alert dialog
  init_progress_dlg();			// Initialize progress dialog
  init_zoom_dlg();			// Initialize zoom dialog

  fb_init_sdk();			// Initialize Facebook Javascript SDK

  draw_legend();			// Draw sentiment tab's legend
  draw_tweet();				// Draw sentiment tab's axes

  uniq_init();				// Perform project-specific inits


  //  Load Google maps API programatically, done this way so we can
  //  have a variable API key (set in config.js)

  //  For some reason, if you don't have a callback in the request,
  //  the load doesn't complete, so it's included, even though we
  //  don't do anything in the callback

  src = "https://maps.googleapis.com/maps/api/js?v=3&key=";
  src = src + Google_maps_key + "&callback=map_cb";

  script = document.createElement( "script" );
  script.type = "text/javascript";
  script.src = src;

  document.body.appendChild( script );

  //  Check if the user entered a ?q=query-string at the end of the
  //  URL, if so, do an initial query on the given term(s)

  q = decodeURIComponent( window.location.search );
  if ( q.indexOf( "?q=" ) == 0 ) {	// Query string provided on URL?
    query_twitter_v_1_1( q.substring( 3 ), 15 );
  }
} );
