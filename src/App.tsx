import React, {useEffect, useState} from 'react';
import './App.css';
import {UsersTable} from "./users-table";
import {Gender, User,} from "./user.interface";
//import {Router} from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {UserPage} from "./user-page";
const _ = require('lodash');

const users: User[] = [
  {
    name: {
      title: "Ms",
      first: "Naama",
      last: "Almog"
    },
    dob: {
      date: new Date(),
      age: 5
    },
    email: "a@m",
    picture: "a",
    gender: Gender.Female,
  },
  {
    name: {
      title: "Ms",
      first: "Osi",
      last: "Almog"
    },
    dob: {
      date: new Date(),
      age: 25
    },
    email: "a@m",
    picture: "a",
    gender: Gender.Male,
  }
];

function App() {
  // TODO: move logic to wrapper component
  // TODO: handle error from server

  const [page, setPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // TODO: why called several times when no change? should use useMemo? ,
  //       [items]
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
              }
              console.log('result.result' + result.results);
            }
        )
  },
      [items, page]);

  // TODO: don't see the title
  useEffect(() => {
    document.title = 'All Users';
  }, []);


  const pageSize = 10;

  // TODO: currentUser should pass from table component as event when clicked. and pass params here
  let currentUser = items[0];

  // TODO: use these fuctions with state, with disable for previous button if page =0
  function nextPage() {
    setPage(page + 1);
  }

  function previousPage() {
    if (page > 0) {
      setPage(page -1);
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={< UsersTable  results={items} nextPage={nextPage} previousPage={previousPage}/>}></Route>
            <Route path='/user' element={<UserPage  user={currentUser}/>}></Route>
          </Routes>
        </div>
        </Router>
    );
  }
}

export default App;
