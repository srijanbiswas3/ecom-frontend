import React, { useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
const Payment = () => {
  return (
    <div>
      <h2>About</h2>
      <ul>
        <li>
          <Link to={`/history`}>History</Link>
        </li>
        <li>
          <Link to={`/team`}>Team</Link>
        </li>
        {/* Add more links for sub-routes */}
      </ul>

      <Routes>
        <Route exact path='/'>
          <div>Please select a section.</div>
        </Route>
        <Route path={`/history`}>
          <div>History Section Content</div>
        </Route>
        <Route path={`/team`}>
          <div>Team Section Content</div>
        </Route>
        {/* Add more routes for other sub-sections */}
      </Routes>
    </div>
  )
}

export default Payment