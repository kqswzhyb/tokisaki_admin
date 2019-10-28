<template>
  <div class="q-pa-md" style="width: 100%">
    <div style="margin:20px 0;display:flex;">
      <div>
        <img
          src="https://cdn.quasar.dev/img/avatar2.jpg"
          width="120px;"
          style="border-radius:10px;"
        />
      </div>
      <div style="margin:10px 0 0 50px;">
        <div class="text-h5" style="margin-bottom:5px;">
          <span>玄机妙算</span>
        </div>
        <div class="text-weight-medium">
          <span class="text-h6" style="color:#505050;">02001</span>
        </div>
        <div class="flex-start">
          <q-icon name="star" size="sm" style="color:#ff9800;" />
          <span style="color:#ff9800;" class="text-h6">1000</span>
        </div>
      </div>
    </div>
    <div style="margin-top:50px;">
      <div
        class="text-h6"
        style="padding-bottom:10px;border-bottom:1px solid #E1E1E1;"
      >
        基础资料
      </div>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">QQ：</span>465604612
            </p>
          </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">身份：</span>组长
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div style="margin-top:50px;">
      <div
        class="text-h6"
        style="padding-bottom:10px;border-bottom:1px solid #E1E1E1;"
      >
        帐号资料
      </div>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">状态：</span>正常
            </p>
          </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">密码：</span>修改密码 >><q-icon
                name="edit"
                style="margin-left:10px;"
                color="primary"
                @click="dialogShow = true"
              />
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">注册时间：</span> 2019-10-21 22：01
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div style="margin-top:50px;">
      <div
        class="text-h6"
        style="padding-bottom:10px;border-bottom:1px solid #E1E1E1;"
      >
        任务情况
      </div>
      <q-item style="margin-top:20px;">
        <q-item-section top>
          <q-item-label lines="1">
            <p class="text-weight-medium">
              <span style="color:#999;">最近提交：</span> 2019-10-21 22：01
            </p>
          </q-item-label>
        </q-item-section>
      </q-item>
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
          <q-tab name="short" label="短期任务" />
          <q-tab name="long" label="长期任务" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="short">
            <q-list padding class="rounded-borders" style="width:100%;">
              <q-item clickable v-ripple @click="$router.push('/notice/2')">
                <q-item-section>
                  <q-item-label lines="1"
                    ><span class="text-h6" style="color:#505050;"
                      >世萌外交</span
                    ></q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <span class="text-weight-medium main">10</span>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="$router.push('/notice/2')">
                <q-item-section>
                  <q-item-label lines="1"
                    ><span class="text-h6" style="color:#505050;"
                      >世萌外交2</span
                    ></q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <span class="text-weight-medium main">11</span>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="long">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-dialog v-model="dialogShow">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">修改密码</div>
        </q-card-section>

        <q-card-section>
          <q-input
            style="margin-bottom:15px;"
            outlined
            v-model="form.origin"
            label="原密码"
          />
          <q-input
            style="margin-bottom:15px;"
            outlined
            v-model="form.new"
            label="新密码"
          />
          <q-input
            style="margin-bottom:15px;"
            outlined
            v-model="form.confirm"
            label="确认密码"
          />
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
  name: "center",
  data() {
    return {
      dialogShow: false,
      form: {
        origin: "",
        new: "",
        confirm: ""
      },
      tab: "short"
    };
  }
};
</script>
