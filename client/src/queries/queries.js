import {gql}  from "@apollo/client";

const getDirectorsQuery = gql`
{
    directors{
        name
        id
    }
}
`
const getTvshowsQuery = gql`
{
    tvshows{
        id
        title
    

    }
}
`
const addTvshowMutation = gql`

    mutation($title: String!, $story: String!, $realseDate: String!, $EpNumber: Int!, $genre: String!, $DirectorId :ID!) {
         addTvshow(title: $title, story: $story, realseDate: $realseDate, EpNumber: $EpNumber, genre: $genre, DirectorId: $DirectorId){
                title 
                id
            }
    }

`
const getTvshowQuery = gql`
    query($id:ID){
        tvshow(id:$id){
            id
            title
            story
            genre
            realseDate
            EpNumber
            director{
                id
                name
                age
                tvshows{
                    title
                }
            }

        }
    }

`
export{getDirectorsQuery, getTvshowsQuery, addTvshowMutation,getTvshowQuery}