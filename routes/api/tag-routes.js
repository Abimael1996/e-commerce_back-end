const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    });
    if (!tagsData) {
      res.status(404).json("No tags found");
    } else {
      res.status(200).json(tagsData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    });
    if(!tagData) {
      res.status(404).json("Tag doesn't exist")
    } else {
      res.status(200).json(tagData)
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    if(req.body.tag_name) {
      const tagData = await Tag.create(req.body);
      res.status(200).json(`Tag ${tagData.tag_name} was added to the database`)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(`Tag name updated to ${req.body.tag_name}`)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deletedTag) {
      res.status(404).json("The tag you are trying to delete does not exist")
    } else {
      res.status(200).json(deletedTag)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
