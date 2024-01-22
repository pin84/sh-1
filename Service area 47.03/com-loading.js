class ComLoading {
    _index = 0
    _id = 'my-loading'

    constructor(text = 'loading...') {
        this.text = text
        this.createStyle()
    }

    create(id) {
        let [wrapper, content, topText, pointBox] = this.createElementList(['DIV', 'DIV', 'SPAN', 'DIV'])
        // if (id) {
        //     this._id = id
        // } else {
        //     this._index += 1
        //     this._id = 'loading-wrapper-' + this._index
        // }
        wrapper.id = this._id
        wrapper.classList.add('wrapper')
        wrapper.classList.add('loading-wrapper')
        content.classList.add('content')
        topText.classList.add('text')
        topText.innerText = this.text

        pointBox.classList.add('point-box')
        for (let i = 0; i < 3; i++) {
            let span = document.createElement('SPAN')
            span.classList.add('point')
            pointBox.appendChild(span)
        }
        content.appendChild(topText)
        content.appendChild(pointBox)
        wrapper.appendChild(content)
        document.body.appendChild(wrapper);
        // wrapper.addEventListener('touchstart', e => {
        //     e.preventDefault()
        // }, false)
    }

    show(text, id) {
        this.hidden()
        this.text = text
        this.create(id)
    }
    hidden() {
        // let loadingWarpper = document.getElementById('loading-wrapper')
        // loadingWarpper.style.transform = `scale(${0})`

        let loadingWarpper = document.getElementById(this._id)
        if (loadingWarpper) {
            loadingWarpper.parentNode.removeChild(loadingWarpper)
        }
        // loadingWarpper.style.transform = `scale(${0})`
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


    createStyle() {

        var style = document.createElement('style');
        style.innerHTML = `
        .flex, #my-loading, #my-loading .content, #my-loading .content .point-box,
        .loading-wrapper,
        .my-loading.content,
        .my-loading.content .point-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        #my-loading {
          width: 100vw;
          height: 100vh;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          box-sizing: border-box;
          z-index: 9999;
        }
        
        #my-loading .content {
          width: 175px;
          height: 120px;
          padding: 10px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px gray;
          flex-direction: column;
        }
        
        #my-loading .content .text {
          font-size: 18px;
          color: #666;
        }
        
        #my-loading .content .point-box {
          width: 100%;
          height: 30px;
        }
        
        #my-loading .content .point-box .point {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #999;
          margin-right: 10px;
          -webkit-animation: changebg 2.04s ease infinite;
        }
        
        #my-loading .content .point-box .point:nth-child(1) {
          -webkit-animation-delay: 0.13s;
        }
        
        #my-loading .content .point-box .point:nth-child(2) {
          -webkit-animation-delay: 0.26s;
        }
        
        #my-loading .content .point-box .point:nth-child(3) {
          -webkit-animation-delay: 0.39s;
        }
        
        @keyframes changebg {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        
        `
        window.document.head.appendChild(style);


    }
}

let comLoading

function getLoading() {
    if (!comLoading) {
        comLoading = new ComLoading()
    }

    return comLoading
}