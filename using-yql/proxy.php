<?php

    $url = $_GET['url'];

    $allowedurls = array('http://developer.yahoo.com','http://thinkphp.ro','http://php.net');

    if(in_array($url,$allowedurls)) {

           $output = get($url); 

           /* filter all */
     
           //no body tags
           $content = preg_replace('/.*<body[^>]*>/msi','',$output);

           $content = preg_replace('/<\/body>.*/msi','',$content);

           $content = preg_replace('/<?\/body[^>]*>/msi','',$content);

           //no linebreaks
           $content = preg_replace('/[\r|\n]+/msi','',$content); 

           //no comments
           $content = preg_replace('/<!--[\S\s]*?-->/msi','',$content); 

           //no noscript
           $content = preg_replace('/<noscript[^>]*>[\S\s]*?<\/noscript>/msi','',$content); 

           //no script blocks
           $content = preg_replace('/<script[^>]*>[\S\s]*?<\/script>/msi','',$content); 

           //no self closing scripts
           $content = preg_replace('/<script.*\/>/msi','',$content); 

           echo$content;

    } else {

           echo 'Error: URL not allowed to load here'; 
    }

     /* using cURL */
     function get($url) {

               $ch = curl_init();

               curl_setopt($ch,CURLOPT_URL,$url);

               curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

               curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);

               $data = curl_exec($ch);

               curl_close($ch);  

               if(empty($data)) {

                  return 'Error retrieve data, please try again.';

               } else {return $data;}   

      }//end function get
?>


