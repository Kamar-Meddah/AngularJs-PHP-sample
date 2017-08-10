<?php
namespace med\app\Table;
use med\core\table\Table;

class UsersTable extends Table
{
    public function findpass($id,$pass)
    {
        return $this->query("SELECT * FROM ".$this->table." WHERE id=? AND password=?",[$id,$pass],true);
    }
}