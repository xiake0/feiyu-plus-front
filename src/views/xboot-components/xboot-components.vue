<template>
  <div>
    <Card>
      <Tabs :animated="false">
        <TabPane label="通用业务组件">
          <Alert type="warning" show-icon>说明：大部分组件为包含真实数据接口的简单封装，方便大家的直接复用！</Alert>
          <Divider class="blue" orientation="left">图标选择弹框</Divider>
          <Input
            :icon="icon"
            v-model="icon"
            @on-focus="iconModalVisible=true"
            style="width:300px"
            placeholder="点我选择图标"
          />
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data1" border size="small" width="700"></Table>

          <Divider class="blue" orientation="left">部门级联选择</Divider>
          <department-choose width="300px" @on-select="handleSelectDep" ref="dep"></department-choose>
          <h3 class="article">props</h3>
          <Table :columns="props" :data="data2" border size="small" width="700"></Table>
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data3" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data4" border size="small" width="700"></Table>

          <Divider class="blue" orientation="left">部门树选择</Divider>
          <department-tree-choose
            multiple
            width="250px"
            @on-change="handleSelectDepTree"
            ref="depTree"
          ></department-tree-choose>
          <div style="margin-top:10px;">{{selectDeps}}</div>
          <h3 class="article">props</h3>
          <Table :columns="props" :data="data5" border size="small" width="700"></Table>
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data6" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data7" border size="small" width="700"></Table>

          <Divider class="blue" orientation="left">用户抽屉选择</Divider>
          <user-choose buttonText="点我选择用户" @on-change="handleSelectUser" ref="user"></user-choose>
          <div style="margin-top:10px;">{{selectUsers}}</div>
          <h3 class="article">props</h3>
          <Table :columns="props" :data="data8" border size="small" width="700"></Table>
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data9" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data10" border size="small" width="700"></Table>

          <Divider class="blue" orientation="left">图片上传文本框</Divider>
          <upload-pic-input @on-change="handleUpload" width="250px" ref="upload"></upload-pic-input>
          <h3 class="article">props</h3>
          <Table :columns="props" :data="data11" border size="small" width="700"></Table>
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data12" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data13" border size="small" width="700"></Table>
        </TabPane>

        <TabPane label="工作流相关(付费)">
          <Alert
            type="warning"
            show-icon
          >流程审批通用状态及结果保存至ActBusiness表中，添加业务时记得向该表中关联表ID等数据，参考已有请假申请添加接口</Alert>
          <Divider class="blue" orientation="left">工作流程选择发起</Divider>
          <Button @click="processModalVisible=true">发起流程</Button>
          <Alert show-icon style="width:700px;margin-top:15px;">请务必在显示组件前调用setID方法传入ActBusinessId数据！</Alert>
          <div style="font-size:12px;margin-bottom:10px">示例（仅为演示传入ID为测试数据123456，所以会报错）：</div>
          <Button @click="processChoose">发起流程</Button>
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data14" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data15" border size="small" width="700"></Table>

          <Divider class="blue" orientation="left">通过流程key直接发起</Divider>
          <div style="font-size:12px;margin-bottom:10px">示例（仅为演示传入流程key为请假申请leave，传入ID为测试数据123456，所以会报错）：</div>
          <Button @click="startByKey" :loading="processLoading">发起流程</Button>
          <h3 class="article">events</h3>
          <Table :columns="events" :data="data16" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data17" border size="small" width="700"></Table>

          <Divider class="blue" orientation="left">取消撤回申请</Divider>
          <div style="font-size:12px;margin-bottom:10px">示例（仅为演示传入ID为测试数据123456，传入ID为测试数据123456，所以会报错）：</div>
          <Button @click="cancelProcess">撤回申请</Button>

          <h3 class="article">events</h3>
          <Table :columns="events" :data="data18" border size="small" width="700"></Table>
          <h3 class="article">methods</h3>
          <Table :columns="methods" :data="data19" border size="small" width="700"></Table>
        </TabPane>
      </Tabs>
    </Card>

    <Modal title="选择图标" v-model="iconModalVisible" :width="800" :styles="{top: '30px'}" footer-hide>
      <icon-choose @on-select="handleSelectIcon"></icon-choose>
    </Modal>

    <Drawer title="选择流程" closable v-model="processModalVisible" width="800" draggable>
      <process-choose ref="processChoose"/>
    </Drawer>

    <process-start
      ref="processStart"
      @on-loading="processLoading=true"
      @on-loaded="processLoading=false"
    />
    <process-cancel ref="processCancel"/>
  </div>
</template>

<script>
import iconChoose from "@/views/my-components/icon-choose";
import departmentChoose from "@/views/my-components/xboot/department-choose";
import departmentTreeChoose from "@/views/my-components/xboot/department-tree-choose";
import userChoose from "@/views/my-components/xboot/user-choose";
import uploadPicInput from "@/views/my-components/xboot/upload-pic-input";
import processChoose from "@/views/my-components/xboot/process-choose";
import processStart from "@/views/my-components/xboot/process-start";
import processCancel from "@/views/my-components/xboot/process-cancel";
export default {
  name: "xboot-components",
  components: {
    iconChoose,
    departmentChoose,
    userChoose,
    departmentTreeChoose,
    uploadPicInput,
    processChoose,
    processStart,
    processCancel
  },
  data() {
    return {
      iconModalVisible: false,
      processModalVisible: false,
      icon: "",
      selectDeps: [],
      selectUsers: [],
      picUrl: "",
      processLoading: false,
      events: [
        {
          title: "事件名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "返回值",
          key: "value"
        }
      ],
      props: [
        {
          title: "属性",
          key: "name"
        },
        {
          title: "说明",
          key: "desc"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value"
        }
      ],
      data1: [
        {
          name: "on-select",
          type: "String",
          value: "选择图标英文名"
        }
      ],
      data2: [
        {
          name: "width",
          desc: "选择框宽度，如200px",
          type: "String（需加上px单位）",
          value: "200px"
        }
      ],
      methods: [
        {
          title: "方法名",
          key: "name"
        },
        {
          title: "说明",
          key: "type"
        },
        {
          title: "参数",
          key: "value"
        }
      ],
      data3: [
        {
          name: "on-select",
          type: "String",
          value: "点击部门ID"
        }
      ],
      data4: [
        {
          name: "clearSelect",
          type: "清空已选数据",
          value: "无"
        }
      ],
      data5: [
        {
          name: "width",
          desc: "选择框宽度，如200px",
          type: "String（需加上px单位）",
          value: "200px"
        },
        {
          name: "placeholder",
          desc: "提示文字",
          type: "String",
          value: "点击选择部门"
        },
        {
          name: "multiple",
          desc: "是否选开启多选，默认false不开启",
          type: "Boolean",
          value: "false"
        }
      ],
      data6: [
        {
          name: "on-change",
          type: "Array",
          value: '选择部门id数组，仅包含部门id，例如 ["1","2","3"]'
        }
      ],
      data7: [
        {
          name: "setSelectDep",
          type: "设置已选部门数据（回显使用）",
          value:
            "第一个参数为部门id数组（Array），第二个参数为部门标题（String）"
        }
      ],
      data8: [
        {
          name: "buttonText",
          desc: "选择用户按钮文字",
          type: "String",
          value: "选择用户"
        },
        {
          name: "icon",
          desc: "选择用户按钮图标",
          type: "String",
          value: "md-person-add"
        },
        {
          name: "all",
          desc: "是否选择所有用户",
          type: "Boolean",
          value: "false"
        }
      ],
      data9: [
        {
          name: "on-change",
          type: "Array",
          value:
            '选择用户数组，仅包含用户id和username，例如 [{"id":"1","username":"name"}]'
        }
      ],
      data10: [
        {
          name: "setSelectUser",
          type: "设置已选用户数据（回显使用）",
          value:
            '用户数组，需包含用户id和username，例如 [{"id":"1","username":"name"}]'
        },
        {
          name: "setSelectAllUser",
          type: "设置选择全部用户，返回全部用户数据",
          value: "无"
        }
      ],
      data11: [
        {
          name: "width",
          desc: "选择框宽度，如200px",
          type: "String（需加上px单位）",
          value: "200px"
        }
      ],
      data12: [
        {
          name: "on-change",
          type: "String",
          value: "返回完整上传图片路径或用户输入的链接"
        }
      ],
      data13: [
        {
          name: "setPicUrl",
          type: "设置文本框图片链接（回显使用）",
          value: "完整图片链接"
        }
      ],
      data14: [
        {
          name: "on-submit",
          type: "Boolean",
          value: "仅成功提交申请触发返回true，用于刷新表单显示审批状态"
        }
      ],
      data15: [
        {
          name: "setID",
          type: "显示组件前务必调用改方法传入ActBusinessId数据",
          value: "ActBusiness表ID"
        }
      ],
      data16: [
        {
          name: "on-loading",
          type: "Boolean",
          value: "加载中状态，传入key后需加载流程信息，加载中触发返回true"
        },
        {
          name: "on-loaded",
          type: "Boolean",
          value: "加载完毕状态，传入key后需加载流程信息，加载完毕触发返回true"
        },
        {
          name: "on-submit",
          type: "Boolean",
          value: "仅成功提交申请触发返回true，用于刷新表单显示审批状态"
        }
      ],
      data17: [
        {
          name: "show",
          type: "显示组件，务必传入申请的流程标识key和ActBusinessId两个参数",
          value: "第一个参数为流程标识key，第二个参数为ActBusiness表ID"
        }
      ],
      data18: [
        {
          name: "on-submit",
          type: "Boolean",
          value: "仅成功提交申请触发返回true，用于刷新表单显示审批状态"
        }
      ],
      data19: [
        {
          name: "show",
          type: "显示组件，务必传入ActBusinessId和流程实例的procInstId两个参数",
          value: "第一个参数为ActBusiness表ID，第二个参数为流程实例的procInstId"
        }
      ]
    };
  },
  methods: {
    init() {},
    handleSelectIcon(v) {
      this.icon = v;
      this.iconModalVisible = false;
    },
    handleSelectDep(v) {
      this.$Message.info(`所选部门ID为 ${v}`);
    },
    handleSelectUser(v) {
      this.selectUsers = v;
    },
    selectAllUser() {
      this.$refs.user.setSelectAllUser();
    },
    handleSelectDepTree(v) {
      this.selectDeps = v;
    },
    handleUpload(v) {
      this.picUrl = v;
    },
    processChoose() {
      this.$refs.processChoose.setID("123456");
      this.processModalVisible = true;
    },
    startByKey() {
      this.$refs.processStart.show("leave", "123456");
    },
    cancelProcess() {
      this.$refs.processCancel.show("123456", "123456");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.article {
  font-size: 16px;
  font-weight: 400;
  margin: 12px 0;
}
.blue {
  color: #40a9ff !important;
}
</style>