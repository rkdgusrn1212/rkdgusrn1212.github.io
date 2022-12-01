import Footer from "./components/Footer";
import Header from "./components/Header";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as Posts from "./posts";
import { useState, useEffect } from "react";
import fm from "front-matter";

function App() {

  const [mdObj, setMdObj] = useState("");
  useEffect(() => {
    fetch(Posts.post0)
      .then((res) => res.text())
      .then((text) => {
        setMdObj(fm(text));
      });
  }, []);
  return (
    <>
      <Header />
      <h1>
        {JSON.stringify(mdObj.attributes)}
      </h1>
      <ReactMarkdown children={mdObj.body} remarkPlugins={[remarkGfm]} />
      <Footer />
    </>
  );
}

export default App;