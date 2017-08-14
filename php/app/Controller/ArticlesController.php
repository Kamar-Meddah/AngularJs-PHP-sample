<?php
namespace med\app\Controller;


class ArticlesController
{

    public function index($data)
    {
            $app=\med\app\App::getInstance();
            $parpage=6;
            $page=$data->page;
            $total=$app->getTable('articles')->count()->total;
            $nbpage=ceil($total/$parpage);
            $article=$app->getTable('articles')->all(["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
            $array=['art'=>$article,'nbpage'=>$nbpage];
            return json_encode($array);
    }

    public function show($data){
           $app=\med\app\App::getInstance();
           $req= $app->getTable('articles')->find($data->id);
           return json_encode($req);
    }
    


    public function search($data)
    {
           $app=\med\app\App::getInstance();
           $parpage=6;
           $page=$data->page;
           $total=$app->getTable('articles')->countsearch($data->search)->total;
           $nbpage=ceil($total/$parpage);
           $article=$app->getTable('articles')->search($data->search,["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
           $array=['art'=>$article,'nbpage'=>$nbpage];
           return json_encode($array);  
    }
    
    public function byCategorie($data)
    {
            $app=\med\app\App::getInstance();
            $parpage=6;
            $page=$data->page;
            $total=$app->getTable('articles')->countByCategorie($data->category_id)->total;
            $nbpage=ceil($total/$parpage);
            $article=$app->getTable('articles')->lastByCategorie($data->category_id,["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
            $array=['art'=>$article,'nbpage'=>$nbpage];
            return json_encode($array);
        
    }

    public function delete($data)
    {
           $app=\med\app\App::getInstance();
           $images=$app->getTable('images')->find($data->id);
           foreach ($images as $image)
           {
           unlink(ROOT.'../img/articles/'.$image->name);
           }
            $image=$app->getTable('images')->deleteWithArticle($data->id);
            $app->getTable('comments')->deletear($data->id);
            $app->getTable('articles')->delete($data->id);   
    }

    public function add($data)
    {
        $app=\med\app\App::getInstance();
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
            return json_encode($array);
    }//end add()

    public function edit($data)
    {
        $app=\med\app\App::getInstance();
        $app->getTable('articles')->update($_POST['id'],["titre"=>$_POST['titre'],"contenu"=>$_POST['content'],"category_id"=>$_POST['category']]);
         $r=[];
        //Ajout des Images
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
                 $app->getTable('images')->create(["articles_id" => $_POST['id']]);
                 $image_id=$app->getdb()->lastInsertId();
                 $image_name=$image_id.'.'.$extension;
                 move_uploaded_file($image['tmp_name'],ROOT.'../img/articles/'.$image_name);
                 $app->getTable('images')->update($image_id,["name" => $image_name]);
                 array_push($r,['id'=>$image_id,'name'=>$image_name]);
              }
           }
          }
        return json_encode($r);
    }

}