<?php

declare(strict_types=1);

class HealthController
{
    public function show(): void
    {
        Response::json([
            'status' => 'ok',
            'service' => 'onestopshop-c2c-api',
            'timestamp' => gmdate('c'),
        ]);
    }
}
