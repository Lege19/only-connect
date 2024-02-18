import * as Quiz from "@/quizJson";

export function parseCard(json: any, location: string = "unknown"): undefined|Quiz.Card {
    const typeMap = {"text": 0, "img": 1, "audio": 2};
    if (typeof json == "string") {
        return {
            type: 0,
            data: json
        } as Quiz.Card
    }
    if (!("data" in json)) {
        console.error("error parsing json: invalid card signature\nat " + location);
        return;
    }
    if (!((json.type??0) in Quiz.CardType) && !(json.type in typeMap)) {
        console.error("error parsing json: invalid card type\nat " + location);
        return;
    }
    if (typeof(json.type) === "string") return {
        type: typeMap[json.type as keyof typeof typeMap],
        data: json.data
    }
    return {
        type: json.type ?? 0,
        data: json.data
    }
}
export function parseGroup(json: any, location: string = "unknown"): undefined|Quiz.Group {
    if (!("name" in json && "cards" in json)) {
        console.error("error parsing json: invalid group signature\nat " + location);
        return;
    }

    let currentCard: undefined|Quiz.Card;
    let cards: Quiz.Card[] = [];
    for (let i = 0; i < 4; i++) {
        currentCard = parseCard(json.cards[i], location + `, card: ${i + 1}`);
        if (!currentCard) {
            return;
        }
        cards.push(currentCard);
    }
    return {
        name: json.name,
        cards: cards as [Quiz.Card, Quiz.Card, Quiz.Card, Quiz.Card]
    };
}
export function parseVowelQuestion(json: any, location: string = "unknown"): undefined|Quiz.VowelQuestion {
    if (!("name" in json) || !("phrases" in json)) {
        console.log("error parsing json: invalid vowel question signature\nat " + location);
        return;
    }
    return {
        name: json.name,
        phrases: json.phrases
    };
}
export function parseRound(json: any, location: string = "unknown"): undefined|Quiz.Round {
    if (!("name" in json && "type" in json && "questions" in json)) {
        console.error("error parsing json: invalid round signature\nat " + location);
        return;
    }

    if (json.questions.length > 6 && json.type != Quiz.RoundType.Vowel) {
        console.error("Too many questions\nat " + location);
    }

    let questions: Quiz.Question[] = [];
    let currentQuestion: undefined|Quiz.Question;
    switch (json.type) {
        case Quiz.RoundType.Connection:
        case "connection":
        case Quiz.RoundType.Sequence:
        case "sequence":
            for (let i = 0; i < json.questions.length; i++) {
                currentQuestion = parseGroup(json.questions[i], location + `, question: ${i + 1}`);
                if (!currentQuestion) {
                    return;
                }
                questions.push(currentQuestion);
            }
            break;
        case Quiz.RoundType.Wall:
        case "wall":
            let currentGroup: undefined|Quiz.Group;
            let groups: Quiz.Group[];
            for (let i = 0; i < json.questions.length; i++) {
                groups = [];
                for (let j = 0; j < 4; j++) {
                    currentGroup = parseGroup(json.questions[i][j], location + `, question: ${i + 1}, group: ${j + 1}`);
                    if (!currentGroup) {
                        return;
                    }
                    groups.push(currentGroup);
                }
                questions.push(groups as [Quiz.Group, Quiz.Group, Quiz.Group, Quiz.Group]);
            }
            break;
        case Quiz.RoundType.Vowel:
        case "vowel":
            for (let i = 0; i < json.questions.length; i++) {
                currentQuestion = parseVowelQuestion(json.questions[i]);
                if (!currentQuestion) {
                    return;
                }
                questions.push(currentQuestion);
            }
            break;
        default:
            console.error("error parsing json: invalid round type\nat " + location + "\ngot " + json.type);
            return;
    }
    const typeMap = {
        "connection": Quiz.RoundType.Connection, 
        "sequence": Quiz.RoundType.Sequence,
        "wall": Quiz.RoundType.Wall,
        "vowel": Quiz.RoundType.Vowel
    };
    if (typeof(json.type) === "string") return {
        type: typeMap[json.type as keyof typeof typeMap],
        name: json.name,
        questions: questions
    };
    return {
        type: json.type as Quiz.RoundType,
        name: json.name,
        questions: questions
    };
}
export function parseJson(json: any): undefined|Quiz.Quiz {
    if (!("name" in json && "rounds" in json)) {
        console.error("error parsing json: invalid root signature");
        return;
    }

    let rounds: Quiz.Round[] = [];
    let currentRound: undefined|Quiz.Round;

    for (let i = 0; i < json.rounds.length; i++) {
        currentRound = parseRound(json.rounds[i], `round: ${i + 1}`)
        if (!currentRound) {
            return;
        }
        rounds.push(currentRound);
    }
    let quiz = {
        name: json.name,
        id: json.id,
        rounds: rounds
    }
    return quiz;
}



export async function parse(quiz: File|Blob): Promise<Quiz.Quiz|undefined> {
    const json = parseJson(JSON.parse(await quiz.text()));
    if (!json) return;
    return json;
}