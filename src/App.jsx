import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNav from "./components/MyNav.jsx";
import MyFooter from "./components/MyFooter.jsx";
import Welcome from "./components/Welcome.jsx";
import BookList from "./components/BookList.jsx";
import FantasyBooks from "./components/FantasyBooks.jsx";
import fantasyBooks from "./data/fantasy.json";
import HistoryBooks from "./components/HistoryBooks.jsx";
import historybooks from "./data/history.json";
import HorrorBooks from "./components/HorrorBooks.jsx";
import horrorbooks from "./data/horror.json";
import RomanceBooks from "./components/RomanceBooks.jsx";
import romancebooks from "./data/romance.json";
import ScifiBooks from "./components/ScifiBooks.jsx";
import scifibooks from "./data/scifi.json";
import { useState } from "react";

function App() {
  const [booksCategory, setbooksCategory] = useState(fantasyBooks);

  return (
    <>
      <MyNav title="EpiBook" />
      <Welcome />
      <div className="d-flex w-100 justify-content-center gap-5">
        <ScifiBooks changeCategory={() => setbooksCategory(scifibooks)} />
        <RomanceBooks changeCategory={() => setbooksCategory(romancebooks)} />
        <HorrorBooks changeCategory={() => setbooksCategory(horrorbooks)} />
        <HistoryBooks changeCategory={() => setbooksCategory(historybooks)} />
        <FantasyBooks changeCategory={() => setbooksCategory(fantasyBooks)} />
      </div>
      <BookList books={booksCategory} />
      <MyFooter />
    </>
  );
}

export default App;
