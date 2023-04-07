const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: {
        model: Product
      }
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Failed to retrieve' });
  }
});

router.get('/:id', (req, res) => {

  Category.findOne({ where: { id: req.params.id } }).then((oneCategory) => {
    res.json(oneCategory)
  })
    .catch((err) => {
      res.json(err)
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {

      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            category_id: category.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.json(productTagIds))
    .catch((err) => {
      console.log(err);
      res..json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then((destroyedCategory) => {
      res.json(destroyedCategory)
    })
    .catch((err) => {
      res.json(err)
    })
});

module.exports = router;
