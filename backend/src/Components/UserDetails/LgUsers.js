import React, { useEffect, useState, useRef } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import LgUser from '../User/LgUser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Lguser.css';

const URL = 'http://localhost:5000/lgusers';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function LgUsers() {
  const [lgusers, setLgusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const componentRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setLgusers(data.lgusers));
  }, []);

  const handleDownloadPDF = () => {
    const input = componentRef.current;
    if (!input) {
      console.error("No printable content found!");
      return;
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Log_in_Users_Report.pdf');
      alert("Report Successfully Downloaded!");
    });
  };

  const filteredLgUsers = lgusers.filter(user =>
    user.lgname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLgUsers = filteredLgUsers.sort((a, b) => {
    return sortOrder === 'asc' ? a.lgage - b.lgage : b.lgage - a.lgage;
  });

  const handleSendReport = () => {
    const phoneNumber = "+94781478433";
    const message = "Selected User Reports";
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div>
      <Nav />
      <h1>User Details</h1>

      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="asc">Age: Low to High</option>
          <option value="desc">Age: High to Low</option>
        </select>
      </div>

      <div ref={componentRef}>
        <h2>Log in Users Report</h2>

        <div className="user-table">
          <div className="user-row header">
            <div className="user-cell">Name</div>
            <div className="user-cell">Gmail</div>
            <div className="user-cell">Age</div>
            <div className="user-cell">Mobile</div>
            <div className="user-cell address-cell">Address</div>
            <div className="user-cell actions-cell">Actions</div>
          </div>

          {sortedLgUsers.length > 0 ? (
            sortedLgUsers.map((lguser, i) => (
              <div key={i} className="user-card">
                <LgUser lguser={lguser} />
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>

      <button onClick={handleDownloadPDF} className="download-btn">
        Download Report
      </button>
      <button onClick={handleSendReport} className="send-btn">
        Send Report
      </button>
    </div>
  );
}

export default LgUsers;
