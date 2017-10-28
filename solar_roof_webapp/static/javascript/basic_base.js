

$(document).ready(function(){

  $(window).scroll( function(){

      /* Check the location of each desired element */
      $('.fademe').each( function(i){

          var bottom_of_object = $(this).position().top + $(this).outerHeight() - 450;
          var bottom_of_window = $(window).scrollTop() + $(window).height();

          /* If the object is completely visible in the window, fade it it */
          if( bottom_of_window > bottom_of_object ){
              console.log('Print t')
              $(this).animate({'opacity':'1'},1000);

          }
      });
  });


})
