<?php

declare(strict_types=1);

class ResourceService
{
    public function placeholder(string $resource): array
    {
        return [
            'resource' => $resource,
            'data' => [],
            'message' => "The {$resource} endpoint is scaffolded and ready for MySQL-backed implementation.",
        ];
    }
}
