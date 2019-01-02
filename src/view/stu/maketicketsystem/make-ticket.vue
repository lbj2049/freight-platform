<style lang="less" scoped>
  @import 'make-ticket.less';
</style>

<template>
  <div class="stu-make-ticket">
    <Layout class="left-pane">
      <Form ref="formLeft" :model="formValidate" :rules="ruleValidate" :label-position="left|right" label-width="60">
        <FormItem label="车/厢号" prop="num">
          <Input v-model="formValidate.num" placeholder=""></Input>
        </FormItem>
        <FormItem label="到  站" prop="dest">
          <Select v-model="formValidate.dest" ></Select>
        </FormItem>
        <FormItem label="City" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="Date">
          <Row>
            <Col span="11">
            <FormItem prop="date">
              <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
            </FormItem>
            </Col>
            <Col span="2" style="text-align: center">
            -</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
    </Layout>
    <Layout class="right-pane">Right
    </Layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValidate: {
        num: '',
        dest: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
