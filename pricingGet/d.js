

function dataOfElm(elm) {
    if (elm.data == undefined) elm.data = {};

    return elm.data;
}

class TextAutoComp {
    constructor(elm, fung, sql) {
        this.elm = elm;
        this.elm.setAttribute('autocomplete', 'off');
        // this.elm.style.position = 'absolute';
        this.dropdowns = elmOfIdClosest(this.elm.id + '-dropdowns', elm);
        if (!this.dropdowns) {
            this.dropdowns = this.createDropdownItem();
            let parentNode = this.elm.parentNode;
            let nextSibling = this.elm.nextElementSibling;
            if (nextSibling) {
                parentNode.insertBefore(this.dropdowns, nextSibling);
            } else {
                parentNode.appendChild(this.dropdowns);
            }
        }
        this.dropdowns.style.position = 'absolute';
        this.down = elmOfIdClosest(this.elm.id + '-down', elm);

        // for multiple check dropdown
        this.item0 = elmOfIdRel('item-0', this.dropdowns);
        this.checkBox0 = getElmsRelativeByName('checkbox', this.item0)[0];
        this.checkedItems = [];

        if (!this.dropdowns.style.backgroundColor) {
            if (this.elm.style.backgroundColor) {
                this.dropdowns.style.backgroundColor = this.elm.style.backgroundColor;
            } else {
                this.dropdowns.style.backgroundColor = '#ffffff';
            }
        }
        this.fung = fung;
        this.itemCnt = 7;
        this.matches = [];
        this.filter = true;
        if (this.checkBox0) this.filter = false;
        this.moreUp = true;
        this.moreDown = true;

        let it = this;
        elmOnChangingPostAdd(it.elm, () => {
            it.item = '';
            it.comp();
        });

        it.elm.onfocus = function (e) {
            if (!it.disabled) it.comp();
        };

        if (it.down) {
            it.down.onclick = function () {
                // it.comp();
                it.elm.focus();
            };
        }

        it.elm.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (it.dropdowns.style.cssText.indexOf('display: none') == -1) {
                    it.sel(0);
                    it.dropdowns.style.display = 'none';
                }
            }
        });

        it.elm.onblur = function () {
            // if (it.matches.length == 1) {
            //     it.sel(0);
            //     return;
            // }
            if (fung.matchExact) {
                for (let i = 0; i < it.matches.length; i++) {
                    if (fung.matchExact(it.matches[i], it.elm.value)) {
                        it.sel(i);
                        break;
                    }
                }
            }

            if (it.fung.onblur) {
                it.fung.onblur(it.matches, it.elm.value);
            }
            // it.dropdowns.style.display = 'none';
            if (!it.item) {
                // click outside the dropdown
                if (objValGetByKeys(it, 'fung.sel')) {
                    it.fung.sel(it.item);
                }
                changeDisplay(it.dropdowns, 'none');
            } else {
                // click inside the dropdown
                // console.log('clicking item is: ', it.item);
                if (!it.checkBox0) changeDisplay(it.dropdowns, 'none');
                else it.elm.focus();
            }

            // it.elm.dispatchEvent(new CustomEvent('change'));
        };

        it.dropdowns.onwheel = function (event) {
            if (event.deltaY > 0) {
                it.move(-1);
            } else if (event.deltaY < 0) {
                it.move(1);
            }
            event.preventDefault();
        };
        it.dropdowns.addEventListener('touchstart', (event) => {
            it.lastY = event.targetTouches[0].pageY;
        });
        it.dropdowns.addEventListener('touchmove', (event) => {
            if (it.height == 0) {
                let item0 = elmOfIdRel('item-0', it.dropdowns);
                it.height = item0.getBoundingClientRect().height;
            }
            let delta = it.lastY - event.targetTouches[0].pageY;
            if (delta > 0) {
                delta += (it.height + 1) / 2;
            } else if (delta < 0) {
                delta -= (it.height + 1) / 2;
            }
            delta = Math.trunc(delta / it.height);
            if (delta != 0) {
                it.lastY = event.targetTouches[0].pageY;
            }
            it.move(delta);

            event.preventDefault();
        });
    }

    createDropdownItem() {

        let strHtml = `<div class="dropdown"   style="color: #333; border: 1px solid #ccc; font-size: 14px; z-index:10;  display:none; left:0;">
    <table class="table table-striped table-hover table-sm" style="margin: 0; overflow: hidden; table-layout: fixed">
      <tbody>
        <tr id="item-0" name="item" style="width: 100%; margin-top: -10px; background-color: #fff; overflow: hidden; border-bottom: 1px solid #eee; position: relative">
          <td id="lbl-0" name="lbl" style="width: 100%; border: none; padding-left: 10px; white-space: nowrap; border-spacing: 0 10px 0 0"></td>
          <td id="lbl-1" name="lbl" style="width: 100%; border: none; white-space: nowrap; overflow: hidden; border-spacing: 0 10px 0 0"></td>
        </tr>
      </tbody>
    </table>
  </div>`;

        let parser = new DOMParser();
        let DOM = parser.parseFromString(strHtml, 'text/html').querySelector('.dropdown');
        return DOM;
    }

    sel(i, hovElm, event) {
        let it = this;
        if (it.dropdowns.style.display == 'none') {
            return;
        }
        if (i < it.matches.length) {
            // it.elm.value = it.fung.str(it.matches[i], true);
            it.item = it.matches[i];
            if (it.checkBox0) {
                let selElm = elmOfIdRel('item-' + i, it.dropdowns);
                let selCheckBox = elmOfNameRel('checkbox', selElm);

                selCheckBox.checked = !selCheckBox.checked;
                if (selCheckBox.checked) it.checkedItems.push(it.item);
                else it.checkedItems.splice(it.checkedItems.indexOf(it.item), 1);

            }

            let selThing = it.checkedItems.length > 0 ? it.checkedItems : it.item;
            it.elm.value = it.fung.str(it.item, true, selThing, true);
            if (objValGetByKeys(it, 'fung.sel')) {
                if (Array.isArray(selThing)) {
                    it.fung.sel(selThing, hovElm);
                } else {
                    it.fung.sel(it.item, hovElm);
                }
            }
        }
        // it.dropdowns.style.display = 'none';
        if (event) {
            event.stopPropagation();
        }
    }

    match(str, wordsStr) {
        let words = wordsStr.split(' ');
        let markers = [];
        for (var i = 0; i < str.length; i++) {
            markers[i] = false;
        }
        let strU = str.toString().toUpperCase();
        // let found = true;
        let found = false;
        for (var word of words) {
            if (word) {
                let index = strU.indexOf(word.toUpperCase());
                if (index != -1) {
                    found = true;
                    while (index != -1) {
                        for (var i = index; i < index + word.length; i++) {
                            markers[i] = true;
                        }
                        index = strU.indexOf(word.toUpperCase(), index + 1);
                    }
                }
                /*else {
                                         found = false;
                                         break;
                                     }*/
            }
        }
        if (found) {
            let matchedSegs = [];
            var low = -1;
            var up = markers.length;
            for (var i = 0; i <= markers.length; i++) {
                if (i < markers.length && markers[i]) {
                    if (low == -1) {
                        low = i;
                        up = low + 1;
                    } else {
                        up = i + 1;
                    }
                } else {
                    if (low == -1) {
                    } else {
                        matchedSegs.push({
                            low: low,
                            up: up,
                        });
                        low = -1;
                    }
                }
            }
            return matchedSegs;
        }
        return [];
    }

    matchpp(strs, wordsStr) {
        let words = wordsStr.split(' ');
        for (let i = 0; i < words.length; i++) {
            let word = words[i].toUpperCase();
            let found = false;
            for (let j = 0; j < strs.length; j++) {
                if (!strs[j]) {
                    continue;
                }
                if (strs[j].length > 0 && strs[j][0] == '<') {
                    // inner html is an element, not a string
                    continue;
                }
                let str = strs[j].toString().toUpperCase();
                if (str.indexOf(word) >= 0) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }

    innerHtml(item, val) {
        let it = this;
        let strs = it.fung.str(item);
        let innerHTMLs = [];
        if (val) {
            strs.forEach((str) => {
                let innerHTML = str;
                let matchedSegs = [];
                if (str.length > 0 && str[0] != '<') {
                    if (it.fung.match) {
                        matchedSegs = it.fung.match(item, val);
                    } else {
                        matchedSegs = it.match(str, val);
                    }
                }
                if (matchedSegs.length > 0) {
                    innerHTML = str.substring(0, matchedSegs[0].low);
                    for (var j = 0; j < matchedSegs.length; j++) {
                        innerHTML += '<strong>' + str.substring(matchedSegs[j].low, matchedSegs[j].up) + '</strong>';
                        if (j < matchedSegs.length - 1) {
                            innerHTML += str.substring(matchedSegs[j].up, matchedSegs[j + 1].low);
                        } else {
                            innerHTML += str.substring(matchedSegs[j].up, str.length);
                        }
                    }
                }

                innerHTMLs.push(innerHTML);
            });
        } else {
            innerHTMLs = strs;
        }

        return innerHTMLs;
    }

    paintRow(i, itemElm, innerHtmls) {
        let it = this;
        let nDisplay = Math.min(it.matches.length, it.itemCnt);
        itemElm.classList.remove('active');
        for (let j = 0; j < innerHtmls.length; j++) {
            let cellElm = elmOfIdRel(idOfIndex('lbl', j), itemElm);
            if (i == 0) {
                if (!it.moreUp || it.offset == 0) {
                    cellElm.innerHTML = innerHtmls[j];
                    if (j == 0) {
                        itemElm.classList.remove('more-up');
                    }
                } else {
                    if (j == 0) {
                        itemElm.classList.add('more-up');
                        cellElm.innerHTML = '<div class="up-arrow"></div>';
                    } else {
                        cellElm.innerHTML = '';
                    }
                }
            } else if (i < nDisplay - 1) {
                cellElm.innerHTML = innerHtmls[j];
                itemElm.classList.remove('more-up');
            } else {
                // i == nDisplay - 1
                itemElm.classList.remove('more-up');
                if (!it.moreDown || i + it.offset == it.matches.length - 1) {
                    cellElm.innerHTML = innerHtmls[j];
                    if (j == 0) {
                        itemElm.classList.remove('more-down');
                    }
                } else {
                    if (j == 0) {
                        itemElm.classList.add('more-down');
                        cellElm.innerHTML = '<div class="down-arrow"></div>';
                    } else {
                        cellElm.innerHTML = '';
                    }
                }
            }
        }
    }

    move(delta) {
        let it = this;
        if (it.offset + delta < 0 || it.offset + delta + it.itemCnt > it.matches.length) {
            return;
        }
        it.offset += delta;
        let val = it.elm.value;
        let nDisplay = Math.min(it.matches.length, it.itemCnt);
        for (let i = 0; i < nDisplay; i++) {
            let itemElm = elmOfIdRel(idOfIndex('item', i), it.dropdowns);
            let innerHtmls = it.innerHtml(it.matches[i + it.offset], val);
            this.paintRow(i, itemElm, innerHtmls);
        }
    }
    comp() {
        let it = this;
        it.item = undefined;

        if (!it.items) {
            return;
        }

        if (it.checkBox0 && dataOfElm(it.dropdowns).inited) {
            changeDisplay(it.dropdowns, '');
            return;
        }

        it.matches = [];
        let val = it.elm.value;
        let firstMatch = -1;
        if (val) {
            if (it.items) {
                for (let i = 0; i < it.items.length; i++) {
                    if (it.matchpp(it.fung.str(it.items[i]), val)) {
                        if (firstMatch == -1) {
                            firstMatch = it.matches.length;
                        }
                        it.matches.push(it.items[i]);
                    } else if (!it.filter) {
                        it.matches.push(it.items[i]);
                    }
                }
            }
        } else {
            if (it.items) {
                it.items.forEach((item) => {
                    it.matches.push(item);
                });
            }
        }

        if (it.fung.matched) {
            it.fung.matched(it.matches, firstMatch);
        }

        if (it.matches.length == 0) {
            it.dropdowns.style.display = 'none';

            return;
        }

        it.offset = 0;
        if (firstMatch != -1) {
            let nFirsMatchToLastInc = it.matches.length - firstMatch;
            if (it.matches.length > it.itemCnt) {
                if (nFirsMatchToLastInc < it.itemCnt) {
                    it.offset = it.matches.length - it.itemCnt;
                } else {
                    it.offset = firstMatch;
                    if (it.offset > 0) {
                        if (it.moreUp) {
                            it.offset--;
                        }
                    }
                }
            }
        }
        it.height = 0; // the height an item in the dropdown
        cloneResetAndAppendWithSubNames('item', it.dropdowns, Math.min(it.matches.length, it.itemCnt), ['item'], [], (i, itemElm) => {
            let innerHtmls = [];
            if (i + it.offset < it.matches.length) {
                innerHtmls = it.innerHtml(it.matches[i + it.offset], val);
            }
            it.paintRow(i, itemElm, innerHtmls);

            if (it.height == 0) {
                it.height = itemElm.getBoundingClientRect().height;
            }


            itemElm.onmousedown = function (event) {
                if (event.button == 0) {
                    if (it.moreUp && i == 0 && it.offset > 0) {
                        // must be the ...
                        it.move(-1);
                        event.preventDefault();
                        return;
                    }
                    if (it.moreDown && i == it.itemCnt - 1 && i + it.offset < it.matches.length - 1) {
                        it.move(1);
                        event.preventDefault();
                        return;
                    }
                    it.sel(i + it.offset, event.target, event);
                }
            };

            itemElm.onmouseout = function () {
                itemElm.classList.remove('active');
            };

            itemElm.onmouseover = function () {
                itemElm.classList.add('active');
            };
        });

        it.dropdowns.style.display = '';
        dataOfElm(it.dropdowns).inited = true;
    }

    setItems(items) {
        this.items = items;
        this.item = undefined;
        if (document.activeElement == this.elm) {
            this.comp();
        }
        if (this.checkBox0) this.checkBox0.checked = false;
        dataOfElm(this.dropdowns).inited = false;
    }

    get() {
        if (!this.checkBox0) return this.item;
        else return this.checkedItems;
    }

    set(item, keepQuiet) {
        let it = this;
        it.item = item;
        it.keepQuiet = keepQuiet;
        if (item || item === 0) {
            if (objValGetByKeys(it, 'fung.str')) {
                this.elm.value = it.fung.str(it.item, true, item);
            } else {
                this.elm.value = JSON.stringify(it.item);
            }
        } else {
            this.elm.value = '';
        }

        if (objValGetByKeys(it, 'fung.sel') && !it.keepQuiet) {
            it.fung.sel(it.item);
        }
    }

    disable() {
        this.disabled = true;
    }

    enable() {
        this.disabled = false;
    }

    reset() {
        let it = this;
        it.elm.value = '';
        it.item = null;
        it.checkedItems = [];
        it.items = [];
        it.matches = [];
    }
    clear() {
        this.elm.value = '';
        this.item = null;
        this.checkedItems = [];
    }
}

function elmOfIdClosest(id, elm) {
    if (!elm) {
        return undefined;
    }

    let elmOfId = elmOfIdRel(id, elm);
    if (elmOfId) {
        return elmOfId;
    }

    return elmOfIdClosest(id, elm.parentElement);
}

function elmOfIdRel(id, elm) {
    return getElmsRelativeByXPath('.//*[@id="' + id + '"]', elm)[0];
}

function getElmsRelativeByXPath(xpath, elm, checkFun) {
    var xPathRes = document.evaluate(xpath, elm, null, XPathResult.ANY_TYPE, null);

    var nodes = []; // iterating xPathRes wont work if you change the elm while iterating
    while ((node = xPathRes.iterateNext()) != null) if (!checkFun || checkFun(node)) nodes.push(node);

    return nodes;
}

function getElmsRelativeByName(name, elm, checkFun) {
    // return getElmsRelativeByXPath('*/input[@name="' + name + '"]', elm);
    // return getElmsRelativeByXPath('*/' + tag + '[@name="' + name + '"]', elm);
    return getElmsRelativeByXPath('.//*[@name="' + name + '"]', elm, checkFun);
}

function elmOnChangingPostAdd(elm, fun) {
    if (!elm.oninput)
        // add a dummy one to fire changing post
        elmOnChanging(elm);

    funOfElmAdd(elm, 'changing', fun);
}

function elmOnChanging(elm) {
    elm.oninput = function () {
        elmChangingPost(this);
    };
}

function funOfElmAdd(elm, key, fun) {
    if (!funOfElm(elm)[key]) {
        funOfElm(elm)[key] = [];
    }
    funOfElm(elm)[key].push(fun);
}

function funOfElm(elm) {
    if (elm.fun == undefined) elm.fun = {};

    return elm.fun;
}

function elmChangingPost(elm, now) {
    /*for(fun of funOfElm(elm).changingPost)
        fun(elm);*/
    funOfElmFire(elm, 'changing', now);
}

function funOfElmFire(elm, key, now) {
    if (funOfElm(elm)[key]) {
        if (now) {
            funOfElm(elm)[key].forEach(function (fun) {
                fun(elm);
            });
        } else {
            setTimeout(
                function () {
                    funOfElmFire(elm, key, true);
                },
                0,
                elm,
            );
        }
    }
}

function cloneResetAndAppendWithSubNames(name, rootElm, nElms, subNames, subNames2, setupFun) {
    elmsEx = getElmsRelativeByName(name, rootElm);
    for (var i = elmsEx.length - 1; i > 0; i--) {
        elmsEx[i].remove();
    }

    var elm = elmsEx[0];
    setupFun(0, elm);

    for (var i = 1; i < nElms; i++) cloneAppendWithSubNames(name, rootElm, subNames, subNames2, setupFun);
}
function idOfIndex(idStr, index) {
    return idStr + '-' + index;
}

function cloneAppendWithSubNames(name, rootElm, subNames, subNames2, setupFun) {
    var elms = getElmsRelativeByName(name, rootElm);
    var elmsLen = elms.length;

    var elm = elms[0];
    var elmLast = elms[elms.length - 1];
    var elmClone = elm.cloneNode(true);
    elmClone.id = idOfIndex(name, elmsLen);

    if (elmLast.nextElementSibling == null) elm.parentElement.appendChild(elmClone);
    else elm.parentElement.insertBefore(elmClone, elmLast.nextElementSibling);

    if (subNames) for (subName of subNames) resetElmRelativeByName(elmsLen, subName, elmClone);

    if (subNames2) for (subName2 of subNames2) resetElmsRelativeByName(elmsLen, subName2, elmClone);

    setupFun(elmsLen, elmClone);
}

function resetElmRelativeByName(i, name, elm, setupFun) {
    var nodes = getElmsRelativeByName(name, elm);
    if (nodes.length == 1) {
        nodes[0].id = idOfIndex(name, i);
        if (setupFun) setupFun(nodes[0]);
    }
}

function changeDisplay(ele, styleStr) {
    ele.style.display = styleStr;
}
function objValGetByKeys(obj, keysStr) {
    if (!obj) {
        return '';
    }

    if (!keysStr) {
        return obj;
    }

    var value = obj;
    let result = '';
    var keys = keysStr.split('.');
    for (key of keys) {
        let i = parseInt(key);
        if (isNaN(i)) {
            value = value[key];
            if (value === 0) {
                return 0;
            } else if (!value) {
                return '';
            }
        } else if (value.length && value.length > i) {
            value = value[i];
        } else {
            return '';
        }
    }

    return value;
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
                    let latLng = await this.getDetailByPlaceId(place_id)
                    let { lat, lng, name } = latLng
                    callback({ place_id, lat, lng, name })
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
        let url = `${api[stage].maps}/places/auto-comp?input_text=${keywords}&location=${boundLat},${boundLng}&radius=${boundRadius}`
        if (sessionToken) {
            url += `&session_token=${sessionToken}`
        }
        let res = await svcUtils.fetchData({ url, isShowLoading: false })

        let { session_token } = res
        _d.originLatLng.sessionToken = session_token
        list = res.predictions.predictions

        _d.predictionsCache[keywords] = list
        return list
    }


    async getDetailByPlaceId(id) {
        let url = `${api[stage].maps}/places/id?google_place_id=${id}`
        let { place_detail } = await svcUtils.fetchData({ url, isShowLoading: false })
        let { status } = place_detail

        if (status == 'OK') {
            let { result: { formatted_address, name: localName, geometry: { location } } } = place_detail

            let val = `${localName} ${formatted_address}`
            if (formatted_address.startsWith(localName)) {
                val = formatted_address
            }
            this.elm.value = val

            let { lat, lng, } = location
            let t = typeof lat === 'number' ? lat : lat()
            let g = typeof lng === 'number' ? lng : lng()

            return { lat: t, lng: g, name: val }
        }

    }
}

let svcUtils = {
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
    }
}

let api = {
    dev: {
        smsVerificationCode: 'https://avmzupj8re.execute-api.us-east-2.amazonaws.com/dev/customer-verification/sms',
        rating: 'https://mxbus9jr1m.execute-api.us-east-2.amazonaws.com/dev/reviews/dispatch',
        review: 'https://6mwbgkmuy9.execute-api.us-east-2.amazonaws.com/dev/notes/review',
        accounts: 'https://wx487icstl.execute-api.us-east-2.amazonaws.com/dev/accounts',
        accessTokens: 'https://rif8m0lk5l.execute-api.us-east-2.amazonaws.com/dev/access-tokens',
        agencies: 'https://lslfxel8uk.execute-api.us-east-2.amazonaws.com/dev/agencies/signup',
        addAgent: 'https://lslfxel8uk.execute-api.us-east-2.amazonaws.com/dev/agencies/id/agents',
        agentUpdatePwd: 'https://t9elepaqaf.execute-api.us-east-2.amazonaws.com/dev/logins-agency-emp/ses',
        affiliateUpdatePwd: 'https://lt8972er8f.execute-api.us-east-2.amazonaws.com/dev/logins-affiliate-emp/ses',
        airlines: 'https://iz4902jxo3.execute-api.us-east-2.amazonaws.com/dev/airlines',
        airports: 'https://7u5mf16i8d.execute-api.us-east-2.amazonaws.com/dev/airports',
        auction: 'https://b48pd87r0e.execute-api.us-east-2.amazonaws.com/dev/auctions',
        blobs: 'https://tuxrzdk4r5.execute-api.us-east-2.amazonaws.com/dev/blobs',
        curExchRates: 'https://w6o0tr8o36.execute-api.us-east-2.amazonaws.com/dev/cur-exch-rates/cur',
        deemCl: 'https://4t72cxcig3.execute-api.us-east-2.amazonaws.com/dev/deem/transactions/cl',
        deemClInvoice: 'https://4t72cxcig3.execute-api.us-east-2.amazonaws.com/dev/deem/transactions/cl/invoice',
        deemPx: 'https://4t72cxcig3.execute-api.us-east-2.amazonaws.com/dev/deem/transactions/px',
        comms: 'https://h9n8tqpwth.execute-api.us-east-2.amazonaws.com/dev/comms',
        comms_2: 'https://h9n8tqpwth.execute-api.us-east-2.amazonaws.com/dev/comms',
        customers: 'https://sdvjt4r4yl.execute-api.us-east-2.amazonaws.com/dev/customers',
        customers_fleet: 'https://sdvjt4r4yl.execute-api.us-east-2.amazonaws.com/dev/customers/fleet',
        dispatches: 'https://i3ik0u41zi.execute-api.us-east-2.amazonaws.com/dev/dispatches',
        dispatchSmses: 'https://g0vqb6som6.execute-api.us-east-2.amazonaws.com/dev/dispatch-smses',
        distancematrix: 'https://beyoz86dch.execute-api.us-east-2.amazonaws.com/dev/distancematrix',
        driversHighlighted: 'https://99x4ikjhi5.execute-api.us-east-2.amazonaws.com/dev/drivers',
        employees: 'https://umm8cbmhfc.execute-api.us-east-2.amazonaws.com/dev/employees',
        files: 'https://dny84r1k09.execute-api.us-east-2.amazonaws.com/dev/files',
        fileUrls: 'https://cuu9c8irxj.execute-api.us-east-2.amazonaws.com/dev/file-urls',
        fleetEmps: 'https://32qz1rt6d8.execute-api.us-east-2.amazonaws.com/dev/fleet-emps',
        fleetsSignup: 'https://tkduvoscb4.execute-api.us-east-2.amazonaws.com/dev/fleets-signup',
        fleetsSignupUnverified: 'https://tkduvoscb4.execute-api.us-east-2.amazonaws.com/dev/fleets-unverified',
        fleets: 'https://bbwvxmymvg.execute-api.us-east-2.amazonaws.com/dev/fleets',
        fleetDrivers: 'https://t8pj3xilcb.execute-api.us-east-2.amazonaws.com/dev/fleet-drivers',
        fleetsConvDriver: 'https://tkduvoscb4.execute-api.us-east-2.amazonaws.com/dev/fleets-conv-driver',
        flights: 'https://7tazk1dro3.execute-api.us-east-2.amazonaws.com/dev/flights',
        logins: 'https://f8e1b5ecqg.execute-api.us-east-2.amazonaws.com/dev/logins',
        loginsAgencyEmp: 'https://t9elepaqaf.execute-api.us-east-2.amazonaws.com/dev/logins-agency-emp',
        loginsPartnerEmp: 'https://h7a4ebmh1a.execute-api.us-east-2.amazonaws.com/dev/logins-partner-emp-post',
        loginsAffiliateEmp: 'https://lt8972er8f.execute-api.us-east-2.amazonaws.com/dev/logins-affiliate-emp',
        loginsCorporateEmp: 'https://g4tmvof5d9.execute-api.us-east-2.amazonaws.com/dev/logins-corporate-emp',
        loginSesesCorporateEmp: 'https://6pl0cp91je.execute-api.us-east-2.amazonaws.com/dev/login-seses-corporate-emp',
        loginSesesAffiliateEmp: 'https://d54tw434h9.execute-api.us-east-2.amazonaws.com/dev/login-seses-affiliate-emp',
        loginSesesPartnerEmp: 'https://82r9eijcx2.execute-api.us-east-2.amazonaws.com/dev/login-seses-partner-emp',
        loginsEmployee: 'https://xie87e1hid.execute-api.us-east-2.amazonaws.com/dev/logins-employee',
        loginsFleetEmp: 'https://wath9xtvq9.execute-api.us-east-2.amazonaws.com/dev/logins-fleet-emp',
        loginsFleetEmpPwd: 'https://go13lfiv5g.execute-api.us-east-2.amazonaws.com/dev/logins-fleet-emp',
        loginSesesAgencyEmp: 'https://gi1s9ied1b.execute-api.us-east-2.amazonaws.com/dev/login-seses-agency-emp',
        loginSesesEmployee: 'https://t3bln7u6xa.execute-api.us-east-2.amazonaws.com/dev/login-seses-employee',
        loginSesesFleetEmp: 'https://dd06r2adb9.execute-api.us-east-2.amazonaws.com/dev/login-seses-fleet-emp',
        loginSesesFleetEmpViaEmp: 'https://y5zmxgn85l.execute-api.us-east-2.amazonaws.com/dev/login-seses-fleet-emp-via-emp',
        loginSesesAgencyEmpViaEmp: 'https://y5zmxgn85l.execute-api.us-east-2.amazonaws.com/dev/login-seses-agency-emp-via-emp',
        loginSesesAffiliateEmpViaEmp: 'https://y5zmxgn85l.execute-api.us-east-2.amazonaws.com/dev/login-seses-affiliate-emp-via-emp',
        loginSesesCorporateEmpViaEmp: 'https://y5zmxgn85l.execute-api.us-east-2.amazonaws.com/dev/login-seses-corporate-emp-via-emp',
        loginSessionsPost: 'https://b7o3d9s5kf.execute-api.us-east-2.amazonaws.com/dev/login-sessions',
        maps: 'https://e3s6es4ybc.execute-api.us-east-2.amazonaws.com/dev/maps',
        marketingMsgs: 'https://j0s0h3pb92.execute-api.us-east-2.amazonaws.com/dev/marketing-msgs',
        meetingPlaces: 'https://5do9rhikxk.execute-api.us-east-2.amazonaws.com/dev/meeting-places',
        notes: 'https://6mwbgkmuy9.execute-api.us-east-2.amazonaws.com/dev/notes',
        orders: 'https://gb78im8ne7.execute-api.us-east-2.amazonaws.com/dev/orders',
        orders_2: 'https://gb78im8ne7.execute-api.us-east-2.amazonaws.com/dev/orders',
        squarePaymentsComplete: 'https://k9dpvbsg24.execute-api.us-east-2.amazonaws.com/dev/square-payments/complete',
        pages: 'https://e6ypnbkk59.execute-api.us-east-2.amazonaws.com/dev/pages',
        ridePassengers: 'https://y3g5kc44n0.execute-api.us-east-2.amazonaws.com/dev/ride-passengers',
        places: 'https://d46umqzje5.execute-api.us-east-2.amazonaws.com/dev/places',
        places_fleet: 'https://d46umqzje5.execute-api.us-east-2.amazonaws.com/dev/places/fleet',
        pymt: 'https://b7iaisghze.execute-api.us-east-2.amazonaws.com/dev/pymt',
        pymtAdjs: 'https://b7iaisghze.execute-api.us-east-2.amazonaws.com/dev/pymt-summaries/id/pymts/id/adjs',
        process: 'https://b7iaisghze.execute-api.us-east-2.amazonaws.com/dev/pymts',
        placetextsearch: 'https://3uzeqm3lyi.execute-api.us-east-2.amazonaws.com/dev/place/textsearch',
        // ridesGet: 'https://7poy9okvyg.execute-api.us-east-2.amazonaws.com/dev/rides',
        rideEmailConfirmations: 'https://bpft9ygez7.execute-api.us-east-2.amazonaws.com/dev/ride/email/confirmations',
        ridePricings: 'https://9ykzpnsnc6.execute-api.us-east-2.amazonaws.com/dev/ride-pricings',
        rides: 'https://7poy9okvyg.execute-api.us-east-2.amazonaws.com/dev/rides',
        rides_fleet: 'https://7poy9okvyg.execute-api.us-east-2.amazonaws.com/dev/rides/fleet',
        note_ride: 'https://6mwbgkmuy9.execute-api.us-east-2.amazonaws.com/dev/notes/ride',
        ridesAgency: 'https://9jvv2lo3dd.execute-api.us-east-2.amazonaws.com/dev/rides-agency',
        ridesTransfer: 'https://9jvv2lo3dd.execute-api.us-east-2.amazonaws.com/dev/rides-transfer',
        ridesAffiliate: 'https://9jvv2lo3dd.execute-api.us-east-2.amazonaws.com/dev/rides-affiliate',
        // rideReject: 'https://6mwbgkmuy9.execute-api.us-east-2.amazonaws.com/dev/notes/dispatch',
        routePoints: 'https://13yxehampg.execute-api.us-east-2.amazonaws.com/dev/route-points',
        serviceAreaByAirport: 'https://m5pil209oc.execute-api.us-east-2.amazonaws.com/dev/service-areas',
        serviceAreaPricings: 'https://s46bnb5w13.execute-api.us-east-2.amazonaws.com/dev/service-area-pricings',
        serviceAreas: 'https://009jytkcq0.execute-api.us-east-2.amazonaws.com/dev/service-areas',
        serviceAreaDrivers: 'https://kggm27gj4b.execute-api.us-east-2.amazonaws.com/dev/service-area-drivers',
        supplyDemandPricingJsons: 'https://2j234g68ga.execute-api.us-east-2.amazonaws.com/dev/supply-demand-pricing-jsons',
        sqlTemplatesRun: 'https://mqpd2xstgc.execute-api.us-east-2.amazonaws.com/dev/sql-templates/run',
        sqlTemplatesRun_2: 'https://mqpd2xstgc.execute-api.us-east-2.amazonaws.com/dev/sql-templates/run',
        sqlTemplatesRun_3: 'https://jqwys3p5nk.execute-api.us-east-2.amazonaws.com/dev/sql-template/run',
        trails: 'https://kobw5n1m2j.execute-api.us-east-2.amazonaws.com/dev/trails',
        vehicles: 'https://4zhigui6lg.execute-api.us-east-2.amazonaws.com/dev/vehicles',
        cellVerify: 'https://d96a71fc6b.execute-api.us-east-2.amazonaws.com/dev/fleet-driver-verifications',
        stripePaymentsRide: 'https://66z9hvt63k.execute-api.us-east-2.amazonaws.com/dev/stripe-payments/ride',
        squarePaymentsRide: 'https://k9dpvbsg24.execute-api.us-east-2.amazonaws.com/dev/square-payments/ride',
        paypalPaymentsRide: 'https://1jmw48xw3j.execute-api.us-east-2.amazonaws.com/dev/paypal-payments/ride',
        cancelRide: 'https://gb78im8ne7.execute-api.us-east-2.amazonaws.com/dev/orders/cancel',
        nuveiPaymentsHash: 'https://6ptk1racl9.execute-api.us-east-2.amazonaws.com/dev/nuvei-payments/hashes',
        nuveiPaymentsComplete: 'https://6ptk1racl9.execute-api.us-east-2.amazonaws.com/dev/nuvei-payments/complete',
        authorizations: 'https://28w76msb8f.execute-api.us-east-2.amazonaws.com/dev/authorizations',
        fcmTokensFleetEmp: 'https://ztgvvlnkb7.execute-api.us-east-2.amazonaws.com/dev/fcm-tokens/fleet-emp',
        fcmTokensFleetDriver: 'https://ztgvvlnkb7.execute-api.us-east-2.amazonaws.com/dev/fcm-tokens/fleet-driver',
        cancelAgencyRide: 'https://9jvv2lo3dd.execute-api.us-east-2.amazonaws.com/dev/rides-agency/',
        cancelPartnerRide: 'https://m2w8as201e.execute-api.us-east-2.amazonaws.com/dev/rides',
        cancelCorporateRide: 'https://9jvv2lo3dd.execute-api.us-east-2.amazonaws.com/dev/rides-corporate',
        alipayPage: 'https://tau1a8cqi1.execute-api.us-east-2.amazonaws.com/dev/alipay-paments/pages',
        alipayQuery: 'https://tau1a8cqi1.execute-api.us-east-2.amazonaws.com/dev/alipay-paments/trade-query',
        alipayComplete: 'https://tau1a8cqi1.execute-api.us-east-2.amazonaws.com/dev/alipay-paments/complete',
        cellPhone: 'https://xp6h7zaj68.execute-api.us-east-2.amazonaws.com/dev/cell-phone',
        callHistory: 'https://x14jsszeq8.execute-api.us-east-2.amazonaws.com/dev/bigquery/quotes',
        callRawData: 'https://x14jsszeq8.execute-api.us-east-2.amazonaws.com/dev/s3/quotes',
    },
    upncoming: {
        accounts: 'https://4hpkoinxv7.execute-api.us-east-2.amazonaws.com/upncoming/accounts',
        accessTokens: 'https://2op88uhzp3.execute-api.us-east-2.amazonaws.com/upncoming/access-tokens',
        agencies: 'https://mmaov1zg3d.execute-api.us-east-2.amazonaws.com/upncoming/agencies/signup',
        airlines: 'https://ie3675946l.execute-api.us-east-2.amazonaws.com/upncoming/airlines',
        airports: 'https://xh828pnco7.execute-api.us-east-2.amazonaws.com/upncoming/airports',
        blobs: 'https://hdlh677mj8.execute-api.us-east-2.amazonaws.com/upncoming/blobs',
        comms: 'https://cdcnycffzd.execute-api.us-east-2.amazonaws.com/upncoming/comms',
        curExchRates: 'https://0qt0mhunmb.execute-api.us-east-2.amazonaws.com/upncoming/cur-exch-rates/cur',
        customers: 'https://ilkmydte3k.execute-api.us-east-2.amazonaws.com/upncoming/customers',
        deemCl: 'https://bmdxx9upb3.execute-api.us-east-2.amazonaws.com/upncoming/deem/transactions/cl',
        deemClInvoice: 'https://bmdxx9upb3.execute-api.us-east-2.amazonaws.com/upncoming/deem/transactions/cl/invoice',
        deemPx: 'https://bmdxx9upb3.execute-api.us-east-2.amazonaws.com/upncoming/deem/transactions/px',
        dispatches: 'https://6o1hzt42mj.execute-api.us-east-2.amazonaws.com/upncoming/dispatches',
        dispatchSmses: 'https://84ntbdgq6h.execute-api.us-east-2.amazonaws.com/upncoming/dispatch-smses',
        driversHighlighted: 'https://bcsee28i6a.execute-api.us-east-2.amazonaws.com/upncoming/drivers',
        employees: 'https://lu3zqpgsb8.execute-api.us-east-2.amazonaws.com/upncoming/employees',
        files: 'https://nwiafo7dqb.execute-api.us-east-2.amazonaws.com/upncoming/files',
        fileUrls: 'https://5ah5t1qnlf.execute-api.us-east-2.amazonaws.com/upncoming/file-urls',
        fleetDrivers: 'https://z4op3cyg7h.execute-api.us-east-2.amazonaws.com/upncoming/fleet-drivers',
        fleetEmps: 'https://0z8ymaybef.execute-api.us-east-2.amazonaws.com/upncoming/fleet-emps',
        fleets: 'https://ebcrwd22w2.execute-api.us-east-2.amazonaws.com/upncoming/fleets',
        fleetsSignup: 'https://5znbzpyxlg.execute-api.us-east-2.amazonaws.com/upncoming/fleets-signup',
        flights: 'https://ur5s3w7pbi.execute-api.us-east-2.amazonaws.com/upncoming/flights',
        loginsAgencyEmp: 'https://q28cruloyi.execute-api.us-east-2.amazonaws.com/upncoming/logins-agency-emp',
        loginsEmployee: 'https://jinijhfux6.execute-api.us-east-2.amazonaws.com/upncoming/logins-employee',
        loginSesesAgencyEmp: 'https://dl8n5qd3f9.execute-api.us-east-2.amazonaws.com/upncoming/login-seses-agency-emp',
        loginSesesEmployee: 'https://37u8cyb418.execute-api.us-east-2.amazonaws.com/upncoming/login-seses-employee',
        loginSesesFleetEmp: 'https://4e0165djy0.execute-api.us-east-2.amazonaws.com/upncoming/login-seses-fleet-emp',
        loginsFleetEmp: 'https://8u5rj8qqu5.execute-api.us-east-2.amazonaws.com/upncoming/logins-fleet-emp',
        loginSesesFleetEmpViaEmp: 'https://rr6vgocj6f.execute-api.us-east-2.amazonaws.com/upncoming/login-seses-fleet-emp-via-emp',
        maps: 'https://d3nz1awfgb.execute-api.us-east-2.amazonaws.com/upncoming/maps',
        meetingPlaces: 'https://8g0ypuccp1.execute-api.us-east-2.amazonaws.com/upncoming/meeting-places',
        notes: 'https://6gwjmfdkl7.execute-api.us-east-2.amazonaws.com/upncoming/notes',
        orders: 'https://1wnoa1nube.execute-api.us-east-2.amazonaws.com/upncoming/orders',
        pages: 'https://0j9rr006a0.execute-api.us-east-2.amazonaws.com/upncoming/pages',
        places: 'https://seqd14u845.execute-api.us-east-2.amazonaws.com/upncoming/places',
        pymt: 'https://37cdpd3b4b.execute-api.us-east-2.amazonaws.com/upncoming/pymt',
        ridePricings: 'https://j1j495o5pk.execute-api.us-east-2.amazonaws.com/upncoming/ride-pricings',
        rides: 'https://fsyp9dz9jg.execute-api.us-east-2.amazonaws.com/upncoming/rides',
        ridesAgency: 'https://5y6274iudh.execute-api.us-east-2.amazonaws.com/upncoming/rides-agency',
        ridesTransfer: 'https://5y6274iudh.execute-api.us-east-2.amazonaws.com/upncoming/rides-transfer',
        ridesAffiliate: 'https://5y6274iudh.execute-api.us-east-2.amazonaws.com/upncoming/rides-affiliate',
        routePoints: 'https://8z6sizeal5.execute-api.us-east-2.amazonaws.com/upncoming/route-points',
        serviceAreaByAirport: 'https://xruw19jtg5.execute-api.us-east-2.amazonaws.com/upncoming/service-areas',
        serviceAreaPricings: 'https://n5wp0kwpvj.execute-api.us-east-2.amazonaws.com/upncoming/service-area-pricings',
        serviceAreas: 'https://ej9g4qhkdb.execute-api.us-east-2.amazonaws.com/upncoming/service-areas',
        sqlTemplatesRun: 'https://51y9xc7cuh.execute-api.us-east-2.amazonaws.com/upncoming/sql-templates/run',
        sqlTemplatesRun_2: 'https://51y9xc7cuh.execute-api.us-east-2.amazonaws.com/upncoming/sql-templates/run',
        sqlTemplatesRun_3: 'https://jqwys3p5nk.execute-api.us-east-2.amazonaws.com/upncoming/sql-template/run',
        supplyDemandPricingJsons: 'https://f8bixeuqeg.execute-api.us-east-2.amazonaws.com/upncoming/supply-demand-pricing-jsons',
        vehicles: 'https://fe3gss6hya.execute-api.us-east-2.amazonaws.com/upncoming/vehicles',
        cellVerify: 'https://d96a71fc6b.execute-api.us-east-2.amazonaws.com/upncoming/fleet-driver-verifications',
        nuveiPaymentsHash: 'https://bdku1ojkpl.execute-api.us-east-2.amazonaws.com/prod/nuvei-payments/hashes',
        nuveiPaymentsComplete: 'https://bdku1ojkpl.execute-api.us-east-2.amazonaws.com/prod/nuvei-payments/complete',
        authorizations: 'https://qa3dztadcc.execute-api.us-east-2.amazonaws.com/prod/authorizations',
        fcmTokensFleetEmp: 'https://at81jbv4c0.execute-api.us-east-2.amazonaws.com/prod/fcm-tokens/fleet-emp',
        alipayPage: 'https://vcf84sct6j.execute-api.us-east-2.amazonaws.com/prod/alipay-payments/pages',
        alipayQuery: 'https://vcf84sct6j.execute-api.us-east-2.amazonaws.com/prod/alipay-payments/trade-query',
        alipayComplete: 'https://vcf84sct6j.execute-api.us-east-2.amazonaws.com/prod/alipay-payments/complete',
        callHistory: 'https://ngu0f8qwh4.execute-api.us-east-2.amazonaws.com/prod/bigquery/quotes',
        callRawData: 'https://ngu0f8qwh4.execute-api.us-east-2.amazonaws.com/prod/s3/quotes',
    },
    prod: {
        // logins: 'https://kuuvxcitad.execute-api.us-east-2.amazonaws.com/prod/logins',
        // loginSessionsPost: 'https://i5achmgfoh.execute-api.us-east-2.amazonaws.com/prod/login-sessions'
        addAgent: 'https://1g3gcpg623.execute-api.us-east-2.amazonaws.com/prod/agencies/id/agents',
        agentUpdatePwd: 'https://r93wr06vng.execute-api.us-east-2.amazonaws.com/prod/logins-agency-emp/ses',
        accessTokens: 'https://5r79old6g5.execute-api.us-east-2.amazonaws.com/prod/access-tokens',
        accounts: 'https://94bd3m0ew2.execute-api.us-east-2.amazonaws.com/prod/accounts',
        agencies: 'https://1g3gcpg623.execute-api.us-east-2.amazonaws.com/prod/agencies/signup',
        airlines: 'https://ht9r3s7yil.execute-api.us-east-2.amazonaws.com/prod/airlines',
        airports: 'https://0fegp8jvk6.execute-api.us-east-2.amazonaws.com/prod/airports',
        auction: 'https://tqhoxd9unj.execute-api.us-east-2.amazonaws.com/prod/auctions',
        // auction: 'https://j156vg8qkj.execute-api.us-east-2.amazonaws.com/prod/auctions',
        blobs: 'https://hrhta7ysl8.execute-api.us-east-2.amazonaws.com/prod/blobs',
        comms: 'https://oiafwgti01.execute-api.us-east-2.amazonaws.com/prod/comms',
        comms_2: 'https://hn8r117yuk.execute-api.us-east-2.amazonaws.com/prod/comms',
        comms_3: 'https://pzg6q8d7i0.execute-api.us-east-2.amazonaws.com/prod/comms',
        curExchRates: 'https://btdcrg5tsc.execute-api.us-east-2.amazonaws.com/prod/cur-exch-rates/cur',
        customers: 'https://gqkubq25c4.execute-api.us-east-2.amazonaws.com/prod/customers',
        customers_fleet: 'https://gqkubq25c4.execute-api.us-east-2.amazonaws.com/prod/customers/fleet',
        deemCl: 'https://35k92sz7cl.execute-api.us-east-2.amazonaws.com/prod/deem/transactions/cl',
        deemClInvoice: 'https://35k92sz7cl.execute-api.us-east-2.amazonaws.com/prod/deem/transactions/cl/invoice',
        deemPx: 'https://35k92sz7cl.execute-api.us-east-2.amazonaws.com/prod/deem/transactions/px',
        dispatches: 'https://62b3isx7n1.execute-api.us-east-2.amazonaws.com/prod/dispatches',
        dispatchSmses: 'https://6x1b9j4fi0.execute-api.us-east-2.amazonaws.com/prod/dispatch-smses',
        driversHighlighted: 'https://g12ib67q8d.execute-api.us-east-2.amazonaws.com/prod/drivers',
        files: 'https://e2itc1dme8.execute-api.us-east-2.amazonaws.com/prod/files',
        fileUrls: 'https://297jatcdca.execute-api.us-east-2.amazonaws.com/prod/file-urls',
        fleetsConvDriver: 'https://mzk5jlkwce.execute-api.us-east-2.amazonaws.com/prod/fleets-conv-driver',
        fleetDrivers: 'https://use7j50jlk.execute-api.us-east-2.amazonaws.com/prod/fleet-drivers',
        fleetEmps: 'https://mpapc7py6l.execute-api.us-east-2.amazonaws.com/prod/fleet-emps',
        fleetsSignup: 'https://mzk5jlkwce.execute-api.us-east-2.amazonaws.com/prod/fleets-signup',
        flights: 'https://wm8cq5bys7.execute-api.us-east-2.amazonaws.com/prod/flights',
        loginsAgencyEmp: 'https://r93wr06vng.execute-api.us-east-2.amazonaws.com/prod/logins-agency-emp',
        loginsPartnerEmp: 'https://shm00g1sn8.execute-api.us-east-2.amazonaws.com/prod/logins-partner-emp-post',
        loginsAffiliateEmp: 'https://crshea5jvg.execute-api.us-east-2.amazonaws.com/prod/logins-affiliate-emp',
        loginsCorporateEmp: 'https://6xl104b6ig.execute-api.us-east-2.amazonaws.com/prod/logins-corporate-emp',
        loginSesesCorporateEmp: 'https://2dhai1fhbg.execute-api.us-east-2.amazonaws.com/prod/login-seses-corporate-emp',
        loginSesesPartnerEmp: 'https://lhrbifuli4.execute-api.us-east-2.amazonaws.com/prod/login-seses-partner-emp',
        loginsEmployee: 'https://8lb8h89gme.execute-api.us-east-2.amazonaws.com/prod/logins-employee',
        loginSesesAgencyEmp: 'https://lxjg0epatj.execute-api.us-east-2.amazonaws.com/prod/login-seses-agency-emp',
        loginSesesEmployee: 'https://t8v4gjylkf.execute-api.us-east-2.amazonaws.com/prod/login-seses-employee',
        loginSesesFleetEmp: 'https://l6vi2vggzi.execute-api.us-east-2.amazonaws.com/prod/login-seses-fleet-emp',
        loginsFleetEmp: 'https://gmg0gqfwe4.execute-api.us-east-2.amazonaws.com/prod/logins-fleet-emp',
        loginsFleetEmpPwd: 'https://gmg0gqfwe4.execute-api.us-east-2.amazonaws.com/prod/logins-fleet-emp',
        loginSesesFleetEmpViaEmp: 'https://rr6vgocj6f.execute-api.us-east-2.amazonaws.com/upncoming/login-seses-fleet-emp-via-emp',
        loginSesesAgencyEmpViaEmp: 'https://rr6vgocj6f.execute-api.us-east-2.amazonaws.com/prod/login-seses-agency-emp-via-emp',
        loginSesesAffiliateEmpViaEmp: 'https://rr6vgocj6f.execute-api.us-east-2.amazonaws.com/prod/login-seses-affiliate-emp-via-emp',
        loginSesesCorporateEmpViaEmp: 'https://rr6vgocj6f.execute-api.us-east-2.amazonaws.com/prod/login-seses-corporate-emp-via-emp',
        maps: 'https://388bivap71.execute-api.us-east-2.amazonaws.com/prod/maps',
        meetingPlaces: 'https://ygmvq6z88k.execute-api.us-east-2.amazonaws.com/prod/meeting-places',
        notes: 'https://htzfxrwd89.execute-api.us-east-2.amazonaws.com/prod/notes',
        orders: 'https://9qjvo3zeeg.execute-api.us-east-2.amazonaws.com/prod/orders',
        // orders_2: 'https://rr0vjcsp0g.execute-api.us-east-2.amazonaws.com/prod/orders',
        orders_2: 'https://xauls4ukx4.execute-api.us-east-2.amazonaws.com/prod/orders',
        squarePaymentsComplete: 'https://xctgpuf4ul.execute-api.us-east-2.amazonaws.com/prod/square-payments/complete',
        pages: 'https://taqv27v9pc.execute-api.us-east-2.amazonaws.com/prod/pages',
        places: 'https://0zp1sh4kb2.execute-api.us-east-2.amazonaws.com/prod/places',
        places_fleet: 'https://0zp1sh4kb2.execute-api.us-east-2.amazonaws.com/prod/places/fleet',
        pymt: 'https://ksa3jp2hgk.execute-api.us-east-2.amazonaws.com/prod/pymt',
        pymtAdjs: 'https://ksa3jp2hgk.execute-api.us-east-2.amazonaws.com/prod/pymt-summaries/id/pymts/id/adjs',
        process: 'https://ksa3jp2hgk.execute-api.us-east-2.amazonaws.com/prod/pymts',
        ridePricings: 'https://k3zdvi12m6.execute-api.us-east-2.amazonaws.com/prod/ride-pricings',
        rides: 'https://dqrraby85b.execute-api.us-east-2.amazonaws.com/prod/rides',
        rides_fleet: 'https://dqrraby85b.execute-api.us-east-2.amazonaws.com/prod/rides/fleet',
        // ridesAgency: 'https://s6hy0vhgoi.execute-api.us-east-2.amazonaws.com/prod/rides-agency',
        ridesAgency: 'https://7uoh213jp6.execute-api.us-east-2.amazonaws.com/prod/rides-agency',
        ridesTransfer: 'https://s6hy0vhgoi.execute-api.us-east-2.amazonaws.com/prod/rides-transfer',
        ridesAffiliate: 'https://s6hy0vhgoi.execute-api.us-east-2.amazonaws.com/prod/rides-affiliate',
        routePoints: 'https://4vui22fc8i.execute-api.us-east-2.amazonaws.com/prod/route-points',
        serviceAreaPricings: 'https://ruloqjigag.execute-api.us-east-2.amazonaws.com/prod/service-area-pricings',
        serviceAreas: 'https://8q67gew4ek.execute-api.us-east-2.amazonaws.com/prod/service-areas',
        sqlTemplatesRun: 'https://opfn78dqm7.execute-api.us-east-2.amazonaws.com/prod/sql-templates/run',
        sqlTemplatesRun_2: 'https://opfn78dqm7.execute-api.us-east-2.amazonaws.com/prod/sql-templates/run',
        sqlTemplatesRun_3: 'https://mfmyyv2bjh.execute-api.us-east-2.amazonaws.com/prod/sql-templates/run',
        vehicles: 'https://ejtduj88da.execute-api.us-east-2.amazonaws.com/prod/vehicles',
        cellVerify: 'https://z0v8etuaec.execute-api.us-east-2.amazonaws.com/prod/fleet-driver-verifications',
        stripePaymentsRide: 'https://416ccz6cp1.execute-api.us-east-2.amazonaws.com/prod/stripe-payments/ride',
        squarePaymentsRide: 'https://xctgpuf4ul.execute-api.us-east-2.amazonaws.com/prod/square-payments/ride',
        paypalPaymentsRide: 'https://8sc8b97xdl.execute-api.us-east-2.amazonaws.com/prod/paypal-payments/ride',
        cancelRide: 'https://rr0vjcsp0g.execute-api.us-east-2.amazonaws.com/prod/orders/cancel',
        nuveiPaymentsHash: 'https://bdku1ojkpl.execute-api.us-east-2.amazonaws.com/prod/nuvei-payments/hashes',
        nuveiPaymentsComplete: 'https://bdku1ojkpl.execute-api.us-east-2.amazonaws.com/prod/nuvei-payments/complete',
        authorizations: 'https://qa3dztadcc.execute-api.us-east-2.amazonaws.com/prod/authorizations',
        fcmTokensFleetEmp: 'https://at81jbv4c0.execute-api.us-east-2.amazonaws.com/prod/fcm-tokens/fleet-emp',
        fcmTokensFleetDriver: 'https://at81jbv4c0.execute-api.us-east-2.amazonaws.com/prod/fcm-tokens/fleet-driver',
        cancelAgencyRide: 'https://7uoh213jp6.execute-api.us-east-2.amazonaws.com/prod/rides-agency/',
        alipayPage: 'https://vcf84sct6j.execute-api.us-east-2.amazonaws.com/prod/alipay-payments/pages',
        alipayQuery: 'https://vcf84sct6j.execute-api.us-east-2.amazonaws.com/prod/alipay-payments/trade-query',
        alipayComplete: 'https://vcf84sct6j.execute-api.us-east-2.amazonaws.com/prod/alipay-payments/complete',
        cellPhone: 'https://exhypk3r2k.execute-api.us-east-2.amazonaws.com/prod/cell-phone',
    },
};

class Calendar {
    constructor(elm, fun) {
        this.elm = elm;
        this.calendar = elmOfIdClosest(this.elm.id + '-calendar', elm);
        {
            // let dateCalendar = elmOfId('date-calendar-');
            let dateCalendar = document.querySelector('#date-calendar-')
            let clone = dateCalendar.cloneNode(true);
            clone.style.display = '';
            this.calendar.appendChild(clone);
            if (typeof _isCNDomain !== 'undefined' && _isCNDomain) {
                const labels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                const tds = this.calendar.querySelectorAll('table tr:nth-child(2)>td');
                for (let i = 0, len = tds.length; i < len; ++i) {
                    const label = labels[i];
                    const td = tds[i];
                    td.innerHTML = label;
                }
            }
        }

        this.calendar.style.position = 'absolute';
        let zIndex = 0;
        if (this.elm.style.zIndex) {
            zIndex = this.elm.style.zIndex;
        }
        this.calendar.style.zIndex = zIndex + 5;
        if (!this.calendar.style.backgroundColor) {
            if (this.elm.style.backgroundColor) {
                this.calendar.style.backgroundColor = this.elm.style.backgroundColor;
            } else {
                this.calendar.style.backgroundColor = '#ffffff';
            }
        }
        this.calendar.style.display = 'none';
        this.prev = elmOfIdRel('prev', this.calendar);
        this.cur = elmOfIdRel('cur', this.calendar);
        this.next = elmOfIdRel('next', this.calendar);
        this.close = elmOfIdRel('close', this.calendar);
        this.icon = elmOfIdClosest(this.elm.id + '-icon', elm);
        this.dateElmActive = '';
        this.fun = fun;
        this.pastAllowed = true;
        //this.showMonthName = elmOfIdRel('month-name-letter', this.calendar) //implementation of month name using check box

        this.isTodayValid = false;
        this.showMonthName = false;

        let it = this;
        it.prev.onclick = function () {
            let date = it.lastOfPrevMonth(it.year, it.month);
            it.filMonth(date.getFullYear(), date.getMonth());
            it.elm.focus();
        };

        it.next.onclick = function () {
            let date = it.firstOfNextMonth(it.year, it.month);
            it.filMonth(date.getFullYear(), date.getMonth());
            it.elm.focus();
        };
     
        it.prev.addEventListener('mouseout', function () {
            // console.log('leaving date elm', dateElm);
            it.controlElm = '';
        });
        it.prev.addEventListener('mouseover', function () {
            // console.log('entering date elm', dateElm);
            it.controlElm = it.prev;
        });

        it.next.addEventListener('mouseout', function () {
            // console.log('leaving date elm', dateElm);
            it.controlElm = '';
        });
        it.next.addEventListener('mouseover', function () {
            // console.log('entering date elm', dateElm);
            it.controlElm = it.next;
        });
    
        it.close.onclick = function () {
            it.calendar.style.display = 'none';
        };
        //test
        // it.calendar.style.display = "";

        it.elm.onfocus = function () {
            if (it.calendar.style.display == 'none') {
                cloneResetAndAppendWithSubNamesDiscovery('date', it.calendar, 7, (i, dateElm) => { });
                let date = new Date();
                if (it.elm.value.length > 0) {
                    date = new Date(it.elm.value);
                }
                if (isNaN(date.getTime())) {
                    date = new Date();
                    date.setDate(date.getDate() + 1);
                    it.elm.value = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
                }
                it.filMonth(date.getFullYear(), date.getMonth());
                it.calendar.style.display = '';
            }
        };

        if (it.icon) {
            it.icon.onclick = function () {
                it.elm.focus();
            };
        }

        it.elm.onblur = function (event) {
            if (!it.controlElm) {
                it.calendar.style.display = 'none';
            }

            if (it.dateElmActive) {
                let year = dataOfElm(it.dateElmActive).date.year;
                let month = dataOfElm(it.dateElmActive).date.month;
                let date = dataOfElm(it.dateElmActive).date.date;
                it.elm.value = year + '-' + (month + 1).toString().padStart(2, '0') + '-' + date.toString().padStart(2, '0');
                it.calendar.style.display = 'none';
                if (it.fun) {
                    it.fun(year, month, date);
                }
            }
        };
    }

    lastOfMonth(year, month) {
        let first = new Date(year, month, 1);
        first.setDate(32); // it'll spill over to the next month
        let last = new Date(year, month, 32 - first.getDate());
        return last;
    }

    lastOfPrevMonth(year, month) {
        if (month == 0) {
            year--;
            month = 11;
        } else {
            month--;
        }

        return this.lastOfMonth(year, month);
    }

    firstOfNextMonth(year, month) {
        if (month == 11) {
            month = 0;
            year++;
        } else {
            month++;
        }

        return new Date(year, month, 1);
    }

    filDate(i, year, month, date) {
        let it = this;

        let row = Math.trunc(i / 7);
        let col = i % 7;
        let weekElm = elmOfIdRel(idOfIndex('week', row), it.calendar);
        let dateElm = elmOfIdRel(idOfIndex('date', col), weekElm);

        let now = new Date();
        let nowYear = now.getFullYear();
        let nowMonth = now.getMonth();
        let nowDate = now.getDate();

        let past = false;
        let today = false;
        if (year < nowYear) {
            past = true;
        } else if (nowYear == year) {
            if (month < nowMonth) {
                past = true;
            } else if (month == nowMonth) {
                if (date < nowDate) {
                    past = true;
                } else if (date == nowDate && !it.isTodayValid) {
                    past = true;
                }
                if (date == nowDate) {
                    today = true
                }
            }
        }

        dataOfElm(dateElm).date = {
            year: year,
            month: month,
            date: date,
        };
        dateElm.innerHTML = date;

        if (past && !it.pastAllowed) {
            dateElm.classList.add('past');
        } else {
            dateElm.classList.remove('past');
        }

        if (today) {
            dateElm.classList.add('today');
        } else {
            dateElm.classList.remove('today');
        }

        if (it.isStart) {
            let isDateStartConflict = false;

            if (it.endCalendar) {
                if (year > it.endCalendar.selectedYear) {
                    isDateStartConflict = true;
                } else if (it.endCalendar.selectedYear == year) {
                    if (month > it.endCalendar.selectedMonth) {
                        isDateStartConflict = true;
                    } else if (month == it.endCalendar.selectedMonth) {
                        if (date > it.endCalendar.selectedDate) {
                            isDateStartConflict = true;
                        } else if (date == it.endCalendar.selectedDate) {
                            isDateStartConflict = true;
                        }
                    }
                }
            }

            if (isDateStartConflict) {
                dateElm.classList.add('past');
            } else {
                dateElm.classList.remove('past');
            }
        }

        if (it.isEnd) {
            let isDateEndConflict = false;

            if (it.startCalendar) {
                if (year < it.startCalendar.selectedYear) {
                    isDateEndConflict = true;
                } else if (it.startCalendar.selectedYear == year) {
                    if (month < it.startCalendar.selectedMonth) {
                        isDateEndConflict = true;
                    } else if (month == it.startCalendar.selectedMonth) {
                        if (date < it.startCalendar.selectedDate) {
                            isDateEndConflict = true;
                        } else if (date == it.startCalendar.selectedDate) {
                            isDateEndConflict = true;
                        }
                    }
                }
            }

            if (isDateEndConflict) {
                dateElm.classList.add('past');
            } else {
                dateElm.classList.remove('past');
            }
        }

        if (!past || it.pastAllowed) {
            dateElm.addEventListener('mouseout', function () {
                it.dateElmActive = '';
                dateElm.classList.remove('active');
            });
            dateElm.addEventListener('mouseover', function () {
                it.dateElmActive = dateElm;
                if (!dateElm.classList.contains('past')) {
                    dateElm.classList.add('active');
                }
            });
        }
    }

    filMonth(year, month) {
        let it = this;

        it.year = year;
        it.month = month;

        if (typeof _isCNDomain !== 'undefined' && _isCNDomain) {
            it.cur.innerHTML = year + '年 ' + (month + 1) + '月';
        } else {
            if (it.showMonthName) {
                it.cur.innerHTML = year + ' ' + new Date(year, month).toLocaleString('en', { month: 'short' }).toUpperCase();
            } else {
                it.cur.innerHTML = year + '-' + (month + 1).toString().padStart(2, '0');
            }
        }

        let lastOfPrev = it.lastOfPrevMonth(year, month);
        let first = new Date(year, month, 1);
        let last = it.lastOfMonth(year, month);
        let firstOfNext = it.firstOfNextMonth(year, month);

        let padLast = first.getDay();
        let padNext = 7 - last.getDay() - 1;

        let nWeeks = (padLast + last.getDate() + padNext) / 7;

        cloneResetAndAppendWithSubNamesDiscovery('week', it.calendar, nWeeks, (i, weekElm) => { });

        let i = 0;
        for (var j = lastOfPrev.getDate() - padLast + 1; j <= lastOfPrev.getDate(); j++) {
            this.filDate(i++, lastOfPrev.getFullYear(), lastOfPrev.getMonth(), j);
        }

        for (var j = 1; j <= last.getDate(); j++) {
            this.filDate(i++, first.getFullYear(), first.getMonth(), j);
        }

        for (var j = 1; j <= padNext; j++) {
            this.filDate(i++, firstOfNext.getFullYear(), firstOfNext.getMonth(), j);
        }
    }
}

function elmOfId(id) {
    return document.getElementById(id);
}

function cloneResetAndAppendWithSubNamesDiscovery(name, rootElm, nElms, setupFun) {
    var subNames1 = [];
    var subNames2 = [];
    cloneSubNamesDiscovery(elmOfIdRel(idOfIndex(name, 0), rootElm), subNames1, subNames2);
    cloneResetAndAppendWithSubNames(name, rootElm, nElms, subNames1, subNames2, setupFun);
}


function cloneSubNamesDiscovery(elm, subNames1, subNames2) {
    var regex1 = /-0$/;
    var regex2 = /-0-[0-9]+$/;
    for (var i = 0; i < elm.children.length; i++) {
        var childId = elm.children[i].id;
        if (childId) {
            if (childId.match(regex1)) {
                subNames1.push(nameOfId(childId));
            }
            if (childId.match(regex2)) {
                // console.log('adding', nameOfId(childId));
                subNames2.push(nameOfId2(childId));
            }
        }
        cloneSubNamesDiscovery(elm.children[i], subNames1, subNames2);
    }
}

function nameOfId(idStr) {
    return idStr.substring(0, idStr.lastIndexOf('-'));
}