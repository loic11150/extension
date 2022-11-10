<?php
session_start();
    if(isset($_GET['URL'])){
        $command = escapeshellcmd('python C:\wamp64\www\workshop\script.py '.$_GET['URL']);
        $output = shell_exec($command);
        if(isset($output)){
            $output = explode("<br>",$output);
            $res = "{";
            $i=0;
            foreach($output as $value){
                if($i == 0){
                    if(strpos($value,"Cleaner") === false){
                        if(strpos($value,"Dirtier") === false){
                            
                        }else{$res = $res . '"state":'.'"'.$value.'"';}  
                    }else{
                        $res = $res . '"state":'.'"'.$value.'"';
                    }
                }
    
                if($i == 1){
                    $res = $res .",";
                    $carbon = explode(":",$value);
                    $res = $res . '"'."CO2".'":"'.$carbon[0].'"';
                }elseif($i == 2){
                    $res = $res.",";
                    $power = explode(":",$value);
                    $res = $res .'"'."power".'":"'.round(floatval($power[0]),4).'"';
                }
    
                $i = $i+1;
            }
            if(isset($_SESSION["tot"])){
                $_SESSION["tot"] = $_SESSION["tot"] + round(floatval($power[0]),4);
            }else{
                $_SESSION["tot"] = round(floatval($power[0]),4);
            }
            $res = $res . ',"total":"'.$_SESSION["tot"].'"';
            $res = $res . "}";
            print($res);
        }else{
            if(isset($_SESSION["tot"])){
               print('{"state":"","power":"","CO2":"","total":"'.$_SESSION['tot'].'"}');
            }
        }
    }

?>