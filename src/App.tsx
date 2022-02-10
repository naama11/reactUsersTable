import React, { useEffect, useState} from 'react';
import './App.css';
import {UsersTable} from "./users-table";
import {Gender, User,} from "./user.interface";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {UserPage} from "./user-page";
const _ = require('lodash');

const users: User[] = [
  {
    name: {
      title: "Ms",
      first: "Osi",
      last: "Almog"
    },
    dob: {
      date: new Date(),
      age: 5
    },
    email: "a@m",
    picture: {
      "large": "https://randomuser.me/api/portraits/men/75.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
    },
    gender: Gender.Female,
  }
];

function App() {
  // TODO: move logic to wrapper component
  // TODO: handle error from server

  const [page, setPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(users[0]);

  useEffect(() =>
  {
    fetch("https://randomuser.me/api/?page=" + page + "&results=" + pageSize + "&seed=abcd")
        .then(res => res.json())
        .then(
            (result) =>
            {
              setIsLoaded(true);
              const itemsToSave = result.results.map((item: { picture: any; name: any; email: any; gender: any; dob: any; }) =>
              {
                return {
                  picture: item.picture.small,
                  name: item.name,
                  email: item.email,
                  gender: item.gender,
                  dob: item.dob
                };
              });
              if (!_.isEqual(itemsToSave, items)){
                setItems(itemsToSave);
                // TODO: handle init of user state- what should be done here?
                setCurrentUser(itemsToSave[0]);
              }
              console.log('result.result' + result.results);
            }
        )
  },
      [items, page]);

  // TODO: should set page title here according to component displayed.
  const pageSize = 10;

  // TODO: first next click is not moving next page
  function nextPage() {
    setPage(page + 1);
  }

  function previousPage() {
    if (page > 0) {
      setPage(page -1);
    }
  }

  function updateCurrentUser(user: User) {
    setCurrentUser(user);
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<UsersTable results={items} nextPage={nextPage} previousPage={previousPage} setUser={updateCurrentUser} page={page}/>}></Route>
            <Route path='/user' element={<UserPage user={currentUser}/>}></Route>
          </Routes>
        </div>
        </Router>
    );
  }
}

export default App;
