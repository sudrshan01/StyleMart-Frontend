import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  updateUserAdmin,
} from "../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const [filterRole, setFilterRole] = useState("ALL"); // New state for filter

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Apply role filter whenever users or filterRole changes
    if (filterRole === "ALL") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((u) => u.role === filterRole));
    }
  }, [users, filterRole]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Start editing
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setUpdatedRole(user.role);
  };

  // ✅ Cancel editing
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setUpdatedRole("");
  };

  // ✅ Update user role
  const handleUpdate = async (userId) => {
    try {
      await updateUserAdmin(userId, { role: updatedRole }); // Only update role
      alert("User role updated successfully!");
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user role!");
    }
  };

  // ✅ Delete user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user!");
      }
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-3">
      <h4 className="mb-3">All Users</h4>

      {/* Role Filter */}
      <div className="mb-3">
        <label htmlFor="roleFilter" className="form-label me-2">
          Filter by Role:
        </label>
        <select
          id="roleFilter"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="form-select form-select-sm w-auto d-inline-block"
        >
          <option value="ALL">All</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="SELLER">SELLER</option>
          <option value="MANAGER">MANAGER</option>
        </select>
      </div>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber || "-"}</td>

                {/* Editable Role */}
                <td>
                  {editingUserId === user.id ? (
                    <select
                      value={updatedRole}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                      className="form-select form-select-sm"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                      <option value="SELLER">SELLER</option>
                      <option value="MANAGER">MANAGER</option>
                    </select>
                  ) : (
                    <span
                      className={`badge ${
                        user.role === "ADMIN"
                          ? "bg-danger"
                          : user.role === "SELLER"
                          ? "bg-warning text-dark"
                          : user.role === "MANAGER"
                          ? "bg-info text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  )}
                </td>

                <td>{user.gender || "-"}</td>

                {/* Action Buttons */}
                <td>
                  {editingUserId === user.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
