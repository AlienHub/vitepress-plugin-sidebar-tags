---
method: PUT
update: updated
---

# 更新用户 API

更新用户信息的 API 接口，展示 PUT 方法标签和 UPDATED 更新标签的组合效果。

## 请求示例

```bash
curl -X PUT "https://api.example.com/users/123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Jr."
  }'
```

## 响应示例

```json
{
  "code": 200,
  "message": "用户更新成功",
  "data": {
    "id": "123",
    "username": "john_doe",
    "name": "John Doe Jr."
  }
}
```

## 相关接口

- [用户管理](/api/users) - 获取用户列表
- [创建用户](/api/create-user) - 创建新用户
- [删除用户](/api/delete-user) - 删除用户 