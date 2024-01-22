class Partner {
  constructor(id) {
    this.rootElm = document.getElementById(id);
    _p['curPartnerData'] = {};
    this.curPartnerList = [];
    this.selectedPartner = null;
    this.searchInput = null; // dropdown input
    this.partnerDropdown = null;
    this.svcSearchInput = null;
    this.isInitPartnerDropdown = false;
    this.isInitSvcDropdown = false;
    this.sasPercentList = [];
    this.magDeltaList = [];
    this.spliceList = [];
    this.svcType = 1; // 1: settgin service area , 2: setting service area percent
    this.svcDropdownList = [];
    this.isHasAuto = false;
    this.searchSvcDropDown = null;
    this.noShowSasList = [];
    this.svcList = JSON.parse(JSON.stringify(_d.svcList));

    this.titleBarData = new Proxy(['Partner'], {
      set: (target, key, val, receiver) => {
        target[key] = val;
        this.initTitleBar();
        return true;
      },
    });
    this.isInit = false


    // amenityData
    this.amenitySvcs = []
    this.svcNameElms = []

    this.curSvcId = null

    this.initUi();

  }

  initTitleBar() {
    let framgent = document.createDocumentFragment();
    for (let title of this.titleBarData) {
      let span = document.createElement('SPAN');
      // span.classList.add('')
      span.innerText = title;
      framgent.appendChild(span);
    }
    this.titleBar.innerHTML = '';
    this.titleBar.appendChild(framgent);

    this.titleBar.children[0].addEventListener('click', () => {
      this.resetPageData();
    });
  }

  resetPageData() {
    if (!this.isInit) return
    this.partnerRight && this.partnerRight.classList.add('hide');
    this.titleBarData.splice(1);
    // this.prevOrNextPage.state.isFirst = true
    // this.paginationBox.classList.remove('hide')
    this.partnerContent.classList.remove('hide');
    this.svcSearchBox.classList.add('hide');
    this.partnerSearchBox.classList.remove('hide');
    this.leftAndRightBoxes.classList.remove('hide');
    this.setVehiclePriceBox.classList.add('hide');
    this.svpcRightTopBox && this.svpcRightTopBox.classList.add('hide');
    this.svpcScrollBox && this.svpcScrollBox.classList.add('hide');
    this.svpcSaveBottomBox.classList.add('hide');
    this.svpcSabeBtn.classList.add('active');

    this.saveBtn.classList.add('not-allowed');
    if (this.svcSearchInput) {
      this.svcSearchInput.value = '';
    }
    if (this.serchSvcCountryInput) {
      this.serchSvcCountryInput.value = '';
    }
    this.spliceList = [];
    if (this.addOnBox) {
      this.addOnBox.classList.add('hide');
    }
    this.fillPartnerList(this.selectedPartner ? [this.selectedPartner] : this.curPartnerList);
    // this.curSvcInfo = null;
  }
  async initUi() {

    this.titleBar = this.rootElm.querySelector('#partner-set-svc-title-bar');
    this.partnerRight = this.rootElm.querySelector('.partner-content-right');
    this.partnerListBox = this.rootElm.querySelector('.partner-list');
    // this.paginationBox = this.rootElm.querySelector('.partner-pagination-box')
    this.leftAndRightBoxes = this.rootElm.querySelector('.partner-content');
    this.partnerItemBox = this.rootElm.querySelector('.partner-item');
    this.serviceItemBox = this.rootElm.querySelector('.service-item');

    this.svcSearchBox = this.rootElm.querySelector('.svc-search-box');
    this.partnerSearchBox = this.rootElm.querySelector('.partner-search-box');
    this.setVehiclePriceBox = this.rootElm.querySelector('.set-vehicle-price-content');

    this.svpcSaveBottomBox = this.rootElm.querySelector('.svpc-save-bottom-box');

    this.svpcSabeBtn = this.rootElm.querySelector('.svpc-sabe-btn');
    this.svpcSabeBtn.addEventListener('click', (e) => {
      let classList = e.target.classList;
      // if (classList.contains('active')) return;
      this.saveData();
    });
    this.partnerContent = this.rootElm.querySelector('.partner-list-box');

    this.svpcPartnerName = this.rootElm.querySelector('.svpc-partner-name');
    this.serchSvcCountryInput = this.rootElm.querySelector('.serch-svc-country-input');

    this.saveBtn = this.rootElm.querySelector('.com-main-btn');
    this.saveBtn.addEventListener('click', (e) => {
      let classList = e.target.classList;
      if (classList.contains('not-allowed')) return;
      this.saveData();
    });
    this.partnerListClickEvent();
    //delete service areea
    this.svcBox = this.rootElm.querySelector('.service-area-list');
    this.svcBox.addEventListener('click', async (e) => {
      let target = e.target;
      if (!target.classList.contains('item-last')) return;
      let id = target.getAttribute('id');
      let list = [];
      switch (this.svcType) {
        case 1:
          let index = _p['curPartnerData'].service_area_list.findIndex((item) => item.id == id);
          this.spliceList.push(_p['curPartnerData'].service_area_list.splice(index, 1)[0]);
          list = await this.filterSvcList();
          break;

        case 2:
          let idx = this.sasPercentList.findIndex((o) => o.service_area_id == id);
          this.spliceList.push(this.sasPercentList.splice(idx, 1)[0]);
          list = this.sasPercentList;
          break;

        case 3:
          this.spliceList.push(
            this.magDeltaList.splice(
              this.magDeltaList.findIndex((o) => o.service_area_id == id),
              1
            )[0]
          );
          list = this.magDeltaList;

          break;

        default:
          break;
      }

      this.fillServiceAreaList(list, 'del');
      this.saveBtn.classList.remove('not-allowed');
    });



    this.initRadioBox();

    this.initTitleBar();

    this.initSVCSearchBox();

    this.countrySvcList = this.rootElm.querySelector('.country-svc-list');
    this.countrySvcListClickEvent()

    this.isInit = true
  }

  async partnerListClickEvent() {
    let radioList = this.rootElm.querySelectorAll('.radio');

    this.partnerListBox.addEventListener('click', async (e) => {
      let target = e.target;
      let toIndex = target.getAttribute('to-index');
      if (!toIndex) return;

      if (toIndex == 4) {
        await this.insertHtmlSetVehicle()
        this.svpcRightTopBox = this.rootElm.querySelector('.svpc-right-top-box');
        this.svpcScrollBox = this.rootElm.querySelector('.svpc-scroll-box');
      }

      let partnerId = Number(target.getAttribute('partner-id'));
      let curPartnerData = this.curPartnerList.find((item) => item.partner_id == partnerId);
      _p['curPartnerData'] = JSON.parse(JSON.stringify(curPartnerData));

      this.partnerRight.classList.remove('hide');
      this.partnerSearchBox.classList.add('hide');
      this.svcSearchBox.classList.remove('hide');
      this.partnerContent.classList.add('hide');
      this.leftAndRightBoxes.classList.remove('hide');
      let form = this.rootElm.querySelector('.radio-box');

      console.log('---curPartnerData---', curPartnerData);

      let addOnText = _p['curPartnerData'].partner_name;
      let titleArr = [`>Set area`];

      toIndex = Number(toIndex);

      switch (toIndex) {
        case 1:
          let { include, exclude } = _p['curPartnerData'].pricing_json?.service_areas || {};
          for (let radio of radioList) {
            radio.checked = '';
          }
          if (exclude) {
            radioList[1].checked = 'checked';
          } else {
            radioList[0].checked = 'checked';
          }
          this.svcType = 1;
          form.classList.remove('hide-scale');
          break;

        case 2:
          this.svcType = 2;
          form.classList.add('hide-scale');
          titleArr = [`>Set percent`];
          let { percent } = _p['curPartnerData'];

          addOnText += ` add on ${percent || 0}%`;
          break;

        case 3:
          this.svcType = 3;
          form.classList.add('hide-scale');
          titleArr = [`> Amenity`];
          this.leftAndRightBoxes.classList.add('hide');
          this.setVehiclePriceBox.classList.remove('hide');
          this.svpcSabeBtn.classList.remove('active');
          break;
        case 4:
          this.svcType = 4;
          form.classList.add('hide-scale');
          this.leftAndRightBoxes.classList.add('hide');
          this.setVehiclePriceBox.classList.remove('hide');
          titleArr = [`> Set vehicle class price`];
          this.svpcSabeBtn.classList.remove('active');
          break;
        default:
          break;
      }

      this.addOnBox = this.rootElm.querySelector('.partner-add-percent-box');
      this.addOnBox.classList.remove('hide');
      this.addOnBox.innerText = addOnText;

      this.titleBarData.push(...titleArr);

      let dropdownList = this.filterSvcDropdownList();

      this.svcDropdownList = dropdownList;

      this.svcDropDown.setItems(dropdownList);
      let showSvcList = await this.filterSvcList();

      switch (toIndex) {
        case 2:
          this.fillServiceAreaList(showSvcList);
          this.sasPercentList = showSvcList;
          break;
        case 3:
          let { ads_delta, mag_delta } = _p.curPartnerData.pricing_json?.service_areas || {}
          let arr = []
          if (ads_delta) {
            for (let obj of ads_delta) {
              let cur = this.svcList.find(o => o.service_area_id == obj.id)
              arr.push(cur)
            }
          }
          if (mag_delta) {
            for (let obj of mag_delta) {
              let cur = this.svcList.find(o => o.service_area_id == obj.id)
              arr.push(cur)
            }
          }
          let uniqueArr = Object.values(arr.reduce((acc, cur) => {
            acc[cur.service_area_id] = cur;
            return acc;
          }, {}));

          let list = await this.getCurrencyandMeet(uniqueArr)

          this.amenitySvcs = list
          console.log('----this.amenitySvcs---', this.amenitySvcs);
          this.createSetPriceList(list);
          this.initSetVehicleClassBox(this.svcList);
          this.svpcSaveBottomBox.classList.remove('hide');
          break;
        case 4:

          this.curPartnerSvcList = showSvcList;
          this.createSetPriceList(showSvcList);
          this.initSetVehicleClassBox(showSvcList);

          this.svpcSaveBottomBox.classList.remove('hide');
          break;
        default:
          break;
      }
      let backBtn = document.getElementById('svc-aea-edit-container-show-btn');
      backBtn.style.display = 'none';
    });
  }

  initSetVehicleClassBox(list) {
    let { partner_id, partner_name, percent } = _p['curPartnerData'];

    let percentDesc;
    if (Number(percent)) {
      percentDesc = Number(percent) > 0 ? `+${percent}%` : `${percent}%`;
    } else {
      percentDesc = '0%';
    }
    this.svpcPartnerName.innerText = `${partner_id}-${partner_name} ${percentDesc}`;

    if (!this.searchSvcDropDown) {
      this.searchSvcDropDown = new TextAutoComp(this.serchSvcCountryInput, {
        str: (item) => {
          console.log(item);
          return [item.service_area_name, item.airports.map(o => o.airport).join(',')];
        },

        sel: async (item, hovElm) => {
          if (item) {
            if (this.svcType == 3) {
              let index = this.amenitySvcs.findIndex(o => o.service_area_id == item.service_area_id)
              if (index == -1) {
                let arr = await this.getCurrencyandMeet([item])
                this.amenitySvcs.push(arr[0])
                this.createSetPriceList(this.amenitySvcs);

                let { service_area_id } = item
                let cur = this.svcNameElms.find(o => o.id == service_area_id)
                cur.elm.click()
                this.svpcSabeBtn.classList.add('active')
              }
            } else {
              let obj = this.svcNameElms.find(o => o.id == item.service_area_id)
              obj.elm.click()
            }
          }
          this.serchSvcCountryInput.value = ''
        },
      });
    }
    this.searchSvcDropDown.filter = true;

    this.searchSvcDropDown.setItems(list);
  }

  createSetPriceList(list, showIndex = 0) {
    this.countrySvcList.innerHTML = '';
    this.svcNameElms = []
    let svpcItemBoxTemplate = this.rootElm.querySelector('.svpc-item-box')
    let fragment = document.createDocumentFragment();

    let countriesList = [];
    for (let item of list) {
      let { country_name, alpha_3 } = item;
      let index = countriesList.findIndex((o) => o.alpha_3 == alpha_3);
      if (index != -1) continue;
      countriesList.push({ country_name, alpha_3 });
    }
    let svcNameBox = this.rootElm.querySelector('.svpc-svc-name-box');
    countriesList.forEach((item) => {
      let cSvpcItemTemplate = svpcItemBoxTemplate.cloneNode(true);
      cSvpcItemTemplate.classList.remove('hide');

      let svpcCountryBox = cSvpcItemTemplate.querySelector('.svpc-country-box');
      svpcCountryBox.innerText = `${item.country_name}(${item.alpha_3})`;

      let svcByCountry = list.filter((o) => o.alpha_3 == item.alpha_3);
      let fragmentSvc = document.createDocumentFragment()

      for (let pItem of svcByCountry) {
        let cSvcNameBox = svcNameBox.cloneNode(true);
        cSvcNameBox.classList.remove('hide')
        let nameElm = cSvcNameBox.querySelector('.name')
        nameElm.innerText = pItem.service_area_name;
        let { service_area_id, alpha_3 } = pItem
        cSvcNameBox.setAttribute('svc-id', service_area_id);
        cSvcNameBox.setAttribute('country-code', alpha_3);

        this.svcNameElms.push({
          id: service_area_id,
          elm: nameElm
        })
        let delIcon = cSvcNameBox.querySelector('.i-shanchu')
        if (this.svcType == 3) {
          delIcon.classList.remove('hide')
        }
        fragmentSvc.appendChild(cSvcNameBox)
      }

      let svcList = cSvpcItemTemplate.querySelector('.svc-list')
      svcList.appendChild(fragmentSvc)
      fragment.appendChild(cSvpcItemTemplate);
    });



    this.countrySvcList.appendChild(fragment);
    if (countriesList.length !== 0) {
      this.svcNameElms[showIndex].elm.click();
    }
  }


  countrySvcListClickEvent() {
    this.countrySvcList.addEventListener('click', async (e) => {
      let target = e.target.parentNode
      let id = target.getAttribute('svc-id');
      if (!id) return
      this.curSvcId = id
      this.curSvcItem && this.curSvcItem.classList.remove('active')
      this.curSvcItem = target
      let countryCode = target.getAttribute('country-code');
      this.countrySvcList.scrollTo({
        top: target.offsetTop < 350 ? 0 : target.offsetTop - 195,
        behavior: 'smooth'
      })
      target.classList.add('active');
      if (e.target.tagName == 'SPAN') {
        if (this.svcType == 3) {
          // let res = await changeSvc(id, true)
          // _d.curPartnerSvcData = res || {}\

          let _pa = await partnerAmenity()
          _pa.show(id, this.amenitySvcs)
        } else {
          await this.getVehicleList(id, countryCode);
        }
      } else {
        let index = this.amenitySvcs.findIndex(o => o.service_area_id == id)
        this.amenitySvcs.splice(index, 1)
        this.createSetPriceList(this.amenitySvcs)


        let { mag_delta, ads_delta } = _p.curPartnerData?.pricing_json?.service_areas || {}
        let idx = (mag_delta || []).findIndex(o => o.id == id)
        if (idx != -1) {
          mag_delta.splice(idx, 1)
        }
        let idxAds = (ads_delta || []).findIndex(o => o.id == id)
        if (idxAds != -1) {
          ads_delta.splice(idx, 1)
        }

        if (this.svcType == 3) {
          this.svpcSabeBtn.classList.add('active')
        }
      }
    });
  }

  async getVehicleList(id, countryCode) {
    const changeSvcPromise = Promise.resolve(changeSvc(id, true));
    const sortVehiclePromise = Promise.resolve(_getVehicleList(countryCode));
    const [vehicleList, serviceAreaJson] = await Promise.all([sortVehiclePromise, changeSvcPromise]);


    const { vehicleClasses } = JSON.parse(JSON.stringify(serviceAreaJson));
    if (!vehicleClasses) {
      this.rootElm.querySelector('.vehicles-list-box').innerHTML = ''
      return
    }
    let sas_percent = _p['curPartnerData'].pricing_json?.service_areas?.sas_percent || [];
    let list = [];
    for (let v of vehicleClasses) {
      let o = vehicleList.find((item) => item.vehicle_id == v.vehicle_class_id);
      if (!o) continue;
      let obj = {
        vehicleId: o.vehicle_id,
        vehicleName: o.vehicle_name,
        vehicleImage: o.o_image_url_2 || o.o_image_url,
        vehiclePercent: '',
      };
      let sas = sas_percent.find((i) => i.id == id) || [];
      let vcsItem = sas.vcs ? sas.vcs.find((vc) => vc.id == o.vehicle_id) : null;
      if (vcsItem) {
        obj.vehiclePercent = vcsItem.percent;
      }
      list.push(obj);
    }
    this.showVehicleList = list;


    this.creatVehicleList(id);
  }

  creatVehicleList(id) {
    let curSvc = this.svcList.find(o => o.service_area_id == id)

    let setTypeName = this.rootElm.querySelector('.set-type-name'),
      { service_area_name, percent } = curSvc,
      vehiclesListBox = this.rootElm.querySelector('.vehicles-list-box'),
      vehiclesItemTemplate = this.rootElm.querySelector('.vehicles-list-item-box-template').cloneNode(true),
      fragment = document.createDocumentFragment();
    let topLine = this.rootElm.querySelector('.top-line').cloneNode(true);

    this.svpcRightTopBox.classList.remove('hide');
    this.svpcScrollBox.classList.remove('hide');

    vehiclesItemTemplate.classList.remove('hide', 'vehicles-list-item-box-template');
    this.showVehicleList.length ? topLine.classList.remove('hide') : topLine.classList.add('hide');

    let percentDesc;
    if (Number(percent)) {
      percentDesc = Number(percent) > 0 ? `+${percent}%` : `${percent}%`;
    } else {
      percentDesc = '0%';
    }

    // svpcRightHide.classList.remove('hide')
    setTypeName.innerText = `${service_area_name} ${percentDesc}`;

    this.showVehicleList.forEach((item, index) => {
      let cVehiclesItemTemplate = vehiclesItemTemplate.cloneNode(true),
        vehiclePercentDesc,
        vehicleImage = cVehiclesItemTemplate.querySelector('.vehicle-image'),
        vehiclesName = cVehiclesItemTemplate.querySelector('.vehicles-name'),
        setVehiclesPercentText = cVehiclesItemTemplate.querySelector('.set-text'),
        setVehiclesPercentInput = cVehiclesItemTemplate.querySelector('.set-input');

      if (item.vehiclePercent) {
        vehiclePercentDesc = Number(item.vehiclePercent) > 0 ? `+${item.vehiclePercent}%` : `${item.vehiclePercent}%`;
      } else {
        vehiclePercentDesc = 'Not set';
      }

      vehicleImage.src = item.vehicleImage;
      vehiclesName.innerText = `${item.vehicleName}(${item.vehicleId})`;
      setVehiclesPercentText.innerText = vehiclePercentDesc;
      setVehiclesPercentInput.value = Number(item.vehiclePercent) || '';

      setVehiclesPercentText.addEventListener('click', () => {
        let setWitdh = setVehiclesPercentText.getBoundingClientRect().width;
        setVehiclesPercentInput.style.width = setWitdh + 'px';
        setVehiclesPercentText.classList.add('hide');
        setVehiclesPercentInput.classList.remove('hide');
        setVehiclesPercentInput.focus();
      });
      setVehiclesPercentInput.addEventListener('blur', (e) => {
        let value = e.target.value;
        console.log('value', value);
        item.vehiclePercent = value;
        if (item.vehiclePercent) {
          vehiclePercentDesc = Number(item.vehiclePercent) > 0 ? `+${item.vehiclePercent}%` : `${item.vehiclePercent}%`;
        } else {
          vehiclePercentDesc = 'Not set';
        }
        setVehiclesPercentText.innerText = vehiclePercentDesc;
        setVehiclesPercentText.classList.remove('hide');
        setVehiclesPercentInput.classList.add('hide');
      });
      setVehiclesPercentInput.addEventListener('change', () => {
        this.svpcSabeBtn.classList.add('active');
      });

      fragment.appendChild(cVehiclesItemTemplate);
    });
    vehiclesListBox.innerHTML = '';
    vehiclesListBox.appendChild(topLine);
    vehiclesListBox.appendChild(fragment);
  }

  filterSvcDropdownList() {
    let list = [];
    let { service_area_list } = _p['curPartnerData'];
    if (this.svcType == 1) {
      //
      list = this.svcList;
    } else {
      if (!service_area_list.length) {
        list = this.svcList;
      } else {
        let { include, exclude } = _p['curPartnerData'].pricing_json?.service_areas || {};
        if (include) {
          //includes
          list = this.svcList.filter((item) => service_area_list.findIndex((obj) => obj.id == item.service_area_id) != -1);
        } else {
          list = this.svcList.filter((item) => service_area_list.findIndex((obj) => obj.id == item.service_area_id) == -1);
        }
      }
    }
    console.log('-----filterSvcDropdownList-----', list);
    return list;
  }

  initRadioBox() {
    let form = this.rootElm.querySelector('.radio-box');
    form.addEventListener(
      'change',
      (event) => {
        this.saveBtn.classList.remove('not-allowed');
        event.preventDefault();
      },
      false
    );
  }

  async filterSvcList() {
    this.noShowSasList = [];
    let list = [];
    let { service_area_list } = _p['curPartnerData'];
    switch (this.svcType) {
      case 1:
        list = this.svcDropdownList.filter((item) => service_area_list.findIndex((o) => o.id == item.service_area_id) != -1);
        break;
      case 2:
      case 4:
        let sas_percent = _p['curPartnerData'].pricing_json?.service_areas?.sas_percent || [];

        for (let obj of sas_percent) {
          let svc = this.svcDropdownList.find((item) => item.service_area_id == obj.id);
          if (!svc) {
            this.noShowSasList.push(obj);
          } else {
            svc['percent'] = obj.percent;
            list.push(svc);
          }
        }
        break;

      case 3:

        // let magDelta = _p['curPartnerData'].pricing_json?.service_areas?.mag_delta || [];
        // for (let obj of magDelta) {
        //   let svc = this.svcDropdownList.find((item) => item.service_area_id == obj.id);
        //   if (!svc) {
        //     this.noShowSasList.push(obj);
        //   } else {
        //     svc['delta'] = obj.delta;
        //     svc['currency'] = obj.currency;
        //     list.push(svc);
        //   }
        // }
        // await this.getCurrencyandMeet(list);


        break;

      default:
        break;
    }
    console.log('---------active svc-----', list);
    return list;
  }

  async fillServiceAreaList(list = [], fromType = 'init') {
    this.svcBox.innerHTML = '';
    this.fill(list);
  }

  createSVCListFirstItem() {
    let firstItem = this.serviceItemBox.cloneNode(true);
    firstItem.classList.remove('hide', 'template');
    firstItem.classList.add('svc-list-first-item');

    let name = firstItem.querySelector('.item-partner-name');
    // name.innerText = 'Service area'
    name.classList.add('font-wei-600');
    // firstItem.querySelector('.item-add-on').innerText = 'Country/Code'
    this.stateSwitch(firstItem, 'firstItem');
    return firstItem;
  }

  stateSwitch(pNode, type) {
    if (type == 'firstItem') {
      pNode.querySelector('.item-last').classList.add('hide-scale');
    }
    let percentBox = pNode.querySelector('.item-percent-box');
    let iMinusCircle = pNode.querySelector('.i-minus-circle');

    switch (this.svcType) {
      case 1:
        percentBox.classList.add('hide');
        // iMinusCircle.classList.add('hide-scale')
        break;
      case 2:
        percentBox.innerText = 'Percent';
        break;
      case 3:
        percentBox.classList.add('hide');
        let general = pNode.querySelector('.item-general');
        let delta = pNode.querySelector('.item-delta');
        let finalPrice = pNode.querySelector('.item-final-price');

        general.classList.remove('hide');
        delta.classList.remove('hide');
        finalPrice.classList.remove('hide');
        finalPrice.classList.add('font-wei-600');
        break;

      default:
        break;
    }
  }

  fill(list = []) {
    let framgent = document.createDocumentFragment();
    framgent.appendChild(this.createSVCListFirstItem());

    let input = document.createElement('INPUT');
    let span = document.createElement('SPAN');
    span.innerText = '%';
    for (let obj of list) {
      let cItem = this.serviceItemBox.cloneNode(true);
      cItem.classList.remove('hide', 'template');
      let svcName = cItem.querySelector('.item-partner-name');
      svcName.innerText = obj.service_area_name;

      cItem.querySelector('.item-airport-code').innerText = obj.airports.map((o) => o.airport).join(',');

      let code = cItem.querySelector('.item-add-on');
      code.innerText = obj.country_name + '   ' + obj.alpha_3;

      let percentBox = cItem.querySelector('.item-percent-box');

      this.stateSwitch(cItem);
      switch (this.svcType) {
        case 2:
          percentBox.innerHTML = '';
          let cInput = input.cloneNode(true);
          cInput.setAttribute('placeholder', 0);
          cInput.classList.add('input');
          // cInput.setAttribute('oninput', "value=value.match(/^\\d+(?:\\.\\d{0,2})?/)")
          cInput.setAttribute('type', 'number');

          percentBox.appendChild(cInput);
          let cSpan = span.cloneNode();
          cSpan.innerText = '%';
          percentBox.appendChild(cSpan);
          cInput.value = obj.percent;
          cInput.addEventListener('change', (e) => {
            console.log(list);
            obj.percent = cInput.value;
            this.saveBtn.classList.remove('not-allowed');
          });
          break;

        case 3:
          // let general = cItem.querySelector('.item-general');
          // let delta = cItem.querySelector('.item-delta');
          // let finalPrice = cItem.querySelector('.item-final-price');

          // let { currency, mngAmount } = obj;

          // if (!currency) {
          //   currency = 'undefined';
          // }

          // let originAmount = mngAmount ? Number(mngAmount) : 0;
          // general.innerText = originAmount + currency;

          // delta.innerHTML = '';
          // let cDeltaInput = input.cloneNode(true);
          // cDeltaInput.setAttribute('placeholder', 0);
          // cDeltaInput.setAttribute('type', 'number');
          // // cDeltaInput.setAttribute('step', '0.01')
          // // cDeltaInput.setAttribute('max', '1000')
          // // cDeltaInput.setAttribute('min', '0')

          // // cDeltaInput.setAttribute('onkeyup', "value=value.replace(/[^\\-?\\d{0,2}.]/g,'')")
          // // cDeltaInput.setAttribute('maxlength', "6")
          // cDeltaInput.classList.add('input');

          // cDeltaInput.value = obj.delta;

          // delta.appendChild(cDeltaInput);
          // let cDeltaSpan = span.cloneNode();
          // cDeltaSpan.innerText = currency;
          // delta.appendChild(cDeltaSpan);

          // let finalValue = originAmount + Number(obj.delta);
          // if (finalValue < 0) {
          //   finalValue = 0;
          // }

          // finalPrice.innerText = finalValue.toFixed(2) + currency;

          // cDeltaInput.addEventListener('change', (e) => {
          //   let val = Number(Number(e.target.value).toFixed(2));
          //   e.target.value = val;
          //   obj.delta = val;
          //   let v = val + originAmount;
          //   if (!v || v < 0) {
          //     v = 0;
          //   }
          //   finalPrice.innerText = v.toFixed(2) + currency;
          //   this.saveBtn.classList.remove('not-allowed');
          // });

          break;

        default:
          break;
      }
      let itemLast = cItem.querySelector('.item-last');
      itemLast.setAttribute('id', obj.service_area_id);
      framgent.appendChild(cItem);
    }

    this.svcBox.appendChild(framgent);
  }

  fillPartnerListFirstItem() {
    let titleList = ['id', 'Partner Name', ''];
    let framgent = document.createDocumentFragment();
    for (let title of titleList) {
      let div = document.createElement('DIV');
      div.classList.add('item');
      div.innerText = title;
      framgent.appendChild(div);
    }

    let firstItemBox = this.rootElm.querySelector('.first-itme');
    firstItemBox.innerHTML = '';
    firstItemBox.appendChild(framgent);
  }

  fillPartnerList(list = []) {
    let framgent = document.createDocumentFragment();
    let cItemTitle = this.partnerItemBox.cloneNode(true);
    cItemTitle.classList.remove('hide', 'template');
    for (let obj of list) {
      let cItem = this.partnerItemBox.cloneNode(true);
      cItem.classList.remove('hide', 'template');
      let partnerId = cItem.querySelector('.item-partner-id');
      partnerId.innerText = obj.partner_id;

      let partnerName = cItem.querySelector('.item-partner-name');
      partnerName.innerText = obj.partner_name_svc;


      let settingBtns = cItem.querySelectorAll('.icon');

      settingBtns.forEach((elm, index) => {
        // if(!this.isHasAuto && index == 0){
        if (index == 0) {
          elm.classList.add('hide');
        }

        elm.setAttribute('partner-id', obj.partner_id);
        elm.setAttribute('fleet-id', obj.fleet_id);
      });

      framgent.appendChild(cItem);
    }



    this.partnerListBox.innerHTML = '';
    this.partnerListBox.appendChild(framgent);
  }

  async getPartnerList() {
    let postData = {
      // sql: 134676601,
      sql: 134678213,
      supply_fleet_id: _d.fleet_id,
      rows_to_fetch: 61,
      partner_id: 0,
      // version:'1.0'
      version: '1.1',
      // partner_id: 20,
      // partner_name: this.keyword.startsWith('s') ? '\\' + this.keyword : this.keyword
    };

    let { results } = await this.getDataBySqlV3(postData);

    if (results.length == 0) {
      return;
    }
    this.curPartnerList = this.dataHandler(results);

    // this.curPartnerList[3].pricing_json.service_areas['mag_delta'] = [{ id: 2649, delta: 10, currency: 'CNY' }]
    console.log('----------- this.curPartnerList-----', this.curPartnerList);
  }

  dataHandler(list) {
    for (let item of list) {
      if (Object.prototype.toString.call(item.pricing_json) === '[object String]') {
        let pjson = item.pricing_json.replace(/'/g, '"');
        try {
          item.pricing_json = JSON.parse(pjson);
        } catch (error) {
          console.error(error);
        }
      }
      if (item.pricing_json) {
        let { service_areas, percent } = item.pricing_json;
        if (item.partner_id == 13) {
        }
        item['service_area_list'] = [];
        if (service_areas) {
          let { exclude, include } = service_areas;
          item['service_area_list'] = exclude || include || [];
        }
        item['percent'] = percent;
      } else {
        item['service_area_list'] = [];
      }
    }
    list = list.filter((item) => {
      return item.partner_id !== 13 && item.partner_id !== 2605 && item.partner_id !== 45;
    });
    return list;
  }

  async saveData() {
    let exData = {
      percent: '100',
      service_areas: {
        include: [
          {
            id: 272,
          },
        ],
        exclude: [
          {
            id: 283,
          },
        ],
        sas_percent: [
          {
            id: 272,
            percent: 10,
            vcs: [{}, {}, {}],
          },
        ],
        mag_delta: [
          {
            id: 272,
            delta: 10,
            currency: 'USD',
          },
        ],
      },
      country: {
        include: [
          {
            alpha_3: 'USA',
          },
        ],
        exclude: [
          {
            alpha_3: 'CAN',
          },
        ],
      },
    };
    let flag = await getVerifyModal().show();

    if (!flag) {
      switch (this.svcType) {
        case 1:
          _p['curPartnerData'].service_area_list.push(...this.spliceList);
          this.fillServiceAreaList(await this.filterSvcList());
          break;
        case 2:
          this.sasPercentList.push(...this.spliceList);
          this.fillServiceAreaList(this.sasPercentList);
          break;

        case 3:
          // this.magDeltaList.push(...this.spliceList);
          // this.fillServiceAreaList(this.magDeltaList);
          break;
        default:
          break;
      }
      this.spliceList = [];
      return;
    }

    let { percent, fleet_id, pricing_json, fpid } = _p['curPartnerData'];
    if (!pricing_json) {
      pricing_json = {};
    }

    switch (this.svcType) {
      case 1:
        // let form = this.rootElm.querySelector('.radio-box');
        // var data = new FormData(form);
        // let type = 'include'; //include,exclude
        // for (const entry of data) {
        //   console.log('---type = 1 --------', entry[1]);
        //   if (entry[1] == 2) {
        //     type = 'exclude';
        //   }
        // }

        // if (!_p['curPartnerData'].pricing_json) {
        //   _p['curPartnerData'].pricing_json = {};
        // }
        // let { service_area_list } = _p['curPartnerData'];

        // if (!pricing_json.service_areas) {
        //   pricing_json.service_areas = {}
        // }
        // delete pricing_json.service_areas.exclude;
        // delete pricing_json.service_areas.include;

        // pricing_json.service_areas[type] = service_area_list;

        // let sas_percent = pricing_json.service_areas.sas_percent || [];
        // let mag_delta = pricing_json.service_areas?.mag_delta || [];
        // let sasPercent = [];
        // let filterDelta = [];
        // if (type == 'include') {
        //   sasPercent = sas_percent.filter((item) => service_area_list.findIndex((o) => o.id == item.id) != -1);
        //   filterDelta = mag_delta.filter((item) => service_area_list.findIndex((o) => o.id == item.id) != -1);
        // } else {
        //   sasPercent = sas_percent.filter((item) => service_area_list.findIndex((o) => o.id == item.id) == -1);
        //   filterDelta = mag_delta.filter((item) => service_area_list.findIndex((o) => o.id == item.id) == -1);
        // }
        // pricing_json['service_areas']['sas_percent'] = sasPercent;
        // pricing_json['service_areas']['mag_delta'] = filterDelta;

        break;
      case 2:
        let sasPercent_t2 = pricing_json.service_areas?.sas_percent || [];
        let temArr_2 = [];
        for (let item of this.sasPercentList) {
          let obj = sasPercent_t2.find((o) => o.id == item.service_area_id);
          if (obj) {
            obj.percent = item.percent;
            temArr_2.push(obj);
          } else {
            temArr_2.push({
              id: item.service_area_id,
              percent: item.percent,
            });
          }
        }
        let sas_percent_2 = temArr_2.concat(...this.noShowSasList);

        if (!pricing_json['service_areas']) {
          pricing_json['service_areas'] = {};
        }

        pricing_json['service_areas']['sas_percent'] = sas_percent_2;
        break;
      case 3:
        // let deltalArr = [];
        // for (let obj of this.magDeltaList) {
        //   let { currency, delta, mngAmount } = obj;
        //   let d = Number(delta) || 0;
        //   deltalArr.push({
        //     id: Number(obj.service_area_id),
        //     delta: d,
        //     currency: currency,
        //   });
        // }
        if (!pricing_json['service_areas']) {
          pricing_json['service_areas'] = {};
        }

        // pricing_json['service_areas']['mag_delta'] = deltalArr.concat(this.noShowSasList);
        let _pa = await partnerAmenity()
        _pa.pour()

        let { ads_delta, mag_delta } = pricing_json.service_areas
        console.log(this.amenitySvcs);

        let ids = this.amenitySvcs.map(o => Number(o.service_area_id))
        let mng = []
        if (mag_delta) {
          mng = mag_delta.filter(o => ids.includes(Number(o.id)))
        }
        let ads = []
        if (ads_delta) {
          ads = ads_delta.filter(o => ids.includes(Number(o.id)))
        }
        pricing_json.service_areas['mag_delta'] = mng
        pricing_json.service_areas['ads_delta'] = ads

        break;
      case 4:
        let sasPercent_t4 = pricing_json.service_areas?.sas_percent;
        let vlist = [];
        for (let item of this.showVehicleList) {
          let { vehiclePercent, vehicleId } = item;
          if (vehiclePercent == '') continue;
          vlist.push({
            id: vehicleId,
            percent: vehiclePercent,
          });
        }
        let foundItem = sasPercent_t4.find((item) => item.id ==  this.curSvcId);
        foundItem.vcs = vlist;

        break;
      default:
        break;
    }

    pricing_json['percent'] = percent;

    pricing_json['doNotDel'] = 'doNotDel';

    let d = {
      sql: 134678253,
      supply_fleet_id: _d.fleet_id,
      demand_fleet_id: fleet_id,
      pricing_json,
      note: '',
      version: '1.0',
      old_pricing_id: fpid,
    };
    console.log('----save data---', d);
    rest.post(
      'saving partner service area ',
      // api[stage].sqlTemplatesRun + '?ses=' + ses, d,
      api[stage].sqlTemplatesRun_3 + '?ses=' + ses,
      d,
      async (result) => {
        // getLoading().hidden();
        this.svpcSabeBtn.classList.add('active');
        let { total_affected_rows } = result;
        if (total_affected_rows >= 2) {
          svcUtils.toast();

          await this.getPartnerList();
          _p['curPartnerData'] = this.curPartnerList.find((item) => item.partner_id == _p['curPartnerData'].partner_id);

          console.log('--save--curPartnerData-', _p['curPartnerData']);
          if (this.selectedPartner) {
            this.selectedPartner = _p['curPartnerData'];
          }
          let index = this.curPartnerList.findIndex((item) => item.partner_id == _p['curPartnerData'].partner_id);
          this.curPartnerList[index] = _p['curPartnerData'];
          this.partnerDropdown.setItems(this.curPartnerList);
        } else {
          svcUtils.msgBox({
            msg: 'Failed, please refresh  page and try again.',
          });
        }
      },
      (error) => {
        // showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
      }
    );

    rest.done(async () => {
      // getLoading().hidden();
      this.saveBtn.classList.add('not-allowed');
    });
  }

  initPartnerSearchBox() {
    this.svcSearchBox.classList.add('hide');

    let input = this.partnerSearchBox.querySelector('.input');

    let dropdown = new TextAutoComp(input, {
      str: (item) => {
        return [item.partner_name_svc];
      },

      sel: (item, hovElm) => {
        if (item) {
          this.selectedPartner = item;
          console.log('---item-----', item);
          this.fillPartnerList([item]);
        } else {
          input.value = '';
          this.fillPartnerList(this.curPartnerList);
          this.selectedPartner = null;
        }
      },
    });

    dropdown.filter = false;
    this.partnerSearchBox.querySelector('.icon').addEventListener('click', () => {
      input.focus();
    });

    this.searchInput = input;
    this.partnerDropdown = dropdown;

    dropdown.setItems(this.curPartnerList);
  }

  initSVCSearchBox() {
    if (!this.isInitSvcDropdown) {
      this.isInitSvcDropdown = true;
      let input = this.svcSearchBox.querySelector('.input');
      let dropdown;
      dropdown = new TextAutoComp(input, {
        str: (item) => {
          let airports = item.airports.map((obj) => obj.airport);

          return [item.service_area_name, airports.join(',')];
        },

        sel: async (item, hovElm) => {
          if (item) {
            input.value = '';

            switch (this.svcType) {
              case 1:
                let { service_area_list } = _p['curPartnerData'];
                let index = service_area_list.findIndex((obj) => obj.id == item.service_area_id);
                if (index != -1) {
                  return;
                }
                service_area_list.unshift({ id: item.service_area_id });

                this.fillServiceAreaList(await this.filterSvcList());
                break;

              case 2:
                let idx = this.sasPercentList.findIndex((obj) => obj.service_area_id == item.service_area_id);
                if (idx != -1) {
                  return;
                }
                item['percent'] = '';
                this.sasPercentList.unshift(item);
                console.log(this.sasPercentList);
                this.fillServiceAreaList(this.sasPercentList);
                break;

              case 3:
                // let magIdx = this.magDeltaList.findIndex((obj) => obj.service_area_id == item.service_area_id);
                // if (magIdx != -1) {
                //   return;
                // }
                // await this.getCurrencyandMeet([item]);
                // item['delta'] = 0;
                // this.magDeltaList.unshift(item);
                // console.log(this.magDeltaList);
                // this.fillServiceAreaList(this.magDeltaList);
                break;
              default:
                break;
            }

            this.saveBtn.classList.remove('not-allowed');
          }
        },
      });

      dropdown.setItems(this.svcList);

      this.svcSearchBox.querySelector('.icon').addEventListener('click', () => {
        input.focus();
      });

      // partnerDropdown.filter = false
      this.svcSearchInput = input;
      this.svcDropDown = dropdown;
    }
  }

  // getDataBySql(d) {
  //   // this.prevOrNextPage.state.isLast = true
  //   return new Promise((resolve, reject) => {
  //     rest.post(
  //       'partners has price pct list search',
  //       api[stage].sqlTemplatesRun + '?ses=' + ses,
  //       d,
  //       (result) => {
  //         resolve(result);
  //       },
  //       (err) => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  getDataBySqlV3(d) {
    // this.prevOrNextPage.state.isLast = true
    return new Promise((resolve, reject) => {
      rest.post(
        'partners has price pct list search',
        api[stage].sqlTemplatesRun_3 + '?ses=' + ses,
        d,
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  async show() {
    this.rootElm.classList.remove('hide');
    await this.getPartnerList();

    this.isHasAuto = this.isHasAuthority();

    if (!this.isInitPartnerDropdown) {
      this.initPartnerSearchBox();
      this.isInitPartnerDropdown = true;
    }

    // if(!this.svcList.length){
    //   await this.getServiceAreaData()
    // }

    this.fillPartnerList(this.selectedPartner ? [this.selectedPartner] : this.curPartnerList);

    this.fillPartnerListFirstItem();
  }


  isHasAuthority() {
    if (this.curPartnerList.length == 0) return false;
    let { partner_name } = this.curPartnerList[0];
    if (partner_name == 'Expedia') return true;
    return false;
  }

  hide() {
    this.rootElm.classList.add('hide');
  }

  awaitTime() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('----time out---');
        resolve();
      }, 5000);
    });
  }

  async getCurrencyandMeet(list) {
    let sapids = [];
    let ids = [];
    for (let obj of list) {
      if (obj.service_area_pricing_id) {
        sapids.push(obj.service_area_pricing_id);
      } else {
        ids.push(obj.service_area_id);
      }
    }


    let url = api[stage].sqlTemplatesRun_3 + `?ses=${_d.ses}`
    let data = {
      sql: 134677954,
      service_area_pricing_ids: sapids,
      service_area_ids: ids,
      version: '1.1'
    }

    let res = await svcUtils.fetchData({
      url,
      method:'POST',
      data
    })

    let results = res.results
    let arr = []
    for (let obj of list) {
      let cur = results.find(item => item.service_area_id == obj.service_area_id) || {}
      
      let curPricing = cur['pricing'] 

      let pricingObj = {}
      if(curPricing){
        pricingObj = JSON.parse(curPricing)
      }

      let { currencyCode, pricing, add_service } = pricingObj
      let { cs_p, is_p, ts_p } = add_service || {}
      let { meet_n_greet } = pricing || {}

      let o = {
        currency: currencyCode,
        mngAmount: meet_n_greet,
        cs_p: cs_p,
        is_p: is_p,
        ts_p: ts_p,
      }

      arr.push(Object.assign({}, o, obj))
    }

    return arr
  }

  async insertHtmlSetVehicle() {
    let dom = this.rootElm.querySelector('.svpc-right-top-boxy')
    if (!dom) {
      let data = await fetch('./partner/splitHtml.html')
      let strHtml = await data.text()
      let switchBox = document.querySelector('.content-switch-box')
      switchBox.innerHTML = ''
      switchBox.innerHTML = strHtml
    }
  }
}

