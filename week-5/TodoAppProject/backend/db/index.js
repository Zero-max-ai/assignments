const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(`db connection error ${err.stack}`));
};

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    todo: [],
  },
  {
    timeStamp: true,
  }
);

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model("user", UserSchema);
const Todo = mongoose.model("todo", TodoSchema);
module.exports = { dbConnect, User, Todo };
