<?php

namespace med\app;
use \med\core\database\MysqlDatabase;

/**
 * class principale de notre application
 */
class App
{
    public $titre="Home";
    private static $_instance;
    private $db_instance;
    private $auth_instance;
    private $flash_instance;

    private function __construct(){}

    public static function getInstance()
    {
        if(is_null(self::$_instance))
        {
            self::$_instance=new App();
        }
        return self::$_instance;
    }

    public function getTable($name)
    {
        $class_name='\\med\\app\\table\\'.ucfirst($name).'Table';
        return new $class_name($this->getdb());
    }

    public function getdb()
    {
         $config=\med\core\Config::getInstance('config/config.php');
        if(is_null($this->db_instance))
        {
            $this->db_instance=new MysqlDatabase($config->get("db_host"),$config->get("db_name"),$config->get("db_user"),$config->get("db_pass"));
        }
        return $this->db_instance;
    }

    public function quote()
    {
      return $this->getdb()->quote();
    }

    public function getauth()
    {
        if(is_null($this->auth_instance))
        {
            $this->auth_instance=new \med\core\Auth\DBAuth($this->getdb());
        }
        return $this->auth_instance;
    }


}