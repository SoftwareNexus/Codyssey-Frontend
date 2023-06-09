import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthInstance } from '@Api/axios';

interface User {
  github_id: string;
  created: boolean;
  access_token: string;
}

const AuthHandler = () => {
  const [user, setUser] = useState<User>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const GetAccessToken = async () => {
      try {
        const res = await AuthInstance.get(`?code=${searchParams.get('code')}`);
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    GetAccessToken();
  }, []);
  return (
    <div>
      <div>{user?.github_id}</div>
      <div>{user?.created}</div>
      <div>{user?.access_token}</div>
    </div>
  );
};

export default AuthHandler;
