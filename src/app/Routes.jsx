import React from 'react';
import {
  Switch,
  Route,
  useParams,
  Redirect,
} from "react-router-dom";
import MkNote from '../mkNote/index';
import DirModule from '../dirModule';
import Welcome from '../welcome';

const Routes = (props) => {

  const { nodeTable, rootKey, fetchMenuFromRear } = props;

  return (
    <Switch>
      <Route exact path="/">
        <Welcome/>
      </Route>
      <Route exact path="/root">
        <RootWrapper 
          rootDir={!!nodeTable ? nodeTable[rootKey] : null} 
          updateFunction={fetchMenuFromRear}
        />
      </Route>
      <Route path="/dir/:id">
        <DirWrapper 
          nodeTable={nodeTable}
          updateFunction={fetchMenuFromRear}
        />
      </Route>
      <Route path="/note/:id">
        <MkNoteWrapper />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

const RootWrapper = (props) => {

  let { rootDir, updateFunction } = props;

  return (
    <DirModule 
      directory={rootDir} 
      updateFunction={updateFunction}
    />
  );
}

const DirWrapper = (props) => {

  let { id } = useParams();
  let { nodeTable, updateFunction } = props;

  if (!nodeTable[id]) return <Redirect to='/root' />
  
  return (
    <DirModule 
      directory={nodeTable[id]} 
      updateFunction={updateFunction}
    />
  );
}

const MkNoteWrapper = () => {

  let { id } = useParams();

  return (
    <MkNote 
      noteId={id}
    />
  );
}

export default Routes;