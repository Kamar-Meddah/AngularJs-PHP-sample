<?php
namespace med\app\Table;
use med\core\table\Table;

class ImagesTable extends Table
{

    public function find($id,$one=false)
    {
        return $this->query("SELECT * FROM ".$this->table." WHERE articles_id=? ",[$id],$one);
    }

    public function findid($id)
    {
        return $this->query("SELECT * FROM ".$this->table." WHERE id=? ",[$id],true);
    }

    public function deleteWithArticle($id)
    {
        return $this->query('DELETE FROM '.$this->table.' WHERE articles_id=? ',[$id]);
    }

}