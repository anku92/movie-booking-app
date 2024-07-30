import React, { useState } from 'react';

const TicketGrid = ({ tickets, onDelete }) => {
    const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
    const [buttonText, setButtonText] = useState('Sort ⭳');

    const toggleSortOrder = () => {
        if (sortOrder === 'latest') {
            setSortOrder('oldest');
            setButtonText('Sort ⭱');
        } else {
            setSortOrder('latest');
            setButtonText('Sort ⭳');
        }
    };

    let sortedTickets = tickets.slice(); // Create a copy of the tickets array

    if (sortOrder === 'latest') {
        sortedTickets.sort((a, b) => new Date(b.show_date) - new Date(a.show_date));
    } else {
        sortedTickets.sort((a, b) => new Date(a.show_date) - new Date(b.show_date));
    }

    if (sortedTickets.length === 0) {
        return (
            <div className="container">
                <p className='text-white text-center'>No booking history available.</p>
            </div>
        );
    }

    const handleDelete = (ticketId) => {
        onDelete(ticketId);
    };

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={toggleSortOrder}>
                {buttonText}
            </button>

            {sortedTickets.map((ticket, i) => {
                const formattedDate = ticket.show_date.split('-').reverse().join('-');
                const sortedSeat = ticket.seats.toString().split(',').join(', ')
                return (
                    <div key={ticket.id} className="card mb-4">
                        <div className="card-header bg-secondary text-white">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-md-auto">
                                    <h6 className="card-text font-weight-bold">TICKET ID #{ticket.id}</h6>
                                </div>
                                <div className="col-md-auto">
                                    <span className='font-weight-bold'>DATE: </span>
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="text-uppercase">
                                <span className='font-weight-bold'>Cinema: </span>
                                {ticket.cinema}
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="text-uppercase">
                                        <span className='font-weight-bold'>Movie: </span>
                                        {ticket.movie}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-9">
                                    <div className="text-left text-uppercase">
                                        <strong>Seats: </strong>{sortedSeat}
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="text-left text-uppercase">
                                        <span className='font-weight-bold'>Time: </span>{ticket.schedule.slice(0, 5)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center card-footer">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <div className='my-2'>

                                        <span className='font-weight-bold'>Total: &nbsp;</span>
                                        &#8377;
                                        {ticket.ticket_price}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-danger" onClick={() => handleDelete(ticket.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TicketGrid;
