import { getStore } from './storage';

const hasRole = {
    install (Vue, options) {
        Vue.directive('hasRole', {
            inserted (el, binding) {
                let roles = getStore("roles");
                console.log(el)
                if (!roles.includes(binding.value)) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
};

export default hasRole;
