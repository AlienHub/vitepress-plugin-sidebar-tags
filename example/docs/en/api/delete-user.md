---
method: DELETE
status: experimental
version: v2.0.0-alpha
category: experimental
---

# Delete User API

This API allows you to delete users from the system.

## Features

- ✅ Soft delete support
- ✅ Permission verification
- ✅ Cascade deletion handling
- ✅ Audit trail logging

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | User ID (path parameter) |
| `force` | boolean | No | Force permanent deletion (default: false) |
| `reason` | string | No | Deletion reason |

## Request Example

```bash
DELETE /api/users/123
```

Query parameters:
```
?force=false&reason=Account%20closure%20request
```

## Response Example

```json
{
  "code": 200,
  "message": "User deleted successfully",
  "data": {
    "id": 123,
    "deleted_at": "2023-01-01T00:00:00Z",
    "is_permanent": false
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Deleted Successfully |
| 400 | Bad Request |
| 403 | Forbidden |
| 404 | User Not Found |
| 409 | Conflict (user has dependencies) |
| 500 | Internal Server Error |

## Important Notes

⚠️ **Warning**: This API is in experimental phase. Use with caution in production environments.

- Soft delete is enabled by default
- Use `force=true` for permanent deletion
- Admin permissions required for force deletion 