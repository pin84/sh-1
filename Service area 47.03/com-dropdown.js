let hourList = createHour() || []

class ComDropdown extends HTMLElement {
    maxHeight = 300


    constructor() {
            super();
            this.shadow = null
            this.dataList = ['English', '中文']
            this.listBox = null
            this.upTriangleBox = null
            this.timer = null
            this.isToUp = false
            this.ul = null
            this.resultBox = null
            this.mkey = null
            this.initData()
        }
        // component attributes
    static get observedAttributes() {
        console.log('observedAttributes');
        return ['d'];
    }


    connectedCallback() {
        console.log('Custom square element added to page.');
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }



    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        console.log('attributeChangedCallback', property, oldValue, JSON.parse(newValue));
        if (oldValue === newValue) return;
        if (!oldValue) return


        // this[property] = newValue;
        this.mkey = this.getAttribute('mkey')

        this.dataList =  JSON.parse(newValue)

        this.changeData()
    }




    initData() {
        this.shadow = this.attachShadow({ mode: 'open' });
        let dropdownType = this.getAttribute('type')
        if (!dropdownType) return

        switch (dropdownType) {
            case 'hourly':
                this.dataList = hourList
                break;
            case 'lang':
                this.dataList = ['English', '中文']
                break;

            default:
                this.dataList = ['English', '中文']
                break;
        }
        this.changeData()
        document.addEventListener('click', () => {
            if (!this.listBox.classList.contains('hide')) {
                this.listBox.classList.add('hide')
            }
        }, false)
    }



    changeData() {
        // this.dataList = hourList

        let wrapper = this.initPage()
        this.shadow.innerHTML = ''
        this.shadow.appendChild(wrapper);

        let styleContent = this.createStyle()
        this.shadow.appendChild(styleContent);
    }




    initPage() {
        let [wrapper, resultBox, listBox, ul, upTriangleBox, upTriangle, downTriangleBox, downTriangle, mask] = this.createEle(['DIV', 'DIV', 'DIV', 'UL', 'SPAN', 'SPAN', 'SPAN', 'SPAN', 'DIV'])
        resultBox.classList.add('result-box')
        resultBox.setAttribute('readonly', '')
        resultBox.setAttribute('placeholder', '0')


        let first = this.dataList[0]

        if(first instanceof Object){
          resultBox.innerText = first[this.mkey]

        } else {
          resultBox.innerText = first 
        }
        // resultBox.innerText = this.dataList[0] 
        this.resultBox = resultBox

        this.wrapper = wrapper
        wrapper.id = 'my-dropdown-wrapper'

        upTriangleBox.classList.add('triangle-box', 'up', 'pointer')
        downTriangleBox.classList.add('triangle-box', 'down', 'pointer')

        this.upTriangleBox = upTriangleBox
        this.downTriangleBox = downTriangleBox

        upTriangle.classList.add('com-arrow-up')
        downTriangle.classList.add('com-arrow-down')
        upTriangleBox.appendChild(upTriangle)

        listBox.classList.add('list-box', 'hide')
        this.listBox = listBox
            // listBox.appendChild(upTriangleBox)
        this.ul = ul

        this.createList()


        downTriangleBox.appendChild(downTriangle)
            // listBox.appendChild(downTriangleBox)


        ul.addEventListener('click', (e) => { this.selectItem(e) }, false)
            // ul.addEventListener('mouseleave', (e) => { this.ulOnmouseleave(e) }, false)
        upTriangleBox.addEventListener('click', () => { this.toUp('up', ul) }, false)
        downTriangleBox.addEventListener('click', () => { this.toUp('down', ul) }, false)
        resultBox.addEventListener('click', (e) => {
            this.listBox.classList.remove('hide')
            e.stopPropagation()
        })



        ul.addEventListener('scroll', (e) => {
            this.scrollHandler(e)
        }, false)




        // const linkElem = document.createElement('link');
        // linkElem.setAttribute('rel', 'stylesheet');
        // linkElem.setAttribute('href', './com-dropdown.css');
        // wrapper.appendChild(linkElem);


        wrapper.appendChild(resultBox);
        wrapper.appendChild(this.listBox);

        return wrapper
    }


    createList() {
        let fragment = document.createDocumentFragment()
        this.dataList.forEach((item, index) => {
            let li = document.createElement('li')
            li.setAttribute('tr', '')
            li.id = `drodown-item-${index}`
            li.classList.add(`drodown-item`)
            li.setAttribute('index',index)

            if(item instanceof Object){
              li.innerText = item[this.mkey]
            } else {
              li.innerText = item
            }
            fragment.appendChild(li)
        })

        this.ul.appendChild(fragment)
        this.ul.classList.add('drodown-list')


        this.listBox.appendChild(this.ul)
    }



    createStyle() {
        var style = document.createElement('style');

        style.textContent = `li {
          list-style: none;
        }
        
        * {
          margin: 0;
          padding: 0;
        }
        
        #my-dropdown-wrapper {
          position: relative;
          user-select: none;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          font-size: 14px;
        }
        
        #my-dropdown-wrapper .result-box {
          outline: none;
          border: none;
          padding: 0 10px;
          width: 100%;
          height: 100%;
          background-color: #fff;
          box-sizing: border-box;
        }
        
        #my-dropdown-wrapper .list-box {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          border: 1px solid #f1f1f1;
          box-sizing: border-box;
          line-height: 40px;
          overflow: hidden;
          z-index: 1;
        }
        
        #my-dropdown-wrapper .list-box.hide {
          display: none;
        }
        
        #my-dropdown-wrapper .list-box .triangle-box {
          background-color: #f1f1f1;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          flex: 0 0 40px;
          width: 100%;
          position: absolute;
          left: 0;
          cursor: pointer;
        }
        
        #my-dropdown-wrapper .list-box .triangle-box.up {
          top: 0;
        }
        
        #my-dropdown-wrapper .list-box .triangle-box.down {
          bottom: 0;
        }
        
        #my-dropdown-wrapper .list-box .triangle-box.hide {
          display: none;
        }
        
        #my-dropdown-wrapper .list-box .triangle-box .com-arrow-up,
        #my-dropdown-wrapper .list-box .triangle-box .com-arrow-down {
          user-select: none;
        }
        
        #my-dropdown-wrapper .list-box .drodown-list {
          width: 100%;
          text-align: center;
          max-height: 300px;
          background-color: #fff;
          overflow: scroll;
        }
        
        #my-dropdown-wrapper .list-box .drodown-list::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
        }
        
        #my-dropdown-wrapper .list-box .drodown-list .drodown-item {
          width: 100%;
          box-sizing: border-box;
          color: #333;
          border-bottom: 1px solid #f1f1f1;
        }
        
        #my-dropdown-wrapper .list-box .drodown-list .drodown-item:hover {
          background-color: #eee;
        }
        
        #my-dropdown-wrapper .list-box .drodown-list .drodown-item:last-child {
          border-bottom: none;
        }
        
        .com-arrow, .com-arrow-down, .com-arrow-up {
          user-select: none;
          display: inline-block;
          margin: 5px;
          width: 8px;
          height: 8px;
          box-sizing: border-box;
        }
        
        .com-arrow-down {
          border-top: 1px solid;
          border-right: 1px solid;
          transform: rotate(135deg);
        }
        
        .com-arrow-up {
          display: inline-block;
          border-bottom: 1px solid;
          border-left: 1px solid;
          border-top: none;
          border-right: none;
          transform: rotate(135deg);
        }
        `


        return style
    }

    ulOnmouseleave() {
        this.listBox.classList.add('hide')
    }
    selectItem(e) {
        let innerText = e.target.innerText
        this.resultBox.innerText = innerText
        let index =Number(e.target.getAttribute('index'))
        this.listBox.classList.add('hide')
        this.dispatchEvent(new CustomEvent('dorpdownChange', {
            bubbles: true,
            detail: this.dataList[index]
        }))

    }
    toggleShow() {
        this.ul.scrollTo(0, 0)
        this.listBox.classList.toggle('show')
    }
    toUp(type, ul) {
        let start = ul.scrollTop

        if (type != 'up') {
            if (start > 1880) return
            ul.scrollTo(0, start + 40)
        } else {
            if (start < 40) return
            ul.scrollTo(0, start - 40)
        }
    }
    scrollHandler(e) {
        let scrollTop = e.target.scrollTop
        if (scrollTop < 20) {
            // this.upTriangleBox.style.transform = 'scale(' + 0 + ')'
            this.upTriangleBox.classList.add('hide')
        } else {
            // this.upTriangleBox.style.transform = 'scale(' + 1 + ')'
            this.upTriangleBox.classList.remove('hide')
        }
        if (scrollTop > 1390) {
            // this.downTriangleBox.style.transform = 'scale(' + 0 + ')'
            this.downTriangleBox.classList.add('hide')
        } else {
            // this.downTriangleBox.style.transform = 'scale(' + 1 + ')'
            this.downTriangleBox.classList.remove('hide')
        }
    }


    createEle(arr) {
        let list = []
        arr.forEach(tagName => {
            list.push(document.createElement(tagName))
        })
        return list
    }
}

customElements.define('com-dropdown', ComDropdown);


function createHour() {
    let arr = []
    for (let i = 6; i < 49; i++) {
        arr.push(i * 0.5)
    }

    return arr
}