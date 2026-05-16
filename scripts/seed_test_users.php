<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Facades\Hash;

// 1. Create Super Admin
$admin = User::firstOrCreate(
    ['email' => 'test-admin@rentoflow.in'],
    [
        'name' => 'Test Admin',
        'password' => Hash::make('password'),
        'role' => 'admin',
        'status' => 1
    ]
);
if (!$admin->hasRole('admin')) {
    $admin->assignRole('admin');
}

// 2. Create Landlord
$landlord = User::firstOrCreate(
    ['email' => 'test-landlord@rentoflow.in'],
    [
        'name' => 'Test Landlord',
        'password' => Hash::make('password'),
        'role' => 'landlord',
        'status' => 1
    ]
);
if (!$landlord->hasRole('landlord')) {
    $landlord->assignRole('landlord');
}

// 3. Create Tenant
$tenant = User::firstOrCreate(
    ['email' => 'test-tenant@rentoflow.in'],
    [
        'name' => 'Test Tenant',
        'password' => Hash::make('password'),
        'role' => 'tenant',
        'status' => 1
    ]
);
if (!$tenant->hasRole('tenant')) {
    $tenant->assignRole('tenant');
}

// Ensure user details for tenant to prevent the null property array offset error
UserDetail::firstOrCreate(
    ['user_id' => $tenant->id],
    ['address_info' => ['state' => 'Karnataka', 'city' => 'Bangalore', 'address' => 'Test Address']]
);

echo "Test users created successfully.\n";
