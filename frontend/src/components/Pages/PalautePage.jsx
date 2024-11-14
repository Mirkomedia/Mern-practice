import React, { useState, useEffect } from 'react';

const Palaute = () => {
    const [loading, setLoading] = useState(true);
    const [palaute, setPalaute] = useState([]);

    useEffect(() => {
        const fetchPalaute = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/palaute/`);
                const data = await response.json();

                if (!response.ok) {
                    window.alert('Error retrieving data');
                } else {
                    // Ensure we only set 'palaute' if 'data' is an array
                    setPalaute(Array.isArray(data.data) ? data.data : []);
                }
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPalaute();
    }, []);

    const renderPalaute = () => {
        // Confirm that 'palaute' is an array before mapping
        return Array.isArray(palaute) && palaute.length > 0 ? (
            palaute.map((palauteItem) => (
                <div className='header-box'>
              <div key={palauteItem._id}>
                    <p>{palauteItem.palaute}</p>
                    <p>{new Date(palauteItem.createdAt).toLocaleString()}</p>
                </div>
                </div>
            ))
        ) : (
            <p>No feedback available</p>
        );
    };

    return (
        <div>
            {loading ? <p>Loading...</p> : renderPalaute()}
        </div>
    );
};

export default Palaute;
