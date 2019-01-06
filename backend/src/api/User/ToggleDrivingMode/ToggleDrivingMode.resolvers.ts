import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/resolverMiddleware";
import { ToggleDrivingModeResponse } from "../../../../src/types/graphql";
import User from "../../../../src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        user.isDriving = !user.isDriving;
        await user.save();

        return {
          ok: true,
          error: null
        };
      }
    )
  }
};

export default resolvers;
