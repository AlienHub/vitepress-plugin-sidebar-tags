---
method: GET
status: stable
version: v1.2.0
category: core
---

# User Management API

This API allows you to manage user information in the system.

## Features

- ✅ User query and listing
- ✅ Permission verification
- ✅ Data filtering and sorting
- ✅ Pagination support

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Records per page (default: 10) |
| `sort` | string | No | Sort field (default: created_at) |
| `order` | string | No | Sort order (asc/desc, default: desc) |

## Response Example

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 500 | Internal Server Error | 