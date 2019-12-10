<template>
  <div class="q-pa-md" style="width: 100%">
    <div style="margin:20px 0;display:flex;">
      <div>
        <img
          v-if="info.iconUrl"
          :src="info.iconUrl.replace('http', 'https')"
          width="120"
          height="120"
          style="border-radius:10px;"
        />
        <img
          v-else
          src="../../assets/default_user.jpg"
          width="120"
          height="120"
          style="border-radius:10px;"
        />
      </div>
      <div style="margin:10px 0 0 50px;">
        <div style="margin-bottom:5px;font-size:18px;">
          <span>{{ info.nickName }}</span>
        </div>
        <div
          class="flex-start"
          @click="$router.push(`/user/scores/${$route.params.id}`)"
        >
          <q-icon name="star" size="sm" style="color:#ff9800;" />
          <span style="color:#ff9800;" class="text-h6">{{
            info.totalScore ? info.totalScore : 0
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
              <span style="color:#999;">QQ：</span>{{ info.username }}
            </p>
          </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">身份：</span
              >{{
                roleList.find(
                  item => item.value === info.roles && info.roles.length
                ).label
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
        <q-item-section
          top
          v-if="$store.state.user.info.user.id === $route.params.id"
        >
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
    <q-dialog v-model="dialogShow" @hide="hide">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">修改密码</div>
        </q-card-section>
        <q-form @submit="onSubmit" ref="form">
          <q-card-section>
            <q-input
              style="margin-bottom:15px;"
              outlined
              type="password"
              onkeydown="if(event.keyCode==32) return false"
              v-model="form.origin"
              label="原密码"
              :rules="[
                val =>
                  (val &&
                    val.length >= 6 &&
                    /^[\u4e00-\u9fa5A-Za-z0-9]+$/gi.test(val)) ||
                  '请输入至少6位字母和数字'
              ]"
            />
            <q-input
              style="margin-bottom:15px;"
              outlined
              type="password"
              onkeydown="if(event.keyCode==32) return false"
              v-model="form.password"
              label="新密码"
              :rules="[
                val =>
                  (val &&
                    val.length >= 6 &&
                    /^[\u4e00-\u9fa5A-Za-z0-9]+$/gi.test(val)) ||
                  '请输入至少6位字母和数字'
              ]"
            />
            <q-input
              style="margin-bottom:15px;"
              outlined
              type="password"
              onkeydown="if(event.keyCode==32) return false"
              v-model="form.confirm"
              label="确认密码"
              :rules="[
                val =>
                  (val && val === form.password) || '确认密码必须和密码一样'
              ]"
            />
          </q-card-section>

          <q-card-actions align="right">
            <van-button
              style="width:80px;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
              type="submit"
              :loading="submitLoading"
              :disabled="submitLoading"
              loading-text="正在提交"
              >确定</van-button
            >
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Toast, List as VanList, Button as VanButton } from "vant";
export default {
  name: "center",
  components: {
    VanList,
    VanButton
  },
  data() {
    return {
      submitLoading: false,
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
  watch: {
    "$route.params.id": function() {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
    task() {
      return this.$store.state.task.tasks;
    }
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
    getData() {
      this.$store.commit("app/openLoading", true);
      this.$axios
        .all([
          this.$axios.get(`/v1/user/${this.$route.params.id}`),
          this.$axios.get(`/v1/usertask/user/${this.$route.params.id}/`)
        ])
        .then(
          this.$axios.spread((res, res2) => {
            if (res.status === 200 && res2.status === 200) {
              const taskIdList = Array.from(
                new Set(res2.data.map(item => item.task.id))
              );
              this.info = res.data;
              this.timer = setInterval(async () => {
                this.$store.commit("app/openLoading", true);
                if (this.groups[0]) {
                  clearInterval(this.timer);
                  this.tasks = taskIdList.map(item =>
                    this.task.find(item2 => item2.id === item)
                  );
                  this.$store.commit("app/openLoading", false);
                }
              }, 500);
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
    hide() {
      this.form = {
        origin: "",
        password: "",
        confirm: ""
      };
      this.dialogShow = false;
    },
    onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          this.submitLoading = true;
          this.$axios
            .post(
              "/v1/user/changePassword/",
              {
                oldPassword: this.form.origin,
                newPassword: this.form.password
              },
              {
                headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                }
              }
            )
            .then(res => {
              if (res.status === 200) {
                this.submitLoading = false;
                Toast.success("修改成功");
                this.dialogShow = false;
              } else {
                this.submitLoading = false;
                Toast("原密码错误");
              }
            })
            .catch(() => {
              Toast({
                message: "请求出错,请检查网络或刷新重试！",
                duration: 0
              });
            });
        }
      });
    }
  }
};
</script>
