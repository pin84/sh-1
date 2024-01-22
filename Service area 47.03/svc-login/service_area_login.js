/**
 * @format
 * @Description: sign-in（service area login page）
 * @Author: Joy
 * @Date: 2023-06-16 17:07:30
 * @LastEditTime: 2023-09-06 13:33:07
 * @LastEditors: Joy
 */

class SignIn {
  count = 0;
  employeeCount = 6;
  saveTime = 0; // save login button click timestamp,Limit repeated logins within 10 seconds
  constructor(id) {
    this.rootElm = elmOfId(id);
    this.email = elmOfId('sign-in-email');
    this.driver = elmOfId('sign-in-driver');
    this.password = elmOfId('sign-in-password');
    this.time = elmOfId('sign-in-time');
    this.logo = elmOfId('sign-in-logo');
    this.logoText = elmOfId('logo-text');
    this.driverEle = elmOfId('driver-item');
    this.driverDel = elmOfId('driver-delete');
    this.login = elmOfId('sign-in-act');
    this.iconList = Array.from(document.getElementsByClassName('input-icon'));
    this.tips = elmOfId('sign-in-tips');
    this._ComLoading = new ComLoading();
    this.init();
  }
  init() {
    this.getTime();
    this.logo.addEventListener('click', this.logoClick.bind(this));
    this.logoText.addEventListener('click', this.logoTextClick.bind(this));
    this.driverDel.addEventListener('click', this.driverDelClick.bind(this));
    this.login.addEventListener('click', this.handleLogin.bind(this));
    this.email.addEventListener('change', this.handleChange.bind(this, 'email'));
    this.driver.addEventListener('change', this.handleChange.bind(this, 'driver'));
    this.password.addEventListener('change', this.handleChange.bind(this, 'password'));
    this.email.addEventListener('focus', this.handleFocus.bind(this, this.email));
    this.driver.addEventListener('focus', this.handleFocus.bind(this, this.driver));
    this.password.addEventListener('focus', this.handleFocus.bind(this, this.password));
    this.email.addEventListener('blur', this.handleBlur.bind(this, this.email));
    this.driver.addEventListener('blur', this.handleBlur.bind(this, this.driver));
    this.password.addEventListener('blur', this.handleBlur.bind(this, this.password));
  }
  getTime() {
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let dayCycle = dateTime.getDay();
    month < 10 ? (month = '0' + month) : month;
    day < 10 ? (day = '0' + day) : day;
    switch (dayCycle) {
      case 0:
        dayCycle = 'Sunday';
        break;
      case 1:
        dayCycle = 'Monday';
        break;
      case 2:
        dayCycle = 'Tuesday';
        break;
      case 3:
        dayCycle = 'Wednesday';
        break;
      case 4:
        dayCycle = 'Thursday';
        break;
      case 5:
        dayCycle = 'Friday';
        break;
      default:
        dayCycle = 'Saturday';
    }
    this.time.innerHTML = `<span>${year}-${month}-${day}</span><span>${dayCycle}</span`;
    this.tips.innerHTML = `© ${year} Service Area`;
  }
  logoClick() {
    if (this.count % 2 === 0) {
      this.count++;
    }
  }
  logoTextClick() {
    if (this.count % 2 !== 0) {
      this.count++;
    }
    if (this.count === this.employeeCount) {
      this.logoText.style.color = '#FE7A1F';
      this.driverEle.classList.remove('hide');
    }
  }
  driverDelClick() {
    this.driverEle.classList.add('hide');
    this.logoText.style.color = '#030229';
    this.count = 0;
    this.handleChange();
  }
  async handleLogin() {
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    const driver = this.driver.value.trim();
    if (!email || !password) {
      svcUtils.msgBox({ msg: 'Please enter your username or password' });
      return;
    } else {
      if (this.count >= this.employeeCount && !driver) {
        svcUtils.msgBox({ msg: 'Please enter driver email' });
        return;
      }
    }
    if (new Date().getTime() - this.saveTime < 5000) {
      svcUtils.msgBox({ msg: 'Please try again in 5 seconds' });
      return;
    }
    this.saveTime = new Date().getTime(); // save timestamp
    // this._ComLoading.show('loading');

    let url = api[stage];
    let params = {
      email,
      password,
    };
    if (this.count >= this.employeeCount) {
      url = url['loginSesesFleetEmpViaEmp'];
      params.email = driver;
      params.employee = email;
    } else {
      url = url['loginSesesEmployee'];
    }
   
    svcUtils.post(url, params).then((result) => {
      // this._ComLoading.hidden();
      let { code, res } = result;
      if (code === 0) {
        this.rootElm.classList.add('hide');

        let { access: { type, fleet_id }, ses } = res
        _d.isEmployee = type == "employee" ? true : false
        _d.empEmail = email
        _d.fleetEmail = driver
        _d.empPwd = password
        _d.ses = ses
        _d.fleet_id = fleet_id

        document.dispatchEvent(
          new CustomEvent('loginSuccess', {
            detail: { ses: res.ses },
          })
        );
      }
    });
  }
  handleChange(type) {
    // if (this.email.value && this.password.value) {
    //   if (this.count >= this.employeeCount) {
    //     this.driver.value ? this.login.classList.add('active') : this.login.classList.remove('active');
    //   } else {
    //     this.login.classList.add('active');
    //   }
    // } else {
    //   this.login.classList.remove('active');
    // }
    switch (type) {
      case 'email':
        this.email.value ? (this.iconList[0].style.color = '#4C4B67') : (this.iconList[0].style.color = '#c9cdd4');
        break;
      case 'driver':
        this.driver.value ? (this.iconList[1].style.color = '#4C4B67') : (this.iconList[1].style.color = '#c9cdd4');
        break;
      default:
        this.password.value ? (this.iconList[2].style.color = '#4C4B67') : (this.iconList[2].style.color = '#c9cdd4');
        break;
    }
  }
  handleFocus(ele) {
    ele.parentNode.classList.add('focus');
  }
  handleBlur(ele) {
    ele.parentNode.classList.remove('focus');
  }
}

var signIn = new SignIn('sign-in');
