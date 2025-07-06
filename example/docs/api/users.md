---
method: GET
---

# 用户管理 API

获取用户列表的 API 接口，展示基础的 GET 方法标签。

## 请求示例

```bash
curl -X GET "https://api.example.com/users" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 响应示例

```json
{
  "code": 200,
  "message": "获取用户列表成功",
  "data": {
    "users": [
      {
        "id": "123",
        "username": "john_doe",
        "email": "john@example.com",
        "name": "John Doe"
      }
    ]
  }
}
```

## 相关接口

- [创建用户](/api/create-user) - 创建新用户
- [更新用户](/api/update-user) - 更新用户信息
- [删除用户](/api/delete-user) - 删除用户 