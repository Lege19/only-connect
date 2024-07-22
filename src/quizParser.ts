import type {Quiz, Card, Group, WallQuestion, VowelQuestion, Round, ConnectionRound, SequenceRound, WallRound, VowelRound} from "@/quizTypes";
import {CardType, RoundType} from '@/quizTypes';

function isArray(arr: unknown): arr is unknown[] {
    return Array.isArray(arr);
}
function isStringArray(arr: unknown): arr is string[] {
    return isArray(arr) && arr.every(x => typeof x === "string");
}
function isNestedArray(arr: unknown): arr is unknown[][] {
    return isArray(arr) && arr.every(x => isArray(x));
}
function isObject(json: unknown): json is {} {
    return typeof json === "object" &&
        json !== null;
}
function hasName(json: unknown): json is {name: string} {
    return isObject(json) &&
        "name" in json &&
        typeof json.name === "string";
}
function hasType(json: unknown): json is {type: number} {
    return isObject(json) &&
        "type" in json &&
        typeof json.type === "number";
}
function isRound(json: unknown): json is {name: string, type: RoundType, questions: unknown[]} {
    return isObject(json) &&
        "questions" in json &&
        isArray(json.questions) &&
        hasName(json) &&
        hasType(json);
}
export function parseCard(json: unknown, location: string = "unknown"): undefined|Card {
    if (!(
        isObject(json) &&
        "data" in json &&
        typeof json.data === "string" &&
        hasType(json)
    )) {
        console.error("error parsing json: invalid card signature\nat " + location);
        return;
    }

    if (!(json.type in CardType)) {
        console.error("error parsing json: invalid card type\nat " + location);
        return;
    }
    return {
        type: json.type,
        data: json.data
    }
}
export function parseGroup(json: unknown, location: string = "unknown"): undefined|Group {
    if (!(
        isObject(json) &&
        "cards" in json &&
        isArray(json.cards) &&
        hasName(json)
    )) {
        console.error("error parsing json: invalid group signature\nat " + location);
        return;
    }

    let currentCard: undefined|Card;
    let cards: Card[] = [];
    for (let i = 0; i < 4; i++) {
        currentCard = parseCard(json.cards[i], location + ", card: " + (i + 1));
        if (!currentCard) {
            return;
        }
        cards.push(currentCard);
    }
    return {
        name: json.name,
        cards: cards as any
    };
}
export function parseWallQuestion(json: unknown, location: string = "unknown"): undefined|WallQuestion {
    if (!(
        isArray(json)
    )) {
        console.error("error parsing json: invalid wall question signature\nat " + location);
        return;
    }
    let currentGroup: undefined|Group;
    let groups: Group[] = [];
    for (let i = 0; i < 4; i++) {
        currentGroup = parseGroup(json[i], location + ", group: " + (i + 1));
        if (!currentGroup) return;
        groups.push(currentGroup);
    }
    return groups as WallQuestion;
}
export function parseVowelQuestion(json: unknown, location: string = "unknown"): undefined|VowelQuestion {
    if (!(
        isObject(json) &&
        hasName(json) &&
        "phrases" in json &&
        isStringArray(json.phrases)
    )) {
        console.error("error parsing json: invalid vowel question signature\nat " + location);
        return;
    }
    return {
        name: json.name,
        phrases: json.phrases
    };
}
function parseGroupRound(
    json: {
        name: string, 
        type: RoundType.Connection|RoundType.Sequence, 
        questions: unknown[]
    }, location: string = "unknown"
): undefined|ConnectionRound|SequenceRound {
    let currentQuestion: Group|undefined;
    let questions: Group[] = [];
    for (let i = 0; i < json.questions.length; i++) {
        currentQuestion = parseGroup(json.questions[i], location + ", question " + (i + 1));
        if (currentQuestion === undefined) return;
        questions.push(currentQuestion);
    }
    return {
        ...json,
        questions: questions
    };
}

export function parseWallRound(
    json: {
        name: string, 
        type: RoundType.Wall, 
        questions: unknown[]
    }, 
    location: string = "unknown"
): undefined|WallRound {
    if (!isNestedArray(json.questions)) {
        console.error("error parsing json: invalid wall questions format\nat " + location);
        return;
    }

    let questions: WallQuestion[] = [];
    let currentQuestion: undefined|WallQuestion;
    for (let i = 0; i < json.questions.length; i++) {
        currentQuestion = parseWallQuestion(json.questions[i], location + ", question " + (i + 1))
    }
    return {
        ...json,
        questions: questions
    }
}
export function parseVowelRound(
    json: {
        name: string, 
        type: RoundType.Vowel, 
        questions: unknown[]
    }, 
    location: string = "unknown"
): undefined|VowelRound{
    let currentQuestion: undefined|VowelQuestion;
    let questions: VowelQuestion[] = [];
    for (let i = 0; i < json.questions.length; i++) {
        currentQuestion = parseVowelQuestion(json.questions[i]);
        if (currentQuestion === undefined) return;
        questions.push(currentQuestion);
    }
    return {
        ...json,
        questions: questions
    };
}
export function parseRound(json: unknown, location: string = "unknown"): undefined|Round {
    if (!isRound(json)) {
        console.error("error parsing json: invalid round signature\nat " + location);
        return;
    }

    if (json.type !== RoundType.Vowel && json.questions.length > 6) {
        console.error("Too many questions\nat " + location);
    }

    switch (json.type) {
        case RoundType.Connection:
        case RoundType.Sequence:
            return parseGroupRound({
                ...json,
                type: json.type 
            }, location);
        case RoundType.Wall:
            return parseWallRound({
                ...json,
                type: json.type
            }, location);
        case RoundType.Vowel:
            return parseVowelRound({
                ...json,
                type: json.type
            }, location);
        default:
            console.error("error parsing json: invalid round type\nat " + location + "\ngot " + json.type);
            return;
    }
}
export function parseJson(json: any): undefined|Quiz {
    if (!(
        hasName(json) &&
        "rounds" in json &&
        isArray(json.rounds) &&
        "id" in json &&
        typeof json.id === "string" &&
        "edited" in json &&
        typeof json.edited === "string" &&
        "created" in json &&
        typeof json.created === "string"
    )) {
        console.error("error parsing json: invalid root signature");
        return;
    }

    let rounds: Round[] = [];
    let currentRound: undefined|Round;

    for (let i = 0; i < json.rounds.length; i++) {
        currentRound = parseRound(json.rounds[i], "round: " + (i + 1))
        if (!currentRound) {
            return;
        }
        rounds.push(currentRound);
    }

    return {
        name: json.name,
        id: json.id,
        rounds: rounds,
        created: new Date(json.created),
        edited: new Date(json.edited)
    };
}


export async function parse(quiz: File|Blob): Promise<Quiz|undefined> {
    return parseJson(JSON.parse(await quiz.text()));
}