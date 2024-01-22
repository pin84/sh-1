/*
 * @Description: partner-history
 * @Author: Joy
 * @Date: 2023-06-19 14:04:45
 * @LastEditTime: 2023-06-26 16:58:05
 * @LastEditors: Joy
 */
class PartnerHistory {
    constructor(id) {
        this.rootElm = elmOfId(id);
        this.historyList = [];
    }
    async getData() {
        // console.log(ses);
        let url = api[stage].sqlTemplatesRun_3 + '?ses=' + ses;
        let params = {
            sql: 134678309,
            version: '1.0'
        };
        let { res } = await svcUtils.post(url, params);
        this.historyList = res.results;
        this.loadPage();
    }
    loadPage() {
        let historyEle = this.rootElm.querySelector('.history-list');
        historyEle.innerHTML = '';
        let historyItem = this.rootElm.querySelector('.history-item');
        // let operatorTitle = historyItem.querySelector('.operator-title');
        // operatorTitle.innerText = langCode == 'eng' ? 'Operator:' : '操作者：';
        // let notsTitle = historyItem.querySelector('.nots-title');
        // notsTitle.innerText = langCode == 'eng' ? 'Note:' : '备注：';
        let fragment = document.createDocumentFragment();
        // console.log(this.historyList);
        this.historyList.map((item, index) => {
            // console.log(item)
            let cHistoryItem = historyItem.cloneNode(true);
            cHistoryItem.classList.remove('hide');
            cHistoryItem.id = `history-item-${index}`;

            let time = cHistoryItem.querySelector('.time');
            time.innerText = item.last_updated_at;

            let oprator = cHistoryItem.querySelector('.user-name');
            oprator.innerText = item.operator || '--';
            let noteContent = cHistoryItem.querySelector('.note-content');
            noteContent.innerText = item.note || '--';
            if (index === 0) {
                let curVer = cHistoryItem.querySelector('.cur-ver');
                curVer.classList.remove('hide');
            }
            fragment.appendChild(cHistoryItem);
        });
        historyEle.appendChild(fragment);
    }
    show() {
        this.rootElm.classList.remove('hide');
    }
    hide() {
        this.rootElm.classList.add('hide');
    }
}
