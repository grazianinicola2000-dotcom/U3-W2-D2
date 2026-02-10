import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import Spinner from "react-bootstrap/Spinner";
import CommentForm from "./CommentForm.jsx";
import ErrorAlert from "./ErrorAlert.jsx";
import Container from "react-bootstrap/Container";

const commentURL = "https://striveschool-api.herokuapp.com/api/comments/";

const CommentArea = function (props) {
  const [comments, setcomments] = useState([]);
  const [loading, setloading] = useState(true);
  const [showForm, setshowForm] = useState(false);
  const [error, seterror] = useState(false);
  const [errorOnDelete, seterrorOnDelete] = useState(false);

  const getComments = () => {
    seterror(false);
    seterrorOnDelete(false);
    fetch(`${commentURL}${props.asin}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg0OWQ4OTgwMjA2ODAwMTUwNGRjNjYiLCJpYXQiOjE3NzAyOTg3NjEsImV4cCI6MTc3MTUwODM2MX0.5HPVG6w8TCM0o7XPYaMQ5viB5Dbf_otJopgN0CeBnRA",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei commenti");
        }
      })
      .then((data) => {
        setcomments(data);
        setloading(false);
      })
      .catch(() => {
        seterror(true);
        setloading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, [props.asin]);

  const deleteComment = (commentId) => {
    fetch(`${commentURL}${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg0OWQ4OTgwMjA2ODAwMTUwNGRjNjYiLCJpYXQiOjE3NzAyOTg3NjEsImV4cCI6MTc3MTUwODM2MX0.5HPVG6w8TCM0o7XPYaMQ5viB5Dbf_otJopgN0CeBnRA",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Commento eliminato con successo!");
          getComments();
        } else {
          throw new Error("Errore nell'eliminazione del commento");
        }
      })
      .catch(() => {
        seterrorOnDelete(true);
      });
  };

  return (
    <>
      <Container className="position-sticky bg-light rounded-4 py-2" style={{ top: "15px" }}>
        <h3>Comments</h3>
        <section>
          {error && <ErrorAlert text="Si è verificato un errore nel caricamento dei commenti." />}
          {errorOnDelete && <ErrorAlert text="Si è verificato un errore nell'eliminazione del commento." />}
          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {comments.map((comment) => {
            return (
              <div key={comment._id} className="d-flex justify-content-between align-items-center mb-3 border-bottom border-1">
                <div>
                  <h6 className="m-0 p-0">{comment.author}</h6>
                  <p className="m-0 p-0 mb-2">{comment.comment}</p>
                  <p className="m-0 p-0">
                    Rating: <strong>{comment.rate}</strong>/5
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteComment(comment._id);
                  }}
                  type="button"
                  className="btnDelete btn btn-danger h-25"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            );
          })}
        </section>
        <AddComment asin={props.asin} openForm={() => setshowForm(true)} />
      </Container>
      <CommentForm asin={props.asin} show={showForm} onCommentAdded={getComments} onHide={() => setshowForm(false)} />
    </>
  );
};
export default CommentArea;
