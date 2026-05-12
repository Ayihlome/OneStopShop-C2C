<?php

declare(strict_types=1);

function registerApiRoutes(Router $router): void
{
    $router->get('/api/health', [HealthController::class, 'show']);

    foreach (['users', 'mechanics', 'vehicles', 'services', 'bookings', 'reviews', 'reports'] as $resource) {
        $router->get("/api/{$resource}", [ResourceController::class, 'index'], ['resource' => $resource]);
    }
}
