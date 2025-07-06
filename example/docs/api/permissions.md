---
method: PATCH
status: beta
---

# 权限管理 API

管理系统权限的 API 接口，展示 PATCH 方法标签和 BETA 状态标签。

## 请求示例

```bash
curl -X PATCH "https://api.example.com/permissions/perm_123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true
  }'
```

## 响应示例

```json
{
  "code": 200,
  "message": "权限更新成功",
  "data": {
    "id": "perm_123",
    "name": "user:write",
    "enabled": true
  }
}
```

## 相关接口

- [角色管理](/api/roles) - 管理角色
- [用户管理](/api/users) - 用户管理 