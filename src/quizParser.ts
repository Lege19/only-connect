import * as Quiz from "@/quizJson";
import { unpack } from "@/flatArchive";

export function parseCard(json: any, location: string = "unknown"): undefined|Quiz.Card {
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
    if (!((json.type??0) in Quiz.CardType)) {
        console.error("error parsing json: invalid card type\nat " + location);
        return;
    }

    return {
        type: json.type ?? 0,
        data: json.data
    } as Quiz.Card;
}
export function parseGroup(json: any, location: string = "unknown"): undefined|Quiz.Group {
    if (!("name" in json && "cards" in json)) {
        console.error("error parsing json: invalid group signature\nat " + location);
        return;
    }

    let currentCard: undefined|Quiz.Card;
    let cards: Quiz.Card[] = [];
    for (let i = 0; i < 4; i++) {
        currentCard = parseCard(json.cards[i], location + `, card: ${i}`);
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
        case Quiz.RoundType.Sequence:
            for (let i = 0; i < json.questions.length; i++) {
                currentQuestion = parseGroup(json.questions[i], location + `, question: ${i}`);
                if (!currentQuestion) {
                    return;
                }
                questions.push(currentQuestion);
            }
            break;
        case Quiz.RoundType.Wall:
            let currentGroup: undefined|Quiz.Group;
            let groups: Quiz.Group[];
            for (let i = 0; i < json.questions.length; i++) {
                groups = [];
                for (let j = 0; j < 4; j++) {
                    currentGroup = parseGroup(json.questions[i][j], location + `, question: ${i}, group: ${j}`);
                    if (!currentGroup) {
                        return;
                    }
                    groups.push(currentGroup);
                }
                questions.push(groups as [Quiz.Group, Quiz.Group, Quiz.Group, Quiz.Group]);
            }
            break;
        case Quiz.RoundType.Vowel:
            for (let i = 0; i < json.questions.length; i++) {
                questions.push(json.questions[i]);
            }
            break;
        default:
            console.error("error parsing json: invalid round type\nat " + location + "\ngot " + json.type);
            return;
    }
    return {
        type: json.type as Quiz.RoundType,
        name: json.name,
        questions: questions
    };
}
export function parseJson(json: any): undefined|Quiz.QuizJson {
    if (!("name" in json && "rounds" in json)) {
        console.error("error parsing json: invalid root signature");
        return;
    }

    let rounds: Quiz.Round[] = [];
    let currentRound: undefined|Quiz.Round;

    for (let i = 0; i < json.rounds.length; i++) {
        currentRound = parseRound(json.rounds[i], `round: ${i}`)
        if (!currentRound) {
            return;
        }
        rounds.push(currentRound);
    }
    let quiz = {
        name: json.name,
        rounds: rounds
    }
    return quiz;
}



export async function parse(archive: File|Blob): Promise<{json: Quiz.QuizJson, files: {[index:string]:string}}|undefined> {
    const filesList = await unpack(archive);
    if (!filesList) {
        console.error("failed to unpack archive");
        return;
    }
    const archiveObj = filesList.reduce((acc, cur) => {
        acc[cur.name] = cur;
        return acc;
    }, {} as any);
    if (!archiveObj["quiz.json"]) {
        console.error("the selected .ocq did not contain a quiz.json file");
        return;
    }
    const json = parseJson(JSON.parse(await archiveObj["quiz.json"].text()));
    if (!json) return;

    const fileNames = Object.keys(archiveObj);
    
    let files: {[index: string]: string} = {};
    let promises = [];
    for (let i = 0; i < fileNames.length; i++) {
        if (fileNames[i] == "quiz.json") {
            continue;
        }
        promises.push(new Promise((resolve, reject) => {
            let j = i;
            let reader = new FileReader();
            reader.onloadend = () => {
                files[fileNames[j]] = reader.result as string;
                resolve("");
            };
            reader.readAsDataURL(archiveObj[fileNames[j]]);
        }));
    }
    await Promise.all(promises);
    return {
        json: json,
        files: files
    }
}