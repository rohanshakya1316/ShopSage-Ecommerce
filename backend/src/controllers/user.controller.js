import userService from "../services/user.service.js";

const getAllUsers = async (req, res) => {
  try {
    const user = await userService.getAll(req.query);

    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id, req.user);

    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body,
      req.user,
    );

    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const user = await userService.updateProfileImage(req.user._id, req.file);

    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const updateUserRoles = async (req, res) => {
  try {
    const user = await userService.updateUserRoles(
      req.params.id,
      req.body?.roles,
      req.user,
    );
    return res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

export default {
  getAllUsers,
  getById,
  createUser,
  updateUser,
  deleteUser,
  updateProfileImage,
  updateUserRoles,
};
