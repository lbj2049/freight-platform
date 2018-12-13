<style scoped>
  .ivu-form-item {
    margin-bottom: 20px;
  }
  .ivu-input-number {
    width: 100%;
  }
</style>
<template>
  <Form ref="submitForm" autocomplete="on" :model="searchFormData" :label-width="labelShow?null:labelWidth">
    <template v-if="vertical">
      <div v-for="(item,index) in searchData" :key="index">
        <template v-if="item.type === 'select'">
          <!-- <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
              <Select :value="item.defaultValue||null" @on-change="(value)=>handleSelectChange(value,item.value)" :clearable="item.clearable||false" :filterable="item.filterable||false" :placeholder="item.placeholder">
                  <Option v-for="child_item in item.data" :value="child_item.value" :key="child_item.value">{{ child_item.name }}</Option>
              </Select>
          </FormItem> -->
          <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
            <Select v-model="searchFormData[item.value]" :disabled="item.disabled" :clearable="item.clearable||false" :filterable="item.filterable||false" :placeholder="item.placeholder">
              <Option v-for="child_item in item.data" :disabled="child_item.disabled" :value="child_item.value" :key="child_item.value">{{ child_item.name }}</Option>
            </Select>
          </FormItem>
        </template>
        <template v-else-if="item.type === 'radio'">
          <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
            <RadioGroup v-model="searchFormData[item.value]">
              <Radio v-for="child_item in item.data" :disabled="child_item.disabled" :label="child_item.value" :key="child_item.value">{{ child_item.name }}</Radio>
            </RadioGroup>
          </FormItem>
        </template>
        <template v-else-if="item.type === 'input'">
          <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'blur'}:null">
            <Input v-model="searchFormData[item.value]" :disabled="item.disabled" :prefix="item.prefix||''" :suffix="item.suffix||''" :placeholder="item.placeholder" :clearable="item.clearable"></Input>
          </FormItem>
        </template>
        <template v-else-if="item.type === 'inputNumber'">
          <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！',type:'number'}:null">
            <InputNumber :min="1" :disabled="item.disabled" v-model="searchFormData[item.value]" :placeholder="item.placeholder"></InputNumber>
          </FormItem>
        </template>
        <template v-else-if="item.type === 'date'">
          <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
            <DatePicker :disabled="item.disabled" :type="item.dateType" :options="dateLimit(item.limit)" :value="searchFormData[item.value]" :format="searchFormData[item.format]" :placeholder="item.placeholder" @on-change="(datetime) => { dataChange(datetime,item.value)}"></DatePicker>
          </FormItem>
        </template>
      </div>
      <div style="textAlign:center;">
        <Button type="primary" @click="handleSubmit('submitForm')">{{btnName}}</Button>
      </div>
    </template>
    <template v-else>
      <!-- 布局 -->
      <Row v-if="searchData.length>4" :gutter="20">
        <Col span="22">
          <Row type="flex" justify="start" :gutter='10'>
            <Col span='6' v-for="(item,index) in searchData" :key="index">
              <template v-if="item.type === 'select'">
                <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
                  <Select v-model="searchFormData[item.value]" :disabled="item.disabled" :clearable="item.clearable||false" :filterable="item.filterable||false" :placeholder="item.placeholder">
                    <Option v-for="child_item in item.data" :disabled="item.child_item" :value="child_item.value" :key="child_item.value">{{ child_item.name }}</Option>
                  </Select>
                </FormItem>
              </template>
              <template v-else-if="item.type === 'radio'">
                <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
                  <RadioGroup v-model="searchFormData[item.value]">
                    <Radio v-for="child_item in item.data" :disabled="item.child_item" :label="child_item.value" :key="child_item.value">{{ child_item.name }}</Radio>
                  </RadioGroup>
                </FormItem>
              </template>
              <template v-else-if="item.type === 'input'">
                <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'blur'}:null">
                  <Input v-model="searchFormData[item.value]" :disabled="item.disabled" :prefix="item.prefix||''" :suffix="item.suffix||''" :placeholder="item.placeholder" :clearable="item.clearable"></Input>
                </FormItem>
              </template>
              <template v-else-if="item.type === 'inputNumber'">
                <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！',type:'number'}:null">
                  <InputNumber :min="1" :disabled="item.disabled" v-model="searchFormData[item.value]" :placeholder="item.placeholder"></InputNumber>
                </FormItem>
              </template>
              <template v-else-if="item.type === 'date'">
                <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
                  <DatePicker :type="item.dateType" :disabled="item.disabled" :options="dateLimit(item.limit)" :value="searchFormData[item.value]" :format="searchFormData[item.format]" :placeholder="item.placeholder" @on-change="(datetime) => { dataChange(datetime,item.value)}"></DatePicker>
                </FormItem>
              </template>
            </Col>
          </Row>
        </Col>
        <Col span="2">
          <Button type="primary" @click="handleSubmit('submitForm')">{{btnName}}</Button>
        </Col>
      </Row>
      <Row v-else :gutter="10" type="flex" justify="start">
        <Col span='5' v-for="(item,index) in searchData" :key="index">
          <template v-if="item.type === 'select'">
            <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
              <Select v-model="searchFormData[item.value]" :disabled="item.disabled" :clearable="item.clearable||false" :filterable="item.filterable||false" :placeholder="item.placeholder">
                <Option v-for="child_item in item.data" :disabled="item.child_item" :value="child_item.value" :key="child_item.value">{{ child_item.name }}</Option>
              </Select>
            </FormItem>
          </template>
          <template v-else-if="item.type === 'radio'">
            <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
              <RadioGroup v-model="searchFormData[item.value]">
                <Radio v-for="child_item in item.data" :disabled="item.child_item" :label="child_item.value" :key="child_item.value">{{ child_item.name }}</Radio>
              </RadioGroup>
            </FormItem>
          </template>
          <template v-else-if="item.type === 'input'">
            <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'blur'}:null">
              <Input v-model="searchFormData[item.value]" :disabled="item.disabled" :prefix="item.prefix||''" :suffix="item.suffix||''" :placeholder="item.placeholder" :clearable="item.clearable"></Input>
            </FormItem>
          </template>
          <template v-else-if="item.type === 'inputNumber'">
            <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！',type:'number'}:null">
              <InputNumber :min="1" :disabled="item.disabled" v-model="searchFormData[item.value]" :placeholder="item.placeholder"></InputNumber>
            </FormItem>
          </template>
          <template v-else-if="item.type === 'date'">
            <FormItem :label="labelShow?null:item.label" :prop="item.required?item.value:null" :rules="item.required?{required: true, message: item.label +'不能为空！', trigger: 'change'}:null">
              <DatePicker :type="item.dateType" :disabled="item.disabled" :options="dateLimit(item.limit)" :value="searchFormData[item.value]" :format="searchFormData[item.format]" :placeholder="item.placeholder" @on-change="(datetime) => { dataChange(datetime,item.value)}"></DatePicker>
            </FormItem>
          </template>
        </Col>
        <Col span="4">
          <Button type="primary" @click="handleSubmit('submitForm')">{{btnName}}</Button>
        </Col>
      </Row>
    </template>
  </Form>
</template>
<script>
export default {
  name: 'search-form',
  props: {
    searchData: Array,
    labelShow: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: '提交'
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    searchDefault: Object,
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 表单数据
      searchFormData: {
        // inputNumber: 5,
        // input: 'sdfsdf'
      }
    }
  },
  watch: {
    searchDefault: {
      handler() {
        this.searchFormData = this.searchDefault;
      },
      deep: true
    }
  },
  methods: {
    // 下拉框变化触发
    handleSelectChange (value, key) {
      this.searchFormData[key] = value;
    },
    // 时间范围限制
    dateLimit (limit) {
      return {
        disabledDate(date) {
          return (
            (date && date.valueOf() > new Date(limit.up)) ||
            (date && date.valueOf() < new Date(limit.down))
          );
        }
      };
    },
    // 提交搜索框数据
    handleSubmit (name) {
      let bPass = true;
      // 遍历props数组验证是否有规则验证,否则直接emit搜索参数
      for (let index = 0; index < this.searchData.length; index++) {
        const element = this.searchData[index];
        if (element.required) {
          bPass = false;
          break;
        }
      }
      if (bPass) {
        this.$emit('handleFormSubmit', this.searchFormData);
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$emit('handleFormSubmit', this.searchFormData);
          } else {
            this.$Message.error('搜索参数不符合规则!');
          }
        });
      }
    },
    // 时间选择框变化触发
    dataChange(date, key) {
      if (typeof key == 'searchect') {
        key.map((item, index) => {
          this.searchFormData[item] = date[index];
        });
      } else {
        this.searchFormData[key] = date;
      }
    }
  },
  mounted () {
    if (this.searchDefault) {
      this.searchFormData = this.searchDefault;
    }
    // this.searchData.map(item => {
    //     if (item.type == 'select' || item.type == 'radio') {
    //         if (item.defaultValue) {
    //             this.searchFormData[item.value] = item.defaultValue;
    //         }
    //     }
    // });
  }
}
</script>
