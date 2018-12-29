import { Resolvers } from "src/types/resolvers";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "src/types/graphql";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      try {
        const { email } = args;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return {
            ok: false,
            error: "You should Log in Instead",
            token: null
          };
        } else {
          await User.create({ ...args }).save();

          return {
            ok: true,
            error: null,
            token: "Coming soon"
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
