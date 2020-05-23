import React, {Component} from 'react';
import gql from 'graphql-tag';      // it helps to write graphql query
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import  query from '../queries/fetchSongs';
class SongList extends Component {
    constructor(props){
        super(props);
        this.onSongDelete = this.onSongDelete.bind(this);
    }
    onSongDelete(id) {
        console.log(id);
        this.props.mutate( {
            variables: { id}
        }).then(() => this.props.data.refetch());
    }
    renderSongs() {
        return (
            <div>
            {this.props.data.loading ? <p>Loading Songs</p> :this.props.data.songs.map(song =>
                <li key={song.id} className="collection-item">
                <Link to={`/songs/${song.id}`}>
                {song.title}
                </Link>
                 <i 
                    className="material-icons"
                    onClick={() => this.onSongDelete(song.id)}
                >
                    delete
                </i>
                </li>)
            }
            </div>
        )
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <ul className="collection">
                {this.renderSongs()}
                </ul>
                <Link to="/songs/new"
                className="btn-floating btn-large red right"
                >
                <i className="material-icons">add</i>
                </Link>
            </div>
            
        );
    }
}

const mutation = gql `
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id){
            id
        }
    }
`;

export default graphql(mutation) (
     graphql(query) (SongList)
);
