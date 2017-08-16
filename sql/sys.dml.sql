TRUNCATE TABLE S_MENU;
INSERT INTO S_MENU (MENU_NAME,MENU_CODE,MENU_TYPE,MENU_LVL,MENU_SEQ,MENU_URI,MENU_API,MENU_ICO)
SELECT '系统','SM','M',1,1,'','/sm/**','wrench' FROM DUAL
UNION ALL SELECT '管理用户维护','SM_USERS','M',2,1,'#sm/users','/sm/users/**','wrench' FROM DUAL
UNION ALL SELECT '系统角色维护','SM_ROLES','M',2,2,'#sm/roles','/sm/roles/**','wrench' FROM DUAL
UNION ALL SELECT '系统配置维护','SM_CONF','X',2,3,'#sm/conf','/sm/conf','wrench' FROM DUAL
UNION ALL SELECT '帮助信息维护','SM_HELPS','X',2,4,'#sm/helps','/sm/helps/**','wrench' FROM DUAL
UNION ALL SELECT '维护','OP','M',1,2,'','/op/**','cog' FROM DUAL
UNION ALL SELECT '产品图片维护','OP_ITEM_PICS','M',2,1,'#op/item_pics','/op/item_pics/**','cog' FROM DUAL
UNION ALL SELECT '配套商品维护','OP_ITEM_AUXS','M',2,2,'#op/item_auxs','/op/item_auxs/**','cog' FROM DUAL
UNION ALL SELECT '替代商品维护','OP_ITEM_SUBS','M',2,3,'#op/item_subs','/op/item_subs/**','cog' FROM DUAL
UNION ALL SELECT '积分换购维护','OP_GIFTS','X',2,4,'#op/gifts','/op/gifts/**','cog' FROM DUAL
UNION ALL SELECT '公司资料维护','OP_ASSETS','X',2,5,'#op/assets','/op/assets/**','cog' FROM DUAL
UNION ALL SELECT '公告消息维护','OP_ANNOUNCES','X',2,6,'#op/announces','/op/announces/**','cog' FROM DUAL
UNION ALL SELECT '首页图片维护','OP_PICS','X',2,7,'#op/pics','/op/pics/**','cog' FROM DUAL
UNION ALL SELECT '客户用户维护','OP_CUST_USERS','M',2,8,'#op/cust_users','/op/cust_users/**','cog' FROM DUAL
UNION ALL SELECT '第三方物流维护','OP_DELIVERS','M',2,9,'#op/deliveries','/op/deliveries/**','cog' FROM DUAL
UNION ALL SELECT '管辖区域维护','OP_REGIONS','X',2,10,'#op/regions','/op/regions/**','cog' FROM DUAL
UNION ALL SELECT '查询','QY','M',1,3,'','/qy/**','search' FROM DUAL
UNION ALL SELECT '订单查询','QY_ORDERS','M',2,1,'#qy/orders','/qy/orders/**','search' FROM DUAL
UNION ALL SELECT '客户查询','QY_CUSTS','M',2,2,'#qy/custs','/qy/custs/**','search' FROM DUAL
UNION ALL SELECT '产品查询','QY_ITEMS','M',2,3,'#qy/items','/qy/items/**','search' FROM DUAL
UNION ALL SELECT '面价、折扣查询','QY_PRICES','M',2,4,'#qy/prices','/qy/prices/**','search' FROM DUAL
UNION ALL SELECT '缺货登记','QY_LACKS','M',2,5,'#qy/lacks','/qy/lacks/**','search' FROM DUAL
UNION ALL SELECT '非标查询','QY_NON_STDS','X',2,6,'#qy/non_stds','/qy/non_stds/**','search' FROM DUAL
UNION ALL SELECT '审批','EA','X',1,4,'','/ea/**','legal' FROM DUAL
UNION ALL SELECT '退货申请审批','EA_RETURNS','X',2,1,'#ea/return','/ea/returns/**','legal' FROM DUAL
UNION ALL SELECT '订单取消审批','EA_CANCELS','X',2,2,'#ea/cancel','/ea/cancels/**','legal' FROM DUAL
;
COMMIT;

TRUNCATE TABLE S_ROLE;
INSERT INTO S_ROLE (ROLE_NAME,ROLE_CODE,ROLE_TYPE,ROLE_DESC)
SELECT '系统管理员','SM','B','系统设置、帮助维护' FROM DUAL
UNION ALL SELECT '总公司运营','OP_HO','B','查询、图片维护、产品图片维护、公司资料维护、公告维护、积分换购维护、非标申请查询' FROM DUAL
UNION ALL SELECT '分公司运营','OP_BO','B','产品查询、订单查询、客户用户维护、管辖区域维护' FROM DUAL
UNION ALL SELECT '分公司审批','EA_BO','B','订单取消审批、退货申请审批' FROM DUAL
;
COMMIT;

TRUNCATE TABLE S_COUNTER;
INSERT INTO S_COUNTER (COUNTER_CODE,COUNTER_DESC,COUNTER_KEY,COUNTER_MAX,COUNTER_VAL)
SELECT 'LOCK','发号同步锁','SYNC',0,0 FROM DUAL
;
COMMIT;

TRUNCATE TABLE S_MGMT_USER;
INSERT INTO S_MGMT_USER (ID,EMAIL,PHONE,PASSWORD,SALT,USER_NAME,USER_TYPE)
SELECT 0,'neopan@126.com','18912341234','da4a532acdf243836a95ba7f8d8c3c397c3303e6c1eeeee0b062053536bbc695','7IbJJFCrQu2VYmWh','Neo Pan','S' FROM DUAL
;
COMMIT;

TRUNCATE TABLE S_MALL_USER;
INSERT INTO S_MALL_USER (ID,EMAIL,PHONE,PASSWORD,SALT,USER_NAME,USER_TYPE)
SELECT 0,'neopan@126.com','18912341234','da4a532acdf243836a95ba7f8d8c3c397c3303e6c1eeeee0b062053536bbc695','7IbJJFCrQu2VYmWh','Neo Pan','S' FROM DUAL
;
COMMIT;

