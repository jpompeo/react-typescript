import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

interface AppOwnProps {
    username: string | undefined;
    userType: 'admin' | 'moderator' | 'user' | 'guest';
}

const App: React.FC<AppOwnProps> = ({userType, username}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('');

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date(Date.now()));
        }, 1000)

        return () => {
            clearInterval(timer);
        }
    }, [username]);

  return (
      <div className={"App"}>
          <p>
            Hi, {username ? username : 'Mysterious Entity'}, your user type is {username ? userType : 'irrelevant because I do not know you'}.
          </p>

          <p>
              {time.toUTCString()}
          </p>
          <input
            type='text'
            placeholder='Enter your message here'
            value={message}
            onChange={handleTextChange}
          />
          <p>
              Your message: {message || ''}
          </p>
          <Link
            to='/userlist'
          >
              User List
          </Link>
      </div>
  )
}

export default App;
