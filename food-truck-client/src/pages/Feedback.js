import React from "react";

const Feedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      comment: "The food was great and the service was excellent",
      rating: 4
    },
    {
      id: 2,
      name: "Jane Doe",
      comment: "The food was not good",
      rating: 2
    },
    {
      id: 3,
      name: "John Doe",
      comment: "The food was great",
      rating: 4
    },
    {
      id: 4,
      name: "Jane Doe",
      comment: "The food was not good",
      rating: 2
    }
  ];
  return <div>
    <h4>Feedbacks</h4>
    <div className="row">
      {feedbacks.map((feedback) => {
        return <div key={feedback.id} className="col-md-6 col-lg-4">
          <div className="c-card mt-3">
            <div className="card-body">
              <h5 className="card-title">{feedback.name}</h5>
              <p className="card-text">
                <small className="text-muted">Rating: {feedback.rating} / 5</small>
              </p>
              <p className="card-text mt-3">{feedback.comment}</p>
            </div>
            <div className="input-div d-flex align-items-center justify-content-between mt-3">
              <input type="text" placeholder="add your comment" />
              <button className="black-btn" style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginLeft: "10px",
                aspectRatio: "1",
              }}>
                <i class="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>;
      })}
    </div>
  </div>;
};

export default Feedback;
