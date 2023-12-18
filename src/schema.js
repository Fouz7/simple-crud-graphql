import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import VideoGame from "./models/VideoGame.js";

const VideoGameType = new GraphQLObjectType({
    name: "VideoGame",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        platform: {type: new GraphQLList(GraphQLString) },
        publisher: { type: GraphQLString },
        release_date: { 
            type: GraphQLString,
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        videoGame: {
            type: VideoGameType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return VideoGame.findById(args.id);
            },
        },
        videoGames: {
            type: new GraphQLList(VideoGameType),
            resolve(parent, args) {
                return VideoGame.find({});
            },
        },
    },
}); 

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addVideoGame: {
        type: VideoGameType,
        args: {
          title: { type: new GraphQLNonNull(GraphQLString) },
          release_date: { type: new GraphQLNonNull(GraphQLString) },
          platform: { type: new GraphQLNonNull(GraphQLString) },
          publisher: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          let videoGame = new VideoGame({
            title: args.title,
            platform: args.platform,
            publisher: args.publisher,
            release_date: args.release_date
          });
          return videoGame.save();
        }
      },
      deleteVideoGame: {
        type: VideoGameType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parent, args) {
          return VideoGame.findByIdAndDelete(args.id);
        }
      },
      updateVideoGame: {
        type: VideoGameType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          title: { type: GraphQLString },
          platform: {type: new GraphQLList(GraphQLString)},
          release_date: { type: GraphQLString },
          publisher: { type: GraphQLString }
        },
        resolve(parent, args) {
          return VideoGame.findByIdAndUpdate(args.id, args, { new: true });
        }
      }
    }
  });
  
  export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });