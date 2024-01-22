import React, { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [interests, setInterests] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const addNewUser = () => {
    setUsers([
      ...users,
      { name, description, interests, linkedinLink, twitterLink },
    ]);
    setName("");
    setDescription("");
    setInterests("");
    setLinkedinLink("");
    setTwitterLink("");
  };
  return (
    <div>
      <div className="user_input_manager">
        <InputHandler
          labelName={"Name"}
          type={"text"}
          placeholder={"enter the name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputHandler
          labelName={"Short Description"}
          type={"text"}
          placeholder={"enter short description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputHandler
          labelName={"Interests"}
          type={"text"}
          placeholder={"enter the interests"}
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <InputHandler
          labelName={"LinkedIn Profle Link"}
          type={"text"}
          placeholder={"www.linkedin.com/"}
          value={linkedinLink}
          onChange={(e) => setLinkedinLink(e.target.value)}
        />
        <InputHandler
          labelName={"Twitter"}
          type={"text"}
          placeholder={"www.twitter.com/"}
          value={twitterLink}
          onChange={(e) => setTwitterLink(e.target.value)}
        />
        <ButtonHandler
          className={"full-width addTask"}
          innerContent={"Add new user"}
          onClick={addNewUser}
        />
      </div>
      <div>
        {users.length ? (
          <div className="user_showcaser">
            <h1>Users</h1>
            {users.map(
              ({ name, description, interests, linkedinLink, twitterLink }) => (
                <Card
                  name={name}
                  description={description}
                  interests={interests}
                  linkedinLink={linkedinLink}
                  twitterLink={twitterLink}
                />
              )
            )}
          </div>
        ) : (
          <h1>No user added till now!</h1>
        )}
      </div>
    </div>
  );
};

const InputHandler = ({ labelName, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="">{labelName}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const ButtonHandler = ({ className, innerContent, onClick }) => {
  return (
    <div>
      <button className={`btn ${className}`} onClick={onClick}>
        {innerContent}
      </button>
    </div>
  );
};

const Card = ({ name, description, interests, linkedinLink, twitterLink }) => {
  return (
    <div className="card_base">
      <h2>{name}</h2>
      <h4>{description}</h4>
      <h4>Intesets</h4>
      <span>{interests.split(" ")}</span>
      <div className="">
        <ButtonHandler className={'group'} innerContent={"LinkedIn"} onClick={() => {window.location.href=`${linkedinLink}`}} />
        <ButtonHandler className={'group'} innerContent={"Twitter"} onClick={twitterLink} />
      </div>
    </div>
  );
};

export default App;
