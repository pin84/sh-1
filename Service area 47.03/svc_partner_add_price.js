

class PartnerPriceSidebarTab extends Container {

    constructor(id) {
        super(id);

        this.partnerList = []
    }
    initElms() {
        var it = this;

        it.partnerSearchFld = elmOfIdRel('partner-search-fld', it.rootElm);
        it.addPartnerBtn = elmOfIdRel('add-partner', it.rootElm);
        it.partnerPriceSettingChartBody = elmOfIdRel('partner-price-setting-chart-body', it.rootElm);
        dataOfElm(it.partnerPriceSettingChartBody).isChildrenReverse = true;
        it.partnerPriceSaveBtn = elmOfIdRel('partner-price-save-btn', it.rootElm);
        it.saveVerifyModal = elmOfIdRel('save-verify-modal', it.rootElm);
        it.cancelSaveBtn = elmOfIdRel('cancel-save-btn', it.saveVerifyModal);
        it.confirmSaveBtn = elmOfIdRel('confirm-save-btn', it.saveVerifyModal);
        it.verifyNumFld = elmOfIdRel('verify-num-fld', it.saveVerifyModal);
        it.verifyNumSign = elmOfIdRel('verify-num-sign', it.saveVerifyModal);
        it.saveSuccModal = elmOfIdRel('save-succ-modal', it.rootElm);

        it.addPartnerBtn.onclick = function () {
            if (!async.isClear()) {
                return;
            }

            if (it.partnerSearchFld.value.trim()) {
                setLoadingModal(() => {
                    let url = api[stage].supplyDemandPricingJsons + '/id?supply_fleet_id=' + _d.fleet_id + '&demand_fleet_id=' + objValGetByKeys(it.partnerAutoComp.get(), 'fleet_id');
                    rest.get('partner price get',
                        url,
                        result => {
                            result.fleet_id = objValGetByKeys(it.partnerAutoComp.get(), 'fleet_id');
                            result.partner_name = objValGetByKeys(it.partnerAutoComp.get(), 'partner_name');
                            it.partnerPriceSettingRowAdd.addAnother(result);

                            it.resetPartnerDropdownItems();
                        },
                        error => {
                            if (objValGetByKeys(error, 'responseJSON.errCode') == 10072) {
                                let partnerFillData = {
                                    fleet_id: objValGetByKeys(it.partnerAutoComp.get(), 'fleet_id'),
                                    partner_name: objValGetByKeys(it.partnerAutoComp.get(), 'partner_name'),
                                    pricing_json: {
                                        percent: ''
                                    }
                                }
                                if (partnerFillData.fleet_id && partnerFillData.partner_name) {
                                    it.partnerPriceSettingRowAdd.addAnother(partnerFillData);
                                    it.resetPartnerDropdownItems();
                                }
                            } else {
                                showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
                            }
                        }
                    );
                }, this)
            }
        }
        it.partnerAutoComp = new TextAutoComp(it.partnerSearchFld, {
            str: (item) => {
                let {partner_id,partner_name} = item
                return [partner_id,partner_name];
            }
        })

        it.partnerPriceSettingRowAdd = new AddAnother('partner-price-setting-row', it.rootElm, {
            prep: (i, elm, partnerFields) => {
                if (partnerFields) {
                    return partnerFields;
                }
                let partnerId = elmOfIdRel('partner-id-fld', elm);
                let partnerName = elmOfIdRel('partner-name-fld', elm);
                let partnerPriceAddFld = elmOfIdRel('partner-price-add-fld', elm);
                fldMoneyOnly(partnerPriceAddFld);
                partnerPriceAddFld.addEventListener('input', function () {
                    it.partnerPriceSaveBtn.classList.remove('unclickable');
                })

                partnerFields = {
                    pid:partnerId,
                    name: partnerName,
                    pricePct: partnerPriceAddFld
                }

                dataOfElm(elm).partnerFields = partnerFields;
                return partnerFields;
            },
            fill: (i, elm, partnerPriceData, partnerFields) => {
                if (i % 2) {
                    elm.classList.add('gray-price-row');
                }
                if (partnerPriceData) {
                    if (typeof objValGetByKeys(partnerPriceData, 'pricing_json') === 'string') {
                        partnerPriceData.pricing_json = JSON.parse(objValGetByKeys(partnerPriceData, 'pricing_json'));
                    }


                    let {partner_id,partner_name} = partnerPriceData

                    partnerFields.pid.innerHTML =partner_id
                    partnerFields.name.innerHTML =partner_name
                    partnerFields.pricePct.value = objValGetByKeys(partnerPriceData, 'pricing_json.percent');
                    dataOfElm(partnerFields.pricePct).initPct = objValGetByKeys(partnerPriceData, 'pricing_json.percent');
                    dataOfElm(partnerFields.pricePct).fleetId = objValGetByKeys(partnerPriceData, 'fleet_id');
                }
                scrollToBottom(it.partnerPriceSettingChartBody);
            },
            pour: (i, elm, partnerFields) => {
                if (partnerFields.pricePct.value.trim() != dataOfElm(partnerFields.pricePct).initPct) { //only return dirty pct
                    return {
                        fleet_id: dataOfElm(partnerFields.pricePct).fleetId,
                        pct: partnerFields.pricePct.value.trim()
                    };
                }
            }
        });

        it.partnerPriceSaveBtn.onclick = function () {
            let dirtyPartnerPriceDatas = it.partnerPriceSettingRowAdd.pour();
            if (dirtyPartnerPriceDatas.length) {
                it.dirtyPartnerPriceDatas = dirtyPartnerPriceDatas;
                it.saveVerifyModal.style.display = '';
                // create a 4 digital random number and show it
                it.verifyNumSign.innerHTML = Math.floor(1000 + Math.random() * 9000);
                it.verifyNumFld.value = '';
            }
        }
        it.cancelSaveBtn.onclick = function () {
            it.saveVerifyModal.style.display = 'none';
        }
        it.confirmSaveBtn.onclick = function () {
            if (parseInt(it.verifyNumFld.value) == parseInt(it.verifyNumSign.innerHTML)) {
                if (!async.isClear()) {
                    return;
                }

                setLoadingModal(() => {
                    it.dirtyPartnerPriceDatas.forEach(async dirtyPartnerPriceData => {
                        let partnerList = await partnerCache().get()
                        let { pricing_json } = partnerList.find(item => item.fleet_id == dirtyPartnerPriceData.fleet_id)
                        if (!pricing_json) {
                            pricing_json = {}
                        }
                        if (Object.prototype.toString.call(pricing_json) === '[object String]') {
                            pricing_json = JSON.parse(pricing_json.replace(/'/g, '"'))
                        }
                        pricing_json['percent'] = dirtyPartnerPriceData.pct
                        let d = {
                            // sql: 134677721,
                            sql: 134677884,
                            supply_fleet_id: _d.fleet_id,
                            demand_fleet_id: dirtyPartnerPriceData.fleet_id,
                            pricing_json
                        }
                        rest.post('saving partner price',
                            api[stage].sqlTemplatesRun + '?ses=' + ses, d,
                            result => {
                                console.log(result)
                                it.saveVerifyModal.style.display = 'none';
                                it.partnerPriceSaveBtn.classList.add('unclickable');

                                it.saveSuccModal.style.display = '';
                                setTimeout(() => {
                                    it.saveSuccModal.style.display = 'none';
                                }, 3000);
                            },
                            error => {
                                showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
                            }
                        );
                    })
                }, this)
            }
        }
    }
    resetPartnerDropdownItems() {
        let it = this;

        it.partnerSearchFld.value = '';

        let partnerItems = it.partnerAutoComp.items;
        partnerItems.forEach(partnerItem => {
            if (partnerItem == it.partnerAutoComp.get()) {
                it.partnerAutoComp.items.splice(partnerItems.indexOf(partnerItem), 1);
            }
        });
    }
    reset() {
        let it = this;
        it.dirtyPartnerPriceDatas = [];
        it.partnerPriceSaveBtn.classList.add('unclickable');
    }
    async show() {
        let it = this;
        it.init();
        it.reset();
        let { hasPrice, unHasPrice } = await partnerDataHander()
        it.partnerAutoComp.setItems(unHasPrice);

        // show partners already has price pct
        it.partnerPriceSettingRowAdd.fill(hasPrice);
        document.getElementById(it.rootId).classList.remove('hide')
    }
    hide() {
        document.getElementById(this.rootId).classList.add('hide')
    }
}




class PartnerCache {
    constructor() {
        this.partnersList = null;
    }
    async get() {
        if (!this.partnersList) {
            this.partnersList = await this.getPartnersList()
        }
        return this.partnersList
    }

    getPartnersList() {
        return new Promise((resolve, reject) => {
            rest.post('partners list search',
                api[stage].sqlTemplatesRun_3 + '?ses=' + ses, {
                // sql: 134676600
                sql: 134678213,
                version: '1.0'
            },
                result => {
                    let list = objValGetByKeys(result, 'results');
                    resolve(list)
                },
                error => {
                    showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
                    resolve(null)
                }
            );
        })

    }

}
var _partnerCache = null;

function partnerCache() {
    if (!_partnerCache) {
        _partnerCache = new PartnerCache();
    }
    return _partnerCache;
}


async function partnerDataHander() {

    let list = await partnerCache().get()
    let hasPrice = [], unHasPrice = []

    for (let obj of list) {
        let { pricing_json } = obj
        if (pricing_json) {

            if (Object.prototype.toString.call(pricing_json) === '[object String]') {
                obj.pricing_json = JSON.parse(pricing_json.replace(/'/g, '"'))
            }


            hasPrice.push(obj)

        } else {
            unHasPrice.push(obj)
        }

    }

    return { hasPrice, unHasPrice }
}