import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/resolverMiddleware";
import User from "src/entities/User";
import { getRepository, Between } from "typeorm";
import Ride from "src/entities/Ride";
import { GetNearbyRidesResponse } from "src/types/graphql";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRides: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              error: null,
              rides
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rides: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are Not Driver",
            rides: null
          };
        }
      }
    )
  }
};
export default resolvers;
