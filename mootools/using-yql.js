window.addEvent('domready',function(){

       $$('.ajaxtrigger').each(function(elem,index){

                 elem.addEvent('click',function(e){                      

                      var url = $(this).get('href');

                      doAjax(url); 

                      return false;
                 });//end handler click
       });//end each
            function doAjax(url) {
                       if(url.match('^http')) {
                             new Request.JSONP({url: 'http://query.yahooapis.com/v1/public/yql?q='+

                                                     'select%20*%20from%20html%20where%20url%3D%22'+

                                                      encodeURIComponent(url)+

                                                      '%22&format=xml&diagnostics=false',

                                                onComplete: function(data) {
                             
                                                       if(data.results[0]) {
                                                           var data = filterData(data.results[0]); 
                                                           $('target').set('html',data); 
                                                       } else {
                                                           var errormsg = '<p>Error: could not load the page.</p>';
                                                           $('target').set('html',errormsg); 
                                                       }
                                                }  
                                               }).send(); return false;
                      } else {

                             $('target').load(url);  return false;             
                      }
           }


 function filterData(data) {
           /* filter all */
           //no body tags
           data = data.replace(/.*<body[^>]*>/g,'');
           data = data.replace(/<\/body>.*/g,'');
           data = data.replace(/<?\/body[^>]*>/g,'');
           //no linebreaks
           data = data.replace(/[\r|\n]+/g,''); 
           //no comments
           data = data.replace(/<!--[\S\s]*?-->/g,''); 
           //no noscript
           data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,''); 
           //no script blocks
           data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,''); 
           //no self closing scripts
           data = data.replace(/<script.*\/>/,''); 
        return data;
    }
});