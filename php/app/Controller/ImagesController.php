<?php
namespace med\app\Controller;


class ImagesController
{

    public function find($data)
    {
        $app=\med\app\App::getInstance();
        $req=$app->getTable('images')->find($data->id);
        return json_encode($req);
    }
    
    public function delete($data)
    {
            $app=\med\app\App::getInstance();
            $image=$app->getTable('images')->findid($data->id);
            unlink(ROOT.'../img/articles/'.$image->name);
            $app->getTable('images')->delete($data->id);
    }

}