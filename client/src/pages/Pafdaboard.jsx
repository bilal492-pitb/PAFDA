import React from 'react';
import { Container, Table } from 'react-bootstrap';
import './Pafdaboard.css';

const boardMembers = [
  { id: 1, name: ' Ms. Marriyum Aurangzeb, Senior Minister', position: 'Chairperson', status: 'Active' },
  { id: 2, name: 'Dr. Kauser Abdullah Malik', position: 'Vice Chairperson', status: 'Active' },
  { id: 3, name: 'Advisor to the Chief Minister for P&SHC', position: 'Member', status: 'Active' },
  { id: 4, name: 'Minister for Agriculture', position: 'Member', status: 'Active' },
  { id: 5, name: 'Chairman Planning and Development Board', position: 'Member', status: 'Active' },
  { id: 6, name: 'Secretary Home', position: 'Member', status: 'Active' },
  { id: 7, name: 'Secretary Finance', position: 'Member', status: 'Active' },
  { id: 8, name: 'Dr. Md. Abdul Latif', position: 'Member', status: 'Active' },
  { id: 9, name: 'Dr. Md. Abdul Malek', position: 'Member', status: 'Active' },
  { id: 10, name: 'Dr. Md. Abdul Mannan', position: 'Member', status: 'Active' },
  { id: 11, name: 'Dr. Md. Abdul Matin', position: 'Member', status: 'Active' },
  { id: 12, name: 'Dr. Md. Abdul Mazid', position: 'Member', status: 'Active' },
  { id: 13, name: 'Dr. Md. Abdul Momin', position: 'Member', status: 'Active' },
  { id: 14, name: 'Dr. Md. Abdul Momin', position: 'Member', status: 'Active' },
  { id: 15, name: 'Dr. Md. Abdul Momin', position: 'Member', status: 'Active' },
];

const Pafdaboard = () => {
  return (
    <div className="board-page">
      <Container>
        <h1 className="text-center my-4">PAFDA Board Members</h1>
        <div className="board-table-container">
          <Table hover responsive className="board-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {boardMembers.map((member) => (
                <tr key={member.id} className="board-member-row">
                  <td className="member-name">{member.name}</td>
                  <td>
                    <span className={`status-badge ${member.position.toLowerCase().replace(' ', '-')}`}>
                      {member.position}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Pafdaboard;