<template>
  <div class="q-pa-md" style="width: 100%;">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="0"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <q-card
        v-for="item in tasks.slice(0, offset)"
        :key="item.id"
        style="margin-bottom:30px;"
      >
        <q-card-section
          @click="$router.push(`/notice/${item.id}`)"
          style="position:relative;"
        >
          <img
            v-if="new Date(item.endDate).getTime() > currentDate.getTime()"
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <img
            v-else
            src="~assets/svgs/finish.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <div class="text-h6" style="color:#505050;">
            {{ item.taskName }}
          </div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">{{ item.createUser.nickName }}</span>
            {{ item.startDate | prettyDate }}
          </div>
        </q-card-section>
      </q-card>
    </van-list>
  </div>
</template>

<script>
import { List as VanList } from "vant";
export default {
  name: "notices",
  components: {
    VanList
  },
  computed: {
    shorts() {
      return this.$store.state.task.shorts;
    },
    longs() {
      return this.$store.state.task.longs;
    },
    groups() {
      return this.$store.state.group.groups;
    }
  },
  data() {
    return {
      currentDate: new Date(),
      tasks: [],
      timer: "",
      loading: false,
      finished: false,
      offset: 10
    };
  },
  watch: {
    "$route.query": function() {
      this.formatData();
    },
    update: function(val) {
      if (val) {
        this.$emit("load", false);
      }
    }
  },
  props: {
    update: {
      type: Boolean,
      default: false
    }
  },
  created() {
    let types = [0, 1, 2];
    if (!types.includes(Number(this.$route.query.type))) {
      this.$router.push("/404");
    }
    this.$store.commit("app/openLoading", true);
    this.formatData();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.offset < this.tasks.length) {
          this.offset += 10;
        }
        this.loading = false;
        if (this.offset >= this.tasks.length) {
          this.finished = true;
        }
      }, 1000);
    },
    formatData() {
      this.timer = setInterval(() => {
        if (this.groups[0]) {
          clearInterval(this.timer);
          switch (Number(this.$route.query.type)) {
            case 0:
              this.tasks = this.shorts;
              break;
            case 1:
              this.tasks = this.longs;
              break;
            case 2:
              this.tasks = this.shorts.concat(this.longs);
              break;
          }
          this.tasks.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          let working = this.tasks.filter(
            item =>
              new Date(item.endDate).getTime() > this.currentDate.getTime()
          );
          let finish = this.tasks.filter(
            item =>
              new Date(item.endDate).getTime() < this.currentDate.getTime()
          );
          this.tasks = working.concat(finish);
          this.$store.commit("app/openLoading", false);
        }
      }, 500);
    }
  }
};
</script>
