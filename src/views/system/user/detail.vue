<template>
  <div class="user-list">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="头像" label-width='120px'>
          <upload @photoPic="picAddress" :photo.sync="picList"></upload>
        </el-form-item>
        <el-form-item label="姓名" label-width='120px' prop="name">
          <el-input v-model.trim="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" label-width='120px' prop="loginName">
          <el-input v-model.trim="form.loginName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width='120px'>
          <el-input v-model.trim="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width='120px'>
          <el-input v-model.trim="form.rePwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width='120px'>
          <el-input v-model.trim="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width='120px'>
          <el-input v-model.trim="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width='120px'>
          <el-input v-model.trim="form.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="是否允许登录" label-width="120px" prop="loginFlag">
          <el-select v-model="form.loginFlag" placeholder="请选择">
            <el-option
              v-for="item in loginFlagData"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户角色" label-width="120px">
          <el-checkbox-group v-model="roleIds">
            <el-checkbox
              v-for="item in roleListData"
              :key="item.id"
              :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" label-width='120px'>
          <el-input type="textarea" v-model.trim="form.remarks" autocomplete="off" style="width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width='120px'>
          <div>{{form.createDateStr}}</div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close(false)">返 回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
  </div>
</template>
<script lang="ts">
import {
  getUserDetail,
  postUserEdit,
  getRoleList
} from '@/config/service/user';
import { TagsViewModule,ITagView} from '@/store/modules/tags-view'
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
// 特殊扣款对账
@Component({
  name: 'UserDetail',
})
export default class extends Vue {
  private dialogFormVisible = false;
  private form = {
    id: '',
    roleIds: '',
    email: '',
    loginFlag: '',
    loginName: '',
    mobile: '',
    name: '',
    phone: '',
    photo: '',
    pwd: '',
    rePwd: '',
    remarks: ''
  }
  private roleIds = []
  private loginFlagData =  [{
    label:'是',
    value:'1'
  },
  {
    label:'否',
    value:'0'
  }];
  private roleListData = [];
  private picList: any = [];
  private rules = {
    name:[
      {
        required: true,
        message: "请输入姓名",
        trigger: ["blur", "change"]
      }
    ],
    loginName: [
      {
        required: true,
        message: "请输入登录名",
        trigger: ["blur", "change"]
      }
    ],
    loginFlag: [
      {
        required: true,
        message: "请选择是否允许登录",
        trigger: ["blur", "change"]
      }
    ],
    roleIds:[
      {
        required: true,
        message: "请选择角色类型",
        trigger: ["blur", "change"]
      }
    ]
  }
  activated() {
    this.reviseUser();
  }
  created() {
    this.getRoleList();
  }
  private async reviseUser() {
    this.picList = []
    let data = await getUserDetail({loginName: this.$route.query.loginName})
    if(data.code === 200) {
      this.form = data.result;

      this.picList.push(data.result.photo);
      this.roleIds = data.result.roleIdList;
    }
  }
  private picAddress(photo) {
    this.form.photo = photo.join(',');
  }
  private submitForm(formName) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (valid) {
        if(this.roleIds.length <= 0) {
          this.$message.error("请选择用户角色");
          return;
        }
        let query = {
          id:this.form.id,
          roleIds:this.roleIds,
          email:this.form.email,
          loginFlag:this.form.loginFlag,
          loginName:this.form.loginName,
          mobile:this.form.mobile,
          name:this.form.name,
          phone:this.form.phone,
          photo:this.form.photo,
          pwd:this.form.pwd,
          rePwd:this.form.rePwd,
          remarks:this.form.remarks
        }
        this.postUserEdit(query)
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  private async getRoleList() {
    let data = await getRoleList({pageNum:1,pageSize:65535})
    if(data.code === 200) this.roleListData = data.result.list;
  }
  private async postUserEdit(query) {
    let data = await postUserEdit(query)
    if(data.code === 200) {
      this.$message({
        message:data.message,
        type:'success'
      });
      this.close(true)
    }else{
      this.$message.error(data.message);
    }
  }
  private close(isClose) {
    const currentView:ITagView = {
      name: this.$route.name,
      fullPath: this.$route.fullPath,
      path: this.$route.path
    }
    TagsViewModule.delView(currentView);
    this.$router.push({
       name:'UserList',
       params:{refresh:isClose}
     })
  }
}
</script>
<style lang="scss" scoped>
  .user-list{
    padding: 15px;
    background-color: #fff;
    /deep/ .el-form-item {
      margin-bottom: 15px;
    }

    /deep/ .el-input{
      width: 320px;
    }
    .dialog-footer{
      text-align: left;
      margin-left:100px;
    }
  }
</style>

