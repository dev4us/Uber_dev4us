import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import encryptToHash from "../../../utils/encryptToHash";
import {
  UpdateUserProfileMutationArgs,
  UpdateUserProfileResponse
} from "../../../types/graphql";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateUserProfile: privateResolver(
      async (
        _,
        args: UpdateUserProfileMutationArgs,
        { req }
      ): Promise<UpdateUserProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);

        if (notNull.password !== null) {
          user.password = await encryptToHash(notNull.password);
          user.save();
          delete notNull.password;
        }

        try {
          await User.update({ id: user.id }, { ...notNull });
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
      }
    )
  }
};

export default resolvers;
