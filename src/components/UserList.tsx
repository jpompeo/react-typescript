import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IAppState } from '../store/RootReducer';
import { IUser } from '../store/user/UserTypes';

interface IUserListOwnProps {

}

interface IUserListStateToProps {
    user: IUser
}

// const ComponentName: ComponentType<PropsInterface> = (): ReturnType => {}
const UserList: React.FC<IUserListOwnProps> = (): JSX.Element => {
    return (
        <CenterContent>
            <p>
                UserList
            </p>
            <Link
                to='/'
            >
                Home
            </Link>
        </CenterContent>
    );
}

const CenterContent = styled.div`
  text-align: center;
`;

const mapStateToProps: MapStateToProps<
        IUserListStateToProps,
        IUserListOwnProps,
        IAppState
> = (state: IAppState, ownProps: IUserListOwnProps): IUserListStateToProps => ({
    user: state.user,
    ...ownProps
})

export default connect<IUserListStateToProps, {}, IUserListOwnProps, IAppState>(mapStateToProps)(UserList);