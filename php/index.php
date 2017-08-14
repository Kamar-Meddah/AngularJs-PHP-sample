<?php

define('ROOT',__DIR__.'/');
require ROOT."core/Autoloader.php";
\med\Autoloader::register();
$app=\med\app\App::getInstance();

$data=json_decode(file_get_contents("php://input"));

if(isset($data)){
    switch($data->request)
    {
        case 'posts.home':
            $parpage=6;
            $page=$data->page;
            $total=$app->getTable('articles')->count()->total;
            $nbpage=ceil($total/$parpage);
            $article=$app->getTable('articles')->all(["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
            $array=['art'=>$article,'nbpage'=>$nbpage];
            echo(json_encode($array));
            break;

        case 'posts.show':
        
           $req= $app->getTable('articles')->find($data->id);
           echo(json_encode($req));
           break;

        case 'posts.search':
       
           $parpage=6;
           $page=$data->page;
           $total=$app->getTable('articles')->countsearch($data->search)->total;
           $nbpage=ceil($total/$parpage);
           $article=$app->getTable('articles')->search($data->search,["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
           $array=['art'=>$article,'nbpage'=>$nbpage];
           echo(json_encode($array));
           break; 

        case 'categories':
            $req= $app->getTable('categories')->all();
            echo(json_encode($req));
            break;

        case 'posts.categories':
            $parpage=6;
            $page=$data->page;
            $total=$app->getTable('articles')->countByCategorie($data->category_id)->total;
            $nbpage=ceil($total/$parpage);
            $article=$app->getTable('articles')->lastByCategorie($data->category_id,["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
            $array=['art'=>$article,'nbpage'=>$nbpage];
            echo json_encode($array);
            break;

        case 'posts.comments':
           $req= $app->getTable('comments')->find($data->id);
            echo(json_encode($req));
            break;

        case 'post.comment.delete':
            $app->getTable('comments')->delete($data->id);
            break;

        case 'post.commenter':
              $app->getTable('comments')->create(['name'=>$data->name,'content'=>$data->comment,'articles_id'=>$data->postId]);
            break;

        case 'users.connect':
              echo json_encode($app->getauth()->login($data->username,$data->password));
            break;

        case 'users.logged':
              echo json_encode($app->getauth()->logged());
            break;

        case 'users.logout':
              $app->getauth()->logout();
              echo json_encode(true);
            break;

        case 'admin.categories':
            $parpage=6;
            $page=$data->page;
            $total=$app->getTable('categories')->count()->total;
            $nbpage=ceil($total/$parpage);
            $article=$app->getTable('categories')->allP(["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
            $array=['art'=>$article,'nbpage'=>$nbpage];
            echo json_encode($array);
            break;

        case 'admin.categories.insert':
            $req=$app->getTable('categories')->create(["titre"=>$data->title]);
            break;


        case 'admin.categories.edit':
            $req=$app->getTable('categories')->update($data->id,["titre"=>$data->title]);
            break;


        case 'admin.categories.delete':
            $total=$app->getTable('articles')->countByCategorie($data->id)->total;
            if($total == '0'){
                echo json_encode($array=['num'=>$total]);
                $app->getTable('categories')->delete($data->id);
            }
            break;

        case 'admin.posts.delete':
           $images=$app->getTable('images')->find($data->id);
           foreach ($images as $image)
           {
           unlink(ROOT.'../img/articles/'.$image->name);
           }
            $image=$app->getTable('images')->deleteWithArticle($data->id);
            $app->getTable('comments')->deletear($data->id);
            $app->getTable('articles')->delete($data->id);
            break;

        case 'admin.post.images':
            $req=$app->getTable('images')->find($data->id);
            echo json_encode($req);
            break;

        case 'admin.post.imagesDel':
            $image=$app->getTable('images')->findid($data->id);
            unlink(ROOT.'../img/articles/'.$image->name);
            $req=$app->getTable('images')->delete($data->id);
            break;

        case 'users.getId':
            $req=$app->getauth()->getUserId();
            $array=["id"=>$req];
            echo json_encode($array);
            break;

        case 'users.password.check':
            $req=$app->getTable('users')->findpass($data->id,sha1($data->password));
            echo json_encode($req);
            break;

        case 'users.username.change':
            $app->getTable('users')->update($data->id,["username"=>$data->username]);
            break;

        case 'users.pass.change':
            $app->getTable('users')->update($data->id,["password"=>sha1($data->password)]);
            break;

        default :
            break;
       }
}else{


if (isset($_POST)){
     switch($_POST['request']){

         case "admin.posts.insert" :
            $app->getTable('articles')->create(["titre"=>$_POST['titre'],"contenu"=>$_POST['content'],"category_id"=>$_POST['category']]);
            $array=['id'=>$app->getDb()->lastInsertId()];
        if(!empty($_FILES))
          {
           $files=$_FILES['images'];
           $images=array();
           foreach($files['tmp_name'] as $k=>$v)
           {
              $image=array(
                           'name'=>$files['name'][$k],
                           'tmp_name' => $files['tmp_name'][$k]
                          );
              $extension=pathinfo($image['name'],PATHINFO_EXTENSION);
              if(in_array($extension,array('jpg','jpeg','png','ico','gif')))
              {
                 $app->getTable('images')->create(["articles_id" => $array['id']]);
                 $image_id=$app->getdb()->lastInsertId();
                 $image_name=$image_id.'.'.$extension;
                 move_uploaded_file($image['tmp_name'],ROOT.'../img/articles/'.$image_name);
                 $app->getTable('images')->update($image_id,["name" => $image_name]);
              }
           }
          }

            echo json_encode($array);
            break;

         case "admin.posts.edit" :
            $app->getTable('articles')->update($_POST['id'],["titre"=>$_POST['titre'],"contenu"=>$_POST['content'],"category_id"=>$_POST['category']]);
          //Ajout des Images
        if(!empty($_FILES))
          {
              $r=[];
           $files=$_FILES['images'];
           $images=array();
           foreach($files['tmp_name'] as $k=>$v)
           {
              $image=array(
                           'name'=>$files['name'][$k],
                           'tmp_name' => $files['tmp_name'][$k]
                          );
              $extension=pathinfo($image['name'],PATHINFO_EXTENSION);
              if(in_array($extension,array('jpg','jpeg','png','ico','gif')))
              {
                 $app->getTable('images')->create(["articles_id" => $_POST['id']]);
                 $image_id=$app->getdb()->lastInsertId();
                 $image_name=$image_id.'.'.$extension;
                 move_uploaded_file($image['tmp_name'],ROOT.'../img/articles/'.$image_name);
                 $app->getTable('images')->update($image_id,["name" => $image_name]);
                 array_push($r,['id'=>$image_id,'name'=>$image_name]);
              }
           }
            echo json_encode($r);
          }
            break;

            default :
            break;
     }
}
            
            
            
}