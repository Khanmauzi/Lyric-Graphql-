import React, { Component } from 'react';
import {  graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
class SongDetail extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props);
        //const song  = this.props.data.loading ? <div>Loading</div> : this.props.data.song.title;
        const { song } = this.props.data;

        if(!song) { return <div>Loading ...</div>}
        return (
            <div className="container">
                <Link to="/">Back</Link>
                <h3>Song Detail</h3>
                <h5>Title: {song.title}</h5>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate id={this.props.params.id} />
            </div>
        )
    }
}
export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id }}}
})(SongDetail);