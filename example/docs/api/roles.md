---
method: GET
version: v2.0
---

# 角色管理 API

管理用户角色的 API 接口，展示 GET 方法标签和版本标签（v2.0）的组合。

## 请求示例

```bash
curl -X GET "https://api.example.com/roles" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 响应示例

```json
{
  "code": 200,
  "message": "获取角色列表成功",
  "data": {
    "roles": [
      {
        "id": "1",
        "name": "admin",
        "display_name": "管理员"
      },
      {
        "id": "2",
        "name": "user",
        "display_name": "普通用户"
      }
    ]
  }
}
```

## 相关接口

- [权限管理](/api/permissions) - 管理权限
- [用户管理](/api/users) - 用户管理 