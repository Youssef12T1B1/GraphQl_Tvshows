const graphql = require('graphql')
const { partial } = require('lodash')
const _=require('lodash')
const Tvshow = require('../models/Tvshow')
const Director = require('../models/Director')

const { GraphQLObjectType, GraphQLString, 
    GraphQLSchema , GraphQLID, GraphQLInt,
    GraphQLList, GraphQLNonNull


} = graphql



// const GenreType = new GraphQLObjectType({
//     name : 'Genre',
//     fields: () =>({
//         id : {type: GraphQLID},
//         name : {type: GraphQLString},
//         description : {type: GraphQLString},
//     })
// }) 
const TvshowType = new  GraphQLObjectType({
    name : 'Tvshow',
    fields: () =>({
        id : {type: GraphQLID},
        title : {type: GraphQLString},
        realseDate : {type: GraphQLString},
        EpNumber: {type: GraphQLInt},
        story:  {type: GraphQLString},
        genre:  {type: GraphQLString
            // type : new GraphQLList(GenreType),
            // resolve(parent,args){
            //    // return _.filter(genres, {name:parent.genre})

            // }
        },
        director :{
            type: directorType,
            resolve(parent, args){
               // return _.find(directors, {id:parent.directorId})
               return Director.findById(parent.DirectorId)

            }
        }

    })
})

const directorType = new  GraphQLObjectType({
    name : 'Director',
    fields: () =>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        age : {type: GraphQLInt},
        tvshows:  {
            type : new GraphQLList(TvshowType),
            resolve(parent,args){
               // return _.filter(tvshows, {directorId:parent.id})
               return Tvshow.find({DirectorId: parent.id})

            }
        },

    })
})


const RootQuery = new  GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        tvshow: {
            type: TvshowType,
            args: {id: {type: GraphQLID}},
            resolve(parent , args) {
                // get data 
                //return _.find(tvshows, {id:args.id})
                return Tvshow.findById(args.id)
            }
        },
        director: {
            type: directorType,
            args: {id: {type: GraphQLID}},
            resolve(parent , args) {
                // get data 
                //return _.find(directors, {id:args.id})
                return Director.findById(args.id)
            }
        },
        tvshows: {
            type: new GraphQLList(TvshowType),
            resolve(parent, args){
                return Tvshow.find({})
            }
        },
        directors: {
            type: new GraphQLList(directorType),
            resolve(parent, args){
               return Director.find({})
            }
        }


    }



})

const Mutation = new GraphQLObjectType({
    name: 'Mutaion',
    fields:{
        addDirector :{
            type: directorType,
            args: {
                name: { type:new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}

            },
            resolve(parent,args){
                let director = new Director({
                    name: args.name,
                    age: args.age
                })
                return director.save()

            }
        },
        addTvshow:{
            type: TvshowType,
            args: {
                title: {type:  new GraphQLNonNull(GraphQLString)},
                story: {type:  new GraphQLNonNull(GraphQLString)},
                realseDate: {type:  new GraphQLNonNull( GraphQLString)},
                EpNumber: {type:  new GraphQLNonNull( GraphQLInt)},
                genre: {type: new GraphQLNonNull( GraphQLString)},
                DirectorId: {type:  new GraphQLNonNull( GraphQLID)},


            },
            resolve(parent,args){
                let tvshow = new Tvshow({
                    title: args.title,
                    story: args.story,
                    realseDate: args.realseDate,
                    EpNumber: args.EpNumber,
                    genre: args.genre,
                    DirectorId: args.DirectorId,

                    
                })
                return tvshow.save()

            }
        }
    }

})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})