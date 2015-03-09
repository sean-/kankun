(function($) {
  "use strict";

  var saved_switches = new Array();

  checkSwitches();
})(jQuery);

function checkSwitches() {
  $('#switches li').each(function( index ) {
    activateSwitch( $(this) );
  });

  var doCheck = setTimeout(checkSwitches, 2500);
}

function addSwitch( switch_data ) {
  var auto_increment = $('#switches li').length;

  var saved_switch = $('<li></li>');
  saved_switch.attr('id', 'switch-' + auto_increment);
  saved_switch.attr('data-ip',switch_data.ip);
  saved_switch.html('<span title="' + switch_data.ip + '"><i class="fa fa-power-off"></i> ' + switch_data.label + '</span>');

  $('#switches').append( saved_switch );

  activateSwitch(saved_switch);
}

function activateSwitch( item ) {
  if ( item.attr('data-ip') ) {
    var base_url = 'http://' + item.attr('data-ip') + '/cgi-bin/json.cgi';

    $.getJSON(
      base_url + '?get=state&callback=?'
    )
    .done(function( json ) {
      if ( json.state == 'on' ) {
        item.data('state', 'on');
        item.removeClass('power-off');
        item.addClass('power-on');
      }
      else {
        item.data('state', 'off');
        item.removeClass('power-on');
        item.addClass('power-off');
      }
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });

    item.on(
      'click',
      function(e) {
        e.preventDefault();
        var button = $(this);
        var state = button.data('state');
        var toggle = ( state == 'on' ? 'off' : 'on' );

        $.getJSON(
          base_url + '?set=' + toggle + '&callback=?'
        )
        .done(function( json ) {
          if ( json.ok ) {
            button.data('state', toggle);
            button.removeClass('power-' + state);
            button.addClass('power-' + toggle);
          }
        })
        .fail(function( jqxhr, textStatus, error ) {
          var err = textStatus + ", " + error;
          console.log( "Request Failed: " + err );
        });
      }
    );
  }
}
