window.addEvent('domready',function() {

       var url = $$('script')[2].get('src');

       var myHTMLRequest = new Request.HTML({onSuccess: function(a,b,code){

                    code = code.replace(/&/mg,'&#38;');
                    code = code.replace(/</mg,'&#60;');
                    code = code.replace(/>/mg,'&#62;');
                    code = code.replace(/\"/mg,'&#34;');
                    code = code.replace(/\t/g,' ');
                    code = code.replace(/\r?\n/g,'<br>');
                    code = code.replace(/<br><br>/g,'<br/>');
                    code = code.replace(/ /g,'&nbsp;');
                    $('code').set('html','<pre><code>'+code+'</code></pre>');
       }}).get(url); 
});
