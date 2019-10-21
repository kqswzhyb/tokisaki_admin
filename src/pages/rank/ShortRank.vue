<template>
  <div class="q-pa-md" style="width: 100%;">
    <div style="margin-bottom:20px;">
      <div class="text-weight-medium" style="margin-bottom:5px;">
        本次任务起始时间: 2019.10.19 23:00:00
      </div>
      <div class="text-weight-medium">
        本次任务终止时间: 2019.10.21 09:00:00
      </div>
    </div>

    <q-list bordered padding class="rounded-borders" style="width:100%;">
      <q-item-label header>时崎狂三第二分组</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar top style="position:relative;">
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              style="width:40px;height:40px;"
            />
          </q-avatar>
          <img
            src="~assets/svgs/guanjun.svg"
            style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">name</q-item-label>
          <q-item-label caption>02001</q-item-label>
        </q-item-section>

        <q-item-section side>
          <span class="text-weight-medium" style="color:#e66457;">10</span>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar top style="position:relative;">
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              style="width:40px;height:40px;"
            />
          </q-avatar>
          <img
            src="~assets/svgs/yajun.svg"
            style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">name2</q-item-label>
          <q-item-label caption>02002</q-item-label>
        </q-item-section>

        <q-item-section side>
          <span class="text-weight-medium" style="color:#e66457;">9</span>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar top style="position:relative;">
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              style="width:40px;height:40px;"
            />
          </q-avatar>
          <img
            src="~assets/svgs/jijun.svg"
            style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">name3</q-item-label>
          <q-item-label caption>02003</q-item-label>
        </q-item-section>

        <q-item-section side>
          <span class="text-weight-medium" style="color:#e66457;">7</span>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar top style="position:relative;">
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              style="width:40px;height:40px;"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">name4</q-item-label>
          <q-item-label caption>02004</q-item-label>
        </q-item-section>

        <q-item-section side>
          <span class="text-weight-medium" style="color:#e66457;">6</span>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar top style="position:relative;">
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              style="width:40px;height:40px;"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">name5</q-item-label>
          <q-item-label caption>02005</q-item-label>
        </q-item-section>

        <q-item-section side>
          <span class="text-weight-medium" style="color:#e66457;">6</span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      prompt: false,
      uid: 0,
      name: "",
      remark: ""
    };
  },
  methods: {
    openRemark(name, uid) {
      this.name = name;
      this.uid = uid;
      this.prompt = true;
    }
  }
};
</script>
