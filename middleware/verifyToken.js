import jwt from "jsonwebtoken";

let verifyToken = (req) => {
    const token = req.cookies.access_token;
    //if (!token) return res.status(401).send('Access denied!');
    if (!token) return {error: 'No token. Access denied!'};
    try {
        const data = jwt.verify(token, process.env.SECRET_TOKEN);
        if (data) {
            req.user_id = data.id;
            req.email = data.email;
            return {data: data};
        }
    } catch (error) {
        return {error: error};
    }
};

export default verifyToken;