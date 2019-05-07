// would rather write this ugly js than write more views template files

(function($){
  var namesSelector = '.team-names-only .views-row';
  var biosSelector = '.team-bios .views-row';
  console.log('asdas')
  $(document).on('click', namesSelector, function(evt){
    var $clicked = $(evt.currentTarget);
    console.log($clicked)
    var nid = $clicked.find('[data-nid]').data('nid')
    console.log(nid)
    var associatedBio = $(biosSelector).filter((i, e) => $(e).find('[data-nid="' + nid + '"]').length)

    $(namesSelector + ', ' +  biosSelector).removeClass('active');
    $(associatedBio).add($clicked).addClass('active')
  })
})(jQuery)