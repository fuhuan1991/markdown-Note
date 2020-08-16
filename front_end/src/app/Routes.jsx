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

const onRouteChange = (a,b) => {
  console.log(a,b)
}

const Routes = (props) => {

  const { dirTable, rootKey, fetchMenuFromRear } = props;

  return (
    <Switch>
      <Route exact path="/">
        <Welcome/>
      </Route>
      <Route exact path="/root">
        <RootWrapper 
          rootDir={!!dirTable ? dirTable[rootKey] : null} 
          updateFunction={fetchMenuFromRear}
        />
      </Route>
      <Route path="/dir/:id">
        <DirWrapper 
          dirTable={dirTable}
          updateFunction={fetchMenuFromRear}
        />
      </Route>
      <Route path="/note/:id" onChange={onRouteChange}>
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
  let { dirTable, updateFunction } = props;

  if (!dirTable[id]) return <Redirect to='/root' />
  
  return (
    <DirModule 
      directory={dirTable[id]} 
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