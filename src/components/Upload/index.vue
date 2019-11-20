<template>
  <div>
    <el-upload
      class="upload-class"
      action
      :http-request="handleUpload"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      v-loading="loading">
      <div class="upload-container">
          <template v-for="(item,index) in pcontentImage">
            <div  v-if="item" class="avatar" :key="index">
              <img  :src="item" class="avatar-item">
              <i class="iconfont el-icon-error" @click.stop="deleteImage(index)"></i>
            </div>
          </template>
        <div class="avatar-uploader-icon" v-if="showAddIcon">
          <i class="el-icon-circle-plus-outline iconfont-add"></i>
          <br>
          <span class="title">{{title}}</span>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue ,Watch } from "vue-property-decorator";
import {
  uploadFile
} from '@/config/service/common';
@Component({
  name: "Upload"
})
export default class extends Vue{
  // @Prop({ default: ()=> {return []} }) private photo!: Array<string>;
  @PropSync('photo',{ default: ()=> {return []} }) private pcontentImage!: Array<string>;
  @Prop({ default: '上传图片' }) private title!: string;
  @Prop({ default: false }) private mutiple!: boolean;
  @Prop({ default: 0 }) private max!: Number;

  private loading = false;
  // private pcontentImage: any = [];

  // @Watch("photo", { immediate: true, deep: true })
  // getPic(newVal: any) {
  //   if(this.photo[0]) this.pcontentImage = this.photo;
  // }
  private get showAddIcon() {
    return !this.max || (this.max>0 && this.pcontentImage.length<this.max)
  }

  private async handleUpload(res) {
    let uploadData = new FormData();
    uploadData.append('file', res.file);
    this.loading = true;
    let data = await uploadFile(uploadData)
    if(data.code === 200) {
      this.loading = false;
      if (this.mutiple) {
        this.pcontentImage.push(data.result);
      } else {
        this.pcontentImage = [data.result];
      }
      this.$emit("photoPic", [data.result]);
    }
  }
  private beforeAvatarUpload(file) {
    // 判断已上传数量是否大于最大图片数量
    if (this.max > 0 && this.pcontentImage.length >= this.max) {
      this.$message.error(`最多上传${this.max}张图片`);
      return false
    }
    const isPic = /.(jpg|jpeg|png)$/.test(file.type);
    const isLtM = file.size / 1024 / 1024 < 10;

    if (!isPic) {
      this.$message.error(
        "上传文件类型必须是.jpeg、.jpg、.png中的一种!"
      );
    }
    if (!isLtM) {
      this.$message.error("上传文件大小不能超过 10MB，请重新上传!");
    }
    return isLtM && isPic;
  }
  private deleteImage(index) {
    this.pcontentImage.splice(index, 1);
  }
}

</script>

<style lang="scss" scoped>
.upload-class {
  width: 410px;
  .upload-container {
    float: left;
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
      float: left;
      margin: 0px 15px 15px 0px;
      position: relative;
      .avatar-item {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        border: 1px solid rgba(236, 236, 236, 1);
      }
      .iconfont {
        position: absolute;
        z-index: 99999;
        right: -9px;
        top: -9px;
        font-size: 18px;
        color: #e01504;
        display: none;
        cursor: pointer;
      }
      &:hover {
        .iconfont {
          display: block;
        }
      }
    }
  }
  .avatar-uploader-icon {
    width: 120px;
    height: 120px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 6px;
    background: #ececec;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    .iconfont-add{
      font-size: 40px;
      color: #999;
      margin-top: 20px;
    }
    .title{
      color: #999;
    }
  }
}
</style>
