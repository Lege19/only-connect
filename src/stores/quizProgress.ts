import { defineStore } from "pinia";
import { ref, type Ref, computed, type ComputedRef} from "vue";
import useQuiz from "./quiz";

const useQuizProgress = defineStore("quizProgress", () => {
    const quiz = useQuiz();
    const playing: Ref<boolean> = ref(false);
    const completed: Ref<boolean> = ref(false);
    const round: Ref<number|undefined> = ref(undefined);
    const roundStarted: Ref<boolean|undefined> = ref(undefined);
    const question: Ref<number|null|undefined> = ref(undefined);
    const questionProgress: Ref<number|undefined> = ref(undefined);
    const questionsCompleted: Ref<boolean[]|undefined> = ref(undefined);

    const roundCompleted: ComputedRef<undefined|boolean> = computed(() => {
        if (!playing.value) return undefined;
        return questionsCompleted.value!.every(x => x);
    });

    function reset() {
        playing.value = false;
        completed.value = false;
        round.value = undefined;
        roundStarted.value = undefined;
        question.value = undefined;
        questionProgress.value = undefined;
        questionsCompleted.value = undefined;
    }
    function nextRound() {
        if (!playing.value) return;
        if (!quiz.loaded) return;
        round.value!++;
        if (round.value == quiz.json!.rounds.length) {
            end();
            return;
        }
        roundStarted.value = false;
        question.value = undefined;
        questionProgress.value = undefined;
        questionsCompleted.value = undefined;
    }
    function startRound() {
        if (!playing.value) return;
        if (completed.value) return;
        roundStarted.value = true;
        question.value = null;
        questionProgress.value = undefined;
        resetQuestionsCompleted();
    }
    function start() {
        playing.value = true;
        completed.value = false;
        round.value = 0;
        roundStarted.value = false;
        question.value = undefined;
        questionProgress.value = undefined;
        resetQuestionsCompleted();
    }
    function end() {
        completed.value = true;
        playing.value = false;
        round.value = undefined;
        roundStarted.value = undefined;
        question.value = undefined;
        questionProgress.value = undefined;
        questionsCompleted.value = undefined;
    }
    function resetQuestionsCompleted() {
        if (!playing.value) return;
        if (!quiz.loaded) return;
        questionsCompleted.value = Array(quiz.json!.rounds[round.value!].questions.length).fill(false);
    }

    return {
        playing,
        round,
        roundStarted,
        question,
        questionProgress,
        questionsCompleted,
        completed,
        roundCompleted,
        reset,
        nextRound,
        startRound,
        start,
        end
    };
});
export default useQuizProgress;