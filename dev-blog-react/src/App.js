import Footer from "./components/Footer";
import Header from "./components/Header";
import PostListContainer from "containers/post/PostListContainer";

function App() {
  return (
    <>
      <Header />
      <PostListContainer/>
      <Footer />
    </>
  );
}

export default App;