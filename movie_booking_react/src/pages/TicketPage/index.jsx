import React, { useState, useEffect } from 'react';
import TicketGrid from '../../components/TicketGrid';
import Navbar from '../../components/Navbar';
import './TicketPage.css';
import Endpoints from '../../api/Endpoints';

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const userId = localStorage.getItem('user_id');

                const response = await fetch(`${Endpoints.USERS}${userId}/tickets`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTickets(data);
                } else {
                    console.error('Failed to fetch tickets');
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [notifications]); // Dependency updated

    const handleDeleteTicket = async (ticketId) => {
        try {
            const token = localStorage.getItem('access_token');
            const userId = localStorage.getItem('user_id');

            const response = await fetch(`${Endpoints.USERS}${userId}/tickets/${ticketId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setTickets(tickets.filter(ticket => ticket.id !== ticketId));
                const newNotification = { id: ticketId, message: 'Ticket deleted' };
                setNotifications(prev => [...prev, newNotification]);

                // Remove the notification after 2 seconds
                setTimeout(() => {
                    setNotifications(prev => prev.filter(notification => notification.id !== ticketId));
                }, 2000);
            } else {
                console.error('Failed to delete ticket');
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="tickets-container">
                    {notifications.map(notification => (
                        <div key={notification.id} className="row justify-content-center">
                            <div style={{ position: 'fixed', zIndex: '100', bottom: '10px' }} className="alert alert-danger">
                                {notification.message}
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <h2 className="text-left movie-header">Ticket History</h2>
                            <hr style={{ border: "1px solid #31D7A9" }} />

                            {loading ? (
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <span className='text-primary spinner-border'></span>
                                </div>
                            ) : (
                                <TicketGrid tickets={tickets} onDelete={handleDeleteTicket} />
                            )}
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default TicketPage;