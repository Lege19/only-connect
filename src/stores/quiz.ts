import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";
import { type Quiz } from "@/quizTypes";

import { parse } from "@/quizParser";

const useQuiz = defineStore("quiz", () => {
    const json: Ref<undefined|Quiz> = ref(undefined);

    const loaded = computed(() => {
        if (json.value) return true;
        return false;
    })

    async function open(file: File|Blob) {
        let parseResult = await parse(file);
        if (!parseResult) return;
        json.value = parseResult;
    }
    return {loaded, json, open};
});
export default useQuiz;