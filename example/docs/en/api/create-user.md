---
method: GET
status: stable
version: v1.3.0
category: core
---

# Create User API

This API allows you to create new users in the system.

## Features

- ✅ User creation with validation
- ✅ Email uniqueness check
- ✅ Password encryption
- ✅ Return user information

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | User name (2-50 characters) |
| `email` | string | Yes | Email address (must be unique) |
| `password` | string | Yes | Password (min 8 characters) |
| `role` | string | No | User role (default: user) |

## Request Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"
}
```

## Response Example

```json
{
  "code": 201,
  "message": "User created successfully",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 201 | Created Successfully |
| 400 | Bad Request |
| 409 | Email Already Exists |
| 422 | Validation Error |
| 500 | Internal Server Error | 