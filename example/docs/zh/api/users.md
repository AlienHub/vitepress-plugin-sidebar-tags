---
title: 用户管理
method: GET
status: stable
category: core
version: v1.2.0
---

# 用户管理

获取用户列表的 API 接口。这是一个核心功能，已经稳定发布。

## 请求

```
GET /api/users
```

## 响应

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com"
    }
  ]
}
``` 