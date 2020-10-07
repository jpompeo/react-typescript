import React, {useEffect, useState } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IAppState } from '../store/RootReducer';
import { IUser } from '../store/user/UserTypes';
import { getFriendList as getFriendListAction } from '../store/user/UserActions';

interface IUserListOwnProps {

}

interface IUserListStateToProps {
    user: IUser
}

interface IUserListDispatchToProps {
    //propertyName: [function](param: paramType) => returnType;
    getFriendList: (url: string) => void;
}

type IUserList = IUserListStateToProps & IUserListDispatchToProps & IUserListOwnProps;

// const ComponentName: ComponentType<PropsInterface> = (): ReturnType => {}
const UserList: React.FC<IUserList> =
    ({
        user,
        getFriendList
     }): JSX.Element => {

    //declaring state with hooks
        //[stateName, methodToSetState] = functionToInvokeState<typeOfStateValue>(initialState);
    const [fetchFriends, setFetchFriends] = useState<boolean>(true);

    //on component mount/update?
    useEffect(() => {
        if (fetchFriends) {
            getFriendList('https://jsonplaceholder.typicode.com/users');
            setFetchFriends(false);
        }
    }, [fetchFriends])

    let friendListJsx: JSX.Element | undefined = undefined;
    if (user.friendList) {
        friendListJsx = (
            <ul>
                {user.friendList.map((friend)=> <li key={friend}>{friend}</li>)}
            </ul>
        )
    }

    return (
        <CenterContent>
            <p>
                Retrieved Username: {user.username ? user.username : 'No username found'}
            </p>
            <p>
                Retrieved User Message: {user.userMessage ? user.userMessage : 'No message found'}
            </p>
            <p>
                UserList
            </p>
            <Link
                to='/'
            >
                Home
            </Link>
            <h3>
                Friend List
            </h3>
            {friendListJsx ? friendListJsx : null}
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

const mapDispatchToProps: MapDispatchToProps<
    IUserListDispatchToProps,
    IUserListOwnProps
    > = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: IUserListOwnProps) => ({
    getFriendList: async (url: string) => {
        dispatch(getFriendListAction(url));
    }
})

export default connect<IUserListStateToProps, IUserListDispatchToProps, IUserListOwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(UserList);