---
method: PUT
status: beta
version: v1.1.0
category: advanced
---

# Update User API

This API allows you to update existing user information in the system.

## Features

- ✅ Partial updates supported
- ✅ Email uniqueness validation
- ✅ Permission verification
- ✅ Audit trail logging

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | User ID (path parameter) |
| `name` | string | No | User name (2-50 characters) |
| `email` | string | No | Email address (must be unique) |
| `password` | string | No | New password (min 8 characters) |
| `role` | string | No | User role |

## Request Example

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "admin"
}
```

## Response Example

```json
{
  "code": 200,
  "message": "User updated successfully",
  "data": {
    "id": 123,
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "admin",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Updated Successfully |
| 400 | Bad Request |
| 404 | User Not Found |
| 409 | Email Already Exists |
| 422 | Validation Error |
| 500 | Internal Server Error | 