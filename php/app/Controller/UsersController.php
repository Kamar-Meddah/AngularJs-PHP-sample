<?php
namespace med\app\Controller;
use \med\app\App;

class UsersController
{


    public function login($data)
    { 
        $app=\med\app\App::getInstance();
        return json_encode($app->getauth()->login($data->username,$data->password));
    }

    public function logged($data)
    { 
        $app=\med\app\App::getInstance();
        return json_encode($app->getauth()->logged());
    }

    public function logout($data)
    {
        $app=\med\app\App::getInstance();
        $app->getauth()->logout();
    }

    public function getUserId($data)
    {
            $app=\med\app\App::getInstance();
            $req=$app->getauth()->getUserId();
            $array=["id"=>$req];
            return json_encode($array);
    }

    public function passwordCheck($data)
    {
            $app=\med\app\App::getInstance();
            $req=$app->getTable('users')->findpass($data->id,sha1($data->password));
            return json_encode($req);
    }

    public function usernameChange($data)
    {
            $app=\med\app\App::getInstance();
            $app->getTable('users')->update($data->id,["username"=>$data->username]);
    }

    public function passwordChange($data)
    {
            $app=\med\app\App::getInstance();
            $app->getTable('users')->update($data->id,["password"=>sha1($data->password)]);
    }


}