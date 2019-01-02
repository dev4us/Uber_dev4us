import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../../src/utils/resolverMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};
export default resolvers;
