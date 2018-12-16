<template>
  <Dropdown>
    <a href="javascript:void(0)">
      {{title}}
      <!--如果是有子菜单才显示箭头-->
      <Icon v-if="dropdownMenu.firstDropDownMenuData.size()>0" type="ios-arrow-down"></Icon>
    </a>
    <DropdownMenu slot="list">
      <div v-for="(item, index) in dropdownMenu.firstDropDownMenuData" :key="`infor-${index}`"  >
        <DropdownItem v-if="(item.firstDropDownMenuData.secondDropDownMenuData.size()==0)" @click="hmtoDirect(item.url)">
          {{item.title}}
        </DropdownItem>

        <Dropdown v-else-if="(item.firstDropDownMenuData.secondDropDownMenuData.size()>0)" placement="right-start">
          <div v-for="(item, index) in dropdownMenu.firstDropDownMenuData.secondDropDownMenuData" :key="`infor-${index}`"  >
            <DropdownItem v-if="(item.firstDropDownMenuData.secondDropDownMenuData.thirdDropDownMenuData.size()==0)"  @click="hmtoDirect(item.url)">
              {{item.title}}
            </DropdownItem>

            <DropdownItem v-else-if="(item.firstDropDownMenuData.secondDropDownMenuData.thirdDropDownMenuData.size()>0)" placement="right-start">
              {{item.title}}
              <Icon v-if="(dropdownMenu.firstDropDownMenuData.size()>0)" type="ios-arrow-down"></Icon>
            </DropdownItem>
            <DropdownMenu v-if="(item.firstDropDownMenuData.secondDropDownMenuData.thirdDropDownMenuData.size()>0)" slot="list">
              <DropdownItem v-for="(item, index) in dropdownMenu.firstDropDownMenuData.secondDropDownMenuData.thirdDropDownMenuData" :key="`infor-${index}`"   @click="hmtoDirect(item.url)">{{item.title}} </DropdownItem>
            </DropdownMenu>
          </div>
        </Dropdown>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  name: 'DropdownMenu',
  props: {
    dropdownMenu: {
      title: {
        type: String,
        default: ''
      },
      firstDropDownMenuData: [{
        title: {
          type: String,
          default: ''
        },
        url: {
          type: String,
          default: ''
        },
        secondDropDownMenuData: [{
          title: {
            type: String,
            default: ''
          },
          url: {
            type: String,
            default: ''
          },
          thirdDropDownMenuData: [{
            title: {
              type: String,
              default: ''
            },
            url: {
              type: String,
              default: ''
            }
          }]
        }]
      }]
    }
  },
  methods: {
    hmtoDirect (url) {
      this.$router.push(url)
    }
  }
}
</script>
