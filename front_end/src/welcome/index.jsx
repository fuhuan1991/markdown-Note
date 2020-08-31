import React, { useState } from 'react';
import './style.scss';
import {
  FileAddOutlined,
  FileMarkdownOutlined,
  FolderOutlined,
  FolderAddOutlined,
  GithubOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  NavLink
} from "react-router-dom";
import { resetDB } from "../api/client";
import { Button, Popconfirm } from 'antd';

const reset = () => {
  resetDB();
  console.log('data base deleted');
  window.location.reload();
}

const Welcome = () => {

  const [resetOpen, setResetOpen] = useState(false);

  const coverClass = resetOpen ? "cover open" : "cover";

  return (
    <div className='welcome'>
      <h1>Welcome to MD-Note</h1>
      <p>Create your notes with Markdown</p>
      <ul>
        <li>Full Markdown syntax support</li>
        <li>Real time compilation and display</li>
        <li>No need for account</li>
        <li>Automatical saving</li>
      </ul>
      <br/>

      <h2>Local Storage</h2>
      <p>
        MD-Note stores your notes locally, which means all your files are accessible offline!
      </p>
      <br/>

      <h2>Reset Local Data Base</h2>
      <p>
        You can reset your local database via this button.
      </p>
      <div style={{position: 'relative'}}>
        <div 
          className={coverClass} 
          onClick={() => {setResetOpen(!resetOpen)}}
        >
          <WarningOutlined style={{ fontSize: '50px', color: '#FFD152' }}/>
        </div>
        <Popconfirm title="Sure to reset the database?" onConfirm={reset}>
          <Button type="primary" danger>RESET</Button>
        </Popconfirm>
      </div>
      <br/><br/><br/>
      
      <h2>Navigation</h2>
      <p>
        You can keep mutiple notebooks(folders), each of them can hold mutiple notes(files). 
        Use the Menu on left side for navigation. 
      </p>
      <ul>
          <li><FolderOutlined/> directs you to a notebook view which allows you manage everything in it.</li>
          <li><FileMarkdownOutlined/> directs you to a note editor.</li>
          <li><FolderAddOutlined/> creates a new notebook.</li>
          <li><FileAddOutlined/> creates a new note file in current notebook.</li>
      </ul>
      <p>
        Click <NavLink to="/root">here</NavLink> to view your root directory.
      </p>
      <br/>

      <h2>About Markdown</h2>
      <div style={{display: "flex"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="104" height="64" viewBox="0 0 208 128"><rect width="198" height="118" x="5" y="5" ry="10" stroke="#FFD152" strokeWidth="10" fill="none"/><path  fill="#FFD152" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/><script xmlns=""/></svg>
        <p style={{marginLeft: '20px'}}>
          Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.
        </p>
      </div>
      <p>
      Markdown is a fast and easy way to take notes, create content for a website, and produce print-ready documents.
It doesn’t take long to learn the Markdown syntax, and once you know how to use it, you can write using Markdown just about everywhere. Most people use Markdown to create content for the web, but Markdown is good for formatting everything from email messages to grocery lists.
      </p>
      <br/>

      <h2>About me</h2>
      <p><GithubOutlined />&nbsp;&nbsp;<NavLink to="/root">https://github.com/fuhuan1991</NavLink></p>
      <p>
        I'm Huan Fu, a Software Engineer with 2 years of developing experience of data platform and E-commerce web applications
        Currently, I'm a master’s student in computer science at Tufts and am very passionate in applying programing skills to create better experience for users.
      </p>
    </div>
  );
}

export default Welcome;