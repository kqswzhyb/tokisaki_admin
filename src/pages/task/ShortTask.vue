<template>
  <div class="q-pa-md" style="width: 100%;">
    <div style="margin-bottom:20px;" @click="$router.push('/notice/2')">
      <span class="text-h6 main">世萌外交</span>
    </div>
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
              <q-item-label caption>完成数：10</q-item-label>
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
                <q-btn
                  color="primary"
                  label="他的提交"
                  size="sm"
                  @click="$router.push('/user/commit/2')"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">备注：{{ remark }}</span>
                <q-popup-edit v-model="remark" title="备注">
                  <q-input v-model="remark" dense autofocus counter />
                </q-popup-edit>
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
      remark: "无"
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
