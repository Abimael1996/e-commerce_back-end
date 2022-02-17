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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(`Category name updated to ${req.body.category_name}`)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // find all the products associated with the category
    const productsToDelete = await Product.findAll({
      where: {
        category_id: req.params.id
      }
    });
    // delete all the products associated with the category
    if(productsToDelete) {
      for (const product of productsToDelete) {
        await Product.destroy({
          where: {
            id: product.dataValues.id
          }
        })
      };
    };
    const categoryToDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryToDelete) {
      res.status(404).json("The category you are tying to delete doesn't exist")
    } else {
      res.status(200).json(categoryToDelete)
    }
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
