import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/resolverMiddleware";
import User from "../../../../src/entities/User";
import Verification from "../../../../src/entities/Verification";
import { sendVerificationEmail } from "../../../../src/utils/sendEmail";
import { RequestEmailVerificationResponse } from "../../../../src/types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;

        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email
            });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: user.email,
              target: "EMAIL"
            }).save();
            await sendVerificationEmail(
              user.email,
              user.fullName,
              newVerification.key
            );
            return {
              ok: true,
              error: null
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "You has no Email to verify"
          };
        }
      }
    )
  }
};

export default resolvers;
