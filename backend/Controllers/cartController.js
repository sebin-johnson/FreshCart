import User from '../Models/userSchema.js';

export const updateCart = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { userId, cartItems } = req.body;

        // Validate: userId and cartItems must exist and cartItems must be an object
        if (!userId || typeof cartItems !== 'object' || Array.isArray(cartItems)) {
            return res.status(400).json({ message: "Invalid input: cartItems must be an object" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { cartItems } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Cart updated successfully", cartItems: updatedUser.cartItems });

    } catch (error) {
        console.error("Cart update error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
