import { User } from '../schemas';
import React from 'react';
import { Card, Email, Name, Phone, Website } from '@/styled/userCard';

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = React.memo(({ user }: Props) => {
  return (
    <Card>
      <Name>
        {user.name} (@{user.username})
      </Name>
      <Email>{user.email}</Email>
      <Phone>{user.phone}</Phone>
      <Website>{user.website}</Website>
    </Card>
  );
});

export default UserCard;
