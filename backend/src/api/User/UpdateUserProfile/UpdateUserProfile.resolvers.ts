import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/resolverMiddleware";
import encryptToHash from "../../../../src/utils/encryptToHash";
import {
  UpdateUserProfileMutationArgs,
  UpdateUserProfileResponse
} from "../../../../src/types/graphql";
import User from "../../../../src/entities/User";
import cleanNullArgs from "../../../../src/utils/cleanNullArgs";

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
