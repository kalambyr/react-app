import React, { Component } from 'react';
import './App.css';
import './style.css';

const app = document.getElementById('root')

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  };
  edit = () => {
    this.setState ({edit: true});
  };
  remove = () => {
    this.props.deleteBlock(this.props.index);
  };
  save = () => {
    var value = this.refs.newTxt.value;
    this.props.update(value, this.props.index);
    this.setState ({edit: false})
  };
  rendNorm = () => {
    return (
      <div className="box">
        <div className="text">{this.props.children}</div>
        <button onClick={this.edit} className="btn light">Edit</button>
        <button onClick={this.remove} className="btn red">Delete</button>
      </div>
    );
  };
  rendEdit = () => {
    return (
      <div className="box">
        <textarea ref="newTxt" defaultValue={this.props.children}></textarea>
        <button onClick={this.save} className="btn success">Save</button>
      </div>
    );
  };
  render() {
    if (this.state.edit) {
      return this.rendEdit ();
    } else {
      return this.rendNorm ();
    }
  }
}

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  };


    componentDidMount(){
      fetch('/users').then(res => res.json()).then(users => this.setState({ users }));
    }

  // eachUser = (item, i) => {
  //   return (
  //     <Task key={i} index={i} update={this.updateText} deleteBlock={this.deleteBlock}>
  //       {item}
  //     </Task>
  //   );
  // };


  deleteBlock = (i) => {
    var array = this.state.users;
    array.splice(i, 1);
    this.setState({users: array});
  };

  updateText = (text, i) => {
    var arr = this.state.users;
    arr[i].username = text;
    this.setState ({users: arr});
  };

  render() {
    return (
      <div className="field">
        {
          this.state.users.map (value => <Task children={value.username} index={value.id} update={this.updateText} deleteBlock={this.deleteBlock}/>)
        }﻿
      </div>
    );
  }
}

export default Field;
