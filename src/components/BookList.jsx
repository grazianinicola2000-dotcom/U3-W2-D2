import { Col, Container, Row } from "react-bootstrap";
import SingleBook from "./SingleBook.jsx";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import CommentArea from "./CommentArea.jsx";

const BookList = function (props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(false);

  const { books } = props;
  return (
    <>
      <Container>
        <Form className="d-flex my-3 gap-2 mx-5">
          <Form.Group className="w-100">
            <Form.Control
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="text"
              placeholder="Search..."
            />
          </Form.Group>
        </Form>
      </Container>
      <Container className="d-flex justify-content-between flex-wrap gap-3">
        <Row>
          <Col xs={6}>
            {books
              .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((book) => (
                <SingleBook
                  onClick={() => {
                    setSelected(book.asin);
                  }}
                  key={book.asin}
                  asin={book.asin}
                  img={book.img}
                  title={book.title}
                  price={book.price}
                  selected={selected}
                />
              ))}
          </Col>
          <Col xs={6}>{selected && <CommentArea asin={selected} />}</Col>
        </Row>
      </Container>
    </>
  );
};

export default BookList;
