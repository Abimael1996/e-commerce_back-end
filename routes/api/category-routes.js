const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    });
    if (!categoriesData) {
      res.status(404).json("No categories found")
    } else {
      res.status(200).json(categoriesData)
    }
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    });
    if (!categoryData) {
      res.status(404).json("Category doesn't exist")
    } else {
      res.status(200).json(categoryData)
    }
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
      res.status(200).json(`${newCategory.category_name} category has been added to the database`)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
