import { MessageBox } from 'element-ui';

export default {
  confirm({
    text = 'aa',
    title = '操作提示',
    showCancelButton = false,
    autoCloseTime = 0
  } = {}) {
    return new Promise(async (resolve, reject) => {

      if (autoCloseTime) {
        MessageBox.confirm(text, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          showCancelButton,
        }).catch(() => {
          return false
        });

        setTimeout(() => {
          resolve()
        }, 3000)


      } else {
        let res = await MessageBox.confirm(text, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          showCancelButton,
        }).catch(() => {
          return false
        });

        res == 'confirm' ? resolve(true) : resolve(false)
      }



    })
  }

}