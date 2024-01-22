class MyDialog {
    constructor() {
        this.topText = null
    }
    confirm({ msg = 'hello world!', isShowCancle = false, isCanClose = true } = {}) {
        // if (!msg) {
        //   return Promise.reject()
        // }
        return new Promise((resolve, reject) => {
            let myDialog = document.getElementById('my-dialog')
            if (!myDialog) {
                let [wrapper, content, topText, pointBox] = this.createElementList(['DIV', 'DIV', 'SPAN', 'DIV'])
                wrapper.id = 'my-dialog'
                wrapper.classList.add('my-dialog-wrapper')
                this.wrapper = wrapper

                content.classList.add('my-dialog-content')
                topText.classList.add('text')
                topText.id = 'my-dialog-tips'
                this.topText = topText
             

                let btnText = ['cancel', 'ok']
                pointBox.classList.add('my-dialog-btn-box')
                for (let i = 0; i < 2; i++) {
                    let span = document.createElement('SPAN')
                    span.classList.add('my-dialog-btn')
                    span.id = `dialog-btn-${i}`
                    span.innerText = btnText[i]
                    span.setAttribute('tr', '')

                    if (i == 0 && !isShowCancle) {
                        span.style.display = 'none'
                    } else {
                        span.style.display = 'block'
                    }

                    pointBox.appendChild(span)
                }

                this.pointBox = pointBox

                content.appendChild(topText)
                if (isCanClose) {
                    content.appendChild(pointBox)
                }
                wrapper.appendChild(content)

                // if (parentNode) {
                //     document.appendChild(wrapper)
                // } else {
                document.body.appendChild(wrapper);
                // }

                wrapper.addEventListener('touchstart', e => {
                    e.preventDefault()
                }, false)
            }

            this.topText.innerText  = msg

            this.wrapper.style.transform = `scale(${1})`
            let eventType = this.isMobile() ? 'touchend' : 'click'
            this.pointBox.addEventListener(eventType, (e) => {
                let id = e.target.id
                if (id == 'dialog-btn-0') {
                    resolve('false')
                } else {
                    resolve('true')
                }
                this.hidden()
            }, { once: true })
        })

    }
    hidden() {
        this.wrapper.style.transform = `scale(${0})`
    }
    createElementList(eleNameList) {
        let eleArr = []
        eleNameList.forEach(ele => {
            let curEle = document.createElement(ele)
            curEle.setAttribute('tr', '')
            eleArr.push(curEle)
        })
        return eleArr
    }
    isMobile() {
        return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
    }

}

let dialog = null

function getDialog() {
    if (!dialog) {
        dialog = new MyDialog()
    }

    return dialog
}