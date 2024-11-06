import { loginSubUserLogic, subUserProfile } from "../services/sub-user.js";

export const loginSubUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await loginSubUserLogic(username, password);
        return res.json({ token });
    } catch (error) {
        console.error('Error in loginSubUser:', error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};

export const getSubUSerProgile = async (req, res) => {
    try {
        const user = await subUserProfile(req);
        return res.json({ user });
    } catch (error) {
        console.error('Error in loginSubUser:', error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};