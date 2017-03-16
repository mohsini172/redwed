var orderModel = require('./orderModel.js');

/**
 * orderController.js
 *
 * @description :: Server-side logic for managing orders.
 */
module.exports = {

    /**
     * orderController.list()
     */
    list: function (req, res) {
        orderModel.find(function (err, orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }
            return res.json(orders);
        })
            .populate("customerid", ['cname', 'phone1']);
    },

    /**
     * orderController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        orderModel.findOne({ _id: id }, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }
            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }
            return res.json(order);
        });
    },

    /**
     * orderController.create()
     */
    create: function (req, res) {
        var order = new orderModel({
            qty: req.body.qty,
            orderdate: req.body.orderdate,
            dlvdate: req.body.dlvdate,
            advance: req.body.advance,
            customerid: req.body.customerid,
            delivered: req.body.delivered,
            items: req.body.items
        });
        console.log(order);
        order.save(function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating order',
                    error: err
                });
            }
            return res.status(201).json(order);
        });
    },

    /**
     * orderController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        orderModel.findOne({ _id: id }, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order',
                    error: err
                });
            }
            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }

            order.qty = req.body.qty ? req.body.qty : order.qty;
            order.orderdate = req.body.orderdate ? req.body.orderdate : order.orderdate;
            order.dlvdate = req.body.dlvdate ? req.body.dlvdate : order.dlvdate;
            order.advance = req.body.advance ? req.body.advance : order.advance;
            order.customerid = req.body.customerid ? req.body.customerid : order.customerid;
            order.delivered = req.body.delivered ? req.body.delivered : order.delivered;
            order.items = req.body.items ? req.body.items : order.items;

            order.save(function (err, order) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating order.',
                        error: err
                    });
                }

                return res.json(order);
            });
        });
    },

    /**
     * orderController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        orderModel.findByIdAndRemove(id, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the order.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    getOrders: function (req, res) {
        orderModel.find(function (err, orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }
            var summary = {
                'totalPrice': 0,
                'totalAdvance': 0,
                'totalCost': 0,
                'totalItems': 0,
                'remainingItems': 0,
                'totalOrders': 0,
                'totalPaid': 0
            };
            for (var i in orders) {
                var items = orders[i].items;
                for (j = 0; j < items.length; j++) {
                    item = items[j];
                    summary.totalPrice += item.price;
                    summary.totalCost += item.cost;
                }
                summary.totalItems += items.length;
                if (!orders[i].delivered) {
                    summary.remainingItems += items.length;
                    summary.totalAdvance += orders[i].advance;
                }
                else {
                    summary.totalPaid += item.price;
                }
            }
            summary.totalOrders = orders.length;
            res.send(summary);
        })
    },
    markDelivered: function (req, res) {
        var id = req.body.id;
        orderModel.findOne({ _id: id }, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }
            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }
            order.delivered = true;
            order.save(function (err, order) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating order.',
                        error: err
                    });
                }

                return res.json(order);
            });
        });
    }
};
