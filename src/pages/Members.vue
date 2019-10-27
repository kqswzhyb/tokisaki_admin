<template>
  <div class="q-pa-md" style="width: 100%">
    <div
      class="row"
      style="width: 100%;justify-content:space-between;margin-bottom:20px;"
    >
      <q-select
        outlined
        v-model="member"
        :options="options"
        label="小组组名"
        behavior="menu"
        style="width:150px;"
      />
      <q-select
        outlined
        v-model="status"
        :options="options2"
        label="组员状态"
        behavior="menu"
        style="width:150px;"
      />
    </div>
    <q-list bordered padding>
      <div @click="$router.push('/user/center/2')">
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>玄机妙算</q-item-label>
            <q-item-label caption>02001</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <span @click.stop="openDialog(1)">组长</span>
            <span style="color:#ff9800;">1000</span>
          </q-item-section>
        </q-item>
        <q-separator inset="item" />
      </div>
      <div @click="$router.push('/user/center/2')">
        <q-item @click="$router.push('/user/center/2')">
          <q-item-section top avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>时光无声</q-item-label>
            <q-item-label caption>02002</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <span @click.stop="openDialog(0)">组员</span>
            <span style="color:#ff9800;">2000</span>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
    <q-dialog
      v-model="dialogShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">权限更改</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio v-model="role" :val="0" label="组员" />
            <q-radio v-model="role" :val="1" label="组长" />
          </div>
          <div class="q-gutter-sm">
            <q-radio v-model="auth" :val="0" label="正常" />
            <q-radio v-model="auth" :val="1" label="冻结" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "members",
  data() {
    return {
      member: "2组",
      options: ["1组", "2组", "3组", "4组", "5组"],
      status: "全部",
      options2: ["全部", "正常", "冻结"],
      dialogShow: false,
      role: 0,
      auth: 0
    };
  },
  methods: {
    openDialog(type) {
      this.role = type;
      this.dialogShow = true;
    }
  }
};
</script>
