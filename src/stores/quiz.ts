import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";
import { type QuizJson } from "@/quizJson";

import { parse } from "@/quizParser";

import useQuizProgress from "./quizProgress";

const useQuiz = defineStore("quiz", () => {
    const quizProgress = useQuizProgress();
    const json: Ref<undefined|QuizJson> = ref(undefined);
    const files: Ref<undefined|{[index: string]: string}> = ref(undefined);

    const loaded = computed(() => {
        if (json.value && files.value) return true;
        return false;
    })

    async function open(file: File|Blob) {
        let parseResult = await parse(file);
        if (!parseResult) return;
        json.value = parseResult.json;
        files.value = parseResult.files;
        quizProgress.reset();
    }
    return {loaded, json, files, open};
});
export default useQuiz;