/** @format */

class WcPageination {
  constructor({ rootElm, pageCount, pageIndex, isShowToFirst = false, isShowToLast = false, titleList = ['a', 'b', 'c'], prefix = '', callback = () => { } } = {}) {
    this.rootElm = rootElm;
    this.elmList = [];
    this.pageCount = pageCount;
    this.pageIndex = pageIndex;
    this.isShowToFirst = isShowToFirst;
    this.isShowToLast = isShowToLast;
    this.prefix = prefix;
    this.titleList = titleList;
    this.clickTimeId = null;
    this.callback = callback;
    this.initUi();
  }
  initUi() {
    this.rootElm.innerHTML = '';

    let tLen = this.titleList.length;
    let pageCount = tLen ? tLen : this.pageCount;
    this.totalCount = pageCount;
    let list = ['DIV', 'INPUT', 'SPAN', 'SPAN'];
    let [box, span, prev, next] = createElms(list);

    span.classList.add('wc-pageinatin-item');
    prev.classList.add('wc-pageinatin-item');
    next.classList.add('wc-pageinatin-item');

    box.classList.add('wc-pageination');

    this.span = span;

    this.box = box;

    prev.innerText = '<';
    prev.setAttribute('page', '<');
    if (this.isShowToFirst) {
      box.appendChild(prev);
    }
    if (pageCount > 5) {
      if (this.pageIndex <= 4) {
        for (let i = 0; i < 5; i++) {
          this.pushPageIntoBox(i + 1);
        }
        this.pushPointIntoBox('add');
        this.pushPageIntoBox(pageCount);
      } else if (this.pageIndex > 4 && this.pageIndex < pageCount - 3) {
        this.pushPageIntoBox(1);
        this.pushPointIntoBox();
        for (let i = this.pageIndex - 3; i < this.pageIndex + 2; i++) {
          this.pushPageIntoBox(i + 1);
        }
        this.pushPointIntoBox('add');
        this.pushPageIntoBox(pageCount);
      } else if (this.pageIndex >= pageCount - 3) {
        this.pushPageIntoBox(1);
        this.pushPointIntoBox();

        for (let i = pageCount - 5; i < pageCount; i++) {
          this.pushPageIntoBox(i + 1);
        }
      }
    } else {
      for (let i = 0; i < pageCount; i++) {
        this.pushPageIntoBox(i + 1);
      }
    }

    next.innerText = '>';
    next.setAttribute('page', '>');
    if (this.isShowToLast) {
      box.appendChild(next);
    }

    this.elmList = box.querySelectorAll('.wc-pageinatin-item');

    box.oncontextmenu = function (e) {
      return false;
      //or e.preventDefault()
    };

    box.addEventListener('mousedown', (e) => {
      clearTimeout(this.clickTimeId);
      this.clickTimeId = setTimeout(() => {
        // console.log('click');
        if (e.button == 0) {
          this.changePage(e);
        } else {
          let index = e.target.getAttribute('page');

          if (!Number(index)) return;

          let { clientX, clientY } = e;
          document.dispatchEvent(
            new CustomEvent('svc-delSetting', {
              detail: {
                idx: index - 1,
                clientX,
                clientY,
              },
            })
          );
        }
      }, 200);
    });
    box.addEventListener('dblclick', (e) => {
      clearTimeout(this.clickTimeId);
      console.log('dbclick');
      // console.log(e.target);
      // e.target.focus()
      // this.changePage(e)
    });

    this.rootElm.appendChild(box);
  }

  setPageCount(pageCount) {
    this.pageCount = pageCount;
    this.initUi();
  }

  getPageIndex() {
    return this.pageIndex;
  }

  changePage(e) {
    let target = e.target;
    if (!target.className.includes('wc-pageinatin-item')) {
      return;
    }

    let innerText = target.getAttribute('page');

    let index = 1;
    switch (innerText) {
      case '<':
        index = 1;
        break;
      case '>':
        index = this.pageCount;
        break;
      case '...':
        if (target.classList.contains('minus')) {
          index = this.pageIndex - 4;
        } else {
          index = this.pageIndex + 4;
        }
        break;
      default:
        index = Number(innerText);
        break;
    }

    if (index > this.totalCount) {
      index = this.totalCount;
    }
    this.pageIndex = index;

    document.dispatchEvent(new CustomEvent('changePage', { detail: index - 1 }));
    this.initUi();
  }

  changeIndex(index) {
    this.pageIndex = index;
    this.initUi();
  }

  pushPointIntoBox(type = 'minus') {
    let span = this.span.cloneNode();

    span.setAttribute('readonly', true);
    if (type == 'minus') {
      span.classList.add('minus');
    } else {
      span.classList.add('add');
    }
    span.setAttribute('page', '...');
    span.value = '...';
    this.box.appendChild(span);
  }
  pushPageIntoBox(index) {
    let span = this.span.cloneNode();

    span.addEventListener('change', (e) => {
      let pageNo = e.target.getAttribute('page');

      document.dispatchEvent(
        new CustomEvent('svc-changeTitle', {
          detail: {
            pageNo,
            inputValue: e.target.value,
          },
        })
      );
    });

    if (index == this.pageIndex) {
      span.classList.add('active');
    }
    span.setAttribute('page', index);
    let title = this.titleList[index - 1];

    span.value = title ? title : this.prefix + index;

    span.addEventListener('change', () => {
      this.titleList[index - 1] = span.value;
    });
    this.box.appendChild(span);
  }
}

class WcSearchBox {
  constructor({ id = 'wc-wrapper-elm-id', placeholder = 'placeholder' } = {}) {
    this.placeholder = placeholder;
    this.rootElm = document.getElementById(id);
    this.initUi();

    this.searchIcon = null;
  }

  initUi() {
    let list = ['DIV', 'INPUT', 'DIV'];
    let [box, input, searchIcon] = createElms(list);

    this.searchIcon = searchIcon;

    box.classList.add('wc-search-box');

    input.setAttribute('placeholder', this.placeholder);
    input.classList.add('wc-input');

    input.addEventListener('input', (e) => {
      this.callback(e);
    });

    box.appendChild(input);
    box.appendChild(searchIcon);

    searchIcon.classList.add('com-search', 'wc-com-search');
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(box);
  }

  onInput(callback) {
    this.callback = callback;
  }
}

class NextOrPrevPage {
  constructor({ id = '' }) {
    this.id = id;
    this.rootElm = document.getElementById(this.id);

    this.state = new Proxy(
      { isLast: false, isFirst: false },
      {
        set: (target, key, val, receiver) => {
          // console.log(target, key, val, receiver);
          const res = Reflect.set(target, key, val, receiver);

          if (key == 'isLast') {
            if (val) {
              this.next.setAttribute('disabled', 'disabled');
              this.next.classList.add('not-allowed');
            } else {
              this.next.removeAttribute('disabled');
              this.next.classList.remove('not-allowed');
            }
          } else {
            if (val) {
              this.prev.setAttribute('disabled', 'disabled');
              this.prev.classList.add('not-allowed');
            }
          }

          return res;
        },
      }
    );

    this.initUi();
  }

  initUi() {
    let list = ['DIV', 'button', 'button'];
    let [box, prev, next] = createElms(list);
    this.prev = prev;
    this.next = next;
    box.classList.add('wc-prev-next-page');
    prev.innerText = '<';
    prev.classList.add('pagination-item');
    next.innerText = '>';
    next.classList.add('pagination-item');

    box.appendChild(prev);
    box.appendChild(next);
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(box);

    prev.addEventListener('click', () => {
      if (this.toPrivCallback) {
        this.next.removeAttribute('disabled');
        this.next.classList.remove('not-allowed');
        this.toPrivCallback();
      }
    });
    next.addEventListener('click', () => {
      if (this.toNextCallback) {
        this.prev.removeAttribute('disabled');
        this.prev.classList.remove('not-allowed');
        this.toNextCallback();
      }
    });
    this.state.isFirst = true;
  }
  toNext(callback) {
    this.toNextCallback = callback;
  }
  toPrev(callback) {
    this.toPrivCallback = callback;
  }
}

class SaveVerifyModal {
  constructor() { }

  initUi() {
    let list = ['DIV', 'DIV', 'DIV', 'DIV', 'DIV', 'INPUT', 'SPAN', 'DIV', 'DIV', 'DIV'];

    let [wrapper, content, title, statement, inputBox, input, numSign, buttonBox, cancel, save] = createElms(list);
    wrapper.id = 'wc-save-verify-modal';

    content.classList.add('wc-save-verify-content');

    title.innerText = 'Confirm Save?';
    title.classList.add('title');

    statement.innerText = 'The price will take effect immediately after saving, please enter the verification code to confirm saving';
    statement.classList.add('statement');

    inputBox.classList.add('input-box');

    inputBox.appendChild(input);
    inputBox.appendChild(numSign);
    input.setAttribute('placeHolder', 'Verification Number');
    this.input = input;
    numSign.innerText = Math.floor(1000 + Math.random() * 9000);
    this.numSign = numSign;
    buttonBox.classList.add('button-box');

    cancel.innerText = 'Cancel';
    save.innerText = 'Save';

    cancel.classList.add('btn', 'cancel');
    save.classList.add('btn', 'save');
    this.save = save;
    this.cancel = cancel;
    buttonBox.appendChild(cancel);
    buttonBox.appendChild(save);

    content.appendChild(title);
    content.appendChild(statement);

    content.appendChild(inputBox);
    content.appendChild(buttonBox);

    wrapper.appendChild(content);

    return wrapper;
  }

  show() {
    return new Promise((resolve, reject) => {
      let wrapper = document.getElementById('wc-save-verify-modal');
      if (!wrapper) {
        wrapper = this.initUi();
        document.body.appendChild(wrapper);
      } else {
        this.numSign.innerText = Math.floor(1000 + Math.random() * 9000);
        wrapper.style.display = 'flex';
        this.input.value = '';
      }

      this.save.addEventListener('click', () => {
        if (this.numSign.innerText != this.input.value) return;
        wrapper.style.display = 'none';
        resolve(true);
      });
      this.cancel.addEventListener('click', () => {
        wrapper.style.display = 'none';
        resolve(false);
      });
    });
  }
}

var saveVerifyModal = null;
function getVerifyModal() {
  if (!saveVerifyModal) {
    saveVerifyModal = new SaveVerifyModal();
  }
  return saveVerifyModal;
}

class WcToast {
  constructor() { }

  show({
    tips = 'Set successfully !',
    type = 'success', //success or error
    autoClose = false,
  } = {}) {
    let toast = document.getElementById('wc-toast');
    if (!toast) {
      let list = ['DIV', 'DIV', 'SPAN', 'DIV'];
      let [wrapper, content, tipElm, icon] = createElms(list);
      wrapper.id = 'wc-toast';
      toast = wrapper;
      content.classList.add('wc-toast-content');
      icon.classList.add('icon');
      this.icon = icon;
      content.appendChild(icon);

      this.tipElm = tipElm;

      content.appendChild(tipElm);
      wrapper.appendChild(content);

      document.body.appendChild(wrapper);
    } else {
      toast.style.display = 'flex';
    }

    this.tipElm.innerText = tips;
    if (type == 'success') {
      this.icon.classList.add('i-select');
    } else {
      this.icon.classList.add('i-prompt');
    }
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
  }
}
class WcMsgBox {
  constructor() { }

  initUi({ title, msg, isShowCancel, submitText, cancelText } = {}) {
    let msgbox = document.getElementById('wc-msg-box');
    if (!msgbox) {
      let list = ['DIV', 'DIV', 'DIV', 'SPAN', 'SPAN', 'SPAN', 'DIV', 'DIV', 'DIV'];
      let [wrapper, contentBox, topBox, titleText, icon, tipElm, btnBox, cancel, submit] = createElms(list);
      wrapper.id = 'wc-msg-box';
      msgbox = wrapper;
      contentBox.classList.add('wc-toast-content');

      topBox.classList.add('top-box');
      icon.className = 'icon i-tishi1';
      this.icon = icon;
      topBox.appendChild(icon);

      titleText.className = 'title-text';
      this.titleText = titleText;
      topBox.appendChild(titleText);

      contentBox.appendChild(topBox);

      tipElm.className = 'tip-content';

      this.tipElm = tipElm;
      contentBox.appendChild(tipElm);

      btnBox.classList.add('btn-box');

      cancel.className = 'btn cancel';
      submit.className = 'btn submit';

      cancel.innerText = 'Cancel';
      submit.innerText = 'Subnit';

      this.cancel = cancel;
      this.submit = submit;

      btnBox.appendChild(cancel);
      btnBox.appendChild(submit);

      contentBox.appendChild(btnBox);

      wrapper.appendChild(contentBox);

      document.body.appendChild(wrapper);
    } else {
      msgbox.style.display = 'flex';
    }
    this.cancel.innerText = cancelText;
    this.submit.innerText = submitText;

    this.tipElm.innerText = msg;
    this.titleText.innerText = title;
    if (!isShowCancel) {
      this.cancel.style.display = 'none';
    } else {
      this.cancel.style.display = '';
    }
    this.msgbox = msgbox;
  }

  show({ title = 'Tips', msg = 'tips msg', isShowCancel = false, cancelText = 'cancel', submitText = 'submit' } = {}) {
    return new Promise((resolve, reject) => {
      this.initUi({
        title,
        msg,
        isShowCancel,
        cancelText,
        submitText,
      });

      this.cancel.addEventListener('click', (e) => {
        this.msgbox.style.display = 'none';
        resolve(false);
      });

      this.submit.addEventListener('click', (e) => {
        this.msgbox.style.display = 'none';
        resolve(true);
      });
    });
  }
}
class WcMapPlaceAutoComp extends TextAutoComp {
  constructor(elm, sel) {
    super(elm, {
      str: (prediction, selected) => {
        return [prediction.description];
      },
      sel: (prediction) => {
        if (sel) {
          sel(prediction);
        }
      },
    });
    let it = this;
    it.items = [];
    it.filter = false;
    it.moreUp = false;
    it.moreDown = false;

    it.searchResults = [
      {
        search: '',
        result: {
          predictions: {
            predictions: [],
          },
        },
      },
    ];

    it.sessionToken = '';
    it.lastMatchedNumber = 0;
    it.lastPredictedNumber = 0;

    const keyword = it.elm.value.trim();
    if (keyword.length > 0) {
      it.addrAutoCompEval(keyword);
    }

    elmOnChangingPostAdd(it.elm, () => {
      it.addrAutoCompEval(it.elm.value.trim());
    });

    it.elm.addEventListener('focus', () => {
      it.addrAutoCompEval(it.elm.value.trim());
    });
  }

  getMatchCnt(search) {
    let it = this;
    let matchCnt = 0;
    it.matches.forEach((item) => {
      if (it.matchpp(it.fung.str(item), search)) {
        matchCnt++;
      }
    });
    return matchCnt;
  }

  addrAutoCompSetResult(search, result) {
    let it = this;
    let predictions = objValGetByKeys(result, 'predictions.predictions');
    it.sessionToken = objValGetByKeys(result, 'session_token');
    console.log(predictions);
    // console.log('map place auto comp results', predictions, it.sessionToken);
    it.setItems(predictions);
    let newMatchedNumber = it.getMatchCnt(search);
    let newPredictedNumber = it.items.length;
    it.lastMatchedNumber = newMatchedNumber;
    it.lastPredictedNumber = newPredictedNumber;
  }

  getPlaces(searchResult) {
    console.log('----searchResult=---', searchResult);

    let url;
    if (typeof _isCNDomain !== 'undefined' && _isCNDomain && stage === 'prod') {
      url = 'https://sasf669ce6.execute-api.us-east-2.amazonaws.com/prod/maps/places/auto-comp?input_text=' + searchResult.search;
    } else {
      url = api[stage].maps + '/places/auto-comp?input_text=' + searchResult.search;
    }
    // 'https://e3s6es4ybc.execute-api.us-east-2.amazonaws.com/dev/maps',
    // 'https://d3nz1awfgb.execute-api.us-east-2.amazonaws.com/upncoming/maps',
    // 'https://388bivap71.execute-api.us-east-2.amazonaws.com/prod/maps',
    if (this.sessionToken) {
      url = url + '&session_token=' + this.sessionToken;
    }
    url += '&location=' + boundLat + ',' + boundLng;
    url += '&radius=' + boundRadius;
    if (typeof _isCNDomain !== 'undefined' && _isCNDomain) {
      url += '&language=zh';
    }
    return new Promise((resolve) => {
      rest.get(
        'map place auto comp',
        url,
        (res) => {
          console.log(res);
          resolve(res.predictions && res.predictions.predictions ? res.predictions.predictions : [])
        },
        () => resolve([])
      );
    });
  }

  getAirports(searchResult) {
    const url = `${api[stage].airports}?code=${searchResult.search}`;
    return new Promise((resolve) => {
      rest.get(
        'map airport auto comp',
        url,
        (res) => {
          if (res.airports) {
            resolve(
              res.airports.map((item) => ({
                description: `${item.name} (${item.code}), ${item.town}, ${item.region}, ${item.country}`,
                place_id: item.google_place_id,
              }))
            );
          } else {
            resolve([]);
          }
        },
        () => resolve([])
      );
    });
  }

  addrAutoCompCall(searchResult) {
    const reg = /^(-?\d{1,2}\.\d+?),\s*(-?1[0-7]\d\.\d+)$/; // Calibrate latitude and longitude
    const reg1 = /^[-+]?\d+(\.\d*)?([,\s]+[-+]?\d+(\.\d*)?)*,?$/; // Calibrate positive and negative numbers
    if (reg.test(searchResult.search) || reg1.test(searchResult.search)) return;

    if (/^[A-Z]{3}$/.test(searchResult.search)) {
      Promise.all([this.getAirports(searchResult), this.getPlaces(searchResult)]).then(([data1, data2]) => {
        const placeIds = data2.map((item) => item.place_id);
        const data = data1.filter((item) => !placeIds.includes(item.place_id));
        const result = {
          predictions: { predictions: data.concat(data2) },
        };
        searchResult.result = result;
        this.addrAutoCompSetResult(searchResult.search, result);
      });
    } else {
      this.getPlaces(searchResult).then((data) => {
        const result = { predictions: { predictions: data } };
        searchResult.result = result;
        this.addrAutoCompSetResult(searchResult.search, result);
      });
    }
  }

  addrAutoCompEval(search) {
    let it = this;
    let found = false;
    it.searchResults.forEach((searchResult) => {
      if (searchResult.search == search) {
        found = true;
        if (!searchResult.result) {
          // do nothing, it'll come back
        } else {
          // have the result, use it, do not call server again
          it.addrAutoCompSetResult(searchResult.search, searchResult.result);
        }
      }
    });
    if (found) {
      return;
    }

    let newMatchedNumber = it.getMatchCnt(search);

    let newPredictedNumber = it.items.length;

    if (it.lastMatchedNumber > 0 && it.lastPredictedNumber > 0 && it.lastPredictedNumber == newPredictedNumber && it.lastMatchedNumber == newMatchedNumber) {
      return;
    }

    let searchResult = {
      search: search,
      result: '', // no result, different from []
    };
    it.searchResults.push(searchResult);
    it.addrAutoCompCall(searchResult);
  }
}
class addrTextAutoComp extends TextAutoComp {
  constructor(elm, callback) {
    super(elm, {
      str: (item) => {
        return [item.description];
      },
      sel: async (item) => {
        if (item) {
          this.isChange = false
          let { place_id } = item
          await this.getDetailByPlaceId(place_id)
        } else if (this.isChange) {
          this.isChange = false
          elm.value = ''
          callback({})
        }
      },
    });
    this.filter = false
    this.lat = undefined
    this.lng = undefined
    this.callback = callback
    this.isChange = false

    elm.addEventListener('input', svcUtils.debounce(this.inputHandler.bind(this), 500))


    elm.onfocus = async () => {
      if (!elm.value) {
        this.setItems([])
      } else {
        let list = await this.getAddrList(elm.value)
        this.setItems(list)
      }
    }
  
    this.elm = elm
  }
  async inputHandler() {
    this.isChange = true
    let val = this.elm.value
    let list = await this.getAddrList(val)
    this.setItems(list)
  }
  async getAddrList(keywords) {
    if (!keywords) {
      return []
    }
    let list = _d.predictionsCache[keywords]
    if (list) {
      return list
    }

    let { boundLat, boundLng, sessionToken, boundRadius } = _d.originLatLng
    let url = `${api[stage].maps}/places/auto-comp`

    let d = {
      input_text:keywords,
      location:`${boundLat},${boundLng}`,
      radius:boundRadius
    }
    if (sessionToken) {
      d['session_token'] = sessionToken
    }

    let res = await svcUtils.fetchData({ url,data:d, isShowLoading: false })

    let { session_token } = res
    _d.originLatLng.sessionToken = session_token
    list = res.predictions.predictions

    _d.predictionsCache[keywords] = list
    return list
  }

  
  async getDetailByPlaceId(id) {
    // let url = `${api[stage].maps}/places/id?google_place_id=${id}`
    let url = `${api[stage].maps}/places/id`
    let { place_detail } = await svcUtils.fetchData({ url,data:{google_place_id:id}, isShowLoading: false })
    let { status } = place_detail
    console.log(place_detail);
    if (status == 'OK') {
      let { result: { formatted_address, name: localName, geometry: { location } } } = place_detail

      let val = `${localName} ${formatted_address}`
      if (formatted_address.startsWith(localName)) {
        val = formatted_address
      }
      this.elm.value = val

      let { lat, lng } = location
      this.lat = typeof lat === 'number' ? lat : lat()
      this.lng = typeof lng === 'number' ? lng : lng()
      if (this.callback){
        this.callback({ lat: this.lat, lng: this.lng })
      } 

      _d.originLatLng.boundLat = this.lat
      _d.originLatLng.boundLng = this.lng
    }

  }
}
class WcAddAnother {
  constructor(name, rootElm, fung) {
    this.name = name;
    this.elm0 = elmOfIdRel(idOfIndex(name, 0), rootElm);
    this.parentElm = this.elm0.parentElement;
    this.add = elmOfIdRel(name + '-add', rootElm);
    this.fung = fung;

    let it = this;
    if (it.add) {
      it.add.onclick = function () {
        it.addAnother();
      };
    }
  }

  removeSetup(i, elm) {
    let it = this;
    let remove = elmOfIdRel(it.name + '-remove', elm);
    if (remove) {
      remove.onclick = function () {
        let idxToRemove = indexOfId(elm.id);
        cloneRemove(elm.id, it.parentElm);
        if (it.fung && it.fung.fill) {
          it.fung.fill(idxToRemove, elm, undefined, dataOfElm(elm).obj);
        }
        // cloneRemove(elm.id, it.parentElm);
        let focusIndex = idxToRemove - 1;
        if (focusIndex == -1) {
          focusIndex = 0;
        }
        it.focusIndexChanged(focusIndex, idxToRemove);
      };
    }
  }
  addAnother(data) {
    let it = this;
    let focusIndex = 0;
    cloneAppend(it.name, it.parentElm, (i, elm) => {
      focusIndex = i;
      it.removeSetup(i, elm);
      if (it.fung && it.fung.prep) {
        (dataOfElm(elm).obj = it.fung.prep(i, elm)), dataOfElm(elm).obj;
      }
      if (it.fung && it.fung.fill) {
        it.fung.fill(i, elm, data, dataOfElm(elm).obj);
      }
    });

    it.focusIndexChanged(focusIndex);
  }

  fill(list) {
    let it = this;

    if (!list || list.length < 1) {
      it.fill([undefined]);

      return;
    }

    cloneResetAndAppend(it.name, it.parentElm, list.length, (i, elm) => {
      it.removeSetup(i, elm);
      if (it.fung && it.fung.prep) {
        dataOfElm(elm).obj = it.fung.prep(i, elm, dataOfElm(elm).obj);
      }
      if (it.fung && it.fung.fill) {
        it.fung.fill(i, elm, list[i], dataOfElm(elm).obj);
      }
    });

    it.focusIndexChanged(0);
  }

  pour() {
    let it = this;

    let list = [];
    getElmsRelativeByName(it.name, it.parentElm, (elm) => {
      if (it.fung && it.fung.pour) {
        let data = it.fung.pour(indexOfElm(elm), elm, dataOfElm(elm).obj);
        if (data) {
          list.push(data);
        }
      }
    });

    return list;
  }

  objs() {
    let it = this;
    let list = [];
    getElmsRelativeByName(it.name, it.parentElm, (elm) => {
      if (dataOfElm(elm).obj) {
        list.push(dataOfElm(elm).obj);
      }
    });
    return list;
  }

  focusIndexChanged(focusIndex, type) {
    let it = this;
    if (it.fung && it.fung.focusIndexChanged) {
      it.fung.focusIndexChanged(focusIndex, type);
    }
  }
}

let _wcd = {
  _wcToast: null,
  _wcMsgBox: null,
  _basicMsgBox: null,
};

function createElms(elmNameList) {
  let list = [];
  for (let name of elmNameList) {
    list.push(document.createElement(name));
  }
  return list;
}

Object.assign(svcUtils, {
  fileToBlob: (file) => {
    return new Promise((resolve, reject) => {
      const type = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        const blob = new Blob([e.target.result], { type });
        resolve(blob);
      };
      reader.onerror = (e) => {
        reject(new Error('read file error !'));
      };
      reader.readAsDataURL(file);
    });
  },
  fileToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      // reader.onloadend = () => {
      //   resolve(fileResult);
      // };

      reader.readAsDataURL(file);
    });
  },
  toast: ({ tips = 'Set successfully !', type = 'success' } = {}) => {
    if (!_wcd._wcToast) {
      _wcd._wcToast = new WcToast();
    }

    return _wcd._wcToast.show({ tips, type });
  },
  msgBox: ({ title = 'Tips', msg = 'msg', isShowCancel = false, cancelText = 'cancel', submitText = 'ok' } = {}) => {
    if (!_wcd._wcMsgBox) {
      _wcd._wcMsgBox = new WcMsgBox();
    }
    return _wcd._wcMsgBox.show({ title, msg, isShowCancel, submitText, cancelText });
  },
  base64Upload: (base64URL, url, fileName = 'file_name') => {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('base64', base64URL);
      formData.append('file_name', fileName);
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };

      xhr.onerror = function (e) {
        reject(e);
      };

      // xhr.upload.addEventListener("progress",  (event)=> {
      //   if (event.lengthComputable) {
      //     // progress.style.width = Math.ceil(event.loaded * 100 / event.total) + "%";
      //   }
      // }, false);

      xhr.open('POST', url);
      xhr.overrideMimeType('application/octet-stream; charset=x-user-defined-binary');
      xhr.send(formData);
    });
  },
  compressImgToBlob: (file, QUALITY = 0.1, MIME_TYPE = 'image/jpeg') => {
    return new Promise((resolve, reject) => {
      // const MIME_TYPE = 'image/jpeg';
      // const QUALITY = 0.1;
      // const file = ev.target.files[0]; // get the file
      const blobURL = URL.createObjectURL(file);
      const imgElm = new Image();

      imgElm.src = blobURL;
      imgElm.onerror = function () {
        URL.revokeObjectURL(this.src);
        reject('onerror');
      };
      imgElm.onload = function () {
        URL.revokeObjectURL(this.src);
        const canvas = document.createElement('canvas');
        canvas.width = imgElm.naturalWidth;
        canvas.height = imgElm.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgElm.naturalWidth, imgElm.naturalHeight);
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          MIME_TYPE,
          QUALITY
        );
      };
    });
  },
  get: (url, d = {}, desc = 'get data', isShowErroeTips = true) => {
    let str = '';
    for (let [key, value] of Object.entries(d)) {
      str += `&${key}=${value}`;
    }
    if (str) {
      url += `?${str.substring(1)}`;
    }
    getLoading().show('Working on it');
    return new Promise((resolve, reject) => {
      rest.get(
        desc,
        url,
        (res) => {
          getLoading().hidden();
          resolve({ code: 0, res });
        },
        (error) => {
          getLoading().hidden();
          if (isShowErroeTips) {
            svcUtils.msgBox({ msg: error.responseJSON?.errMsg || 'error' });
          }
          resolve({ code: -1, error });
        }
      );
    });
  },
  fetchData: async ({
    url = '',
    data = {},
    method = 'GET',
    isShowLoading = true
  } = {}) => {
    method = method.toUpperCase();
    data['req_id'] = uuid()

    if (method == 'GET') {
      let dataStr = '';
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    }
    let requestConfig = {
      // credentials: 'same-origin',
      method,
      headers: {
        'Accept': 'application/json',
        // 'Content-method': 'application/json'
      },
      // mode: "cors", // same-origin，no-cors（default） cores;
      // cache: "force-cache" // default 、 no-store 、 reload 、 no-cache 、 force-cache 、 only-if-cached 
    }

    if (method == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      isShowLoading && getLoading().show('Working on it');
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      isShowLoading && getLoading().hidden();

      return responseJson
    } catch (error) {

      isShowLoading && getLoading().hidden();
      throw new Error(error)
    }
  },
  debounce: (fn, delay = 1000) => {
    let time = null;
    return function () {
      if (time !== null) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        fn.call(this, arguments);
      }, delay);
    };
  },
  post(url, data = {}, purpose = '', queryParams = null) {

    let queryStr = '';
    if (queryParams) {
      for (let [key, value] of Object.entries(queryParams)) {
        queryStr += `&${key}=${value}`;
      }
    }
    url += `?ses=${_d.ses}${queryStr}`;

    getLoading().show('Working on it');
    return new Promise((resolve, reject) => {
      rest.post(
        purpose,
        url,
        data,
        (res) => {
          getLoading().hidden();
          resolve({ code: 0, res });
        },
        (error) => {
          getLoading().hidden();
          document.querySelector('.calc-loading')?.classList.add('hide');
          svcUtils.msgBox({ msg: error.responseJSON?.errMsg || 'error' });
          resolve({ code: -1, error });
        }
      );
    });
  },
  put(url, data = {}, purpose = '', queryParams = null) {
    let queryStr = '';
    if (queryParams) {
      for (let [key, value] of Object.entries(queryParams)) {
        queryStr += `&${key}=${value}`;
      }
    }
    url += `?ses=${_d.ses}${queryStr}`;
    return new Promise((resolve, reject) => {
      rest.put(
        purpose,
        url,
        data,
        (res) => {
          resolve({ code: 0, res });
        },
        (error) => {
          document.querySelector('.calc-loading')?.classList.add('hide');
          // this.toast({ tips: error.responseJSON?.errMsg || 'error', type: 'error' })
          this.msgBox({ msg: error.responseJSON?.errMsg || 'error' });
          resolve({ code: -1, error });
        }
      );
    });
  },
  basicMsgBox: ({ title = 'Tips', content, isShowCancel = false, cancelText = 'cancel', submitText = 'ok' } = {}, callback) => {
    if (!_wcd._basicMsgBox) {
      _wcd._basicMsgBox = new BasicMsgBox();
    }
    return _wcd._basicMsgBox.show({ title, content, isShowCancel, submitText, cancelText }, callback);
  },
});

function uuid() {
  function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

// dropdown
class MultiLevelDropdown {
  constructor(containerId, type, currentId, optionsData, style, functions) {
    // console.log(containerId, type, currentId, optionsData, functions);
    this.functions = functions;
    this.container = document.getElementById(containerId);
    let childElement = this.container.querySelector('#dropdown-menu');
    this.type = type;
    this.currentId = currentId;
    this.style = style;

    if (childElement) {
      this.container.removeChild(childElement);
    }
    this.dropdownMenu = null;
    this.dropdownLevels = [];
    this.optionsData = optionsData;

    if (!optionsData) return;
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.dropdownMenu = document.createElement('div');
    this.dropdownMenu.id = 'svc-dropdown-menu';
    this.dropdownMenu.className = 'hide';
    this.dropdownMenu.style = this.style;
    if (this.type === 'single') {
      this.dropdownMenu.classList.add('single');
    }
    this.container.appendChild(this.dropdownMenu);

    const rootLevel = this.createLevel(this.optionsData, this.currentId);
    this.applyBoldFont(this.currentId);
    this.dropdownLevels.push(rootLevel);
    this.dropdownMenu.appendChild(rootLevel);
  }

  createLevel(options, currentId) {
    const level = document.createElement('ul');
    level.className = 'svc-dropdown-level';

    for (let i = 0; i < options.length; i++) {
      const optionElement = document.createElement('li');
      optionElement.className = 'svc-dropdown-item';
      // console.log(currentId, options[i].id)
      if (currentId == options[i].id) {
        optionElement.classList.add('active');
      }

      optionElement.textContent = options[i].name;
      optionElement.id = options[i].id;

      if (options[i].children) {
        optionElement.classList.add('svc-dropdown-submenu');
        const spanEle = document.createElement('span');
        spanEle.className = 'icon i-arrow-right';
        optionElement.appendChild(spanEle);
        optionElement.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        optionElement.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      }

      optionElement.addEventListener('click', this.handleOptionClick.bind(this)); // add event listener
      level.appendChild(optionElement);

      if (options[i].children) {
        const childLevel = this.createLevel(options[i].children, currentId);
        optionElement.appendChild(childLevel);
      }
    }
    return level;
  }

  attachEventListeners() {
    // this.dropdownButton.addEventListener('click', this.handleButtonClick.bind(this));
    document.addEventListener('click', this.hide.bind(this));
  }

  show(event) {
    event && event.stopPropagation();
    this.dropdownMenu.classList.remove('hide');
  }

  hide() {
    this.dropdownMenu.classList.add('hide');
  }

  handleMouseEnter(event) {
    const submenu = event.currentTarget.querySelector('.svc-dropdown-level');
    submenu.classList.add('svc-dropdown-level-active');
  }

  handleMouseLeave(event) {
    const submenus = this.container.querySelectorAll('.svc-dropdown-level');
    submenus.forEach((submenu) => {
      submenu.classList.remove('svc-dropdown-level-active');
    });
  }

  setOptionsData(newOptionsData, currentId) {
    this.optionsData = newOptionsData;
    this.resetDropdownMenu(currentId);
  }

  resetDropdownMenu(currentId) {
    while (this.dropdownMenu.firstChild) {
      this.dropdownMenu.firstChild.remove();
    }
    const rootLevel = this.createLevel(this.optionsData, currentId);
    this.dropdownLevels = [rootLevel];
    this.dropdownMenu.appendChild(rootLevel);
  }

  handleOptionClick(event) {
    event && event.stopPropagation();
    this.hide();
    let selectedLabel = event.currentTarget.textContent;
    // console.log(selectedLabel, event.currentTarget.id)
    this.applyBoldFont(event.currentTarget.id);
    const hasChildren = event.currentTarget.classList.contains('svc-dropdown-submenu');
    if (hasChildren) {
      selectedLabel = event.currentTarget.firstChild.nodeValue;
    }
    if (this.functions && this.functions.handleOptionClick) {
      this.functions.handleOptionClick({
        id: event.currentTarget.id,
        value: selectedLabel,
        label: this.type === 'multi' ? `${event.currentTarget.parentElement.parentElement.firstChild.nodeValue} -${selectedLabel} ` : null,
      });
    }
  }


  applyBoldFont(id) {
    const allItems = this.container.querySelectorAll('.svc-dropdown-item');
    Array.from(allItems).forEach((option) => {
      if (option.id === id) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
}

class BasicMsgBox {
  initUi({ title, content, isShowCancel, submitText, cancelText } = {}) {
    let msgbox = document.getElementById('basic-msg-box');
    if (!msgbox) {
      let list = ['DIV', 'DIV', 'DIV', 'SPAN', 'SPAN', 'SPAN', 'DIV', 'DIV', 'DIV'];
      let [wrapper, contentBox, topBox, titleText, icon, tipElm, btnBox, cancel, submit] = createElms(list);
      wrapper.id = 'basic-msg-box';
      msgbox = wrapper;
      contentBox.classList.add('wc-toast-content');

      topBox.classList.add('top-box');
      icon.className = 'icon i-tishi1';
      this.icon = icon;
      topBox.appendChild(icon);

      titleText.className = 'title-text';
      this.titleText = titleText;
      topBox.appendChild(titleText);

      contentBox.appendChild(topBox);

      tipElm.className = 'tip-content';

      this.tipElm = tipElm;
      contentBox.appendChild(tipElm);

      btnBox.classList.add('btn-box');

      cancel.className = 'btn cancel';
      submit.className = 'btn submit';

      cancel.innerText = 'Cancel';
      submit.innerText = 'Subnit';

      this.cancel = cancel;
      this.submit = submit;

      btnBox.appendChild(cancel);
      btnBox.appendChild(submit);

      contentBox.appendChild(btnBox);

      wrapper.appendChild(contentBox);

      document.body.appendChild(wrapper);
    } else {
      msgbox.style.display = 'flex';
    }
    this.cancel.innerText = cancelText;
    this.submit.innerText = submitText;

    this.tipElm.innerText = '';
    this.tipElm.appendChild(stringToHTML(content));

    this.titleText.innerText = title;
    if (!isShowCancel) {
      this.cancel.style.display = 'none';
    } else {
      this.cancel.style.display = '';
    }
    this.msgbox = msgbox;
  }

  show({ title = 'Tips', content, isShowCancel = false, cancelText = 'cancel', submitText = 'submit' } = {}, callback) {
    return new Promise((resolve, reject) => {
      this.initUi({
        title,
        content,
        isShowCancel,
        cancelText,
        submitText,
      });

      this.cancel.onclick = () => {
        this.msgbox.style.display = 'none';
        resolve(false);
      };

      this.submit.onclick = () => {
        if (typeof callback === 'function') {
          const callbackResult = callback();
          if (callbackResult !== false) {
            this.msgbox.style.display = 'none';
            resolve(true);
          }
        } else {
          this.msgbox.style.display = 'none';
          resolve(true);
        }
      };
    });
  }
}

function stringToHTML(str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}

