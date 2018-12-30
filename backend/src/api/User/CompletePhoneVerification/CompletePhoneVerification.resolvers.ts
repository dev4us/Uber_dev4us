import { Resolvers } from "src/types/resolvers";
import {
  CompletePhoneVerificationResponse,
  CompletePhoneVerificationMutationArgs
} from "src/types/graphql";
import Verification from "../../../../src/entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../../src/utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key: key
        });

        if (!verification) {
          return {
            ok: false,
            error: "Verification Key is not valid",
            token: null
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      try {
        const user = await User.findOne({ phoneNumber });

        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();

          const token = createJWT(user.id);

          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: true,
            error: null,
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
