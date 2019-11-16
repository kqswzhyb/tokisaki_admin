<template>
  <div class="q-pa-md" style="width: 100%">
    <div
      class="row"
      style="width: 100%;justify-content:space-between;margin-bottom:20px;"
    >
      <q-select
        outlined
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
    <q-list bordered padding v-if="data.length !== 0">
      <div v-if="!listLoading">
        <div
          @click="$router.push(`/user/center/${item.id}`)"
          v-for="(item, index) in data"
          :key="item.id"
        >
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.username }}</q-item-label>
              <q-item-label caption>{{ item.userCode }}</q-item-label>
            </q-item-section>

            <q-item-section side top class="flex-center">
              <q-icon name="star" size="xs" style="color:#ff9800;" />
              <span style="color:#ff9800;">{{ item.totalScore }}</span>
            </q-item-section>

            <q-item-section side top class="flex-around">
              <span @click.stop="openDialog(item.id, item.roles.length)">{{
                roleList.find(o => o.value === item.roles.length).label
              }}</span>
              <span
                style="color:#000;"
                @click.stop="openDialog2(item.id, item.userStatus)"
                >{{
                  options2.find(o => o.value === item.userStatus).label
                }}</span
              >
            </q-item-section>
          </q-item>
          <q-separator inset="item" v-if="index !== data.length - 1" />
        </div>
      </div>
      <div v-else class="flex-center" style="height:calc(100vh - 138px);">
        <van-loading type="spinner" color="#000" size="66px" vertical
          ><span style="font-size:24px;">加载中...</span></van-loading
        >
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
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">权限更改</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio v-model="role" :val="1" label="组员" />
            <q-radio v-model="role" :val="2" label="组长" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogShow2"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">状态更改</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio v-model="auth" val="Normal" label="正常" />
            <q-radio v-model="auth" val="Frozen" label="冻结" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Toast, Loading as VanLoading } from "vant";
const groupAll = { id: 0, groupName: "全部" };
const statusAll = {
  value: "All",
  label: "全部"
};
export default {
  components: {
    VanLoading
  },
  name: "members",
  data() {
    return {
      listLoading: false,
      group: groupAll,
      options: [],
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
      selectedId: "",
      role: 0,
      auth: 0
    };
  },
  watch: {
    status: async function(val) {
      try {
        this.listLoading = true;
        let result;
        if (val.label === statusAll.label && this.group.id === groupAll.id) {
          result = await this.$axios.get("/v1/user");
        }
        if (val.label === statusAll.label && this.group.id !== groupAll.id) {
          result = await this.$axios.get(
            `/v1/user/search/?groupId=${this.group.id}`
          );
        }
        if (val.label !== statusAll.label && this.group.id === groupAll.id) {
          result = await this.$axios.get(
            `/v1/user/search/?userStatus=${val.value}`
          );
        }
        if (val.label !== statusAll.label && this.group.id !== groupAll.id) {
          result = await this.$axios.get(
            `/v1/user/search/?groupId=${this.group.id}&&userStatus=${val.value}`
          );
        }
        this.data = result.data.filter(item => item.roles.length !== 3);
        this.listLoading = false;
      } catch (err) {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      }
    },
    group: async function(val) {
      try {
        this.listLoading = true;
        let result;
        if (this.status.label === statusAll.label && val.id === groupAll.id) {
          result = await this.$axios.get("/v1/user");
        }
        if (this.status.label === statusAll.label && val.id !== groupAll.id) {
          result = await this.$axios.get(`/v1/user/search/?groupId=${val.id}`);
        }
        if (this.status.label !== statusAll.label && val.id === groupAll.id) {
          result = await this.$axios.get(
            `/v1/user/search/?userStatus=${this.status.value}`
          );
        }
        if (this.status.label !== statusAll.label && val.id !== groupAll.id) {
          result = await this.$axios.get(
            `/v1/user/search/?groupId=${val.id}&&userStatus=${
              this.status.value
            }`
          );
        }
        this.data = result.data.filter(item => item.roles.length !== 3);
        this.listLoading = false;
      } catch (err) {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      }
    }
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .get("/v1/usergroup/listall")
      .then(async res => {
        if (res.status === 200) {
          this.options = [{ id: 0, groupName: "全部" }, ...res.data];
          const result = await this.$axios.get("/v1/user");
          this.data = result.data.filter(item => item.roles.length !== 3);
          this.$store.commit("app/openLoading", false);
        }
      })
      .catch(() => {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      });
  },
  methods: {
    openDialog(id, type) {
      this.selectedId = id;
      this.role = type;
      this.dialogShow = true;
    },
    openDialog2(id, type) {
      this.selectedId = id;
      this.auth = type;
      this.dialogShow2 = true;
    }
  }
};
</script>
