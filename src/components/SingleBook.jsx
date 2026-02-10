const SingleBook = function (props) {
  return (
    <div onClick={props.onClick} className={`${props.selected === props.asin ? "border border-5 border-danger mb-3 card p-0 rounded-4" : " mb-3 card p-0"}`}>
      <img src={props.img} className="card-img-top" alt="book_cover" />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <p className="card-title">{props.title}</p>
          <h5 className="card-text p-0 m-0">{props.price}$</h5>
        </div>
        <div className="mt-2 d-flex justify-content-end justify-content-lg-between mx-4">
          <button type="button" className="btnDelete btn btn-danger">
            <i className="bi bi-trash"></i>
          </button>
          <button type="button" className="btnCart btn btn-dark">
            <i className="bi bi-cart-plus text-light"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
