(function($) {
  $('.header-menu-button').mainMenu('.drop-menu', 'hidden-xm');

  $('.carousel-list').
      carousel('carousel-item', 'carousel-now-page',
          'carousel-all-page',
          'carousel-pagination-block a',
          6, 4, 2, 5);

  $('.dark-block').
      darkBlock('dark-block-item', 'dark-block-active-item',
          'dark-block-info', 'dark-block-active-info');

  $('img.img-svg').each(function() {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
      var $svg = $(data).find('svg');
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      $svg = $svg.removeAttr('xmlns:a');
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox',
            '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      }
      $img.replaceWith($svg);
    }, 'xml');
  });

  function imgReplacer() {
    var $item = $('.press-item a');
    $item.on('mousemove', function() {
      var $this = $(this),
          $img = $this.find('.press-image'),
          imgPath = $img.attr('src'),
          imgReplacePath = $img.attr('data-replacement'),
          status = $img.attr('data-image');

      if (imgPath !== imgReplacePath && status == '1') {
        $img.attr('data-replacement', imgPath);
        $img.attr('src', imgReplacePath);
        $img.attr('data-image', '2');
      }
    });
    $item.on('mouseout', function() {
      var $this = $(this),
          $img = $this.find('.press-image'),
          imgPath = $img.attr('src'),
          imgReplacePath = $img.attr('data-replacement'),
          status = $img.attr('data-image');

      if (status == '2') {
        $img.attr('data-replacement', imgPath);
        $img.attr('src', imgReplacePath);
        $img.attr('data-image', '1');
      }
    });
  }

  imgReplacer();

  $('.press-list').carousel('press-item', 'press-now-page',
      'press-all-page', 'press-pagination-block a',
      4, 3, 2, 5);

  $('.news-block-item').each(function() {
    var $this = $(this),
        imageBG = '',
        screenSize = window.getComputedStyle(document.body, ':after').
            getPropertyValue('content');

    if ($this.attr('data-background')) {
      imageBG = $this.attr('data-background');

      if (screenSize == 'desktop' || screenSize == '"desktop"') {
        $this.find('a').css({
          background: 'url("' + imageBG + '") no-repeat',
          backgroundPosition: ' -80px -180px',
          backgroundSize: '190% auto',
        });
      }
      if (screenSize == 'tablet' || screenSize == '"tablet"') {
        $this.find('a').css({
          background: 'url("' + imageBG + '") no-repeat',
          backgroundPosition: ' -80px -180px',
          backgroundSize: 'auto 200%',
        });
      }
      if (screenSize == 'phone' || screenSize == '"phone"') {
        $this.find('a').css({
          background: 'url("' + imageBG + '") no-repeat',
          backgroundPosition: ' -315px -195px',
          backgroundSize: 'auto 270%',
        });
      }

      $this.find('a').addClass('news-block-backgrounds');
    }
  });

  function paginationNews() {
    var screenSize = window.getComputedStyle(document.body, ':after').
        getPropertyValue('content');
    if (screenSize == 'phone' || screenSize == '"phone"') {
      var $newsItems = $('.news-block-item'),
          allPage = $newsItems.length,
          nowPage = 1,
          prevID = 2,
          nextID = 1,
          nowID = 0;

      $newsItems.hide();
      $newsItems.eq(0).show();
      $newsItems.eq(1).show();

      function playNews(options) {
        if (options == 'next') {
          nowPage++;
          if (nowPage > allPage) {
            nowPage = 1;
            nextID = 0;
          }
          nowID = nowPage - 1;
          nextID = nowID + 1;
        }

        if (options == 'prev') {
          nowPage--;
          if (nowPage <= 0) {
            nowPage = allPage;
            nextID = allPage - 1;
          }
          nowID = nowPage - 1;
          nextID = nowID + 1;
        }

        $newsItems.hide();
        $newsItems.eq(nowID).show();

        if (nowPage !== allPage) {
          $newsItems.eq(nextID).show();
        }
        $('.news-now-page').text(nowPage);
      }

      $('.news-block-pagination a').on('click', function(e) {
        e.preventDefault();
        var link = $(this).attr('href').substr(1);
        playNews(link);
      });

      $('.news-all-page').text(allPage);
      $('.news-now-page').text(nowPage);
    }
  }

  paginationNews();

})(jQuery);