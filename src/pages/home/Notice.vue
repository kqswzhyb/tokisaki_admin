<template>
  <div>
    <q-card class="my-card">
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
        />
      </q-carousel>

      <q-card-section>
        <div
          class="text-h5"
          style="display:flex;justify-content:space-between;"
        >
          {{ title }}
          <div>
            <q-icon
              name="edit"
              class="text-primary"
              style="font-size: 20px;margin-right:15px;"
              @click="confirm = true"
            />
            <q-icon
              name="delete"
              class="text-primary"
              style="font-size: 20px;"
              @click="alert = true"
            />
          </div>
        </div>
        <div class="text-subtitle2">
          by <span class="main">玄机妙算</span> 2019.10.19 23:03
        </div>
      </q-card-section>

      <q-card-section v-html="ReplaceUrl(editor)" />
      <q-card-actions align="right">
        <q-btn
          label="本次排行"
          color="white"
          text-color="black"
          v-close-popup
          @click="$router.push('/rank/short/2')"
        />
        <q-btn label="去完成任务" color="primary" glossy v-close-popup />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">警告</div>
        </q-card-section>

        <q-card-section>
          此操作将删除这条公告，是否继续操作
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="否" color="primary" v-close-popup />
          <q-btn flat label="是" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm">
      <q-card style="padding:10px;">
        <q-input
          outlined
          v-model="title"
          label="标题"
          style="margin-bottom:15px;"
        />
        <q-editor v-model="editor" toolbar-bg="secondary" min-height="5rem" />
        <q-uploader
          url="http://localhost:4444/upload"
          style="width:100%;margin:20px 0;"
          dark
          multiple
          accept="image/*"
          :max-file-size="1024 * 1024"
        />
        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="发布" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      slide: 1,
      confirm: false,
      alert: false,
      title: "世萌外交",
      images: [
        "https://cdn.quasar.dev/img/mountains.jpg",
        "https://cdn.quasar.dev/img/parallax1.jpg",
        "https://cdn.quasar.dev/img/parallax2.jpg",
        "https://cdn.quasar.dev/img/quasar.jpg"
      ],
      editor: `<div style="text-align: right;"><div style="text-align: left;">世萌绿宝石项链赛外交</div><div style="text-align: left;">时间：10.19日晚23:00--10.20日晚23.00&nbsp;</div><div style="text-align: left;">票根发给组长</div><div style="text-align: left;">外交：</div><div style="text-align: left;">绿宝石项链赛：</div><div style="text-align: left;">时崎狂三（1）</div><div style="text-align: left;">绿宝石垂饰赛：</div><div style="text-align: left;">冈崎朋也（1）</div><div style="text-align: left;">萌皇赛：蕾姆</div><div style="text-align: left;">夏季番：格蕾-《君主埃尔梅罗二世事件簿》</div><div style="text-align: left;">莱妮丝··埃尔梅罗·阿奇佐尔缇</div><div style="text-align: left;">网址：https://www.internationalsaimoe.com/voting</div><div style="text-align: left;">注意事项</div><div style="text-align: left;">1.截图要带上时间和voteID！！！注意截图要文字部分。</div><div style="text-align: left;">要能够看到[时崎狂三-1]</div><div style="text-align: left;">2.打不开请耐心等待一会，或者刷新再试试</div><div style="text-align: left;">建议截长图，不用截角色图直接截文字部分</div></div>`
    };
  },
  methods: {
    ReplaceUrl(text) {
      var re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi;
      var s = text.replace(re, a => {
        return '<a href="' + a + '" target=_blank>' + a + "</a>";
      });
      return s;
    }
  }
};
</script>
