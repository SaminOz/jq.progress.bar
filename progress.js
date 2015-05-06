
(function($){
  var clear = [], element, progress = null, regEx = /px/gi;
  $.progress = function( element, start, stop ) {

    function getWidth( element ) {
      var w = $(element).width();
      return w + (+$(element).css('margin-left').replace(regEx, '')) + (+$(element).css('margin-right').replace(regEx, ''));
    }

    var
     w = getWidth(element),
     time = start || 10,
     inc = w/time, pWidth, args = arguments,
     pw
    ;
    if ( ! progress ) {
      pw = '1';
      progress = $('<div/>', {class: 'progress-bar_' + (new Date()).getTime()});
    }
    else {
      pw = progress.css('width')
    }

    progress.css({
      position: 'absolute',
      top: '0',
      left: '-1px',
      width: pw,
      height: '3px',
      backgroundColor: 'black',
      margin: '0',
      zIndex: '9999'
    });

    if( args.length < 3 ) {
      $(element).append(progress);
    }
    else {
      time = stop;
      inc = (w - pw.replace(regEx, ''))/time;
      clear.forEach(function(d){
        clearTimeout(d);
      });
    }

    pWidth = +progress.width();
    for( var i = 1; i <= time; i++) (function( count ){
      var clearTO = setTimeout(function(){
        progress.css('width', (pWidth + inc) + 'px');
        pWidth += inc;
        if( count === time ) progress.animate({opacity: 0}, 300);
      }, count * 1000);

      clear.push(clearTO);
    }(i));
  };
}(jQuery));

$.progress('body', 30);

setTimeout(function(){
  $.progress('body', null, 1);
},20000);

