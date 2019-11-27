<template>
  <div class="q-pa-md" style="width: 100%">
    <div style="margin:20px 0;display:flex;">
      <div>
        <img
          src="https://cdn.quasar.dev/img/avatar2.jpg"
          width="120px;"
          style="border-radius:10px;"
        />
      </div>
      <div style="margin:10px 0 0 50px;">
        <div class="text-h5" style="margin-bottom:5px;">
          <span>{{ info.nickName }}</span>
        </div>
        <div class="text-weight-medium">
          <span class="text-h6" style="color:#505050;">{{
            info.userCode
          }}</span>
        </div>
        <div class="flex-start">
          <q-icon name="star" size="sm" style="color:#ff9800;" />
          <span style="color:#ff9800;" class="text-h6">{{
            info.totalScore
          }}</span>
        </div>
      </div>
    </div>
    <div style="margin-top:50px;">
      <div
        class="text-h6"
        style="padding-bottom:10px;border-bottom:1px solid #E1E1E1;"
      >
        基础资料
      </div>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">QQ：</span>{{ info.qqNo }}
            </p>
          </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">身份：</span
              >{{
                roleList.find(item => item.value === info.roles.length).label
              }}
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div style="margin-top:50px;">
      <div
        class="text-h6"
        style="padding-bottom:10px;border-bottom:1px solid #E1E1E1;"
      >
        帐号资料
      </div>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">状态：</span
              >{{ statuss.find(item => item.value === info.userStatus).label }}
            </p>
          </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">密码：</span>修改密码 >><q-icon
                name="edit"
                style="margin-left:10px;"
                color="primary"
                @click="dialogShow = true"
              />
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">注册时间：</span>
              {{ info.registerDate | prettyDate }}
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div style="margin-top:50px;">
      <div
        class="text-h6"
        style="padding-bottom:10px;border-bottom:1px solid #E1E1E1;"
      >
        任务情况
      </div>
      <div v-if="tasks.length !== 0">
        <van-list
          v-model="hasMore"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <q-card
            class="my-card q-mb-md"
            v-for="item in tasks.slice(0, number)"
            :key="item.id"
          >
            <q-card-section
              @click="
                $router.push(`/user/commit/${item.id}?uid=${$route.params.id}`)
              "
              style="position:relative;"
            >
              <img
                src="~assets/svgs/done.svg"
                style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
              />
              <div class="text-h6" style="color:#505050;">
                {{ item.taskName }}
              </div>
              <div class="text-subtitle2" style="color:#808080;">
                by <span class="main">{{ item.createUser.username }}</span>
                {{ item.startDate | prettyDate }}
              </div>
            </q-card-section>
          </q-card>
        </van-list>
      </div>
      <div v-else class="q-pa-md text-center">还没有完成过任务....</div>
    </div>
    <q-dialog v-model="dialogShow">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">修改密码</div>
        </q-card-section>

        <q-card-section>
          <q-input
            style="margin-bottom:15px;"
            outlined
            type="password"
            onkeydown="if(event.keyCode==32) return false"
            v-model="form.origin"
            label="原密码"
          />
          <q-input
            style="margin-bottom:15px;"
            outlined
            type="password"
            onkeydown="if(event.keyCode==32) return false"
            v-model="form.password"
            label="新密码"
          />
          <q-input
            style="margin-bottom:15px;"
            outlined
            type="password"
            onkeydown="if(event.keyCode==32) return false"
            v-model="form.confirm"
            label="确认密码"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Toast, List as VanList } from "vant";
export default {
  name: "center",
  components: {
    VanList
  },
  data() {
    return {
      dialogShow: false,
      form: {
        origin: "",
        password: "",
        confirm: ""
      },
      roleList: [
        {
          value: 3,
          label: "管理员"
        },
        {
          value: 2,
          label: "组长"
        },
        {
          value: 1,
          label: "组员"
        }
      ],
      number: 10,
      loading: false,
      finished: false,
      statuss: [
        {
          value: "Normal",
          label: "正常"
        },
        {
          value: "Frozen",
          label: "冻结"
        }
      ],
      tab: "short",
      tasks: [],
      hasMore: false,
      info: {}
    };
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .all([
        this.$axios.get(`/v1/user/${this.$route.params.id}`),
        this.$axios.get(`/v1/usertask/user/${this.$route.params.id}/`),
        this.$axios.get(`/v1/task`)
      ])
      .then(
        this.$axios.spread((res, res2, res3) => {
          if (
            res.status === 200 &&
            res2.status === 200 &&
            res3.status === 200
          ) {
            const taskIdList = Array.from(
              new Set(res2.data.map(item => item.task.id))
            );
            this.info = res.data;
            this.tasks = taskIdList.map(item =>
              res3.data.find(item2 => item2.id === item)
            );
            this.$store.commit("app/openLoading", false);
          } else {
            this.$store.commit("app/openLoading", false);
            this.$router.push("/404");
          }
        })
      )
      .catch(() => {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      });
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.number < this.tasks.length) {
          this.number += 10;
        }
        this.hasMore = false;
        if (this.number >= this.tasks.length) {
          this.finished = true;
        }
      }, 1000);
    },
    onReset() {
      this.$refs.form.clearValidate();
      this.form = {
        origin: "",
        password: "",
        confirm: ""
      };
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
