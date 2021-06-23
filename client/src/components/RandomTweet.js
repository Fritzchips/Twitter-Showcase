import React, { useState } from "react";
import axios from "axios";
import ShowItems from "./ShowItems";

function RandomTweet() {
  const [timeline, setTimeLine] = useState([]);
  const tweetHandler = (e) => {
    findingPerson(e.target.value);
  };

  async function findingPerson(name) {
    try {
      const list = await axios.get(`/UserSearch/Mentions/${name}`);
      const findlist = list.data;

      setTimeLine(findlist);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div>
        <button value="elonmusk" onClick={tweetHandler}>
          Elon Musk
        </button>
        <button value="magicjohnson" onClick={tweetHandler}>
          Magic Johnson
        </button>
        <button value="playstation" onClick={tweetHandler}>
          Play Station
        </button>
        <button value="elonmusk" onClick={tweetHandler}>
          Elon Musk
        </button>
        <button value="elonmusk" onClick={tweetHandler}>
          Elon Musk
        </button>
      </div>
      <div>
        {timeline.length > 1 ? <ShowItems timeline={timeline} /> : <></>}
      </div>
    </div>
  );
}

export default RandomTweet;
