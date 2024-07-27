export enum GroupType {
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
export type Tuple4<T> = [T, T, T, T]

export type TextGroup = {
    type: GroupType.Text,
    name: string,
    cards: Tuple4<string>
};
export type ImageGroup = {
    type: GroupType.Image,
    name: string,
    cards: Tuple4<string>
};
export type Group = ImageGroup|TextGroup;

export function blankGroup(type: GroupType): Group {
    return {
        type: type, 
        name: "", 
        cards: Array(4).fill("")
    } as Group;
}
export const blankTextGroup = (): TextGroup => blankGroup(GroupType.Text) as TextGroup;
export const blankImageGroup = (): ImageGroup => blankGroup(GroupType.Image) as ImageGroup;

export type VowelQuestion = {
    name: string,
    phrases: string[]
};
export const blankVowelQuestion = () => ({name: "", phrases: []});

export type WallQuestion = Tuple4<TextGroup>;
export const blankWallQuestion = (): WallQuestion => Array.from({length: 4}, blankTextGroup) as WallQuestion;

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



