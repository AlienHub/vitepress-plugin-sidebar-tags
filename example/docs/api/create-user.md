---
method: POST
---

# 创建用户 API

创建新用户的 API 接口，展示 POST 方法标签。

## 请求示例

```bash
curl -X POST "https://api.example.com/users" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "name": "John Doe"
  }'
```

## 响应示例

```json
{
  "code": 201,
  "message": "用户创建成功",
  "data": {
    "id": "456",
    "username": "john_doe",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

## 相关接口

- [用户管理](/api/users) - 获取用户列表
- [更新用户](/api/update-user) - 更新用户信息
- [删除用户](/api/delete-user) - 删除用户 