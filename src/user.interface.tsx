export interface User {
    picture: string;
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