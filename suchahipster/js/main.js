(function() {

  $(document).on('pop-initialized', function() {
    $('body').on('click', function(e) {
      $('.lightbox, .lightbox-bg').removeClass('animate');
      return setTimeout(function() {
        return $('.lightbox, .lightbox-bg').remove();
      }, 500);
    });
    $('ul.documents li a').live('mouseenter', function() {
      return $(this).find('.magnify, .magnify .icon').addClass('active');
    });
    $('ul.documents li a').live('mouseleave', function() {
      return $(this).find('.magnify, .magnify .icon').removeClass('active');
    });
    $('#main-region .asset-size-1.asset-type-imagegroup').live('initialize', function(el, items) {
      var $self;
      $self = $(el.target).find('.content');
      if ($self.find('ul li').length > 1) {
        return $self.find('.magnify a').live('click.theme', function(e) {
          var _this = this;
          e.preventDefault();
          e.stopImmediatePropagation();
          if ($('.lightbox').length > 0) {
            $('.lightbox, .lightbox-bg').removeClass('animate');
            return setTimeout(function() {
              return $('.lightbox, .lightbox-bg').remove();
            }, 500);
          } else {
            $(this).addClass('loading').closest('.magnify').addClass('loading');
            $('#pop').append('<div class="lightbox-bg"></div><div class="lightbox"><div class="close">close</div><img src="' + $(this).attr('href') + '" title="' + $(this).siblings('img').attr('title') + '" /></div>');
            return setTimeout(function() {
              return $('.lightbox').imagesLoaded(function(images, proper, broken) {
                $('.lightbox').css({
                  marginTop: -($('.lightbox img').height() / 2)
                });
                $(_this).removeClass('loading').closest('.magnify').removeClass('loading');
                return $('.lightbox, .lightbox-bg').addClass('animate');
              });
            });
          }
        });
      }
    });
    $('#main-region .asset-size-1.asset-type-imagegroup').live('destroy', function(el, items) {
      var $self;
      $self = $(el.target).find('.content');
      return $self.find('.magnify a').die('click.theme');
    });
    $('#main-region .asset-size-2.asset-type-imagegroup').live('initialize', function(el, items) {
      var $self;
      $self = $(el.target).find('.content');
      $self.find('.magnify a').live('click.theme', function(e) {
        var _this = this;
        e.preventDefault();
        e.stopImmediatePropagation();
        if ($('.lightbox').length > 0) {
          $('.lightbox, .lightbox-bg').removeClass('animate');
          return setTimeout(function() {
            return $('.lightbox, .lightbox-bg').remove();
          }, 500);
        } else {
          $self.find('ul').cycle('pause');
          $(this).addClass('loading').closest('.magnify').addClass('loading');
          $('#pop').append('<div class="lightbox-bg"></div><div class="lightbox"><div class="close">close</div><img src="' + $(this).attr('href') + '" title="' + $(this).siblings('img').attr('title') + '" /></div>');
          $('body').one('click', function() {
            return $self.find('ul').cycle('resume');
          });
          return setTimeout(function() {
            return $('.lightbox').imagesLoaded(function(images, proper, broken) {
              $('.lightbox').css({
                marginTop: -($('.lightbox img').height() / 2)
              });
              $(_this).removeClass('loading').closest('.magnify').removeClass('loading');
              return $('.lightbox, .lightbox-bg').addClass('animate');
            });
          }, 0);
        }
      });
      if ($self.find('ul li').length > 1) {
        return $self.find('ul').cycle({
          fx: 'fade'
        });
      }
    });
    return $('#main-region .asset-size-2.asset-type-imagegroup').live('destroy', function(el, items) {
      var $self;
      $self = $(el.target).find('.content');
      $self.find('.magnify a').die('click.theme');
      return $self.find('ul').cycle('destroy');
    });
  });

}).call(this);
