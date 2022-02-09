import {User} from "./user.interface";
import React from "react";

export function UserPage(props: {user: User}) {
    return (
        <>
            <ul className="UserPage">
                <li>Name: {props.user.name.title + ' ' + props.user.name.first + ' ' + props.user.name.last}</li>
                <li>Age: {props.user.dob.age}</li>
                <li>Email: {props.user.email}</li>
            </ul>
        </>
    );
}