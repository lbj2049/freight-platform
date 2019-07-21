<template>
    <div>
      <Modal :value="viewable" :mask-closable="false" :styles="{top: '8%'}" width="1052" @on-visible-change="getViewableChange">
        <table border='0' cellpadding='0' cellspacing='0' width='1023' style='border-collapse:collapse;table-layout:fixed;width:767pt'>
          <col width='72' style='width:54pt'>
          <col class='x21' width='95' style='mso-width-source:userset;width:71.25pt'>
          <col class='x21' width='72' style='mso-width-source:userset;width:54pt'>
          <col class='x21' width='57' style='mso-width-source:userset;width:42.75pt'>
          <col width='59' style='mso-width-source:userset;width:44.25pt'>
          <col width='72' span='2' style='width:54pt'>
          <col class='x21' width='72' span='2' style='mso-width-source:userset;width:54pt'>
          <col width='72' style='width:54pt'>
          <col class='x21' width='82' style='mso-width-source:userset;width:61.5pt'>
          <col width='72' span='2' style='width:54pt'>
          <col width='82' style='mso-width-source:userset;width:61.5pt'>
          <tr height='38' style='mso-height-source:userset;height:28.5pt;mso-xlrowspan:2' id='r0'>
            <td height='38' style='height:28.5pt'></td>
            <td class='x21'></td>
            <td class='x21'></td>
            <td class='x21'></td>
            <td></td>
            <td colspan='2' style='mso-ignore:colspan;'></td>
            <td colspan='2' class='x21' style='mso-ignore:colspan;'></td>
            <td></td>
            <td class='x21'></td>
            <td colspan='2' style='mso-ignore:colspan;'></td>
            <td></td>
          </tr>
          <tr height='27' style='mso-height-source:userset;height:20.25pt' id='r1'>
            <td height='27' style='height:20.25pt;'></td>
            <td class='x21'></td>
            <td class='x21'></td>
            <td class='x21'></td>
            <td></td>
            <td></td>
            <td colspan='2' class='x33'>货物运单</td>
            <td class='x21'></td>
            <td></td>
            <td class='x21'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r2'>
            <td height='19' style='height:14.25pt'></td>
            <td class='x21'></td>
            <td class='x21'></td>
            <td class='x21'></td>
            <td></td>
            <td colspan='2' style='mso-ignore:colspan;'></td>
            <td colspan='2' class='x21' style='mso-ignore:colspan;'></td>
            <td></td>
            <td class='x21'></td>
            <td colspan='2' style='mso-ignore:colspan;'></td>
            <td></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r3'>
            <td height='17' class='x28' style='height:12.75pt;'>需求号</td>
            <td colspan='9' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.needNo}}</td>
            <td class='x28'>整车</td>
            <td colspan='3' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{carTypeMap[currData.carType]}}</td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r4'>
            <td rowspan='4' height='74' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:55.5pt;'>托运人</td>
            <td class='x23'>发站（公司）</td>
            <td class='x23' style='overflow:hidden;'><div style='margin-left:-16px'>{{currData.station}}</div></td>
            <td class='x23'>专用线</td>
            <td colspan='6' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
            <td class='x23'>货区</td>
            <td colspan='3' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r5'>
            <td rowspan='2' height='36' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:27pt;'>名称</td>
            <td colspan='5' rowspan='2' height='36' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:27pt;'>{{currData.sname}}</td>
            <td class='x23'>经办人</td>
            <td colspan='2' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.sagent}}</td>
            <td class='x23'>货位</td>
            <td colspan='3' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r6'>
            <td class='x23'>手机号</td>
            <td colspan='2' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.smobile}}</td>
            <td class='x23'>车种车号</td>
            <td colspan='3' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.carNum}}</td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r7'>
            <td class='x23'>上门取货</td>
            <td class='x23'>取货地址</td>
            <td colspan='7' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.saddr}}</td>
            <td class='x23'>取货里程</td>
            <td colspan='3' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r8'>
            <td rowspan='4' height='74' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:55.5pt;'>收货人</td>
            <td class='x23'>到站（公司）</td>
            <td class='x31' style='overflow:hidden;'><div style='margin-left:-20px'>{{currData.astation}}</div></td>
            <td class='x23'>专用线</td>
            <td colspan='6' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
            <td class='x23'>运到期限</td>
            <td class='x25'></td>
            <td class='x25'>标重</td>
            <td class='x25'>{{currData.tunnage}}</td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r9'>
            <td rowspan='2' height='36' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:27pt;'>名称</td>
            <td colspan='5' rowspan='2' height='36' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:27pt;'>{{currData.aname}}</td>
            <td class='x23'>经办人</td>
            <td colspan='2' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.aagent}}</td>
            <td class='x23'>绝封号</td>
            <td colspan='3' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r10'>
            <td class='x23'>手机号</td>
            <td colspan='2' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.amobile}}</td>
            <td class='x23'>篷布号</td>
            <td colspan='3' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r11'>
            <td class='x23'>上门送货</td>
            <td class='x23'>送货地址</td>
            <td colspan='7' class='x59' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>{{currData.aaddr}}</td>
            <td class='x23'>送货里程</td>
            <td colspan='3' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r12'>
            <td height='17' class='x24' style='height:12.75pt;'>付款方式</td>
            <td colspan='5' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
            <td class='x24'>领货方式</td>
            <td colspan='3' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
            <td class='x23'>装车方</td>
            <td class='x24' style='overflow:hidden;'>{{currData.sname}}</td>
            <td class='x24'>领货方</td>
            <td class='x24'>{{currData.aname}}</td>
          </tr>
          <tr height='38' class='x22' style='mso-height-source:userset;height:28.5pt' id='r13'>
            <td colspan='3' height='36' class='x56' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:27pt;'>货物名称</td>
            <td class='x26'>简述</td>
            <td class='x26'>包装</td>
            <td class='x26'>货物价格（元）</td>
            <td class='x26'>重量（kg）</td>
            <td class='x26'>箱型箱类</td>
            <td class='x26'>箱号</td>
            <td class='x26'>集装箱施封号</td>
            <td class='x26'>承运人确定重量（kg)</td>
            <td class='x26'>体积（m3）</td>
            <td class='x26'>运价号</td>
            <td class='x26'>计费重量（kg）</td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r14'>
            <td colspan='3' height='17' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:12.75pt;'>{{currData.gname}}</td>
            <td class='x23'></td>
            <td class='x24'>{{currData.gpackage}}</td>
            <td class='x24'></td>
            <td class='x24'>{{currData.tunnage}}</td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x24'>{{currData.tunnage}}</td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'>{{currData.tunnage}}</td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r15'>
            <td colspan='3' height='17' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:12.75pt;'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r16'>
            <td colspan='3' height='17' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:12.75pt;'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r17'>
            <td colspan='3' height='17' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:12.75pt;'>合计</td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r18'>
            <td colspan='2' rowspan='4' height='74' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:55.5pt;'>选择服务</td>
            <td class='x23'>上门装车</td>
            <td colspan='4' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>特约事项：</td>
            <td class='x23'>费用</td>
            <td class='x31'>金额（元）</td>
            <td class='x24'>税额（元）</td>
            <td class='x23'>费用</td>
            <td class='x24'>金额（元）</td>
            <td class='x24'>税额（元</td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r19'>
            <td class='x23'>上门卸车</td>
            <td colspan='4' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>特约事项：</td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r20'>
            <td colspan='5' class='x38' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>保价运输<span style='mso-spacerun:yes;'>&nbsp; </span>装载加固材料 仓储 冷藏（保温）</td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r21'>
            <td class='x23'>其他服务</td>
            <td colspan='4' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'></td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r22'>
            <td colspan='2' rowspan='4' height='75' class='x41' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:56.25pt;'>增值税 <br>发票类型<br>普通票<br>专用票</td>
            <td colspan='5' rowspan='4' height='75' class='x47' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:56.25pt;'></td>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r23'>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r24'>
            <td class='x23'></td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r25'>
            <td class='x23'>费用合计</td>
            <td class='x31'></td>
            <td class='x24'></td>
            <td class='x23'></td>
            <td class='x24'></td>
            <td class='x24'></td>
            <td class='x24'></td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r26'>
            <td colspan='7' rowspan='3' height='55' class='x37' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:41.25pt;'>托运人记事：{{currData.notepad}}</td>
            <td colspan='7' rowspan='3' height='55' class='x37' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:41.25pt;'>承运人记事：</td>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r27'>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r28'>
          </tr>
          <tr height='19' style='mso-height-source:userset;height:14.25pt' id='r29'>
            <td height='17' class='x29' style='height:12.75pt;'></td>
            <td class='x27'>收货人签章</td>
            <td class='x27'></td>
            <td class='x27'></td>
            <td colspan='3' class='x32' style='border-bottom:1px solid windowtext;'>车站接（交）货人签章</td>
            <td class='x27'></td>
            <td class='x30'>制单人</td>
            <td class='x29'></td>
            <td class='x27'></td>
            <td class='x29'>制单日期</td>
            <td class='x29'></td>
            <td class='x29'></td>
          </tr>
        </table>
      </Modal>
    </div>
</template>

<script>
export default {
  name: 'waybill-accept-select-view',
  data () {
    return {
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      viewable: false,
      currData: {
      },
      defData: {
        'gMaxWeight': '',
        'gpackage': '',
        'amobile': '',
        'needNo': '',
        'sofficID': '',
        'notepad': '',
        'aagent': '',
        'astationID': '',
        'reservaNo': '',
        'astation': '',
        'loadDate': '',
        'wbID': '',
        'carType': '',
        'admitCarState': '',
        'aaddr': '',
        'station': '',
        'paulinNum': '',
        'ctime': '',
        'aoffic': '',
        'state': '',
        'bsIDs': '',
        'aCarDownAddr': '',
        'aofficID': '',
        'smobile': '',
        'caseNum': '',
        'tunnage': '',
        'saddr': '',
        'aname': '',
        'acceptNo': '',
        'carNum': '',
        'gname': '',
        'sCarLoadAddr': '',
        'acardID': '',
        'sname': '',
        'sagent': '',
        'scardID': '',
        'atel': '',
        'resDate': '',
        'carrierNote': '',
        'stel': '',
        'soffic': '',
        'stationID': ''
      }
    }
  },
  methods: {
    show (item) {
      // console.log('set1 form show')
      this.currData = item || this.defData
      this.viewable = true
    },
    getViewableChange (enable) {
      this.viewable = enable
    }
  }
}
</script>

<style scoped>
  table
  {mso-displayed-decimal-separator:"\.";
    mso-displayed-thousand-separator:"\,";}
  @page
  {
    mso-header-data:"";
    mso-footer-data:"";
    margin:0.75in 0.7in 0.75in 0.7in;
    mso-header-margin:0.3in;
    mso-footer-margin:0.3in;
    mso-page-orientation:Portrait;
  }
  tr
  {mso-height-source:auto;
    mso-ruby-visibility:none;}
  col
  {mso-width-source:auto;
    mso-ruby-visibility:none;}
  br
  {mso-data-placement:same-cell;}
  ruby
  {ruby-align:left;}
  .style0
  {
    mso-number-format:General;
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border:none;
    mso-protection:locked visible;
    mso-style-name:Normal;
    mso-style-id:0;}
  .font0
  {
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif"; }
  .font1
  {
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif"; }
  .font2
  {
    color:#000000;
    font-size:9pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif"; }
  .font3
  {
    color:#000000;
    font-size:16pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif"; }
  td
  {mso-style-parent:style0;
    mso-number-format:General;
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border:none;
    mso-protection:locked visible;
    mso-ignore:padding;}
  .style0
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    mso-protection:locked visible;
    mso-style-name:"Normal";
  }
  .style1
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style2
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style3
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style4
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style5
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style6
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style7
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style8
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style9
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style10
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style11
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style12
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style13
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .style14
  {
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
  }
  .x15
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    mso-protection:locked visible;
  }
  .style16
  {
    mso-number-format:"0%";
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
    mso-style-name:"Percent";
  }
  .style17
  {
    mso-number-format:"_ \0022¥\0022* \#\,\#\#0\.00_ \;_ \0022¥\0022* -\#\,\#\#0\.00_ \;_ \0022¥\0022* \0022-\0022??_ \;_ \@_ ";
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
    mso-style-name:"Currency";
  }
  .style18
  {
    mso-number-format:"_ \0022¥\0022* \#\,\#\#0_ \;_ \0022¥\0022* -\#\,\#\#0_ \;_ \0022¥\0022* \0022-\0022_ \;_ \@_ ";
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
    mso-style-name:"Currency [0]";
  }
  .style19
  {
    mso-number-format:"_ * \#\,\#\#0\.00_ \;_ * -\#\,\#\#0\.00_ \;_ * \0022-\0022??_ \;_ \@_ ";
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
    mso-style-name:"Comma";
  }
  .style20
  {
    mso-number-format:"_ * \#\,\#\#0_ \;_ * -\#\,\#\#0_ \;_ * \0022-\0022_ \;_ \@_ ";
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:10pt;
    font-weight:400;
    font-style:normal;
    font-family:"Arial","sans-serif";
    mso-protection:locked visible;
    mso-style-name:"Comma [0]";
  }
  .x21
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    mso-protection:locked visible;
  }
  .x22
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    mso-protection:locked visible;
  }
  .x23
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x24
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x25
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x26
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x27
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x28
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x29
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:general;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x30
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x31
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x32
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:left;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x33
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:16pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    mso-protection:locked visible;
  }
  .x34
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:16pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","monospace";
    mso-protection:locked visible;
  }
  .x35
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x36
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:left;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x37
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:left;
    vertical-align:top;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x38
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x39
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x40
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x41
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:none;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x42
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:none;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x43
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:none;
    border-bottom:none;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x44
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:1px solid windowtext;
    border-bottom:none;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x45
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x46
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x47
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:none;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x48
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:none;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x49
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:none;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x50
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:none;
    border-bottom:none;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x51
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    mso-protection:locked visible;
  }
  .x52
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:1px solid windowtext;
    border-bottom:none;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x53
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x54
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x55
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:none;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x56
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x57
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x58
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:center;
    vertical-align:middle;
    white-space:normal;word-wrap:break-word;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x59
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:left;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:none;
    border-bottom:1px solid windowtext;
    border-left:1px solid windowtext;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
  .x60
  {
    mso-style-parent:style0;
    mso-number-format:General;
    text-align:left;
    vertical-align:middle;
    white-space:nowrap;
    background:white;
    mso-pattern:auto;
    color:#000000;
    font-size:11pt;
    font-weight:400;
    font-style:normal;
    font-family:"等线","sans-serif";
    border-top:1px solid windowtext;
    border-right:1px solid windowtext;
    border-bottom:1px solid windowtext;
    border-left:none;
    mso-diagonal-down:none;
    mso-diagonal-up:none;
    mso-protection:locked visible;
  }
</style>
