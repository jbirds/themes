$(document).on('pop-initialized', function(){
  $('#main-region .asset-type-text').live('initialize', function(e, asset){
    var el = e.currentTarget;
    $('#fancybox-outer').addClass('themed');
    if ($(el).height() > 640) {
      var inner = $(el).find('.asset-inner');
      inner.addClass('truncate');
      inner.height(640);
      $('<div class="show-overflow-text">READ MORE</div>').appendTo(inner).fancybox({
        autoDimensions: false,
        content: '<div class="asset asset-type-text asset-size-fancybox"><div class="asset-inner"><h3>' + inner.find('h3').text() + '</h3><div class="content">' + inner.find('.content').html() + '</div></div></div>'
      });
    }
  });

  $('#main-region .asset-type-text').live('destroy', function(e, asset){
    var el = e.currentTarget;
    $(el).height('');
    var inner = $(el).find('.asset-inner');
    inner.removeClass('truncate');
    inner.find('.show-overflow-text').remove();
  });

  $('.asset').live('initialize', function(e, asset){
    fixBaseline(e.currentTarget);
  });

  $('.asset').live('destroy', function(e, asset){
    fixBaseline(e.currentTarget);
  });

});

function fixBaseline(el) {
  var $el = $(el).find('.content');
  $el.imagesLoaded(function(images, proper, broken){
    var height = $el.height();
    var baseline = 20;
    var offset = (baseline - height % baseline) % baseline;
    $el.css('padding-bottom', offset + 'px');
  });
  $(document).imagesLoaded(function(){
    Populr.ThemeEngine.repack();
  });
}
