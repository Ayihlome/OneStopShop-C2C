<?php

declare(strict_types=1);

class BaseModel
{
    protected ?PDO $db = null;

    protected function db(): PDO
    {
        if ($this->db === null) {
            $this->db = database();
        }

        return $this->db;
    }
}
