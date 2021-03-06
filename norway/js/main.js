$(document).on('pop-initialized', function(){
  // Instead of listening for the document.ready event, your theme
  // should listen for document.pop-initialized.
  // 
  // We are huge fans of coffeescript at Populr. We suggest that 
  // you write your js in coffeescript, but please be sure to 
  // pre-compile it, as Populr will not compile your
  // coffeescript to js code automatically.
  $.fancybox.init();

  $('.asset').live('initialize', function(e, asset){
    $(this).find('[data-tooltipsy-content]').each(function(){
      $(this).tooltipsy({
        content: $(this).data('tooltipsy-content'),
        show: function (e, $el) { $el.css('margin-top', 8).animate({'opacity': 'show', 'margin-top': 0}, 100); },
        hide: function (e, $el) { $el.animate({'opacity': 'hide', 'margin-top': 8}, 100); },
        className: $(this).closest('#footer-region').length > 0 ? 'tooltipsy tooltipsy-footer' : 'tooltipsy'
      });
    });
  });

  $('.asset').live('destroy', function(e, asset){
    $.fancybox.close();
    $(this).find('[data-tooltipsy-content]').each(function(){
      var tooltipsy = $(this).data('tooltipsy');
      if (tooltipsy) {
        try {
          $(this).data('tooltipsy').destroy();
        }
        catch (e) {}
      }
    });
  });

  $('.asset-type-imagegroup').live('initialize', function(e, asset){
    $(this).find('a.fancybox').each(function(){
      $(this).attr('id', _.uniqueId('fancyboximage_'));
      $magnify = $('<div class="magnify">magnify</div>').appendTo($(this));
      $magnify.data('norway-original-margin-top', parseInt($magnify.css('margin-top'), 10));
    }).fancybox({
      type: 'image',
      centerOnScroll: true
    }).on('mouseenter.norway', function(e){
      var $el = $(this).find('.magnify');
      $el.css('margin-top', $el.data('norway-original-margin-top') + 8).animate({'opacity': 'show', 'margin-top': $el.data('norway-original-margin-top')}, 100);
    }).on('mouseleave.norway', function(e){
      var $el = $(this).find('.magnify');
      $el.animate({'opacity': 'hide', 'margin-top': $el.data('norway-original-margin-top') + 8}, 100);
    });
    $(this).find('.slideshow .images').cycle({
      fx: 'scrollHorz'
    });
  });

  $('.asset-type-imagegroup').live('destroy', function(e, asset){
    $(this).find('a.fancybox .magnify').off('.norway').remove();
  });

  $('.asset-type-documentgroup.asset-size-1').live('initialize', function(e, asset){
    $(this).find('.documents').on('mouseenter.norway', 'li', function(e){
      $(this).find('.download').animate({'margin-right': 10}, 100);
    });
    $(this).find('.documents').on('mouseleave.norway', 'li', function(e){
      $(this).find('.download').animate({'margin-right': 0}, 100);
    });    
  });

  $('.asset-type-documentgroup.asset-size-1').live('destroy', function(e, asset){
    $(this).find('.documents').off('.norway');
  });
});