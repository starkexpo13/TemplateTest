(function($) {
  $.fn.mainMenu = function(submenu, classHidden = '') {

    $(this).on('click', function(e) {
      e.preventDefault();
      var $subMenu = $(submenu);

      if ($subMenu.is(':animated') == false) {
        $subMenu.each(function() {
          $(this).slideToggle().toggleClass(classHidden);
        });
      }
    });

    $(document).on('mouseup', function() {
      if ($(submenu).hasClass(classHidden) === false) {
        $(submenu).slideUp().addClass(classHidden);
      }
    });


    $(window).on('resize', function() {
      var screenSize = window.getComputedStyle(document.body, ':after').
          getPropertyValue('content');
      if (screenSize == 'desktop') {
        $(submenu).each(function() {
          $(this).removeAttr('style');
        });
      }
    });

  };
})(jQuery);