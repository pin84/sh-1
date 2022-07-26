import Vue from 'vue'
 
const preventReClick = Vue.directive('preventReClick', {
    inserted: function (el, binding) {
        el.addEventListener('click', () => {
			
            if (!el.disabled) {
				console.log("buy...");
                el.disabled = true;
				// el.innerText = "立即投注...";
                setTimeout(() => {
                    el.disabled = false;
					// el.innerText = "立即投注";
                }, 33000)
            }
        })
    }
});
 
export { preventReClick }