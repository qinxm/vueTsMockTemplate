<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    /> -->
    <div class="right-menu">

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
        @command="changeCommand"
      >
        <div class="avatar-wrapper">
          <span>{{userName}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="userInfo">
            个人信息
          </el-dropdown-item>
          <el-dropdown-item command="updatePwd" class="border-top border-bottom">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <user-info :visible.sync="showUserInfo" ></user-info>
    <update-pwd :visible.sync="showUpdatePwd" ></update-pwd>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
// import Breadcrumb from '@/components/Breadcrumb/index.vue'
// import ErrorLog from '@/components/ErrorLog/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
// import HeaderSearch from '@/components/HeaderSearch/index.vue'
// import LangSelect from '@/components/LangSelect/index.vue'
// import Screenfull from '@/components/Screenfull/index.vue'
// import SizeSelect from '@/components/SizeSelect/index.vue'

@Component({
  name: 'Navbar',
  components: {
    // Breadcrumb,
    // ErrorLog,
    Hamburger,
    // HeaderSearch,
    // LangSelect,
    // Screenfull,
    // SizeSelect
  }
})
export default class extends Vue {
  private showUserInfo = false
  private showUpdatePwd = false
  get sidebar() {
    return AppModule.sidebar
  }

  // get device() {
  //   return AppModule.device.toString()
  // }
  get userName() {
    return UserModule.name
  }

  // get avatar() {
  //   return UserModule.avatar
  // }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }
  private changeCommand(command: string) {
    // console.log(command)
    if(command === 'userInfo') {
      this.showUserInfo = true
    } else if (command === 'updatePwd') {
      this.showUpdatePwd = true
    } else if(command === 'logout') {
      this.logout()
    }
  }
  private async logout() {
    await UserModule.LogOut()
    // this.$router.replace(`/login?redirect=${this.$route.fullPath}`)
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  height: $logoHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 54px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      line-height: 50px;
      height:36px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
