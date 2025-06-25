import Address from "../Models/addressSchema.js"

// add address
export const addAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const newAddress = await Address.create(addressData);

        res.status(201).json({ message: "Address added", address: newAddress });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            errors: error.errors
        });
    }
}

export const getAddress = async (req, res) => {
    try {
        console.log("→ getAddress called with query:", req.query);
        const { userId } = req.query;

        if (!userId) {
            console.warn("⚠️ Missing userId in getAddress");
            return res.status(400).json({ message: "Missing userId" });
        }

        const addresses = await Address.find({ userId });
        console.log("→ Found addresses:", addresses.length);

        return res.status(200).json({ addresses });
    } catch (error) {
        console.error("🔥 getAddress ERROR:", error);
        return res
            // make this a 500 so we can distinguish it from a 409 conflict
            .status(500)
            .json({ message: "Server error fetching addresses", error: error.message });
    }
};
