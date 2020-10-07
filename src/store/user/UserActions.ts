import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
	IUser,
	UserActions,
	IUserActionTypes
} from './UserTypes';

export function saveUsername(user: IUser): IUserActionTypes {
	return {
		type: UserActions.SAVE_USERNAME,
		payload: user
	}
}

export function saveUserMessage(user: IUser): IUserActionTypes {
	return {
		type: UserActions.SAVE_USER_MESSAGE,
		payload: user
	};
}

export function getFriendList(url: string) {
	//return async (ThunkDispatch) => {}
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
		return new Promise<void>(async (resolve) => {
			try {
				const response = await fetch(url, {
					method: 'GET'
				});

				const friends = await response.json();
				if (!friends) {
					throw new Error('Could not fetch friends');
				}

				const friendList = friends.map((friend: any) => friend.name);
				dispatch(saveFriends(friendList));
			} catch (error) {
				console.log(error);
			}
		});
	};
}