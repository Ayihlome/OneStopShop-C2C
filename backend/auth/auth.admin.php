<?php
declare(strict_types=1);

require_once __DIR__ . '/../utils/Response.php';

header('Content-Type: application/json');

$envFile = __DIR__ . '/../../.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) continue;
        [$key, $val] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($val);
    }
}

function getDbConnection(): PDO {
    $dsn = sprintf(
        'pgsql:host=%s;port=%s;dbname=%s',
        $_ENV['DB_HOST'] ?? 'localhost',
        $_ENV['DB_PORT'] ?? '5432',
        $_ENV['DB_NAME'] ?? 'onestopshop'
    );
    $pdo = new PDO($dsn, $_ENV['DB_USER'] ?? 'postgres', $_ENV['DB_PASSWORD'] ?? '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}

$body   = json_decode(file_get_contents('php://input'), true);
$action = $body['action'] ?? '';

try {
    $pdo = getDbConnection();

    if ($action === 'login') {
        if (empty($body['email']) || empty($body['password'])) {
            Response::json(['error' => 'Email and password are required'], 400);
        }

        $stmt = $pdo->prepare('SELECT * FROM admins WHERE email = :email');
        $stmt->execute([':email' => $body['email']]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$admin || !password_verify($body['password'], $admin['password_hash'])) {
            Response::json(['error' => 'Invalid credentials'], 401);
        }

        Response::json([
            'message'  => 'Login successful',
            'admin_id' => $admin['id'],
            'username' => $admin['username'],
            'role'     => $admin['role'],
        ]);

    } else {
        Response::json(['error' => 'Invalid action. Only login is supported for admins.'], 400);
    }

} catch (PDOException $e) {
    error_log($e->getMessage());
    Response::json(['error' => 'Database error'], 500);
}