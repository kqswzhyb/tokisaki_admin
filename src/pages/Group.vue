<template>
  <div class="q-pa-md">
    <div class="q-mb-xl">
      <q-btn color="primary" label="新建小组" @click="dialogShow3 = true" />
    </div>
    <div class=" row justify-around">
      <q-card class="q-mb-md" v-for="item in groups" :key="item.id">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 row justify-between">
            <span>{{ item.name }}</span
            ><span>{{ item.status === 0 ? "正常" : "停用" }}</span>
          </div>
          <div class="text-subtitle2" style="color:#ff9800;">
            {{ item.code }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="deep-orange" @click="dialogShow2 = true"
            >邀请码</q-btn
          >
          <q-btn flat style="color: #FF0080;" @click="openDialog(item.status)"
            >状态管理</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="dialogShow2">
      <q-card>
        <q-card-section>
          <div class="text-h6">邀请码更换</div>
        </q-card-section>

        <q-card-section>
          确定重新分配一个新的邀请码给这个小组吗？
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">状态更改</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio v-model="status" :val="0" label="正常" />
            <q-radio v-model="status" :val="1" label="冻结" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确定" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogShow3" @hide="form.name = ''">
      <q-card style="width:300px;">
        <q-card-section>
          <div class="text-h6">新建小组</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined v-model="form.name" label="小组名" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "group",
  data() {
    return {
      groups: [
        {
          id: 1,
          name: "1组",
          code: "2D4FZZ213",
          status: 0
        },
        {
          id: 2,
          name: "2组",
          code: "2D4FZZ213",
          status: 1
        }
      ],
      form: {
        name: ""
      },
      dialogShow3: false,
      dialogShow2: false,
      dialogShow: false,
      status: 0
    };
  },
  methods: {
    openDialog(type) {
      this.status = type;
      this.dialogShow = true;
    }
  }
};
</script>
