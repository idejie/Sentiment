/*--------------------------------------------------------------------------*/
/*  ALERT_DLG.JS							    */
/*    Dialog to display alerts to the user				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  13-May-13	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global varialbes

var  alert_dlg;				// Alert dialog for invalid dates


function hide_alert_dlg()

  //  Hide the alert dialog
{
  alert_dlg.dialog( "close" );
}					// End function hide_alert_dlg


function init_alert_dlg()

  //  Initialize the alert dialog
  //
  //  icon:  Icon type: undefined is alert, anything else is info
{
  var  c;				// jQuery theme colour
  var  html;				// HTML to insert into dialog


  c = $(".ui-icon").css( "color" );

  html = "<div>";
  html = html + "<table>";
  html = html + "<tr style=\"vertical-align: middle;\">";
  html = html + "<td width=\"35px\" style=\"padding-left: 1em; padding-right: 1em;\">";

  //  We're using Font-Awesome here for better control over the
  //  dialog's icon

  html = html + "<span id=\"alert-icon\" class=\"fa fa-warning fa-2x\" ";
  html = html + "style=\"color: " + c + ";\"></span>";

  html = html + "</td>";
  html = html + "<td style=\"font-weight: bold; font-size: 1.2em;\">";
  html = html + "<span id=\"alert-msg\"></span>";
  html = html + "</td>";
  html = html + "</tr>";
  html = html + "<tr>";
  //html = html + "<td></td>";
  html = html +
    "<td colspan=\"2\" style=\"font-weight: normal; padding-top: 1em;\">";
  html = html + "<span id=\"alert-info\"></span>";
  html = html + "</td>";
  html = html + "</tr>";
  html = html + "</table>";
  html = html + "</div>";

  alert_dlg = $("<div id=\"alert-dlg\"></div>" );
  alert_dlg.html( html );

  alert_dlg.dialog(
    {
      title: "Alert",			// Dialog title
      autoOpen: false,			// Don't open until text populated
      buttons: {			// OK button
        "OK": function() {
          $(this).dialog( "close" );
        }
      },
      dialogClass: "dialog-drop-shadow",
      resizable: false,
      width: 400,
      modal: true,			// Modal so must be dismissed
      open: function() {		// On open, set max height of dialog
        $("#alert-dlg").css( "max-height", $(window).height() * 0.75 );
      }
    }
  );
}					// End function init_alert_dlg();


function show_alert_dlg( msg, info, dlg_type, dlg_title )

  //  Show the alert dialog
  //
  //  msg:        Main dialog message
  //  info:       Secondary informational message
  //  dlg_type:   Undefined for alert, anything else for info
  //  dlg_title:  Dialog title (defaults to "Alert")
{
  //  Undefined dialog type is alert, otherwise info

  if ( typeof dlg_type === "undefined" ) {
    $("#alert-icon").removeClass( "fa-info-circle" );
    $("#alert-icon").addClass( "fa-warning" );
  } else {
    $("#alert-icon").removeClass( "fa-warning" );
    $("#alert-icon").addClass( "fa-info-circle" );
  }

  if ( typeof dlg_title === "undefined" ) {
    $("#alert-dlg").dialog( "option", "title", "Alert" );
  } else {
    $("#alert-dlg").dialog( "option", "title", dlg_title );
  }

  $("#alert-msg").html( msg );
  $("#alert-info").html( info );

  alert_dlg.dialog( "open" );
}					// End function show_alert_dlg
