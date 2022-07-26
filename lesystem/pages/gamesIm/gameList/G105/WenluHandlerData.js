export default {


  handlerDataLonghu(arr) {
    let tem = [];
    arr.forEach((item, index) => {
      let pop = tem[tem.length - 1];
      if (pop) {
        if (item === '和') {
          pop.push(item);
        } else {
          let len = pop.length - 1;
          if ((pop[len] === '和' && pop[0] === '和') || pop[0] === item) {
            pop.push(item);
          } else {
            if (pop[len] === item) {
              pop.push(item);
            } else {
              tem.push([item]);
            }
          }
        }
      } else {
        tem.push([item]);
      }
    });

    return tem
  },


  handlerData_1(arr) {
    let temArr = []
    arr.forEach(item => {
      temArr.push(...item);
    });

    return temArr
  },
  handlerData_2(arr) {
    console.log(arr);
    let temArr = []
    let index
    if (arr[1][1]) {
      index = 1
    } else {
      index = 2
    }

    let len = arr.length
    while (index < len) {
      let l = arr[index].length
      let blueFlag = false
      if (index === 1) {
        let i = 0
        while (++i < l) {
          if (i < 6) {
            if (arr[index - 1][i] || blueFlag) {
              temArr.push('红')
            } else {
              temArr.push('蓝')
              blueFlag = true
            }
          } else {
            temArr.push('红')
          }
        }
      } else {
        let i = 0
        while (i < l) {
          if (i === 0) {
            let len1 = arr[index - 1].length
            let len2 = arr[index - 2].length
            if (len1 === len2) {
              temArr.push('红')
            } else {
              temArr.push('蓝')
            }
          } else {
            if (i < 6) {
              if (arr[index - 1][i] || blueFlag) {
                temArr.push('红')
              } else {
                temArr.push('蓝')
                blueFlag = true
              }
            } else {
              temArr.push('红')
            }
          }
          i++
        }
      }
      blueFlag = false
      index++
    }
    let handlerArr = this.handlerData(temArr, 0)
    return handlerArr
  },
  handlerData_3(arr) {
    let temArr = []

    let index
    if (arr[2][1]) {
      index = 2
    } else {
      index = 3
    }

    let len = arr.length
    while (index < len) {
      let l = arr[index].length
      let blueFlag = false
      if (index === 2) {
        let i = 0
        while (++i < l) {
          if (i < 6) {
            if (arr[index - 2][i] || blueFlag) {
              temArr.push('红')
            } else {
              temArr.push('蓝')
              blueFlag = true
            }
          } else {
            temArr.push('红')
          }
        }
      } else {
        let i = 0
        while (i < l) {
          if (i === 0) {
            let len1 = arr[index - 1].length
            let len2 = arr[index - 3].length
            if (len1 === len2) {
              temArr.push('红')
            } else {
              temArr.push('蓝')
            }
          } else {
            if (i < 6) {
              if (arr[index - 2][i] || blueFlag) {
                temArr.push('红')
              } else {
                temArr.push('蓝')
                blueFlag = true
              }
            } else {
              temArr.push('红')
            }
          }
          i++
        }
      }
      blueFlag = false
      index++
    }
    let handlerArr = this.handlerData(temArr, 0)
    return handlerArr
  },

  handlerData_4(arr) {
    // if(arr.le)
    let temArr = []
    let index
    if (arr[3][1]) {
      index = 3
    } else {
      index = 4
    }

    let len = arr.length
    while (index < len) {
      let l = arr[index].length
      let blueFlag = false
      if (index === 3) {
        let i = 0
        while (++i < l) {
          if (i < 6) {
            if (arr[index - 3][i] || blueFlag) {
              temArr.push('红')
            } else {
              temArr.push('蓝')
              blueFlag = true
            }
          } else {
            temArr.push('红')
          }
        }
      } else {
        let i = 0
        while (i < l) {
          if (i === 0) {
            let len1 = arr[index - 1].length
            let len2 = arr[index - 4].length
            if (len1 === len2) {
              temArr.push('红')
            } else {
              temArr.push('蓝')
            }
          } else {
            if (i < 6) {
              if (arr[index - 3][i] || blueFlag) {
                temArr.push('红')
              } else {
                temArr.push('蓝')
                blueFlag = true
              }
            } else {
              temArr.push('红')
            }
          }
          i++
        }
      }
      blueFlag = false
      index++
    }
    let handlerArr = this.handlerData(temArr, 0)
    return handlerArr
  },

  handlerData(arr, orderType = 0) {
    // let a = [1, 2, 3, 3, 4, 5, 5,5,5,5,5,5, 3, 6, 7, 8, 9]; //  [[1],[2],[3,3],[4],[5,5],[3]]
    let tem = [];
    arr.forEach((item, index) => {
      let pop = tem[tem.length - 1];
      if (pop) {
        if (orderType === 0) {
          if (pop[0] === item) {
            pop.push(item);
          } else {
            tem.push([item]);
          }
        }

        if (orderType === 1) {
          if (pop[0] % 2 === item % 2) {
            pop.push(item);
          } else {
            tem.push([item]);
          }
        }

        if (orderType === 2) {
          let len = pop.length - 1
          if (pop[len] >= 5) {
            if (item >= 5) {
              pop.push(item);
            } else {
              tem.push([item]);
            }
          } else {
            if (item < 5) {
              pop.push(item);
            } else {
              tem.push([item]);
            }
          }
        }


      } else {
        tem.push([item]);
      }
    });


    return tem

  },



}
