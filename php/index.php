<?php
define('ROOT',__DIR__.'/');
require ROOT."core/Autoloader.php";
\med\Autoloader::register();
$data=json_decode(file_get_contents("php://input"));
if(isset($data))
{
    $word=$data->request;
}elseif(isset($_POST))
{
     $word=$_POST['request'];
}           

$r=explode('.',$word);
$a='\med\app\Controller\\'.$r[0].'Controller';
$controller=new $a();
$z=$r[1];
echo $controller->$z($data);