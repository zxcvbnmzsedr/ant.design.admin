# 基于Ant.Design的后台权限管理
## 简介
基于Spring Boot,SpringMvc,Spring Data Rest,Ant.design的后台权限管理

## [前端](https://github.com/zxcvbnmzsedr/ant.design.admin)
 前端登陆界面参照 Ant-Admin https://github.com/zuiidea/antd-admin
## [后端](https://github.com/zxcvbnmzsedr/ant.design.admin.server)
 - 所用技术  
    使用Spring Boot 快速搭建  
    使用Redis缓存用户Token  
    使用Spring Data Rest 构造Rest风格的接口
 - 权限设计  
    权限表有四张：用户表，资源表，权限表，角色表  
    关联关系表有三张：用户表-角色表（多对多） 角色表-权限表（多对多） 权限表-资源表（多对一）  
    根据REST的风格，POST、DELETE、PUT、GET四种请求，所对应的是对资源的增删改查，体现在数据库里面
    就是 权限-资源 多对一的关系  
    校验过程：用户先请求一个Token，之后的请求都要附带Token信息，
    如果Token没有过期，则判断用户的角色是否对资源有对应的操作  
 
    后端权限表设计参照 https://cnodejs.org/topic/551802d3687c387d2f5b2906


## 效果图
![Alt text](https://github.com/zxcvbnmzsedr/ant.design.admin/blob/master/view/login.png?raw=true)
![Alt text](https://github.com/zxcvbnmzsedr/ant.design.admin/blob/master/view/users.png?raw=true)
![Alt text](https://github.com/zxcvbnmzsedr/ant.design.admin/blob/master/view/source.png?raw=true)
![Alt text](https://github.com/zxcvbnmzsedr/ant.design.admin/blob/master/view/role.png?raw=true)