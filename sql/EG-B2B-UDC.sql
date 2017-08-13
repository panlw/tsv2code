-- V+C/D | 5341 | M_UDC_BASE
select
  DRUPMJ JD, DRSY DOMAIN_CODE, DRRT UDC_CODE, DRKY VAL_CODE
, DRDL01 VAL_DESC, DRDL02 VAL_DESC2, DRSPHD VAL_CODE2/*特殊处理码*/, DRHRDC VAL_HARD/*硬编码？*/
from CRPCTL.F0005@ERP
where  (DRSY='58E ' and DRRT='ML' )    --客户等级
    or (DRSY='01  ' and DRRT='12' )    --客户行业大类
    or (DRSY='01  ' and DRRT='17' )    --客户行业中类
    or (DRSY='E3  ' and DRRT='KL' )    --客户行业小类
    or (DRSY='58E ' and DRRT='AF' )    --客户状态
    or (DRSY='58L ' and DRRT='MK' )    --客户来源
    or (DRSY='58H ' and DRRT='IT' )    --增票标识
    or (DRSY='01  ' and DRRT='30' )    --开票类型
    or (DRSY='01  ' and DRRT='LP' )    --用户语言
    or (DRSY='41  ' and DRRT='P1' )    --产品大类
    or (DRSY='41  ' and DRRT='P2' )    --产品中类
    or (DRSY='41  ' and DRRT='S2' )    --产品小类
    or (DRSY='40  ' and DRRT='PI' )    --项目价格组
    or (DRSY='41  ' and DRRT='10' )    --材质
    or (DRSY='41  ' and DRRT='09' )    --牙别
    or (DRSY='00  ' and DRRT='UM' )    --计量单位
    or (DRSY='E6  ' and DRRT='04' )    --面价类型
    or (DRSY='00  ' and DRRT='CN' )    --国家
    or (DRSY='58H ' and DRRT='PR' )    --省份
    or (DRSY='58H ' and DRRT='CT' )    --城市
    or (DRSY='58H ' and DRRT='PT' )    --区县
    or (DRSY='40  ' and DRRT='IU' )    --订单类型
    or (DRSY='40  ' and DRRT='AT' )    --订单状态
    or (DRSY='58E ' and DRRT='OT' )    --订单类别
    or (DRSY='00  ' and DRRT='PY' )    --支付方式
    or (DRSY='E3  ' and DRRT='DC' )    --支付状态
    or (DRSY='E3  ' and DRRT='TY' )    --退货原因
    or (DRSY='58H ' and DRRT='SM' )    --配送方式

-- V+C/D | 3839 | M_UDC_DESC
select
  DRSY DOMAIN_CODE, DRRT UDC_CODE, DRKY VAL_CODE
, DRDL01 VAL_DESC, DRDL02 VAL_DESC2
from CRPCTL.F0005D@ERP
-- where 过滤同 M_UDC_BASE

-- V | 同 V_UDC_BASE | V_UDC
select t.JD, t.DOMAIN_CODE, t.UDC_CODE, t.VAL_CODE
, NVL(t.VAL_DESC, d.VAL_DESC) VAL_DESC
, NVL(t.VAL_DESC2, d.VAL_DESC2) VAL_DESC2
, t.VAL_ARG, t.VAL_FLG
from M_UDC_BASE t
left join M_UDC_DESC d on d.DOMAIN_CODE=t.DOMAIN_CODE and d.UDC_CODE=t.UDC_CODE and d.VAL_CODE=t.VAL_CODE

-- T | 28 | M_UDC_META
select
  DTUPMJ JD, DTUPMT JT
, DTSY DOMAIN_CODE, DTRT UDC_CODE
, DTCDL VAL_SIZE
from CRPCTL.F0004@ERP
where  (DTSY='58E ' and DTRT='ML' )    --客户等级
    or (DTSY='01  ' and DTRT='12' )    --客户行业大类
    or (DTSY='01  ' and DTRT='17' )    --客户行业中类
    or (DTSY='E3  ' and DTRT='KL' )    --客户行业小类
    or (DTSY='58E ' and DTRT='AF' )    --客户状态
    or (DTSY='58L ' and DTRT='MK' )    --客户来源
    or (DTSY='58H ' and DTRT='IT' )    --增票标识
    or (DTSY='01  ' and DTRT='30' )    --开票类型
    or (DTSY='01  ' and DTRT='LP' )    --用户语言
    or (DTSY='41  ' and DTRT='P1' )    --产品大类
    or (DTSY='41  ' and DTRT='P2' )    --产品中类
    or (DTSY='41  ' and DTRT='S2' )    --产品小类
    or (DTSY='40  ' and DTRT='PI' )    --项目价格组
    or (DTSY='41  ' and DTRT='10' )    --材质
    or (DTSY='41  ' and DTRT='09' )    --牙别
    or (DTSY='00  ' and DTRT='UM' )    --计量单位
    or (DTSY='E6  ' and DTRT='04' )    --面价类型
    or (DTSY='00  ' and DTRT='CN' )    --国家
    or (DTSY='58H ' and DTRT='PR' )    --省份
    or (DTSY='58H ' and DTRT='CT' )    --城市
    or (DTSY='58H ' and DTRT='PT' )    --区县
    or (DTSY='40  ' and DTRT='IU' )    --订单类型
    or (DTSY='40  ' and DTRT='AT' )    --订单状态
    or (DTSY='58E ' and DTRT='OT' )    --订单类别
    or (DTSY='00  ' and DTRT='PY' )    --支付方式
    or (DTSY='E3  ' and DTRT='DC' )    --支付状态
    or (DTSY='E3  ' and DTRT='TY' )    --退货原因
    or (DTSY='58H ' and DTRT='SM' )    --配送方式


-- UDC(行政区域)
-- 初始导入 | 43839 | M_UDC_MAP
select
, DSE58HPROC province
, DSE58HCITY city
, DSE58HPREF prefecture
, DSE58ENAM district
from CRPDTA.F58H1005@ERP

-- UDC(月结客户的支付条款)
-- T/F/D | 14 | M_UDC_PAYMENT_TERM
select 
  PNUPMJ JD, PNUPMT JT, PNPTC VAL_CODE
, PNPTD VAL_DESC
from CRPDTA.F0014@ERP
where BPCRCD='CNY' and BPUOM='EA';
