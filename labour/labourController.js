var labourModel = require('./labourModel.js');

/**
 * labourController.js
 *
 * @description :: Server-side logic for managing labours.
 */
module.exports = {

    /**
     * labourController.list()
     */
    list: function (req, res) {
        labourModel.find(function (err, labours) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting labour.',
                    error: err
                });
            }
            return res.json(labours);
        });
    },

    /**
     * labourController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        labourModel.findOne({_id: id}, function (err, labour) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting labour.',
                    error: err
                });
            }
            if (!labour) {
                return res.status(404).json({
                    message: 'No such labour'
                });
            }
            return res.json(labour);
        });
    },

    /**
     * labourController.create()
     */
    create: function (req, res) {
        var labour = new labourModel({
			name : req.body.name,
			phone : req.body.phone,
			category : req.body.category,
			comments : req.body.comments,
			strength : req.body.strength,
			hiredate : req.body.hiredate
        });

        labour.save(function (err, labour) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating labour',
                    error: err
                });
            }
            return res.status(201).json(labour);
        });
    },

    /**
     * labourController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        labourModel.findOne({_id: id}, function (err, labour) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting labour',
                    error: err
                });
            }
            if (!labour) {
                return res.status(404).json({
                    message: 'No such labour'
                });
            }

            labour.name = req.body.name ? req.body.name : labour.name;
			labour.phone = req.body.phone ? req.body.phone : labour.phone;
			labour.category = req.body.category ? req.body.category : labour.category;
			labour.comments = req.body.comments ? req.body.comments : labour.comments;
			labour.strength = req.body.strength ? req.body.strength : labour.strength;
			labour.hiredate = req.body.hiredate ? req.body.hiredate : labour.hiredate;
			
            labour.save(function (err, labour) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating labour.',
                        error: err
                    });
                }

                return res.json(labour);
            });
        });
    },

    /**
     * labourController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        labourModel.findByIdAndRemove(id, function (err, labour) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the labour.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
