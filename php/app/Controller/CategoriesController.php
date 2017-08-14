<?php
namespace med\app\Controller;


class CategoriesController
{

    public function all($data)
    {
        $app=\med\app\App::getInstance();
        $req= $app->getTable('categories')->all();
        return json_encode($req);
    }

    public function index($data)
    {
            $app=\med\app\App::getInstance();
            $parpage=6;
            $page=$data->page;
            $total=$app->getTable('categories')->count()->total;
            $nbpage=ceil($total/$parpage);
            $article=$app->getTable('categories')->allP(["arg1"=>$page*$parpage-$parpage,"arg2" =>$parpage]);
            $array=['art'=>$article,'nbpage'=>$nbpage];
            return json_encode($array);
    }
    
    public function add($data)
    {
        $app=\med\app\App::getInstance();
        $app->getTable('categories')->create(["titre"=>$data->title]);
    }
    
    public function edit($data)
    {
        $app=\med\app\App::getInstance();
        $app->getTable('categories')->update($data->id,["titre"=>$data->title]);
    }
    
    public function delete($data)
    {
            $app=\med\app\App::getInstance();
            $total=$app->getTable('articles')->countByCategorie($data->id)->total;
            if($total == '0'){
                $app->getTable('categories')->delete($data->id);
            }
            return json_encode($array=['num'=>$total]);
    }

}