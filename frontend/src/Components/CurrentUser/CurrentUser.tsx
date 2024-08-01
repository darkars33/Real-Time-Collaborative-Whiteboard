import React from 'react';

interface User {
  name: string;
}

interface CurrentUserProps {
  presentUser: User;
}

const CurrentUser: React.FC<CurrentUserProps> = ({ presentUser }) => {
  return (
    <div className='p-2 border rounded shadow gap-2 position-relative mt-2'>
      <h1>{presentUser.name}</h1>
    </div>
  );
}

export default CurrentUser;
