import React, {MouseEventHandler, useEffect} from "react";
import { Link } from "react-router-dom";
import {User} from "./user.interface";

export function UsersTable(props: { results: User[]; previousPage: MouseEventHandler<HTMLButtonElement> | undefined; nextPage: MouseEventHandler<HTMLButtonElement> | undefined; setUser: (user: User) => void; page: number})
{
    useEffect(() => {
        document.title = 'All Users';
    }, []);

    // TODO: image is fetched from server using the image link provided from server?
    // TODO: search - did not see in server. should search only in UI? (can have less then 10 results..
    return (
        <>
            <div>
                <table id="users">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
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
                <button onClick={props.previousPage} disabled={props.page === 0}>Previous Page</button>
                <button onClick={props.nextPage}>Next Page</button>
            </div>
        </>);
};