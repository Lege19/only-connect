import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";
import { type QuizJson } from "@/quizJson";

const useQuiz = defineStore("quiz", () => {
    const json: Ref<undefined|QuizJson> = ref(undefined);
    const files: Ref<undefined|{[index: string]: string}> = ref(undefined);

    const loaded = computed(() => {
        if (json.value && files.value) return true;
        return false;
    })
    return {loaded, json, files};
});
export default useQuiz;