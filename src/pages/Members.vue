<template>
  <div class="q-pa-md" style="width: 100%">
    <div
      class="row"
      style="width: 100%;justify-content:space-between;margin-bottom:20px;"
    >
      <q-select
        outlined
        v-if="$store.state.user.info.roles.length >= 3"
        v-model="group"
        :options="options"
        :option-value="item => item.id"
        :option-label="item => item.groupName"
        label="小组组名"
        behavior="menu"
        style="width:40vw;min-width:150px;"
      />
      <q-select
        outlined
        v-model="status"
        :option-value="item => item.value"
        :option-label="item => item.label"
        :options="options2"
        label="组员状态"
        behavior="menu"
        style="width:40vw;min-width:150px;"
      />
    </div>
    <div class="q-mb-md">
      <p style="margin:0 20px;">
        找到数据 <span class="main">{{ data.length || 0 }}</span> 条
      </p>
    </div>

    <q-list bordered padding v-if="data.length !== 0">
      <van-list
        v-if="!listLoading"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多数据了"
        loading-text=""
        :offset="30"
        @load="onLoad"
      >
        <div
          @click="$router.push(`/user/center/${item.id}`)"
          v-for="(item, index) in data.slice(0, number)"
          :key="item.id"
        >
          <q-item>
            <div class="flex-center q-mr-sm">
              <span style="color:#505050;font-size:14px">{{
                item.userGroup ? item.userGroup.groupName : ""
              }}</span>
            </div>
            <q-item-section top avatar>
              <q-avatar>
                <img
                  v-if="item.iconUrl"
                  :src="item.iconUrl.replace('http', 'https')"
                  width="40"
                  height="40"
                />
                <img
                  v-else
                  src="../assets/default_user.jpg"
                  width="40"
                  height="40"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.nickName }}</q-item-label>
              <q-item-label style="color:#666;">{{
                item.username
              }}</q-item-label>
            </q-item-section>

            <q-item-section side top class="flex-center">
              <q-icon name="star" size="xs" style="color:#ff9800;" />
              <span style="color:#ff9800;">{{
                item.totalScore ? item.totalScore : 0
              }}</span>
            </q-item-section>

            <q-item-section side top class="flex-around">
              <span @click.stop="openDialog(item.id, item.roles.length)">{{
                roleList.find(o => o.value === item.roles.length).label
              }}</span>
              <span
                style="color:#000;"
                @click.stop="
                  openDialog2(item.id, item.userStatus, item.roles.length)
                "
                >{{
                  options2.find(o => o.value === item.userStatus).label
                }}</span
              >
            </q-item-section>
          </q-item>
          <q-separator inset="item" v-if="index !== data.length - 1" />
        </div>
      </van-list>
      <div
        v-else
        class="flex-center column"
        style="height:calc(100vh - 138px);"
      >
        <div class="balls">
          <div />
          <div />
          <div />
        </div>
      </div>
    </q-list>
    <div v-else class="flex-center" style="height:calc(100vh - 138px);">
      <span class="text-h5">没有符合要求的数据</span>
    </div>
    <q-dialog
      v-model="dialogShow"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="min-width: 280px;width:90vw;">
        <q-card-section>
          <div class="text-h6">权限更改</div>
        </q-card-section>

        <q-card-section>
          <p>
            将此用户设置为
            <span class="main">{{ role === 2 ? " 组员 " : " 组长 " }}</span>
            ,是否继续
          </p>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" @click="changeRole" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogShow2"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="min-width: 280px;width:90vw;">
        <q-card-section>
          <div class="text-h6">帐号状态更改</div>
        </q-card-section>

        <q-card-section>
          <p>
            将此用户帐号状态为
            <span class="main">{{
              auth === "Normal" ? " 冻结 " : " 正常 "
            }}</span>
            ,是否继续
          </p>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" @click="changeStatus" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Toast, List as VanList } from "vant";
const groupAll = { id: 0, groupName: "全部" };
const statusAll = {
  value: "All",
  label: "全部"
};
export default {
  name: "members",
  components: {
    VanList
  },
  data() {
    return {
      listLoading: false,
      group: groupAll,
      status: statusAll,
      options2: [
        {
          value: "All",
          label: "全部"
        },
        {
          value: "Normal",
          label: "正常"
        },
        {
          value: "Frozen",
          label: "冻结"
        }
      ],
      roleList: [
        {
          value: 2,
          label: "组长"
        },
        {
          value: 1,
          label: "组员"
        }
      ],
      dialogShow: false,
      dialogShow2: false,
      data: [],
      list: [],
      selectedId: "",
      role: 0,
      auth: 0,
      loading: false,
      finished: false,
      number: 10,
      timer: ""
    };
  },
  computed: {
    options() {
      return [{ id: 0, groupName: "全部" }, ...this.groups];
    },
    groups() {
      return this.$store.state.group.groups;
    }
  },
  watch: {
    status: {
      handler: async function(val) {
        if (
          Object.keys(val).length !== 0 &&
          Object.keys(this.group).length !== 0
        ) {
          try {
            this.listLoading = true;
            if (
              val.label === statusAll.label &&
              this.group.id === groupAll.id
            ) {
              this.data = Array.from(this.list);
            }
            if (
              val.label === statusAll.label &&
              this.group.id !== groupAll.id
            ) {
              this.data = this.list.filter(
                item => item.userGroup.id === this.group.id
              );
            }
            if (
              val.label !== statusAll.label &&
              this.group.id === groupAll.id
            ) {
              this.data = this.list.filter(
                item => item.userStatus === val.value
              );
            }
            if (
              val.label !== statusAll.label &&
              this.group.id !== groupAll.id
            ) {
              this.data = this.list.filter(
                item =>
                  item.userStatus === val.value &&
                  item.userGroup.id === this.group.id
              );
            }
            this.initData();
            this.listLoading = false;
          } catch (err) {
            Toast({
              message: "请求出错,请检查网络或刷新重试！",
              duration: 5000
            });
          }
        }
      },
      deep: true
    },
    group: {
      handler: async function(val) {
        if (
          Object.keys(val).length !== 0 &&
          Object.keys(this.status).length !== 0
        ) {
          try {
            this.listLoading = true;
            if (
              this.status.label === statusAll.label &&
              val.id === groupAll.id
            ) {
              this.data = Array.from(this.list);
            }
            if (
              this.status.label === statusAll.label &&
              val.id !== groupAll.id
            ) {
              this.data = this.list.filter(
                item => item.userGroup.id === val.id
              );
            }
            if (
              this.status.label !== statusAll.label &&
              val.id === groupAll.id
            ) {
              this.data = this.list.filter(
                item => item.userStatus === this.status.value
              );
            }
            if (
              this.status.label !== statusAll.label &&
              val.id !== groupAll.id
            ) {
              this.data = this.list.filter(
                item =>
                  item.userStatus === this.status.value &&
                  item.userGroup.id === val.id
              );
            }
            this.initData();
            this.listLoading = false;
          } catch (err) {
            Toast({
              message: "请求出错,请检查网络或刷新重试！",
              duration: 5000
            });
          }
        }
      },
      deep: true
    },
    update: function(val) {
      if (val) {
        this.timer = setInterval(async () => {
          this.listLoading = true;
          if (this.groups[0]) {
            clearInterval(this.timer);
            if (this.$store.state.user.info.user.userGroup) {
              const result = await this.$axios.get(
                `/v1/user/search/?groupId=${
                  this.$store.state.user.info.user.userGroup.id
                }`
              );
              this.list = result.data.filter(item => item.roles.length !== 3);
              this.group = {
                id: this.$store.state.user.info.user.userGroup.id
              };
              this.listLoading = false;
              this.$emit("load", false);
            } else {
              const result = await this.$axios.get("/v1/user");
              this.list = result.data.filter(item => item.roles.length !== 3);
              this.data = Array.from(this.list);
              this.listLoading = false;
              this.$emit("load", false);
            }
          }
        }, 10);
      }
    }
  },
  props: {
    update: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.listLoading = true;
    this.timer = setInterval(async () => {
      this.listLoading = true;
      this.$store.commit("app/openLoading", true);
      if (this.groups[0]) {
        clearInterval(this.timer);
        if (this.$store.state.user.info.user.userGroup) {
          const result = await this.$axios.get(
            `/v1/user/search/?groupId=${
              this.$store.state.user.info.user.userGroup.id
            }`
          );
          this.list = result.data.filter(item => item.roles.length !== 3);
          this.group = { id: this.$store.state.user.info.user.userGroup.id };
          this.listLoading = false;
        } else {
          const result = await this.$axios.get("/v1/user");
          this.list = result.data.filter(item => item.roles.length !== 3);
          this.data = Array.from(this.list);
          this.listLoading = false;
        }
        this.$store.commit("app/openLoading", false);
      }
    }, 10);
  },
  methods: {
    initData() {
      this.loading = false;
      this.finished = false;
      this.number = 10;
    },
    onLoad() {
      setTimeout(() => {
        if (this.number < this.data.length) {
          this.number += 10;
        }
        this.loading = false;
        if (this.number >= this.data.length) {
          this.finished = true;
        }
      }, 1000);
    },
    openDialog(id, type) {
      if (
        this.$store.state.user.info.roles.length >= 2 &&
        this.$store.state.user.info.user.id !== id
      ) {
        this.selectedId = id;
        this.role = type;
        this.dialogShow = true;
      }
    },
    openDialog2(id, type, role) {
      if (this.$store.state.user.info.roles.length > role) {
        this.selectedId = id;
        this.auth = type;
        this.dialogShow2 = true;
      }
    },
    changeStatus() {
      this.$axios
        .post(`/v1/user/changeuserstatus/${this.selectedId}/`)
        .then(res => {
          if (res.status === 200) {
            const index = this.data.findIndex(
              item => item.id === this.selectedId
            );
            this.$set(
              this.data,
              index,
              Object.assign({}, this.data[index], {
                userStatus: this.auth === "Normal" ? "Frozen" : "Normal"
              })
            );
            Toast.success("设置成功");
            this.dialogShow2 = false;
          }
        })
        .catch(() => {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 5000
          });
        });
    },
    changeRole() {
      this.$axios
        .post(`/v1/user/changeuserrole/${this.selectedId}/`)
        .then(res => {
          if (res.status === 200) {
            const index = this.data.findIndex(
              item => item.id === this.selectedId
            );
            this.$set(
              this.data,
              index,
              Object.assign({}, this.data[index], {
                roles:
                  this.role === 2 ? ["ROLE_USER"] : ["ROLE_USER", "ROLE_LEADER"]
              })
            );
            Toast.success("设置成功");
            this.dialogShow = false;
          }
        })
        .catch(() => {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 5000
          });
        });
    }
  }
};
</script>
