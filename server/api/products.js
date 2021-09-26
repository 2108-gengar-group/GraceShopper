const router = require('express').Router()
const { models: { Product }} = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')

//GET /api/products
router.get('/', async (req, res, next) => {
	try {
		res.send(await Product.findAll({
			attributes: [
				'id',
				'name',
				'description',
				'price',
				'imageUrl',
				"inventoryQuantity"
			]
		}
		));
	} catch (error) {
		next(error);
	}
});

//GET /api/products/:id
router.get('/:id', async (req, res, next) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.id,
			},
			attributes: [
				'id',
				'name',
				'description',
				'price',
				'imageUrl',
				'inventoryQuantity'
			]
		});
		res.json(product);
	} catch (error) {
		next(error);
	}
});

//POST /api/products
router.post('/', async (req, res, next) => {
	try {
		res.status(201).send(await Product.create(req.body));
	} catch (error) {
		next(error);
	}
});

//DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (product) {
			await product.destroy();
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

//PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		res.send(await product.update(req.body));
	} catch (error) {
		next(error);
	}
});

module.exports = router
