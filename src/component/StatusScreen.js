import React, { useState } from 'react';


const StatusScreen = props => {
    const [user, setUser] = useState(props.user)
  
    const submit = e => {
      e.preventDefault()
      fetch('/api/work_order/05881777', {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: { 'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(res => res.json())
        .then(json => setUser(json.user))
    }
  
    return (
      <form onSubmit={submit}>
        <input
          type="text"
          name="user[delay_reason]"
          value={user.statusdata.delay_reason}
          onChange={e => setUser({ ...user, delay_reason: e.target.value })}
        />
        {user.errors.name && <p>{user.errors.name}</p>}
  
        <input
          type="text"
          name="user[explanation]"
          value={user.explanation}
          onChange={e => setUser({ ...user, explanation: e.target.value })}
        />
        {user.errors.name && <p>{user.errors.name}</p>}
  
        <input type="submit" name="Sign Up" />
      </form>
    )
  }
  export default StatusScreen