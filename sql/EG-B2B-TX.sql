

-- A_F58H0401_SO
select
  CHKCOO BP_CODE, CHCO CO_CODE,
  CHDOCO DOC_CODE, CHDCTO DOC_TYPE,
  CHTRDJ DOC_J,
  CHE58HOS DOC_STATUS,
  CHE58HOCA DOC_SOURCE,
  CHAN81 EMP_AN8,
  CHAN8 CUST_AN8,
  CHALPH CUST_NAME,
  CHE58MBLV CUST_LEVEL,
  CHE58HUS24 REF_NO,
  CHE58HUD04 DELIVERY_J,
  CHE58HSHM PAYMENT_TERM,
  CHE58HUN03 TOTAL_QTY,
  CHE58HUN04 TOTAL_WEIGHT,
  CHE58TSUA TOTAL_AMT,
  CHE58HUS25 REMARK
from PRODDTA.F58H0401

-- A_F58H0411_SO_ITEM
select
  CHKCOO BP, CHCO CO, CHE58HSID BP_MCU,
  CHAN81 EMP_AN8,
  CHAN8 CUST_AN8,
  CHTXA1 TAX_CODE,
  CHDOCO DOC_NO,
  CHE58HLNID LINE_NO,
  CHDCTO LINE_TYPE,
  CHE58HOS LINE_STATUS,
  CHE58SSOT LINE_CLASS,
  CHE58HOCA LINE_MODULE,
  CHE58HUS20 BASE_PRICE_CODE,
  CHTRDJ DOC_DATE,
  CHE58HUS25 REMARK,
  CHLITM ITEM_CODE,
  CHALPH ITEM_NAME,
  CHUORG SHIPPING_QTY_D4,
  CHUOM SHIPPING_UOM,
  CHE58HUN04 LIST_PRICE_D4,
  CHE58UPRC NET_PRICE_D4,
  CHE58PRDC CUST_DISCOUNT_D3,
  CHE58AEXP NET_AMT_D2,
  CHSOQS SHIPPED_QTY,
  CHSOCN CANCELED_QTY,
  CHE58HUS18 CUR_CODE,
  CHE58HUF04 PAYMENT_STATUS,
  CHE58HUS19 PAYMENT_TERMS,
  CHE58HSHM DELIVER_TYPE,
  CHNMCU DELIVER_WH_CODE,
  CHHMCO DELIVER_OU_CODE,
  CHODOC ORIGINAL_DOC_NO,
  CHOGNO ORIGINAL_LINE_NO
from PRODDTA.F58H0411
