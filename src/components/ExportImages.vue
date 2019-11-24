<template>
  <van-button
    style="width:95%;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
    type="submit"
    :loading="loading"
    :disabled="loading"
    loading-text="正在导出"
    round
    @click="handleBatchDownload(data)"
    >导出图片</van-button
  >
</template>

<script>
import { Button as VanButton } from "vant";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
export default {
  components: {
    VanButton
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fileName: {
      type: String,
      default: "图片"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async handleBatchDownload(imgList) {
      let current = 0;
      const length = imgList.length;
      const data = imgList;
      const zip = new JSZip();
      let result;
      // 当图片个数为1时直接导出，否则以zip打包导出
      if (length > 1) {
        data.forEach(async item => {
          try {
            result = await axios({
              method: "get",
              url: item,
              responseType: "arraybuffer"
            });
          } catch (err) {
            this.$message.error("导出失败");
          }
          const arr = item.split("/");
          let file = arr[arr.length - 1];
          zip.file(file, result.data, {
            binary: true
          });
          current += 1;
          if (current === length) {
            zip
              .generateAsync({
                type: "blob"
              })
              .then(content => {
                FileSaver.saveAs(content, `${this.fileName}.zip`);
              });
          }
        });
      } else {
        try {
          result = await axios({
            method: "get",
            url: imgList[0],
            responseType: "blob"
          });
        } catch (err) {
          this.$message.error("导出失败");
        }
        const Url = window.URL || window.webkitURL;
        const url = Url.createObjectURL(result.data);
        let aTag = window.document.createElement("a");

        aTag.href = url;
        aTag.download = new Date().getTime();
        window.document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      }
    }
  }
};
</script>

<style></style>
