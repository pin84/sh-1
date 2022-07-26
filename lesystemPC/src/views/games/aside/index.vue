<template>
  <div class="user-info">
    <UserInfo  />
    <History  />
    <AsideGameList  />
  </div>
</template>
<script>
import History from './History'
import AsideGameList from './AsideGameList'
import UserInfo from './UserInfo'
export default {

  components:{
    UserInfo,
    AsideGameList,
    History
  }
  
}
</script>
<style lang="scss" scoped>
.user-info{
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
}
</style>