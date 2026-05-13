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

    if ($action === 'register') {
        $required = ['first_name', 'last_name', 'email', 'password'];
        foreach ($required as $field) {
            if (empty($body[$field])) {
                Response::json(['error' => "Field '$field' is required"], 400);
            }
        }

        $stmt = $pdo->prepare('SELECT id FROM accounts WHERE email = :email');
        $stmt->execute([':email' => $body['email']]);
        if ($stmt->fetch()) {
            Response::json(['error' => 'Email already in use'], 409);
        }

        $hash = password_hash($body['password'], PASSWORD_BCRYPT);

        $pdo->beginTransaction();
        $stmt = $pdo->prepare('
            INSERT INTO accounts (first_name, last_name, email, password_hash, phone_number, city, town)
            VALUES (:fn, :ln, :email, :hash, :phone, :city, :town)
            RETURNING id
        ');
        $stmt->execute([
            ':fn'    => $body['first_name'],
            ':ln'    => $body['last_name'],
            ':email' => $body['email'],
            ':hash'  => $hash,
            ':phone' => $body['phone_number'] ?? null,
            ':city'  => $body['city'] ?? null,
            ':town'  => $body['town'] ?? null,
        ]);
        $accountId = $stmt->fetchColumn();

        $pdo->prepare('
            INSERT INTO mechanics (account_id, bio, years_experience)
            VALUES (:id, :bio, :exp)
        ')->execute([
            ':id'  => $accountId,
            ':bio' => $body['bio'] ?? null,
            ':exp' => isset($body['years_experience']) ? (int)$body['years_experience'] : null,
        ]);

        $pdo->commit();
        Response::json(['message' => 'Mechanic registered', 'account_id' => $accountId], 201);

    } elseif ($action === 'login') {
        if (empty($body['email']) || empty($body['password'])) {
            Response::json(['error' => 'Email and password are required'], 400);
        }

        $stmt = $pdo->prepare('
            SELECT a.* FROM accounts a
            INNER JOIN mechanics m ON m.account_id = a.id
            WHERE a.email = :email
        ');
        $stmt->execute([':email' => $body['email']]);
        $account = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$account || !password_verify($body['password'], $account['password_hash'])) {
            Response::json(['error' => 'Invalid credentials'], 401);
        }
        if ($account['status'] === 'suspended') {
            Response::json(['error' => 'Account suspended'], 403);
        }

        Response::json([
            'message'    => 'Login successful',
            'account_id' => $account['id'],
            'name'       => $account['first_name'] . ' ' . $account['last_name'],
        ]);

    } else {
        Response::json(['error' => 'Invalid action'], 400);
    }

} catch (PDOException $e) {
    error_log($e->getMessage());
    Response::json(['error' => 'Database error'], 500);
}