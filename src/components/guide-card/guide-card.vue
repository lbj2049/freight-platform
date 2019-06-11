<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="top-area" :style="{'background-color': color, height: topHeight}" :class="img">
      </div>
      <div class="bottom-area" style="height: 54px; line-height: 54px; font-size: 18px">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '_c/common-icon'
export default {
  name: 'SubsystemGuide',
  components: {
    CommonIcon
  },
  props: {
    left: {
      type: Number,
      default: 36
    },
    top: {
      type: Number,
      default: 400
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    topHeight () {
      return '20vw'
    },
    bottomHeight () {
      return `40px`
    }
  },
  methods: {
    doRedirect (item) {
      this.$emit('doRedirect', item)
    }
  }
}
</script>

<style lang="less">
.ec {
  background: url('../../assets/images/ec.png') no-repeat;
  background-size:100% 100%;
}
.ec_gray {
  background: url('../../assets/images/ec_gray.png') no-repeat;
  background-size:100% 100%;
}
.freight {
  background: url('../../assets/images/freight.png') no-repeat;
  background-size:100% 100%;
}
.freight_gray {
  background: url('../../assets/images/freight_gray.png') no-repeat;
  background-size:100% 100%;
}
.container {
  background: url('../../assets/images/container.png') no-repeat;
  background-size:100% 100%;
}
.container_gray {
  background: url('../../assets/images/container_gray.png') no-repeat;
  background-size:100% 100%;
}
.bill {
  background: url('../../assets/images/bill.png') no-repeat;
  background-size:100% 100%;
}
.bill_gray {
  background: url('../../assets/images/bill_gray.png') no-repeat;
  background-size:100% 100%;
}
.common{
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.size{
  width: 100%;
  height: 100%;
}
.middle-center{
  vertical-align: middle;
}
.info-card-wrapper{
  margin-top: 40px;
  .size;
  overflow: hidden;
  .ivu-card-body{
    .size;
  }
  .content-con {
    .size;
    .top-area{
      /*background-image: url("../../assets/images/ec.png");*/
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .bottom-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>
