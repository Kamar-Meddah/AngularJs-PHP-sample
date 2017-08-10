<?php
namespace med\core\table;
use \med\app\App;
use \med\core\database\Database;

class Table
{
    protected $table;
    protected $db;

    public function __construct(\med\core\database\Database $db)
    {
        $this->db=$db;
        if(is_null($this->table))
        {
            $class_name=explode('\\',get_class($this));
            $class_name=end($class_name);
            $this->table=strtolower(str_replace('Table','',$class_name));
        }
    }

    public function all()
    {
        return $this->query('SELECT * FROM '.$this->table.'');
    }

    public function extract($key,$value)
    {
        $records=$this->all();
        $return=[];
        foreach($records as $k)
        {
            $return[$k->$key]=$k->$value;
        }
        return $return;
    }

    public function query($statement,$attribute=null,$one=false)
    {
        return $this->db->query(
                                $statement,
                                $attribute,null,
                                $one
                                );
    }

    public function find($id,$one=true)
    {
      return $this->query('
      SELECT * FROM '.$this->table.' where id=?',[$id],$one);
    }

    public function count()
    {
      return $this->query('
      SELECT COUNT(id) AS total FROM '.$this->table,null,true);
    }

    public function update($id,$fields)
    {
        $sql_parts=[];
        foreach ($fields as $k => $v)
        {
            $sql_parts[]="$k = ?";
            $attribute[]=$v;
        }
        $attribute[]=$id;
        $sql_part=implode(',',$sql_parts);
      return $this->query('UPDATE '.$this->table.' SET '.$sql_part." where id=? ",$attribute,true);
    }

    public function create($fields)
    {
        $sql_parts=[];
        foreach ($fields as $k => $v)
        {
            $sql_parts[]="$k = ?";
            $attribute[]=$v;
        }
        $sql_part=implode(',',$sql_parts);
        return $this->query('INSERT INTO '.$this->table.' SET '.$sql_part." ",$attribute);
    }

    public function delete($id)
    {
        return $this->query('DELETE FROM '.$this->table.' WHERE id=? ',[$id]);
    }
}