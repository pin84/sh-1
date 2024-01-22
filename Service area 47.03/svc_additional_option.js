class AdditionalOption {

  constructor() {
    this.rootElm = document.getElementById('additional-option')

  }
  validate() {
    return true
  }
  initData(){

    let dateMethod = this.rootElm.querySelector('.ap-checkbox')
    let { date_surcharge_method } = serviceArea
    if (!date_surcharge_method) {
      serviceArea['date_surcharge_method'] = 'sum'
      dateMethod.checked = false
    } else if (date_surcharge_method == 'highest') {
      dateMethod.checked = true
    } else {
      dateMethod.checked = false
    }

    serviceArea['date_surcharge_method'] = date_surcharge_method || 'sum'
    this.rootElm.querySelector('.ap-checkbox').addEventListener('change', (e) => {
      serviceArea['date_surcharge_method'] = e.target.checked ? 'highest' : 'sum'
    })
  }
  pour() {
    // this.hide()
  }
  hide() {
    this.rootElm.classList.add('hide')
  }
  show() {
    this.rootElm.classList.remove('hide')
    this.initData()

  }
}