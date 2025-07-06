---
title: 创建用户
method: POST
version: v1.3.0
---

# 创建用户

创建新用户的 API 接口。

## 请求

```
POST /api/users
```

## 请求参数

```json
{
  "name": "张三",
  "email": "zhangsan@example.com"
}
```

## 响应

```json
{
  "code": 200,
  "message": "用户创建成功",
  "data": {
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com"
  }
}
``` 