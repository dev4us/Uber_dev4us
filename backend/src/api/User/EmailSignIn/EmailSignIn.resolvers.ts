import { Resolvers } from "src/types/resolvers";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "src/types/graphql";
import User from "../../../../src/entities/User";
import createJWT from "../../../../src/utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return {
            ok: false,
            error: "No User with that Email",
            token: null
          };
        }
        const checkPassword = await user.comparePassword(password);

        if (checkPassword) {
          const token = createJWT(user.id);

          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "Wrong Password",
            token: null
          };
        }
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
