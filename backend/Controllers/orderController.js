import Order from "../Models/orderSchema.js";
import Product from "../Models/productSchema.js";
import User from "../Models/userSchema.js";
import stripe from 'stripe'

// ✅ Place Order with COD
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        // Basic validation
        if (!userId || !address || !items || items.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const productDoc = await Product.findById(item.product); // ✅ Fix: variable renamed
            if (!productDoc) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            amount += productDoc.offerPrice * item.quantity;
        }

        // Create Order
        const newOrder = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD',
        });

        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Order error:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// place order online
export const placeOrderOnline = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!userId || !address || !items || items.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let productData = [];
        let amount = 0;

        for (const item of items) {
            const productDoc = await Product.findById(item.product);
            if (!productDoc) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }

            productData.push({
                name: productDoc.name,
                price: productDoc.offerPrice,
                quantity: item.quantity
            });

            amount += productDoc.offerPrice * item.quantity;
        }

        const newOrderOnline = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online',
        });

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = productData.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: Math.floor(item.price * 1.02 * 100), // add 2% charge + convert to cents
            },
            quantity: item.quantity
        }));

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: newOrderOnline._id.toString(),
                userId
            }
        });

        return res.status(201).json({ url: session.url, order: newOrderOnline });

    } catch (error) {
        console.error("Order error:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// stripe webhooks
export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const { orderId, userId } = session.metadata;

                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                await User.findByIdAndUpdate(userId, { cartItems: {} });
                console.log("Order marked as paid via checkout:", orderId);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (err) {
        console.error("Webhook handler error:", err);
        res.status(500).send("Webhook handler failed");
    }
};


// get user orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing userId in query" });
        }

        const orders = await Order.find({
            userId,
            $or: [
                { paymentType: 'COD' },
                { isPaid: false } // Optional: adjust based on your schema
            ]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// get all orders
export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })
        res.status(201).json(allOrders)
    } catch (error) {
        res.status(409).json(error)
    }
}