import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { type Quiz } from "@/quizTypes";
import { saveQuiz } from "@/saveManager";
import { parse } from "@/quizParser";

const useQuiz = defineStore("quiz", () => {
    const json: Ref<undefined|Quiz> = ref(undefined);

    async function openFile(file: File|Blob) {
        let parseResult = await parse(file);
        if (!parseResult) return;
        open(parseResult);
    }
    function open(file: Quiz) {
        if (json.value) {
            saveQuiz(json.value);
        }
        json.value = file
    }
    return {json, openFile, open};
});
export default useQuiz;