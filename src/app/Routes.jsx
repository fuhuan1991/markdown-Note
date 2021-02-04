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
import SignUp from '../auth/SignUp';
import Confirm from '../auth/Confirm';
import SignIn from '../auth/SignIn';
import { isSignedIn } from '../auth/util';
import PropTypes from 'prop-types';
import { getUserId } from '../auth/util';


const Routes = (props) => {

  const { nodeTable, rootKey, fetchMenuFromRear, menuReady } = props;
  const signed = isSignedIn();
  const userId = getUserId();

  return (
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route exact path="/signin">
        <SignIn fetchMenuFromRear={fetchMenuFromRear}/>
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/confirm">
        <Confirm />
      </Route>
      <Route exact path="/root">
        {(!signed && <Redirect to="/signin" />)}
        {
          (signed && menuReady) &&
            <RootWrapper 
              rootDir={!!nodeTable ? nodeTable[rootKey] : null} 
              updateFunction={fetchMenuFromRear.bind(this, userId)}
            />
        }
      </Route>
      <Route path="/dir/:id">
        {(!signed && <Redirect to="/signin" />)}
        {
          (signed && menuReady) &&
            <DirWrapper 
              nodeTable={nodeTable}
              updateFunction={fetchMenuFromRear.bind(this, userId)}
            />
        } 
      </Route>
      <Route path="/note/:id">
        {(!signed && <Redirect to="/signin" />)}
        {(signed && menuReady) && <MkNoteWrapper />}
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
      isRoot={true}
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
      isRoot={false}
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

Routes.propTypes = {
  nodeTable: PropTypes.object,
  rootKey: PropTypes.string,
  fetchMenuFromRear: PropTypes.func.isRequired,
  menuReady: PropTypes.bool.isRequired,
};

export default Routes;