const graphql = require('graphql')
const { partial } = require('lodash')
const _=require('lodash')
const Tvshow = require('../models/Tvshow')
const Director = require('../models/Director')

const { GraphQLObjectType, GraphQLString, 
    GraphQLSchema , GraphQLID, GraphQLInt, GraphQLList


} = graphql



const GenreType = new GraphQLObjectType({
    name : 'Genre',
    fields: () =>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        description : {type: GraphQLString},
    })
}) 
const TvshowType = new  GraphQLObjectType({
    name : 'Tvshow',
    fields: () =>({
        id : {type: GraphQLID},
        title : {type: GraphQLString},
        realseDate : {type: GraphQLString},
        genre:  {
            type : new GraphQLList(GenreType),
            resolve(parent,args){
               // return _.filter(genres, {name:parent.genre})

            }
        },
        director :{
            type: directorType,
            resolve(parent, args){
               // return _.find(directors, {id:parent.directorId})

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
        tvshows : {
            type : new GraphQLList(TvshowType)
        },
        tvshows:  {
            type : new GraphQLList(TvshowType),
            resolve(parent,args){
               // return _.filter(tvshows, {directorId:parent.id})

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
            }
        },
        director: {
            type: directorType,
            args: {id: {type: GraphQLID}},
            resolve(parent , args) {
                // get data 
                //return _.find(directors, {id:args.id})
            }
        },
        tvshows: {
            type: new GraphQLList(TvshowType),
            resolve(parent, args){
                //return tvshows
            }
        },
        directors: {
            type: new GraphQLList(directorType),
            resolve(parent, args){
                //return directors
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
                name: {type: GraphQLString},
                age: {type: GraphQLInt}

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
                title: {type: GraphQLString},
                story: {type: GraphQLString},
                realseDate: {type: GraphQLString},
                EpNumber: {type: GraphQLInt},
                genre: {type: GraphQLString},
                DirectorId: {type: GraphQLID},


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