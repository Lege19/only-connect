import { defineStore } from "pinia";
import { ref, type Ref, computed, type ComputedRef} from "vue";
import useQuiz from "./quiz";

import { type Round, type Question } from "../quizJson";

const useQuizProgress = defineStore("quizProgress", () => {
    const quiz = useQuiz();
    const playing: Ref<boolean> = ref(false);
    const completed: Ref<boolean> = ref(false);
    const round: Ref<number|undefined> = ref(undefined);
    const roundStarted: Ref<boolean|undefined> = ref(undefined);
    const question: Ref<number|null|undefined> = ref(undefined);
    const questionProgress: Ref<number|undefined> = ref(undefined);
    const questionsCompleted: Ref<boolean[]|undefined> = ref(undefined);

    const roundCompleted: ComputedRef<boolean|undefined> = computed(() => {
        if (!playing.value) return undefined;
        return questionsCompleted.value!.every(x => x);
    });
    const roundObj: ComputedRef<Round|undefined> = computed(() => {
        if (round.value === undefined) return undefined;
        if (!quiz.loaded) return undefined;
        return quiz.json!.rounds[round.value];
    });
    const questionObj: ComputedRef<Question|undefined> = computed(() => {
        if (round.value === undefined) return undefined;
        if (typeof(question.value) != "number") return undefined;
        if (!quiz.loaded) return undefined;
        return quiz.json!.rounds[round.value].questions[question.value];
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
    function start() {
        if (!quiz.loaded) {
            reset();
            return;
        };

        playing.value = true;
        completed.value = false;
        round.value = 0;
        roundStarted.value = false;
        question.value = undefined;
        questionProgress.value = undefined;
        resetQuestionsCompleted();
    }
    function end() {
        if (!quiz.loaded) {
            reset();
            return;
        };

        completed.value = true;
        playing.value = false;
        round.value = undefined;
        roundStarted.value = undefined;
        question.value = undefined;
        questionProgress.value = undefined;
        questionsCompleted.value = undefined;
    }

    function nextRound() {
        if (!quiz.loaded) {
            reset();
            return;
        };
        if (completed.value) return;
        if (!playing.value) {
            start();
            return;
        };
        
        round.value!++;
        if (round.value === quiz.json!.rounds.length) {
            end();
            return;
        }
        roundStarted.value = false;
        question.value = undefined;
        questionProgress.value = undefined;
        questionsCompleted.value = undefined;
    }
    function prevRound() {
        if (!quiz.loaded) {
            reset();
            return;
        };
        if (completed.value) {
            round.value = quiz.json!.rounds.length - 1;
            roundStarted.value = false;
            playing.value = true;
            completed.value = false;
            return;
        }
        if (!playing.value) return;
        
        round.value! --;
        if (round.value === -1) {
            reset();
            return;
        }
        roundStarted.value = false;
        question.value = undefined;
        questionProgress.value = undefined;
        questionsCompleted.value = undefined;
    }
    function startRound() {
        if (!quiz.loaded) {
            reset();
            return;
        };
        if (!playing.value) return;
        
        if (completed.value) return;
        roundStarted.value = true;
        question.value = null;
        questionProgress.value = undefined;
        resetQuestionsCompleted();
    }
    function resetQuestionsCompleted() {
        if (!quiz.loaded) {
            reset();
            return;
        };
        if (!playing.value) return;
        questionsCompleted.value = Array(quiz.json!.rounds[round.value!].questions.length).fill(false);
    }

    function forward() {
        if (!quiz.loaded) {
            reset();
            return;
        };

        if (completed.value) return;
        if (!playing.value) {
            start();
            return;
        }
        if (!roundStarted.value) {
            startRound();
            return;
        }
        if (roundCompleted.value) {
            nextRound();
            return;
        }
        if (question.value === null) return;
        questionProgress.value!++;
    }
    function back() {
        if (!quiz.loaded) {
            reset();
            return;
        };

        if (!playing.value && !completed.value) return;
        if (question.value != null) {
            if (questionProgress.value! === 0) {
                question.value = null;
                questionProgress.value = undefined;
                return;
            }
            questionProgress.value!--;
            return;
        }
    }

    function completeQuestion() {
        if (!quiz.loaded) {
            reset();
            return;
        };

        if (!playing.value) return;
        if (!roundStarted.value) return;
        if (question.value === null) return;
        questionsCompleted.value![question.value!] = true;
        question.value = null;
        questionProgress.value = undefined;
    }
    function enterQuestion(index: number) {
        if (!quiz.loaded) {
            reset();
            return;
        };

        if (!playing.value) return;
        if (!roundStarted.value) return;
        if (question.value !== null) return;
        if (quiz.json!.rounds[round.value!].questions[index] == undefined) return;
        question.value = index;
        questionProgress.value = 0;
    }
    function exitQuestion() {
        if (!quiz.loaded) {
            reset();
            return;
        };

        if (typeof(question.value) !== "number") return;
        question.value = null;
        questionProgress.value = undefined;
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
        roundObj,
        questionObj,
        reset,
        start,
        end,
        nextRound,
        prevRound,
        startRound,
        forward,
        back,
        completeQuestion,
        enterQuestion,
        exitQuestion
    };
});
export default useQuizProgress;