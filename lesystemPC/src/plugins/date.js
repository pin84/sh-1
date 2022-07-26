/**
 * 获取本周、上周、本月、上月的开始日期、结束日期
 */

var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastMonth = lastMonthDate.getMonth();
//格式化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}
//获得某月的天数
function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
//获得本周的开始日期
function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    return formatDate(weekStartDate);
}
//获得本周的结束日期
function getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
    return formatDate(weekEndDate);
}
//获得本周的结束日期
function getWeekEndDateOfTwoClock() {//如果是2点要加一天
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
	weekEndDate = new Date(weekEndDate.setDate(weekEndDate.getDate()+1));
    return formatDate(weekEndDate);
}
//获得本周的结束日期
function _getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 2);
    return formatDate(weekEndDate);
}
//获得上周的开始日期
function getLastWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
    return formatDate(weekStartDate);
}
//获得上周的结束日期
function getLastWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekEndDate);
}
//获得上周的结束日期
function _getLastWeekEndDate() { 
    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekEndDate);
}
//获得上周的结束日期
function getLastWeekEndDateOfTwoClock() {//如果是2点要加一天
    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	weekEndDate = new Date(weekEndDate.setDate(weekEndDate.getDate()+1));
    return formatDate(weekEndDate);
}
//获得本月的开始日期
function getMonthStartDate() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}
//获得本月的结束日期
function getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatDate(monthEndDate);
}
//获得本月的结束日期
function getMonthEndDateOfTwoClock() {//如果是2点要加一天到1号才是月底
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	monthEndDate = new Date(monthEndDate.setDate(monthEndDate.getDate()+1));
    return formatDate(monthEndDate);
}
function _getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth+1, 1);
    return formatDate(monthEndDate);
}
//获得上月开始时间
function getLastMonthStartDate() {
	//console.log("lastMonth:"+lastMonth);
	let lastMonthStartDateForYear = nowYear;
	if(lastMonth==11){//11代表12月
		lastMonthStartDateForYear=nowYear -1;
	}
    var lastMonthStartDate = new Date(lastMonthStartDateForYear, lastMonth, 1);
    return formatDate(lastMonthStartDate);
}
//获得上月结束时间
function getLastMonthEndDate() {
	//console.log("nowYear:"+nowYear);
	let lastMonthStartDateForYear = nowYear;
	if(lastMonth==11){//11代表12月
		lastMonthStartDateForYear=nowYear -1;
	}
    var lastMonthEndDate = new Date(lastMonthStartDateForYear, lastMonth, getMonthDays(lastMonth));
    return formatDate(lastMonthEndDate);
}
//获得上月结束时间
function getLastMonthEndDateOfTwoClock() {//如果是2点要加一天到1号才是月底
    let lastMonthStartDateForYear = nowYear;
    if(lastMonth==11){//11代表12月
    	lastMonthStartDateForYear=nowYear -1;
    }
    var lastMonthEndDate = new Date(lastMonthStartDateForYear, lastMonth, getMonthDays(lastMonth));
	//console.log(lastMonthEndDate);
	lastMonthEndDate = new Date(lastMonthEndDate.setDate(lastMonthEndDate.getDate()+1));
    return formatDate(lastMonthEndDate);
}
function _getLastMonthEndDate() {
    var lastMonthEndDate = new Date(nowYear, lastMonth+1, 1);
    return formatDate(lastMonthEndDate);
}
function formatDateToZeroHour(d) {
        var now = new Date(parseInt(d));
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = " 00:00:00";
        month = month.toString().padStart(2, "0"); //补全月份
        date = date.toString().padStart(2, "0"); //补全日期
        return year + "-" + month + "-" + date + hour;
}

function getNowTime() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth()+1; //得到月份
    var day = now.getDate(); //得到日期
	
	let endDateTime=new Date(now.setDate(now.getDate()+1));
	let eYear = endDateTime.getFullYear();
	let eMonth = endDateTime.getMonth()+1; //得到月份
	let eDay = endDateTime.getDate(); //得到日期
	
    var hour = " 00:00:00"; //默认时分秒 
    var ehour = " 23:59:59"
    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    eMonth = eMonth.toString().padStart(2, "0");
    eDay = eDay.toString().padStart(2, "0");
    var defaultDate = `${year}-${month}-${day}${hour}`; //当日开始时间
    var defaultDate2 = `${eYear}-${eMonth}-${eDay}${ehour}`; //当日结束时间
    return [defaultDate, defaultDate2];
}
function getNowTimeAndTomorrowTimeRange(startHour,endHour) {
    let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = now.getMonth()+1; //得到月份
    let day = now.getDate(); //得到日期
    //console.log(now);
	let tempnow = new Date();
    let endDateTime=new Date(tempnow.setDate(tempnow.getDate()+1));
    let eYear = endDateTime.getFullYear();
    let eMonth = endDateTime.getMonth()+1; //得到月份
    let eDay = endDateTime.getDate(); //得到日期
	let hour = "00:00:00"; //默认时分秒
    if(startHour!=undefined && startHour!=''){
		 hour=startHour;
	}
	let ehour = "23:59:59"//默认结束时分秒
    if(endHour!=undefined && endHour!=''){
    	ehour = endHour;  
    }
    
    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    eMonth = eMonth.toString().padStart(2, "0");
    eDay = eDay.toString().padStart(2, "0");
    var defaultDate = `${year}-${month}-${day} ${hour}`; //当日开始时间
    var defaultDate2 = `${eYear}-${eMonth}-${eDay} ${ehour}`; //当日结束时间
    return [defaultDate, defaultDate2];
}

function fastDataChangeChoice00to23(timePicked) {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth() + 1; //得到月份
        var day = now.getDate(); //得到日期
        var hour = "00:00:00"; //开始时间
        var endhour = "23:59:59"; //结束时间
        month = month.toString().padStart(2, "0"); //补全月份
        day = day.toString().padStart(2, "0"); //补全日期
		//今天
        let today = year + "-" + month + "-" + day + " "+hour;
		//明天
		let tempnow = new Date();
		let mtDateTime=new Date(tempnow.setDate(tempnow.getDate()+1));
		let mtYear = mtDateTime.getFullYear();
		let mtMonth = mtDateTime.getMonth()+1; //得到月份
		let mtDay = mtDateTime.getDate(); //得到日期
		mtMonth = mtMonth.toString().padStart(2, "0"); //补全月份
		mtDay = mtDay.toString().padStart(2, "0"); //补全日期
        
		//昨天
		tempnow = new Date();
		let ztDateTime=new Date(tempnow.setDate(tempnow.getDate()-1));
		let ztYear = ztDateTime.getFullYear();
		let ztMonth = ztDateTime.getMonth()+1; //得到月份
		let ztDay = ztDateTime.getDate(); //得到日期
		ztMonth = ztMonth.toString().padStart(2, "0"); //补全月份
		ztDay = ztDay.toString().padStart(2, "0"); //补全日期
        // let date_yesterday = ztYear + "-" + ztMonth + "-" + ztDay + " "+endhour;

        //获得截止日期开始时间时间戳
        let curDate = now.getTime();
        var limit = 36 * 24 * 3600 * 1000;
        var day35 = curDate - limit;
        let d = [];
        if (timePicked == "昨天") {
          let yestertay = ztYear + "-" + ztMonth + "-" + ztDay +" "+ hour;
          let yestertayafter = ztYear + "-" + ztMonth + "-" + ztDay +" "+ endhour;
          d = [yestertay, yestertayafter];
        }
        if (timePicked == "今天") {
			let today = year + "-" + month + "-" + day + " "+hour;
			let todayafter = year + "-" + month + "-" + day + " "+endhour;	
          d = [today, todayafter];
        }
        if (timePicked == "上周") {
          let LastWeekStart = getLastWeekStartDate() +" "+ hour;
          let LastWeekEnd = getLastWeekEndDate() +" "+ endhour;
          d = [LastWeekStart, LastWeekEnd];
        }
        if (timePicked == "本周") {
          let WeekStart = getWeekStartDate() +" "+ hour;
          let WeekEnd = getWeekEndDate() +" "+ endhour;
          d = [WeekStart, WeekEnd];
        }
        if (timePicked == "上月") {
          let LastMonthStart = getLastMonthStartDate() +" "+ hour;
          let LastMonthEnd = getLastMonthEndDate() +" "+ endhour;
          let LM = new Date(LastMonthStart).getTime();
          if (LM - day35 < 0) {
            LastMonthStart = formatDateToZeroHour(day35);
          }

          d = [LastMonthStart, LastMonthEnd];
        }
        if (timePicked == "本月") {
          let MonthStart = getMonthStartDate() +" "+ hour;
          let MonthEnd = getMonthEndDate() +" "+ endhour;

          d = [MonthStart, MonthEnd];
        }
        return d;
      }
function fastDataChangeChoice02to02(timePicked) {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth() + 1; //得到月份
        var day = now.getDate(); //得到日期
        var hour = "02:00:00"; //开始时间
        var endhour = "02:00:00"; //结束时间
        month = month.toString().padStart(2, "0"); //补全月份
        day = day.toString().padStart(2, "0"); //补全日期
		//今天
        let today = year + "-" + month + "-" + day + " "+hour;
		//明天
		let tempnow = new Date();
		let mtDateTime=new Date(tempnow.setDate(tempnow.getDate()+1));
		let mtYear = mtDateTime.getFullYear();
		let mtMonth = mtDateTime.getMonth()+1; //得到月份
		let mtDay = mtDateTime.getDate(); //得到日期
		mtMonth = mtMonth.toString().padStart(2, "0"); //补全月份
		mtDay = mtDay.toString().padStart(2, "0"); //补全日期
        
		//昨天
		tempnow = new Date();
		let ztDateTime=new Date(tempnow.setDate(tempnow.getDate()-1));
		//console.log(ztDateTime);
		let ztYear = ztDateTime.getFullYear();
		let ztMonth = ztDateTime.getMonth()+1; //得到月份
		let ztDay = ztDateTime.getDate(); //得到日期
		ztMonth = ztMonth.toString().padStart(2, "0"); //补全月份
		ztDay = ztDay.toString().padStart(2, "0"); //补全日期
        // let date_yesterday = ztYear + "-" + ztMonth + "-" + ztDay + " "+endhour;

        //获得截止日期开始时间时间戳
        let curDate = now.getTime();
        var limit = 36 * 24 * 3600 * 1000;
        var day35 = curDate - limit;
        let d = [];
        if (timePicked == "昨天") {//昨天2点到今天2点
          let yestertay = ztYear + "-" + ztMonth + "-" + ztDay +" "+ hour;
          let yestertayafter = year + "-" + month + "-" + day +" "+ endhour;
          d = [yestertay, yestertayafter];
        }
        if (timePicked == "今天") {//今天2点到明天2点
			let today = year + "-" + month + "-" + day + " "+hour;
			let todayafter = mtYear + "-" + mtMonth + "-" + mtDay + " "+endhour;	
          d = [today, todayafter];
        }
        if (timePicked == "上周") {
          let LastWeekStart = getLastWeekStartDate() +" "+ hour;
          let LastWeekEnd = getLastWeekEndDateOfTwoClock() +" "+ endhour;
          d = [LastWeekStart, LastWeekEnd];
        }
        if (timePicked == "本周") {
          let WeekStart = getWeekStartDate() +" "+ hour;
          let WeekEnd = getWeekEndDateOfTwoClock() +" "+ endhour;
          d = [WeekStart, WeekEnd];
        }
        if (timePicked == "上月") {
          let LastMonthStart = getLastMonthStartDate() +" "+ hour;
		  //console.log(LastMonthStart);
          let LastMonthEnd = getLastMonthEndDateOfTwoClock() +" "+ endhour;
		  //console.log(LastMonthEnd);
          let LM = new Date(LastMonthStart).getTime();
          if (LM - day35 < 0) {
            LastMonthStart = formatDateToZeroHour(day35);
          }

          d = [LastMonthStart, LastMonthEnd];
        }
        if (timePicked == "本月") {
          let MonthStart = getMonthStartDate() +" "+ hour;
          let MonthEnd = getMonthEndDateOfTwoClock() +" "+ endhour;

          d = [MonthStart, MonthEnd];
        }
        return d;
      }

export {
    getWeekStartDate,
    getWeekEndDate,
    _getWeekEndDate,
    getLastWeekStartDate,
    getLastWeekEndDate,
    _getLastWeekEndDate,
    getMonthStartDate,
    getMonthEndDate,
    _getMonthEndDate,
    getLastMonthStartDate,
    getLastMonthEndDate,
    _getLastMonthEndDate,
    getNowTime,
	getNowTimeAndTomorrowTimeRange,
	fastDataChangeChoice00to23,
	fastDataChangeChoice02to02
}