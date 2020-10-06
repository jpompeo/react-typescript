import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface UserListOwnProps {

}

// const ComponentName: ComponentType<PropsInterface> = (): ReturnType => {}
export const UserList: React.FC<UserListOwnProps> = (): JSX.Element => {
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