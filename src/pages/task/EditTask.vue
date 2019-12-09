<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.taskName"
        label="标题"
        :rules="[val => (val && val.length > 0) || '请输入标题']"
      />
      <div
        class="q-gutter-sm"
        style="display:flex;align-items:center;font-size:16px;margin:10px;"
      >
        <span>任务类型：</span>
        <q-radio v-model="form.taskType" val="ShortTerm" label="短期" />
        <q-radio v-model="form.taskType" val="LongTerm" label="长期" />
      </div>
      <q-input
        outlined
        type="number"
        v-model="form.taskScore"
        label="积分"
        :rules="[
          val =>
            (val && val.indexOf('-') === -1 && val.indexOf('.') === -1) ||
            '请输入正整数或零'
        ]"
      />
      <q-input
        filled
        v-model="form.startDate"
        label="起始时间"
        style="margin-top:20px;"
        :rules="[
          v =>
            /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d)$/.test(
              v
            ) || '请选择正确的时间'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                v-model="form.startDate"
                :options="options"
                :locale="myLocale"
                mask="YYYY-MM-DD HH:mm"
              />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="form.startDate"
                mask="YYYY-MM-DD HH:mm"
                format24h
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        v-model="form.endDate"
        label="结束时间"
        style="margin-top:20px;"
        :rules="[
          v =>
            /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d)$/.test(
              v
            ) || '请选择正确的时间'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                v-model="form.endDate"
                :locale="myLocale"
                mask="YYYY-MM-DD HH:mm"
              />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="form.endDate"
                mask="YYYY-MM-DD HH:mm"
                format24h
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="q-ml-md">
        <q-editor
          v-model="form.taskDetail"
          toolbar-bg="secondary"
          style="margin:20px 0;"
          min-height="5rem"
        />
        <MyUploader
          style="margin:20px 0;"
          ref="child"
          :image="images"
          :count="6"
          @input="getImages"
          @img="getImage"
        />
      </div>
      <div class="q-ml-md">
        <van-button
          style="width:100%;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
          type="submit"
          :loading="loading"
          :disabled="loading"
          loading-text="正在提交"
          round
          >修改</van-button
        >
      </div>
    </q-form>
  </div>
</template>

<script>
import { Toast, Button as VanButton } from "vant";
import MyUploader from "../../components/Upload";
import dayjs from "dayjs";
export default {
  name: "editTask",
  data: function() {
    return {
      form: {
        taskName: "",
        taskType: "ShortTerm",
        taskScore: "",
        startDate: "",
        endDate: "",
        taskDetail: "",
        images: []
      },
      images: [],
      loading: false,
      myLocale: {
        /* starting with Sunday */
        days: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        daysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
          "_"
        ),
        firstDayOfWeek: 1
      },
      timer: ""
    };
  },
  components: {
    MyUploader,
    VanButton
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
    tasks() {
      return this.$store.state.task.tasks.find(
        item => item.id === this.$route.params.id
      );
    }
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.timer = setInterval(() => {
      if (this.groups[0]) {
        clearInterval(this.timer);
        this.form.taskName = this.tasks.taskName;
        this.form.taskType = this.tasks.taskType;
        this.form.taskScore = String(this.tasks.taskScore);
        this.form.taskDetail = this.tasks.taskDetail;
        this.form.startDate = dayjs
          .utc(this.tasks.startDate)
          .local()
          .format("YYYY-MM-DD HH:mm");
        this.form.endDate = dayjs
          .utc(this.tasks.endDate)
          .local()
          .format("YYYY-MM-DD HH:mm");
        if (this.tasks.taskAttachment) {
          this.tasks.taskAttachment.forEach(item => {
            this.images.push(
              Object.assign(
                {},
                {
                  url: `${this.$baseURL}/${item.attachment.attachType
                    .slice(0, 1)
                    .toLowerCase() + item.attachment.attachType.slice(1)}/${
                    item.attachment.attachName
                  }.${item.attachment.attachExtName}`,
                  attachment: item.attachment
                }
              )
            );
          });
        }
        this.$store.commit("app/openLoading", false);
      }
    }, 500);
  },
  methods: {
    getImage(data) {
      this.form.images = data;
    },
    async getImages(data) {
      try {
        const res = await this.$axios.put(
          `/v1/task/${this.$route.params.id}`,
          {
            taskName: this.form.taskName,
            startDate: dayjs
              .utc(this.form.startDate)
              .subtract(8, "hour")
              .format(),
            endDate: dayjs
              .utc(this.form.endDate)
              .subtract(8, "hour")
              .format(),
            taskType: this.form.taskType,
            taskScore: this.form.taskScore,
            taskDetail: this.form.taskDetail,
            taskAttachment: data
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        if (res.status !== 200) {
          Toast({
            message: "错误",
            duration: 0
          });
          this.loading = false;
        } else {
          Toast.success("修改成功");
          this.loading = false;
          setTimeout(() => {
            this.$router.push(`/notice/${this.$route.params.id}`);
          }, 2000);
        }
      } catch {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
        this.loading = false;
      }
    },
    options(date) {
      return (
        date >=
        dayjs
          .utc(Date.now())
          .local()
          .format("YYYY/MM/DD")
      );
    },
    onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          if (!this.form.taskDetail) {
            Toast({
              message: "任务内容不能为空"
            });
          } else {
            this.loading = true;
            if (this.form.images.length === 0) {
              try {
                const res = await this.$axios.put(
                  `/v1/task/${this.$route.params.id}`,
                  {
                    taskName: this.form.taskName,
                    startDate: dayjs
                      .utc(this.form.startDate)
                      .subtract(8, "hour")
                      .format(),
                    endDate: dayjs
                      .utc(this.form.endDate)
                      .subtract(8, "hour")
                      .format(),
                    taskType: this.form.taskType,
                    taskScore: this.form.taskScore,
                    taskDetail: this.form.taskDetail
                  },
                  {
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8"
                    }
                  }
                );
                if (res.status !== 200) {
                  Toast({
                    message: "错误",
                    duration: 0
                  });
                  this.loading = false;
                } else {
                  Toast.success("修改成功");
                  setTimeout(() => {
                    this.$router.push(`/notice/${this.$route.params.id}`);
                  }, 2000);
                  this.loading = false;
                }
              } catch {
                Toast({
                  message: "请求出错,请检查网络或刷新重试！",
                  duration: 0
                });
                this.loading = false;
              }
            } else {
              this.$refs.child.load();
            }
          }
        }
      });
    }
  }
};
</script>
