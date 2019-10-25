<template>
  <div class="q-pa-md">
    <q-input outlined v-model="form.title" label="标题" />
    <div
      class="q-gutter-sm"
      style="display:flex;align-items:center;font-size:16px;margin:10px;"
    >
      <span>任务类型：</span>
      <q-radio v-model="form.type" :val="0" label="短期" />
      <q-radio v-model="form.type" :val="1" label="长期" />
    </div>
    <q-input outlined v-model="form.score" label="积分" />
    <q-input
      filled
      v-model="form.start"
      label="起始时间"
      style="margin-top:20px;"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date
              v-model="form.start"
              :locale="myLocale"
              mask="YYYY-MM-DD HH:mm"
            />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="form.start" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      filled
      v-model="form.end"
      label="结束时间"
      style="margin-top:20px;"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date
              v-model="form.end"
              :locale="myLocale"
              mask="YYYY-MM-DD HH:mm"
            />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="form.end" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-editor
      v-model="form.text"
      toolbar-bg="secondary"
      style="margin:20px 0;"
      min-height="5rem"
    />
    <van-uploader style="margin:20px 0;" v-model="form.images" multiple />
    <q-btn
      label="发布"
      style="width:100%;"
      size="md"
      color="secondary"
      rounded
      v-close-popup
    />
  </div>
</template>

<script>
import { Uploader as VanUploader } from "vant";
export default {
  name: "editTask",
  data: function() {
    return {
      form: {
        title: "世萌外交",
        type: 0,
        score: "1",
        start: "2019-10-21 22：00",
        end: "2019-10-22 22：00",
        text: `<div style="text-align: right;"><div style="text-align: left;">世萌绿宝石项链赛外交</div><div style="text-align: left;">时间：10.19日晚23:00--10.20日晚23.00&nbsp;</div><div style="text-align: left;">票根发给组长</div><div style="text-align: left;">外交：</div><div style="text-align: left;">绿宝石项链赛：</div><div style="text-align: left;">时崎狂三（1）</div><div style="text-align: left;">绿宝石垂饰赛：</div><div style="text-align: left;">冈崎朋也（1）</div><div style="text-align: left;">萌皇赛：蕾姆</div><div style="text-align: left;">夏季番：格蕾-《君主埃尔梅罗二世事件簿》</div><div style="text-align: left;">莱妮丝··埃尔梅罗·阿奇佐尔缇</div><div style="text-align: left;">网址：https://www.internationalsaimoe.com/voting</div><div style="text-align: left;">注意事项</div><div style="text-align: left;">1.截图要带上时间和voteID！！！注意截图要文字部分。</div><div style="text-align: left;">要能够看到[时崎狂三-1]</div><div style="text-align: left;">2.打不开请耐心等待一会，或者刷新再试试</div><div style="text-align: left;">建议截长图，不用截角色图直接截文字部分</div></div>`,
        images: [
          { url: "https://cdn.quasar.dev/img/mountains.jpg" },
          { url: "https://cdn.quasar.dev/img/parallax1.jpg" },
          { url: "https://cdn.quasar.dev/img/parallax2.jpg" },
          { url: "https://cdn.quasar.dev/img/quasar.jpg" }
        ]
      },
      myLocale: {
        /* starting with Sunday */
        days: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        daysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
          "_"
        ),
        firstDayOfWeek: 1
      }
    };
  },
  components: {
    VanUploader
  }
};
</script>
