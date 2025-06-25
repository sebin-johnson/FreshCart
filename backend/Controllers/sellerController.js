import jwt from 'jsonwebtoken'

// seller login
export const sellerLogin = (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '30d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });


            res.status(201).json({ message: 'Seller login successful', token });
        } else {
            res.status(409).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// seller authentication
export const isSellerAuth = async (req, res) => {
    try {
        res.status(200).json("User authenticated")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// seller logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        res.status(200).json("Seller logout successfull");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
