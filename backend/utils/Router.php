<?php

declare(strict_types=1);

class Router
{
    private array $routes = [];

    public function get(string $path, array $handler, array $params = []): void
    {
        $this->routes['GET'][$this->normalize($path)] = [
            'handler' => $handler,
            'params' => $params,
        ];
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = $this->normalize(parse_url($uri, PHP_URL_PATH) ?: '/');
        $route = $this->routes[$method][$path] ?? null;

        if ($route === null) {
            Response::json([
                'error' => 'Not Found',
                'path' => $path,
            ], 404);
        }

        [$class, $action] = $route['handler'];
        $controller = new $class();
        if ($route['params'] === []) {
            $controller->{$action}();
            return;
        }

        $controller->{$action}($route['params']);
    }

    private function normalize(string $path): string
    {
        $path = '/' . trim($path, '/');
        return $path === '//' ? '/' : $path;
    }
}
