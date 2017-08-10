<?php
namespace med\app\Table;
use med\core\table\Table;

class CategoriesTable extends Table
{
    public function allP($arg=[])
    {
        extract($arg);
        return $this->query("SELECT * FROM ".$this->table." ORDER BY titre LIMIT $arg1,$arg2");
    }
}