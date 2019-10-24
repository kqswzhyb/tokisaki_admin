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

    <q-list>
      <q-expansion-item group="somegroup" icon="explore" label="First" popup>
        <template v-slot:header>
          <q-item style="width: 100%;">
            <q-item-section avatar>
              <div>
                02001<q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    style="margin-left:10px;width:40px;height:40px;"
                  />
                </q-avatar>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label class="leader">name</q-item-label>
              <q-item-label caption>本次任务完成数：10</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-card>
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">QQ：465604612</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">身份：组长</span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">总积分：2000</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">累计票数：100</span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <q-btn
                  color="primary"
                  label="备注"
                  size="sm"
                  @click="openRemark('name', 465604612)"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="somegroup"
        icon="perm_identity"
        label="Second"
        popup
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="somegroup"
        icon="shopping_cart"
        label="Third"
        popup
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item group="somegroup" icon="bluetooth" label="Fourth" popup>
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-dialog v-model="prompt">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">
            给
            <span class="text-weight-medium main">{{ name }}</span>
            备注
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            dense
            v-model="remark"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "shortTask",
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
