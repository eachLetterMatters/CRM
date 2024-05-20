import { reactive } from 'vue'
import mitt from "mitt";

export const store = reactive({

    // global event emitter
    emitter: mitt(),
})