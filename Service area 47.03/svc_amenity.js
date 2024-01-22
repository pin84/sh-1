class Amenity {
  constructor() {
    this.rootElm = document.getElementById('amenity-wrapper')
    this.add_service = {}
  }

  async insertHtml() {
    let dom = this.rootElm.querySelector('#amenity')
    if (!dom) {
      let data = await fetch('./svc_amenity.html')
      let html = await data.text()
      this.rootElm.innerHTML = html
    }
  }

  initUi() {
    let it = this

    // Infant
    this.infantInput = this.rootElm.querySelector('.infant-input')
    this.infantSwitch = this.rootElm.querySelector('.infant-switch')
    this.infantInput.value = ''

    let { is_p, ts_p, cs_p } = this.add_service

    if (is_p === undefined || is_p === '') {
      this.infantInput.disabled = true
      this.infantSwitch.checked = false
      this.infantInput.setAttribute('placeholder', 'Close')
    } else {
      this.infantInput.value = is_p
      this.infantInput.setAttribute('placeholder', 'Please enter')
      this.infantInput.disabled = false
      this.infantSwitch.checked = true
    }

    this.infantInput.onblur = (e) => {
      let value = e.target.value
      this.add_service.is_p = Number(value)
    }
    this.infantSwitch.addEventListener('change', (e) => {
      let checked = e.target.checked
      if (checked) {
        this.infantInput.setAttribute('placeholder', 'Please enter')
        this.infantInput.disabled = false
        this.infantInput.focus()
        this.add_service.is_p = 0
        this.infantInput.value = 0
      } else {
        delete this.add_service.is_p
        this.infantInput.value = ''

        this.infantInput.setAttribute('placeholder', 'Close')
        this.infantInput.disabled = true
      }
    })

    // Toddler
    this.toddlerInput = this.rootElm.querySelector('.toddler-input')
    this.toddlerSwitch = this.rootElm.querySelector('.toddler-switch')
    this.toddlerInput.value = ''
    if (ts_p === undefined || ts_p === '') {
      this.toddlerInput.setAttribute('placeholder', 'Close')
      this.toddlerInput.disabled = true
      this.toddlerSwitch.checked = false
    } else {
      this.toddlerInput.value = ts_p
      this.toddlerInput.setAttribute('placeholder', 'Please enter')
      this.toddlerInput.disabled = false
      this.toddlerSwitch.checked = true
    }
    this.toddlerInput.onblur = (e) => {
      let value = e.target.value
      this.add_service.ts_p = Number(value)
    }
    this.toddlerSwitch.addEventListener('change', (e) => {
      // console.log('e', e.target.checked);
      let checked = e.target.checked
      if (checked) {
        this.toddlerInput.setAttribute('placeholder', 'Please enter')
        this.toddlerInput.disabled = false
        this.toddlerInput.focus()
        this.add_service.ts_p = 0
        this.toddlerInput.value = 0
      } else {
        delete this.add_service.ts_p
        this.toddlerInput.value = ''
        this.toddlerInput.setAttribute('placeholder', 'Close')
        this.toddlerInput.disabled = true
      }
    })

    // Child
    this.childInput = this.rootElm.querySelector('.child-input')
    this.childSwitch = this.rootElm.querySelector('.child-switch')
    this.childInput.value = ''
    if (cs_p === undefined || cs_p === '') {
      this.childInput.setAttribute('placeholder', 'Close')
      this.childInput.disabled = true
      this.childSwitch.checked = false
    } else {
      this.childInput.value = this.add_service.cs_p
      this.childInput.setAttribute('placeholder', 'Please enter')
      this.childInput.disabled = false
      this.childSwitch.checked = true
    }
    this.childInput.onblur = (e) => {
      let value = e.target.value
      this.add_service.cs_p = Number(value)
    }
    this.childSwitch.addEventListener('change', (e) => {
      // console.log('e', e.target.checked);
      let checked = e.target.checked
      if (checked) {
        this.childInput.setAttribute('placeholder', 'Please enter')
        this.childInput.disabled = false
        this.childInput.focus()

        this.add_service.cs_p = 0
        this.childInput.value = 0
      } else {
        delete this.add_service.cs_p
        this.childInput.value = ''

        this.childInput.setAttribute('placeholder', 'Close')
        this.childInput.disabled = true
      }
    })

    // Meet
    this.meetInput = this.rootElm.querySelector('.meet-input')
    this.meetSwitch = this.rootElm.querySelector('.meet-switch')

    let  mng = (serviceArea?.pricing?.meet_n_greet) 
    if (mng === undefined || mng === '') {
      this.meetInput.setAttribute('placeholder', 'Close')
      this.meetInput.disabled = true
      this.meetSwitch.checked = false
    } else {
      this.meetInput.value = mng
      this.meetInput.setAttribute('placeholder', 'Please enter')
      this.meetInput.disabled = false
      this.meetSwitch.checked = true
    }
    this.meetInput.onblur = (e) => {
      let value = e.target.value
      serviceArea.pricing.meet_n_greet = Number(value)
    }
    this.meetSwitch.addEventListener('change', (e) => {
      let checked = e.target.checked
      if (checked) {
        this.meetInput.setAttribute('placeholder', 'Please enter')
        this.meetInput.disabled = false
        this.meetInput.focus()

        this.meetInput.value = 0
        serviceArea.pricing['meet_n_greet'] = 0
      } else {
        this.meetInput.setAttribute('placeholder', 'Close')
        delete serviceArea.pricing.meet_n_greet
        this.meetInput.value = ''

        this.meetInput.disabled = true
      }
    })

    // All
    this.enterUnitAll = this.rootElm.querySelectorAll('.enter-unit')
    this.enterUnitAll.forEach(e => {
      e.textContent = serviceArea.currencyCode
    })

    this.enterInputAll = this.rootElm.querySelectorAll('.enter-input')
    this.enterInputAll.forEach(input => {
      input.addEventListener('focus', (e) => {
        e.target.parentNode.classList.add('price-enter-box-active')
      })
      input.addEventListener('blur', (e) => {
        e.target.parentNode.classList.remove('price-enter-box-active')
      })
    })
  }

  validate() {
    return true
  }

  pour() {
    serviceArea.add_service = this.add_service
  }


  async show() {
    await this.insertHtml()
    this.add_service = serviceArea.add_service || {}
    this.initUi()
    this.rootElm.classList.remove('hide')
  }
  hide() {
    console.log('----Amenity-----', serviceArea);
    this.rootElm.classList.add('hide')
  }
}