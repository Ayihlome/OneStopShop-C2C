<?php

declare(strict_types=1);

class ResourceController
{
    public function index(array $params = []): void
    {
        $service = new ResourceService();
        Response::json($service->placeholder($params['resource'] ?? 'resource'));
    }
}
