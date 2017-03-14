var customerModel = require('./customerModel.js');
var orderModel = require("../order/orderModel");
/**
 * customerController.js
 *
 * @description :: Server-side logic for managing customers.
 */
module.exports = {

    /**
     * customerController.list()
     */
    list: function (req, res) {
        customerModel.find(function (err, customers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting customer.',
                    error: err
                });
            }
            return res.json(customers);
        });
    },

    /**
     * customerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        customerModel.findOne({ _id: id }, function (err, customer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting customer.',
                    error: err
                });
            }
            if (!customer) {
                return res.status(404).json({
                    message: 'No such customer'
                });
            }
            return res.json(customer);
        });
    },

    /**
     * customerController.create()
     */
    create: function (req, res) {
        var customer = new customerModel({
            cname: req.body.cname,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            email: req.body.email,
            city: req.body.city
        });

        customer.save(function (err, customer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating customer',
                    error: err
                });
            }
            return res.status(201).json(customer);
        });
    },

    /**
     * customerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        customerModel.findOne({ _id: id }, function (err, customer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting customer',
                    error: err
                });
            }
            if (!customer) {
                return res.status(404).json({
                    message: 'No such customer'
                });
            }

            customer.cname = req.body.cname ? req.body.cname : customer.cname;
            customer.phone1 = req.body.phone1 ? req.body.phone1 : customer.phone1;
            customer.phone2 = req.body.phone2 ? req.body.phone2 : customer.phone2;
            customer.email = req.body.email ? req.body.email : customer.email;
            customer.city = req.body.city ? req.body.city : customer.city;

            customer.save(function (err, customer) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating customer.',
                        error: err
                    });
                }

                return res.json(customer);
            });
        });
    },

    /**
     * customerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        customerModel.findByIdAndRemove(id, function (err, customer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the customer.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    orders: function (req, res) {
        var id = req.params.id;
        orderModel.find({ customerid: id }, function (err, orders) {
            if (err) {
                return res.status(400).json({
                    message: 'Error no order found.',
                    error: err
                });
            }
            res.json(orders);
        })
    }
};
