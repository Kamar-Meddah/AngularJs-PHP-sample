<?php
namespace med\core\Auth;
use \med\core\database\Database;

class DBAuth
{
    private $db;

    /**
     * Undocumented function
     *
     * @param Database $db
    **/
    public function __construct(Database $db)
    {
        $this->db=$db;
    }

    /**
     * Undocumented function
     *
     * @param [type] $username
     * @param [type] $password
     * @return boolean
    **/
    public function login($username,$password)
    {
        $user=$this->db->query("
                                SELECT * FROM users WHERE username = ? AND password = ?",
                                [$username,sha1($password)],
                                null,
                                true
                                );
        if($user)
        {
                setcookie("auth",$user->id,time()+60*60*24);
                return true;
        }
        return false;
    }

    public function logged()
    {
        return isset($_COOKIE['auth']);
    }

    public function getUserId()
    {
        if($this->logged())
        {
            return $_COOKIE['auth'];
        }
    }

    public function logout()
    {
        setcookie('auth',null);
    }
}