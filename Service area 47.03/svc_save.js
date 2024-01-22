class Save {

    constructor() {
        this.rootElm = document.getElementById('save-verify-modal-note')
        this.randomNum = 0
        // this.downLoadBtn = null

        this.isSave = false
        this.historyList = []
        this.curPartnerList = []
        this.airportWarnTip = {
            title: _d.langCode == 'eng' ? 'Tips' : '提示',
            msg: _d.langCode == 'eng' ? 'Data errors and saving may cause the airport to be lost, please refresh the page and log in again.' : '数据错误，保存可能会导致机场丢失，请刷新页面，重新登录。',
            submitText: 'ok'
        }

        this.saveTimeout = 0
        this.interval = null

        this.initPage()
    }

    initPage() {
        let saveBtn = this.rootElm.querySelector('.com-btn')
        saveBtn.addEventListener('click', async () => {
            if (this.saveTimeout) return
            this.saveTimeout = 5
            this.interval = setInterval(() => {
                this.saveTimeout--
                if (this.saveTimeout <= 0) {
                    clearInterval(this.interval)
                }

            }, 1000)
            this.saveData()
        })

        let envAndVersionNum = this.rootElm.querySelector('.env-and-version-num')
        envAndVersionNum.innerText = _d.envAndVersionNum
        // this.downLoadBtn = this.rootElm.querySelector('.down-load-btn')
        // this.downLoadBtn.addEventListener('click', () => {
        //     this.downLoadCSV()
        // })

        this.textarea = document.getElementById('save-textarea')
        this.textarea.addEventListener('input', (e) => {
            this.textarea.classList.remove('border-red')
        })

        // let comDropdown = document.getElementById('com-dropdown')
        // comDropdown.addEventListener('dorpdownChange', (e) => {
        //     let iso3 = e.detail == 'English' ? 'eng' : 'zho'
        //     langCode = iso3
        //     this.fillHistory()
        // })
        // this.rootElm.querySelector('.ap-checkbox').addEventListener('change',(e)=>{
        //     serviceArea['date_surcharge_method'] = e.target.checked ? 'highest' : 'sum'
        // })

        // this.rootElm.addEventListener('click',()=>{
        //   this.hide()
        // })

        this.rootElm.querySelector('.i-close').addEventListener('click', () => {
            this.hide()
        })
    }


    converUnit(num = 1, dU = 1) {
        return Math.round((num / distUnitData[dU].measurement));
    }


    async checkAirport() {
        let { res } = await svcUtils.post(api[stage].sqlTemplatesRun_3, {
            sql: 134678198,
            fleet_id: serviceArea.serviceArea.id,
            version: '1.0'
        })
        let airportsDatabase = res.airports

        if (!airportsDatabase) {
            // svcUtils.msgBox(this.airportWarnTip)
            return
        }
        let { airports: localAirports } = serviceArea

        if (airportsDatabase.length !== localAirports.length) return

        for (let obj of airportsDatabase) {
            let index = localAirports.findIndex(item => item == obj.airport)
            if (index == -1) {
                // svcUtils.msgBox(this.airportWarnTip)
                return
            }
        }
        return true
    }



    async saveData() {
        let loginName = _d.empEmail
        if (loginName == 'ping@elifeteam.com') {
            return
        }
        let it = this
        let code = this.rootElm.querySelector('#code-input').value
        if (!code || code != this.randomNum) {
            let msg = 'Verification code error'
            if (langCode == 'zho') {
                msg = '验证码错误'
            }
            getDialog().confirm({ msg })
            return
        }

        await isAllowLogin()

        let checkVehicles = null
        if (_d.isAddServiceAreaState) {
            checkVehicles = true
        }
        let airportFlag = await this.checkAirport()
        // if (!_d.isAirportSaved || _d.isAddServiceAreaState || _d.isChangeVersion) {
        if (!airportFlag) {
            let flag = await changeAirport()
            if (!flag) return
            _d.isAirportSaved = true
            _d.isAddServiceAreaState = false
        }


        let note = this.textarea.value
        if (note == '') {
            this.textarea.classList.add('border-red')
            return
        }
        serviceArea['note'] = note

        console.log('----save ----', serviceArea);





        let url = api[stage].serviceAreaPricings + '/id/jsons'
        let postData = JSON.stringify(serviceArea)

        let query = {
            service_area_id: objValGetByKeys(serviceArea, 'serviceArea.id')
        }
        let result = await svcUtils.post(url, serviceArea, 'service area pricing json post', query)

        if (result.code == 0) {
            serviceArea['service_area_pricing_id'] = result.res.service_area_pricing_id

            modalBgc.style.display = 'none';
            it.svcAeaSetSuccModal = elmOfIdRel('svc-aea-set-succ-modal', it.rootElm);
            it.svcAeaSetSuccModal.style.display = '';
            this.rootElm.querySelector('#code-input').value = ''
            this.textarea.value = ''
            this.isSave = true


            // if (_d.isChangeVersion) {
            //     (await servicingAirports()).changeAirport()
            // }

            let randomNum = Math.floor(1000 + Math.random() * 9000);
            this.randomNum = randomNum
            this.rootElm.querySelector('.code').innerText = randomNum;
            (await calculator()).saveBtn.classList.add('not-allowed');
            setTimeout(() => {
                it.svcAeaSetSuccModal.style.display = 'none';
                this.hide()
            }, 2000);

            // svcPartnerEdit().getServiceAreaData()

            if (serviceArea.vehicleClasses) {
                console.log('it.checkForChanges(serviceArea.vehicleClasses)', it.checkForChanges(serviceArea.vehicleClasses));
                if (!checkVehicles && !it.checkForChanges(serviceArea.vehicleClasses)) {
                    await this.getPartnerList()
                    this.updateModelMarkup(serviceArea.vehicleClasses, query.service_area_id)
                } else {
                    // update _d.originalSelectedVids
                    _d.originalSelectedVids = serviceArea.vehicleClasses.map(i => i.vehicle_class_id)
                }
            }

        }

        _d.isChangeVersion = false
        if (_vehiclesPricing && curSvcAeaDetailClass instanceof VehiclesPricing) {
            vehiclesPricing().fillPrice();
        }

        // getLoading().hidden();
    }

    checkForChanges(array) {
        let array1 = _d.originalSelectedVids
        let array2 = array.map(i => i.vehicle_class_id)

        if (array1.length !== array2.length) {
            return false;
        }

        let sortedArray1 = array1.slice().sort();
        let sortedArray2 = array2.slice().sort();

        for (let i = 0; i < sortedArray1.length; i++) {
            if (sortedArray1[i] !== sortedArray2[i]) {
                return false;
            }
        }

        return true;
    }

    async updateModelMarkup(selectedVehicleList, svcId) {
        // let svcId = serviceArea.id
        let vehicleList = await _getVehicleList(serviceArea.countryCode)
        const idSet = new Set(vehicleList.map(item => item.vehicle_id))
        let unSelectedIds = Array.from(idSet)
        _d.originalSelectedVids = []
        for (let item of selectedVehicleList) {
            let index = unSelectedIds.indexOf(item.vehicle_class_id);
            if (index !== -1) {
                unSelectedIds.splice(index, 1);
            }

            // update _d.originalSelectedVids
            _d.originalSelectedVids.push(item.vehicle_class_id)
        }

        for (let item of this.curPartnerList) {
            let sas_percent = item?.pricing_json?.service_areas?.sas_percent;
            if (sas_percent) {
                for (let sas of sas_percent) {
                    if (sas.id != svcId || !sas.vcs) continue;
                    let result = sas.vcs.some(v => unSelectedIds.includes(Number(v.id)))
                    if (result) {
                        sas.vcs = sas.vcs.filter(v => !unSelectedIds.includes(Number(v.id)));
                        console.log('curPartnerList-item========', item);
                        this.saveSasPercent(item);
                    }
                }
            }
        }

    }

    saveSasPercent(json) {
        let d = {
            sql: 134678253,
            supply_fleet_id: _d.fleet_id,
            demand_fleet_id: json.fleet_id,
            pricing_json: json.pricing_json,
            version: '1.0',
            old_pricing_id: json.fpid
        }

        rest.post('saving partner service area ',
            api[stage].sqlTemplatesRun_3 + '?ses=' + ses, d,
            async result => {
                console.log('saving partner service area', d);
            },
            error => {
                // showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
            }
        );
    }

    getDataBySqlV3(d) {
        // this.prevOrNextPage.state.isLast = true
        return new Promise((resolve, reject) => {
            rest.post('partners has price pct list search',
                api[stage].sqlTemplatesRun_3 + '?ses=' + ses, d,
                result => {
                    resolve(result)
                },
                err => {
                    reject(err)
                })
        })
    }

    async getPartnerList() {
        let postData = {
            // sql: 134676601,
            sql: 134678213,
            supply_fleet_id: _d.fleet_id,
            rows_to_fetch: 61,
            partner_id: 0,
            // version:'1.0'
            version: '1.1'
            // partner_id: 20,
            // partner_name: this.keyword.startsWith('s') ? '\\' + this.keyword : this.keyword
        }

        let { results } = await this.getDataBySqlV3(postData)

        if (results.length == 0) {
            return
        }
        this.curPartnerList = this.dataHandler(results)


        console.log('----------- this.curPartnerList-----', this.curPartnerList);

    }

    dataHandler(list) {
        for (let item of list) {
            if (Object.prototype.toString.call(item.pricing_json) === '[object String]') {
                let pjson = item.pricing_json.replace(/'/g, '"')
                try {
                    item.pricing_json = JSON.parse(pjson)
                } catch (error) {
                    console.error(error);
                }
            }
            if (item.pricing_json) {
                let { service_areas, percent } = item.pricing_json
                if (item.partner_id == 13) {
                }
                item['service_area_list'] = []
                if (service_areas) {
                    let { exclude, include } = service_areas
                    item['service_area_list'] = exclude || include || []
                }
                item['percent'] = percent
            } else {
                item['service_area_list'] = []
            }
        }
        return list
    }


    setMode() {
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
    }

    show() {
        this.isSave = false
        this.rootElm.classList.remove('hide')
        // this.downLoadBtn.classList.remove('active')
        this.textarea.value = ''
        this.rootElm.querySelector('#code-input').value = ''

        // this.getHistory()
        // this.setMode()

        let randomNum = Math.floor(1000 + Math.random() * 9000);
        this.randomNum = randomNum
        this.rootElm.querySelector('.code').innerText = randomNum
    }

    hide() {
        this.rootElm.classList.add('hide')
    }
}




