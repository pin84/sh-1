class History {

  constructor() {
    this.rootElm = document.getElementById('history')
    this.svcId = null
    this.historyList = []
    this.clickEvents()
  }

  clickEvents() {
    this.rootElm.querySelector('.history-list').addEventListener('click', async e => {
      if (!e.target.classList.contains('history-save-btn')) return

      let hsitory = this.historyList.find(item => item.id == Number(e.target.getAttribute('id')))

      let { last_updated_at, id } = hsitory

      let flag = await svcUtils.msgBox({
        isShowCancel: true,
        msg: `Are you sure you want to load the data of ${last_updated_at} ? After loading you need to save again`
      })
      if (!flag) return

      let url = api[stage].serviceAreaPricings + '/id/jsons/id'
      let { res: svcAeaResult, code: resultCode } = await svcUtils.get(url, { ses, json_id: id })
      if (resultCode != 0) return
      _d.isChangeVersion = true

      let svc = svcAeaResult?.service_area_pricing_json?.pricing || {}
      svc['service_area_pricing_id'] = _d.lastSvcPricingId
      serviceArea = svc
      getCreated().changeTabTitlesBar(0)
    })
  }



  initData() {
    let url = api[stage].sqlTemplatesRun + '?ses=' + ses;
    let data = {
      sql: 134677729,
      serviceAreaId: serviceArea.serviceArea.id || 0
    }
    rest.post('get save history list',
      url,
      data,
      (result) => {
        let options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        };
        let list = result.results
        // for(let obj of list){
        //     obj.pricing = JSON.parse(obj.pricing)
        // }

        console.log('--history---', result);
        list.sort((a, b) => new Date(b.last_updated_at).getTime() - new Date(a.last_updated_at).getTime())
        this.historyList = list
        this.fillHistory()
      },
      err => { }
    )
  }

  fillHistory() {
    let historyList = this.rootElm.querySelector('.history-list')
    historyList.innerHTML = ''
    let historyItem = this.rootElm.querySelector('.history-item')

    let operatorTitle = historyItem.querySelector('.operator-title')
    operatorTitle.innerText = langCode == 'eng' ? 'Operator:' : '操作者：'
    let notsTitle = historyItem.querySelector('.nots-title')
    notsTitle.innerText = langCode == 'eng' ? 'Note:' : '备注：'

    let fragment = document.createDocumentFragment()

    let i = 0
    for (let history of this.historyList) {
      let cHistoryItem = historyItem.cloneNode(true)
      cHistoryItem.classList.remove('hide')

     
      cHistoryItem.id = `history-item-${i}`

      let time = cHistoryItem.querySelector('.time')
      time.innerText = history.last_updated_at




      let oprator = cHistoryItem.querySelector('.user-name')
      oprator.innerText = history.operator

      let noteContent = cHistoryItem.querySelector('.note-content')
      noteContent.innerText = history.note

      let saveBtn = cHistoryItem.querySelector('.history-save-btn')
      saveBtn.setAttribute('id', history.id)

      if (i == 0) {
        let curVer = cHistoryItem.querySelector('.cur-ver')
        curVer.classList.remove('hide')

        saveBtn.innerText = 'Restore current version data'
      }




      fragment.appendChild(cHistoryItem)
      i++
    }
    historyList.appendChild(fragment)
  }

  hide() {
    this.rootElm.classList.add('hide')
  }
  show() {

    this.initData()
    this.rootElm.classList.remove('hide')
  }

  validate() {
    return true
  }


}