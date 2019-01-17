import privateResolver from "../../../../src/utils/resolverMiddleware";
import { Resolvers } from "../../../../src/types/resolvers";
import {
  GetChatQueryArgs,
  GetChatResponse
} from "../../../../src/types/graphql";
import Chat from "../../../../src/entities/Chat";
import User from "../../../../src/entities/User";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        user.save();
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ["messages"] }
          );
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                ok: true,
                error: null,
                chat
              };
            } else {
              return {
                ok: false,
                error: "Not authorized to see this chat",
                chat: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Not Found",
              chat: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};
export default resolvers;
