<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="row" style="width: 100%;justify-content:space-between;">
      <q-input
        filled
        v-model="date"
        mask="date"
        style="width: 44vw;margin-top:20px;"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
                :locale="myLocale"
                @input="() => $refs.qDateProxy.hide()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select
        filled
        v-model="model"
        :options="stringOptions"
        style="width: 44vw;"
        behavior="dialog"
      />
    </div>
    <div style="margin-bottom:20px;">
      <div class="text-weight-medium" style="margin-bottom:5px;">
        本次任务起始时间: 2019.10.19 23:00:00
      </div>
      <div class="text-weight-medium">
        本次任务终止时间: 2019.10.21 09:00:00
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
        <q-tab name="all" label="所有排行" />
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
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
export default {
  name: "PageIndex",
  data() {
    return {
      tasks: [],
      task: "",
      date: "2019/02/01",
      model: null,
      stringOptions,
      options: stringOptions,
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
      tab: "one"
    };
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>
