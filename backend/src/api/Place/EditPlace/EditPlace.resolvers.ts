import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/resolverMiddleware";
import User from "../../../../src/entities/User";
import {
  EditPlaceMutationArgs,
  EditPlaceResponse
} from "../../../../src/types/graphql";
import Place from "../../../../src/entities/Place";
import cleanNullArgs from "../../../../src/utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        const place = await Place.findOne({ id: args.placeId });

        if (place) {
          if (place.userId === user.id) {
            const notNull = cleanNullArgs(args);
            await Place.update({ id: args.placeId }, { ...notNull });
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Not Authorized"
            };
          }
        } else {
          return {
            ok: false,
            error: "Place Not Found!"
          };
        }
        try {
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
