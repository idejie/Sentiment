/*--------------------------------------------------------------------------*/
/*  MAP.JS								    */
/*    Routines to display tweets with geo tags on a Goole map		    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  25-Apr-13	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  circ_mark = [ ];			// { marker, tw_ID }
var  load_listener;			// Tiles loaded listener
var  map = null;			// Google map
var  mark_n;				// Number of markers


function init_map()

  //  Initialize the Google map

{
  var  mapOptions = {			// Google map options
    zoom: uniq_map_zoom(),		//  Zoom level
    center:				//  Geograpic center of continential US
      new google.maps.LatLng( uniq_map_latlng()[ 0 ], uniq_map_latlng()[ 1 ] ),
    mapTypeControlOptions: {		//  Map type buttons on map
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.TERRAIN,
        google.maps.MapTypeId.SATELLITE
      ],
      position:				// Control top-left of map
        google.maps.ControlPosition.TOP_LEFT,
      style:				// Dropdown control menu
        google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    mapTypeId:				//  Road map
      google.maps.MapTypeId.ROADMAP,
    panControl: false
  };
  var  mark;				// Current map marker
  var  reset_btn;			// Reset button to place on map
  var  reset_div;			// div to hold reset button


  map =					// Create map
   new google.maps.Map( document.getElementById( "map-div" ), mapOptions );

  //  Add listener to fire when the tiles are loaded, needed to style
  //  the reset button, since it's not in DOM until map is setup

  load_listener = google.maps.event.addListener(
                    map, "tilesloaded", function() { map_tiles_loaded(); } );

  map.set( "styles", [
    {
      featureType: "landscape",		// Simplified, white landscape
      elementType: "geometry",
      stylers: [ {
        color: "#ffffff",
        visibility: "simplified"
      } ]
    },

  //  Turn off all administrative features, then selectively turn some
  //  text and boundaries back on

    {
      featureType: "administrative",
      elementType: "all",
      stylers: [ {
        visibility: "off",
      } ]
    },
    {
      featureType:			// Restore country names
        "administrative.country",
      elementType: "text",
      stylers: [
        { lightness: 70 },
        { visibility: "on" }
      ]
    },
    {
      featureType:			// Restore state/province names
        "administrative.province",
      elementType: "text",
      stylers: [
        { lightness: 60 },
        { visibility: "on" }
      ]
    },
    {
      featureType:			// Replace "large" city names
        "administrative.locality",
      elementType: "text",
      stylers: [
        { lightness: 60 },
        { visibility: "on" }
      ]
    },
    {
      featureType: "water",		// Pale blue water
      elementType: "geometry",
      stylers: [ {
        lightness: 50,
        saturation: -50
      } ]
    },

    //  Turn off features

    {
      featureType: "poi",		// Turn off points of interest
      elementType: "all",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      featureType: "road",		// Turn off roads
      elementType: "all",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      featureType: "transit",		// Turn off transit
      elementType: "all",
      stylers: [
        { visibility: "off" }
      ]
    }
  ] );

  reset_div = document.createElement( "div" );
  reset_div.style.paddingBottom = "5px";
  reset_btn = document.createElement( "button" );
  reset_btn.id = "reset-btn";
  reset_btn.type = "submit";
  reset_div.appendChild( reset_btn );

  map.controls[ google.maps.ControlPosition.RIGHT_BOTTOM ].push( reset_div );
}					// End function init_map


function map_cb()

  //  Called after the maps API is loaded (required by Google's APIs),
  //  we don't need to do anything so function is empty
{
//console.log( "Google Maps API loaded" );
}					// End function map_cb


function map_info_dlg( mark )

  //  Present an info dialog when a marker is clicked
  //
  //  mark:  Marker clicked
{
  var  i;				// Loop counter


  //  Find target marker, show info dialog for parent tweet

  for( i = 0; i < circ_mark.length; i++ ) {
    if ( circ_mark[ i ].marker == mark ) {
      show_info_dlg( [ circ_mark[ i ].tw_ID ] );
      return;
    }
  }
}					// End function map_info_dlg


function map_tiles_loaded()

  //  Callback when map is setup, at this point the reset button
  //  should be in the DOM so we can style it
{
  var  latlng;				// Center of map


  latlng = uniq_map_latlng();

  $("#reset-btn").button( { label: "Reset" } );
  $("#reset-btn").click( function() {
    map.setZoom( uniq_map_zoom() );
    map.setCenter( new google.maps.LatLng( latlng[ 0 ], latlng[ 1 ] ) );
  } );

  google.maps.event.removeListener( load_listener );
}					// End function map_tiles_loaded


function resize_map()

  //  Resize the map div, and on the first display of the map tab,
  //  initialize and populate the map
{
  var  w;				// Width of map's jQuery tab


  if ( map == null ) {
    init_map();
    update_map();
  }
    
  w = $("#map-tab").width();		// Update map div's width
  $("#map-div").width( w - 100 );

  google.maps.event.trigger( map, "resize" );
}					// End function resize_map


function update_map()

  //  Update map for new geolocated tweets
{
  var  col;				// Tweet marker colour
  var  hex;				// Hex version of tweet marker colour
  var  i;				// Loop counter
  var  mark;				// Current map marker
  var  tip;				// Tooltip description of tweet


  if ( map == null ) {			// Map not visible yet?
    return;
  }

  //  Remove existing markers

  for( i = 0; i < circ_mark.length; i++ ) {
    circ_mark[ i ].marker.setMap( null );
  }

  circ_mark = [ ];			// Reset marker array and count
  mark_n = 0;

  for( i = 0; i < tw.length; i++ ) {
    if ( tw[ i ].geo == null ) {	// No geolocation?
      continue;
    }

    col = tweet_colour( tw[ i ] );	// Get colour/alpha for tweet
    hex = rgb2hex( "rgb(" + col.r + "," + col.g + "," + col.b + ")" );

    //  Build a tooltip description for the tweet, shown as the
    //  marker's title

    //  Uses moment.js format() function (http://momentjs.com)
   
    tip = moment( new Date( tw[ i ].time ) ).format( "MMM D, h:mma  " );
    tip = tip + tw[ i ].name + "\n" + tw[ i ].raw;

    mark = new google.maps.Marker( {	// Add tweet marker to map
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: hex,
        fillOpacity: ( 1.0 - col.a ),
        scale: tw[ i ].rad,
        strokeColor: "grey",
        strokeWeight: 1
      },
      title: tip,
      position: new google.maps.LatLng( tw[ i ].geo.lat, tw[ i ].geo.lon )
    } );

  //  Add handler to present an info dialog when a marker is clicked

    google.maps.event.addListener( mark, "click", function() {
      map_info_dlg( this );
    } );

  //  Push tweet marker and parent tweet ID, increment geo-located
  //  tweet count

    circ_mark.push( { marker: mark, tw_ID: i } );
    mark_n++;
  }					// End for all tweets

  draw_query_term( "#map-div", mark_n );
}					// End function update_map
