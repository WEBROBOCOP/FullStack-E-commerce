import createError from "http-errors";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Get order details
export const getOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        
        const order = await Order.findById(orderId)
            .populate({
                path: 'items.product',
                select: 'title price category image'
            })
            .populate('userId', 'fullName email');
        
        if (!order) {
            throw createError(404, "Order not found");
        }

        res.status(200).json({
            success: true,
            message: "Order retrieved successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Create new order from cart
export const createOrder = async (req, res, next) => {
    try {
        const { address, phone } = req.body;
        const userId = req.user._id;  // From checkToken middleware

        // Get user's cart
        const cart = await Cart.findOne({ _id: req.user.cartId })
            .populate('items.product');

        if (!cart || cart.items.length === 0) {
            throw createError(400, "Cart is empty");
        }

        // Create order from cart items
        const order = await Order.create({
            userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            address,
            phone
        });

        // Clear the cart after order creation
        await Cart.findByIdAndUpdate(cart._id, { $set: { items: [] } });

        // Populate order details
        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: 'items.product',
                select: 'title price category image'
            })
            .populate('userId', 'fullName email');

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: populatedOrder
        });
    } catch (error) {
        next(error);
    }
};

// Get all orders for a user
export const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user._id;  // From checkToken middleware

        const orders = await Order.find({ userId })
            .populate({
                path: 'items.product',
                select: 'title price category image'
            })
            .sort({ createdAt: -1 });  // Most recent first

        res.status(200).json({
            success: true,
            message: "User orders retrieved successfully",
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// Cancel order (if needed)
export const cancelOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const userId = req.user._id;

        const order = await Order.findOneAndDelete({ 
            _id: orderId,
            userId  // Ensure user can only cancel their own orders
        });

        if (!order) {
            throw createError(404, "Order not found or unauthorized");
        }

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully"
        });
    } catch (error) {
        next(error);
    }
};
