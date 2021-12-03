import React from "react";
import {tagsURL} from '../utils/constant';
import Loader  from "./Loader"

export default class Sidebar extends React.Component {
    state = {
        tags: null,
         error:''
    }
    componentDidMount() {
        fetch(tagsURL)
            .then((res) => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                return res.json()
            })
                .then((tags) => {
                    this.setState({ tags, error:''});
                })
                .catch((err)=> {
                    this.setState({error: 'Not able to fetch tags'})
                })
    
}
render() {
    const {tags} = this.state;
    if(error){
        return <p>{error}</p>
    }
    if (!tags){
       return <Loader/> 
    }
  return (
    <aside className="sidebar">
      <h3 className="sidebar-heading">Popular Tags</h3>
      {tags.map((tag)=>(<span key={tags} className="tag">{tag}</span>))}
    </aside>
  );
}
}