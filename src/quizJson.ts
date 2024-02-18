export enum CardType {
    Text = 0,
    Image = 1,
    Audio = 2
};
export enum RoundType {
    Connection = 0,
    Sequence = 1,
    Wall = 2,
    Vowel = 3
}
export const GroupColor = [
    "darkblue",
    "mediumseagreen",
    "darkred",
    "deepskyblue"
];
export interface Card {
    type: CardType,
    data: string
};

export interface Group {
    name: string,
    cards: [Card, Card, Card, Card]
};
export interface VowelQuestion {
    name: string,
    phrases: string[]
};
export type Question = Group|[Group, Group, Group, Group]|VowelQuestion;
export interface Round {
    type: RoundType,
    name: string,
    questions: Question[]
};

export interface Quiz {
    name: string,
    id: string
    rounds: Round[]
};