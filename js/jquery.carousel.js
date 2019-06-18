(function($) {
  $.fn.carousel = function(
      itemClass, nowPageClass, allPageClass, nextPrevButtons,
      numDesktop, numTablet, numPhone, seconds = 3) {
    var $this = $(this),
        $listItems = $this.find('.' + itemClass),
        allItems = $listItems.length,
        pageColums = 6,
        intervalID,
        allPages = 0,
        nowPage = 1;

    function showItems() {
      var screenSize = window.getComputedStyle(document.body, ':after').
          getPropertyValue('content');
      var numLoad;

      screenSize.replace(/[^a-zA-Z ]/g, '');

      if (screenSize == 'desktop' || screenSize == '"desktop"') {
        pageColums = numDesktop;
      }
      if (screenSize == 'tablet' || screenSize == '"tablet"') {
        pageColums = numTablet;
      }
      if (screenSize == 'phone' || screenSize == '"phone"') {
        pageColums = numPhone;
      }

      $listItems.hide();
      allItems = Number.parseInt(allItems);
      allPages = Math.ceil(allItems / pageColums);

      numLoad = nowPage * pageColums;
      for (var i = 0; i < numLoad; i++) {
        $listItems.eq(i).fadeIn();
      }
      setPages();
    }

    function playSlide(options) {
      var result = 0,
          startNum = 0,
          prevStart = 0;

      if ($listItems.is(':animated') == false) {

        if (options == 'next') {
          if (nowPage == allPages) {
            nowPage = 1;
          } else {
            nowPage++;
          }
        }
        if (options == 'prev') {
          if (nowPage == 1) {
            nowPage = allPages;
          } else {
            nowPage--;
          }
        }

        result = nowPage * pageColums;
        startNum = result - pageColums;

        if (startNum !== 0) {
          prevStart = startNum - pageColums;
        }

        if (pageColums == numDesktop) {
          $listItems.removeAttr('style').animate({
            marginLeft: '-' + $this.width() + 'px',
            opacity: 0,
          }, 700);

          $listItems.hide().css({
            marginLeft: '+' + $this.width + 'px',
            opacity: 0,
          });

          for (var i = startNum; i < result; i++) {
            $listItems.eq(i).removeAttr('style').animate({
              marginLeft: 0,
              opacity: 1,
            }, 500);
          }
        } else {
          $listItems.removeAttr('style').hide();
          for (var i = startNum; i < result; i++) {
            $listItems.eq(i).removeAttr('style').fadeIn();
          }
        }

        setPages();
      }
    }

    function autoPlay() {
      seconds = seconds * 1000;
      intervalID = setInterval(function() {
        playSlide('next');
      }, seconds);
    }

    function setPages() {
      $('.' + nowPageClass).text(nowPage);
      $('.' + allPageClass).text(allPages);
    }

    showItems();
    autoPlay();

    $('.' + nextPrevButtons).on('click', function(e) {
      e.preventDefault();
      var link = $(this).attr('href');

      link = link.substr(1);
      playSlide(link);
    });
    $(window).resize(function() {
      showItems();
    });
  };
})(jQuery);