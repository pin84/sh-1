var _showingTrTabObjs = []; // used to translate current showing tabs
var _topNavTitles = elmOfId('top-nav-titles');

// disable enter submit form
document.addEventListener('keydown', function (event) {
    var eve = event ? event : window.event ? window.event : null;
    if (eve.keyCode == 13) {
        return false;
    }
});

// id and name of elements
// pages are developed in such a way that id is always unique
function elmOfId(id) {
    return document.getElementById(id);
}

// in general, functions expects an elm as input,
// if caller keeps using elmOfId for the same id, the caller should optimize by using a var to hold the elm

// when a group of elements are needed, they will share a common name, e.g., this-and-that,
// each of the elements in the group will have an id this-and-that-n, where n is the index, starting from 0,
// although you can use document.getElementsByName to get all the elements in the group,
// but that's quite innefficient, because it searches the entire dom,
// use the function below, which takes a parent element, and limits search to elements under the parent

// return a collection of nodes, by xpath, but only within the tree of elm
function getElmsRelativeByXPath(xpath, elm, checkFun) {
    var xPathRes = document.evaluate(xpath, elm, null, XPathResult.ANY_TYPE, null);

    var nodes = []; // iterating xPathRes wont work if you change the elm while iterating
    while ((node = xPathRes.iterateNext()) != null) if (!checkFun || checkFun(node)) nodes.push(node);

    return nodes;
}

function elmOfIdRel(id, elm) {
    return getElmsRelativeByXPath('.//*[@id="' + id + '"]', elm)[0];
}

function elmOfNameRel(name, elm) {
    return getElmsRelativeByXPath('.//*[@name="' + name + '"]', elm)[0];
}

function elmOfNameClosest(name, elm) {
    if (!elm) {
        return undefined;
    }

    let elmOfName = elmOfNameRel(name, elm);
    if (elmOfName) {
        return elmOfName;
    }

    return elmOfNameClosest(name, elm.parentElement);
}

function elmOfEdRel(ed, elm) {
    return getElmsRelativeByXPath('.//*[@ed="' + ed + '"]', elm)[0];
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

function elmOfDataClosest(dataKey, elm) {
    if (!elm) {
        return undefined;
    }

    let data = dataOfElm(elm)[dataKey];
    if (data) {
        return elm;
    }

    return elmOfDataClosest(dataKey, elm.parentElement);
}

// return a collection of nodes of the name, but only within the tree of elm
function getElmsRelativeByName(name, elm, checkFun) {
    // return getElmsRelativeByXPath('*/input[@name="' + name + '"]', elm);
    // return getElmsRelativeByXPath('*/' + tag + '[@name="' + name + '"]', elm);
    return getElmsRelativeByXPath('.//*[@name="' + name + '"]', elm, checkFun);
}

// return a collection of nodes of the tag, but only within the tree of elm
function getElmsRelativeByTag(tag, elm, checkFun) {
    return getElmsRelativeByXPath('.//' + tag, elm, checkFun);
}

function getElmsRelativeByClass(name, elm, checkFun) {
    // i ain't smart to come up with this xpathe
    // coutesy of https://devhints.io/xpath#class-check
    return getElmsRelativeByXPath(".//*[contains(concat(' ',normalize-space(@class),' '),' " + name + " ')]", elm, checkFun);
}

function getElms(obj, nameArr, rootElm) {
    for (let name of nameArr) {
        let elm = obj[name];
        if (elm) {
            continue;
        }
        elm = elmOfNameRel(name, rootElm);
        obj[name] = elm;
    }
}

function getAllNextSiblings(elm) {
    let siblings = [];

    while ((elm = elm.nextElementSibling)) {
        if (elm.nodeType === 3) continue; // text node
        siblings.push(elm);
    }
    return siblings;
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

function objNumGetByKeys(obj, keysStr) {
    var val = objValGetByKeys(obj, keysStr);
    if (val) {
        if (typeof val == 'string') {
            val = Number(val);
        }
    }
    return val;
}

function objValSetByKey(obj, key, val) {
    if (!obj) {
        return;
    }
    if (!key) {
        return;
    }
    if (val) {
        obj[key] = val;
    } else {
        if (typeof val == 'boolean' || typeof val == 'string') {
            obj[key] = val;
        } else if (obj[key]) {
            delete obj[key];
        }
    }
}

// utc in seconds, not milli-seconds, this one includes the seconds in the string, second is also 2
function utc2TimeStr2(utc) {
    var d = new Date();
    d.setTime(utc * 1000);
    return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + d.getUTCDate().toString().padStart(2, '0') + ' ' + d.getUTCHours().toString().padStart(2, '0') + ':' + d.getUTCMinutes().toString().padStart(2, '0') + ':' + d.getUTCSeconds().toString().padStart(2, '0');
}

// utc in seconds, not milli-seconds
function utc2TimeStr(utc) {
    var d = new Date();
    d.setTime(utc * 1000);
    return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + d.getUTCDate().toString().padStart(2, '0') + ' ' + d.getUTCHours().toString().padStart(2, '0') + ':' + d.getUTCMinutes().toString().padStart(2, '0');
}

function utc2TimeStrByLoc(lat, lng, utc, fun) {
    utcTimezoneByLoc(lat, lng, utc, (data) => {
        if (fun) {
            fun(data, utc2TimeStr(utc + data.rawOffset + data.dstOffset));
        }
    });
}

function timeStr2UtcByLoc(lat, lng, timeStr, fun) {
    var utc = Date.parse(timeStr.substring(0, 10) + 'T' + timeStr.substring(11, 16) + ':00+00:00') / 1000;
    utcTimezoneByLoc(lat, lng, utc, (data) => {
        var utcAdjusted = utc - data.dstOffset - data.rawOffset;
        utcTimezoneByLoc(lat, lng, utcAdjusted, (data) => {
            if (fun) {
                fun(data, utcAdjusted);
            }
        });
    });
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function getUtcFormatDate() {
    let now = new Date();
    return [now.getFullYear(), padTo2Digits(now.getUTCMonth() + 1), padTo2Digits(now.getUTCDate())].join('-');
    // +
    // ' ' + [
    //     padTo2Digits(now.getUTCHours()),
    //     padTo2Digits(now.getUTCMinutes()),
    //     padTo2Digits(now.getUTCSeconds()),
    // ].join(':')
}

// encoding for aws post body
function awsPostEncoding(s) {
    // for now
    return s.trim().replace(/%/g, '%2525').replace(/\[/g, '%255B').replace(/\]/g, '%255D').replace(/=/g, '%253D').replace(/&/g, '%2526').replace(/,/g, '%252C');
}

function distCalc(fromLat, fromLng, toLat, toLng, fun) {
    rest.get(
        'get distance thr aws api',
        api[stage].maps + '/routes/distance-time?from_lat=' + fromLat + '&from_lng=' + fromLng + '&to_lat=' + toLat + '&to_lng=' + toLng,
        (data) => {
            if (fun) {
                fun(objValGetByKeys(data, 'distance'), objValGetByKeys(data, 'time'));
            }
        },
        () => {
            if (fun) {
                fun(distCalcDirect(fromLat, fromLng, toLat, toLng), '');
            }
        },
    );
}

function distCalcDirect(lat1, lng1, lat2, lng2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lng2 - lng1) * p))) / 2;
    var d = 12742110.384 * Math.asin(Math.sqrt(a)); // earth's average diameter in meters

    return d;
}

// generate uuid v4
function uuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

function copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}

function isEmlValid(emlAddr) {
    // check if has white space
    if (/\s/g.test(emlAddr)) {
        console.log('eml contain space');
        return false;
    }

    // check if eml has @
    if (!emlAddr.includes('@')) {
        return false;
    }

    // check if has dot after @
    if (!emlAddr.split('@')[1].includes('.')) {
        return false;
    }
    return true;
}

function hoverShowFullText(Elm) {
    if (Elm.scrollWidth > Elm.clientWidth || Elm.scrollHeight > Elm.clientHeight) {
        getElmsRelativeByClass('gradual-trans-box', Elm.parentElement)[0].style.display = '';
        getElmsRelativeByName('hover-act', Elm.parentElement).forEach((hoverActElm) => {
            hoverActElm.onmouseover = function () {
                let fullTextElm = document.createElement('div');
                Elm.parentElement.appendChild(fullTextElm);
                fullTextElm.innerHTML = Elm.innerHTML;
                fullTextElm.style.width = Elm.clientWidth + 'px';
                fullTextElm.classList.add('hover-full-text');
                fullTextElm.style.left = Elm.offsetLeft + 'px';
                fullTextElm.style.top = Elm.offsetTop + (Elm.clientHeight / 3) * 2 + 10 + 'px';
                let fullArrowElm = document.createElement('div');
                fullArrowElm.classList.add('arrow-up');
                fullTextElm.appendChild(fullArrowElm);
            };
            hoverActElm.onmouseout = function () {
                getElmsRelativeByClass('hover-full-text', Elm.parentElement)[0].remove();
            };
        });
    } else {
        getElmsRelativeByClass('gradual-trans-box', Elm.parentElement)[0].style.display = 'none';
    }
}

function removeDuplicateObjFromArr(arr, key) {
    return [...new Map(arr.map((item) => [key(item), item])).values()];
}

function timeStr24To12(timeStr24) {
    let noonType = ' AM';
    let hh = Number(timeStr24.split(':')[0].slice(-2));
    if (12 <= hh && hh <= 23) {
        noonType = ' PM';
    }

    // hh = ((hh + 11) % 12) + 1;
    hh = hh % 12;
    if (hh.toString().length == 1) {
        hh = '0' + hh;
    }
    return timeStr24.substring(0, 11) + hh + ':' + timeStr24.split(':')[1] + noonType;
}

function timeStr24GetNoonType(timeStr24) {
    let noonType = ' AM';
    let hh = Number(timeStr24.split(':')[0].slice(-2));
    if (12 <= hh && hh <= 23) {
        noonType = ' PM';
    }

    return noonType;
}

function translate(rootId, lang) {
    let elmContainer = elmOfId(rootId);
    if (!elmContainer) {
        return;
    }

    const parseTemplate = (element, template) => {
        const arg0 = element.dataset.arg0;
        if (arg0) {
            return template.replace('$arg0', arg0);
        }
        return template;
    };

    getElmsRelativeByXPath('.//*[@tr=""]', elmOfId(rootId)).forEach((elm) => {
        const arg0 = elm.dataset.arg0;
        if (dataOfElm(elm).dict_tr) {
            refreshDictLabel(elm);
        } else if (elm.id) {
            if (elm.id == 'orders-new-act' && lang == 'zho') {
                elm.style.paddingLeft = '23.5px';
                elm.style.paddingRight = '23.5px';
            }
            // let innerHTML = objValGetByKeys(translations, rootId + '.' + elm.id + '.' + lang);
            let innerHTML = '';
            let elmKey = elm.id;
            let parentElm = elm;
            while (parentElm && !(innerHTML = objValGetByKeys(translations, rootId + '.' + elmKey + '.' + lang))) {
                parentElm = parentElm.parentElement;
                if (parentElm) {
                    if (parentElm.id) {
                        elmKey = parentElm.id + '--' + elm.id;
                    } else {
                        parentElm = parentElm.parentElement;
                        if (parentElm) {
                            if (parentElm.id) {
                                elmKey = parentElm.id + '--' + elm.id;
                            } else {
                                parentElm = parentElm.parentElement;
                                if (parentElm && parentElm.id) {
                                    elmKey = parentElm.id + '--' + elm.id;
                                }
                            }
                        }
                    }
                }
            }

            if (innerHTML) {
                if (arg0) {
                    innerHTML = innerHTML.replace('$arg0', arg0);
                }
                if (elm.innerHTML) {
                    elm.innerHTML = innerHTML;
                } else if (elm.placeholder) {
                    elm.setAttribute('placeholder', innerHTML);
                } else if (!elm.innerHTML) {
                    elm.innerHTML = innerHTML;
                }
            }
        }
        if (elm.getAttribute('for')) {
            let innerHTML = objValGetByKeys(translations, rootId + '.' + elm.getAttribute('for') + '.' + lang);
            if (innerHTML) {
                if (arg0) {
                    innerHTML = innerHTML.replace('$arg0', arg0);
                }
                elm.innerHTML = innerHTML;
            }
        }

        // if (elm.getAttribute('for')) {
        //     elm.innerHTML = translations[rootId][elm.getAttribute('for')][lang];
        // }
        if (elm.id == 'sign-in-email') {
            elm.setAttribute('placeholder', translations[rootId][elm.id][lang]);
        }
        if (elm.id == 'sign-in-password') {
            elm.setAttribute('placeholder', translations[rootId][elm.id][lang]);
        }
        if (rootId == 'order-detail' && lang == 'zho' && elm.id == 'show-contact-label') {
            elm.parentElement.style.width = '62' + 'px';
        }
    });
}

async function translate2(rootId, lang) {
    let elmContainer = elmOfId(rootId);

    if (!elmContainer) return;
    // console.log('elm cur lang,goal lang', rootId, elmContainer.dataset.lang, lang);
    if (elmContainer.dataset.lang == lang)
        // if its curent lang is same as goal lang,return
        return;
    // if (_path.includes('Driver_app') || _path.includes('elifelimo.com/fleet') || _path.includes('elifelimo.com/driver') || _path.includes('driver_app') || _path.includes('127.0.0.1')) _file = 'driver_app.html';
    // if (_path.includes('flt_mgmt') || _path.includes('fleet-mgmt')) _file = 'flt_mgmt.html';

    // load single lang tr file on demand and sync
    let __file = `service_area_tr_${lang}.js`
    await svcUtils.loadJsList([__file])

    // loadJsSync(_file.split('.')[0] + '_tr_' + lang, () => {
        let transObj = window[`${lang}Trans`];

        getElmsRelativeByXPath('.//*[@tr=""]', elmOfId(rootId)).forEach((elm) => {
            if (dataOfElm(elm).dict_tr) {
                refreshDictLabel(elm);
            } else if (elm.id) {
                let innerHTML = '';
                let elmKey = elm.id;
                let parentElm = elm;

                while (parentElm && !(innerHTML = objValGetByKeys(transObj, rootId + '.' + elmKey))) {
                    parentElm = parentElm.parentElement;
                    if (parentElm) {
                        elmKey = parentElm.id + '--' + elm.id;
                    }
                }

                if (innerHTML) {
                    if (elm.innerHTML) {
                        elm.innerHTML = innerHTML;
                    } else if (elm.placeholder) {
                        elm.setAttribute('placeholder', innerHTML);
                    } else if (!elm.innerHTML) {
                        elm.innerHTML = innerHTML;
                    }
                }
            }
            if (elm.getAttribute('for')) {
                let innerHTML = objValGetByKeys(transObj, rootId + '.' + elm.getAttribute('for'));
                if (innerHTML) {
                    elm.innerHTML = innerHTML;
                }
            }
        });
        elmContainer.dataset.lang = lang;
    // });
}

function elmAct(elm, fun, e) {
    if (dataOfElm(elm)['busy']) return;
    dataOfElm(elm)['busy'] = true;
    async.done(() => {
        if (elm.style.display == 'none' || elm.disabled) {
            console.log("--elm.style.display == 'none' || elm.disabled---");
            return;
        }

        if (dataOfElm(elm).isLoading) {
            Loading.show('loading...');
        }
        fun(e);
    });

    async.done(() => {
        dataOfElm(elm)['busy'] = false;
        // timer
    });
}

function elmActOnClick(elm, fun) {
    elm.onclick = function (e) {
        elmAct(elm, fun, e);
    };
}

function elmActOnPressDown(elm, fun) {
    elm.addEventListener('mousedown', (e) => {
        fun(e);
    });
    elm.addEventListener('touchstart', (e) => {
        fun(e);
    });
}

function elmActOnPressUp(elm, fun) {
    elm.addEventListener('mouseup', (e) => {
        fun(e);
    });
    elm.addEventListener('touchend', (e) => {
        fun(e);
    });
}

function elmLoadFileSyncRun(elm, fun) {
    let fileLoaded = false;
    let elmClicked = false;
    let funRuned = false;

    elmActOnPressDown(elm, (e) => {
        fileLoaded = false;
        elmClicked = false;
        funRuned = false;

        loadJsSync(`${elm.dataset.fileName}`, () => {
            fileLoaded = true;
            // console.log('mouse down is fun runed: ', funRuned);
            // console.log('mouse down is elm clicked: ', elmClicked);
            if (!funRuned && elmClicked) {
                elmAct(elm, () => {
                    funRuned = true;
                    fun(e);
                });
            }
        });
    });

    elmActOnPressUp(elm, (e) => {
        elmClicked = true;
        // console.log('elm clicked is fun runed: ', funRuned);
        // console.log('elm clicked is file loaded: ', fileLoaded);
        if (!funRuned && fileLoaded) {
            elmAct(elm, () => {
                funRuned = true;
                fun(e);
            });
        }
    });
}

// usually using to load js file and call api to get data parallely
function elmLoadFileAsyncRun(elm, fun) {
    elmActOnPressDown(elm, () => {
        loadJsAsync(`${elm.dataset.fileName}`, () => { });
    });
    elmActOnClick(elm, () => {
        fun();
    });
}

// the field accepts digits only
// it uses oninput
function fldDigitsOnly(elm) {
    // elm.oninput = function() {
    elm.addEventListener('input', () => {
        elm.value = digitsOfStr(elm.value);
    });
}

// the field accepts digits only and up to max length, no padding
// it uses oninput
function fldDigitsOnlyMaxLen(elm, len) {
    // elm.oninput = function() {
    elm.addEventListener('input', () => {
        var digits = digitsOfStr(elm.value);
        if (digits.length > len) digits = digits.substring(0, len);

        elm.value = digits;
    });
}

function fldWithFun(elm, fun) {
    elm.oninput = function () {
        elm.value = fun(elm.value);
    };
}

// elm1 must be the same, e.g., password verification
function fldSame(elm0, elm1) {
    elm0.oninput = function () {
        if (elm0.value == elm1.value) elm1.setCustomValidity('');
        else elm1.setCustomValidity('Value does not match');
    };
    elm1.oninput = elm0.oninput;
}

function elmsOnChangingPostAdd(elms, fun) {
    elms.forEach((elm) => {
        elmOnChangingPostAdd(elm, fun);
    });
}

// fun is on elm.fun
function funOfElm(elm) {
    if (elm.fun == undefined) elm.fun = {};

    return elm.fun;
}

function elmOnChangingPostAdd(elm, fun) {
    if (!elm.oninput)
        // add a dummy one to fire changing post
        elmOnChanging(elm);

    funOfElmAdd(elm, 'changing', fun);
}

function funOfElmAdd(elm, key, fun) {
    if (!funOfElm(elm)[key]) {
        funOfElm(elm)[key] = [];
    }
    funOfElm(elm)[key].push(fun);
}

function elmChangingPost(elm, now) {
    /*for(fun of funOfElm(elm).changingPost)
        fun(elm);*/
    funOfElmFire(elm, 'changing', now);
}

// overwrite oninput
function elmOnChanging(elm) {
    elm.oninput = function () {
        elmChangingPost(this);
    };
}

// data that can be associated with an element should be in the data attribute of the element
// init element.data to {} if needed
function dataOfElm(elm) {
    if (elm.data == undefined) elm.data = {};

    return elm.data;
}

function idOfIndex(idStr, index) {
    return idStr + '-' + index;
}

// remove all the existing nodes under rootElm with the name
// except the very first one
// then recreate nElms - 1 elements to make up nElms
// by copying the first one
function cloneResetAndAppend(name, rootElm, nElms, setupFun) {
    elmsEx = getElmsRelativeByName(name, rootElm);
    for (var i = elmsEx.length - 1; i > 0; i--) {
        elmsEx[i].remove();
    }

    var elm = elmsEx[0];
    setupFun(0, elm);

    for (var i = 1; i < nElms; i++) cloneAppend(name, rootElm, setupFun);
}

// append, or add as last, to a collection of node sharing the common name
// all of them appear somewhere below the rootElm
// name if the common ancester of the collection of the nodes
// the newly added nodes will be under an element of id name-n
function cloneAppend(name, rootElm, setupFun) {
    var elms = getElmsRelativeByName(name, rootElm);
    var elmsLen = elms.length;

    var elm = elms[0];
    var elmLast = elms[elms.length - 1];
    var elmClone = elm.cloneNode(true);
    elmClone.id = idOfIndex(name, elmsLen);

    if (elmLast.nextElementSibling == null) elm.parentElement.appendChild(elmClone);
    else elm.parentElement.insertBefore(elmClone, elmLast.nextElementSibling);

    setupFun(elmsLen, elmClone);
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

// set up the node identified, expect to find one and only
function resetElmRelativeByName(i, name, elm, setupFun) {
    var nodes = getElmsRelativeByName(name, elm);
    if (nodes.length == 1) {
        nodes[0].id = idOfIndex(name, i);
        if (setupFun) setupFun(nodes[0]);
    }
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

// element id, a string, has the format of this-and-that-n and n is the index
function indexOfId(idStr) {
    return parseInt(idStr.substring(idStr.lastIndexOf('-') + 1, idStr.length));
}

function indexOfElm(elm) {
    return indexOfId(elm.id);
}

function nameOfId(idStr) {
    return idStr.substring(0, idStr.lastIndexOf('-'));
}

function nameOfElm(elm) {
    return nameOfId(elm.id);
}

function elmOfIndex(idStr, index) {
    return elmOfId(idOfIndex(idStr, index));
}

function elmAddClass(elm, className) {
    elm.classList.add(className);
}

function elmRemoveClass(elm, className) {
    elm.classList.remove(className);
}

function changeDisplay(ele, styleStr) {
    ele.style.display = styleStr;
}

function switchDisplay(ele) {
    ele.style.display === 'none' ? (ele.style.display = '') : (ele.style.display = 'none');
}

function isElmDisplay(elm) {
    if (elm.style.display == '' || elm.style.display == 'flex') return true;
}

const getMobileOS = () => {
    let ua = navigator.userAgent;
    if (/android/i.test(ua)) {
        return 'Android';
    } else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return 'iOS';
    }

    return 'Unknow';
};

function loadJsAsync(srcName, callback = () => { }, type = 1, scriptId = '') {
    if (!srcName) return;
    let isExist = document.getElementById(srcName);
    if (isExist) {
        callback();
        return;
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';

    let url = '';
    if (type == 1) {
        url = _path + '/' + srcName + '.js';
    } else {
        url = srcName + '.js';
    }
    script.src = url;
    script.id = scriptId || srcName;
    console.log('load js async', url);
    document.body.appendChild(script);
    script.onload = () => {
        callback();
    };
}

function loadJsSync(srcName, fun) {
    if (!elmOfId(srcName)) {
        var xhrObj = new XMLHttpRequest();
        xhrObj.open('GET', _path + '/' + srcName + '.js', false);
        xhrObj.send();
        var se = document.createElement('script');
        se.id = srcName;
        se.type = 'text/javascript';
        se.text = xhrObj.responseText;
        document.getElementsByTagName('head')[0].appendChild(se);
        if (fun) fun();
    } else if (fun) {
        fun();
    }
}

function closeModal(modalElm) {
    let closeBtn = elmOfNameRel('close-btn', modalElm);
    closeBtn.addEventListener('click', function () {
        modalElm.style.display = 'none';
        if (modalElm.classList.contains('d-flex')) {
            modalElm.classList.remove('d-flex');
        }
    });
}

function cellCountryCodeFromCellNumber(cellNumber) {
    loadJsSync('com_currency_countries');
    let cellNumber1 = cellNumber.substring(1); // remove the +;
    let index = -1;
    for (var i = 0; i < cellCountryCodes.length; i++) {
        if (cellNumber1.startsWith(cellCountryCodes[i].code.replace('-', ''))) {
            index = i;
            if (cellNumber1[0] != '1' && cellNumber1.substring(0, 2) != '44') {
                break;
            }

            // US or UK
            if (cellCountryCodes[i].code.length > 2) {
                // one of those countries
                break;
            }
        }
    }

    if (index != -1) {
        return cellCountryCodes[index];
    }

    return '';
}


// var stage2UrlQry = {
//     dev: 'dev',
//     upncoming: 'upn',
//     prod: 'prd',
// };

// {
//     var qrys = _qryStr.substring(1).split('&');
//     // console.log('win qrys', qrys);
//     qrys.forEach((qry) => {
//         if (qry == 'upn') {
//             stage = 'upncoming';
//         } else if (qry == 'prd') {
//             stage = 'prod';
//         }
//     });
// }


function elm2ClassName(elm) {
    let className = '';
    elm.id.split('-').forEach((str) => {
        className += str[0].toUpperCase() + str.substring(1);
    });
    className = className[0].toLowerCase() + className.substring(1);
    return className;
}

// return dights and specific symbol of a string
function fldDigitsDividedBy(elm, specificSymbol) {
    elm.addEventListener('input', () => {
        var str = '';
        for (var i = 0; i < elm.value.length; i++) {
            let c = elm.value[i];
            if ((c >= '0' && c <= '9') || c == specificSymbol) str += c;
        }
        elm.value = str;
    });
}

function listOfDictsSearchDict(list, keyIn, value) {
    if (value) {
        for (dict of list) {
            if (typeof dict[keyIn] == 'string') {
                if (dict[keyIn].toUpperCase() == value.toUpperCase()) {
                    return dict;
                }
            } else if (dict[keyIn] == value) {
                return dict;
            }
        }
    }

    return '';
}

function listOfDictsSearch(list, keyOut, keyIn, value) {
    let dict = listOfDictsSearchDict(list, keyIn, value);
    if (dict) {
        return dict[keyOut];
    }
    return '';
}

function dataOfElmClear(elm) {
    elm.data = {};
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

function showModalSeconds(modal, seconds) {
    translate2(modal.id, _langCode);
    elmAddClass(modal, 'd-flex');
    setTimeout(() => {
        elmRemoveClass(modal, 'd-flex');
    }, seconds * 1000);
}

// F.JS f.js
var api = {
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

var pymtStats = [
    {
        id: 134807552,
        name: 'pymt_stat',
        seq: 0,
    },
    {
        id: 134807553,
        name: 'Created',
        unRealName: 'Create',
        seq: 1,
    },
    {
        id: 134807554,
        name: 'Processed',
        unRealName: 'Process',
        seq: 2,
    },
    {
        id: 134807555,
        name: 'Reviewed',
        unRealName: 'Review',
        seq: 3,
    },
    {
        id: 134807556,
        name: 'Approved',
        unRealName: 'Approve',
        seq: 4,
    },
    {
        id: 134807557,
        name: 'Paid',
        unRealName: 'Pay',
        seq: 5,
    },
    {
        id: 134807558,
        name: 'Voided',
        unRealName: 'Void',
        seq: 6,
    },
];

var pymtTypes = [
    {
        id: 134808552,
        name: 'pymt_type',
        seq: 0,
    },
    {
        id: 134808553,
        name: 'Ride',
        seq: 1,
    },
    {
        id: 134808554,
        name: 'Commission',
        seq: 2,
    },
];

var communitions = [
    {
        id: 134414337,
        name: 'Ride Confirmation',
        seq: 1,
    },
    {
        id: 134414338,
        name: 'Dispatch Notification',
        seq: 2,
    },
    {
        id: 134414339,
        name: 'Ride Dispath to Fleet Notification',
        seq: 3,
    },
    {
        id: 134414340,
        name: 'Order to Customer Confirmation',
        seq: 4,
    },
    {
        id: 134414341,
        name: 'Fleet Signup Welcome',
        seq: 5,
    },
    {
        id: 134414342,
        name: 'Meeting point notification',
        seq: 6,
    },
    {
        id: 134414343,
        name: 'Ride notification when driver is assigned',
        seq: 7,
    },
    {
        id: 134414344,
        name: 'ride cancellation notification to fleet',
        seq: 8,
    },
    {
        id: 134414345,
        name: 'rides for driver in 3-4 hours',
        seq: 9,
    },
    {
        id: 134414346,
        name: "fleet's rides in next day local time",
        seq: 10,
    },
    {
        id: 134414347,
        name: 'token to fleet driver',
        seq: 11,
    },
    {
        id: 134414348,
        name: 'ride rejection notification',
        seq: 12,
    },
];

var media = [
    {
        id: 134479873,
        name: 'email',
        seq: 1,
    },
    {
        id: 134479874,
        name: 'sms',
        seq: 2,
    },
    {
        id: 134479876,
        name: 'fcm',
        seq: 3,
    },
];

var stages = [
    {
        id: 134545409,
        name: 'dev',
        seq: 1,
    },
    {
        id: 134545410,
        name: 'upncoming',
        seq: 2,
    },
    {
        id: 134545411,
        name: 'sandbox',
        seq: 3,
    },
    {
        id: 134545412,
        name: 'prod',
        seq: 4,
    },
];

var eStats = [
    { name: 'Customer No show', id: 135135233 },
    { name: 'Driver Late', id: 135135234 },
    { name: 'No Evidence From Driver', id: 135135235 },
    { name: 'No Car Seat', id: 135135236 },
    { name: 'No, Meet and Greet', id: 135135237 },
    { name: 'Full Evidence from Drive', id: 135135238 },
    { name: 'Driver Not Assigned', id: 135135239 },
    { name: 'Wrong Car', id: 135135240 },
    { name: 'Penalty Waived', id: 135135241 },
    { name: 'Driver No Show', id: 135135242 },
    { name: 'Ride Data Incomplete', id: 135135243 },
    { name: 'Other', id: 135135244 },
];

var languageClasses = [
    {
        name: 'English',
        symbol: 'eng',
    },
    {
        name: '中文',
        symbol: 'zho',
    },
    {
        name: 'español',
        symbol: 'spa',
    },
    {
        name: '日本語',
        symbol: 'jpn',
    },
    {
        name: 'Русский язык',
        symbol: 'rus',
    },
    {
        name: 'Tiếng Việt',
        symbol: 'vie',
    },
    {
        name: 'Deutsch',
        symbol: 'deu',
    },
    {
        name: 'français',
        symbol: 'fra',
    },
    {
        name: 'Italiano',
        symbol: 'ita',
    },
    {
        name: 'ประเทศไทย',
        symbol: 'tha',
    },
    {
        name: 'Bahasa Melayu',
        symbol: 'msa',
    },
    {
        name: 'Türkçe',
        symbol: 'tur',
    },
    {
        name: 'Bahasa Indonesia',
        symbol: 'ind',
    },
    {
        name: 'Czech',
        symbol: 'ces',
    },
    {
        name: 'لغة عربية',
        symbol: 'ara',
    },
];
var vehicleYearNums = [{ year: 2010 }, { year: 2011 }, { year: 2012 }, { year: 2013 }, { year: 2014 }, { year: 2015 }, { year: 2016 }, { year: 2017 }, { year: 2018 }, { year: 2019 }, { year: 2020 }, { year: 2021 }, { year: 2022 }, { year: 2023 }];
var vehicleLgeNums = [
    { luggageNum: 1 },
    { luggageNum: 2 },
    { luggageNum: 3 },
    { luggageNum: 4 },
    { luggageNum: 5 },
    { luggageNum: 6 },
    { luggageNum: 7 },
    { luggageNum: 8 },
    { luggageNum: 9 },
    { luggageNum: 10 },
    { luggageNum: 11 },
    { luggageNum: 12 },
    { luggageNum: 13 },
    { luggageNum: 14 },
    { luggageNum: 15 },
    { luggageNum: 16 },
];

class Container {
    constructor(id) {
        this.rootId = id;
        this.rootElm = elmOfId(id);
        this.inited = false;
        if (this.rootElm) dataOfElm(this.rootElm).instance = this;
    }
    init(navTitleType) {
        if (this.inited) {
            this.showInit(navTitleType);
            return;
        }
        this.initElms();
        this.inited = true;
        this.showInit(navTitleType);
    }
    unInit() {
        const index = _showingTrTabObjs.indexOf(this);
        if (index > -1)
            // only splice _showingTrTabObjs when item is found
            _showingTrTabObjs.splice(index, 1); // 2nd parameter means remove one item only

        if (this.rootElm.classList.contains('comp')) {
            if (this.rootElm.classList.contains('showing-comp')) {
                // clear current comp containers' gloabl nav titles
                _topNavTitles.removeChild(_topNavTitles.lastChild);
                _topNavTitles.removeChild(_topNavTitles.lastChild);
                elmRemoveClass(this.rootElm, 'showing-comp');
            }

            this.rootElm.style.zIndex = 'unset';
        }
    }
    showInit(navTitleType = '') {
        if (this.rootElm.classList.contains('comp')) {
            elmAddClass(this.rootElm, 'showing-comp');
            // set current comp containers' global nav titles
            if (_topNavTitles) {
                let compNavText = objValGetByKeys(window[_langCode + 'Trans'], this.rootId + '.nav-title' + navTitleType);
                let lastNavSpan = _topNavTitles.children[_topNavTitles.childElementCount - 1];
                let lastNavSpanText = '';
                if (lastNavSpan) {
                    lastNavSpanText = lastNavSpan.innerHTML;
                }
                if (compNavText != lastNavSpanText) {
                    let compNavTitleSpan = document.createElement('span');
                    compNavTitleSpan.innerText = compNavText;
                    // click title span,hide all tabs after it
                    dataOfElm(compNavTitleSpan).compInstance = this;
                    elmActOnClick(compNavTitleSpan, () => {
                        getAllNextSiblings(compNavTitleSpan).forEach((nextSpan) => {
                            if (dataOfElm(nextSpan).compInstance) dataOfElm(nextSpan).compInstance.hide();
                        });
                    });
                    _topNavTitles.append(document.createTextNode('-'), compNavTitleSpan);
                }
            }

            // set current showing comp z-index top
            if (_showingTrTabObjs[_showingTrTabObjs.length - 1].rootElm && _showingTrTabObjs[_showingTrTabObjs.length - 1].rootElm.classList.contains('showing-comp')) {
                _showingTrTabObjs[_showingTrTabObjs.length - 1].rootElm.style.zIndex = 'unset';
            }

            this.rootElm.style.zIndex = 1045; // same as side nav
        }

        // trans
        if (this.rootElm.classList.contains('tr')) {
            _showingTrTabObjs.push(this);
            // console.log('trans divs: ', this.rootId);
            translate2(this.rootId, _langCode);
        }
    }
    elmOfId(id) {
        return elmOfIdRel(id, this.rootElm);
    }
}

class MyLoading {
    constructor(text = 'loading...') {
        this.text = text;
    }

    create() {
        let [wrapper, content, topText, pointBox] = this.createElementList(['DIV', 'DIV', 'SPAN', 'DIV']);
        wrapper.id = 'loading-wrapper';
        wrapper.classList = ['wrapper loading-wrapper d-flex align-items-center justify-content-center modal-position no-aligned-center'];
        // wrapper.classList.add('wrapper')
        // wrapper.classList.add('loading-wrapper')
        // content.classList.add('content')
        content.classList = ['content d-flex align-items-center justify-content-center '];
        topText.classList.add('text');
        topText.innerText = this.text;
        // pointBox.classList.add('point-box')
        pointBox.classList = ['point-box d-flex align-items-center justify-content-center'];
        for (let i = 0; i < 3; i++) {
            let span = document.createElement('SPAN');
            span.classList.add('point');
            pointBox.appendChild(span);
        }
        content.appendChild(topText);
        content.appendChild(pointBox);
        wrapper.appendChild(content);
        document.body.appendChild(wrapper);
        // wrapper.addEventListener('touchstart', e => {
        //     e.preventDefault()
        // }, false)
    }

    show(text) {
        this.hidden();
        this.text = text;
        this.create(this.text);
    }
    hidden() {
        // let loadingWarpper = document.getElementById('loading-wrapper')
        // loadingWarpper.style.transform = `scale(${0})`
        async.done(() => {
            let loadingWarpper = document.getElementById('loading-wrapper');
            if (loadingWarpper) {
                loadingWarpper.parentNode.removeChild(loadingWarpper);
            }
        });
        // loadingWarpper.style.transform = `scale(${0})`
    }

    createElementList(eleNameList) {
        let eleArr = [];
        eleNameList.forEach((ele) => {
            let curEle = document.createElement(ele);
            curEle.setAttribute('tr', '');
            eleArr.push(curEle);
        });
        return eleArr;
    }
}

let Loading;
if (!Loading) {
    Loading = new MyLoading();
}

class Dropdown {
    constructor(rootElm, dropDownId, dicts, name, fun) {
        this.dropDown = elmOfIdRel(dropDownId, rootElm);
        this.menu = elmOfIdRel('menu', this.dropDown);
        this.dicts = dicts;
        this.name = name;
        this.fun = fun;

        var it = this;
        dataOfElm(it.menu).text = it.menu.innerHTML;

        cloneResetAndAppendWithSubNames('item', this.dropDown, dicts.length + 1, ['item'], [], function (i, itemElm) {
            if (i == 0) {
                itemElm.innerHTML = it.menu.innerHTML;
            } else {
                itemElm.innerHTML = dicts[i - 1][name];
            }

            itemElm.onclick = function () {
                it.set(itemElm.innerHTML);
            };
        });
    }

    reset() {
        this.set(dataOfElm(this.menu).text);
    }

    get() {
        for (var dict of this.dicts) {
            if (dict[this.name] == this.menu.innerHTML) {
                return dict;
            }
        }

        return '';
    }

    set(name) {
        this.menu.innerHTML = name;
        if (this.fun) {
            this.fun(this.get());
        }
    }
}

class Async {
    constructor() {
        this.count = 0;
        this.funs = [];
    }

    inc() {
        this.count++;
        // if(this.count == 20){
        //     alert('Too many Async Calls');
        //     throw new Error('Too many Async Calls');
        // }
    }

    dec() {
        this.count--;

        this.follow();
    }

    follow() {
        if (this.count == 0) {
            // console.log('async 1229 before firing', this.funs.length);
            // this.funs.forEach(fun => {
            //     try {
            //         fun();
            //     } catch (err) { // catch err so we can continue
            //         console.log(err, err.message);
            //     }
            // });
            let waterMark = this.funs.length;
            for (let i = 0; i < waterMark; i++) {
                try {
                    /*
          console.log(
              'async 1240 bef fun',
              i,
              waterMark,
              this.funs.length,
              this.count
          );
          */
                    this.funs[i]();
                    /*
          console.log(
              'async 1240 aft fun',
              i,
              waterMark,
              this.funs.length,
              this.count
          );
          */
                } catch (err) {
                    // catch err so we can continue
                    console.log(err, err.message);
                }
            }
            let remaining = this.funs.length - waterMark;
            for (let i = 0; i < remaining; i++) {
                this.funs[0] = this.funs[i + waterMark];
            }
            this.funs.length = remaining;
            // console.log('async 1229 after firing', this.funs.length);
        }
    }

    done(fun, tag) {
        if (tag) {
            // console.log('async done fun of tag', tag);
        }
        if (this.count == 0) {
            fun();
        } else {
            this.funs.push(fun);
            // console.log('async 1246', this.funs.length);
        }
    }
    isClear() {
        return this.count == 0;
    }
}
var async = new Async();

class Rest {
    constructor() {
        this.count = 0;
        this.funs = [];
    }

    inc() {
        async.inc();
    }

    dec() {
        async.dec();
    }
    showLoading(name) {
        if (name.endsWith('loading') || name.endsWith('loading no hide')) Loading.show('loading...');
    }
    hideLoading(name) {
        if (name.endsWith('loading')) Loading.hidden();
    }
    showErr(errObj) {
        if (!elmOfId('error-modal')) return;

        let errModal = getErrModal('error-modal');
        errModal.setLabel({
            title: objValGetByKeys(errObj, 'responseJSON.errCode'),
        });
        errModal.add(objValGetByKeys(errObj, 'responseJSON.errMsg'));
    }
    get(name, url, succFun, errFun, dataType, beforeSendFun) {
        let it = this;
        if (!dataType) {
            dataType = 'json';
        }
        it.inc();
        let start = new Date().getTime();

        it.showLoading(name);
        $.ajax({
            type: 'GET',
            url: url,
            dataType: dataType,
            beforeSend: beforeSendFun,
            success: function (data, status, jqXHR) {
                it.hideLoading(name);
                /*
        console.log(
            name + ' GET succ',
            new Date().getTime() - start,
            url,
            typeof data,
            data
        );
        */
                if (succFun) {
                    succFun(data);
                }
                it.dec();
            },
            error: function (errObj, status, jqXHR) {
                it.hideLoading(name);
                console.log(name + ' GET error ', new Date().getTime() - start, url, typeof errObj, JSON.stringify(errObj));
                if (errFun) {
                    errFun(errObj);
                }
                it.dec();
                it.showErr(errObj);
            },
        });
    }

    getText(name, url, succFun, errFun) {
        this.get(name, url, succFun, errFun, 'text');
    }

    done(fun, tag) {
        async.done(fun, tag);
    }
    poatch(name, url, data, succFun, errFun, type, header) {
        let it = this;
        data = data || {};

        it.inc();
        let start = new Date().getTime();
        it.showLoading(name);

        let uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid));
        if (Object.prototype.toString.call(data) === '[object String]') {
            data = JSON.parse(data);
            data.req_id = uuid;
            data = JSON.stringify(data);
        } else {
            data.req_id = uuid;
        }

        $.ajax({
            type: type,
            url: url,
            data: data,
            success: function (data, status, jqXHR) {
                it.hideLoading(name);
                console.log(name + ' ' + type + ' ' + 'succ', new Date().getTime() - start, url, typeof data, data);
                if (succFun) {
                    succFun(data);
                }
                it.dec();
            },
            error: function (errObj, status, jqXHR) {
                it.hideLoading(name);
                console.log(name + ' ' + type + ' ' + 'error ', new Date().getTime() - start, url, typeof errObj, JSON.stringify(errObj));
                if (errFun) {
                    errFun(errObj);
                } else {
                    it.showErr(errObj);
                }
                it.dec();
                // try {
                //     let errModal = getErrModal('error-modal');
                //     errModal.setLabel({ title: objValGetByKeys(data, 'responseJSON.errCode') });
                //     errModal.add(objValGetByKeys(data, 'responseJSON.errMsg'));
                // } catch (e) {
                //     console.error(objValGetByKeys(data, 'responseJSON.errCode'), objValGetByKeys(data, 'responseJSON.errMsg'))
                // }
            },
        });
    }
    post(name, url, data, succFun, errFun, header) {
        this.poatch(name, url, data, succFun, errFun, 'POST', header);
    }
    patch(name, url, data, succFun, errFun) {
        this.poatch(name, url, data, succFun, errFun, 'PATCH');
    }
    put(name, url, data, succFun, errFun) {
        this.poatch(name, url, data, succFun, errFun, 'PUT');
    }
}
var rest = new Rest();

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

        // let zIndex = 0;

        // if (this.elm.style.zIndex) {
        //     zIndex = this.elm.style.zIndex;
        // }
        // this.dropdowns.style.zIndex = Number(zIndex) + 5;

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
                        // cellElm.innerHTML = '';
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
            /*for (let j = 0; j < innerHtmls.length; j++) {
                    let cellElm = elmOfIdRel(idOfIndex('lbl', j), itemElm);
                    if (i == 0) {
                        if (it.offset == 0) {
                            cellElm.innerHTML = innerHtmls[j];
                        } else {
                            cellElm.innerHTML = '...';
                        }
                    } else if (i < nDisplay - 1) {
                        cellElm.innerHTML = innerHtmls[j];
                    } else { // i == nDisplay - 1
                        if (i + it.offset == it.matches.length - 1) {
                            cellElm.innerHTML = innerHtmls[j];
                        } else {
                            cellElm.innerHTML = '...';
                        }
                    }
                }*/
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

        // cloneResetAndAppendWithSubNamesDiscovery('item', it.dropdowns, Math.min(it.matches.length, it.itemCnt), (i, itemElm) => {
        cloneResetAndAppendWithSubNames('item', it.dropdowns, Math.min(it.matches.length, it.itemCnt), ['item'], [], (i, itemElm) => {
            let innerHtmls = [];
            if (i + it.offset < it.matches.length) {
                innerHtmls = it.innerHtml(it.matches[i + it.offset], val);
            }
            it.paintRow(i, itemElm, innerHtmls);

            if (it.height == 0) {
                it.height = itemElm.getBoundingClientRect().height;
            }

            // itemElm.onmousedown = function(e) {
            //     if (event.button == 0) {
            //         if (it.moreUp && i == 0 && it.offset > 0) { // must be the ...
            //             it.move(-1);
            //             event.preventDefault();
            //             return;
            //         }
            //         if (it.moreDown && i == it.itemCnt - 1 && i + it.offset < it.matches.length - 1) {
            //             it.move(1);
            //             event.preventDefault();
            //             return;
            //         }
            //         it.sel(i + it.offset, e.target);
            //     }
            // };
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

            /*itemElm.onwheel = function(event) {
                        console.log('onwheel event', event);
                        if (event.deltaY > 0) {
                            it.move(-1);
                        } else if (event.deltaY < 0) {
                            it.move(1);
                        }
                        event.preventDefault();
                    }*/

            /*itemElm.addEventListener('touchstart', event => {
                        it.lastY = event.targetTouches[0].pageY;
                    });
                    itemElm.addEventListener('touchmove', event => {
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
                    });*/
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

// class TextAutoCompN extends TextAutoComp {
//     constructor(elm,fung) {
//         super(elm,fung)
//         let it = this

//         it.elm.addEventListener('change',(e)=>{
//             console.log(e.target.value);
//         })
//     }

// }

let _cache = {};
class TextAutoCompSql extends TextAutoComp {
    constructor(elm, fung, sql) {
        super(elm, fung);
        this.sql = sql;
        let it = this;

        if (objValGetByKeys(sql, 'sql')) {
            elm.addEventListener('focus', () => {
                it.runSql(this.sql);
            });
        }
    }

    runSql(params) {
        let curSql = params || this.sql;
        if (!curSql) return;
        let { sql } = curSql;
        let cacheData = _cache[sql];
        if (cacheData && cacheData != 'await') {
            this.setItems(cacheData);
            return;
        }
        if (cacheData == 'await') {
            rest.done(() => {
                this.setItems(_cache[sql]);
            });
            return;
        }
        if (!cacheData) {
            _cache[sql] = 'await';
        }

        let sqlTemplatesRun = api[stage].sqlTemplatesRun_2;
        rest.post(
            'get data by sqlEnum',
            sqlTemplatesRun,
            curSql,
            (res) => {
                _cache[sql] = res.results;
                this.setItems(res.results);
            },
            (err) => { },
        );
    }
    runSqlEnum(sqlEnum) {
        this.runSql({
            sql: sqlEnum,
        });
    }

    // setItems(items) {
    //     this.items = items;
    //     this.item = undefined;
    //     if (document.activeElement == this.elm) {
    //         this.comp();
    //     }
    // }
}

class VehicleYearNum extends TextAutoComp {
    constructor(lang) {
        super(lang, {
            str: (item, selected) => {
                if (selected) {
                    return item.year;
                } else {
                    return [item.year];
                }
            },
            // match: () => {
            //     return [];
            // }
        });
        let it = this;

        it.down = elmOfIdClosest(lang.id + '-down', lang);
        if (it.down) {
            it.down.onclick = function () {
                elmAct(it.down, () => {
                    it.comp();
                });
            };
        }
        it.setItems(vehicleYearNums);
        // it.itemCnt = 3;
        // it.more = false;
        it.filter = false;
    }
}
class VehiclePgrNum extends TextAutoComp {
    constructor(lang) {
        super(lang, {
            str: (item, selected) => {
                if (selected) {
                    return item.passengerNum;
                } else {
                    return [item.passengerNum];
                }
            },
            // match: () => {
            //     return [];
            // }
        });
        let it = this;

        it.down = elmOfIdClosest(lang.id + '-down', lang);
        if (it.down) {
            it.down.onclick = function () {
                elmAct(it.down, () => {
                    it.comp();
                });
            };
        }
        let PgrNums = [];
        for (let i = 1; i <= 72; i++) {
            PgrNums.push({ passengerNum: i });
        }
        it.setItems(PgrNums);
        // it.itemCnt = 3;
        // it.more = false;
        it.filter = false;
    }
}
class VehicleLgeNum extends TextAutoComp {
    constructor(lang) {
        super(lang, {
            str: (item, selected) => {
                if (selected) {
                    return item.luggageNum;
                } else {
                    return [item.luggageNum];
                }
            },
            // match: () => {
            //     return [];
            // }
        });
        let it = this;

        it.down = elmOfIdClosest(lang.id + '-down', lang);
        if (it.down) {
            it.down.onclick = function () {
                elmAct(it.down, () => {
                    it.comp();
                });
            };
        }
        it.setItems(vehicleLgeNums);
        // it.itemCnt = 3;
        // it.more = false;
        it.filter = false;
    }
}

class DropdownMenu {
    // temporarily copy code from TextAutoComp extend from this
    constructor(elm, fung) {
        this.elm = elm;
        // this.elm.style.position = 'absolute';
        this.dropdowns = elmOfIdClosest(this.elm.id + '-dropdowns', elm);
        this.dropdowns.style.position = 'absolute';
        this.icon = elmOfIdClosest(this.elm.id + '-icon', elm);

        let zIndex = 0;
        if (this.elm.style.zIndex) {
            zIndex = this.elm.style.zIndex;
        }
        this.dropdowns.style.zIndex = zIndex + 5;
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

        let it = this;

        it.elm.onfocus = function () {
            it.comp();
        };

        it.elm.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (it.dropdowns.style.cssText.indexOf('display: none') == -1) {
                    it.sel(0);
                }
            }
        });

        it.elm.onblur = function () {
            it.dropdowns.style.display = 'none';
            if (!it.item) {
                if (objValGetByKeys(it, 'fung.sel')) {
                    it.fung.sel(it.item);
                }
            }
        };

        if (it.icon) {
            it.icon.onclick = function () {
                it.elm.focus();
            };
        }
    }

    sel(i) {
        let it = this;

        if (it.dropdowns.style.display == 'none') {
            return;
        }
        it.set(it.matches[i]);
        // it.elm.value = it.fung.str(it.matches[i], true);
        // it.item = it.matches[i];
        // if (objValGetByKeys(it, 'fung.sel')) {
        //     it.fung.sel(it.item);
        // }

        it.dropdowns.style.display = 'none';
    }

    match(str, wordsStr) {
        let words = wordsStr.split(' ');
        let markers = [];
        for (var i = 0; i < str.length; i++) {
            markers[i] = false;
        }

        let strU = str.toUpperCase();
        let found = true;
        for (var word of words) {
            if (word) {
                let index = strU.indexOf(word.toUpperCase());
                if (index != -1) {
                    while (index != -1) {
                        for (var i = index; i < index + word.length; i++) {
                            markers[i] = true;
                        }
                        index = strU.indexOf(word.toUpperCase(), index + 1);
                    }
                } else {
                    found = false;
                    break;
                }
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

    innerHtml(item, val) {
        let it = this;
        let str = it.fung.str(item);
        let innerHTML = str;

        if (val) {
            let matchedSegs = [];
            if (it.fung.match) {
                matchedSegs = it.fung.match(item, val);
            } else {
                matchedSegs = it.match(str, val);
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
        }

        return innerHTML;
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
            // elmOfIdRel(idOfIndex('lbl', i), it.dropdowns).innerHTML = it.innerHtml(it.matches[i + it.offset], val);
            let cellElm = elmOfIdRel(idOfIndex('lbl', i), it.dropdowns);
            let str = it.innerHtml(it.matches[i + it.offset], val);
            if (i == 0) {
                if (it.offset == 0) {
                    cellElm.innerHTML = str;
                    cellElm.classList.remove('dropdown-up');
                } else {
                    cellElm.classList.add('dropdown-up');
                    cellElm.innerHTML = '';
                }
            } else if (i < nDisplay - 1) {
                cellElm.innerHTML = str;
            } else {
                // i == nDisplay - 1
                if (i + it.offset == it.matches.length - 1) {
                    cellElm.innerHTML = str;
                    cellElm.classList.remove('dropdown-down');
                } else {
                    cellElm.classList.add('dropdown-down');
                    cellElm.innerHTML = '';
                }
            }
        }
    }

    comp() {
        let it = this;

        it.item = undefined;

        if (!it.items) {
            return;
        }

        it.matches = [];
        let val = it.elm.value;
        if (!val) {
            val = '';
        }

        if (it.items) {
            it.items.forEach((item) => {
                it.matches.push(item);
            });
        }
        if (it.matches.length == 0) {
            it.dropdowns.style.display = 'none';
            return;
        }

        it.offset = 0;
        it.height = 0; // the height an item in the dropdown
        cloneResetAndAppendWithSubNamesDiscovery('item', it.dropdowns, Math.min(it.matches.length, it.itemCnt), (i, itemElm) => {
            elmOfIdRel(idOfIndex('lbl', i), itemElm).innerHTML = it.innerHtml(it.matches[i + it.offset], val);
            let item = it.matches[i + it.offset];
            let str = it.fung.str(item);
            // elmOfIdRel(idOfIndex('lbl', i), itemElm).innerHTML = str;
            elmOfIdRel(idOfIndex('lbl', i), itemElm).classList.remove('dropdown-up');
            if (i < it.itemCnt - 1 || it.matches.length <= it.itemCnt) {
                elmOfIdRel(idOfIndex('lbl', i), itemElm).innerHTML = str;
                if (i == it.itemCnt - 1) {
                    elmOfIdRel(idOfIndex('lbl', i), itemElm).classList.remove('dropdown-down');
                }
            } else {
                elmOfIdRel(idOfIndex('lbl', i), itemElm).innerHTML = '';
                elmOfIdRel(idOfIndex('lbl', i), itemElm).classList.add('dropdown-down');
            }
            let matchedSegs = [];
            if (it.fung.match) {
                matchedSegs = it.fung.match(str, val);
            } else {
                matchedSegs = it.match(str, val);
            }
            if (matchedSegs.length > 0) {
                elmOfIdRel(idOfIndex('lbl', i), itemElm).parentElement.classList.add('matched');
            } else {
                elmOfIdRel(idOfIndex('lbl', i), itemElm).parentElement.classList.remove('matched');
            }

            if (it.height == 0) {
                it.height = itemElm.getBoundingClientRect().height;
            }
            itemElm.addEventListener('mousedown', (event) => {
                if (event.button == 0) {
                    if (i == 0 && it.offset > 0) {
                        // must be the ...
                        it.move(-1);
                        event.preventDefault();
                        return;
                    }
                    if (i == it.itemCnt - 1 && i + it.offset < it.matches.length - 1) {
                        // must be ...
                        it.move(+1);
                        event.preventDefault();
                        return;
                    }
                    it.sel(i + it.offset);
                }
            });

            itemElm.onwheel = function (event) {
                if (event.deltaY > 0) {
                    it.move(-1);
                } else if (event.deltaY < 0) {
                    it.move(1);
                }
                event.preventDefault();
            };

            itemElm.addEventListener('touchstart', (event) => {
                it.lastY = event.targetTouches[0].pageY;
            });
            itemElm.addEventListener('touchmove', (event) => {
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

            itemElm.onmouseout = function () {
                itemElm.classList.remove('active');
            };

            itemElm.onmouseover = function () {
                itemElm.classList.add('active');
            };
        });

        it.dropdowns.style.display = '';

        if (it.elm.id == 'from-hour') {
            elmOfId('from-minute-dropdowns').style.display = 'none';
        }
        if (it.elm.id == 'from-minute') {
            elmOfId('from-hour-dropdowns').style.display = 'none';
        }
    }

    setItems(items) {
        this.items = items;
        this.item = undefined;

        if (document.activeElement == this.elm) {
            this.comp();
        }
    }

    get() {
        return this.item;
    }

    set(item) {
        let it = this;
        it.item = item;
        let str = '';
        if (item || item == 0) {
            if (objValGetByKeys(it, 'fung.str')) {
                str = it.fung.str(it.item, true);
            } else {
                str = JSON.stringify(it.item);
            }
        }
        // if (it.elm.value != undefined) {
        //     it.elm.value = str;
        // } else {
        //     it.elm.innerHTML = str;
        // }

        if (objValGetByKeys(it, 'fung.sel')) {
            it.fung.sel(it.item);
        }
    }
}

class ListSqlPagedN extends Container {
    constructor(id, rootElm, fung, params) {
        super(id);
        let it = this;
        it.rootElm = rootElm;
        it.id = id;
        it.fung = fung;

        if (!params) {
            params = {
                rowsPerPage: 20,
            };
        }
        if (!params.fetchFactor) {
            params.fetchFactor = 1;
        }
        it.params = params;
        it.curPageNum = -1;
        it.pages = [];

        it.curPageSelectAllBtn = elmOfIdRel(it.id + '-cur-page-select-all-btn', it.rootElm);
        it.chartPagingBtnsBox = elmOfIdRel(it.id + '-paging-btns-box', it.rootElm.parentElement);
        it.chartNoResultNotify = elmOfIdRel(it.id + '-no-result-notify', it.rootElm.parentElement);

        // page switch btns
        it.nextBtn = elmOfIdRel(it.id + '-next-btn', it.rootElm);
        if (it.nextBtn) {
            it.nextBtn.onclick = function () {
                if (!async.isClear()) {
                    return;
                }
                it.showPageByNum(it.curPageNum + 1);
            };
        }

        it.prevBtn = elmOfIdRel(it.id + '-prev-btn', it.rootElm);
        if (it.prevBtn) {
            it.prevBtn.onclick = function () {
                if (!async.isClear()) {
                    return;
                }
                it.showPageByNum(it.curPageNum - 1);
            };
        }

        console.log('list sql paged class id,root elm', it.id, it.rootElm);

        it.listRowAdd = new AddAnother(it.id + '-row', it.rootElm, {
            fill(i, elm, listRowData) {
                it.fung.rowFill(i, elm, listRowData);
            },
            pour(i, elm) {
                if (it.fung.rowPour) {
                    return it.fung.rowPour(i, elm);
                }
            },
        });

        it.rowCounter = elmOfIdClosest('counter', it.rootElm);
        it.pageCounter = elmOfIdClosest('pages', it.rootElm);

        it.reset();
    }
    isMultiPages() {
        let isMultiPages = false;
        if (this.pages.length > 1) {
            isMultiPages = true;
        }
        // console.log('is multi pages: ', isMultiPages);
        return isMultiPages;
    }
    isFirstPage() {
        let isFirstPage = false;
        if (!this.curPageNum) {
            isFirstPage = true;
        }
        console.log('is first page: ', isFirstPage);
        return isFirstPage;
    }
    isLastPage() {
        let isLastPage = false;
        if (this.curPageNum == this.pages.length - 1) {
            isLastPage = true;
        }
        console.log('is last page: ', isLastPage);
        return isLastPage;
    }
    selectAllChecked() {
        if (this.curPageSelectAllBtn) {
            this.curPageSelectAllBtn.checked = true;
        }
    }
    reset() {
        let it = this;

        it.pagesTotal = 0;
        it.curPageNum = -1;
        it.pages = [];
        it.listRowAdd.fill([]);

        if (it.prevBtn) {
            it.prevBtn.classList.add('chart-page-btn-disable');
            it.prevBtn.disabled = true;
        }
        if (it.nextBtn) {
            it.nextBtn.classList.add('chart-page-btn-disable');
            it.nextBtn.disabled = true;
        }

        if (it.chartPagingBtnsBox) {
            elmAddClass(it.chartPagingBtnsBox, 'd-none');
        }
        if (it.chartNoResultNotify) {
            it.chartNoResultNotify.style.display = 'none';
        }
        if (it.rowCounter) {
            it.rowCounter.innerHTML = 0;
        }
        if (it.pageCounter) {
            it.pageCounter.innerHTML = 0;
        }
    }
    get requestResult() {
        return this._requestResult;
    }
    get processedRequestResult() {
        return this._processedRequestResult;
    }
    showPageByReq(pageNum) {
        let it = this;
        let newRows = [];

        if (it.pages.length < pageNum + 1) {
            it.pages.push([]);
        }
        it.pages[pageNum].sqls = it.sqls;

        it.sqls.forEach((sql) => {
            if (!sql.req) {
                return;
            }
            if (!sql.resultsSelected) {
                return;
            }
            if (sql.resultsList.length - sql.resultsIndex >= it.params.rowsPerPage + 1) {
                return;
            }
            sql.resultsList = [];
            sql.resultsIndex = -1;
            sql.resultsSelected = false;

            sql.req.rows_to_fetch = it.params.rowsPerPage * it.params.fetchFactor + 1;
            // let ses = window.localStorage.getItem('ses');
            // let ses = signIn.getSes() || window.localStorage.getItem('ses');
            let ses = it.params.ses || d.ses;

            let url;
            if (sql.req.version) url = api[stage].sqlTemplatesRun_3;
            else url = api[stage].sqlTemplatesRun_2;

            //   let url = api[stage].sqlTemplatesRun_2;
            if (ses && !it.params.noSession) {
                url += `?ses=${ses}`;
            } else {
                url += '?ses=';
            }

            rest.post(
                'list sql page ' + sql.req.sql + ' loading',
                // rest.post('list sql page ' + sql.req.sql,
                url,
                sql.req,
                (result) => {
                    it._requestResult = result;
                    if (it.fung.processRequestResult) {
                        result = it.fung.processRequestResult(result);
                        it._processedRequestResult = result;
                    }
                    Loading.hidden();
                    if (objValGetByKeys(result, 'results').length < it.params.rowsPerPage + 1) {
                        sql.req = '';
                    }
                    sql.resultsList = objValGetByKeys(result, 'results');
                    if (objValGetByKeys(result, 'results').length == 0) {
                        sql.resultsIndex = -1;
                    } else {
                        sql.resultsIndex = 0;
                        sql.resultsList.forEach((result) => {
                            result.sqlx = [sql.x];
                        });
                    }
                    sql.resultsSelected = false;

                    // new added
                    if (!objValGetByKeys(result, 'results') || objValGetByKeys(result, 'results').length == 0) {
                        if (it.chartPagingBtnsBox) {
                            it.chartPagingBtnsBox.style.display = 'none';
                        }
                        if (it.chartNoResultNotify) {
                            it.chartNoResultNotify.style.display = '';
                        }
                    } else {
                        if (it.chartPagingBtnsBox && objValGetByKeys(result, 'results').length > it.params.rowsPerPage) {
                            elmRemoveClass(it.chartPagingBtnsBox, 'd-none');
                            it.chartPagingBtnsBox.style.display = '';
                        }
                        if (it.chartNoResultNotify) {
                            it.chartNoResultNotify.style.display = 'none';
                        }
                        if (it.nextBtn) {
                            if (objValGetByKeys(result, 'results').length <= it.params.rowsPerPage) {
                                it.nextBtn.classList.add('chart-page-btn-disable');
                            } else {
                                it.nextBtn.classList.remove('chart-page-btn-disable');
                            }
                        }

                        if (it.chartPagingBtnsBox && it.nextBtn) {
                            if (!pageNum && objValGetByKeys(result, 'results').length <= it.params.rowsPerPage && it.nextBtn.classList.contains('chart-page-btn-disable')) {
                                it.chartPagingBtnsBox.style.display = 'none';
                            }
                        }
                    }
                },
                (error) => {
                    // getErrModal('error-modal').add(JSON.parse(error.responseText).errMsg); //the func is not defined,may cause error
                },
            );
        });

        async.done(() => {
            for (let i = 0; i < it.params.rowsPerPage * it.sqls.length; i++) {
                let row = '';
                let resultsIndex = -1;
                for (let j = 0; j < it.sqls.length; j++) {
                    if (it.sqls[j].resultsIndex == -1) {
                        continue;
                    }
                    if (it.sqls[j].resultsIndex >= it.sqls[j].resultsList.length) {
                        continue;
                    }
                    if (resultsIndex == -1) {
                        row = it.sqls[j].resultsList[it.sqls[j].resultsIndex];
                        resultsIndex = j;
                        continue;
                    }
                    if (it.fung.compare(row, it.sqls[j].resultsList[it.sqls[j].resultsIndex])) {
                        row = it.sqls[j].resultsList[it.sqls[j].resultsIndex];
                        resultsIndex = j;
                        continue;
                    }
                }
                if (resultsIndex == -1) {
                    break;
                }
                if (resultsIndex != -1) {
                    if (it.fung.dupFun) {
                        let dup = false;
                        for (let dx = 0; dx < newRows.length; dx++) {
                            if (it.fung.dupFun(row, newRows[dx])) {
                                newRows[dx].sqlx.push(row.sqlx[0]);
                                dup = true;
                                break;
                            }
                        }
                        if (!dup) {
                            newRows.push(row);
                        }
                    } else {
                        newRows.push(row);
                    }
                    it.sqls[resultsIndex].resultsSelected = true;
                    it.sqls[resultsIndex].resultsIndex = it.sqls[resultsIndex].resultsIndex + 1;
                }
                if (newRows.length == it.params.rowsPerPage) {
                    break;
                }
            }

            let filtedRows = [];
            if (it.fung.filtFun) {
                for (let fx = 0; fx < newRows.length; fx++) {
                    if (!it.fung.filtFun(newRows[fx])) {
                        filtedRows.push(newRows[fx]);
                    }
                }
            } else {
                filtedRows = newRows;
            }
            it.pages[pageNum].rows = filtedRows;
            // it.pages[pageNum].rows = newRows;

            for (let i = 0; i < it.sqls.length; i++) {
                if (it.sqls[i].resultsIndex >= it.sqls[i].resultsList.length) {
                    it.sqls[i].resultsIndex = -1;
                }
                if (it.sqls[i].resultsIndex == -1) {
                    it.sqls[i].req = '';
                    continue;
                }
                if (it.sqls[i].resultsIndex != -1) {
                    break;
                }
            }

            for (let i = 0; i < it.sqls.length; i++) {
                if (it.sqls[i].resultsIndex != -1 && it.sqls[i].resultsSelected && it.sqls[i].req) {
                    it.fung.prepNextPage(it.sqls[i].req, it.sqls[i].resultsList[it.sqls[i].resultsIndex], it.sqls[i].resultsList[it.sqls[i].resultsIndex - 1], pageNum);

                    if (it.pages.length < pageNum + 2) {
                        it.pages.push([]);
                    }
                    it.pages[pageNum + 1].sqls = it.sqls;
                }
            }

            it.listRowAdd.fill(it.pages[pageNum].rows);

            if (it.pages[pageNum].rows.length) {
                it.curPageNum = pageNum;
            }

            if (it.rowCounter) {
                it.rowCounter.innerHTML = parseInt(it.rowCounter.innerHTML.match(/\d*/)[0]) + it.pages[pageNum].rows.length;
            }

            if (it.pageCounter) {
                it.pageCounter.innerHTML = it.curPageNum + 1 + '/' + (it.curPageNum + 1);
            }

            if (it.nextBtn) {
                if (pageNum == it.pages.length - 1) {
                    it.nextBtn.disabled = true;
                    it.nextBtn.classList.add('chart-page-btn-disable');
                    if (it.pageCounter) {
                        it.pagesTotal = it.curPageNum + 1;
                    }
                } else {
                    it.nextBtn.disabled = false;
                    it.nextBtn.classList.remove('chart-page-btn-disable');
                    if (it.rowCounter) {
                        it.rowCounter.innerHTML += '+';
                    }
                    if (it.pageCounter) {
                        it.pageCounter.innerHTML += '+';
                    }
                }
            }
        });
    }

    showPageByNum(i) {
        let it = this;

        if (it.fung.switchPage) {
            it.fung.switchPage();
        }

        it.selectAllChecked();
        if (i >= 0 && i < it.pages.length) {
            if (it.pages[i].rows) {
                it.curPageNum = i;
                if (it.nextBtn) {
                    if (i == it.pages.length - 1) {
                        it.pagesTotal = i + 1;
                        // it.nextBtn.disabled = true;
                        it.nextBtn.classList.add('chart-page-btn-disable');
                        it.nextBtn.classList.add('chart-page-btn-disable');
                    } else {
                        // it.nextBtn.disabled = false;
                        it.nextBtn.classList.remove('chart-page-btn-disable');
                        it.nextBtn.classList.remove('chart-page-btn-disable');
                    }
                }

                if (it.prevBtn) {
                    if (!i) {
                        // it.prevBtn.disabled = true;
                        it.prevBtn.classList.add('chart-page-btn-disable');
                        it.prevBtn.classList.add('chart-page-btn-disable');
                    } else {
                        // it.prevBtn.disabled = false;
                        it.prevBtn.classList.remove('chart-page-btn-disable');
                        it.prevBtn.classList.remove('chart-page-btn-disable');
                    }
                }

                it.listRowAdd.fill(it.pages[i].rows);

                if (it.pageCounter) {
                    it.pageCounter.innerHTML = it.pageCounter.innerHTML.replace(/^\d/, i + 1);
                }
            } else {
                if (it.prevBtn) {
                    if (i > 0) {
                        // it.prevBtn.disabled = false;
                        it.prevBtn.classList.remove('chart-page-btn-disable');
                        it.prevBtn.classList.remove('chart-page-btn-disable');
                    } else {
                        // it.prevBtn.disabled = true;
                        it.prevBtn.classList.add('chart-page-btn-disable');
                        it.prevBtn.classList.add('chart-page-btn-disable');
                    }
                }

                it.showPageByReq(i);
            }
        }
    }

    showPage(request, sqlEnums) {
        let it = this;

        it.reset();
        it.request = request;
        it.sqlEnums = sqlEnums;
        it.sqls = [];
        it.sqlEnums.forEach((sqlEnum, i) => {
            let req = JSON.parse(JSON.stringify(it.request));
            req.sql = sqlEnum;
            let sql = {};
            sql.req = req;
            sql.x = i;
            sql.resultsList = [];
            sql.resultsIndex = -1;
            sql.resultsSelected = true;
            it.sqls.push(sql);
        });
        it.showPageByReq(0);
        it.fung.onShow?.();
    }
}

class AddAnother {
    // name of the elment to clone/remove when add/remove button is clicked
    // first one with id name-0 must be present in HTML, all of its sub elements do need to indexed
    // the add button must be have id of name-add and must be outside of the element hierarchyand
    // the remove button must have the id of name-remove and must be under the element
    // fung: {fill: (i, elm, value) => { fill elements under elm with value}, pour: (i, elm,) => { return value based on elements under elm}}
    constructor(name, rootElm, fung) {
        this.name = name;
        this.elm0 = elmOfIdRel(idOfIndex(name, 0), rootElm);
        this.parentElm = this.elm0.parentElement;
        this.add = elmOfIdRel(name + '-add', rootElm);
        this.fung = fung;

        let it = this;

        // if(it.fung.prep) {
        //     dataOfElm(it.elm0).obj = it.fung.prep(0, it.elm0);
        // }

        // it.fung.fill(0, it.elm0, undefined, dataOfElm(it.elm0).obj);

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
                it.focusIndexChanged(focusIndex);
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

    focusIndexChanged(focusIndex) {
        let it = this;
        if (it.fung && it.fung.focusIndexChanged) {
            it.fung.focusIndexChanged(focusIndex);
        }
    }
}

class Form extends Container {
    constructor(id) {
        super(id);
        let elm = elmOfId(id);
        let it = this;
        it.rootElm = elm;
        if (elm) {
            dataOfElm(elm).form = this;
            it.fields = new Map();
            window._fields = it.fields;
        }

        if (getElmsRelativeByTag('button', it.rootElm)) {
            getElmsRelativeByTag('button', it.rootElm).forEach((btn) => {
                // btn.setAttribute('disabled', true);
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                });
            });
        }
    }
    addField(fldInstance) {
        this.fields.set(fldInstance.elm.id, fldInstance);
    }
    validate() {
        let isFormValid = true;
        for (let [key, value] of this.fields) {
            if (!value.validate()) {
                isFormValid = false;
                console.log(key + ' component validate fail!');
                break;
            }
        }
        return isFormValid;
    }
    fil(formData) {
        this.clear();
        // the key in form data should be same as the field tmpl elm's id
        console.log('filing form: ', formData);
        if (typeof formData === 'string') formData = JSON.parse(formData);

        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                // array and obj fil codes will be comp later
                if (Array.isArray(formData[key])) {
                } else if (typeof formData[key] == 'object') {
                } else {
                    if (this.fields.get(key)) this.fields.get(key).fil(formData[key]);
                }
            }
        }
    }
    pour(formDataJson, careDirty) {
        //add condition to decide get all form datas or only dirty datas
        if (!this.isDirty()) return;

        if (formDataJson) {
            return this.buildFormData(formDataJson, careDirty);
        } else {
            let formData = {};
            this.fields.forEach((fld) => {
                fld.elm.id = fld.elm.id.replace('_repeat', '');
                formData[fld.elm.id] = fld.pour();
            });
            return formData;
        }
    }
    buildFormData(formDataJson, careDirty) {
        if (typeof formDataJson === 'string') formDataJson = JSON.parse(formDataJson);
        let formData = {};
        for (let key in formDataJson) {
            if (formDataJson.hasOwnProperty(key)) {
                if (Array.isArray(formDataJson[key])) {
                    formData[key] = [];
                    formDataJson[key].forEach((item) => {
                        let result = this.buildFormData(item);
                        if (result && Object.keys(result).length > 0) {
                            formData[key].push(result);
                        }
                    });
                    if (formData[key].length == 0) {
                        delete formData[key];
                    }
                } else if (typeof formDataJson[key] == 'object') {
                    let result = this.buildFormData(formDataJson[key]);
                    if (result && Object.keys(result).length > 0) {
                        formData[key] = result;
                    }
                } else {
                    if (!careDirty || this.fields.get(formDataJson[key]).isDirty() || key.includes('*')) {
                        formData[key] = this.fields.get(formDataJson[key]).pour();
                    }
                }
            }
        }
        return formData;
    }
    clear() {
        for (let item of this.fields.values()) {
            item.clear();
            item.preValue = '';
        }
    }
    isDirty() {
        let isFormDirty = false;
        for (let [key, value] of this.fields) {
            if (value.isDirty()) {
                isFormDirty = true;
                break;
            }
        }
        return isFormDirty;
    }
    clearDirty() {
        for (let [key, value] of this.fields) {
            value.preValue = value.pour();
        }
    }
    setDisabled(disabled) {
        Array.from(this.rootElm.querySelectorAll('input')).forEach((input) => {
            if (disabled) {
                input.setAttribute('disabled', true);
            } else {
                input.removeAttribute('disabled');
            }
        });
    }
}

class Template {
    constructor(elm, templateId) {
        let it = this;
        it.elm = elm;
        if (it.elm.children.length == 0) {
            let parent = elmOfIdRel(templateId, elmOfId('template'));
            let classes = parent.classList;
            for (let i = 0; i < classes.length; i++) {
                it.elm.classList.add(classes[i]);
            }
            let nodes = parent.childNodes;
            for (let i = 0; i < nodes.length; i++) {
                let clone = nodes[i].cloneNode(true);
                it.elm.appendChild(clone);
            }
        }
    }
}

class StepsTmpl extends Template {
    constructor(elm, slotElm) {
        super(elm, 'steps-tmpl-');
        let it = this;
        it.currentStep = 0;
        it.stepCount = 0;
        it.stepItems = new Map();
        it.progressStepsElm = elmOfIdRel('progress-steps', it.elm);
        it.progressStepsElm.innerHTML = '';
        it.slot = elmOfIdRel('slot', it.elm);
        it.slot.innerHTML = '';
        it.slot.appendChild(slotElm);
        it.slot.firstElementChild.style.removeProperty('display');
        it.closeBtn = elmOfIdRel('close-btn', it.elm);
        it.prevBtn = elmOfIdRel('step-prev-btn', it.elm);
        it.nextBtn = elmOfIdRel('step-next-btn', it.elm);
        it.okBtn = elmOfIdRel('step-ok-btn', it.elm);

        elmActOnClick(it.closeBtn, () => {
            it.hide();
        });

        let slotChild = it.slot.firstElementChild;
        it.stepCount = slotChild.children.length;
        for (let i = 0; i < it.stepCount; i++) {
            let stepItem = document.createElement('li');
            stepItem.classList.add('step-item');
            stepItem.id = 'step-item-' + i;
            // elmActOnClick(stepItem, () => {
            //     it.currentStep = 0;
            //     it.showStep(i)
            // });
            it.stepItems.set(i, stepItem);
            it.progressStepsElm.appendChild(stepItem);
        }

        it.showStep(0);
        it.hide();
    }
    showStep(offset) {
        let it = this;
        changeDisplay(it.prevBtn, 'none');
        let nextStep = it.currentStep + offset;
        if (nextStep < 0 || nextStep > it.stepCount) {
            return;
        }
        if (it.stepCount > 1) {
            if (nextStep === 0) {
                // changeDisplay(it.prevBtn, 'none');
                changeDisplay(it.nextBtn, 'block');
                changeDisplay(it.okBtn, 'none');
            } else if (nextStep === it.stepCount - 1) {
                // changeDisplay(it.prevBtn, 'block');
                changeDisplay(it.nextBtn, 'none');
                changeDisplay(it.okBtn, 'block');
            } else {
                // changeDisplay(it.prevBtn, 'block');
                changeDisplay(it.nextBtn, 'block');
                changeDisplay(it.okBtn, 'none');
            }
        } else if (it.stepCount === 1) {
            changeDisplay(it.progressStepsElm, 'none');
            // changeDisplay(it.prevBtn, 'none');
            changeDisplay(it.nextBtn, 'none');
            changeDisplay(it.okBtn, 'block');
        }
        let slotChild = it.slot.firstElementChild;
        if (slotChild) {
            for (let i = 0; i < slotChild.children.length; i++) {
                if (i === nextStep) {
                    slotChild.children[i].style.display = 'block';
                } else {
                    slotChild.children[i].style.display = 'none';
                }
            }
        }

        it.stepItems.forEach((item, index) => {
            if (index === nextStep) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        it.currentStep = nextStep;
    }
    show(callback) {
        callback && callback();
        changeDisplay(this.elm, 'block');
        this.currentStep = 0;
        this.showStep(0);
    }
    hide(callback) {
        callback && callback();
        changeDisplay(this.elm, 'none');
    }
}

class SwitchButtonTmpl extends Template {
    constructor(elm, fung = {}) {
        super(elm, 'switch-btn-tmpl-');
        this.checkbox = getElmsRelativeByTag('input', this.elm)[0];
        this.checkbox.addEventListener('change', (e) => {
            if (fung.change) {
                fung.change(e.target.checked, e.target);
            }
        });
    }
    fill(value) {
        this.checkbox.checked = value;
    }
    pour() {
        return this.checkbox.checked;
    }
}

class LinkButtonTmpl extends Template {
    constructor(elm, fung = {}, trRootId) {
        super(elm, 'link-btn-tmpl-');
        this.lbl = getElmsRelativeByTag('label', this.elm)[0];
        elmActOnClick(this.lbl, () => {
            if (fung.click) {
                fung.click(this.lbl.innerText);
            }
        });
        if (trRootId) {
            elmOfId(trRootId).dataset.lang = undefined;
            translate2(trRootId, localStorage.getItem('lang'));
        }
    }
    fill(value) {
        this.lbl.innerText = value;
    }
    pour() {
        return this.lbl.innerText;
    }
}

class MessageBoxTmpl extends Template {
    constructor(elm) {
        super(elm, 'message-box-tmpl-');
        this.elm = elm;
        this.container = elmOfIdRel('container', this.elm);
        this.header = elmOfIdRel('header', this.elm);
        this.icon = elmOfIdRel('icon', this.elm);
        this.titleBox = elmOfIdRel('lbl-title', this.elm);
        this.title = elmOfIdRel('title-var-0', this.elm);
        this.closeBtn = elmOfIdRel('close-btn', this.elm);
        this.body = elmOfIdRel('body', this.elm);
        this.tip = elmOfIdRel('var-0', this.elm);
        this.content = elmOfIdRel('content', this.elm);
        this.footer = elmOfIdRel('footer', this.elm);
        this.cancelBtn = elmOfIdRel('cancel-btn', this.elm);
        this.confirmBtn = elmOfIdRel('confirm-btn', this.elm);
        this.hide();
    }
    setStyle(styles = {}) {
        // default styles
        switch (styles.type) {
            case 'prompt':
                changeDisplay(this.header, '');
                changeDisplay(this.content, '');
                changeDisplay(this.footer, '');
                changeDisplay(this.cancelBtn, 'none');
                changeDisplay(this.confirmBtn, '');
                break;
            case 'alert':
                changeDisplay(this.header, '');
                changeDisplay(this.content, 'none');
                changeDisplay(this.footer, '');
                changeDisplay(this.cancelBtn, 'none');
                changeDisplay(this.confirmBtn, '');
                break;
            case 'tip':
                changeDisplay(this.header, 'none');
                changeDisplay(this.content, 'none');
                changeDisplay(this.footer, 'none');
                changeDisplay(this.cancelBtn, 'none');
                changeDisplay(this.confirmBtn, 'none');
                break;
            default:
                changeDisplay(this.header, '');
                changeDisplay(this.content, '');
                changeDisplay(this.footer, '');
                changeDisplay(this.cancelBtn, '');
                changeDisplay(this.confirmBtn, '');
        }
        styles.width ? (this.container.style.width = styles.width) : '';
        styles.marginBottom ? (this.body.style.marginBottom = styles.marginBottom) : '';

        // set margin
        styles.headerMargin ? (this.header.style.margin = styles.headerMargin) : '';
        styles.bodyMargin ? (this.body.style.margin = styles.bodyMargin) : '';
        styles.footerMargin ? (this.footer.style.margin = styles.footerMargin) : '';

        // set align
        styles.tipAlign ? (this.body.style.textAlign = styles.tipAlign) : '';
        styles.titleAlign ? (this.titleBox.style.textAlign = styles.titleAlign) : '';

        // set element hide
        styles.hideHeader ? changeDisplay(this.header, 'none') : '';
        styles.hideCloseBtn ? changeDisplay(this.closeBtn, 'none') : '';
        styles.hideTitleBox ? changeDisplay(this.titleBox, 'none') : '';
        styles.hideTitle ? changeDisplay(this.title, 'none') : '';

        styles.hideBody ? changeDisplay(this.body, 'none') : '';
        styles.hideTip ? changeDisplay(this.tip, 'none') : '';
        styles.hideContent ? changeDisplay(this.content, 'none') : '';

        styles.hideFooter ? changeDisplay(this.footer, 'none') : '';
        styles.hideCancelBtn ? changeDisplay(this.cancelBtn, 'none') : '';
        styles.hideConfirmBtn ? changeDisplay(this.confirmBtn, 'none') : '';

        // set icon
        if (styles.iconClass && styles.iconClass.length > 0) {
            this.icon.firstElementChild.classList.add(...styles.iconClass);
            changeDisplay(this.icon, '');
        } else {
            let classes = this.icon.firstElementChild.classList;
            this.icon.firstElementChild.classList.remove(...classes);
            changeDisplay(this.icon, 'none');
        }
    }
    show(opts = {}, preAppendElmFn = undefined) {
        let it = this;
        changeDisplay(it.elm, '');
        it.tip.innerHTML = opts.tip || '';
        it.content.innerText = opts.content || '';
        it.title && (it.title.innerText = opts.title || '');
        it.setStyle(opts);
        if (preAppendElmFn) {
            preAppendElmFn(it.body);
        }
        opts.close
            ? elmActOnClick(it.closeBtn, () => {
                opts.close();
            })
            : elmActOnClick(it.closeBtn, () => {
                it.hide();
            });

        if (opts.cancel) {
            elmActOnClick(it.cancelBtn, () => {
                opts.cancel();
            });
        }
        if (opts.confirm) {
            elmActOnClick(it.confirmBtn, () => {
                opts.confirm();
            });
        }
        if (opts.autoClose) {
            changeDisplay(it.closeBtn, 'none');
            setTimeout(() => {
                it.hide();
            }, opts.autoClose);
        }
        if (typeof _langCode !== 'undefined') {
            it.elm.dataset.lang = undefined;
            translate2(it.elm.id, _langCode);
        }
    }
    hide() {
        changeDisplay(this.elm, 'none');
    }
}

class BreadCrumbsTmpl extends Template {
    constructor(elm) {
        super(elm, 'bread-crumbs-tmpl-');
        this.elm = elm;
        this.itemTemp = elmOfIdRel('bread-crumbs-item-', this.elm);
        this.slashTemp = elmOfIdRel('bread-crumbs-slash-', this.elm);
        this.rootBreadCrumbs = [];
        this.childBreadCrumbs = [];
        this.fullBreadCrumbs = [];
    }
    go(ids) {
        if (typeof ids === 'number' && ids === -1 && this.childBreadCrumbs.length > 0) {
            this.childBreadCrumbs.pop();
            this.updateItems(this.rootBreadCrumbs.concat(this.childBreadCrumbs));
        } else if (Array.isArray(ids)) {
            this.childBreadCrumbs = ids;
            const newIds = this.rootBreadCrumbs.concat(ids);
            this.updateItems(newIds);
        }
    }
    setRoot(valArr) {
        this.rootBreadCrumbs = valArr;
        this.updateItems(valArr);
    }
    getCurrentPath() {
        return this.fullBreadCrumbs;
    }
    updateItems(array) {
        this.fullBreadCrumbs = array;
        this.elm.innerHTML = '';
        array.forEach((v, index) => {
            const item = this.itemTemp.cloneNode();
            item.setAttribute('id', v.id);
            item.innerHTML = t('breadcrumbs', v.id);
            // set current url style
            if (index == array.length - 1) {
                item.classList.add('current');
            } else {
                item.classList.remove('current');
            }
            // set node click
            if (typeof v.click == 'function') {
                item.onclick = () => {
                    const breadCrumbsList = this.rootBreadCrumbs.concat(this.childBreadCrumbs);
                    const curbreadCrumbsIndex = breadCrumbsList.findIndex((v2) => v.id === v2.id);
                    breadCrumbsList.splice(curbreadCrumbsIndex + 1);
                    this.updateItems(breadCrumbsList);
                    v.click();
                };
            }
            // is add /
            if (index < array.length - 1) {
                const slash = this.slashTemp.cloneNode();
                slash.setAttribute('id', slash.id + index);
                slash.innerHTML = '/';
                this.elm.append(item, slash);
            } else {
                this.elm.append(item);
            }
        });
    }
}

class FieldTmpl extends Template {
    constructor(elm, fung, tmplId) {
        super(elm, tmplId);
        let it = this;
        // it.dataKey = elm.dataset.key ? elm.dataset.key : elm.id ? elm.id : elm.name ? elm.name : '';
        it.preValue = undefined;
        it.elm = elm;
        it.fung = fung;
        it.warnElm = getElmsRelativeByTag('span', elm)[0];
        it.labelElm = getElmsRelativeByTag('label', elm)[0];
        it.inputElm = getElmsRelativeByTag('input', elm)[0] || getElmsRelativeByTag('textarea', elm)[0];

        it.formAncester = elmOfDataClosest('form', it.elm);
        if (it.formAncester) dataOfElm(it.formAncester).form.addField(it);
        elmAddClass(it.elm, 'tmpl-field-container'); // for universe field tmpl css

        it.inputElm.setAttribute('autocomplete', 'off');
        it.inputElm.addEventListener('focus', () => {
            it.mobileLocTop();
        });

        it.required = true;
        it.isValiNecess = true;
        it.disableDirty = false;
    }
    validate() {
        if (!this.isValiNecess) return true;

        let passedVali = false;
        if (this.filledVali()) {
            passedVali = true;
            if (this.fung && this.fung.valiFun) passedVali = this.fung.valiFun(this.pour());
        } else if (!this.required) passedVali = true;

        if (passedVali) this.hideWarn();
        else this.showWarn();

        return passedVali;
    }
    filledVali() {
        if (!this.pour()) return;
        else return true;
    }
    isDirty() {
        if (this.disableDirty) return true;
        let pourValue = this.pour();
        if (typeof pourValue === 'object' || Array.isArray(pourValue)) {
            return JSON.stringify(pourValue) !== JSON.stringify(this.preValue);
        }
        if ((this.preValue === '' || this.preValue === undefined) && (pourValue === undefined || pourValue === '')) {
            return false;
        } else {
            return this.preValue !== pourValue; //changed
        }
    }
    showWarn() {
        elmAddClass(this.elm, 'red-border');
        changeDisplay(this.warnElm, '');
        this.mobileLocTop();
    }
    hideWarn() {
        elmRemoveClass(this.elm, 'red-border');
        changeDisplay(this.warnElm, 'none');
    }
    mobileLocTop() {
        if ($(window).width() < 768) {
            this.elm.scrollIntoView(true);
        }
    }
    setLbl(lblValue) {
        this.labelElm.innerHTML = lblValue;
    }
    setPlaceholder(placeholderValue) {
        this.inputElm.placeholder = placeholderValue;
    }
    setLblAPlaceholder(lblValue, placeholderValue) {
        this.setLbl(lblValue);
        this.setPlaceholder(placeholderValue);
    }
    setLblAInput(lblValue, inputValue) {
        this.setLbl(lblValue);
        this.set(inputValue);
    }
    fil(value) {
        if (typeof value === 'number') {
            value = value.toString();
        }
        if (!value) {
            this.inputElm.value = '';
        } else {
            this.inputElm.value = value;
        }
        this.preValue = value;
    }
    clear() {
        this.fil('');
        this.hideWarn();
    }
}

class UploadImageTmpl extends FieldTmpl {
    constructor(elm, items = {}, opts = {}, fung, miniUploadQuantity = 1) {
        super(elm, fung, 'upload-image-tmpl-');
        let it = this;
        it.imgEntrys = new Map();
        it.preValue = [];
        // it.uploadFileElms = [];
        // it.currentFileIdx = 0
        it.isValiNecess = false;
        it.miniUploadQuantity = miniUploadQuantity;
        it.required = opts?.noRequired ? false : true
        elmAddClass(it.elm, 'tmpl-field-container');
        it.warn = elmOfIdRel('warn-', it.elm);
        console.log('init UploadImageTmpl');
        let imgEntryContainer = elmOfIdRel('img-entry-container', it.elm);
        let imgFile = elmOfIdRel('img-file-0', imgEntryContainer);
        let imgEntry = elmOfIdRel('img-entry-0', imgEntryContainer);
        elmOfIdRel('lbl-', it.elm).innerText = items.localizedName;
        // imgEntryContainer.removeChild(imgFile);
        // imgEntryContainer.removeChild(imgEntry);
        imgEntryContainer.innerHTML = '';
        for (let i = 0; i < items.num; i++) {
            let newImgFile = imgFile.cloneNode(true);
            let newImgEntry = imgEntry.cloneNode(true);
            newImgEntry.id = 'img-entry-' + i;
            newImgEntry.imgSeq = i;
            newImgEntry.opts = opts;
            newImgEntry.uploadedImg = undefined;
            elmAddClass(newImgEntry, items.name + '-' + i);

            newImgFile.newImgEntry = newImgEntry;
            newImgFile.image2base64 = this.image2base64;
            // newImgFile.uploadIt = this
            newImgFile.addEventListener('change', this.fileSelectHandler, false);
            elmActOnClick(newImgEntry, () => {
                if (fung && fung.click) {
                    fung.click(newImgFile);
                    // if (fung.click())
                    //     if (opts.resId) {
                    //         newImgFile.click();
                    //     } else {
                    //         console.log('opts missing resID parameter');
                    //     }
                } else {
                    newImgFile.click();
                }
            });
            // it.uploadFileElms.push(newImgFile)
            imgEntryContainer.appendChild(newImgFile);
            imgEntryContainer.appendChild(newImgEntry);
            it.imgEntrys.set(newImgEntry.id, newImgEntry);
        }
    }
    fileSelectHandler(e) {
        let files = e.target.files || e.dataTransfer.files;
        let url = URL.createObjectURL(files[0]);
        // this.newImgEntry.style.setProperty('background-image', 'url(' + url + ')');
        this.image2base64(files[0]);
    }

    image2base64(fileUrl) {
        loadJsSync('com_blob');
        const MIME_TYPE = 'image/jpeg';
        const QUALITY = 0.1;
        const imgObj = new Image();
        imgObj.src = URL.createObjectURL(fileUrl);
        imgObj.onerror = () => {
            URL.revokeObjectURL(fileUrl);
            console.log('image load failed');
        };
        // this.uploadIt.setCurrentFileIdx(1, true)
        imgObj.onload = () => {
            URL.revokeObjectURL(fileUrl);
            const canvas = document.createElement('canvas');
            canvas.width = imgObj.naturalWidth;
            canvas.height = imgObj.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imgObj, 0, 0, imgObj.naturalWidth, imgObj.naturalHeight);
            canvas.toBlob(
                (blob) => {
                    let reader = new FileReader();
                    reader.onloadend = (e) => {
                        let opts = this.newImgEntry.opts;
                        // upload image using file mode
                        uploadImageByFileMode(
                            objValGetByKeys(opts, 'resType'),
                            objValGetByKeys(opts, 'resId'),
                            objValGetByKeys(opts, 'tag'),
                            this.newImgEntry.imgSeq,
                            // this.uploadIt.currentFileIdx,
                            e.target.result,
                            objValGetByKeys(opts, 'token'),
                            (e) => {
                                this.newImgEntry.style.setProperty('background-image', 'url(' + URL.createObjectURL(fileUrl) + ')');
                                let file_ref = objValGetByKeys(JSON.parse(e), 'file_ref');
                                this.newImgEntry.uploadedImg = {
                                    size: objValGetByKeys(file_ref, 'file_url.size'),
                                    type: objValGetByKeys(file_ref, 'file_url.type'),
                                    tag: objValGetByKeys(file_ref, 'tag'),
                                    no: objValGetByKeys(file_ref, 'no'),
                                    vehicle_id: objValGetByKeys(file_ref, 'resource_id'),
                                    key: objValGetByKeys(file_ref, 'file_url.url').split('.com/')[1],
                                    hash: objValGetByKeys(file_ref, 'file_url.url_hash'),
                                };
                                console.log('upload img success', this.newImgEntry.uploadedImg);
                            },
                            (e) => {
                                console.log(e);
                            },
                        );
                    };
                    reader.readAsDataURL(blob);
                },
                MIME_TYPE,
                QUALITY,
            );
        };
    }

    getImages(images = []) {
        let it = this;
        if (images) {
            it.preValue = [];
            images.forEach((image, index) => {
                // let imgEntry = elmOfIdRel('img-entry-' + index, it.elm);
                // let imgEntry = it.imgEntrys.get('img-entry-' + index);
                let imgEntry = it.imgEntrys.get('img-entry-' + image.no || index);
                if (imgEntry) {
                    it.preValue.push(image);
                    rest.post(
                        'get image',
                        api[stage].fileUrls,
                        {
                            key: image.key,
                            hash: image.hash,
                        },
                        (data) => {
                            imgEntry.style.setProperty('background-image', 'url(' + data.url + ')');
                            imgEntry.uploadedImg = image;
                        },
                    );
                }
            });
            // it.preValue = JSON.stringify(it.preValue);
        } else {
            it.reset();
        }
    }

    /* setCurrentFileIdx(idx, isReaddition) {
        if(typeof idx !== 'number') return
        this.currentFileIdx = isReaddition ? this.currentFileIdx + idx : idx
    } */

    reset() {
        this.imgEntrys.forEach((imgEntry, key) => {
            imgEntry.uploadedImg = undefined;
            imgEntry.style.removeProperty('background-image');
        });
    }
    pour() {
        let uploadedimgs = [];
        let imgEntrysLength = 0;
        this.imgEntrys.forEach((imgEntry, key) => {
            if (imgEntry.uploadedImg) {
                uploadedimgs.push(imgEntry.uploadedImg);
            }
            imgEntrysLength++;
        });
        // console.log(`~ ${this.elm.id} - UploadImageTmpl ~ pour ~`, uploadedimgs)
        // console.log(`~ ${this.elm.id} - UploadImageTmpl ~ pre value ~`, this.preValue)

        if (uploadedimgs.length >= this.miniUploadQuantity) {
            return uploadedimgs;
        } else {
            return;
        }
    }
}

class RadioFieldTmpl extends FieldTmpl {
    constructor(elm, fung = {}, opts = {}) {
        super(elm, fung, 'input-radio-field-tmpl-');
        let it = this;
        it.selectValue;
        let radioContainer = elmOfIdRel('radio-container', elm);
        let radioLbl = elmOfIdRel('radio-lbl-', this.elm);
        let radioItem = elmOfIdRel('radio-item-', this.elm);
        radioContainer.removeChild(radioLbl);
        radioLbl.removeChild(radioItem);
        const name = Math.random().toString(36).slice(-6);
        for (let i = 0; i < opts.items.length; i++) {
            let newRadioLbl = radioLbl.cloneNode(true);
            newRadioLbl.id = 'radio-lbl-' + i;
            let newRadioItem = radioItem.cloneNode(true);
            newRadioItem.id = 'radio-item-' + i;
            newRadioItem.name = `radio-item-${name}`;
            newRadioItem.value = objValGetByKeys(opts.items[i], 'value');
            newRadioItem.style.backgroundColor = objValGetByKeys(opts.items[i], 'backgroundColor');

            newRadioLbl.appendChild(newRadioItem);
            const desc = document.createElement('div');
            desc.style.display = 'inline';
            desc.setAttribute('name', 'radio-desc');
            desc.innerHTML = objValGetByKeys(opts.items[i], 'label');
            newRadioLbl.append(desc);
            radioContainer.appendChild(newRadioLbl);
        }
        radioContainer.addEventListener('click', function (e) {
            if (e.target.tagName == 'INPUT') {
                it.selectValue = e.target.value;
                changeDisplay(it.warnElm, 'none');
                elmRemoveClass(it.elm, 'red-border');
                fung.selFun?.(e.target.value);
            }
        });
    }
    pour() {
        return this.selectValue;
    }
    fil(value) {
        let rdiItems = getElmsRelativeByClass('radio-item', this.elm);
        for (let i = 0; i < rdiItems.length; i++) {
            const rdiItem = rdiItems[i];
            if (rdiItem.value === value) {
                rdiItem.checked = true;
            } else {
                rdiItem.checked = false;
            }
        }
        this.selectValue = value;
        this.preValue = value;
    }
    setReadonly(isReadonly) {
        let rdiItems = getElmsRelativeByClass('radio-item', this.elm);
        if (isReadonly) {
            for (let i = 0; i < rdiItems.length; i++) {
                const rdiItem = rdiItems[i];
                rdiItem.setAttribute('disabled', true);
            }
        } else {
            for (let i = 0; i < rdiItems.length; i++) {
                const rdiItem = rdiItems[i];
                rdiItem.removeAttribute('disabled');
            }
        }
    }
}

class InputFieldTmpl extends FieldTmpl {
    constructor(elm, fung) {
        super(elm, fung, 'input-field-tmpl-');
        this.inputElm.addEventListener('input', () => {
            if (this.pour()) {
                this.hideWarn();
            }
        });
    }
    get() {
        return this.inputElm.value.trim();
    }
    set(value) {

        super.fil(value);
    }
    setReadonly(isReadonly) {
        this.inputElm.readOnly = isReadonly;
        this.inputElm.disabled = isReadonly;
    }
    pour() {
        return this.get();
    }
    fil(value) {
        super.fil(value);
    }
}

class TxtFieldTmpl extends FieldTmpl {
    constructor(elm, fung) {
        super(elm, fung, 'txt-field-tmpl');
        this.inputElm.addEventListener('input', () => {
            if (this.pour()) {
                this.hideWarn();
            }
        });
    }
    get() {
        return this.inputElm.value.trim();
    }
    set(value) {
        super.fil(value);
    }
    setReadonly(isReadonly) {
        this.inputElm.readOnly = isReadonly;
        this.inputElm.disabled = isReadonly;
    }
    pour() {
        return this.get();
    }
    fil(value) {
        super.fil(value);
    }
}

class InputIconFieldTmpl extends FieldTmpl {
    constructor(elm, fung) {
        super(elm, fung, 'input-icon-field-tmpl-');
        let it = this;
        it.inputElm.addEventListener('input', () => {
            if (it.pour()) {
                it.hideWarn();
            }
        });
        it.inputIcon = elmOfIdRel('input-icon', it.elm);
        if (it.fung && it.fung.iconClickFun) {
            it.inputIcon.onclick = it.fung.iconClickFun;
            it.inputElm.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    it.fung.iconClickFun();
                }
            });
        }
    }
    get() {
        return this.inputElm.value.trim();
    }
    set(value) {
        super.fil(value);
    }
    pour() {
        return this.get();
    }
    fil(value) {
        super.fil(value);
    }
}

class CheckerFieldTmpl extends FieldTmpl {
    constructor(elm, fung) {
        super(elm, fung, 'checker-field-tmpl-');

        let it = this;
        it.checkers = new AddAnother('checker', it.elm, {
            fill: (i, checkerElm, checkerData) => {
                let checkerBtn = elmOfNameRel('checker-btn', checkerElm);
                let checkerLbl = elmOfNameRel('checker-lbl', checkerElm);

                checkerBtn.id = `checker-btn-${i}`;
                checkerLbl.id = `checker-lbl-${i}`;
                checkerLbl.setAttribute('for', checkerBtn.id);

                checkerBtn.addEventListener('change', function () {
                    if (this.checked) it.hideWarn();
                });
            },
            pour: (i, checkerElm) => {
                if (elmOfNameRel('checker-btn', checkerElm).checked) return elmOfNameRel('checker-lbl', checkerElm).innerText;
            },
        });

        let initCheckesLen = new Array(2);
        it.checkers.fill(initCheckesLen);
    }
    setCheckers(i) {
        let checkersLen = new Array(i);
        this.checkers.fill(checkersLen);
    }
    setType(type) {
        getElmsRelativeByName('checker-btn', this.elm).forEach((checkerBtn) => {
            checkerBtn.type = type;
        });
    }

    fil(value) {
        console.log('checker filing: ', value);
        let checkers = getElmsRelativeByName('checker', this.elm);
        for (let i = 0; i < checkers.length; i++) {
            if (elmOfNameRel('checker-lbl', checkers[i]).innerHTML.trim().toUpperCase() == value.toUpperCase()) {
                elmOfNameRel('checker-btn', checkers[i]).checked = true;
                break;
            }
        }
    }
    pour() {
        let checkerResult = this.checkers.pour();
        // if (checkerResult.length == 1)
        checkerResult = checkerResult[0];

        return checkerResult;
    }
    clear() {
        getElmsRelativeByName('checker-btn', this.elm).forEach((checkerBtn) => {
            checkerBtn.checked = false;
        });
        super.clear();
    }
}

function validateFn(data, rules) {
    let vResult = true;
    if (rules) {
        let ruleList = rules.split('|');
        for (let item of ruleList) {
            let rule = item.split(':');
            let key = rule[0];
            let vRule = rule[1];
            let ruleFn = objValGetByKeys(validateRules, key);
            vResult = ruleFn ? vResult & ruleFn(data, vRule, this) : vResult;
        }
    }
    return vResult;
}

validateRules = {
    required: (value, rule) => {
        return value === undefined || value === null || value === '' ? false : true;
    },
    repeat: (value, rule, self) => {
        return value === self.repeatField.pour();
    },
    email: (value) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    },
    number: (value, rule) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    min: (value, rule) => {
        return value.length >= parseInt(rule) ? true : false;
    },
    max: (value, rule) => {
        return value.length <= parseInt(rule) ? true : false;
    },
    minmax: (value, rule) => {
        let min = rule.split(',')[0];
        let max = rule.split(',')[1];
        return value.length >= parseInt(min) && value.length <= parseInt(max) ? true : false;
    },
};
class DateFieldTmpl extends FieldTmpl {
    constructor(elm, fung) {
        super(elm, fung, 'date-field-tmpl-');
        this.calendar = new Calendar(this.inputElm, (year, month, date) => {
            if (year && month && date) {
                this.hideWarn();
            }
            fung && fung(year, month, date);
        });
    }
    fil(value) {
        super.fil(value);
    }
    pour() {
        return this.inputElm.value.trim();
    }
}

class DateRangeFieldTmpl extends FieldTmpl {
    constructor(elm, fung) {
        super(elm, fung, 'date-range-field-tmpl-');
        // this.calendar = new Calendar(this.inputElm, (year, month, date) => {
        //     if (year && month && date) {
        //         this.hideWarn();
        //     }
        // });

        let it = this;
        it.startDate = elmOfIdRel('start-date', it.elm);
        // it.startDate.setAttribute('placeholder', Object.values(it.uiInfo)[0][0]);
        fldDigitsDividedBy(it.startDate, '-');
        it.startDateCalendar = new CalendarForPair(it.startDate, (year, month, date) => {
            it.startDateCalendar.setSelectedTime(year, month, date);
            // changeDisplay(elmOfNameClosest('clear-btn', it.startDate), '');
        });
        it.startDateCalendar.isStart = true;
        it.endDate = elmOfIdRel('end-date', it.elm);
        // it.endDate.setAttribute('placeholder', Object.values(it.uiInfo)[0][1]);
        fldDigitsDividedBy(it.endDate, '-');
        it.endDateCalendar = new CalendarForPair(it.endDate, (year, month, date) => {
            it.endDateCalendar.setSelectedTime(year, month, date);
            // changeDisplay(elmOfNameClosest('clear-btn', it.startDate), '');
        });
        it.endDateCalendar.isEnd = true;
        it.startDateCalendar.endCalendar = it.endDateCalendar;
        it.endDateCalendar.startCalendar = it.startDateCalendar;
    }
    fil(startDate, endDate) {
        this.startDate.value = startDate;
        this.endDate.value = endDate;
    }
    pour() {
        let dateRange = {};
        if (this.startDate.value.trim()) {
            let start_date_str = this.startDate.value.trim() + ' 00:00:00';
            dateRange.time_str_start = start_date_str;
            dateRange.from_utc_start = Date.parse(start_date_str) / 1000 - 3600 * 24;
        }
        if (this.endDate.value.trim()) {
            let end_date_str = this.endDate.value.trim() + ' 23:59:59';
            dateRange.time_str_end = end_date_str;
            dateRange.from_utc_end = Date.parse(end_date_str) / 1000 + 3600 * 24;
        }
        return dateRange;
    }
}

class TextAutoCompFieldTmpl extends FieldTmpl {
    constructor(elm, fung, opts, tmpId) {
        if (!tmpId) tmpId = 'text-auto-comp-field-tmpl-';
        super(elm, fung, tmpId);
        let it = this;
        this.opts = opts;
        it.dropdownContainer = getElmsRelativeByClass('dropdown', it.elm)[0];
        let dropdownItem = getElmsRelativeByClass(`${elm.getAttribute('name')}`, it.formAncester)[0];
        let clone = dropdownItem.cloneNode(true);
        changeDisplay(clone, '');
        it.dropdownContainer.appendChild(clone);

        it.txtAutoComp = new TextAutoCompSql(
            it.inputElm,
            {
                str: (item, selected, selItems) => {
                    return fung.strFun(item, selected, selItems);
                },
                sel: (item) => {
                    if (item) {
                        it.hideWarn();
                        return fung.selFun(item);
                    }
                },
                matchExact: (item, val) => {
                    if (fung.matchExactFun) return fung.matchExactFun(item, val);
                },
            },
            { sql: objValGetByKeys(opts, 'sql') },
        );

        if (objValGetByKeys(opts, 'items') && !objValGetByKeys(opts, 'sql')) {
            it.txtAutoComp.setItems(opts.items);
        }
    }
    setItems(items) {
        this.txtAutoComp.setItems(items);
    }
    setFilter(isFilter) {
        this.txtAutoComp.filter = isFilter;
    }
    fil(item) {
        this.txtAutoComp.set(item, true);
        this.preValue = item;
    }
    setReadonly(isReadonly) {
        this.inputElm.readOnly = isReadonly;
        this.inputElm.disabled = isReadonly;
    }
    pour() {
        // const compValue = this.txtAutoComp.get() ?
        //     this.txtAutoComp.get() :
        //     this.txtAutoComp.items.filter((item) =>
        //         Object.values(item).includes(this.inputElm.value)
        //     )[0];
        let compValue = this.txtAutoComp.get();
        if (!compValue || compValue.length == 0) {
            compValue = this.txtAutoComp.items.filter((item) => this.inputElm.value.includes(item.name));
        }
        const pourValue = this.opts.pourPrimitive ? Object.values(compValue || '')[0] : compValue;
        // if (this.txtAutoComp.get())
        if (pourValue && Array.isArray(pourValue)) {
            if (pourValue.length > 0) return pourValue;
            else return '';
        } else return pourValue;
    }
    clear() {
        this.txtAutoComp.clear();
    }
}

class CellCountryCodeFieldTmpl extends TextAutoCompFieldTmpl {
    constructor(elm, fung, opts) {
        super(elm, fung, opts, 'cell-country-code-field-tmpl-');
        this.inputValueElm = getElmsRelativeByTag('input', elm)[1];
        this.inputValueElm.addEventListener('input', () => {
            this.hideWarn();
        });
    }
    pour() {
        if (this.txtAutoComp.get() && this.inputValueElm.value.trim()) {
            let pourValue = Object.assign(this.txtAutoComp.get(), {
                cell: this.inputValueElm.value.trim(),
            });
            return pourValue;
        } else return;
    }
    fil(value) {
        this.preValue = value;
        let newValue = JSON.parse(JSON.stringify(value));
        this.inputValueElm.value = objValGetByKeys(value, 'cell');
        delete newValue.cell;
        this.txtAutoComp.set(newValue);
    }
    clear() {
        this.inputValueElm.value = '';
        this.txtAutoComp.clear();
    }
}

class IntInputFieldTmpl extends InputFieldTmpl {
    constructor(elm) {
        super(elm);
        fldDigitsOnly(this.inputElm);
    }

    pour() {
        if (super.pour()) return parseInt(super.pour());
        else return;
    }
}

class DecimalInputFieldTmpl extends InputFieldTmpl {
    constructor(elm) {
        super(elm);
        fldDecimalOnly(this.inputElm);
    }

    pour() {
        return parseFloat(super.get());
    }
}

class MoneyInputFieldTmpl extends InputFieldTmpl {
    constructor(elm) {
        super(elm);
        fldMoneyOnly(this.inputElm);
    }

    pour() {
        let value = super.get();
        if (!value) {
            return 0.0;
        }
        return parseFloat(value);
    }
}

class RadioInputFieldTmpl extends InputFieldTmpl {
    constructor(elm, data) {
        super(elm);

        this.inputElm.name = 'input-radio';
        this.inputElm.type = 'radio';
        this.inputElm.value = 0;
        this.inputElm.style.display = '';

        this.radioBox = document.createElement('div');
        let radioBoxItem = document.createElement('label');
        radioBoxItem.appendChild(this.inputElm);
        this.radioBox.appendChild(radioBoxItem);
        elm.appendChild(this.radioBox);

        this.radioBox.id = 'input-radio-box';
        this.radioBox.setAttribute('name', 'input-radio-box');
        this.radioBox.classList.add('input-radio-box');

        radioBoxItem.id = 'input-radio-box-item-0';
        radioBoxItem.setAttribute('name', 'input-radio-box-item');

        this.inputRadioAdd = new AddAnother('input-radio-box-item', elm, {
            fill: (i, radioBoxItemElm, data) => {
                if (data) {
                    radioBoxItemElm.innerHTML = elmOfNameRel('input-radio', radioBoxItemElm).outerHTML;
                    elmOfNameRel('input-radio', radioBoxItemElm).value = data.tag;
                    radioBoxItemElm.appendChild(document.createTextNode(data.label));
                    radioBoxItemElm.classList.add('input-radio-box-item');
                }
            },
            pour: (i, radioBoxItemElm) => {
                let rbie = elmOfNameRel('input-radio', radioBoxItemElm);
                if (rbie.checked) {
                    return { type: rbie.value };
                }
            },
        });
        this.inputRadioAdd.fill(data);
    }
    fill(checkedValue, isDisabled = false) {
        //input-radio this.radioBox
        let radioItems = getElmsRelativeByName('input-radio', this.radioBox);
        radioItems.forEach((item) => {
            if (item.value == checkedValue) {
                item.checked = true;
            }
            item.disabled = isDisabled;
        });
        console.log('RadioInputFieldTmpl fill', radioItems);
    }
    pour() {
        return this.inputRadioAdd.pour()[0];
    }
}

class Calendar {
    constructor(elm, fun) {
        this.elm = elm;
        this.calendar = elmOfIdClosest(this.elm.id + '-calendar', elm);
        {
            let dateCalendar = elmOfId('date-calendar-');
            let clone = dateCalendar.cloneNode(true);
            clone.style.display = '';
            // console.log( this.calendar);
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
        //implementation of month name using check box
        /*
it.showMonthName.onclick = function() {
  if (it.cur != '') {
    let currentDate = it.cur.innerText
    let year = currentDate.split(' ').join('-').split('-')[0];
    let month = currentDate.split(' ').join('-').split('-')[1];
    if (isNaN(month)) {
      let monthParsed = new Date(Date.parse(month + " 1, " + year)).getMonth()
      it.filMonth(year, monthParsed);
    } else {
      let date = new Date();
      it.filMonth(date.getFullYear(), date.getMonth());
    }
    it.elm.focus();
  }
  it.elm.focus();
}
*/
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
        //implementation of month name using check box
        /*
it.showMonthName.addEventListener('mouseout', function() {
  // console.log('leaving date elm', dateElm);
  it.controlElm = '';
});
it.showMonthName.addEventListener('mouseover', function() {
  // console.log('entering date elm', dateElm);
  it.controlElm = it.showMonthName;
});
*/
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

class Modal extends Container {
    constructor(id) {
        super(id);
    }

    hide() {
        this.init();

        $('#' + this.rootId).modal('hide');
    }

    show() {
        this.init();

        $('#' + this.rootId).modal('show');
    }
}

var modals = {};

class ErrorModal extends Modal {
    constructor(id) {
        super(id);
        this.id = id;
        this.okAct = elmOfIdRel('error-ok-act', this.rootElm);
        this.closeAct = elmOfIdRel('error-close-act', this.rootElm);
        this.errorTitle = elmOfIdRel('modal-title', this.rootElm);
        this.errorBody = elmOfIdRel('modal-message', this.rootElm);
        this.errorBg = elmOfIdRel('error-modal-bg', this.rootElm);
    }
    initElms() {
        var it = this;
        it.closeAct.onclick = function () {
            it.close();
        };
    }
    setLabel(label) {
        var it = this;
        console.log(label);
        if (label.title) {
            it.errorTitle.innerHTML = label.title;
        }
    }
    add(message, okFun) {
        var it = this;
        if (!it.errorBody.innerHTML) {
            it.errorBody.innerHTML += message;
        } else {
            it.errorBody.innerHTML += '<br>' + message;
        }
        it.okAct.onclick = function () {
            okFun && okFun();
            it.close();
        };
    }
    close() {
        var it = this;
        it.errorBody.innerHTML = '';
        it.hide();
    }
}

function getErrModal(id) {
    var modal = modals[id];
    if (!modal) {
        modal = new ErrorModal(id);
        modals[id] = modal;
    }
    modal.show();
    return modal;
}

// cell country code dropdown class
class CellCountryCode extends TextAutoComp {
    constructor(cellCountry) {
        super(cellCountry, {
            str: (item, selected) => {
                if (selected) {
                    dataOfElm(cellCountry).selected = true;
                    if (it.incorrectWarn) {
                        it.incorrectWarn.style.display = 'none';
                        if (it.inputBox) {
                            it.inputBox.classList.remove('red-border');
                        }
                    }

                    return [item.code.replace('-', '') + ' ' + item.country];
                } else {
                    return [item.name + '(' + item.country + ')' + '&nbsp;&nbsp' + '+' + item.code.replace('-', '')];
                }
            },
            matchExact: (item, val) => {
                if (item.code.replace('-', '') == val) {
                    return true;
                } else {
                    return false;
                }
            },
        });
        cellCountry.addEventListener('input', function () {
            dataOfElm(cellCountry).selected = false;
        });

        let it = this;
        it.incorrectWarn = elmOfIdClosest(cellCountry.id + '-incorrect-warn', cellCountry);
        it.inputBox = elmOfNameClosest('cell-box', cellCountry);
        it.cellNumBox = elmOfNameClosest('cell-number-box', cellCountry);
        cellCountry.addEventListener('blur', function () {
            if (it.incorrectWarn) {
                if (!dataOfElm(cellCountry).selected) {
                    // it.incorrectWarn.style.display = '';
                    if (it.inputBox) {
                        // it.inputBox.classList.add('red-border');
                    }
                    if (it.optional && this.value.trim() == '') {
                        // && it.cellElm.value.trim() == ''
                        it.incorrectWarn.style.display = 'none';
                        if (it.cellNumBox) {
                            it.cellNumBox.classList.remove('red-border');
                        }
                        if (it.inputBox) {
                            it.inputBox.classList.remove('red-border');
                        }
                    }
                }
            }
        });

        it.down = elmOfIdClosest(cellCountry.id + '-down', cellCountry);
        if (it.down) {
            it.down.onclick = function () {
                elmAct(it.down, () => {
                    it.comp();
                });
            };
        }
        loadJsSync('com_currency_countries');
        it.setItems(cellCountryCodes);
    }
}

// calendar below used for case like start date and end date that has limit to each other,it is all same as the PymtCalendar in payment js
class CalendarForPair {
    constructor(elm, fun) {
        this.elm = elm;
        this.calendar = elmOfIdClosest(this.elm.id + '-calendar', elm);
        {
            let dateCalendar = elmOfId('date-calendar-');
            let clone = dateCalendar.cloneNode(true);
            clone.style.display = '';
            this.calendar.appendChild(clone);
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

        this.isStart = false;
        this.isEnd = false;
        this.selectedYear = undefined;
        this.selectedMonth = undefined;
        this.selectedDate = undefined;

        let it = this;

        this.elm.addEventListener('blur', function () {
            if (this.value == '') {
                it.setSelectedTime(undefined, undefined, undefined);
            }
        });
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
            it.controlElm = '';
        });
        it.prev.addEventListener('mouseover', function () {
            it.controlElm = it.prev;
        });

        it.next.addEventListener('mouseout', function () {
            it.controlElm = '';
        });
        it.next.addEventListener('mouseover', function () {
            it.controlElm = it.next;
        });

        it.close.onclick = function () {
            it.calendar.style.display = 'none';
        };

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

                //
                it.elm.dispatchEvent(new CustomEvent('change'));

                if (it.fun) {
                    it.fun(year, month, date);
                }
            }

            // make elm placeholder transparent when calendar is showing,make it visible when calendar is not showing
            if (it.calendar.style.display == '') {
                it.elm.classList.add('focus-empty');
            } else {
                it.elm.classList.remove('focus-empty');
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
                } else if (date == nowDate) {
                    past = true;
                    today = true;
                }
            }
        }

        if (today) {
            dateElm.classList.add('today');
        } else {
            dateElm.classList.remove('today');
        }

        dataOfElm(dateElm).date = {
            year: year,
            month: month,
            date: date,
        };
        dateElm.innerHTML = date;

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

        it.cur.innerHTML = year + '-' + (month + 1).toString().padStart(2, '0');

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
    setSelectedTime(year, month, date) {
        this.selectedYear = year;
        this.selectedMonth = month;
        this.selectedDate = date;
    }
    getStartTimeParam() {
        return {
            time_str_start: this.elm.value.trim() + ' 00:00:00',
            utc_start: Date.parse(this.elm.value.trim() + ' 00:00:00') / 1000 - 24 * 3600,
        };
    }
    getEndTimeParam() {
        return {
            time_str_end: this.elm.value.trim() + ' 23:59:59',
            utc_end: Date.parse(this.elm.value.trim() + ' 23:59:59') / 1000 + 24 * 3600,
        };
    }
}

// get one text's true screen width
function getTextWidth(str) {
    var width = 0;
    var html = document.createElement('span');
    html.innerText = str;
    html.className = 'getTextWidth';
    document.querySelector('body').appendChild(html);
    width = document.querySelector('.getTextWidth').offsetWidth;
    document.querySelector('.getTextWidth').remove();
    return width;
}

class SideNav extends Template {
    constructor(elm, navKeyItems, iconClickCallback) {
        super(elm, 'side-nav-tmpl-');

        let it = this;
        it.navCache = new Map();
        it.currentIndex = 0;
        it.expandedIndexs = new Set();
        it.navKeyItems = navKeyItems;
        it.showNotifyAct = elmOfNameRel('show-notify-act', elm);
        it.notifyModal = elmOfNameRel('notify-modal', elm);
        it.compElms = getElmsRelativeByClass('comp', document.body);
        it.backdrop = elmOfId('backdrop');
        it.mobileToggle = elmOfId('mobile-nav-toggle');

        elmActOnClick(it.showNotifyAct, () => {
            elmRemoveClass(it.notifyModal, 'd-none');
            elmRemoveClass(it.backdrop, 'd-none');
        });

        elmActOnClick(it.mobileToggle, () => {
            it.toggleMobileStyleOn();
        });

        elmActOnClick(it.backdrop, () => {
            it.toggleMobileStyleOff();
            elmAddClass(it.notifyModal, 'd-none');
        });

        elm.addEventListener('click', (e) => {
            if (e.target != it.showNotifyAct && !it.notifyModal.contains(e.target)) elmAddClass(it.notifyModal, 'd-none');
        });

        window.addEventListener('resize', (e) => {
            if (window.innerWidth >= 768) {
                it.toggleMobileStyleOff();
            }
        });

        it.styleToggle = elmOfNameRel('style-toggle', elm);
        it.logo = elmOfNameRel('logo', elm);
        it.navItems = new AddAnother('nav-item', elm, {
            fill: (i, Elm, navKeyItem) => {
                delete Elm.dataset.fileName;
                delete Elm.dataset.tabFun;

                let navKey = objValGetByKeys(navKeyItem, 'navKey');
                let dashNavKey = navKey.replace(/\s/g, '-');
                let navIcon = elmOfNameRel('nav-icon', Elm);
                let navIconValue = objValGetByKeys(navKeyItem, 'navIcon');
                let navTitle = elmOfNameRel('nav-title', Elm);
                let navTitleValue = objValGetByKeys(navKeyItem, 'navTitle');
                let navArrow = elmOfNameRel('nav-arrow', Elm);
                let priRange = objValGetByKeys(navKeyItem, 'pri_range');
                let isSec = objValGetByKeys(navKeyItem, 'sec');
                let disabled = objValGetByKeys(navKeyItem, 'disabled');

                // ICON
                navIcon.className = 'icon';
                // elmAddClass(navIcon, 'i-' + dashNavKey);
                navIconValue ? elmAddClass(navIcon, navIconValue) : elmAddClass(navIcon, 'i-' + dashNavKey);
                navIcon.dataset.allowDelete = objValGetByKeys(navKeyItem, 'allowDelete');
                if (objValGetByKeys(navKeyItem, 'allowDelete')) {
                    elmAddClass(navIcon, 'nav-icon-hover');
                    navIcon.addEventListener('click', (e) => {
                        // Elm.parentElement.removeChild(Elm);
                        e.eventType = 'delete';
                        e.navIndex = i;
                        e.navTitle = Elm.dataset.navTitle;
                        e.params = Elm.dataset.params;
                        iconClickCallback && iconClickCallback(e);
                        if (e && e.stopPropagation) {
                            e.stopPropagation();
                        }
                    });
                }
                // TITLE
                navTitle.id = dashNavKey + '-nav-title';
                if (navTitleValue) {
                    navTitle.innerText = navTitleValue;
                    navTitle.removeAttribute('tr');
                }
                elmAddClass(navArrow, 'd-none');
                if (isSec) {
                    elmAddClass(Elm, 'd-none');
                }
                // INDEX
                Elm.dataset.index = i;
                Elm.dataset.priRange = priRange;
                if (disabled) {
                    Elm.style.color = '#999';
                    Elm.addEventListener('click', () => {
                        window.alert('coming soon');
                    });
                } else if (!priRange) {
                    // primary top nav item can't switch tabs
                    let fileName = objValGetByKeys(navKeyItem, 'fileName');
                    if (!fileName) fileName = navKey.replace(/\s/g, '_');

                    Elm.dataset.fileName = _file.split('.')[0] + '_' + fileName;
                    Elm.dataset.params = JSON.stringify(objValGetByKeys(navKeyItem, 'params'));
                    Elm.dataset.navTitle = objValGetByKeys(navKeyItem, 'navTitle');
                    let tabFunStr = navKey.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()).replace(' ', '') + 'Tab';
                    tabFunStr = tabFunStr.charAt(0).toLowerCase() + tabFunStr.slice(1);
                    Elm.dataset.tabFun = tabFunStr.replace(/\s/g, '');

                    elmLoadFileSyncRun(Elm, (e) => {
                        //Gang said:Update the number of action per click on the menu
                        getActionCount();
                        if (!e.target.dataset.allowDelete) {
                            it.switchTab(Elm);
                            it.toggleMobileStyleOff();
                        }
                    });
                } else {
                    elmRemoveClass(navArrow, 'd-none');
                    // elmAddClass(Elm, 'expand');
                    Elm.addEventListener('click', () => {
                        if (!Elm.classList.contains('expand')) {
                            for (let j = i + 1; j <= i + priRange; j++) {
                                elmRemoveClass(elmOfIdRel('nav-item-' + j, elm), 'd-none');
                            }
                            elmAddClass(Elm, 'expand');
                            it.expandedIndexs.add(Elm.dataset.index);
                            it.setHoverFullText();
                        } else {
                            for (let j = i + 1; j <= i + priRange; j++) {
                                elmAddClass(elmOfIdRel('nav-item-' + j, elm), 'd-none');
                            }
                            elmRemoveClass(Elm, 'expand');
                            it.expandedIndexs.delete(Elm.dataset.index);
                        }
                    });
                    Elm.addEventListener('click', () => {
                        if (it.styleToggle.classList.contains('slim')) it.styleToggle.click();
                    });
                }
                // active the first nav item
                // if (!i && false) {
                //     loadJsSync(`${Elm.dataset.fileName}`, () => {
                //         it.switchTab(Elm);
                //     });
                // } else elmRemoveClass(Elm, 'cur');
                elmRemoveClass(Elm, 'cur');
                // hide sec menu by default
                if (objValGetByKeys(navKeyItem, 'sec')) {
                    elmAddClass(Elm, 'sec');
                    // elmAddClass(Elm, 'd-none');

                    // bind sec item's domin item
                    for (let m = i; m >= 0; m--) {
                        let navElm = elmOfIdRel('nav-item-' + m, elm);
                        if (!navElm.classList.contains('sec')) {
                            dataOfElm(Elm).dominElm = navElm;
                            break;
                        }
                    }
                }
                // cache nav items
                it.navCache.set(i, Elm);
            },
        });
        it.navItems.fill(navKeyItems);
        it.activeNav(0);
        it.slimItems = getElmsRelativeByName('slim-item', elm);
        it.fatItems = getElmsRelativeByClass('fat-item', elm);
        it.navBox = document.getElementById('side-nav');
        it.mainBox = document.getElementsByTagName('main')[0];
        it.styleToggle.onclick = function () {
            if (this.classList.contains('slim')) {
                // fat sidenav
                it.navBox.classList = 'col-6 col-md-2 d-none d-md-block side-nav tr';
                it.mainBox.classList = 'col-md-10 ml-sm-auto px-4 pt-3 position-relative';
                it.slimItems.forEach((slimItem) => {
                    slimItem.className = 'col-4 d-flex justify-content-end';
                    if (slimItem.nextElementSibling.nextElementSibling) {
                        slimItem.nextElementSibling.nextElementSibling.classList = 'col-2';
                    }
                });
                it.fatItems.forEach((navTitle) => {
                    elmRemoveClass(navTitle, 'd-none');
                });

                elmRemoveClass(this, 'slim');
            } else {
                // slim sidenav
                it.navBox.classList = 'col-1 d-none d-md-block side-nav tr';
                it.mainBox.classList = 'col-11 ml-sm-auto px-4 pt-3 position-relative';
                it.slimItems.forEach((slimItem) => {
                    slimItem.className = 'col-6 d-flex justify-content-end';
                    if (slimItem.nextElementSibling.nextElementSibling) {
                        slimItem.nextElementSibling.nextElementSibling.classList = 'col-6 d-flex justify-content-start align-items-center';
                    }
                });
                it.fatItems.forEach((navTitle) => {
                    elmAddClass(navTitle, 'd-none');
                });

                // hide sec nav menus
                getElmsRelativeByClass('sec', elm).forEach((secElm) => {
                    elmAddClass(secElm, 'd-none');
                });
                getElmsRelativeByClass('nav-item', elm).forEach((navItem) => {
                    if (navItem.classList.contains('expand')) navItem.click();
                });
                elmAddClass(this, 'slim');
            }
        };
        translate2(elm.id, _langCode);
        _showingTrTabObjs.push(it); // side nav is not a container,it is special
    }
    switchTab(goalTabNavItem, isBreadCrumbsEnter = false) {
        // hide repeatly using comp which is showing now
        this.compElms.forEach((compElm) => {
            if (compElm.classList.contains('showing-comp')) {
                // console.log('showing comp is', compElm, dataOfElm(compElm));
                dataOfElm(compElm).instance.hide();
            }
        });

        let curTabNavItem = getElmsRelativeByClass('cur', this.elm)[0];
        const curMenuId = 'bc-' + elmOfNameRel('nav-title', goalTabNavItem).id;
        const breadCrumbPath = objValGetByKeys(breadCrumbs.getCurrentPath()[breadCrumbs.getCurrentPath().length - 1], 'id');
        if (goalTabNavItem == curTabNavItem && curMenuId === breadCrumbPath && !isBreadCrumbsEnter) {
            return
        }
        // if (goalTabNavItem == curTabNavItem && !isBreadCrumbsEnter) return;
        this.currentIndex = goalTabNavItem.dataset.index;
        if (curTabNavItem) {
            elmRemoveClass(curTabNavItem, 'cur');
            eval(`${curTabNavItem.dataset.tabFun}().hide()`);
        }
        elmAddClass(goalTabNavItem, 'cur');
        eval(`${goalTabNavItem.dataset.tabFun}().show(0, ${goalTabNavItem.dataset.params})`);
        // switch top nav titles once nav index tab changed,should get texts from tr file
        if (_topNavTitles) {
            loadJsSync(_file.split('.')[0] + '_tr_' + _langCode, () => {
                while (_topNavTitles.firstChild) {
                    _topNavTitles.removeChild(_topNavTitles.lastChild);
                }

                let navIndexTopTitleSpan = document.createElement('span');
                let navIndexTopTitleSpanSec = document.createElement('span');
                let clickNavElm = navIndexTopTitleSpan;

                if (dataOfElm(goalTabNavItem).dominElm) {
                    navIndexTopTitleSpan.innerText = this.getNavTitleText(dataOfElm(goalTabNavItem).dominElm);
                    navIndexTopTitleSpanSec.innerText = this.getNavTitleText(goalTabNavItem);
                    _topNavTitles.append(navIndexTopTitleSpan, document.createTextNode('-'), navIndexTopTitleSpanSec);
                    clickNavElm = navIndexTopTitleSpanSec;
                    breadCrumbs.setRoot([
                        {
                            id: 'bc-' + elmOfNameRel('nav-title', dataOfElm(goalTabNavItem).dominElm).id,
                        },
                        {
                            id: 'bc-' + elmOfNameRel('nav-title', goalTabNavItem).id,
                            click: () => {
                                this.switchTab(goalTabNavItem, true);
                            }
                        },
                    ]);
                } else {
                    breadCrumbs.setRoot([
                        {
                            id: 'bc-' + elmOfNameRel('nav-title', goalTabNavItem).id,
                            click: () => {
                                this.switchTab(goalTabNavItem, true);
                            }
                        }
                    ]);
                    navIndexTopTitleSpan.innerText = this.getNavTitleText(goalTabNavItem);
                    _topNavTitles.append(navIndexTopTitleSpan);
                }

                elmActOnClick(clickNavElm, () => {
                    getAllNextSiblings(clickNavElm).forEach((compNavSpan) => {
                        if (dataOfElm(compNavSpan).compInstance) dataOfElm(compNavSpan).compInstance.hide();
                    });
                });
            });
        }
    }
    getNavTitleText(navItem) {
        return objValGetByKeys(window[_langCode + 'Trans'], this.elm.id + '.' + elmOfNameRel('nav-title', navItem).id);
    }
    toggleMobileStyleOn() {
        elmRemoveClass(this.elm, 'd-none');
        elmAddClass(this.elm, 'position-fixed');
        elmRemoveClass(this.backdrop, 'd-none');

        if (this.styleToggle.classList.contains('slim')) {
            // fat sidenav
            this.slimItems.forEach((slimItem) => {
                slimItem.className = 'col-4 d-flex justify-content-end';
            });
            this.fatItems.forEach((navTitle) => {
                elmRemoveClass(navTitle, 'd-none');
            });

            elmRemoveClass(this.styleToggle, 'slim');
        }
        elmAddClass(this.slimItems[0], 'd-none');
    }
    toggleMobileStyleOff() {
        elmAddClass(this.elm, 'd-none');
        elmRemoveClass(this.elm, 'position-fixed');
        elmAddClass(this.backdrop, 'd-none');
        elmRemoveClass(this.slimItems[0], 'd-none');
    }
    fill(navKeyItems, isActiveNav = true) {
        const it = this;
        it.discardItem = it.navCache.get(parseInt(it.currentIndex));
        it.navCache.clear();
        it.navItems.fill(navKeyItems);
        it.elm.dataset.lang = undefined;
        translate2(it.elm.id, _langCode);
        it.currentIndex = this.getCurrentIndex(this.discardItem);
        it.navKeyItems = navKeyItems;
        it.expandedIndexs.forEach((index) => {
            it.expandNav(parseInt(index));
        });
        if (isActiveNav) it.activeNav(parseInt(it.currentIndex), false);
        it.setHoverFullText();
    }
    expandNav(index) {
        const expandedItem = this.navCache.get(index);
        const i = parseInt(expandedItem.dataset.index);
        const priRange = parseInt(expandedItem.dataset.priRange);
        for (let j = i + 1; j <= i + priRange; j++) {
            elmRemoveClass(elmOfIdRel('nav-item-' + j, this.elm), 'd-none');
        }
        elmAddClass(expandedItem, 'expand');
    }
    activeNav(index = 0, switchTab = true) {
        const it = this;
        it.currentIndex = index;
        const currentItem = it.navCache.get(index);
        if (currentItem) {
            // expend parent nav
            for (let i = index; i > -1; i--) {
                const item = it.navCache.get(i);
                if (item && item.dataset.priRange && !item.classList.contains('expand')) {
                    it.expandedIndexs.add(i);
                    it.expandNav(i);
                }
            }
            // whether switch tab
            if (switchTab) {
                loadJsSync(`${currentItem.dataset.fileName}`, () => {
                    it.switchTab(currentItem);
                });
            } else elmAddClass(currentItem, 'cur');
        }
    }
    setHoverFullText() {
        const it = this;
        it.navCache.forEach((item) => {
            const navTitleElm = elmOfNameRel('nav-title', item);
            if (navTitleElm) {
                if (navTitleElm.scrollWidth > navTitleElm.offsetWidth) {
                    navTitleElm.onmouseover = function () {
                        // navTitleElm.setAttribute('title', navTitle);
                        let fullTextElm = document.createElement('div');
                        fullTextElm.id = 'hover-full-text';
                        fullTextElm.classList.add('hover-full-text');
                        fullTextElm.innerHTML = navTitleElm.innerHTML;
                        fullTextElm.style.width = navTitleElm.clientWidth + 20 + 'px';
                        // fullTextElm.style.left = navTitleElm.offsetLeft + 'px';
                        // fullTextElm.style.top = navTitleElm.offsetTop + (navTitleElm.clientHeight / 3) * 2 + 10 + 'px';
                        navTitleElm.parentElement.appendChild(fullTextElm);
                    };
                    navTitleElm.onmouseout = function () {
                        elmOfIdRel('hover-full-text', navTitleElm.parentElement)?.remove();
                    };
                } else {
                    navTitleElm.onmouseover = undefined;
                    navTitleElm.onmouseout = undefined;
                    elmOfIdRel('hover-full-text', navTitleElm.parentElement)?.remove();
                }
            }
        });
    }
    getCurrentIndex(itemElm) {
        let currentIndex = -1;
        if (itemElm) {
            this.navCache.forEach((item, index) => {
                if (item.innerHTML === itemElm.innerHTML) currentIndex = index;
            });
        }
        return currentIndex;
    }
}

function radioElmGet(name, rootElm) {
    elms = getElmsRelativeByName(name, rootElm);
    for (elm of elms) if (elm.checked) return elm;

    return undefined;
}

// enforce the field to the format of hh24:mm
function fldHh24Mm(elm) {
    elm.oninput = function () {
        let lastValue = '';
        if (dataOfElm(elm).lastValue) {
            lastValue = dataOfElm(elm).lastValue;
        }
        let value = elm.value;
        let value1 = '';
        var column = false;
        for (var ch of value) {
            if ('0' <= ch && ch <= '9') {
                value1 += ch;
            } else if (ch == ':' && !column) {
                value1 += ch;
                column = true;
            }
        }
        let columnIndex = value1.indexOf(':');
        let valueL = value1;
        let valueR = '';
        if (columnIndex != -1) {
            valueL = value1.substring(0, columnIndex);
            valueR = value1.substring(columnIndex + 1);

            if (valueL.length < 2) {
                if (lastValue.length < value.length) {
                    valueL = valueL.padStart(2, 0);
                }
            } else if (valueL.length > 2) {
                valueL = valueL.substring(0, 2);
            }

            if (valueR.length > 2) {
                valueR = valueR.substring(0, 2);
            }

            elm.value = valueL + ':' + valueR;
        } else {
            // no :, value L is everything
            if (valueL.length == 0) {
            } else if (valueL.length == 1) {
                if (valueL[0] > '2') {
                    if (lastValue.length < valueL.length) {
                        valueL = '0' + valueL + ':';
                    }
                }
            } else if (valueL.length == 2) {
                if (lastValue.length < valueL.length) {
                    valueL += ':';
                }
            } else {
                valueL = valueL.substring(0, 2) + ':' + valueL.substring(2);
            }
            elm.value = valueL;
        }
        dataOfElm(elm).lastValue = elm.value;
    };

    elm.onchange = function () {
        let lastValue = '';
        if (dataOfElm(elm).lastValue) {
            lastValue = dataOfElm(elm).lastValue;
        }
        let value = elm.value;
        let value1 = '';
        var column = false;
        for (var ch of value) {
            if ('0' <= ch && ch <= '9') {
                value1 += ch;
            } else if (ch == ':' && !column) {
                value1 += ch;
                column = true;
            }
        }
        let columnIndex = value1.indexOf(':');
        let valueL = value1;
        let valueR = '';
        if (columnIndex != -1) {
            valueL = value1.substring(0, columnIndex);
            valueR = value1.substring(columnIndex + 1);

            if (valueL.length < 2) {
                valueL = valueL.padStart(2, 0);
            } else if (valueL.length > 2) {
                valueL = valueL.substring(0, 2);
            }

            if (valueR.length < 2) {
                valueR = valueR.padEnd(2, 0);
            } else if (valueR.length > 2) {
                valueR = valueR.substring(0, 2);
            }

            elm.value = valueL + ':' + valueR;
        } else {
            // no :, value L is everything
            if (valueL.length == 0) {
            } else if (valueL.length == 1) {
                valueL = valueL.padStart(2, 0) + ':00';
            } else if (valueL.length == 2) {
                valueL = valueL + ':00';
            } else {
                valueL = valueL.substring(0, 2) + ':' + valueL.substring(2).padEnd(2, 0);
            }
            elm.value = valueL;
        }
        dataOfElm(elm).lastValue = elm.value;

        elmChangePost(elm, true);
    };
}

/**
 * MapPlaceAutoComp
 */

//initial bound lat and lng is sfo's
var boundLat = 37.6213129;
var boundLng = -122.3789554;
var boundRadius = 200000;

class MapPlaceAutoComp extends TextAutoComp {
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
            // console.log(it.elm.value);
            it.addrAutoCompEval(it.elm.value.trim());
        });

        it.elm.addEventListener('focus', () => {
            // console.log(it.elm.value);
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
        // console.log('map place auto comp results', predictions, it.sessionToken);
        it.setItems(predictions);
        let newMatchedNumber = it.getMatchCnt(search);
        let newPredictedNumber = it.items.length;
        it.lastMatchedNumber = newMatchedNumber;
        it.lastPredictedNumber = newPredictedNumber;
    }

    getPlaces(searchResult) {
        let url;
        if (typeof _isCNDomain !== 'undefined' && _isCNDomain && stage === 'prod') {
            url = 'https://sasf669ce6.execute-api.us-east-2.amazonaws.com/prod/maps/places/auto-comp?input_text=' + searchResult.search;
        } else {
            url = api[stage].maps + '/places/auto-comp?input_text=' + searchResult.search;
        }
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
                (res) => resolve(res.predictions && res.predictions.predictions ? res.predictions.predictions : []),
                () => resolve([]),
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
                            })),
                        );
                    } else {
                        resolve([]);
                    }
                },
                () => resolve([]),
            );
        });
    }

    addrAutoCompCall(searchResult) {
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
        // console.log(search);
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

class DistanceMKM {
    constructor(distanceElm, fun) {
        this.distanceElm = distanceElm;
        this.unitElmMile = elmOfIdClosest(this.distanceElm.id + '-unit-mile', this.distanceElm);
        this.unitElmKm = elmOfIdClosest(this.distanceElm.id + '-unit-km', this.distanceElm);
        this.distance = '';
        this.unit = 1;
        this.fun = fun;
    }

    setUnit(unit) {
        // if (unit == this.unit) {
        //     return;
        // }
        this.unit = unit;
        if (unit == 0) {
            this.unitElmMile.style.display = '';
            this.unitElmKm.style.display = 'none';
        } else {
            this.unitElmMile.style.display = 'none';
            this.unitElmKm.style.display = '';
        }
        // this.setDistance(this.distance);
    }

    setDistance(distance) {
        console.log('setting the distance', distance);
        this.distance = distance;
        let distanceDisplay = '';
        if (this.distance) {
            if (this.unit == 0) {
                distanceDisplay = (this.distance / 1609.34).toFixed(1);
            } else {
                distanceDisplay = (this.distance / 1000).toFixed(1);
            }
        }
        console.log('distance setting', distanceDisplay, this.distanceElm, elmPath(this.distanceElm));
        this.distanceElm = elmOfIdClosest('distance', this.distanceElm);
        if (this.distanceElm.tagName == 'INPUT') {
            this.distanceElm.value = distanceDisplay;
        } else {
            this.distanceElm.innerHTML = distanceDisplay;
        }
    }

    fill(distance) {
        this.setDistance(distance);
    }

    getDistance() {
        return this.distance;
    }

    pour() {
        return this.getDistance();
    }
}

class DurationHhMm {
    constructor(hhElm, mmElm, fun) {
        this.hhElm = hhElm;
        // dataOfElm(this.hhElm).duration = '';
        this.mmElm = mmElm;
        this.duration = 0;
        this.fun = fun;

        var it = this;
    }

    setDuration(duration) {
        this.duration = duration;

        if (duration) {
            if (this.hhElm) {
                let hh = Math.trunc(duration / 3600);
                if (this.hhElm.tagName == 'INPUT') {
                    this.hhElm.value = hh;
                } else {
                    this.hhElm.innerHTML = hh;
                }
                let mm = (((duration % 3600) + (60 - 1)) / 60).toFixed(0);
                if (this.mmElm.tagName == 'INPUT') {
                    this.mmElm.value = mm;
                } else {
                    this.mmElm.innerHTML = mm;
                }
            } else {
                let mm = ((duration + (60 - 1)) / 60).toFixed(0);
                if (this.mmElm.tagName == 'INPUT') {
                    this.mmElm.value = mm;
                } else {
                    this.mmElm.innerHTML = mm;
                }
            }
        } else {
            if (this.hhElm) {
                if (this.hhElm.tagName == 'INPUT') {
                    this.hhElm.value = '';
                } else {
                    this.hhElm.innerHTML = '';
                }
            }

            if (this.mmElm.tagName == 'INPUT') {
                this.mmElm.value = '';
            } else {
                this.mmElm.innerHTML = '';
            }
        }

        if (this.fun) {
            this.fun(duration);
        }
    }

    getDuration() {
        return this.duration;
    }

    fill(duration) {
        this.setDuration(duration);
    }

    pour() {
        return this.getDuration();
    }
}

class CellCountryCodeSql extends TextAutoCompSql {
    constructor(cellCountry) {
        super(
            cellCountry,
            {
                str: (item, selected) => {
                    // console.log('--2104----', item);
                    if (selected) {
                        dataOfElm(cellCountry).selected = true;
                        if (it.incorrectWarn) {
                            it.incorrectWarn.style.display = 'none';
                            if (it.inputBox) {
                                it.inputBox.classList.remove('red-border');
                            }
                        }

                        return [item.code.replace('-', '') + ' ' + item.country];
                    } else {
                        return [item.name + '(' + item.country + ')' + '&nbsp;&nbsp' + '+' + item.code.replace('-', '')];
                    }
                },
                matchExact: (item, val) => {
                    if (item.code.replace('-', '') == val) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            {
                sql: 134677630,
            },
        );
        cellCountry.addEventListener('input', function () {
            dataOfElm(cellCountry).selected = false;
        });

        let it = this;
        it.incorrectWarn = elmOfIdClosest(cellCountry.id + '-incorrect-warn', cellCountry);
        it.inputBox = elmOfNameClosest('cell-box', cellCountry);
        it.cellNumBox = elmOfNameClosest('cell-number-box', cellCountry);
        cellCountry.addEventListener('blur', function () {
            if (it.incorrectWarn) {
                if (!dataOfElm(cellCountry).selected) {
                    // it.incorrectWarn.style.display = '';
                    if (it.inputBox) {
                        // it.inputBox.classList.add('red-border');
                    }
                    if (it.optional && this.value.trim() == '') {
                        // && it.cellElm.value.trim() == ''
                        it.incorrectWarn.style.display = 'none';
                        if (it.cellNumBox) {
                            it.cellNumBox.classList.remove('red-border');
                        }
                        if (it.inputBox) {
                            it.inputBox.classList.remove('red-border');
                        }
                    }
                }
            }
        });

        it.down = elmOfIdClosest(cellCountry.id + '-down', cellCountry);
        if (it.down) {
            it.down.onclick = function () {
                elmAct(it.down, () => {
                    it.comp();
                });
            };
        }
        // it.setItems(cellCountryCodes);
    }
}

function elmOnChangePostAdd(elm, fun) {
    if (elm) {
        if (!elm.onchange) elmOnChange(elm);
        funOfElmAdd(elm, 'changed', fun);
    }
}

function elmsOnChangePostAdd(elms, fun) {
    elms.forEach((elm) => {
        elmOnChangePostAdd(elm, fun);
    });
}

function elmDataSetPostAdd(elm, key, fun) {
    funOfElmAdd(elm, 'data.' + key, fun);
}

function elmOnChange(elm) {
    elm.onchange = function () {
        elmChangePost(this);
    };
}

function elmDataSet(elm, key, value, now) {
    dataOfElm(elm)[key] = value;
    /*if(fireNow){
        elmDataSetPost(elm, key, value);
      } else {
        setTimeout(function(){
          elmDataSetPost(elm, key, value);
        }, 0, elm);
      }*/
    funOfElmFire(elm, 'data.' + key, now);
}

function elmPath(elm) {
    if (!elm) {
        return [];
    }
    let path = [];
    if (elm.id) {
        path.push(elm.id);
    } else if (elm.classList) {
        path.push(elm.classList);
    }
    let pathParent = elmPath(elm.parentElement);
    return path.concat(pathParent);
}

function elmScrollToTop(elm) {
    elm.addEventListener('focus', () => {
        let elmIndex = elmOfIdClosest(elm.id + '-box-index', elm);
        if (elmIndex) {
            elmIndex.scrollIntoView(true);
        }
    });
}

function elmsScrollToTop(elms) {
    elms.forEach((elm) => {
        elmScrollToTop(elm);
    });
}

function digitsOfStr(str) {
    var digits = '';
    for (var i = 0; i < str.length; i++) {
        let c = str[i];
        if (c >= '0' && c <= '9') digits += c;
    }
    return digits;
}

function elmChangePost(elm, now) {
    funOfElmFire(elm, 'changed', now);
}

// returns the digits of a string
function digitsOfStr(str) {
    var digits = '';
    for (var i = 0; i < str.length; i++) {
        let c = str[i];
        if (c >= '0' && c <= '9') digits += c;
    }
    return digits;
}

// loading modal
function showLoadingModal(loadingModal) {
    if (dataOfElm(loadingModal).loadingAnimation) {
        return;
    }
    loadingModal.style.display = '';

    var i = 0;
    var loadingBlinkSpotElms = '';
    if (!loadingBlinkSpotElms) {
        var loadingBlinkSpotElms = getElmsRelativeByName('loading-blink-loop-spot', loadingModal);
    }

    dataOfElm(loadingModal).loadingAnimation = setInterval(() => {
        if (i == 2) {
            loadingBlinkSpotElms[2].classList.remove('current-blinking');
            loadingBlinkSpotElms[0].classList.add('current-blinking');
            i = 0;
            return;
        }
        loadingBlinkSpotElms[i].classList.remove('current-blinking');
        loadingBlinkSpotElms[i + 1].classList.add('current-blinking');
        i++;
    }, 500);
}

function setLoadingModal(fun, elm) {
    var loadingModal = elmOfId('loading-modal');
    clearInterval(dataOfElm(elm).timer);

    showLoadingModal(loadingModal);
    dataOfElm(elm).timer = setTimeout(() => {
        fun();
        async.done(() => {
            hideLoadingModal(loadingModal);
        });
    }, 500);
}

var flowCount = 0;
let curShowFlow;
class Flow {
    constructor(pageNames, resolveFlow) {
        this.pages = [];
        this.data = {};
        this.endFun = undefined;
        this.count = flowCount++;
        this.activePage = {};
        if (pageNames) {
            Promise.all(
                pageNames.map((pageName, pageIndex) => {
                    return new Promise((resolve) => {
                        fileOnLoaded(pageName, () => {
                            this.insert(files[pageName].instance, undefined, pageIndex);
                            resolve();
                        });
                    });
                }),
            ).then(() => {
                if (resolveFlow) resolveFlow();
            });
        }
    }
    insert(page, prepFun, seq) {
        this.pages[seq ?? this.pages.length] = {
            page: page,
            prepFun: prepFun,
        };

        const backFun = page.backFun;
        page.backFun = (...data) => {
            backFun?.(...data);
            if (curShowFlow === this) {
                this.prev(page, ...data);
            }
        };

        const okFun = page.okFun;
        page.okFun = (...data) => {
            okFun?.(...data);
            if (curShowFlow === this) {
                if (page.isCurFlowEnded) {
                    this.runEndFun();
                } else {
                    this.next(page, ...data);
                }
            }
        };
    }
    append(page, prepFun, seq) {
        // can't append dup page
        if (this.pages.find((item) => item.page === page)) return;

        console.log('flow append: ', page, prepFun, seq);
        this.insert(page, prepFun, seq);
    }
    prev(page, ...data) {
        let it = this;
        for (var i = 0; i < it.pages.length; i++) {
            if (page == it.pages[i].page) {
                i--;
                break;
            }
        }
        if (i == it.pages.length) {
            return;
        }
        it.show(i, ...data);
    }
    next(page, ...data) {
        let it = this;
        for (var i = 0; i < it.pages.length; i++) {
            if (page == it.pages[i].page) {
                i++;
                if (page.flowNextPageJumpNum && it.pages[i]) {
                    it.pages[i].page.flowJumpNum = page.flowNextPageJumpNum;
                    page.flowNextPageJumpNum = undefined;
                }
                break;
            }
        }
        if (page.flowJumpNum) {
            i += page.flowJumpNum;
            if (it.pages[i]) {
                it.pages[i].page.prevPageJumped = true;
            }
            page.flowJumpNum = undefined;
        }

        if (i == it.pages.length) {
            it.runEndFun();
            return;
        }

        it.show(i, ...data);
    }
    configPageByIndex(i, config) {
        if (this.pages[i]) {
            this.pages[i].page.config = config;
        }
    }
    setEndFun(endFun) {
        this.endFun = endFun;
        // console.log('flow end fun is: ', this.count, this.endFun);
    }
    runEndFun() {
        if (this.endFun) {
            this.endFun();
            this.endFun = undefined;
        }
    }
    show(i, ...data) {
        let it = this;

        if (!i) {
            i = 0;
        }

        let pageThing = it.pages[i];

        if (pageThing.prepFun) {
            pageThing.prepFun(it, pageThing.page);
        }

        pageThing.page.show(...data);
        it.activePage = pageThing;

        if (curShowFlow !== this) {
            this.lastShowFlow = curShowFlow
            curShowFlow = this;
        };
    }
    hide() {
        this.pages.forEach((page) => {
            if (page.page.inited) {
                page.page.hide();
            }
        });
        // if (this.activePage.page) this.activePage.page.hide();
        curShowFlow = this.lastShowFlow;
    }
}

//-------------------
function fldMoneyOnly(elm) {
    // use currency to determine in future
    fldDecimalOnly(elm);
}

function fldDecimalOnly(elm) {
    // need to use locale to determine the decimal point
    fldFiltered(elm, function (c) {
        return ('0' <= c && c <= '9') || c == '.' || c == '-';
    });
}

function fldFiltered(elm, func) {
    elm.oninput = function () {
        this.value = strFiltered(this.value, func);
    };
}

// remove
// id is name-n, and is the common ancester of the collection of hte nodes of remove
// eveything after name-n will be reindexed, and node id will decrease by 1
function cloneRemove(idToRemove, rootElm, subNames, subNames2, fun) {
    var name = nameOfId(idToRemove);
    var index = indexOfId(idToRemove);

    if (fun)
        // call before it is removed from its parent
        fun(index, elmOfId(idToRemove));

    if (index == 0) return; // can not remove 0th elm, that's the one the rest are copied from

    // elmOfId(idToRemove).remove();
    elmOfIdRel(idToRemove, rootElm).remove();

    var elms = getElmsRelativeByName(name, rootElm);
    var elmsLen = elms.length;

    for (i = index; i < elms.length; i++) {
        elm = elms[i];
        elm.id = idOfIndex(name, i);

        if (subNames) for (subName of subNames) resetElmRelativeByName(i, subName, elm);

        if (subNames2) for (subName2 of subNames2) resetElmsRelativeByName(i, subName2, elm);
    }
}

function hideLoadingModal(loadingModal) {
    if (!dataOfElm(loadingModal).loadingAnimation) {
        return;
    }

    clearInterval(dataOfElm(loadingModal).loadingAnimation);
    dataOfElmClear(loadingModal);
    loadingModal.style.display = 'none';
}

// field input and validation
// may be use fancy regular expr
function strFiltered(s, func) {
    var sFil = '';
    for (const c of s) if (func(c)) sFil += c;

    return sFil;
}

function fldMoneyOnlyReg(value) {
    return value.match(/^\d+(?:\.\d{0,2})?/);
}

/**
 * It takes a URL, data, and a log message, and returns a promise that resolves to the result of a REST
 * call to the URL with the data, or rejects with the error.
 * @param url - The URL to post to.
 * @param [data] - The data to be sent to the server.
 * @param [logMessage] - This is the message that will be logged to the console.
 * @returns A promise.
 */
async function postData(url, data = {}, purpose = '') {
    return new Promise((resolve, reject) => {
        rest.post(
            purpose,
            url,
            data,
            (result) => {
                resolve(result);
            },
            (error) => {
                reject(error);
            },
        );
    });
}
const RideStats = [
    {
        id: 134610944,
        name: 'Ride Stat',
        seq: 0,
    },
    {
        id: 134610945,
        name: 'Pending',
        seq: 1,
    },
    {
        id: 134610946,
        name: 'Rejected',
        seq: 2,
    },
    {
        id: 134610947,
        name: 'Accepted',
        seq: 3,
    },
    {
        id: 134610948,
        name: 'Dispatched',
        seq: 4,
    },
    {
        id: 134610949,
        name: 'Cancelled',
        seq: 5,
    },
    {
        id: 134610950,
        name: 'Unpaid',
        seq: 6,
    },
];

// function debounce(func, wait, immediate) { // all codes should be eng
//     let timeout;

//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//             var callNow = !timeout;
//             timeout = setTimeout(() => {
//                 timeout = null;
//             }, wait)
//             if (callNow) func.apply(context, args)
//         } else {
//             timeout = setTimeout(function() {
//                 func.apply(context, args)
//             }, wait);
//         }
//     }
// }

const getSMS = async (token, phoneNumber, { resourceType, resourceId }) => {
    const url = `${api[stage].smsVerificationCode}?t_order=${token}`;
    const data = {
        resource_type: resourceType,
        resource_id: resourceId,
        cell_number: phoneNumber,
    };
    let response = null;
    try {
        response = await postData(url, data, 'get message');
    } catch (error) {
        console.error(error);
    }
    return response;
};

const verifySMS = async ({ token, phoneNumber, resourceType, resourceID, cellPhoneHash, verificationCode }) => {
    const url = `${api[stage].smsVerificationCode}?t_order=${token}`;
    const data = {
        resource_type: resourceType,
        resource_id: resourceID,
        cell_number: phoneNumber,
        cell_hash: cellPhoneHash,
        cell_verification_code: verificationCode,
    };
    let response = null;
    try {
        response = await postData(url, data, 'verify SMS');
    } catch (error) {
        console.error(error);
    }
    return response;
};

const previousSiblings = (element) => {
    let siblings = [];

    while (!!(element = element.previousElementSibling)) {
        siblings.push(element);
    }
    return siblings;
};

const nextSiblings = (element) => {
    // rename it
    let siblings = [];

    while (!!(element = element.nextElementSibling)) {
        siblings.push(element);
    }
    return siblings;
};

/**
 * hide previous and following siblings,- show current tab
 * @param {any} currentElement
 * @returns {any}
 */
const showTabContent = (currentElement) => {
    changeDisplay(currentElement, 'block');
    const siblings = [...previousSiblings(currentElement), ...nextSiblings(currentElement)];
    siblings.forEach((sibling) => {
        changeDisplay(sibling, 'none');
    });
};

const currentUnixTime = () => {
    return Math.round(Date.now() / 1000);
};

const maxObjectBy = (array, property) => {
    return array.reduce((maxObject, nextItem) => (maxObject[property] > nextItem[property] ? maxObject : nextItem));
};

function t(parent, currentId) {
    const lang = localStorage.getItem('lang');
    loadJsSync(_file.split('.')[0] + '_tr_' + lang);
    let parentId;
    if (typeof parent === 'string') {
        parentId = parent;
    } else {
        while (parent && !parent.classList.contains('tr')) {
            parent = parent.parentElement;
        }
        parentId = parent?.getAttribute('id');
    }
    return window[`${lang}Trans`]?.[parentId]?.[currentId] ?? currentId ?? '';
}

class Component {
    constructor(box, template) {
        this.dom = document.getElementById(template).firstElementChild.cloneNode(true);
        this.data = box.dataset;
        this.elms = Array.from(this.dom.querySelectorAll('[name]')).reduce((obj, elm) => {
            const key = elm
                .getAttribute('name')
                .split('-')
                .map((item, index) => (index > 0 ? item[0].toUpperCase() + item.slice(1) : item))
                .join('');
            return {
                ...obj,
                [key]: elm,
            };
        }, {});
        box.innerHTML = '';
        box.appendChild(this.dom);
    }

    t(key) {
        return t(this.dom, key);
    }
}

class ListSqlPagedX {
    constructor(opts) {
        const { elm, paginationBoxElm: _paginationBoxElm, empty = '', title = '', size = 20, sqls: _sqls, apis: _apis, compare = () => 0, fill, onPageChange } = opts;
        this.elm = elm;
        this.empty = empty;
        this.title = title;
        this.size = size;
        this.compare = compare;
        this.fill = fill;
        this.onPageChange = onPageChange;

        this.reset = ({ sqls = _sqls, apis = _apis } = {}) => {
            if (this.loading) return;
            this.list = [];
            this.page = 0;
            this.done = false;
            this.objs = (
                apis ??
                sqls?.map((sql) => {
                    return (last) => {
                        return new Promise((resolve, reject) => {
                            const data = sql(last);
                            let url = api[stage].sqlTemplatesRun_2;
                            if (data.version) {
                                url = api[stage].sqlTemplatesRun_3;
                            }
                            // const ses = localStorage.getItem('ses');
                            const ses = signIn.getSes();
                            if (ses) {
                                url += `?ses=${ses}`;
                            }
                            rest.post(`listSqlPagedX: ${data.sql}`, url, data, (res) => resolve(res.results), reject);
                        });
                    };
                }) ??
                []
            ).map((api) => ({
                api,
                list: [],
                last: undefined,
                done: false,
            }));
        };
        this.reset();

        this.rowTemplateElm = this.elm.querySelector('[name="row"]').firstElementChild;

        // Display above the list
        if (this.title) {
            let titleBoxElm = this.elm.querySelector('[name="title"]');
            if (!titleBoxElm) {
                titleBoxElm = document.createElement('div');
                titleBoxElm.setAttribute('name', 'title');
                Object.assign(titleBoxElm.style, {
                    paddingBottom: '5px',
                    colot: '#333',
                    fontSize: '16px',
                    display: 'none',
                });
                titleBoxElm.innerHTML = this.title;
                this.title && this.elm.appendChild(titleBoxElm);
            }
            this.titleBoxElm = titleBoxElm;
        }

        let listBoxElm = this.elm.querySelector('[name="list"]');
        if (!listBoxElm) {
            listBoxElm = document.createElement(this.rowTemplateElm.nodeName === 'TR' ? 'tbody' : 'div');
            listBoxElm.setAttribute('name', 'list');
            Object.assign(listBoxElm.style, {
                overflowX: 'hidden',
            });
            this.elm.appendChild(listBoxElm);
        }
        this.listBoxElm = listBoxElm;

        let paginationBoxElm = (_paginationBoxElm ?? this.elm).querySelector('[name="pagination"]');
        if (!paginationBoxElm) {
            paginationBoxElm = document.createElement('div');
            paginationBoxElm.setAttribute('name', 'pagination');
            Object.assign(paginationBoxElm.style, {
                paddingTop: '5px',
                display: 'none',
                justifyContent: 'center',
                alignItems: 'center',
            });

            const btnCommonStyle = {
                margin: '0 10px',
                width: '30px',
                height: '30px',
                borderRadius: '2px',
                backgroundColor: '#fff',
                backgroundImage: 'url(https://elifelimo.s3.us-east-2.amazonaws.com/art/icons/paging/next_333.png)',
                backgroundPosition: 'center',
                backgroundSize: '25%',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
            };

            const prevBtnElm = document.createElement('div');
            prevBtnElm.setAttribute('name', 'prev');
            Object.assign(prevBtnElm.style, btnCommonStyle, { transform: 'rotate(180deg)' });

            const nextBtnElm = document.createElement('div');
            nextBtnElm.setAttribute('name', 'next');
            Object.assign(nextBtnElm.style, btnCommonStyle);

            paginationBoxElm.appendChild(prevBtnElm);
            paginationBoxElm.appendChild(nextBtnElm);
            (_paginationBoxElm ?? this.elm).appendChild(paginationBoxElm);

            this.prevBtnElm = prevBtnElm;
            this.nextBtnElm = nextBtnElm;
        } else {
            this.prevBtnElm = paginationBoxElm.querySelector('[name="prev"]');
            this.nextBtnElm = paginationBoxElm.querySelector('[name="next"]');
        }
        this.prevBtnElm.onclick = () => this.prev();
        this.nextBtnElm.onclick = () => this.next();
        this.paginationBoxElm = paginationBoxElm;

        let emptyBoxElm = this.elm.querySelector('[name="empty"]');
        if (!emptyBoxElm) {
            emptyBoxElm = document.createElement('div');
            emptyBoxElm.setAttribute('name', 'empty');
            Object.assign(emptyBoxElm.style, {
                padding: '10vh 10%',
                colot: '#333',
                fontSize: '16px',
                textAlign: 'center',
                display: 'none',
            });
            emptyBoxElm.innerHTML = this.empty;
            this.empty && this.elm.appendChild(emptyBoxElm);
        }
        this.emptyBoxElm = emptyBoxElm;
    }

    get total() {
        return Math.ceil(this.list.length / this.size);
    }

    async load(list = []) {
        await Promise.all(
            this.objs.map(async (obj) => {
                if (obj.list.length || obj.done) return;
                obj.list = await obj.api(obj.last);
                // Some sql will return the last item from the previous page
                if (JSON.stringify(obj.list[0]) === JSON.stringify(obj.last)) {
                    obj.list.shift();
                }
                obj.last = obj.list[obj.list.length - 1];
                obj.done = obj.list.length < this.size;
            }),
        );
        const obj = this.objs.filter((obj) => obj.list.length).sort((a, b) => this.compare(a.list[0], b.list[0]))[0];
        if (obj) {
            const item = obj.list.shift();
            list.push(item);
            if (list.length < this.size) {
                return await this.load(list);
            }
        } else {
            this.done = true;
        }
        this.list = this.list.concat(list);
    }

    render(page) {
        const index = (page - 1) * this.size;
        const list = this.list.slice(index, index + this.size);
        if (list.length) {
            this.beforePageChange?.(page, this.page);
            // render list
            this.listBoxElm.innerHTML = '';
            list.forEach((data, index) => {
                const currentRowElm = this.rowTemplateElm.cloneNode(true);
                currentRowElm.id = `${this.elm.id}-row-${index}`;
                this.fill(currentRowElm, data, index);
                this.listBoxElm.appendChild(currentRowElm);
            });
            this.onPageChange?.(page, this.page);
            this.page = page;
        } else if (this.page === 0) {
            this.beforePageChange?.(0, 0);
            // clear list
            this.listBoxElm.innerHTML = '';
            this.onPageChange?.(0, 0);
        }

        if (this.page <= 1) {
            // disable prev
            this.prevBtnElm.style.filter = 'contrast(80%)';
        } else {
            // enable prev
            this.prevBtnElm.style.filter = 'none';
        }

        if (this.page >= this.total && this.done) {
            // disable next
            this.nextBtnElm.style.filter = 'contrast(80%)';
        } else {
            // enable next
            this.nextBtnElm.style.filter = 'none';
        }

        if (this.total === 0) {
            // hide pagination
            this.paginationBoxElm.style.display = 'none';
            // show empty
            this.emptyBoxElm.style.display = 'block';
            // hide title
            this.titleBoxElm && (this.titleBoxElm.style.display = 'none');
        } else {
            if (this.total === 1 && this.done) {
                // hide pagination
                this.paginationBoxElm.style.display = 'none';
            } else {
                // show pagination
                this.paginationBoxElm.style.display = 'flex';
            }
            // hide empty
            this.emptyBoxElm.style.display = 'none';
            // show title
            this.titleBoxElm && (this.titleBoxElm.style.display = 'block');
        }
    }

    async prev() {
        if (this.loading) return;
        if (this.page > this.total) this.page = this.total;
        if (this.page < 1) this.page = 1;
        if (this.page === 1) return;
        this.render(this.page - 1);
    }

    async next() {
        if (this.loading) return;
        Loading.show('loading...');
        this.loading = true;
        if (this.page > this.total) this.page = this.total;
        if (this.page < 1) this.page = 0;
        if (this.page === this.total) await this.load();
        this.render(this.page + 1);
        Loading.hidden();
        this.loading = false;
    }
}
