const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    if(!tagData){
      res.status(400).json({ message: 'no tags'})
      return
    }
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    if(!tagData){
      res.status(400).json({ message: 'no tags'})
      return
    }
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    
    res.status(200).json(newTagData)
  } catch(err) {
    res.status(400).json(err);
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

    
    
    res.status(200).json(tagData)
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    
    
    res.status(200).json(tagData)
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
