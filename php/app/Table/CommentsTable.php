<?php
namespace med\app\Table;
use med\core\table\Table;

class CommentsTable extends Table
{
    public function find($id,$one=false)
    {
      return $this->query('
      SELECT * FROM '.$this->table.' where articles_id=?
      ORDER BY date DESC'
      ,[$id],$one);
    }

    public function deletear($id)
    {
        return $this->query('DELETE FROM '.$this->table.' WHERE articles_id=? ',[$id]);
    }

}