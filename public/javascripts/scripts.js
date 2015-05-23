function init(){
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
      }
    });
  });
}

jQuery(document).ready(init);

