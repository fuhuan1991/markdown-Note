import React  from 'react';
import './style.scss';
import {
  FileAddOutlined,
  FileMarkdownOutlined,
  FolderOutlined,
  FolderAddOutlined,
  GithubOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  NavLink,
  useHistory
} from "react-router-dom";
import { isSignedIn, getNickName } from '../auth/util';

const Welcome = () => {

  const history = useHistory();
  const signed = isSignedIn();
  const nickname = getNickName();

  if (!signed) {
    history.push("/signin");
  }

  return (
    signed && <div className='welcome'>
      <h1>Welcome to MD-Note, {nickname}</h1>

      <h2>Create your notes with Markdown</h2>
      <ul>
        <li>Full Markdown syntax support</li>
        <li>Real time compilation and display</li>
        <li>Auto saving</li>
      </ul>
      <br/>
      
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

      <h2>About me 
        &nbsp;
        <a href="https://fuhuan1991.github.io"><UserOutlined /></a>
        &nbsp;
        <a href="https://github.com/fuhuan1991"><GithubOutlined /></a>
      </h2>
      <p>
        I'm Huan Fu, a Software Engineer with 2 years of developing experience of data platform and E-commerce web applications. 
        I'm always passionate in applying programing skills to create better experience for users.
        Currently, I'm a master’s student in computer science at Tufts University.
      </p>
    </div>
  );
}

export default Welcome;