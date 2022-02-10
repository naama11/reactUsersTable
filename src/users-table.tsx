import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import {User} from "./user.interface";

export function UsersTable(props: { results: User[]; previousPage: MouseEventHandler<HTMLButtonElement> | undefined; nextPage: MouseEventHandler<HTMLButtonElement> | undefined; setUser: (user: User) => void})
{
    return (
        <>
            <div>
                <table id="users">
                    <tbody>
                        {props.results.map((user : User) =>
                            <tr>
                                <th><Link to={"/user"} onClick={() => props.setUser(user)}>{user.name.title + ' ' + user.name.first + ' ' + user.name.last}</Link></th>
                                <th>{user.dob.age}</th>
                                <th>{user.email}</th>
                                <th>{user.gender}</th>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button onClick={props.previousPage}>Previous Page</button>
                <button onClick={props.nextPage}>Next Page</button>
            </div>
        </>);
};