export enum CardType {
    Text,
    Image
};
export enum RoundType {
    Connection,
    Sequence,
    Wall,
    Vowel
}
export const GroupColor = [
    "darkblue",
    "mediumseagreen",
    "darkred",
    "deepskyblue"
];
export type Card = {
    type: CardType,
    data: string
};

export type Group = {
    name: string,
    cards: [Card, Card, Card, Card]
};
export type VowelQuestion = {
    name: string,
    phrases: string[]
};
export type WallQuestion = [Group, Group, Group, Group];
export type Question = Group|VowelQuestion|WallQuestion;
export type Round = ConnectionRound|SequenceRound|WallRound|VowelRound
export type ConnectionRound = {
    type: RoundType.Connection,
    name: string,
    questions: Group[]
}
export type SequenceRound = {
    type: RoundType.Sequence,
    name: string,
    questions: Group[]
}
export type WallRound = {
    type: RoundType.Wall,
    name: string,
    questions: WallQuestion[]
}
export type VowelRound = {
    type: RoundType.Vowel,
    name: string,
    questions: VowelQuestion[]
}


export type Quiz = {
    name: string,
    id: string,
    created: Date,
    edited: Date,
    rounds: Round[]
};
