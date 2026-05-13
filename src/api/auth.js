export const auth = async (phoneNumber) => {
    const response = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            phone: {phoneNumber} 
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
    }

    return await response.json();
};