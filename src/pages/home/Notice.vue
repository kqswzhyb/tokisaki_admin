<template>
  <div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      v-if="images.length !== 0"
      infinite
      navigation
      autoplay
      height="200px"
    >
      <q-carousel-slide
        v-for="(item, index) in images"
        :key="index"
        :name="index"
        :img-src="item"
        @click="getImg(images, index)"
      />
    </q-carousel>

    <q-card-section>
      <div class="text-h5 flex-between">
        {{ data.taskName }}
        <img
          v-if="new Date(data.endDate).getTime() > currentDate.getTime()"
          src="~assets/svgs/working.svg"
          style="width:40px;height:40px"
        />
        <img
          v-else
          src="~assets/svgs/finish.svg"
          style="width:40px;height:40px;"
        />
        <div>
          <q-icon
            name="edit"
            v-if="$store.state.user.info.roles.length >= 3"
            class="text-primary"
            style="font-size: 20px;margin-right:15px;"
            @click="$router.push(`/task/edit/${data.id}`)"
          />
          <q-icon
            name="cloud_download"
            v-if="$store.state.user.info.roles.length >= 3"
            class="text-primary"
            style="font-size: 20px;"
          />
        </div>
      </div>
      <div class="text-subtitle2 text-left">
        by
        <span class="main">{{
          data.createUser && data.createUser.username
        }}</span>
      </div>
      <div class="text-subtitle2">
        <span class="font">任务开始时间：</span>
        {{ data.startDate | prettyDate }}
      </div>
      <div class="text-subtitle2">
        <span class="font">任务结束时间：</span> {{ data.endDate | prettyDate }}
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section v-html="ReplaceUrl(data.taskDetail)" />
    <div
      class="flex-between"
      style="padding:0 15px 15px 15px;justify-content:flex-start;"
    >
      <span style="font-size:16px;margin-right:5px;" class="main"
        >每次完成任务可获得</span
      >
      <q-icon name="star" size="sm" style="color:#ff9800;margin-right:5px;" />
      <span style="color:#ff9800;" class="text-h6">{{ data.taskScore }}</span>
    </div>
    <q-card-actions align="right" class="q-mb-lg">
      <q-btn
        label="提交记录"
        color="warning"
        glossy
        v-close-popup
        @click="
          $router.push(
            `/user/commit/${$route.params.id}?uid=${
              $store.state.user.info.user.id
            }`
          )
        "
      />
      <q-btn
        label="本次排行"
        color="white"
        glossy
        text-color="black"
        v-close-popup
        @click="
          $router.push(
            `/rank/${data.taskType === 'ShortTerm' ? 'short' : 'long'}?id=${
              data.id
            }`
          )
        "
      />
      <q-btn
        v-if="new Date(data.endDate).getTime() > currentDate.getTime()"
        label="去完成任务"
        color="primary"
        glossy
        v-close-popup
        @click="$router.push(`/task/do/${data.id}?name=${data.taskName}`)"
      />
    </q-card-actions>
  </div>
</template>

<script>
import { ImagePreview, Toast } from "vant";
export default {
  name: "notice",
  data() {
    return {
      currentDate: new Date(),
      slide: 0,
      confirm: false,
      data: {},
      images: []
    };
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .get(`/v1/task/${this.$route.params.id}`)
      .then(res => {
        if (res.status === 200) {
          this.data = res.data;
          if (res.data.taskAttachment) {
            res.data.taskAttachment.forEach(item => {
              this.images.push(
                `${this.$baseURL}/${item.attachment.attachType
                  .slice(0, 1)
                  .toLowerCase() + item.attachment.attachType.slice(1)}/${
                  item.attachment.attachName
                }.${item.attachment.attachExtName}`
              );
            });
          }
          this.$store.commit("app/openLoading", false);
        }
        if (res.status === 202) {
          this.$store.commit("app/openLoading", false);
          this.$router.push("/404");
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
    }
  }
};
</script>
