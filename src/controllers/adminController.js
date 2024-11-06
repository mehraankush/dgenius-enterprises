import {
    createSubUserLogic,
    getSubUsersLogic,
    loginAdminLogic,
    registerAdminLogic
} from "../services/admin.js";


export const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await registerAdminLogic(username, password);

        return res.status(201).json({
            message: 'Admin registered successfully',
            user
        });

    } catch (error) {
        console.error('Error in registerAdmin:', error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await loginAdminLogic(username, password);
        return res.json({ token });
    } catch (error) {
        console.error('Error in loginAdmin:', error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};

export const getSubUsers = async (req, res) => {
    try {
        if (!req.admin) {
            return res.status(401).json({
                message: 'Admin not authenticated'
            });
        }

        const adminId = req.admin.id;
        const subUsers = await getSubUsersLogic(adminId);

        let avalibleSubUsers = subUsers.length == 0 ? "no users avalible " : subUsers;

        return res.json({
            avalibleSubUsers
        });

    } catch (error) {
        console.error('Error in getSubUsers:', error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};

export const createSubUser = async (req, res) => {
    try {

        if (!req.admin) {
            return res.status(401).json({
                message: 'Admin not authenticated'
            });
        }

        const adminId = req.admin.id;
        const { username, password } = req.body;
        const user = await createSubUserLogic(adminId, username, password);

        return res.status(201).json({
            message: 'Sub-user created successfully',
            user
        });

    } catch (error) {
        console.error('Error in createSubUser:', error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};
