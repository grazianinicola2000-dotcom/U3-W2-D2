import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const commentURL = "https://striveschool-api.herokuapp.com/api/comments/";

const initialCommentData = {
  comment: "",
  rate: "",
};

const CommentForm = function (props) {
  const [commentData, setcommentData] = useState(initialCommentData);

  console.log("CommentForm props:", props);
  return (
    <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={false} onClick={(e) => e.stopPropagation()}>
      <Modal.Header>
        <Modal.Title>Write your comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(commentURL, {
              method: "POST",
              body: JSON.stringify({
                ...commentData,
                elementId: props.asin,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg0OWQ4OTgwMjA2ODAwMTUwNGRjNjYiLCJpYXQiOjE3NzAyOTg3NjEsImV4cCI6MTc3MTUwODM2MX0.5HPVG6w8TCM0o7XPYaMQ5viB5Dbf_otJopgN0CeBnRA",
              },
            })
              .then((response) => {
                if (response.ok) {
                  alert("commento salvato con successo!");
                  setcommentData(commentData);
                  props.onCommentAdded();
                  props.onHide();
                } else {
                  throw new Error("errore nel salvataggio del commento");
                }
              })
              .catch((err) => {
                console.log("ERRORE NEL SALVATAGGIO", err);
              });
          }}
        >
          <Form.Label htmlFor="comment">Add your comment:</Form.Label>
          <Form.Control
            className="mb-4"
            type="text"
            id="comment"
            value={commentData.comment}
            onChange={(e) => {
              console.log("NAME CAMBIATO", e.target.value);
              setcommentData({
                ...commentData,
                comment: e.target.value,
              });
            }}
            required
          />
          <Form.Select
            value={commentData.rate}
            onChange={(e) => {
              console.log("NAME CAMBIATO", e.target.value);

              setcommentData({
                ...commentData,
                rate: e.target.value,
              });
            }}
            aria-label="Default select example"
          >
            <option>Rate</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <Button className="mt-3" type="submit" variant="dark">
            ADD
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CommentForm;
