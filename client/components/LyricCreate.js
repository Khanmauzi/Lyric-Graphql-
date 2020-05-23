import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricCreate extends Component {
    constructor(props){
        super(props);
        this.state =  {
            content: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                content:this.state.content,
                songId: this.props.id
            }
        }).then(() => this.setState({content:''}));

    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <labbel>Add a Lyric</labbel>
                    <input 
                        value = {this.state.content} 
                        onChange = {event => this.setState({content: event.target.value})}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql `
    mutation AddLyricToSong($content:String, $songId:ID){
        addLyricToSong(content: $content, songId: $songId){
        id
        title
        lyrics{
            id
            content
        }
        }
    }
  `;

export default graphql(mutation)(LyricCreate);