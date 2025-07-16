'use client';

interface Props {
  user: {
    username: string;
    email: string;
    role: string;
  };
}

export default function UserInfoBlock({ user }: Props) {
  return (
    <div className="mb-10 bg-gray-800 rounded-lg p-6 max-w-xl mx-auto">
      <p><span className="font-semibold">Nom :</span> {user.username}</p>
      <p><span className="font-semibold">Email :</span> {user.email}</p>
      <p><span className="font-semibold">Rôle :</span> {user.role}</p>
    </div>
  );
}
