import React, { useEffect, useState } from "react";
import { getUsers, createUser, User } from "../services/userService";
import Modal from "../components/modal";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async () => {
    try {
      await createUser({
        username, email,
        role: "admin"
      });
      setIsModalOpen(false);
      setUsername("");
      setEmail("");
      fetchUsers();
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ padding: 20, flex: 1 }}>
      <h2>Users</h2>
      <button onClick={() => setIsModalOpen(true)}>Add User</button>
      {loading ? <p>Loading...</p> : (
        <table style={{ width: "100%", marginTop: 10, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th><th>Username</th><th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={isModalOpen} title="Add User" onClose={() => setIsModalOpen(false)}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />
        <button onClick={handleAddUser}>Save</button>
      </Modal>
    </div>
  );
};

export default UsersPage;
