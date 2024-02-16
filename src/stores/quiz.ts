import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";
import { type QuizJson } from "@/quizJson";

import { parse } from "@/quizParser";

import useQuizProgress from "./quizProgress";

const useQuiz = defineStore("quiz", () => {
    const quizProgress = useQuizProgress();
    const json: Ref<undefined|QuizJson> = ref(undefined);

    const loaded = computed(() => {
        if (json.value) return true;
        return false;
    })

    async function open(file: File|Blob) {
        let parseResult = await parse(file);
        if (!parseResult) return;
        json.value = parseResult;
        quizProgress.reset();
    }
    return {loaded, json, open};
});
export default useQuiz;