---
title: 更新用户
method: PUT
status: beta
category: advanced
version: v1.1.0
---

# 更新用户

更新用户信息的 API 接口。

## 请求

```
PUT /api/users/:id
```

## 请求参数

```json
{
  "name": "李四",
  "email": "lisi@example.com"
}
```

## 响应

```json
{
  "code": 200,
  "message": "用户更新成功",
  "data": {
    "id": 1,
    "name": "李四",
    "email": "lisi@example.com"
  }
}
``` 