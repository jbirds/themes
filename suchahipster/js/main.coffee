$(document).on 'pop-initialized', ->

  $('body').on 'click', (e) ->
    $('.lightbox, .lightbox-bg').removeClass('animate')
    setTimeout ->
      $('.lightbox, .lightbox-bg').remove()
    , 500

  $('ul.documents li a').live 'mouseenter', () ->
    $(@).find('.magnify, .magnify .icon').addClass('active')

  $('ul.documents li a').live 'mouseleave', () ->
    $(@).find('.magnify, .magnify .icon').removeClass('active')


  $('#main-region .asset-size-1.asset-type-imagegroup').live 'initialize', (el, items) ->
    $self = $(el.target).find('.content')
    if $self.find('ul li').length > 1
      $self.find('.magnify a').live 'click.theme', (e) ->
        e.preventDefault()
        e.stopImmediatePropagation()

        if $('.lightbox').length > 0
          $('.lightbox, .lightbox-bg').removeClass('animate')
          setTimeout ->
            $('.lightbox, .lightbox-bg').remove()
          , 500
        else
          $(@).addClass('loading').closest('.magnify').addClass('loading')
          $('#pop').append '<div class="lightbox-bg"></div><div class="lightbox"><div class="close">close</div><img src="' + $(@).attr('href') + '" title="' + $(@).siblings('img').attr('title') + '" /></div>'
          setTimeout =>
            $('.lightbox').imagesLoaded (images, proper, broken) =>
              $('.lightbox').css(marginTop: -($('.lightbox img').height() / 2))
              $(@).removeClass('loading').closest('.magnify').removeClass('loading')
              $('.lightbox, .lightbox-bg').addClass('animate')

  $('#main-region .asset-size-1.asset-type-imagegroup').live 'destroy', (el, items) ->
    $self = $(el.target).find('.content')
    $self.find('.magnify a').die('click.theme')


  $('#main-region .asset-size-2.asset-type-imagegroup').live 'initialize', (el, items) ->
    $self = $(el.target).find('.content')
    $self.find('.magnify a').live 'click.theme', (e) ->
      e.preventDefault()
      e.stopImmediatePropagation()
      if $('.lightbox').length > 0
        $('.lightbox, .lightbox-bg').removeClass('animate')
        setTimeout ->
          $('.lightbox, .lightbox-bg').remove()
        , 500
      else
        $self.find('ul').cycle('pause')
        $(@).addClass('loading').closest('.magnify').addClass('loading')
        $('#pop').append '<div class="lightbox-bg"></div><div class="lightbox"><div class="close">close</div><img src="' + $(@).attr('href') + '" title="' + $(@).siblings('img').attr('title') + '" /></div>'
        $('body').one 'click', ->
          $self.find('ul').cycle('resume')
        setTimeout =>
          $('.lightbox').imagesLoaded (images, proper, broken) =>
            $('.lightbox').css(marginTop: -($('.lightbox img').height() / 2))
            $(@).removeClass('loading').closest('.magnify').removeClass('loading')
            $('.lightbox, .lightbox-bg').addClass('animate')
        , 0
    if $self.find('ul li').length > 1
      $self.find('ul').cycle
        fx: 'fade'

  $('#main-region .asset-size-2.asset-type-imagegroup').live 'destroy', (el, items) ->
    $self = $(el.target).find('.content')
    $self.find('.magnify a').die('click.theme')
    $self.find('ul').cycle('destroy')

#   $('.asset').live 'initialize', (e, asset) ->
#     fixBaseline(e.currentTarget)

#   $('.asset').live 'destroy', (e, asset) ->
#     fixBaseline(e.currentTarget)

# fixBaseline = (el) ->
#   $el = $(el).find('.content')
#   $el.imagesLoaded (images, proper, broken) ->
#     height = $el.height()
#     baseline = 20
#     console.log height
#     offset = (baseline - height % baseline) % baseline
#     $el.css('padding-bottom', offset + 'px')
#     $el.css('padding-bottom', offset + 'px')
