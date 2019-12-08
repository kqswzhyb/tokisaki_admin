<template>
  <div class="q-pa-md">
    <div class="q-mb-xl">
      <q-btn color="primary" label="新建小组" @click="dialogShow3 = true" />
    </div>
    <div class=" row justify-between">
      <q-card class="q-mb-lg" v-for="item in groups" :key="item.id">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 row justify-between">
            <span>{{ item.groupName }}</span
            ><span
              :style="{ color: item.groupStatus === 'Normal' ? '#fff' : 'red' }"
              >{{ item.groupStatus === "Normal" ? "正常" : "停用" }}</span
            >
          </div>
          <div class="text-subtitle2" style="color:#ff9800;">
            {{ item.groupInviteCode }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="deep-orange" @click="openDialog2(item.id)"
            >邀请码</q-btn
          >
          <q-btn
            flat
            style="color: #FF0080;"
            @click="openDialog(item.id, item.groupStatus)"
            >状态管理</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="dialogShow2">
      <q-card>
        <q-card-section>
          <div class="text-h6">邀请码更换</div>
        </q-card-section>

        <q-card-section>
          确定重新分配一个新的邀请码给这个小组吗？
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="changeCode" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogShow"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">状态更改</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio v-model="status" val="Normal" label="正常" />
            <q-radio v-model="status" val="Frozen" label="停用" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogShow3" @hide="form.name = ''">
      <q-card style="width:300px;">
        <q-card-section>
          <div class="text-h6">新建小组</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined v-model="form.name" label="小组名" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="create" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "group",
  data() {
    return {
      form: {
        name: ""
      },
      dialogShow3: false,
      dialogShow2: false,
      dialogShow: false,
      status: 0,
      selectedId: "",
      timer: ""
    };
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    }
  },
  created() {
    this.$store.commit("app/openLoading", true);
    if (this.groups[0]) {
      clearInterval(this.timer);
      this.$store.commit("app/openLoading", false);
    }
  },
  methods: {
    openDialog(id, type) {
      this.status = type;
      this.selectedId = id;
      this.dialogShow = true;
    },
    openDialog2(id) {
      this.selectedId = id;
      this.dialogShow2 = true;
    },
    async changeCode() {
      try {
        const res = await this.$axios.put(
          `/v1/usergroup/updateInviteCode/${this.selectedId}`
        );
        const index = this.groups.findIndex(
          item => item.id === this.selectedId
        );
        this.groups[index].groupInviteCode = res.data.groupInviteCode;
        Toast.success("更换成功");
        this.dialogShow2 = false;
      } catch (err) {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      }
    },
    async create() {
      try {
        await this.$axios.post(
          `/v1/usergroup/save`,
          {
            groupName: this.form.name
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        const res = await this.$store.dispatch("group/getGroups");
        this.groups = res.data;
        this.dialogShow3 = false;
        Toast.success("创建成功");
      } catch (err) {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      }
    },
    async onSubmit() {
      const index = this.groups.findIndex(item => item.id === this.selectedId);
      if (this.groups[index].groupStatus !== this.selectStatus) {
        try {
          await this.$axios.put(
            `/v1/usergroup/updateGroupStatus/${this.selectedId}/?taskType=${
              this.status
            }`
          );
          this.groups[index].groupStatus = this.status;
          Toast.success("修改成功");
          this.dialogShow = false;
        } catch (err) {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        }
      }
      this.dialogFormVisible = false;
    }
  }
};
</script>
