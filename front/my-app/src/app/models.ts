export interface Task {
    id: number;
    name: string;
    statement: string;
    start_time: string;
    author: number;
    points: number;
}

export interface Token {
    access: string;
    refresh: string;
}

export interface Rating {
    id:number;
    bio:string;
    points:number;
    username:string;
}

export interface Comment {
    user: number;
    id: number;
    content: string;
    votes: number;
    user_id: number;
    task: number;
}


export interface Solution {
    author: number;
    content: string;
    submit_time: string;
    points: number;
}

export interface SolutionCreate {
    id: number;
    author: number;
    submit_time: string;
    content: string;
    task:number;
    points: number;
}
