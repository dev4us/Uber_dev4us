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
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        if (!user.isRiding) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
            user.isRiding = true;
            user.save();
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
        } else {
          return {
            ok: false,
            error: "You can't request tow rides",
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
