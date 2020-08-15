/* eslint-disable no-undef */
(function($){
  "use strict"; // Start of use strict
    if (window.jQuery().datetimepicker) {
        $('#datepicker-disabled-days').datetimepicker({
            // Formats
            // follow MomentJS docs: https://momentjs.com/docs/#/displaying/format/
            format: 'DD-MM-YYYY hh:mm A',
            
            // Your Icons
            // as Bootstrap 4 is not using Glyphicons anymore
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-check',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        });
    }
    
    $('#insurance').on('change', function(){
      var insurance = $(this).val();
      if(insurance === 'yes') {
        $('#insurance-provider').show();
      } else {
        $('#insurance-provider').hide();
      }
    });

    function6();
    function7();
    
})(jQuery);

function function6() {
  var bttn = document.getElementById('bouncyFlip');
  // make sure..
  bttn.disabled = false;

  bttn.addEventListener('click', function () {
      // simulate loading (for demo purposes only)
      classie.add(bttn, 'active');
      setTimeout(function () {

          classie.remove(bttn, 'active');

          // create the notification
          var notification = new NotificationFx({
              message: '<span class="fa fa-calendar"></span><p>The event was added to your calendar. Check out all your events in your <a href="#">event overview</a>.</p>',
              layout: 'attached',
              effect: 'bouncyflip',
              type: 'notice', // notice, warning or error
              onClose: function () {
                  bttn.disabled = false;
              }
          });

          // show the notification
          notification.show();

      }, 1200);

      // disable the button (for demo purposes only)
      this.disabled = true;
  });
}

function function7() {
  var bttn = document.getElementById('slidetop');

  // make sure..
  bttn.disabled = false;

  bttn.addEventListener('click', function () {
      // simulate loading (for demo purposes only)
      classie.add(bttn, 'active');
      setTimeout(function () {

          classie.remove(bttn, 'active');

          // create the notification
          var notification = new NotificationFx({
              message: '<span class="fa fa-megaphone"></span><p>You have some interesting news in your inbox. Go <a href="#">check it out</a> now.</p>',
              layout: 'bar',
              effect: 'slidetop',
              type: 'notice', // notice, warning or error
              onClose: function () {
                  bttn.disabled = false;
              }
          });

          // show the notification
          notification.show();

      }, 1200);

      // disable the button (for demo purposes only)
      this.disabled = true;
  });

}