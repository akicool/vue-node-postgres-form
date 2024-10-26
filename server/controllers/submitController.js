const pool = require("../db/pool");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { decodedTokenDTO } = require("../dto/decoded");

const handleGetDecodedToken = async (req, res) => {
  try {
    const accessToken = await req?.cookies["access-token-x"];
    const decodedToken = decodedTokenDTO(
      jwt.verify(accessToken, process.env.SECRET_KEY)
    );

    res.json(decodedToken);
  } catch (err) {
    console.error(err);
  }
};

const handleCreateUser = async (req, res) => {
  try {
    const { name, password } = await req?.body;
    const person = await pool.query("SELECT * FROM person WHERE name = $1", [
      name,
    ]);

    if (person?.rows[0]?.name) {
      return res
        .status(409)
        .json({ message: "Пользователь с таким именем уже существует" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newPerson = await pool.query(
      "INSERT INTO person (name, password) VALUES ($1, $2) RETURNING *",
      [name, hashPassword]
    );

    const token = jwt.sign(newPerson.rows[0], process.env.SECRET_KEY);

    // let options = {
    //   maxAge: 1000 * 60 * 15,
    //   httpOnly: true,
    //   signed: true,
    // };

    // res.cookie("access-token-x", token, options);
    res.cookie("access-token-x", token);

    res.json(newPerson.rows[newPerson.rows.length - 1]);
  } catch (err) {
    console.error(err);
  }
};

const handleGetUser = async (req, res) => {
  try {
    const { name, password } = req?.body;
    const person = await pool.query("SELECT * FROM person WHERE name = $1", [
      name,
    ]);

    if (person.rows.length === 0) {
      return res.status(404).json({ message: "Пользователи не найдены" });
    }

    const hashPassword = person.rows[0]?.password;

    const isPasswordValid = await bcrypt.compare(password, hashPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверный пароль!" });
    }

    res.json(person.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

const handleGetUsers = async (req, res) => {
  try {
    const person = await pool.query("SELECT * FROM person");

    res.json(person.rows);
  } catch (err) {
    console.error(err);
  }
};

const submitController = {
  createUser: handleCreateUser,
  getUser: handleGetUser,
  getUsers: handleGetUsers,
  getDecodedToken: handleGetDecodedToken,
};

module.exports = { submitController };
