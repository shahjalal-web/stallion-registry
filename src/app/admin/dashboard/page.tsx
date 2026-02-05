/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Stallion = {
  _id: string;
  registeredName: string;
  countryOfStanding: string;
  owner: { name: string; email: string };
  approved: boolean;
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "stallions">("users");
  const [users, setUsers] = useState<User[]>([]);
  const [stallions, setStallions] = useState<Stallion[]>([]);

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  useEffect(() => {
    fetchUsers();
    fetchStallions();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch("https://stallion-registry-back-end.vercel.app/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  const fetchStallions = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch("https://stallion-registry-back-end.vercel.app/admin/stallions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setStallions(data);
  };

  const deleteUser = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`https://stallion-registry-back-end.vercel.app/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const deleteStallion = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`https://stallion-registry-back-end.vercel.app/admin/stallions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStallions();
  };

  const toggleApproval = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`https://stallion-registry-back-end.vercel.app/admin/stallions/approve/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStallions();
  };

  const filteredUsers = users.filter((u) => u._id !== adminUser._id);
  const approved = stallions.filter((s) => s.approved);
  const pending = stallions.filter((s) => !s.approved);

  return (
    <div className="p-8 text-white space-y-6 bg-black min-h-screen">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-4">
        <button onClick={() => setTab("users")} className="tab-btn">Users</button>
        <button onClick={() => setTab("stallions")} className="tab-btn">Stallions</button>
      </div>

      {tab === "users" && (
        <section>
          <h2 className="text-lg font-semibold mb-3">All Users</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "stallions" && (
        <section className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-green-400">Approved Stallions</h2>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Owner</th><th>Country</th><th>Actions</th></tr></thead>
              <tbody>
                {approved.map((s) => (
                  <tr key={s._id}>
                    <td>{s.registeredName}</td>
                    <td>{s.owner?.name}</td>
                    <td>{s.countryOfStanding}</td>
                    <td className="flex gap-2">
                      <button className="delete-btn" onClick={() => deleteStallion(s._id)}>Delete</button>
                      <button className="approve-btn" onClick={() => toggleApproval(s._id)}>Unapprove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">Pending Approval</h2>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Owner</th><th>Country</th><th>Actions</th></tr></thead>
              <tbody>
                {pending.map((s) => (
                  <tr key={s._id}>
                    <td>{s.registeredName}</td>
                    <td>{s.owner?.name}</td>
                    <td>{s.countryOfStanding}</td>
                    <td className="flex gap-2">
                      <button className="delete-btn" onClick={() => deleteStallion(s._id)}>Delete</button>
                      <button className="approve-btn" onClick={() => toggleApproval(s._id)}>Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <style jsx>{`
        .tab-btn { padding: 8px 14px; border: 1px solid #d4af37; }
        .admin-table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #333; padding: 10px; }
        .delete-btn { background: #991b1b; padding: 6px 10px; }
        .approve-btn { background: #15803d; padding: 6px 10px; }
      `}</style>
    </div>
  );
}
