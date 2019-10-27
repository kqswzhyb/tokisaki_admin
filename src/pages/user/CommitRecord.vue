<template>
  <div class="q-pa-md">
    <div style="margin-bottom:20px;">
      当前用户：<span class="text-h6" style="color:#505050;">玄机妙算</span>
    </div>
    <div style="margin-bottom:20px;">
      当前任务：<span class="text-h6 main" @click="$router.push('/notice/2')"
        >评论点赞</span
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
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        v-for="(item, index) in data"
        :key="index"
        :label="`第${index + 1}次`"
        header-class="text-secondary"
      >
        <q-card>
          <q-card-section>
            获得积分：<span style="color:#ff9800;">{{ item.score }}</span>
            分
            <q-popup-edit v-model="item.score" title="修改本次提交积分">
              <q-input v-model="item.score" dense autofocus counter />
            </q-popup-edit>
          </q-card-section>
          <q-card-section>
            提交内容：<q-card-section v-html="ReplaceUrl(item.text)" />
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
    </q-list>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "doTask",
  data() {
    return {
      data: [
        {
          images: [
            "https://cdn.quasar.dev/img/mountains.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/quasar.jpg"
          ],
          text: "What you see is <b>what</b> you get.",
          score: 1
        },
        {
          images: [
            // "https://cdn.quasar.dev/img/mountains.jpg",
            // "https://cdn.quasar.dev/img/parallax1.jpg",
            // "https://cdn.quasar.dev/img/parallax2.jpg",
            // "https://cdn.quasar.dev/img/quasar.jpg"
          ],
          text: "2222What you see is <b>what</b> you get.",
          score: 1
        }
      ]
    };
  },
  methods: {
    ReplaceUrl(text) {
      var re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi;
      var s = text.replace(re, a => {
        return '<a href="' + a + '" target=_blank>' + a + "</a>";
      });
      return s;
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
