<template>
  <div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      v-if="images.length !== 0"
      infinite
      navigation
      autoplay
      height="200px"
    >
      <q-carousel-slide
        v-for="(item, index) in images"
        :key="index"
        :name="index"
        :img-src="item"
        @click="getImg(images, index)"
      />
    </q-carousel>
    <div class="q-pa-md">
      <q-btn
        color="secondary"
        label="新建奖励"
        class="q-mt-md q-mb-md"
        @click="openForm('', '新建')"
      />
      <q-table
        class="my-sticky-virtscroll-table"
        table-style="max-height: 400px"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        row-key="score"
        :data="rewards"
        :columns="columns"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" key="score">
              <span>{{ props.row.score }}</span>
            </q-td>
            <q-td :props="props" key="text">
              <span>{{ props.row.text }}</span>
            </q-td>
            <q-td :props="props" key="operation">
              <q-icon
                name="edit"
                class="text-primary"
                style="font-size: 20px;margin-right:15px;"
                @click="openForm(props.row.id, '修改')"
              />
              <q-icon
                name="delete"
                class="text-primary"
                style="font-size: 20px;"
                @click="open(props.row.id, 'dialogShow2')"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-model="dialogShow"
      transition-show="scale"
      transition-hide="scale"
      @hide="hide"
    >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>
        <q-form @submit="onSubmit" ref="form" class="q-gutter-md">
          <q-card-section>
            <q-input
              outlined
              v-model="form.score"
              type="number"
              :rules="[
                val =>
                  (val && val.length > 0 && val.indexOf('-') === -1) ||
                  '请输入正整数或零'
              ]"
              label="积分节点"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              outlined
              v-model="form.text"
              :rules="[val => (val && val.length > 0) || '请输入奖励名称']"
              label="奖励名称"
            />
          </q-card-section>

          <q-card-section>
            <van-uploader style="margin:20px 0;" v-model="form.image" />
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="确定" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogShow2" width="300px">
      <q-card style="width: 80vw;max-width:300px;">
        <q-card-section>
          <div class="text-h6">删除</div>
        </q-card-section>

        <q-card-section>
          确定要删除这项奖励吗？
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="deleteRow" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ImagePreview, Uploader as VanUploader, Toast } from "vant";
export default {
  components: {
    VanUploader
  },
  computed: {
    images() {
      return this.rewards
        .reduce((a, c) => a.concat(c.image[0] && [c.image[0].url]), [])
        .filter(item => item != undefined);
    }
  },
  data() {
    return {
      slide: 0,
      pagination: {
        rowsPerPage: 0
      },
      dialogShow2: false,
      dialogShow: false,
      selectedId: "",
      title: "",
      form: {
        text: "",
        score: "",
        image: []
      },
      rewards: [
        {
          id: 1,
          text: "bilibili大会员一个月",
          score: 200,
          image: [
            {
              key: "1221",
              url: "https://cdn.quasar.dev/img/mountains.jpg"
            }
          ]
        },
        {
          id: 2,
          text: "时崎狂三挂画一副",
          score: 500,
          image: [
            {
              key: "1221",
              url: "https://cdn.quasar.dev/img/mountains.jpg"
            }
          ]
        },
        {
          id: 3,
          text: "时崎狂三手办一个",
          score: 9999,
          image: []
        }
      ],

      columns: [
        {
          name: "score",
          label: "积分节点",
          align: "center",
          field: row => row.score
        },
        {
          name: "text",
          label: "奖励名称",
          align: "center",
          field: row => row.text
        },
        {
          name: "operation",
          label: "操作",
          align: "center"
        }
      ]
    };
  },
  methods: {
    getImg(item, index) {
      ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index
      });
    },
    deleteRow() {
      this.dialogShow2 = false;
    },
    hide() {
      this.form = {
        text: "",
        score: "",
        image: []
      };
    },
    open(id, name) {
      this.selectedId = id;
      this[name] = true;
    },
    openForm(id, title) {
      this.title = title;
      if (id) {
        this.selectedId = id;
        this.form = this.rewards.find(item => item.id === id);
      }
      this.dialogShow = true;
    },
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          Toast("3232");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-sticky-virtscroll-table {
  .q-table__middle {
    max-height: 200px;
  }
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #fff;
  }
  thead tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 1;
  }
}
</style>
