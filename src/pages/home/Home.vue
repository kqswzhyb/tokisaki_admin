<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="flex-between" style="margin-bottom:20px;">
      <span class="text-h6">短期任务</span>
      <span class="text-h6" @click="$router.push('/notices?type=0')">更多</span>
    </div>
    <q-card class="my-card" style="margin-bottom:30px;">
      <q-card-section
        v-if="
          shorts.some(
            item => new Date(item.endDate).getTime() > new Date().getTime()
          )
        "
        @click="$router.push(`/notice/${shorts[0].id}`)"
        style="position:relative;"
      >
        <img
          src="~assets/svgs/working.svg"
          style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
        />
        <div class="text-h6" style="color:#505050;">
          {{ shorts[0].taskName }}
        </div>
        <div class="text-subtitle2" style="color:#808080;">
          by <span class="main">{{ shorts[0].createUser.username }}</span>
          {{ shorts[0].startDate | prettyDate }}
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="q-pa-md text-center">暂无正在进行中的任务....</div>
      </q-card-section>
    </q-card>
    <div class="text-center flex-between" style="margin-bottom:20px;">
      <div class="tag">
        <div class="flex-center">
          <!-- <q-icon name="star" size="lg" color="white" /> -->
          <div style="color:#fff;" class="text-h5 text-center">
            {{ $store.state.user.info.user.totalScore }}
          </div>
        </div>
        <div style="color:#fff;" class="text-h5">总积分</div>
      </div>
      <div
        class="tag"
        style="background-color:#e66457;"
        @click="$router.push('/rank/interval?type=total')"
      >
        <div class="flex-center">
          <!-- <q-icon name="emoji_events" size="lg" color="white" /> -->
          <div style="color:#fff;" class="text-h5 text-center">
            {{ rank.total }}
          </div>
        </div>
        <div style="color:#fff;" class="text-h5 ">总排名</div>
      </div>
    </div>
    <div class="text-center flex-between" style="margin-bottom:20px;">
      <div
        class="tag"
        style="background-color:#21BA45;"
        @click="$router.push('/rank/interval?type=week')"
      >
        <div class="flex-center">
          <!-- <q-icon name="event_note" size="lg" color="white" /> -->
          <div style="color:#fff;" class="text-h5 text-center">
            {{ rank.week }}
          </div>
        </div>
        <div style="color:#fff;" class="text-h5">周排名</div>
      </div>
      <div
        class="tag"
        style="background-color:#26A69A;"
        @click="$router.push('/rank/interval?type=month')"
      >
        <div class="flex-center">
          <!-- <q-icon name="update" size="lg" color="white" /> -->
          <div style="color:#fff;" class="text-h5 text-center">
            {{ rank.month }}
          </div>
        </div>
        <div style="color:#fff;" class="text-h5">月排名</div>
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
          v-if="
            longs.some(
              item => new Date(item.endDate).getTime() > new Date().getTime()
            )
          "
          @click="$router.push(`/notice/${longs[0].id}`)"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <div class="text-h6" style="color:#505050;">
            {{ longs[0].taskName }}
          </div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">{{ longs[0].createUser.username }}</span>
            {{ longs[0].startDate | prettyDate }}
          </div>
        </q-card-section>
        <q-card-section v-else>
          <div class="q-pa-md text-center">暂无正在进行中的任务....</div>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <div class="flex-between" style="margin-bottom:20px;">
        <span class="text-h6">积分奖励</span>
      </div>
      <q-card class="my-card" style="margin-bottom:30px;">
        <q-card-section
          @click="$router.push('/reward')"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <div class="text-h6" style="color:#505050;">
            积分奖励一览
          </div>
          <div class="text-subtitle2" style="color:#808080;">
            <p
              style="font-size:14px;color:#666;line-height:20px;margin-top:15px;"
            >
              达到积分节点请联系时光，QQ：2507321376
            </p>
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
      currentDate: new Date()
    };
  },
  computed: {
    rank() {
      return this.$store.state.rank.rank;
    },
    shorts() {
      return this.$store.state.task.shorts;
    },
    longs() {
      return this.$store.state.task.longs;
    }
  }
};
</script>
