export interface User {
    picture: Picture;
    name: FullName;
    email: string;
    gender: Gender;
    dob: DateOfBirth;
}

export interface UsersTableProps {
    results: User[];
    nextPage: () => void;
    previousPage: () => void
}

export interface DateOfBirth {
    date: Date;
    age: number;
}

export interface FullName {
    title: string;
    first: string;
    last: string;
}

export enum Gender {
    Female= "Female",
    Male = "Male"
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}