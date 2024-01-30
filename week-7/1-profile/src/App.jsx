import React from "react";

const App = () => {
  return (
    <div className="boxer">
      <CardContainer />
    </div>
  );
};

const CardContainer = () => {
  return (
    <div className="main_box">
      <UserImgWithDetail />
      <div className="empty_div"></div>
      <div className="text_container">
        <DoubleTextHolder title={"Followers"} number={"80K"} />
        <DoubleTextHolder title={"Likes"} number={"803K"} />
        <DoubleTextHolder title={"Photos"} number={"1.4K"} />
      </div>
    </div>
  );
};

const UserImgWithDetail = () => {
  return (
    <div className="user_controller">
      <div className="user_img"></div>
      <div className="inner_text">
        <span>
          <span className="myName">Akshat Gangi</span>21
        </span>
        <span>NewDelhi, INDIA</span>
      </div>
    </div>
  );
};

const DoubleTextHolder = ({ title, number }) => {
  return (
    <div className="each_text_tag">
      <span className="below_numbers">{number}</span>
      <span className="below_title">{title}</span>
    </div>
  );
};

export default App;
