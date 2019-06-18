(function($) {
  $.fn.darkBlock = function(
      itemClass, activeClass, infoBlockClass, activeBlockClass) {
    var $this = $(this),
        $items = $this.find('.' + itemClass);

    $items.on('click', function(e) {
      e.preventDefault();
      var $thisItem = $(this),
          infoBlockID = $thisItem.attr('href');

      $this.find('.' + activeBlockClass).removeClass(activeBlockClass);
      $(infoBlockID).addClass(activeBlockClass);
      $items.removeClass(activeClass);
      $thisItem.addClass(activeClass);
    });
  };
})(jQuery);