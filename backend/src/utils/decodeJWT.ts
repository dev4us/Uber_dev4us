import jwt from "jsonwebtoken";
import User from "../../src/entities/User";

const decodeJWT = async (token: string): Promise<any> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const user = await User.findOne({ id });

    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
