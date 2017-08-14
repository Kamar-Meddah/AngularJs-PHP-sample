<?php
namespace med\app\Controller;


class CommentsController
{

    public function find($data)
    {
        $app=\med\app\App::getInstance();
        $req= $app->getTable('comments')->find($data->id);
        return json_encode($req);
    }
    
    public function add($data)
    {
        $app=\med\app\App::getInstance();
        $app->getTable('comments')->create(['name'=>$data->name,'content'=>$data->comment,'articles_id'=>$data->postId]);
    }
    
    public function delete($data)
    {
        $app=\med\app\App::getInstance();
        $app->getTable('comments')->delete($data->id);
    }

}