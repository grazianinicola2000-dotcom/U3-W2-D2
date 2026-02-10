import Button from "react-bootstrap/Button";

const FantasyBooks = function (props) {
  return (
    <>
      <Button
        variant="dark"
        onClick={(e) => {
          props.changeCategory();
          e.stopPropagation();
        }}
      >
        History
      </Button>
    </>
  );
};

export default FantasyBooks;
