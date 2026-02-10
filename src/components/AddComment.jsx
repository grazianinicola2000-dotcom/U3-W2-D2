import Button from "react-bootstrap/Button";

const AddComment = function (props) {
  return (
    <>
      <Button
        variant="primary"
        onClick={(e) => {
          props.openForm();
          e.stopPropagation();
        }}
      >
        ADD COMMENT
      </Button>
    </>
  );
};

export default AddComment;
