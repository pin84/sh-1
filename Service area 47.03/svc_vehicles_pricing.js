class VehiclesPricing {
  constructor(id) {
    this.rootElm = document.getElementById(id);
    this.sortVehicleList = [];
    this.wArr = []
    this.sumW = 0
    this.inputIdx = 0
    this.z2zIndex = 0
    this.hourlyIndex = 0
    this.csvTitles = ['VehicleName', 'Price']
    this.initElms();


  }

  initElms() {
    this.tipBox = this.rootElm.querySelector('.tip-box');
    this.tipCaleText = this.tipBox.querySelector('.cale-text');
    this.tipPercent = this.tipBox.querySelector('.percent');

    this.toLeft = this.rootElm.querySelector('.right-box .to-left');
    this.toRight = this.rootElm.querySelector('.right-box .to-right');
    this.toUp = this.rootElm.querySelector('.right-box .to-up');
    this.toDown = this.rootElm.querySelector('.right-box .to-down');

    this.rightBox = this.rootElm.querySelector('.right-box');

    let downloadCSVBtn = this.rootElm.querySelector('.download-csv-btn');
    downloadCSVBtn.addEventListener('click', () => {
      // this.pour()
      // this.show()
      this.downLoadCSV();
    });

    this.rightBox.addEventListener('scroll', svcUtils.debounce(this.tipsHandler, 100).bind(this));
  }

  tipsHandler(e) {
    if (e) {
      this.scrollTop = Number(e[0].target.scrollTop);
      this.scrollLeft = Number(e[0].target.scrollLeft);
    }
    let tip = {
      title: 'Abnormal price',
      msg: 'Prices in red indicate that the overrides deviate from regular prices by more than 20%.',
      submitText: 'ok',
    };

    if (this.scrollTop - 20 > this.minTop) {
      this.toUp.classList.remove('hide');
    } else {
      this.toUp.classList.add('hide');
    }

    if (this.scrollTop + this.boxT > this.maxTop) {
      this.toDown.classList.add('hide');
    } else {
      this.toDown.classList.remove('hide');

      if (this.isfirstShow) {
        this.isfirstShow = false;
        svcUtils.msgBox(tip);
      }
    }

    if (this.scrollLeft + this.leftOffest - 35 > this.minLeft) {
      this.toLeft.classList.remove('hide');
    } else {
      this.toLeft.classList.add('hide');
    }

    if (this.scrollLeft + this.boxW + this.leftOffest > this.maxLeft) {
      this.toRight.classList.add('hide');
    } else {
      this.toRight.classList.remove('hide');

      if (this.isfirstShow) {
        this.isfirstShow = false;
        svcUtils.msgBox(tip);
      }
    }
  }

  moveHandler() {
    let wrapper = document.getElementById('vehicle-form');
    let topBox = wrapper.querySelector('.top-box');
    let leftBox = wrapper.querySelector('.left-box');
    let rightBox = wrapper.querySelector('.right-box');

    let x = 0;
    let y = 0;
    rightBox.addEventListener('scroll', (e) => {
      let scrollTop = e.target.scrollTop;
      let scrollLeft = e.target.scrollLeft;
      x = scrollLeft;
      y = scrollTop;
      leftBox.scrollTo(0, scrollTop);
      // topBox.scrollTo(scrollLeft, 0);
      topBox.style.transform = `translateX(-${scrollLeft}px)`

    });
    topBox.addEventListener('scroll', (e) => {
      let scrollTop = e.target.scrollTop;
      let scrollLeft = e.target.scrollLeft;
      rightBox.scrollTo(scrollLeft, y);
    });
    leftBox.addEventListener('scroll', (e) => {
      let scrollTop = e.target.scrollTop;
      rightBox.scrollTo(x, scrollTop);
    });
  }

  dataHandler() {
    let { zones, pricing, hourly_pricing, downtown_areas, zone2zone } = JSON.parse(JSON.stringify(serviceArea))
    let handler = (ranges, fieldName) => {
      return ranges.map((item, idx) => {
        let { from, to } = item
        return {
          field: `${fieldName}.${idx}`,
          amount: item.amount,
          from,
          to
        }
      })
    }

    let pricings = []
    if (pricing) {
      let { min_amount, ranges } = pricing
      pricings = handler(ranges, 'pricing.ranges')
      pricings.unshift({
        field: 'pricing.min_amount',
        amount: min_amount,
        firstTitle: `Start Price(${min_amount})`,
      })
    }

    let houlyPrice = []
    if (hourly_pricing) {
      let { min_amount, ranges, rules } = hourly_pricing
      if (!rules) {
        houlyPrice = handler(ranges, 'hourly_pricing.ranges')
        houlyPrice.unshift({
          field: 'hourly_pricing.min_amount',
          amount: min_amount,
          firstTitle: `Start Hour(${min_amount})`,
        })
      } else {
        let vehicles = this.svc.vehicleClasses || []
        for (let obj of vehicles) {
          let { percent_appendix } = obj
          if (!percent_appendix) continue
          let arr = []
          for (let pa of percent_appendix) {
            let { field, delta_amount } = pa
            if (field == 'hourly_pricing.min_amount') {
              for (let i = 0; i < rules.length; i++) {
                arr.push({
                  field: `hourly_pricing.rules.${i}.min_amount`,
                  delta_amount,
                })
              }
            } else if (field.startsWith('hourly_pricing.ranges')) {
              let fieldArr = field.split('.')
              for (let i = 0; i < rules.length; i++) {
                arr.push({
                  field: `hourly_pricing.rules.${i}.ranges.${fieldArr[2]}`,
                  delta_amount
                })
              }
            } else {
              arr.push(pa)
            }
          }
          obj['percent_appendix'] = arr
        }

        
        console.log('--1---',this.svc);

        rules.forEach((rule, index) => {
          let { min_amount, name } = rule
          rule.ranges.forEach((obj, idx) => {
            obj['field'] = `hourly_pricing.rules.${index}.ranges.${idx}`
          })
          rule.ranges.unshift({
            field: `hourly_pricing.rules.${index}.min_amount`,
            amount: min_amount,
            firstTitle: `Start Hour(${min_amount})`,
            name
          })
        })
      }

      console.log('--2---',rules);
    }



    (zone2zone?.prices || []).forEach((obj, idx) => {
      obj['field'] = `zone2zone.prices.${idx}`
    })

    let zonesPrice = []
    if (zones) {
      zones.forEach((zone, i) => {
        let { prices, name } = zone
        let inputData = []
        let titleData = []
        prices.forEach((p, j) => {
          titleData.push({
            from: name,
            to: p.airport,
          })
          inputData.push({
            field: `zones.${i}.prices.${j}.p_amt`,
            from: name,
            to: p.airport,
            amount: p.p_amt || p.amount,
          },
            {
              field: `zones.${i}.prices.${j}.d_amt`,
              from: name,
              to: p.airport,
              amount: p.d_amt || p.amount,
            },
          )
        })

        zonesPrice.push({
          d: titleData,
          inputData,
          title: name,
          type: 3
        })
      })
    }
    let downtownAreas = []
    if (downtown_areas) {
      let { min_amount, ranges } = downtown_areas
      downtownAreas = handler(ranges, 'downtown_areas.ranges')

      downtownAreas.unshift({
        field: 'downtown_areas.min_amount',
        amount: min_amount,
        firstTitle: `Start Price(${min_amount})`
      })
    }

    this.allData = [
      {
        d: pricings,
        title: 'Range Prices Area',
        type: 1
      },
      ...zonesPrice,

      {
        d: houlyPrice.length ? houlyPrice : hourly_pricing?.rules || [],
        title: 'Hourly Price',
        type: houlyPrice.length ? 2 : 6
      },

      {
        d: downtownAreas,
        title: 'Downtown Areas',
        type: 4
      },
      {
        d: zone2zone?.prices || [],
        title: 'Zone2zone',
        type: 5
      }
    ]

    console.log(this.allData);
  }

  fillPrice() {
    let wrapper = document.getElementById('vehicle-form');
    let rightBox = wrapper.querySelector('.right-content');

    this.rightItemBox = [];

    let fragment = document.createDocumentFragment();
    let vehiclePriceItem = wrapper.querySelector('.vehicle-price-item');

    this.sortVehicleList.forEach((item, index) => {
      let div = document.createElement('DIV');
      div.classList.add('vehicle-item-price-box', `box-${index}`);
      this.rightItemBox.push(div);

      div.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#ccc';
        this.leftItemBox[index].style.backgroundColor = '#ccc';
      });
      div.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = '';
        this.leftItemBox[index].style.backgroundColor = '';
      });
      this.inputIdx = 0
      for (let obj of this.allData) {
        let { d, inputData, type } = obj
        if (!d.length) continue

        let curData = d
        switch (type) {
          case 3:
            curData = inputData
            break;
          case 5:
            curData = [d[this.z2zIndex]]
            break;
          case 6: // hourly pricing zone to zone
            curData = d[this.hourlyIndex].ranges
            break;
          default:
            break;
        }
        div.appendChild(this.createInputList(curData, vehiclePriceItem, item, index))
      }

      fragment.appendChild(div);
    });

    rightBox.innerHTML = '';
    rightBox.appendChild(fragment);
    rightBox.style.width = `${this.sumW}px`

    this.minLeft = 0;
    this.maxLeft = 0;
    this.minTop = 0;
    this.maxTop = 0;

    // setTimeout(() => {
    //   this.isInViewPort();
    // }, 500);
  }

  showInputTips(input) {
    input.addEventListener('mouseover', (e) => {
      this.inputOnHover(e);
    });
    input.addEventListener('mouseleave', (e) => {
      this.inputOnMouseleave();
    });
  }

  createInputList(cRanges, elmItem, vehicleObj, index) {
    let curSetting = this.svc.vehicleClasses.find((o) => o.vehicle_class_id == vehicleObj.vehicle_id) || {}

    let { percent_appendix, percent } = curSetting;
    if (!percent_appendix) {
      percent_appendix = [];
    }
    let fragment = document.createDocumentFragment()
    // div.style.width = this.sumW - this.firstW + 'px';
    cRanges.map((range) => {
      let cVehiclePriceItem = elmItem.cloneNode(true);

      cVehiclePriceItem.classList.add(`item-${index}-${this.inputIdx}`);
      cVehiclePriceItem.style.flex = `0 0 ${this.wArr[this.inputIdx]}px`;
      this.inputIdx++
      cVehiclePriceItem.classList.remove('hide');
      let input = cVehiclePriceItem.querySelector('.input');


      let obj = percent_appendix.find((item) => item.field == range.field);


      let originValue = range.amount;
      input.setAttribute('originValue', originValue);
      input.setAttribute('field', range.field);
      input.setAttribute('vehicleId', curSetting.vehicle_class_id);

      input.addEventListener('change', (e) => {
        this.inputOnChange(e, curSetting);
      });

      let val = 0
      if (obj) {
        input.setAttribute('delta_amount', obj.delta_amount);
        let { delta_amount, hasChanged } = obj;
        val = (Number(originValue) + Number(delta_amount)).toFixed(2);
        input.nextElementSibling.classList.remove('hide');
        hasChanged && input.parentNode.classList.add('warn');
        let deltaPercent = (Math.abs(delta_amount) / originValue).toFixed(2);
        if (deltaPercent >= 0.2) {
          this.showInputTips(input)
        }
      } else {
        val = (+originValue + (originValue * percent) / 100).toFixed(2);
      }
      let zeroTips = input.parentNode.querySelector('.price-zero-tips')
      if (val == 0) {
        zeroTips.classList.remove('hide')
      }
      input.value = val

      if (JSON.stringify(curSetting) == '{}') {
        input.value = '';
        input.setAttribute('readonly', true);
      }

      zeroTips.querySelector('.price-zero-tips-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        zeroTips.classList.add('hide');
      });

      let triangle = cVehiclePriceItem.querySelector('.red-triangle');
      triangle.addEventListener('click', (e) => {
        this.hideRedTriangle(e);
      });


      fragment.appendChild(cVehiclePriceItem);
    });
    return fragment;
  }

  fillVehicleName() {
    let fragment = document.createDocumentFragment();
    let wrapper = document.getElementById('vehicle-form');
    let leftBox = wrapper.querySelector('.left-box');
    let leftItem = wrapper.querySelector('.left-box-template');
    leftBox.innerHTML = '';
    this.leftItemBox = [];

    if (!this.svc.vehicleClasses) {
      this.svc.vehicleClasses = [];
    }

    this.sortVehicleList.forEach((item, index) => {
      let cLeftItem = leftItem.cloneNode(true);
      cLeftItem.style.display = 'flex';
      cLeftItem.classList.add(`item-${index}`);
      cLeftItem.setAttribute('vehicle-id', item.vehicle_id);

      let vehicleName = cLeftItem.querySelector('.vehicle-name');
      vehicleName.innerText = `${item.vehicle_name}(${item.vehicle_id})`;
      let percentInput = cLeftItem.querySelector('.input');
      let checkbox = cLeftItem.querySelector('.checkbox');
      let curSetting = this.svc.vehicleClasses.find((o) => o.vehicle_class_id == item.vehicle_id);
      if (curSetting) {
        let { percent } = curSetting;
        percentInput.value = percent;
        checkbox.checked = true;
      } else {
        percentInput.setAttribute('readonly', true);
      }

      checkbox.addEventListener('change', (e) => {
        let checked = e.target.checked;
        if (checked) {
          let setting = {
            vehicle_class_id: item.vehicle_id,
            delta_amount: 0,
            percent: 0,
            hourly_percent: 0,
            hourly_delta: 0,
          };
          this.svc.vehicleClasses.push(setting);
          percentInput.value = 0;
          percentInput.removeAttribute('readonly');
        } else {
          let idx = this.svc.vehicleClasses.findIndex((o) => o.vehicle_class_id == item.vehicle_id);
          this.svc.vehicleClasses.splice(idx, 1);
          percentInput.value = '';
          percentInput.setAttribute('readonly', true);

          //delete pricing_schedule_sum vehicle id
          let { pricing_schedule_sum } = this.svc;
          if (pricing_schedule_sum) {
            for (let obj of pricing_schedule_sum) {
              let { vehicles } = obj;
              if (!vehicles) continue;
              let index = vehicles.findIndex((item) => item == Number(cLeftItem.getAttribute('vehicle-id')));
              if (index == -1) continue;
              vehicles.splice(index, 1);
            }
          }
        }
        this.fillPrice();
      });

      percentInput.addEventListener('input', (e) => {
        let value = Number(e.target.value);
        let curSetting = this.svc.vehicleClasses.find((o) => o.vehicle_class_id == item.vehicle_id);
        curSetting['percent'] = value;
        curSetting['hourly_percent'] = value;
        this.fillPrice();
      });

      cLeftItem.addEventListener('mouseenter', (e) => {
        if (!this.rightItemBox.length) return;
        e.target.style.backgroundColor = '#ccc';
        this.rightItemBox[index].style.backgroundColor = '#ccc';
      });
      cLeftItem.addEventListener('mouseleave', (e) => {
        if (!this.rightItemBox.length) return;
        e.target.style.backgroundColor = '';
        this.rightItemBox[index].style.backgroundColor = '';
      });

      this.leftItemBox.push(cLeftItem);
      fragment.appendChild(cLeftItem);
    });
    leftBox.appendChild(fragment);
  }

  fillTitle() {
    let fragment = document.createDocumentFragment()
    let topItem = this.rootElm.querySelector('.top-item-box ')
    let vehicleTop = this.rootElm.querySelector('.vehicle-top')
    let topBox = vehicleTop.querySelector('.top-box .top')

    let firstItem = vehicleTop.querySelector('.first-item')
    if (!firstItem) {
      let cTopItem = topItem.cloneNode(true)
      cTopItem.classList.remove('hide')
      cTopItem.classList.add('first-item')
      cTopItem.innerText = 'Price'
      let afterElm = vehicleTop.querySelector('.top-box')
      // insertBefore
      vehicleTop.insertBefore(cTopItem, afterElm)
    }

    let render = (d, title, type) => {
      let cTopItem = topItem.cloneNode(true)
      cTopItem.classList.remove('hide')
      cTopItem.querySelector('.zone-from').innerText = title
      let rangePriceElms = this.renderHeaderItem(d, type)
      cTopItem.querySelector('.zone-list').appendChild(rangePriceElms)
      fragment.appendChild(cTopItem)
    }
    for (let obj of this.allData) {
      let { d, title, type } = obj
      if (!d.length) continue
      switch (type) {
        case 6:
          fragment.appendChild(this.createHourlyTitle(d))
          break;
        case 5:
          fragment.appendChild(this.createz2zTitle(d))
          break;
        default:
          render(d, title, type)
          break;
      }
    }
    topBox.innerHTML = ''
    topBox.appendChild(fragment)

    setTimeout(() => {
      let elmArr = topBox.querySelectorAll('.zone-item');
      let wArr = [];
      let sumW = 0;
      for (let elm of elmArr) {
        let w = Number(elm.getBoundingClientRect().width);
        sumW += w
        // if (elm.classList.contains('first-item')) {
        //   this.firstW = Number(elm.getBoundingClientRect().width);
        // }
        // let width = elm.offsetWidth;
        if (elm.classList.contains('two')) {
          wArr.push(w / 2, w / 2)
        } else {
          wArr.push(w);
        }
      }

      let topItemDropdown = topBox.querySelector('.top-item-dropdown')
      if (topItemDropdown) {
        let w = Number(topItemDropdown.getBoundingClientRect().width);
        wArr.push(w)
        sumW += w
      }


      this.wArr = wArr;
      this.sumW = sumW;
      // let top = this.rootElm.querySelector('.vehicle-top .top-box .top');
      // top.style.width = this.sumW + 'px';
      this.fillPrice()
    }, 500);
  }


  createHourlyTitle(d) {
    let topItem = this.rootElm.querySelector('.top-item-hourly')
    let cTopItem = topItem.cloneNode(true)
    cTopItem.classList.remove('hide')
    let arrowDown = cTopItem.querySelector('.i-arrow-down')
    let input = cTopItem.querySelector('.input')
    let dropdown = new TextAutoComp(input, {
      str: (item) => {
        return [item.name];
      },

      sel: (item, hovElm) => {
        if (item) {
          this.hourlyIndex = d.findIndex(o => o.name == item.name)
          this.fillTitle()

        }
      }
    })

    let zoneList = cTopItem.querySelector('.zone-list')
    zoneList.appendChild(this.renderHeaderItem(d[this.hourlyIndex].ranges, 2, true))


    dropdown.setItems(d)
    dropdown.filter = false
    input.value = d[this.hourlyIndex].name

    for (let obj of d) {
      let { ranges } = obj;
      for (let o of ranges) {
        let { firstTitle, from, to, name } = o;
        this.csvTitles.push(firstTitle ? `${name}-${firstTitle}` : `${from}-${to}(H)`);
      }
    }

    arrowDown.addEventListener('click', () => {
      input.focus()
    })
    return cTopItem
  }

  createz2zTitle(d) {
    let topItem = this.rootElm.querySelector('.top-item-dropdown')
    let cTopItem = topItem.cloneNode(true)
    cTopItem.classList.remove('hide')
    let arrowDown = cTopItem.querySelector('.i-arrow-down')
    let input = cTopItem.querySelector('.input')
    let dropdown = new TextAutoComp(input, {
      str: (item) => {
        return [item.name];
      },

      sel: (item, hovElm) => {
        if (item) {
          this.z2zIndex = d.findIndex(o => o.name == item.name)
          this.fillPrice()
        }
      }
    })


    dropdown.setItems(d)
    dropdown.filter = false
    input.value = d[this.z2zIndex].name

    for (let obj of d) {
      this.csvTitles.push(obj.name)
    }

    arrowDown.addEventListener('click', () => {
      input.focus()
    })
    return cTopItem
  }

  renderHeaderItem(d, type, flag) {
    let fragment = document.createDocumentFragment()
    let div = document.createElement('DIV');
    div.className = 'zone-item';
    switch (type) {
      case 1:
        for (let p of d) {
          let cDiv = div.cloneNode(true)
          let { from, to, firstTitle } = p
          let str = `${mtr2mkm(from, _d.im)}-${mtr2mkm(to, _d.im)}(${_d.unit})`
          if (firstTitle) {
            str = firstTitle
          }
          this.csvTitles.push(str)
          cDiv.innerText = str
          fragment.appendChild(cDiv);
        }
        break;
      case 2:
        for (let p of d) {
          let cDivH = div.cloneNode(true)
          let { from, to, firstTitle } = p
          let str = `${from}-${to}(H)`
          if (firstTitle) {
            str = firstTitle
          }
          if (!flag) this.csvTitles.push(str)
          cDivH.innerText = str
          fragment.appendChild(cDivH);
        }
        break;
      case 3:
        div.classList.add('two')
        for (let p of d) {
          let cDiv = div.cloneNode(true)
          this.csvTitles.push(`${p.from}-${p.to}(Pick-up)`, `${p.from}-${p.to}(Drop-off)`,)
          cDiv.innerText = p.to;
          fragment.appendChild(cDiv);
        }
        break;
      case 4:
        for (let p of d) {
          let cDivDA = div.cloneNode(true)
          let { from, to, firstTitle } = p
          let str = `${mtr2mkm(from, _d.im)}-${mtr2mkm(to, _d.im)}(${_d.unit})`
          if (firstTitle) {
            str = firstTitle
          }
          cDivDA.innerText = str
          this.csvTitles.push(str)
          fragment.appendChild(cDivDA);
        }
        break;

      default:
        break;
    }

    return fragment
  }

  inputOnHover(e) {
    let target = e.target.parentNode;
    if (!target.classList.contains('warn')) return;

    let originvalue = Number(e.target.getAttribute('originvalue'));
    let curVal = Number(e.target.value);
    let delta = curVal - originvalue;

    let percent = (Math.abs(delta) / originvalue).toFixed(2);
    this.tipCaleText.innerText = `${originvalue} + (${delta.toFixed(2)}) = ${(originvalue + delta).toFixed(2)}`;
    this.tipPercent.innerText = Number((percent * 100).toFixed(2)) + '%';

    let rect = target.getBoundingClientRect();
    let t = rect.top;
    let l = rect.left;

    this.tipBox.style.top = t + 30 + 'px';
    this.tipBox.style.left = l + 'px';
    this.tipBox.classList.remove('hide');
  }

  inputOnMouseleave() {
    this.tipBox.classList.add('hide');
  }

  hideRedTriangle(e, inputVal) {
    let input = e.target.previousElementSibling;
    let field = input.getAttribute('field');
    let originvalue = input.getAttribute('originvalue');
    let vehicleId = input.getAttribute('vehicleId');
    let setting = this.svc.vehicleClasses.find((item) => item.vehicle_class_id == vehicleId);
    let { percent, percent_appendix } = setting;

    if (!percent_appendix) return;
    if (!inputVal) {

      // ------ hourly_pricing Compatible with older versions --------
      // if (field.startsWith('hourly_pricing')) {
      //   let strArr = field.split('.')
      //   let idx = -1
      //   if (strArr[3] == 'min_amount') {
      //     idx = percent_appendix.findIndex((item) => item.field == 'hourly_pricing.min_amount');
      //   } else {
      //     idx = percent_appendix.findIndex((item) => item.field == `hourly_pricing.ranges.${strArr[4]}`);
      //   }
      //   if (idx != -1) {
      //     percent_appendix.splice(idx, 1);
      //   }
      // }
      // ------ hourly_pricing Compatible with older versions  END--------


      let index = percent_appendix.findIndex((item) => item.field == field);
      if (index != -1) {
        percent_appendix.splice(index, 1);
      }
    }

    // input.value = (+originvalue + originvalue * (percent / 100)).toFixed(2) || 0
    let ov;
    if (inputVal) {
      ov = Number(inputVal);
    } else {
      ov = +originvalue + originvalue * (percent / 100);
    }

    if (!ov) {
      ov = 0;
    }
    input.value = ov.toFixed(2);

    input.removeAttribute('delta_amount');
    input.parentNode.classList.remove('warn');
    input.parentNode.classList.remove('show-price-zero-tips');

    e.target.classList.add('hide');
  }

  inputOnChange(e, curSetting) {
    let target = e.target;
    target.classList.remove('border-red');
    let field = target.getAttribute('field');
    let originvalue = target.getAttribute('originvalue');
    let vehicleId = target.getAttribute('vehicleId');
    let zeroTips = target.parentNode.querySelector('.price-zero-tips')
    if (!target.value || target.value == 0) {
      target.value = 0;
      zeroTips.classList.remove('hide')
    } else {
      zeroTips.classList.add('hide')
    }
    let delta_amount = target.value - originvalue;
    if (Object.is(delta_amount, NaN)) {
      target.parentNode.classList.add('border-red');
      getDialog().confirm({
        msg: 'Please enter the correct value',
      });
      return;
    }

    let curDelta = Number(delta_amount.toFixed(2));
    target.setAttribute('delta_amount', curDelta);

    target.parentNode.classList.add('warn');
    let percent = curDelta / originvalue;
    if (Math.abs(percent) >= 0.2) {
      this.showInputTips(target)
    }

    let nextElementSibling = target.nextElementSibling;
    nextElementSibling.classList.remove('hide');

    let appendix = {
      field,
      delta_amount: Number(delta_amount.toFixed(2)),
      hasChanged: true,
    };
    let setting = this.svc.vehicleClasses.find((item) => item.vehicle_class_id == vehicleId);
    let { percent_appendix } = setting;
    if (!percent_appendix) {
      setting['percent_appendix'] = [appendix];
    } else {
      let index = percent_appendix.findIndex((item) => item.field == field);
      if (index == -1) {
        percent_appendix.push(appendix);
      } else {
        if (Number(delta_amount.toFixed(2)) == 0) {
          percent_appendix.splice(index, 1);
        } else {
          percent_appendix[index] = appendix;
        }
      }
    }
    // handle the situation where the value in the input is the same as the original value. if percent is 0, hide the red triangle
    if (curDelta == 0 && curSetting.percent == 0) {
      let obj = {
        target: target.nextElementSibling,
      };
      this.hideRedTriangle(obj, target.value);
    }
  }


  calcVehicleClassesHandler(vehicleClasses) {
    vehicleClasses.map((item) => {
      item.percent_appendix &&
        item.percent_appendix.map((el) => {
          if (el.hasChanged) delete el.hasChanged;
        });
    });

    return vehicleClasses;
  }



  downLoadCSV() {
    this.pour();
    let arr = []
    this.allData.forEach((item, index) => {
      let { type, inputData, d } = item
      switch (type) {
        case 3:
          arr.push(...inputData)
          break;
        case 6:
          for (let o of d) {
            arr.push(...o.ranges)
          }
          break;
        default:
          arr.push(...d)
          break;
      }
    })

    let priceArr = [];
    let vehicleSetting = this.svc.vehicleClasses || [];
    for (let vehicle of this.sortVehicleList) {
      let current = [];
      let curSetting = vehicleSetting.find((item) => item.vehicle_class_id == vehicle.vehicle_id) || {};
      let percent_appendix = curSetting.percent_appendix || [];
      let percent = curSetting.percent || 0;

      if (JSON.stringify(curSetting) === '{}') {
        current.push(`${vehicle.vehicle_name}(${vehicle.vehicle_id})`, '');
      } else {
        current.push(`${vehicle.vehicle_name}(${vehicle.vehicle_id})`, curSetting.percent || 0);
      }

      arr.map((el, i) => {
        let obj = percent_appendix.find((obj) => obj.field == el.field);
        let value = el.amount
        if (JSON.stringify(curSetting) === '{}') {
          current.push('');
        } else {
          if (obj) {
            current.push((value + Number(obj.delta_amount)).toFixed(2));
          } else {
            current.push((value + (value * percent) / 100).toFixed(2));
          }
        }
      });
      priceArr.push(current);
    }

    this.exportCSV(this.csvTitles, priceArr);
  }

  exportCSV(title, jsonData) {
    let str = ``;
    for (let i of title) {
      let nameStr = i.replace(/\,/g, ' ')
      str += nameStr + ',';
    }
    str += '\n';
    for (let item of jsonData) {
      for (let el in item) {
        str += `${item[el] + '\t'},`;
      }
      str += '\n';
    }
    const url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    const link = document.createElement('a');
    link.href = url;
    let dateName = new Date().getTime();
    link.download = dateName + '.csv';
    link.click();
  }
  validate() {
    let { vehicleClasses } = this.svc;
    if (!vehicleClasses || vehicleClasses.length == 0) {
      showErr('Please select vehicle');
      return false;
    }
    return true;
  }

  pour(data, type) {
    let { vehicleClasses, pricing_schedule_sum } = this.svc;
    if (type == 'calc' && vehicleClasses) {
      vehicleClasses = this.calcVehicleClassesHandler(vehicleClasses);
    }
    if (vehicleClasses) {
      serviceArea['vehicleClasses'] = vehicleClasses;
    } else {
      delete serviceArea.vehicleClasses;
    }
    if (pricing_schedule_sum) {
      serviceArea['pricing_schedule_sum'] = pricing_schedule_sum;
    }
    console.log('---VehiclesPricing----', serviceArea);
  }

  async show() {
    this.sumW = 0
    this.inputIdx = 0
    this.z2zIndex = 0
    this.hourlyIndex = 0
    this.csvTitles = ['VehicleName', 'Price']
    this.rootElm.classList.remove('hide');
    this.svc = JSON.parse(JSON.stringify(serviceArea));

    let { countryCode, vehicleClasses } = this.svc
    let vehicles = await _getVehicleList(countryCode)
    this.sortVehicleList = sortVehicleListHandler(vehicles, vehicleClasses)
    this.dataHandler()
    this.fillVehicleName()
    this.fillTitle()
    this.moveHandler()
  }

  hide() {
    this.pour()
    this.rootElm.classList.add('hide');
  }
}


