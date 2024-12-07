import React, { useEffect, useState } from "react";

const InstituteDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("officer-token");
      try {
        const response = await fetch("/api/institute/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data);
          setStudentId(data.AppID);
        } else {
          console.error("Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("officer-token");
      const response = await fetch(`/api/institute/applications/${id}/accept`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        alert("Application accepted successfully.");
      } else {
        alert("Failed to accept the application.");
      }
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("officer-token");
      const response = await fetch(`/api/institute/applications/${id}/reject`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        alert("Application rejected successfully.");
      } else {
        alert("Failed to reject the application.");
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Institute Dashboard</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Application ID</th>
            <th className="border border-gray-300 px-4 py-2">SID</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Father's Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="border border-gray-300 px-4 py-2">{app.AppID}</td>
              <td className="border border-gray-300 px-4 py-2">{app.sid}</td>
              <td className="border border-gray-300 px-4 py-2">{app.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{app.fatherName}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                  onClick={() => handleAccept(app._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(app._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstituteDashboard;
