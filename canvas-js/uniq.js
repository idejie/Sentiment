/*--------------------------------------------------------------------------*/
/*  UNIQ.JS								    */
/*    Code unique to this version of the tweet visualizer		    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  22-May-13	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/


function uniq_init()

  //  This routine handles project-specific initializations
{
}					// End function uniq_init


function uniq_map_latlng()

  //  Return the latitude and longitude for the center of the default
  //  Google map
{
  return [ 39.833, -95.167 ];
}					// End function uniq_latlng


function uniq_map_zoom()

  //  Return the zoom level for the default Google map
{
  return 4;
}					// End function uniq_latlng


function uniq_load_URL( time_s, time_e, filter )

  //  Build a project-specific URL for loading external data
  //
  //  time_s:  Start time of tweet pull
  //  time_e:  End time of tweet pull
  //  filter:  Filter term(s) (optional)
{
  return "";
}					// End function uniq_load_URL


function uniq_resize( tab_ID )

  //  This routine handles resizing project-specific tabs
  //
  //  tab_ID:  ID of tab to resize
{
}					// End function uniq_resize


function uniq_update()

  //  This routine handles updating project-specific tabs
{
}					// End function uniq_update


function uniq_width( tab_ID )

  //  This routine returns the width of project-specific tabs
  //
  //  tab_ID:  ID of tab to query
{
  return 0;
}					// End function uniq_width
