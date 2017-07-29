# EL Generator

To generate DDL, DML, Domain Class, Mapper Interface, Controller, etc.

## Tech. Stack

- [bluebird](http://bluebirdjs.com/)
- [node-csv](https://nodei.co/npm/csv/)
- [doT.js](http://olado.github.io/doT/) - the fastest and concise javascript template engine for Node.js and browsers

## CSV -> DDL

### aliases.csv

```csv
ALIAS,TYPE,SIZE,DEF. VALUE,DESC
,,,,
TEXT,nvarchar2,?,,任意文字
WORD,varchar2,?,,英数
CHAR,char,?,,定长英数
```

### tblDefs.csv

```csv
MILESTONE,DESC,NAME,TYPE,SIZE,DEF. VALUE/NULLABLE,PK,
M1,发号器,S_COUNTER,table,,,,
,发号器编码,COUNTER_CODE,CODE,,not null,1,
,发号器描述,COUNTER_DESC,DESC,,not null,,
,发号键,COUNTER_KEY,CODE,,not null,2,
,最大流水号,COUNTER_MAX,LONG,,not null,,
,当前流水号,COUNTER_VAL,LONG,,not null,,
,,,,,,,
M1,主菜单配置,S_MENU,table,,,,
,,ENABLED_,BOOL,,TRUE,,
,菜单码,MENU_CODE,CODE,,not null,1,
,菜单名,MENU_NAME,NAME,,not null,,
,菜单类型（M:菜单项、可见|C:配置项、不可见）,MENU_TYPE,FLAG,,'M',,
,菜单层级(一级菜单为1),MENU_LVL,DEC1,,not null,,
,同级菜单显示顺序,MENU_SEQ,SEQ,,not null,,
,画面前端路由,MENU_URI,REQ,,,,
,API访问路径(支持Ant路径表达式),MENU_API,REQ,,,,
,菜单图标(fontawesome),MENU_ICO,CODE,,,,
```
