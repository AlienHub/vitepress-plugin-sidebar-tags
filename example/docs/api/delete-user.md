---
method: DELETE
status: experimental
---

# 删除用户 API

删除用户的 API 接口，展示 DELETE 方法标签和 EXPERIMENTAL 状态标签。

## 请求示例

```bash
curl -X DELETE "https://api.example.com/users/123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 响应示例

```json
{
  "code": 200,
  "message": "用户删除成功",
  "data": {
    "id": "123",
    "deleted": true
  }
}
```

## ⚠️ 注意事项

此接口为实验性功能，删除操作不可逆，请谨慎使用。

## 相关接口

- [用户管理](/api/users) - 获取用户列表
- [创建用户](/api/create-user) - 创建新用户
- [更新用户](/api/update-user) - 更新用户信息 