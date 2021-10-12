import "./App.css";
import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-number";

const alanKey =
  "290d953a932412b6813ccd82fe472caa2e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parseNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parseNumber - 1];
          if (parseNumber > 20) {
            alanBtn().playText("Please try that again");
          } else {
            alanBtn().playText("opening...");
            window.open(article.url, "_blank");
          }
        }
      },
    });
  }, []);

  function handleOnClick() {
    window.location.reload();
  }

  return (
    <div className="app">
      <div onClick={handleOnClick} className="app__logo">
        <h1>
          <strong>
            <i>News Corridor</i>
          </strong>
        </h1>
      </div>

      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <div className="app__desc">
        <h3>Created by : Mradul Jain</h3>
        <h4>Tech used : React Js</h4>
      </div>
    </div>
  );
}

export default App;
