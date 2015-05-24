function init(){

  var rege = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if(rege.test($('#email').val() === '')){
    console.log('form is ready');
  } else(rege.test($('#email').val())){
    jQuery('#signup-form').on('submit', function(e){
      e.preventDefault();
      jQuery(this).find('input').text('');

      jQuery.ajax({
        url: '/fans',
        method: 'post',
        dataType: 'json',
        data: jQuery(this).serialize(),
        success: function(data){
          jQuery('#fan-list').prepend( jQuery('<li>').text( data.name ) );
        } // end success function
      }); // end ajax call
    }); // end click event
  } // end if/else statement
} // end init function

jQuery(document).ready(init);
