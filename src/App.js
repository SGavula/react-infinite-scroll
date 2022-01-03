import React, { useState, useEffect } from "react";

import InfiniteScroll from 'react-infinite-scroll-component';

import axios from "axios";

function App() {
  const [ items, setItems ] = useState();
  const [ limitStart, setLimitStart ] = useState(20);
  const [ hasMore, setHasMore ] = useState(true);


  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=20`).then(response => {
      setItems(response.data);
    }).catch(error => {
      console.log(error);
    }) 
  }, [])

  const getData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${limitStart}&_limit=20`).then(response => {
      console.log("Server response: ", response.data);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setItems([...items, ...response.data]);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const fetchData = () => {
    getData();
    setLimitStart(prevLimit => prevLimit + 20);
  }

  return (
    <div className="App">
      {
        items ? (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {
              items.map(item => (
                <div key={item.id}>
                  <span>{item.id}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))
            }
          </InfiniteScroll>
        ) : null
      }
    </div>
  );
}

export default App;
