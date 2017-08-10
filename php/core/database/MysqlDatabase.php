<?php
namespace med\core\database;
use \PDO;

/**
 * Class Database
 * permet d'établir la connection la base de données facilement et simplement
**/
class MysqlDatabase extends Database{

    /**
     * @var[string]
     * le nom de la BDD
    **/
    private $dbname;

    /**
     * le nom d'utilisateur
     *
     * @var [string]
    **/
    private $username;

    /**
     * Le mot de passe
     *
     * @var [string]
    **/
    private $password;

    /**
     *
     * @var [string]
    **/
    private $host;

    /**
     * variable du connection
     *
     * @var [objet]
    **/
    public $pdo;
    private $instance;


    /**
     * @param $dbname string
     * @param $username string
     * @param $password string
     * @param $host string
    **/
    public function __construct($host,$dbname,$username,$password)
    {
        $this->dbname=$dbname;
        $this->username=$username;
        $this->password=$password;
        $this->host=$host;
    }


    /**
     * @return objet 
    **/
    private function getPDO()
    {
        if(is_null($this->pdo))
        {
           $pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname","$this->username","$this->password");
           $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
           $this->pdo=$pdo;
        }
        return $this->pdo;
    }


    /**
     * @param $statement string
     * @return $data
     */
    public function query($statement,$attribute=null,$class_name=null,$one=false)
    {
        $req=$this->getPDO()->prepare($statement);
        $req->execute($attribute);
        if(
            strpos($statement,'UPDATE')===0||
            strpos($statement,'DELETE')===0||
            strpos($statement,'INSERT')===0
          )
          {
              return $req;
          }
        if(!is_null($class_name))
        {
            $req->setFetchMode(PDO::FETCH_CLASS,$class_name);
        }else
        {
             $req->setFetchMode(PDO::FETCH_OBJ);
        }
        if($one)
        {
            $data=$req->fetch();
        }else
        {
            $data=$req->fetchAll();
        }
        return $data;
    }


    /**
     * @param $value
     * @return string 
    **/
    public function quote($value)
    {
            return $this->getPDO()->quote($value);
    }

    public function lastInsertId()
    {
        return $this->getPDO()->lastInsertId();
    }

}