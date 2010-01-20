window.addEvent('domready',function(){

       $$('.ajaxtrigger').each(function(elem,index){

                 elem.addEvent('click',function(e){                      

                      var url = $(this).get('href');

                      if(url.match('^http')) {

                             url = 'proxy.php?url=' + url;
                      } 

                      $('target').load(url);
 
                      return false;
                 });
       });
});