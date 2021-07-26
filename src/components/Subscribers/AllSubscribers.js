import React from 'react'

const AllSubscribers = ({mail}) => {
    return (
        <div className="block w-full overflow-x-auto">
            {mail.length !== 0 ? (
               <div>
                    <h1>Subscribers</h1>
                <ul>
                    {mail.map((mail, idx) => (
                        <li key={idx}>
                            {mail.email}
                        </li>
                    ))}
                </ul>
               </div>
            ) : (
                <h2>There are no subscribers</h2>
            )}
        </div>
    )
}

export default AllSubscribers