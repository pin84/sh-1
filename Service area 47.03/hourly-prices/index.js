/*
 * @Author: Joy joy@elifeteam.com
 * @Date: 2023-11-30 13:52:30
 * @LastEditors: Joy joy@elifeteam.com
 * @LastEditTime: 2023-12-21 10:06:24
 * @FilePath: /elifelimo-pricing/hourly-prices/index.js
 * @Description:
 */
/** @format */

class HourlyPrices {
  constructor(id) {
    this.rootElm = elmOfId(id);
    this.currentIndex = 0;
    this.selectList = [];
    this.hourlyPricing = {};
  }

  async insertHtml() {
    let dom = this.rootElm.querySelector('#hourly-pricing');
    if (!dom) {
      let data = await fetch('./hourly-prices/index.html');
      let html = await data.text();
      this.rootElm.innerHTML = html;
    }
  }

  initElms() {
    this.currentIndex = 0;
    this.addRuleBtn = this.rootElm.querySelector('.hourly-pricing-rule-add');
    this.addRuleBtn.onclick = () => {
      if (!this.validate(true)) return;
      this.renderRuleEditModal({}, 'add');
    };
    this.renderPage();
  }

  validate(isAdd) {
    if (this.hourlyPricing.rules.length === 1 && !this.hourlyPricing.rules[0].max_distance && this.hourlyPricing.rules[0].io === '') {
      if (this.startPrice.value || this.startHourEnd.value || (isAdd && this.hourlyPricing.rules[0].name)) {
        svcUtils.msgBox({
          msg: 'Please complete the page information',
        });
        return false;
      } else {
        return true;
      }
    }
    let flag = true;
    if (!this.checkRangeNumFn() || !this.checkInfoComplete()) {
      flag = false;
      svcUtils.msgBox({
        msg: 'Please complete the page information',
      });
    }

    return flag;
  }

  renderPage() {
    this.renderRules();
    this.initBasicInfo();
    this.initRanges();
    this.renderRanges();
    this.initCacl();
  }

  renderRules() {
    let rules = this.hourlyPricing.rules || [];
    let box = elmOfIdRel('hourly-pricing-rules', this.rootElm);
    box.innerHTML = '';

    let rollItem = this.rootElm.querySelector('.hourly-pricing-rule');
    let fragment = document.createDocumentFragment();
    rules.map((item, index) => {
      let cItem = rollItem.cloneNode(true);
      cItem.id = `hourly-pricing-rule-${index}`;
      cItem.classList.remove('hide');

      let name = cItem.querySelector('.hourly-pricing-rule-title');
      name.innerHTML = item.name || '--';

      name.onclick = () => {
        if (!this.validate()) return;
        this.currentIndex = index;
        this.renderPage();
      };
      if (index === this.currentIndex) {
        name.classList.add('active');
      }

      let edit = cItem.querySelector('.i-icon-edit');
      let del = cItem.querySelector('.i-icon-delete');
      // if (rules) {
      //   del.classList.add('hide');
      // } else {
      //   del.classList.remove('hide');
      // }
      edit.onclick = () => {
        this.renderRuleEditModal(item, 'edit');
      };

      del.onclick = async () => {
        let submit = await svcUtils.msgBox({
          msg: `Are you sure you want to remove this rule?`,
          isShowCancel: true,
          cancelText: 'Cancel',
          submitText: 'Delete',
        });
        if (submit) {
          if (index === this.currentIndex) {
            this.currentIndex = index === 0 ? 0 : index - 1;
          }
          if (this.currentIndex === 0 && rules.length === 1) {
            rules[0] = this.initFirstRule();
            this.hourlyPricing = {
              rules,
            };
          } else {
            rules.splice(index, 1);
          }

          this.updateDomStyle(this.startHourEnd, this.startHourEnd.parentElement, 'remove');
          this.updateDomStyle(this.startPrice, this.startPrice.parentElement, 'remove');
          this.renderPage();
        }
      };

      fragment.appendChild(cItem);
    });
    box.appendChild(fragment);
  }

  renderRuleEditModal(item, type) {
    svcUtils.basicMsgBox(
      {
        title: 'Set rule name',
        content: `<input type='text' class='input' id='hourly-pricing-rule-name' maxlength='40' value='${item.name || ''}' />`,
        isShowCancel: true,
        cancelText: 'Cancel',
        submitText: 'Save',
      },
      () => {
        let input = elmOfId(`hourly-pricing-rule-name`);
        this.updateDomStyle(input);
        if (input.value || input.value == '0') {
          if (type === 'add') {
            let rule = {
              io: '',
              name: input.value,
              currency: serviceArea.currencyCode,
              max_distance: '',
              min_amount: '',
              min_duration: '',
              ranges: [
                {
                  seq: 0,
                  amount: '',
                  currency: serviceArea.currencyCode,
                  duration: 0,
                  from: '',
                  to: '',
                },
              ],
              zones: [],
            };
            this.hourlyPricing.rules.push(rule);
            this.currentIndex = this.hourlyPricing.rules.length - 1;

            this.renderPage();
          } else {
            item.name = input.value;
            this.renderRules();
          }
          return true;
        } else {
          return false;
        }
      }
    );
  }

  initBasicInfo() {
    let current = this.hourlyPricing.rules[this.currentIndex];
    let hourlyPricingMax = this.rootElm.querySelector('#hourly-pricing-max');
    let hourlyPricingType = this.rootElm.querySelector('.hourly-pricing-type');
    let hourlyPricingMaxTip = this.rootElm.querySelector('#hourly-pricing-max-tip');

    hourlyPricingMax.innerHTML = current.max_distance || '--';
    hourlyPricingType.innerHTML = current.io === '' ? '--' : current.io == 1 ? 'In Zone' : 'Out Zone';
    if (current.io === 0) {
      hourlyPricingType.classList.add('out');
    } else {
      hourlyPricingType.classList.remove('out');
    }
    hourlyPricingMaxTip.innerHTML = `(${distUnitData[dU].abbr})`;

    this.setMaxRange = elmOfIdRel('set-max-range', this.rootElm);

    const delDom = `<div id='set-max-mileage'>
      <div class='item'>
        <span class='item-label'>Max mileage</span>
        <div class='input-outer'>
          <input type='number' class='input' id='max-mileage' />
          <span class="unit" id="unit">km</span>
        </div>
      </div>
      <div class='item'>
        <span class='item-label'>In/Out</span>
        <div class='checkbox-outer'>
          <div class='checkbox'>
            <label class="switch-btn" name="switch-btn">
              <input type="checkbox" id="in-zone">
              <span class="slider"></span>
            </label>
            <span>In zone</span>
          </div>
          <div class='checkbox'>
            <label class="switch-btn" name="switch-btn">
              <input type="checkbox" id="out-zone">
              <span class="slider"></span>
            </label>
            <span>Out zone</span>
          </div>
        </div>
      </div>
    </div>`;

    this.setMaxRange.onclick = () => {
      this.basicInfoCurrent = JSON.parse(JSON.stringify(current));
      svcUtils.basicMsgBox(
        {
          title: 'Max mileage & In/Out Zone ',
          content: delDom,
          isShowCancel: true,
          cancelText: 'Cancel',
          submitText: 'OK',
        },
        () => {
          if (!input.value) {
            this.updateDomStyle(input, input.parentElement, 'add');
            return false;
          }
          if (this.checkZone(this.basicInfoCurrent, this.currentIndex)) {
            svcUtils.msgBox({ msg: 'The same area setting already exists' });
            return false;
          }

          this.basicInfoCurrent.max_distance = Number(input.value);
          if (!this.checkMaxDistance(this.basicInfoCurrent, this.currentIndex)) {
            svcUtils.msgBox({ msg: 'The maximum mileage of the out zone needs to be greater than the maximum mileage of the in zone.' });
            return false;
          }
          this.basicInfoCurrent.io = inZone.checked ? 1 : 0;
          this.hourlyPricing.rules[this.currentIndex] = this.basicInfoCurrent;
          console.log('setMaxRange=====', this.hourlyPricing.rules);
          this.initBasicInfo();
          return true;
        }
      );
      const delDomId = elmOfId('set-max-mileage');
      const input = elmOfIdRel('max-mileage', delDomId);
      const inZone = elmOfIdRel('in-zone', delDomId);
      const outZone = elmOfIdRel('out-zone', delDomId);
      // inZone.checked = false;
      // outZone.checked = false;

      input.value = this.basicInfoCurrent.max_distance;
      if (this.basicInfoCurrent.io === 0) {
        outZone.checked = true;
      } else if (this.basicInfoCurrent.io === 1) {
        inZone.checked = true;
      } else {
        inZone.checked = true;
      }
      input.oninput = () => {
        this.updateDomStyle(input, input.parentElement);
      };
      inZone.onchange = (e) => {
        const value = e.target.checked;
        if (value) {
          outZone.checked = false;
          this.basicInfoCurrent.io = 1;
        }
      };
      outZone.onchange = (e) => {
        const value = e.target.checked;
        if (value) {
          inZone.checked = false;
          this.basicInfoCurrent.io = 0;
        }
      };
    };

    this.initModalEvent();
    this.renderZones();
  }

  renderZones() {
    let list = this.hourlyPricing.rules[this.currentIndex].zones || [];
    // console.log('renderZones======', this.hourlyPricing.rules[this.currentIndex]);
    let box = this.rootElm.querySelector('.hourly-pricing-areas-bottom');
    box.innerHTML = '';

    let rollItem = this.rootElm.querySelector('.hourly-pricing-area');
    let fragment = document.createDocumentFragment();
    list.map((item, index) => {
      let cItem = rollItem.cloneNode(true);
      cItem.classList.remove('hide');
      let color = this.handleZoneColor(item);
      if (color) cItem.classList.add(color);

      let name = cItem.querySelector('.hourly-pricing-area-name');
      name.innerHTML = item == 'serviceArea' ? 'Service area' : item;
      let deleteBtn = cItem.querySelector('#zone-delete');
      if (index === 0) {
        deleteBtn.classList.add('hide');
      }
      deleteBtn.onclick = () => {
        list = list.filter((value) => value != item);
        this.hourlyPricing.rules[this.currentIndex].zones = list;
        // console.log(item, this.hourlyPricing.rules);
        this.renderZones();
      };
      fragment.appendChild(cItem);
    });
    box.appendChild(fragment);
  }

  initModalEvent() {
    let addAreasBtn = this.rootElm.querySelector('.hourly-pricing-areas-btn');
    this.hourlyPricesModal = elmOfIdRel('hourly-pricing-modal', this.rootElm);

    addAreasBtn.onclick = () => {
      if (this.hourlyPricing.rules[this.currentIndex].io === '') {
        svcUtils.msgBox({ msg: 'Please select Max mileage & In/Out Zone first' });
        return;
      }
      this.hourlyPricesModal.classList.remove('hide');
      this.renderModalZones();
    };
    let modalClose = this.hourlyPricesModal.querySelector('.i-close');
    let modalCancel = this.hourlyPricesModal.querySelector('.cancel');
    let modalSubmit = this.hourlyPricesModal.querySelector('.submit');

    modalClose.onclick = () => {
      this.hourlyPricesModal.classList.add('hide');
    };
    modalCancel.onclick = () => {
      this.hourlyPricesModal.classList.add('hide');
    };

    modalSubmit.onclick = () => {
      // console.log(this.modalZonesCurrent, this.hourlyPricing.rules[this.currentIndex]);
      if (this.modalZonesCurrent.zones.length) {
        if (!this.checkMaxDistance(this.modalZonesCurrent, this.currentIndex)) {
          svcUtils.msgBox({ msg: 'The maximum mileage of the out zone needs to be greater than the maximum mileage of the in zone.' });
          return false;
        }
        
        this.hourlyPricing.rules[this.currentIndex].zones = this.modalZonesCurrent.zones;
        this.hourlyPricesModal.classList.add('hide');
        this.renderZones();
      } else {
        svcUtils.msgBox({ msg: 'Please select an area' });
      }
    };
  }

  renderModalZones() {
    // modal temp data
    this.modalZonesCurrent = JSON.parse(JSON.stringify(this.hourlyPricing.rules[this.currentIndex]));
    let list = this.dealSelectList();

    let box = this.hourlyPricesModal.querySelector('#modal-zones');
    box.innerHTML = '';

    let rollItem = this.hourlyPricesModal.querySelector('.modal-zone-item');
    let fragment = document.createDocumentFragment();
    list.map((item, index) => {
      let cItem = rollItem.cloneNode(true);
      cItem.classList.remove('hide');
      let color = this.handleZoneColor(item.id);
      if (color) cItem.classList.add(color);

      let name = cItem.querySelector('.modal-zone-item-name');
      name.innerHTML = item.name;

      let checkbox = cItem.querySelector('#zone-check');
      checkbox.checked = this.zoneChecked(item.id);
      checkbox.disabled = this.zoneDisabled(item.id, this.modalZonesCurrent.io);
      if (checkbox.disabled) cItem.classList.add('disabled');
      checkbox.onchange = (e) => {
        const checked = e.target.checked;
        if (checked) {
          this.modalZonesCurrent.zones.push(item.id);
        } else {
          this.modalZonesCurrent.zones = this.modalZonesCurrent.zones.filter((value) => value != item.id);
        }
      };

      fragment.appendChild(cItem);
    });
    box.appendChild(fragment);
  }

  initRanges() {
    this.startPrice = elmOfIdRel('start-price-c', this.rootElm);
    this.startHourEnd = elmOfIdRel('low-price-end', this.rootElm);
    this.addRangeBtn = elmOfIdRel('add-range-button', this.rootElm);

    this.startPrice.parentElement.classList.remove('fld-box-empty-warn');
    this.startHourEnd.parentElement.classList.remove('fld-box-empty-warn');

    this.startPrice.value = this.hourlyPricing.rules[this.currentIndex].min_amount;
    this.startHourEnd.value = this.hourlyPricing.rules[this.currentIndex].min_duration;

    this.startPrice.oninput = (e) => {
      const inputValue = e.target.value;
      const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
      const decimalMatch = sanitizedValue.match(/^\d+(?:\.\d{0,2})?/);
      const fixedValue = decimalMatch ? decimalMatch[0] : '';
      e.target.value = fixedValue;
      this.hourlyPricing.rules[this.currentIndex].min_amount = e.target.value ? e.target.value - 0 : 0;
      this.updateDomStyle(this.startPrice, this.startPrice.parentElement);
    };

    this.startHourEnd.oninput = (e) => {
      this.updateDomStyle(this.startHourEnd, this.startHourEnd.parentElement);
    };

    this.startHourEnd.onblur = (e) => {
      this.hourlyPricing.rules[this.currentIndex].min_duration = e.target.value ? e.target.value - 0 : '';
      if (this.hourlyPricing.rules[this.currentIndex].ranges.length) {
        this.hourlyPricing.rules[this.currentIndex].ranges[0].from = e.target.value || '';
      }
      this.checkRangeNumFn();
      this.renderRanges();
    };

    let priceUnits = this.rootElm.querySelectorAll('.price-unit');
    priceUnits.forEach((item) => {
      item.innerHTML = serviceArea.currencyCode;
    });

    this.addRangeBtn.onclick = () => {
      if (!this.checkRangeNumFn()) {
        this.renderRanges();
        return;
      }
      let current = this.hourlyPricing.rules[this.currentIndex];
      let index = current.ranges.length;
      let newItem = {
        seq: index,
        amount: '',
        currency: serviceArea.currencyCode,
        duration: 0,
        from: index == 0 ? current.min_duration : current.ranges[index - 1].to,
        to: '',
      };
      current.ranges.push(newItem);

      this.renderRanges();
    };
  }

  renderRanges() {
    let list = this.hourlyPricing.rules[this.currentIndex].ranges;
    // console.log('renderRanges======', this.hourlyPricing.rules, this.currentIndex);
    let box = this.rootElm.querySelector('#range-list');
    box.innerHTML = '';

    let rollItem = this.rootElm.querySelector('.range-item-box');
    let fragment = document.createDocumentFragment();
    list.map((item, index) => {
      let cItem = rollItem.cloneNode(true);
      cItem.classList.remove('hide');

      let startInput = cItem.querySelector('.range-item-startnum');
      let endInput = cItem.querySelector('.range-item-endnum');
      let unitInput = cItem.querySelector('.unit-num');
      startInput.value = item.from;
      endInput.value = item.to;
      unitInput.value = this.startHourEnd.value ? item.amount : 0;

      if (item.fromActive || item.fromActive_2) {
        this.updateDomStyle(startInput, startInput.parentElement, 'add');
      } else {
        this.updateDomStyle(startInput, startInput.parentElement, 'remove');
      }
      if (item.toActive || item.toActive_2) {
        this.updateDomStyle(endInput, endInput.parentElement, 'add');
      } else {
        this.updateDomStyle(endInput, endInput.parentElement, 'remove');
      }
      if (item.amountActive) {
        this.updateDomStyle(unitInput, unitInput.parentElement, 'add');
      } else {
        this.updateDomStyle(unitInput, unitInput.parentElement, 'remove');
      }

      endInput.onfocus = () => {
        this.updateDomStyle(endInput, endInput.parentElement);
      };
      endInput.onblur = (e) => {
        item.to = e.target.value - 0;
        if (index < list.length - 1) {
          list[index + 1].from = e.target.value - 0;
        }
        this.checkRangeNumFn();
        this.renderRanges();
      };

      unitInput.onfocus = () => {
        this.updateDomStyle(unitInput, unitInput.parentElement);
      };
      unitInput.onblur = (e) => {
        item.amount = e.target.value ? e.target.value - 0 : '';
        this.checkRangeNumFn();
        this.renderRanges();
      };

      let delBox = cItem.querySelector('.del-item-box');
      delBox.classList.add('hide');
      if (index === list.length - 1) {
        delBox.classList.remove('hide');
      }

      delBox.onclick = () => {
        if (index === 0) {
          item.to = 0;
          item.amount = 0;
        } else {
          list.splice(index, 1);
        }
        this.renderRanges();
      };

      fragment.appendChild(cItem);
    });
    box.appendChild(fragment);
  }

  initCacl() {
    let calcBtn = this.rootElm.querySelector('.calc-btn');
    let resultBox = this.rootElm.querySelector('.result-num');
    let resultUnitInput = this.rootElm.querySelector('.result-unit');
    let current = this.hourlyPricing.rules[this.currentIndex];

    resultUnitInput.innerHTML = serviceArea.currencyCode;

    calcBtn.onclick = () => {
      let calcCount = this.rootElm.querySelector('.couter-input').value - 0;
      if (!calcCount) {
        resultBox.innerHTML = 0;
      } else if (calcCount <= current.min_duration) {
        resultBox.textContent = current.min_amount;
      } else {
        resultBox.textContent = (current.min_amount - 0 + this.calcFee(calcCount - current.min_duration, current)).toFixed(2);
      }
    };
  }

  calcFee(duration, current) {
    let totalFee = 0;
    for (let i = 0; i < current.ranges.length; i++) {
      if (duration <= 0) {
        break;
      }
      const range = current.ranges[i].to - current.ranges[i].from;
      const feePerKm = current.ranges[i].amount;
      const kmInThisRange = Math.min(range, duration);
      const feeInThisRange = kmInThisRange * feePerKm;
      totalFee += feeInThisRange;
      duration -= kmInThisRange;
      console.log('totalFee', totalFee);
    }
    if (duration > 0) {
      const lastFeePerKm = current.ranges[current.ranges.length - 1].amount;
      totalFee += duration * lastFeePerKm;
    }
    return totalFee;
  }

  zoneChecked(item) {
    let list = this.hourlyPricing.rules[this.currentIndex].zones;
    let current = list.findIndex((el) => item == el);
    if (current > -1) {
      return true;
    }
    return false;
  }

  zoneDisabled(zone, io) {
    let list = this.hourlyPricing.rules;
    for (let i = 0; i < list.length; i++) {
      if (i === this.currentIndex) continue;
      const item = list[i];
      // console.log('zoneDisabled====', item, list);
      if (item.zones.includes(zone) && item.io === io) {
        return true;
      }
    }
    return false;
  }

  checkRangeNumFn() {
    let priceFlag = true;
    // console.log(this.startHourEnd.value, this.startPrice.value);
    if (!this.startHourEnd.value) {
      priceFlag = false;
      this.updateDomStyle(this.startHourEnd, this.startHourEnd.parentElement, 'add');
    } else {
      this.updateDomStyle(this.startHourEnd, this.startHourEnd.parentElement, 'remove');
    }
    if (!this.startPrice.value) {
      priceFlag = false;
      this.updateDomStyle(this.startPrice, this.startPrice.parentElement, 'add');
    } else {
      this.updateDomStyle(this.startPrice, this.startPrice.parentElement, 'remove');
    }
    let ranges = this.hourlyPricing.rules[this.currentIndex].ranges;
    if (ranges && ranges.length != 0) {
      let showFlag = false;
      ranges.forEach((item, index) => {
        if (item.from && item.to <= item.from) {
          item['toActive'] = true;
          if (index < ranges.length - 1) ranges[index + 1]['fromActive'] = true;
        } else {
          item['toActive'] = false;
          if (index < ranges.length - 1) ranges[index + 1]['fromActive'] = false;
        }

        item['amountActive'] = Boolean(item.amount < 0) || item.amount === '';
        item['fromActive_2'] = Boolean(item.from < 0);
        item['toActive_2'] = Boolean(item.to < 0);
        if (!(this.startHourEnd.value - 0)) item['amountActive'] = false;
        showFlag = item['amountActive'] || item['fromActive_2'] || item['fromActive_2'];
      });
      if (showFlag) return false;
      return ranges.every((item) => (item.amount >= 0 && item.from >= 0 && item.to >= 0 && item.from > 0 ? item.from < item.to : true)) && priceFlag;
    } else {
      return false;
    }
  }

  checkInfoComplete() {
    const current = this.hourlyPricing.rules[this.currentIndex];
    let flag = true;
    if (current.io === '' || current.max_distance === '' || current.zones.length === 0) {
      flag = false;
    }

    return flag;
  }

  checkZone(currentItem, currentIndex) {
    let arr = this.hourlyPricing.rules;

    if (!currentItem.zones.length) return false;
    for (let i = 0; i < arr.length; i++) {
      if (i === currentIndex) {
        continue;
      }

      let item = arr[i];
      let zones = item.zones;
      let io = item.io;
      // console.log(item, zones, currentItem, currentIndex);

      if (zones.includes(...currentItem.zones) && io == currentItem.io) {
        return true;
      }
    }
    return false;
  }

  checkMaxDistance(item) {
    let rules = JSON.parse(JSON.stringify(this.hourlyPricing.rules));
    let matchingRules = [];
    if (item.io == 0) {
      matchingRules = rules.filter(rule => rule.io == 1 && rule.zones.some(zone => item.zones.includes(zone)))
    } else {
      matchingRules = rules.filter(rule => rule.io == 0 && rule.zones.some(zone => item.zones.includes(zone)))
    }
    // console.log(item, matchingRules)
    if (matchingRules.length) {
      let maxDistance = 0;
      if (item.io == 0) {
        maxDistance = Math.max(
          ...matchingRules
            .map(rule => rule.max_distance)
        );
        if (item.max_distance < maxDistance) return false;
      } else {
        maxDistance = Math.min(
          ...matchingRules
            .map(rule => rule.max_distance)
        );
        if (item.max_distance > maxDistance) return false;
      }

      // console.log(maxDistance);
    }
    return true;
  }

  updateDomStyle(ele, targetEle, type) {
    if (!type) {
      if (ele.value === '') {
        if (targetEle) {
          targetEle.classList.add('fld-box-empty-warn');
        } else {
          ele.classList.add('fld-box-empty-warn');
        }
      } else {
        if (targetEle) {
          targetEle.classList.remove('fld-box-empty-warn');
        } else {
          ele.classList.remove('fld-box-empty-warn');
        }
      }
    } else {
      if (type === 'add') {
        if (targetEle) {
          targetEle.classList.add('fld-box-empty-warn');
        } else {
          ele.classList.add('fld-box-empty-warn');
        }
      } else {
        if (targetEle) {
          targetEle.classList.remove('fld-box-empty-warn');
        } else {
          ele.classList.remove('fld-box-empty-warn');
        }
      }
    }
  }

  handleZoneColor(item) {
    if (item == 'serviceArea') {
      return 'blue';
    } else if (item == 'downtown') {
      return 'orange';
    } else {
      return '';
    }
  }

  dealSelectList() {
    let list = [
      {
        name: 'service area',
        id: 'serviceArea',
      },
    ];
    if (serviceArea.downtown_areas) {
      list.push({
        name: 'downtown',
        id: 'downtown',
      });
    }
    serviceArea.zones &&
      serviceArea.zones.map((item, index) => {
        list.push({
          name: `${item.name}(${index + 1})`,
          id: item.name,
        });
      });
    return list;
  }

  dealData() {
    let hourlyPricing = {
      rules: [],
    };
    // delete serviceArea.hourly_pricing;
    if (serviceArea.hourly_pricing) {
      if (!serviceArea.hourly_pricing.hasOwnProperty('rules')) {
        hourlyPricing = JSON.parse(JSON.stringify(serviceArea.hourly_pricing));
        let rule1 = {
          io: 1,
          name: 'Rule 1',
          zones: ['serviceArea'],
          max_distance: 200,
          ...JSON.parse(JSON.stringify(hourlyPricing)),
        };

        let rule2 = {
          io: 0,
          name: 'Rule 2',
          zones: ['serviceArea'],
          max_distance: 200,
          ...JSON.parse(JSON.stringify(hourlyPricing)),
        };
        hourlyPricing.rules = [];
        hourlyPricing.rules.push(rule1);
        hourlyPricing.rules.push(rule2);
      } else {
        hourlyPricing = serviceArea.hourly_pricing;
      }
    } else {
      let cData = this.initFirstRule();
      hourlyPricing.rules.push(cData);
    }
    return hourlyPricing;
  }

  initFirstRule() {
    let cData = {
      io: '',
      name: 'Rule 1',
      currency: serviceArea.currencyCode,
      min_amount: '',
      min_duration: '',
      max_distance: '',
      zones: [],
    };
    cData.ranges = [
      {
        seq: 0,
        amount: '',
        currency: serviceArea.currencyCode,
        duration: 0,
        from: '',
        to: '',
      },
    ];
    return cData;
  }

  dealPourRangeData(ranges) {
    for (let item of ranges) {
      item.currency = serviceArea.currencyCode;
      item.duration = item.to - item.from;
      delete item.amountActive;
      delete item.fromActive;
      delete item.fromActive_2;
      delete item.toActive;
      delete item.toActive_2;
    }
    return ranges;
  }

  pour(serviceArea) {
    let pourData = JSON.parse(JSON.stringify(this.hourlyPricing));
    if (pourData.rules.length === 1) {
      let current = pourData.rules[0];
      let { ranges, min_duration } = current;
      if (ranges) {
        ranges = this.dealPourRangeData(ranges);
      }
      if (min_duration) {
        serviceArea.hourly_pricing = pourData;
      } else {
        if (pourData.min_duration) {
          delete pourData.rules;
          serviceArea.hourly_pricing = pourData;
        } else {
          delete serviceArea.hourly_pricing;
        }
      }
    } else {
      pourData.rules.map((item) => {
        item.ranges = this.dealPourRangeData(item.ranges);
      });
      serviceArea.hourly_pricing = pourData;
    }
    // console.log(serviceArea.hourly_pricing);
  }

  async show() {
    await this.insertHtml();

    this.hourlyPricing = this.dealData();
    console.log('-----serviceArea-rangePrices-------', serviceArea, this.hourlyPricing);
    this.rootElm.classList.remove('hide');
    this.initElms();
  }

  hide() {
    this.pour(serviceArea);
    this.rootElm.classList.add('hide');
  }
}
