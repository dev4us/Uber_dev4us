import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/resolverMiddleware";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../../src/types/graphql";
import Ride from "../../../../src/entities/Ride";
import User from "../../../../src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.create({ ...args, passenger: user }).save();
          return {
            ok: true,
            error: null,
            ride
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
