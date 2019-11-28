<template>
  <div class="q-pa-md">
    <div style="margin-bottom:20px;">
      当前用户：<span class="text-h6" style="color:#505050;">{{
        nickName
      }}</span>
    </div>
    <div style="margin-bottom:20px;">
      当前任务：<span
        class="text-h6 main"
        @click="$router.push(`/notice/${$route.params.id}`)"
        >{{ taskName }}</span
      >
    </div>
    <div
      v-if="data.length === 0"
      class="flex-center"
      style="flex-direction:column;margin-top:200px;"
    >
      <p>
        <img src="~assets/svgs/sad.svg" style="width:50px;max-width:150px;" />
      </p>
      <span class="text-h5">没有提交过</span>
    </div>
    <q-list bordered class="rounded-borders" v-if="data.length !== 0">
      <van-list
        v-model="hasMore"
        :finished="finished"
        finished-text="没有更多了"
        loading-text=""
        @load="onLoad"
      >
        <q-expansion-item
          expand-separator
          v-for="(item, index) in data.slice(0, number)"
          :key="index"
          :label="`第${index + 1}次`"
          header-class="text-secondary"
        >
          <q-card>
            <q-card-section>
              获得积分：<span
                style="color:#ff9800;border-bottom:1px solid #505050;font-size:16px;"
                @click="open(item.id, index, item.taskScore)"
              >
                {{ item.taskScore }}
              </span>
              分
            </q-card-section>
            <q-card-section>
              提交内容：<q-card-section v-html="ReplaceUrl(item.taskMemo)" />
            </q-card-section>
            <q-card-section>
              提交图片：
              <span v-if="item.images.length === 0">
                没有提交图片
              </span>
              <div v-else style="margin-top:20px;">
                <img
                  :src="item2"
                  v-for="(item2, index2) in item.images"
                  :key="item2"
                  width="80"
                  style="margin-right:10px;"
                  alt=""
                  @click="getImg(item.images, index2)"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </van-list>
    </q-list>
    <q-dialog v-model="prompt" @hide="hide">
      <q-card style="min-width: 350px;width:90%;">
        <q-card-section>
          <div class="text-h6">修改此次提交获得积分</div>
        </q-card-section>
        <q-form @submit="onSubmit" ref="form" class="q-gutter-md">
          <q-card-section>
            <q-input
              dense
              v-model="score"
              autofocus
              type="number"
              style="font-size:15px;"
              :rules="[
                val =>
                  (val && val.indexOf('-') === -1 && val.indexOf('.') === -1) ||
                  '请输入正整数或零'
              ]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <van-button
              class="text-center"
              style="width:80px;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
              type="submit"
              :loading="loading"
              :disabled="loading"
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
import { Toast, Button as VanButton, List as VanList } from "vant";
import { ImagePreview } from "vant";
export default {
  name: "commit",
  components: {
    VanButton,
    VanList
  },
  data() {
    return {
      taskName: "",
      data: [],
      prompt: false,
      score: "",
      selectedId: "",
      index: "",
      loading: false,
      number: 10,
      finished: false,
      hasMore: false,
      nickName: "",
      role: 0
    };
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .all([
        this.$axios.get(
          `/v1/usertask/user/${this.$route.query.uid}/task/${
            this.$route.params.id
          }/`
        ),
        this.$axios.get(`/v1/task/${this.$route.params.id}`),
        this.$axios.get(`/v1/user/${this.$route.query.uid}`)
      ])
      .then(
        this.$axios.spread((res, res2, res3) => {
          if (res.status === 200 && res2.status === 200 && res3.status == 200) {
            this.data = res.data;
            this.nickName = res3.data.nickName;
            this.taskName = res2.data.taskName;
            this.role = res3.data.roles.length;
            this.data = this.data.map(item => {
              return Object.assign({}, item, {
                images:
                  (item.utAttachment &&
                    item.utAttachment.map(
                      item2 =>
                        `${this.$baseURL}/${item2.attachment.attachType
                          .slice(0, 1)
                          .toLowerCase() +
                          item2.attachment.attachType.slice(1)}/${
                          item2.attachment.attachName
                        }.${item2.attachment.attachExtName}`
                    )) ||
                  []
              });
            });
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
        if (this.number < this.data.length) {
          this.number += 10;
        }
        this.hasMore = false;
        if (this.number >= this.data.length) {
          this.finished = true;
        }
      }, 1000);
    },
    ReplaceUrl(text) {
      var re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi;
      if (re.test(text)) {
        return text.replace(re, a => {
          return (
            '<a href="' +
            a +
            '" target=_blank style="text-decoration: underline;color: #00c;">' +
            a +
            "</a>"
          );
        });
      }
      return text;
    },
    getImg(item, index) {
      ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index
      });
    },
    hide() {
      this.score = "";
      this.index = "";
      this.selectedId = "";
      this.prompt = false;
    },
    open(id, index, score) {
      this.score = score;
      this.selectedId = id;
      this.index = index;
      this.prompt = true;
    },
    onSubmit() {
      if (this.$store.state.user.info.roles.length > this.role) {
        this.$refs.form.validate().then(async success => {
          if (success) {
            this.loading = true;
            try {
              const res = await this.$axios.post(
                `/v1/usertask/task/audit/${this.selectedId}/`,
                { taskScore: Number(this.score) },
                {
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                  }
                }
              );
              if (res.status !== 200) {
                Toast({
                  message: `判定积分不能大于${this.data[0].task.taskScore}`
                });
                this.loading = false;
              } else {
                this.data[this.index].taskScore = this.score;
                Toast.success("修改成功");
                this.loading = false;
                this.prompt = false;
              }
            } catch {
              Toast({
                message: "请求出错,请检查网络或刷新重试！",
                duration: 0
              });
              this.loading = false;
            }
          }
        });
      }
    }
  }
};
</script>
