<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="flex-between" style="margin-bottom:20px;">
      <span class="text-h6">短期任务</span>
      <span class="text-h6" @click="$router.push('/notices?type=0')">更多</span>
    </div>
    <q-card class="my-card" style="margin-bottom:30px;">
      <q-card-section
        @click="$router.push('/notice/2')"
        style="position:relative;"
      >
        <img
          src="~assets/svgs/working.svg"
          style="width:40px;height:40px;position:absolute;left:0;top:0;"
        />
        <div class="text-h6" style="color:#505050;">{{ title }}</div>
        <div class="text-subtitle2" style="color:#808080;">
          by <span class="main">玄机妙算</span> 2019.10.19 23:03
        </div>
      </q-card-section>
    </q-card>
    <div class="text-center flex-between" style="margin-bottom:20px;">
      <div class="tag">
        <div class="flex-between">
          <q-icon name="star" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">1000</span>
        </div>
        <div style="color:#fff;" class="text-h5">总积分</div>
      </div>
      <div class="tag2">
        <div class="flex-between">
          <q-icon name="emoji_events" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">3/344</span>
        </div>
        <div style="color:#fff;" class="text-h5">总排名</div>
      </div>
    </div>
    <div>
      <div class="flex-between" style="margin-bottom:20px;">
        <span class="text-h6">长期任务</span>
        <span class="text-h6" @click="$router.push('/notices?type=1')"
          >更多</span
        >
      </div>
      <q-card class="my-card" style="margin-bottom:30px;">
        <q-card-section
          @click="$router.push('/notice/2')"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;left:0;top:0;"
          />
          <div class="text-h6" style="color:#505050;">众筹</div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">玄机妙算</span> 2019.10.19 23:03
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card" style="margin-bottom:30px;">
        <q-card-section
          @click="$router.push('/notice/2')"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;left:0;top:0;"
          />
          <div class="text-h6" style="color:#505050;">征集应援词</div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">玄机妙算</span> 2019.10.19 23:03
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card" style="margin-bottom:30px;">
        <q-card-section
          @click="$router.push('/notice/2')"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;left:0;top:0;"
          />
          <div class="text-h6" style="color:#505050;">征集手绘作品</div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">玄机妙算</span> 2019.10.19 23:03
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "世萌外交"
    };
  },
  methods: {}
};
</script>
