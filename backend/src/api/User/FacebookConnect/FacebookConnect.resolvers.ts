import { Resolvers } from "src/types/resolvers";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "src/types/graphql";
import User from "../../../entities/User";
import createJWT from "../../../../src/utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      // If check existing User result is False, Insert New Account
      try {
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();

        const token = createJWT(newUser.id);

        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
