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
        v-if="$store.state.user.info.roles.length >= 3"
        color="secondary"
        label="新增奖励"
        class="q-mt-md q-mb-md"
        @click="openForm('', '新增奖励')"
      />
      <q-table
        class="my-sticky-virtscroll-table"
        table-style="max-height: 400px"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        row-key="awardPoint"
        :data="rewards"
        :columns="columns"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" key="awardPoint">
              <span>{{ props.row.awardPoint }}</span>
            </q-td>
            <q-td :props="props" key="awardTitle">
              <span>{{ props.row.awardTitle }}</span>
            </q-td>
            <q-td
              :props="props"
              key="operation"
              v-if="$store.state.user.info.roles.length >= 3"
            >
              <q-icon
                name="edit"
                class="text-primary"
                style="font-size: 20px;margin-right:15px;"
                @click="openForm(props.row.id, '修改奖励')"
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
      <q-card style="min-width: 300px;width:90vw;">
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
                  (val && val.indexOf('-') === -1 && val.indexOf('.') === -1) ||
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
            <MyUploader
              ref="child"
              type="ScoreAward"
              :image="form.images"
              :count="1"
              @input="getImages"
              @img="getImage"
            />
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <van-button
              style="width:80px;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
              type="submit"
              :loading="loading"
              :disabled="loading"
              loading-text="正在提交"
              >确定</van-button
            >
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogShow2" width="300px" @hide="hide">
      <q-card style="width: 80vw;max-width:300px;">
        <q-card-section>
          <div class="text-h6">删除</div>
        </q-card-section>

        <q-card-section>
          确定要删除这项奖励吗？
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn
            flat
            label="确定"
            color="primary"
            @click="deleteRow(selectedId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import MyUploader from "../components/Upload";
import { ImagePreview, Toast, Button as VanButton } from "vant";
export default {
  components: {
    VanButton,
    MyUploader
  },
  computed: {
    images() {
      return this.rewards
        .map(item => {
          if (item.scoreAwardAttachment) {
            return `${
              this.$baseURL
            }/${item.scoreAwardAttachment[0].attachment.attachType
              .slice(0, 1)
              .toLowerCase() +
              item.scoreAwardAttachment[0].attachment.attachType.slice(1)}/${
              item.scoreAwardAttachment[0].attachment.attachName
            }.${item.scoreAwardAttachment[0].attachment.attachExtName}`;
          }
        })
        .filter(item => item !== undefined);
    }
  },
  data() {
    return {
      slide: 0,
      pagination: {
        rowsPerPage: 0
      },
      loading: false,
      dialogShow2: false,
      dialogShow: false,
      selectedId: "",
      title: "",
      form: {
        text: "",
        score: "",
        images: []
      },
      rewards: [],

      columns: [
        {
          name: "awardPoint",
          label: "积分节点",
          align: "center",
          field: row => row.awardPoint
        },
        {
          name: "awardTitle",
          label: "奖励名称",
          align: "center",
          field: row => row.awardTitle
        },
        {
          name: "operation",
          label: "操作",
          align: "center"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getImage(data) {
      this.form.images = data;
    },
    async getImages(data) {
      const isNew = this.title === "新增奖励";
      try {
        const res = await this.$axios[isNew ? "post" : "put"](
          isNew ? "/v1/scoreAward" : `/v1/scoreAward/${this.selectedId}`,
          Object.assign(
            {
              awardPoint: this.form.score,
              awardTitle: this.form.text,
              scoreAwardAttachment: data
            },
            isNew ? {} : { id: this.selectedId }
          ),
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        if (res.status !== (isNew ? 201 : 200)) {
          Toast({
            message: "错误",
            duration: 0
          });
          this.loading = false;
        } else {
          Toast.success(isNew ? "创建成功" : "修改成功");
          this.loading = false;
          this.hide();
          this.$refs.child.initData();
          this.$nextTick(() => {
            this.getData();
          });
        }
      } catch {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
        this.loading = false;
      }
    },
    getData() {
      this.$store.commit("app/openLoading", true);
      this.$axios
        .get("/v1/scoreAward")
        .then(res => {
          if (res.status === 200) {
            this.rewards = res.data.sort((a, c) => a.awardPoint - c.awardPoint);
            this.$store.commit("app/openLoading", false);
          }
          if (res.status === 202) {
            this.$store.commit("app/openLoading", false);
            this.$router.push("/404");
          }
        })
        .catch(() => {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        });
    },
    getImg(item, index) {
      ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index
      });
    },
    deleteRow(id) {
      this.$axios
        .delete(`/v1/scoreAward/${id}`)
        .then(res => {
          if (res.status === 200) {
            const index = this.rewards.findIndex(item => item.id === id);
            this.rewards.splice(index, 1);
            Toast.success("删除成功");
            this.dialogShow2 = false;
          }
        })
        .catch(() => {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        });
    },
    hide() {
      this.form = {
        text: "",
        score: "",
        images: []
      };
      this.selectedId = "";
      this.dialogShow = false;
      this.dialogShow2 = false;
    },
    open(id, name) {
      this.selectedId = id;
      this[name] = true;
    },
    openForm(id, title) {
      this.title = title;
      if (id) {
        this.selectedId = id;
        const data = this.rewards.find(item => item.id === id);
        this.form.text = data.awardTitle;
        this.form.score = Number(data.awardPoint);
        this.form.images = data.scoreAwardAttachment
          ? data.scoreAwardAttachment.map(item => ({
              url: `${this.$baseURL}/${item.attachment.attachType
                .slice(0, 1)
                .toLowerCase() + item.attachment.attachType.slice(1)}/${
                item.attachment.attachName
              }.${item.attachment.attachExtName}`,
              attachment: item.attachment
            }))
          : [];
      }
      this.dialogShow = true;
    },
    onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          const isNew = this.title === "新增奖励";
          this.loading = true;
          if (this.form.images.length === 0) {
            try {
              const res = await this.$axios[isNew ? "post" : "put"](
                isNew ? "/v1/scoreAward" : `/v1/scoreAward/${this.selectedId}`,
                Object.assign(
                  {
                    awardPoint: this.form.score,
                    awardTitle: this.form.text
                  },
                  isNew ? {} : { id: this.selectedId }
                ),
                {
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                  }
                }
              );
              if (res.status !== (isNew ? 201 : 200)) {
                Toast({
                  message: "错误",
                  duration: 0
                });
                this.loading = false;
              } else {
                Toast.success(isNew ? "创建成功" : "修改成功");
                this.loading = false;
                this.hide();
                this.$nextTick(() => {
                  this.getData();
                });
              }
            } catch {
              Toast({
                message: "请求出错,请检查网络或刷新重试！",
                duration: 0
              });
              this.loading = false;
            }
          } else {
            this.$refs.child.load();
          }
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
