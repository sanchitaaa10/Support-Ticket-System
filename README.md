<h1 align="center">🎫 Customer Support Ticket Prioritization System</h1>

<p align="center">
  <strong>Domain:</strong> Customer Support Automation <br>
  <strong>Author:</strong> Sanchita Suryawanshi (B.Tech CSE | ITM Skills University) <br>
  <a href="https://github.com/sanchitaaa10" target="_blank">GitHub Profile</a>
</p>

---

<h2>🧠 Project Overview & Executive Summary</h2>

<p>
The <strong>Customer Support Ticket Prioritization System</strong> is a high-efficiency web-based platform that modernizes how customer support teams handle incoming issues.  
It provides a dual-dashboard system — one for customers to submit and track their tickets, and another for staff to manage and resolve them using a <strong>Priority Queue (PQ)</strong> data structure.  
This ensures that high-priority, time-sensitive issues are always resolved first, significantly improving service response time and operational efficiency.
</p>

---

<h2>🎯 Key Features</h2>

<ul>
  <li><strong>Dual Dashboards:</strong> Separate interfaces for Customers and Staff.</li>
  <li><strong>Priority Queue Logic:</strong> Automatic ticket sorting based on priority and timestamp.</li>
  <li><strong>Real-Time Updates:</strong> Instant synchronization using Firestore’s <code>onSnapshot()</code>.</li>
  <li><strong>Complete Ticket Lifecycle:</strong> Open → In Progress → Closed/Resolved.</li>
  <li><strong>Authentication:</strong> Secure user login and access control using Firebase Auth.</li>
  <li><strong>Responsive Design:</strong> Fully adaptable for desktop, tablet, and mobile users.</li>
</ul>

---

<h2>🧩 Core Subject Area Analysis</h2>

<h3>🔹 A. Data Structures & Algorithms (DSA) Focus: Priority Queue</h3>

<table>
<tr><th>Aspect</th><th>Details</th></tr>
<tr><td><strong>Data Structure</strong></td><td>Priority Queue implemented in JavaScript (in-memory on Staff Dashboard).</td></tr>
<tr><td><strong>Priority Order</strong></td><td>High (3) > Medium (2) > Low (1).</td></tr>
<tr><td><strong>Tie-Breaker</strong></td><td>FIFO — if two tickets have same priority, the older one is served first.</td></tr>
<tr><td><strong>Sorting Logic</strong></td><td>All tickets are fetched and sorted by priority + timestamp before display.</td></tr>
<tr><td><strong>Time Complexity</strong></td><td>Enqueue: O(nlogn), Dequeue: O(1).</td></tr>
</table>

---

<h3>🔹 B. Technology Stack</h3>

<table>
<tr><th>Component</th><th>Technology</th><th>Purpose</th></tr>
<tr><td>Frontend</td><td>HTML5, Tailwind CSS, JavaScript (ES6)</td><td>UI, responsiveness, and PQ logic implementation.</td></tr>
<tr><td>Backend/Database</td><td>Firebase Firestore</td><td>Real-time storage and retrieval of all ticket data.</td></tr>
<tr><td>Authentication</td><td>Firebase Authentication</td><td>Secure user login and role-based access (Customer/Staff).</td></tr>
<tr><td>Real-Time Sync</td><td>Firestore onSnapshot()</td><td>Instant updates across dashboards.</td></tr>
<tr><td>Hosting</td><td>Firebase Hosting / GitHub Pages / Netlify</td><td>Static site deployment.</td></tr>
</table>

---

<h2>🏗️ System Architecture & Workflows</h2>

<h3>📨 1. Ticket Submission Workflow (Customer)</h3>

| Field | Description / Action |
|-------|----------------------|
| Inputs | Name, Email, Issue Description, Priority (High/Medium/Low) |
| Action | Data is submitted and stored in Firestore |
| Auto Fields | `status = "Open"`, auto-generated `ticketID`, `created_at` timestamp |

---

<h3>🧑‍💼 2. Staff Dashboard Workflow</h3>

1. Fetches all tickets from Firestore collection (`tickets`).  
2. Passes data through the **Priority Queue** sorting algorithm.  
3. Displays tickets in strict priority order.  
4. Allows staff to update status (Open → In Progress → Closed) or delete tickets.  
5. Firestore instantly syncs updates to all connected user dashboards.

---

<h3>🗃️ 3. Firestore Database Design</h3>

| Collection | Field | Type | Description |
|-------------|--------|------|-------------|
| **tickets** | name, email | String | Customer info |
|  | issue | String | Description of problem |
|  | priority | Number (1–3) | For sorting logic |
|  | status | String | Open / In Progress / Closed |
|  | created_at | Timestamp | For FIFO sorting |
|  | id | Auto-ID | Unique ticket identifier |

---

<h2>💻 Tech Stack Summary</h2>

| Technology | Role |
|-------------|------|
| **HTML5** | Structure of Customer & Staff Dashboards |
| **Tailwind CSS** | Styling, responsive UI |
| **JavaScript (ES6)** | Logic for Priority Queue & Firestore integration |
| **Firebase Firestore** | Real-time database |
| **Firebase Authentication** | User & role-based access |
| **Firebase Hosting / Netlify** | Deployment and hosting |

---

<h2>📁 Project Structure</h2>

<pre>
TICKET_PRIORITIZATION_SYSTEM/
│
├── index.html                → Customer login & dashboard  
├── staff-dashboard.html      → Staff-side ticket management  
│
├── styles.css                → Common styles (Tailwind base)  
├── staff.css                 → Staff dashboard styles  
│
├── firebase.js               → Firebase config & initialization  
├── customer.js               → Logic for customer ticket submission  
├── staff.js                  → Logic for PQ sorting & ticket updates  
│
├── assets/                   → Icons and UI graphics  
├── README.md                 → Project documentation  
</pre>

---

<h2>🚀 How to Run Locally</h2>

<ol>
  <li>Clone the repository:</li>
  <pre><code>git clone https://github.com/sanchitaaa10/ticket_prioritization_system.git</code></pre>

  <li>Navigate to the project folder:</li>
  <pre><code>cd ticket_prioritization_system</code></pre>

  <li>Open the <strong>index.html</strong> file using VS Code’s <strong>Live Server</strong> extension.</li>

  <li>Make sure Firebase credentials are properly configured in <code>firebase.js</code>.</li>
</ol>

---

<h2>📸 Screenshots</h2>

- 🖼️ Customer Dashboard  
  ![Customer Dashboard Screenshot](https://github.com/user-attachments/assets/example-customer.png)

- 🖼️ Staff Dashboard  
  ![Staff Dashboard Screenshot](https://github.com/user-attachments/assets/example-staff.png)

---

<h2>🔐 Deployment & Security Considerations</h2>

<ul>
  <li><strong>Access Control:</strong> Staff Dashboard restricted via Firebase Auth & Firestore rules.</li>
  <li><strong>Data Integrity:</strong> Uses Firestore timestamps for consistent FIFO logic.</li>
  <li><strong>Validation:</strong> Input fields sanitized and validated on submission.</li>
  <li><strong>Hosting:</strong> Deployable on Firebase Hosting, Netlify, or GitHub Pages.</li>
</ul>

---

<h2>🔮 Future Improvements</h2>

<ul>
  <li>Role-based dashboard switching post-login (Customer ↔ Staff)</li>
  <li>Admin analytics dashboard with ticket statistics</li>
  <li>Email notifications for ticket updates</li>
  <li>Integration with AI-based sentiment analysis for auto-priority adjustment</li>
  <li>Exportable ticket reports in CSV/PDF</li>
</ul>

---

<h2>👩‍💻 Author</h2>

<p>
  <strong>Sanchita Suryawanshi</strong><br>
  B.Tech CSE | ITM Skills University <br>
  🔗 <a href="https://github.com/sanchitaaa10" target="_blank">github.com/sanchitaaa10</a>
</p>
