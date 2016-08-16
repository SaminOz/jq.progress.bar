FlixRTime.clearTo = [];
//need to re-write this without jQuery.
FlixRTime.progress = function(start, stop ){
  FlixRTime.clearTo.forEach(function(d){
    clearTimeout(d);
  });
  FlixRTime.clearTo = [];

  var progressBar = document.querySelector('.main .progress-bar');
  //delete bar if exists.
  if( !! progressBar ) progressBar.parentNode.removeChild( progressBar );

  var 
    main = document.querySelector('.main'),
    w = main.offsetWidth + 1,
    time = start || 10,
    progress$ = document.createElement('div'),
    inc = w / time, 
    pWidth = 0
  ;

  progress$.setAttribute('class', 'progress-bar');

  progress$.style.display = 'none';
  progress$.style.width = '0px';
  progress$.style.position = 'absolute';
  progress$.style.top = '0';
  // progress$.style.left = '-1px';
  progress$.style.left = '0';
  progress$.style.height = '3px';
  progress$.style.backgroundColor = 'black';
  progress$.style.margin = '0';
  progress$.style.zIndex = '999';

  if( ! main.querySelector('.main') ) {
    main.appendChild( progress$ );
  }

  time = stop || start;

  progress$.style.display = 'block';

  for( var i = 0, t = time; i <= t; i++) (function( count, t ){
    var clearTo = setTimeout(function(){
      if((pWidth + inc) < (w - inc)) {
        progress$.style.width = pWidth + inc + 'px';
        pWidth += inc;
      }
      else {
        progress$.style.width = w + 'px';
      }
      if( count === t ) {
        setTimeout(function(){
          progress$.style.height = 0;
          progress$.parentNode.removeChild( progress$ );
        }, 500);
      }
    }, (count * 1000), count, t);
    FlixRTime.clearTo.push(clearTo);
  }(i, t));
};
