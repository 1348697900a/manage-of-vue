
import { createPinia } from "pinia";
import useConfigStore from "./modules/config";
import useUserInfoStore from "./modules/user"

const pinia = createPinia();

export {useUserInfoStore,useConfigStore}

export default pinia