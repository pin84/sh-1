class ReserveTime extends Container {
    constructor(id) {
        super(id);
    }
    initElms() {
        var it = this;

        it.selectedVehicleCardsDragFromBox = elmOfIdRel('selected-vehicles-cards-drag-from-box', it.rootElm);
        it.smallVehiclesBox = elmOfIdRel('small-vehicles-box', it.rootElm);
        it.luxuryVehiclesBox = elmOfIdRel('luxury-vehicles-box', it.rootElm);
        it.largeVehiclesBox = elmOfIdRel('large-vehicles-box', it.rootElm);
        it.smallVehiclesCardsBox = elmOfIdRel('small-vehicles-cards-box', it.rootElm);
        it.smallVehiclesCardAddReserve = elmOfIdRel('small-vehicles-card-add-reserve', it.rootElm);
        it.luxuryVehiclesCardsBox = elmOfIdRel('luxury-vehicles-cards-box', it.rootElm);
        it.luxuryVehiclesCardAddReserve = elmOfIdRel('luxury-vehicles-card-add-reserve', it.rootElm);
        it.largeVehiclesCardsBox = elmOfIdRel('large-vehicles-cards-box', it.rootElm);
        it.largeVehiclesCardAddReserve = elmOfIdRel('large-vehicles-card-add-reserve', it.rootElm);

        it.personalisedTimeRuleBoxAdd = new AddAnother('personalised-time-rule-box', it.rootElm, {
            prep: (i, TimeRuleBoxElm, timeRuleFlds) => {
                if (timeRuleFlds) {
                    return timeRuleFlds;
                }

                timeRuleFlds = {
                    normalReserveFld: elmOfNameRel('normal-reserve-time', TimeRuleBoxElm),
                    curPersonalisedAdvanceTimeEnd: elmOfNameRel('advance-time-end', elmOfIdRel('personalised-time-box-0', TimeRuleBoxElm)),
                    vehiclesCardsDragIntoBox: elmOfNameRel('selected-vehicles-cards-drag-into-box', TimeRuleBoxElm),
                    ruleBoxAddBtn: elmOfIdRel('personalised-time-box-add', TimeRuleBoxElm),
                    ruleBoxRemoveBtn: elmOfIdRel('personalised-time-rule-box-remove', TimeRuleBoxElm),
                }
                if (i) {
                    timeRuleFlds.lastRuleBoxRemoveBtn = elmOfIdRel('personalised-time-rule-box-remove', elmOfIdRel('personalised-time-rule-box-' + (i - 1), it.rootElm));
                }
                dataOfElm(TimeRuleBoxElm).timeRuleFlds = timeRuleFlds;
                return timeRuleFlds;
            },
            fill: (i, TimeRuleBoxElm, hintTimeRuleData, timeRuleFlds) => {
                timeRuleFlds.ruleBoxRemoveBtn.style.display = '';
                timeRuleFlds.ruleBoxRemoveBtn.addEventListener('click', function() {
                    let smallVehicleCards = dataOfElm(timeRuleFlds.vehiclesCardsDragIntoBox).smallVehicleCards;
                    let luxuryVehicleCards = dataOfElm(timeRuleFlds.vehiclesCardsDragIntoBox).luxuryVehicleCards;
                    let largeVehicleCards = dataOfElm(timeRuleFlds.vehiclesCardsDragIntoBox).largeVehicleCards;

                    if (smallVehicleCards) {
                        smallVehicleCards.forEach(smallVehicleCard => {
                            it.smallVehiclesCardsBox.appendChild(smallVehicleCard);
                        })
                    }
                    if (luxuryVehicleCards) {
                        luxuryVehicleCards.forEach(luxuryVehicleCard => {
                            it.luxuryVehiclesCardsBox.appendChild(luxuryVehicleCard);
                        })
                    }
                    if (largeVehicleCards) {
                        largeVehicleCards.forEach(largeVehicleCard => {
                            it.largeVehiclesCardsBox.appendChild(largeVehicleCard);
                        })
                    }
                })

                TimeRuleBoxElm.style.display = '';

                requiredFldWarnAutoClear(timeRuleFlds.normalReserveFld);
                timeRuleFlds.normalReserveFld.value = '';
                timeRuleFlds.normalReserveFld.addEventListener('input', function() {
                    timeRuleFlds.curPersonalisedAdvanceTimeEnd.value = timeRuleFlds.normalReserveFld.value;
                })

                if (hintTimeRuleData) {
                    timeRuleFlds.normalReserveFld.value = objValGetByKeys(hintTimeRuleData, 'normal_reserve_value');
                }
                dataOfElm(TimeRuleBoxElm).personalisedTimeBoxAdd = new AddAnother('personalised-time-box', TimeRuleBoxElm, {
                    prep: (j, personalisedTimeBoxElm, personalisedTimeBoxFlds) => {
                        if (personalisedTimeBoxFlds) {
                            return personalisedTimeBoxFlds;
                        }

                        personalisedTimeBoxFlds = {
                            advanceTimeStart: elmOfNameRel('advance-time-start', personalisedTimeBoxElm),
                            advanceTimeEnd: elmOfNameRel('advance-time-end', personalisedTimeBoxElm),
                            extraChargeFld: elmOfNameRel('extra-charge-fld', personalisedTimeBoxElm),
                            pctCurSelectFld: elmOfNameRel('pct-cur-fld-dropdown-toggle', personalisedTimeBoxElm),
                            pctSelectBtn: elmOfNameRel('pct-select-btn', personalisedTimeBoxElm),
                            curSelectBtn: elmOfNameRel('cur-select-btn', personalisedTimeBoxElm),
                            removeBtn: elmOfIdRel('personalised-time-box-remove', personalisedTimeBoxElm),
                        }
                        if (j) {
                            personalisedTimeBoxFlds.lastRemoveBtn = elmOfIdRel('personalised-time-box-remove', elmOfIdRel('personalised-time-box-' + (j - 1), TimeRuleBoxElm));
                        }
                        dataOfElm(personalisedTimeBoxElm).personalisedTimeBoxFlds = personalisedTimeBoxFlds;
                        return personalisedTimeBoxFlds;
                    },
                    fill: (j, personalisedTimeBoxElm, personalisedTimeData, personalisedTimeBoxFlds) => {
                        personalisedTimeBoxFlds.removeBtn.style.display = '';
                        timeRuleFlds.curPersonalisedAdvanceTimeEnd.value = timeRuleFlds.normalReserveFld.value;
                        personalisedTimeBoxElm.style.display = '';

                        requiredFldWarnAutoClear(personalisedTimeBoxFlds.advanceTimeStart);
                        requiredFldWarnAutoClear(personalisedTimeBoxFlds.advanceTimeEnd);
                        requiredFldWarnAutoClear(personalisedTimeBoxFlds.extraChargeFld);

                        personalisedTimeBoxFlds.advanceTimeStart.value = '';
                        personalisedTimeBoxFlds.advanceTimeEnd.value = '';
                        personalisedTimeBoxFlds.extraChargeFld.value = '';

                        if (j) {
                            personalisedTimeBoxFlds.advanceTimeStart.setAttribute('placeholder', '0');
                            personalisedTimeBoxFlds.advanceTimeEnd.setAttribute('placeholder', personalisedTimeBoxFlds.advanceTimeStart.placeholder);

                            let lastAdvanceTimeStart = elmOfNameRel('advance-time-start', elmOfIdRel('personalised-time-box-' + (j - 1), TimeRuleBoxElm));
                            if (lastAdvanceTimeStart.value.trim()) {
                                personalisedTimeBoxFlds.advanceTimeEnd.value = lastAdvanceTimeStart.value.trim();
                            }

                            lastAdvanceTimeStart.addEventListener('input', function() {
                                personalisedTimeBoxFlds.advanceTimeEnd.value = this.value;
                            })
                        } else {
                            personalisedTimeBoxFlds.advanceTimeEnd.value = timeRuleFlds.normalReserveFld.value;
                        }

                        personalisedTimeBoxFlds.pctCurSelectFld.innerHTML = '%';

                        personalisedTimeBoxFlds.curSelectBtn.innerHTML = cur;
                        personalisedTimeBoxFlds.pctSelectBtn.onclick = function() {
                            personalisedTimeBoxFlds.pctCurSelectFld.innerHTML = this.innerHTML;
                        }
                        personalisedTimeBoxFlds.pctSelectBtn.click();
                        personalisedTimeBoxFlds.curSelectBtn.onclick = function() {
                            personalisedTimeBoxFlds.pctCurSelectFld.innerHTML = this.innerHTML;
                        }

                        if (personalisedTimeData) {
                            personalisedTimeBoxFlds.advanceTimeStart.value = objValGetByKeys(personalisedTimeData, 'advance_time_start');
                            personalisedTimeBoxFlds.advanceTimeEnd.value = objValGetByKeys(personalisedTimeData, 'advance_time_end');
                            if (personalisedTimeData.notice_time.percent) {
                                personalisedTimeBoxFlds.extraChargeFld.value = objValGetByKeys(personalisedTimeData, 'notice_time.percent');
                            } else if (personalisedTimeData.notice_time.delta_amount) {
                                personalisedTimeBoxFlds.extraChargeFld.value = objValGetByKeys(personalisedTimeData, 'notice_time.delta_amount');
                                personalisedTimeBoxFlds.curSelectBtn.click();
                            }
                        }

                        if (j) {
                            personalisedTimeBoxFlds.lastRemoveBtn.style.display = 'none';
                            personalisedTimeBoxFlds.removeBtn.addEventListener('click', function() {
                                personalisedTimeBoxFlds.lastRemoveBtn.style.display = '';
                            })
                        } else {
                            personalisedTimeBoxFlds.removeBtn.addEventListener('click', function() {
                                personalisedTimeBoxFlds.advanceTimeStart.value = '';
                                personalisedTimeBoxFlds.extraChargeFld.value = '';
                                personalisedTimeBoxFlds.pctCurSelectFld.innerHTML = '%';
                            })
                        }
                    },
                    pour: (j, personalisedTimeBoxElm, personalisedTimeBoxFlds) => {
                        if (personalisedTimeBoxElm.style.display == '') {
                            if (!personalisedTimeBoxFlds.advanceTimeStart.value.trim() || !personalisedTimeBoxFlds.advanceTimeEnd.value.trim() || !personalisedTimeBoxFlds.extraChargeFld.value.trim()) {
                                return;
                            }

                            let hint_notice_time = {};
                            let notice_time = {};

                            notice_time.time = Number(personalisedTimeBoxFlds.advanceTimeEnd.value.trim()) * 60;
                            if (personalisedTimeBoxFlds.pctCurSelectFld.innerHTML == '%') {
                                notice_time.percent = personalisedTimeBoxFlds.extraChargeFld.value.trim();
                            } else {
                                notice_time.delta_amount = personalisedTimeBoxFlds.extraChargeFld.value.trim();
                            }

                            hint_notice_time.notice_time = notice_time;
                            hint_notice_time.advance_time_start = personalisedTimeBoxFlds.advanceTimeStart.value.trim();
                            hint_notice_time.advance_time_end = personalisedTimeBoxFlds.advanceTimeEnd.value.trim();

                            return hint_notice_time;
                        }
                    }
                })

                dataOfElm(TimeRuleBoxElm).personalisedTimeBoxAdd.fill([]);
                timeRuleFlds.vehiclesCardsDragIntoBox.innerHTML = '';

                // must fill the latest box then could add new box
                // let latestPersonalisedTimeBoxFormCheckBtn = elmOfIdRel('latest-personalised-time-box-form-check-btn', TimeRuleBoxElm);
                // latestPersonalisedTimeBoxFormCheckBtn.onclick = function(e) {
                //     let latestPersonalisedTimeBox = getElmsRelativeByName('personalised-time-box', TimeRuleBoxElm)[getElmsRelativeByName('personalised-time-box', TimeRuleBoxElm).length - 1];
                //     if ((latestPersonalisedTimeBox.style.display == '') && elmOfNameRel('advance-time-start', latestPersonalisedTimeBox).value.trim() && elmOfNameRel('advance-time-end', latestPersonalisedTimeBox).value.trim() && elmOfNameRel('extra-charge-fld', latestPersonalisedTimeBox).value.trim()) {
                //         timeRuleFlds.ruleBoxAddBtn.click();
                //     }

                //     e.stopPropagation();
                // }

                if (hintTimeRuleData) {
                    let fillNoticeTime = hintTimeRuleData.notice_time_hint;
                    if (fillNoticeTime[0].advance_time_start) { // if has personalised time box add data,then will it
                        dataOfElm(TimeRuleBoxElm).personalisedTimeBoxAdd.fill(fillNoticeTime);
                    }

                    if (hintTimeRuleData.vehicles && (hintTimeRuleData.vehicles.length > 0)) {
                        hintTimeRuleData.vehicles.forEach(vehicleId => {
                            getElmsRelativeByClass('selected-vehicle-card', it.selectedVehicleCardsDragFromBox).forEach(cardElm => {
                                if (dataOfElm(cardElm).vehicleClassId == vehicleId) {
                                    timeRuleFlds.vehiclesCardsDragIntoBox.appendChild(cardElm);
                                }
                            })
                        })
                    }
                }

                if (i > 0) {
                    timeRuleFlds.lastRuleBoxRemoveBtn.style.display = 'none';
                    timeRuleFlds.ruleBoxRemoveBtn.addEventListener('click', function() {
                        timeRuleFlds.lastRuleBoxRemoveBtn.style.display = '';
                    })
                }

                it.draggableUpdate();
            },
            pour: (i, TimeRuleBoxElm, timeRuleFlds) => {
                let noticeTime = dataOfElm(TimeRuleBoxElm).personalisedTimeBoxAdd.pour();
                if (noticeTime.length) {
                    let lowestStartTime = Number(objValGetByKeys(noticeTime, '0.advance_time_start'));
                    for (var a = 0; a < noticeTime.length; a++) {
                        if (objNumGetByKeys(noticeTime[a], 'advance_time_start') < lowestStartTime) {
                            lowestStartTime = objNumGetByKeys(noticeTime[a], 'advance_time_start');
                        }
                    }

                    noticeTime.forEach(personalisedTimeJson => {
                        personalisedTimeJson.notice_time.allowance = lowestStartTime * 60;
                    })
                } else {
                    noticeTime = [{
                        time: Number(timeRuleFlds.normalReserveFld.value.trim()) * 60,
                        allowance: Number(timeRuleFlds.normalReserveFld.value.trim()) * 60,
                        delta_amount: 0,
                        percent: 0,
                    }]
                }

                let vehicles = [];
                getElmsRelativeByClass('selected-vehicle-card', TimeRuleBoxElm).forEach(vehicleElm => {
                    vehicles.push(dataOfElm(vehicleElm).vehicleClassId);
                })

                let timeRuleVehicles = {};
                timeRuleVehicles.normal_reserve_value = timeRuleFlds.normalReserveFld.value.trim();
                timeRuleVehicles.notice_time_hint = noticeTime;
                timeRuleVehicles.vehicles = vehicles;

                return timeRuleVehicles;
            }
        })

        it.personalisedTimeRuleBoxAdd.fill([]);

        // selected vehicles btns showing
        it.setSmallVehiclesAdd();
        it.setLuxuryVehiclesAdd();
        it.setLargeVehiclesAdd();

        // it.prevBtn = elmOfIdRel('prev-btn', it.rootElm);
        // it.prevBtn.onclick = function() {
        //     // if (!tabRequiredFldEmptyCheck(it.rootElm)) {
        //         it.hide();
        //         getCreated().toPrev(5)
        //     // }
        // }
        // it.nextBtn = elmOfIdRel('next-btn', it.rootElm);
        // it.nextBtn.onclick = function() {
        //     // if (!tabRequiredFldEmptyCheck(it.rootElm)) {
        //         it.hide();
        //         getCreated().toNext(5)
              
        //     // }
        // }
    }
    draggableUpdate() {
        $(".selected-vehicle-card").draggable({
            appendTo: "body",
            cursor: "move",
            helper: 'clone',
            revert: "invalid"
        });

        $("#small-vehicles-cards-box").droppable({
            tolerance: "intersect",
            accept: ".small-vehicle-card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function(event, ui) {
                $("#small-vehicles-cards-box").append($(ui.draggable));

            }
        });
        $("#luxury-vehicles-cards-box").droppable({
            tolerance: "intersect",
            accept: ".luxury-vehicle-card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function(event, ui) {
                $("#luxury-vehicles-cards-box").append($(ui.draggable));

            }
        });
        $("#large-vehicles-cards-box").droppable({
            tolerance: "intersect",
            accept: ".large-vehicle-card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function(event, ui) {
                $("#large-vehicles-cards-box").append($(ui.draggable));
            }
        });

        $(".selected-vehicles-cards-drag-into-box").droppable({
            tolerance: "intersect",
            accept: ".selected-vehicle-card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                dataOfElm(this).smallVehicleCards = getElmsRelativeByClass('small-vehicle-card', this);
                dataOfElm(this).luxuryVehicleCards = getElmsRelativeByClass('luxury-vehicle-card', this);
                dataOfElm(this).largeVehicleCards = getElmsRelativeByClass('large-vehicle-card', this);
            }
        });
    }
    setSmallVehiclesAdd() {
        let it = this;
        it.smallVehicleCardAdd = new AddAnother('small-vehicle-card', it.smallVehiclesCardsBox, {
            prep: (i, elm) => {},
            fill: (i, elm, smallVehicleData) => {

                elmOfIdRel('vehicle-name-fld', elm).innerHTML = '';
                dataOfElmClear(elm);

                elm.style.display = 'none';
                if (smallVehicleData) {
                    elm.style.display = '';

                    elmOfIdRel('vehicle-name-fld', elm).innerHTML = listOfDictsSearchDict(vehicleClasses, 'id', objValGetByKeys(smallVehicleData, 'vehicle_class_id')).name;
                    dataOfElm(elm).vehicleClassId = objValGetByKeys(smallVehicleData, 'vehicle_class_id');
                    elmOfIdRel('reset-vehicle-card', elm).onclick = function() {
                        it.smallVehiclesCardsBox.appendChild(elm);
                    }

                    let focusByElm = getElmsRelativeByClass('vehicle-focus-by', elm)[0];
                    document.addEventListener("keydown", function(event) {
                        if (focusByElm === document.activeElement) {
                            if (objValGetByKeys(event, 'keyCode') == 90) {
                                let lastDragIntoBox = getElmsRelativeByClass('selected-vehicles-cards-drag-into-box', it.rootElm)[getElmsRelativeByClass('selected-vehicles-cards-drag-into-box', it.rootElm).length - 1];
                                lastDragIntoBox.appendChild(elm);
                                dataOfElm(lastDragIntoBox).smallVehicleCards = getElmsRelativeByClass('small-vehicle-card', lastDragIntoBox);
                                dataOfElm(lastDragIntoBox).luxuryVehicleCards = getElmsRelativeByClass('luxury-vehicle-card', lastDragIntoBox);
                                dataOfElm(lastDragIntoBox).largeVehicleCards = getElmsRelativeByClass('large-vehicle-card', lastDragIntoBox);
                            }
                        }
                    });
                }
            },
            pour: (i, elm) => {

            }
        })

    }
    setLuxuryVehiclesAdd() {
        let it = this;
        it.luxuryVehicleCardAdd = new AddAnother('luxury-vehicle-card', it.luxuryVehiclesCardsBox, {
            prep: (i, elm) => {},
            fill: (i, elm, luxuryVehicleData) => {
                elmOfIdRel('vehicle-name-fld', elm).innerHTML = '';
                dataOfElmClear(elm);

                elm.style.display = 'none';
                if (luxuryVehicleData) {
                    elm.style.display = '';
                    elmOfIdRel('vehicle-name-fld', elm).innerHTML = listOfDictsSearchDict(vehicleClasses, 'id', objValGetByKeys(luxuryVehicleData, 'vehicle_class_id')).name;
                    dataOfElm(elm).vehicleClassId = objValGetByKeys(luxuryVehicleData, 'vehicle_class_id');
                    elmOfIdRel('reset-vehicle-card', elm).onclick = function() {
                        it.luxuryVehiclesCardsBox.appendChild(elm);
                    }

                    let focusByElm = getElmsRelativeByClass('vehicle-focus-by', elm)[0];
                    document.addEventListener("keydown", function(event) {
                        if (focusByElm === document.activeElement) {
                            if (objValGetByKeys(event, 'keyCode') == 90) {
                                let lastDragIntoBox = getElmsRelativeByClass('selected-vehicles-cards-drag-into-box', it.rootElm)[getElmsRelativeByClass('selected-vehicles-cards-drag-into-box', it.rootElm).length - 1];
                                lastDragIntoBox.appendChild(elm);
                                dataOfElm(lastDragIntoBox).smallVehicleCards = getElmsRelativeByClass('small-vehicle-card', lastDragIntoBox);
                                dataOfElm(lastDragIntoBox).luxuryVehicleCards = getElmsRelativeByClass('luxury-vehicle-card', lastDragIntoBox);
                                dataOfElm(lastDragIntoBox).largeVehicleCards = getElmsRelativeByClass('large-vehicle-card', lastDragIntoBox);
                            }
                        }
                    });
                }
            },
            pour: (i, elm) => {

            }
        })

    }
    setLargeVehiclesAdd() {
        let it = this;
        it.largeVehicleCardAdd = new AddAnother('large-vehicle-card', it.largeVehiclesCardsBox, {
            prep: (i, elm) => {},
            fill: (i, elm, largeVehicleData) => {

                elm.style.display = 'none';
                elmOfIdRel('vehicle-name-fld', elm).innerHTML = '';
                dataOfElmClear(elm);
                if (largeVehicleData) {
                    elm.style.display = '';
                    elmOfIdRel('vehicle-name-fld', elm).innerHTML = listOfDictsSearchDict(vehicleClasses, 'id', objValGetByKeys(largeVehicleData, 'vehicle_class_id')).name;
                    dataOfElm(elm).vehicleClassId = objValGetByKeys(largeVehicleData, 'vehicle_class_id');
                    elmOfIdRel('reset-vehicle-card', elm).onclick = function() {
                        it.largeVehiclesCardsBox.appendChild(elm);
                    }

                    let focusByElm = getElmsRelativeByClass('vehicle-focus-by', elm)[0];
                    document.addEventListener("keydown", function(event) {
                        if (focusByElm === document.activeElement) {
                            if (objValGetByKeys(event, 'keyCode') == 90) {
                                let lastDragIntoBox = getElmsRelativeByClass('selected-vehicles-cards-drag-into-box', it.rootElm)[getElmsRelativeByClass('selected-vehicles-cards-drag-into-box', it.rootElm).length - 1];
                                lastDragIntoBox.appendChild(elm);
                                dataOfElm(lastDragIntoBox).smallVehicleCards = getElmsRelativeByClass('small-vehicle-card', lastDragIntoBox);
                                dataOfElm(lastDragIntoBox).luxuryVehicleCards = getElmsRelativeByClass('luxury-vehicle-card', lastDragIntoBox);
                                dataOfElm(lastDragIntoBox).largeVehicleCards = getElmsRelativeByClass('large-vehicle-card', lastDragIntoBox);
                            }
                        }
                    });
                }
            },
            pour: (i, elm) => {}
        })
    }
    fill(serviceAreaData) {
        let it = this;

        let smallVehiclesArr = [];
        let luxuryVehiclesArr = [];
        let largeVehiclesArr = [];
        if (serviceAreaData.vehicleClasses) {
            for (let item of serviceAreaData.vehicleClasses) {
                let { carType } = vehicleClasses.find(obj => obj.id == item.vehicle_class_id)
                if (carType == 1) {
                    smallVehiclesArr.push(item);
                } else if (carType == 2) {
                    luxuryVehiclesArr.push(item);
                } else {
                    largeVehiclesArr.push(item);
                }
            }
        }

        if (!smallVehiclesArr.length) {
            it.smallVehiclesBox.style.display = 'none';
        } else {
            it.smallVehiclesBox.style.display = '';
        }
        if (!luxuryVehiclesArr.length) {
            it.luxuryVehiclesBox.style.display = 'none';
        } else {
            it.luxuryVehiclesBox.style.display = '';
        }
        if (!largeVehiclesArr.length) {
            it.largeVehiclesBox.style.display = 'none';
        } else {
            it.largeVehiclesBox.style.display = '';
        }

        it.smallVehicleCardAdd.fill(smallVehiclesArr);
        it.luxuryVehicleCardAdd.fill(luxuryVehiclesArr);
        it.largeVehicleCardAdd.fill(largeVehiclesArr);

        if (serviceAreaData.hint) {
            it.personalisedTimeRuleBoxAdd.fill(serviceAreaData.hint);
        }

        it.draggableUpdate();
    }
    pour(serviceAreaData) {
      
        console.log('---reserve time---',serviceArea);
        let it = this;
        serviceAreaData.hint = it.personalisedTimeRuleBoxAdd.pour();
        let { vehicleClasses } = serviceAreaData
        if (vehicleClasses) {
            for (let obj of vehicleClasses) {
                if (obj['notice_time']) {
                    delete obj['notice_time']
                }
            }
        }
    }
    reset() {
        let it = this;
        it.personalisedTimeRuleBoxAdd.fill([]);
        it.smallVehicleCardAdd.fill([]);
        it.luxuryVehicleCardAdd.fill([]);
        it.largeVehicleCardAdd.fill([]);
        requiredFldWarnClear(getElmsRelativeByName('normal-reserve-time', it.rootElm)[0]);
        getElmsRelativeByClass('error-icon', it.rootElm).forEach(errorIcon => {
            errorIcon.style.display = 'none';
        })
    }
    show() {
        let it = this;
        // curSvcAeaDetailClass = reserveTime()
        it.init();

        if (it.smallVehiclesCardsBox.innerHTML.trim() == '') {
            it.smallVehiclesCardsBox.innerHTML = it.smallVehiclesCardAddReserve.innerHTML;
            it.setSmallVehiclesAdd();
        }
        if (it.luxuryVehiclesCardsBox.innerHTML.trim() == '') {
            it.luxuryVehiclesCardsBox.innerHTML = it.luxuryVehiclesCardAddReserve.innerHTML;
            it.setLuxuryVehiclesAdd();
        }
        if (it.largeVehiclesCardsBox.innerHTML.trim() == '') {
            it.largeVehiclesCardsBox.innerHTML = it.largeVehiclesCardAddReserve.innerHTML;
            it.setLargeVehiclesAdd();
        }

        it.reset();
        
        console.log('=====serviceArea=====',serviceArea);
       
        it.fill(serviceArea);
        this.rootElm.classList.add('show')
    }
    hide() {
        this.pour(serviceArea);
        this.rootElm.classList.remove('show')
    }
}