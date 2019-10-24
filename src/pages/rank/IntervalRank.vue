<template>
  <div class="q-pa-md" style="width: 100%;">
    <div
      class="row"
      style="width: 100%;justify-content:center; margin-bottom:20px;"
    >
      <q-tabs
        v-model="time"
        dense
        class="text-grey"
        style="width:100%;"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="week" label="周排行" />
        <q-tab name="month" label="月排行" />
        <q-tab name="total" label="总排行" />
      </q-tabs>
    </div>
    <div style="margin-bottom:20px;">
      <div class="text-weight-medium" style="margin-bottom:5px;">
        起始时间: 2019.10.19 23:00:00
      </div>
      <div class="text-weight-medium">
        终止时间: 2019.10.21 09:00:00
      </div>
    </div>

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="one" label="组内排行" />
        <q-tab name="all" label="群内排行" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-list padding class="rounded-borders" style="width:100%;">
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
                <span class="text-weight-medium main">10</span>
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
                <span class="text-weight-medium main">9</span>
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
                <span class="text-weight-medium main">7</span>
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
                <span class="text-weight-medium main">6</span>
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
                <span class="text-weight-medium main">6</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="all">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "intervalRank",
  data() {
    return {
      tasks: [],
      task: "",
      time: "week",
      tab: "one"
    };
  },
  methods: {}
};
</script>
