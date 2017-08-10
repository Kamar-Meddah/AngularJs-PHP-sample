<?php
namespace med;

/**
 * Class Autoloader
 * permet le chargement dynamique des class
**/
class Autoloader
{
    /**
     * registrer un Autoloader
    **/
    static function register()
    {
        spl_autoload_register(array(__CLASS__,"autoload"));
    }

    /**
     * l'Autoloader
     *
     * @param [string] $class
     * @return void
    **/
    static function autoload($class)
    {
        if(strpos($class,__NAMESPACE__.'\\') === 0)
        {
            $class=str_replace(__NAMESPACE__.'\\','',$class);
            $class=str_replace('\\','/',$class);
          
            require $class.'.php';
        }
    }
}