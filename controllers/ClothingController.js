import Clothing from "../models/ClothingModel.js";
import { ErrorWithStatusCode } from "../utils.js";

// GET
async function getClothes(req, res) {
  try {
    const clothes = await Clothing.findAll({
      attributes: ["name", "price", "category", "brand"],
    });
    res.status(200).json({
      status: "Success",
      message: "Clothes Retrieved",
      data: clothes,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET BY ID
async function getClothingById(req, res) {
  try {
    const clothing = await Clothing.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: req.params.id },
    });

    if (!clothing) {
      const error = new Error("Clothing not found 😮");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      status: "Success",
      message: "Clothing Retrieved",
      data: clothing,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE
async function createClothing(req, res) {
  try {
    const { rating, yearReleased } = req.body;

    if (Object.keys(req.body).length < 9) {
      throw new ErrorWithStatusCode("Field cannot be empty 😠", 400);
    } else if (rating < 0 || rating > 5) {
      throw new ErrorWithStatusCode("Rating must be between 1 and 5", 400);
    } else if (yearReleased < 2018 || yearReleased > 2025) {
      const currentYear = new Date().getFullYear();
      throw new ErrorWithStatusCode(
        `Release year must be between 2018 and ${currentYear}`,
        400
      );
    }

    const newClothing = await Clothing.create(req.body);
    return await res.status(201).json({
      status: "Success",
      message: "New Clothing Added",
      data: newClothing,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function updateClothing(req, res) {
  try {
    const { rating, yearReleased } = req.body;
    if (Object.keys(req.body).length < 9) {
      throw new ErrorWithStatusCode("Field cannot be empty 😠", 400);
    } else if (rating < 0 || rating > 5) {
      throw new ErrorWithStatusCode("Rating must be between 1 and 5", 400);
    } else if (yearReleased < 2018 || yearReleased > 2025) {
      const currentYear = new Date().getFullYear();
      throw new ErrorWithStatusCode(
        `Release year must be between 2018 and ${currentYear}`,
        400
      );
    }

    const ifExist = await Clothing.findOne({
      where: { id: req.params.id },
    });

    if (!ifExist) throw new ErrorWithStatusCode("Clothing not found 😮", 400);

    await Clothing.update(req.body, {
      where: { id: req.params.id },
    });

    return res.status(200).json({
      status: "Success",
      message: "Clohting Updated",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function deleteClothing(req, res) {
  try {
    const ifExist = await Clothing.findOne({
      where: { id: req.params.id },
    });
    if (!ifExist) throw new ErrorWithStatusCode("Clothing not found 😮", 400);

    await Clothing.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      status: "Success",
      message: "Clothing Removed",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getClothes,
  getClothingById,
  createClothing,
  updateClothing,
  deleteClothing,
};
