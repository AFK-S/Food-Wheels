import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const { data } = await axios.get("/api/order/all/feedback", {
          signal,
        });
        setFeedbacks(data.data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        alert(err.response?.data?.message || err.message || err);
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h4>Feedbacks</h4>
      <div className="row">
        {feedbacks.map((feedback) => {
          return (
            <div key={feedback._id} className="col-md-6 col-lg-4">
              <div className="c-card mt-3">
                <div className="card-body">
                  <h5 className="card-title">{feedback.customer_name}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      Rating: {feedback.rating} / 5
                    </small>
                  </p>
                  <p className="card-text mt-3">{feedback.feedback}</p>
                </div>
                {/* <div className="input-div d-flex align-items-center justify-content-between mt-3">
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
            </div> */}
              </div>
            </div>
          );
        })}
      </div>
      {/* <button onClick={() => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("HELLO")
      } else {
        new Notification("okok")

      }
    }}>okoko</button> */}
    </div>
  );
};

export default Feedback;
