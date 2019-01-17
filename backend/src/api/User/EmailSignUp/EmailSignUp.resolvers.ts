import { Resolvers } from "src/types/resolvers";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "src/types/graphql";
import User from "../../../../src/entities/User";
import createJWT from "../../../../src/utils/createJWT";
import Verification from "../../../../src/entities/Verification";
import { sendVerificationEmail } from "../../../../src/utils/sendEmail";
import encryptToHash from "../../../../src/utils/encryptToHash";

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
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          });
          if (phoneVerification) {
            args.password = await encryptToHash(args.password);
            const newUser = await User.create({ ...args }).save();

            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: "EMAIL"
              }).save();

              await sendVerificationEmail(
                newUser.email,
                newUser.fullName,
                emailVerification.key
              );
            }

            const token = createJWT(newUser.id);

            return {
              ok: true,
              error: null,
              token
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null
            };
          }
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
