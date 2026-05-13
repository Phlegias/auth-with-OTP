export const signIn = async (phoneNumber, otp) => {
    const response = await fetch('/api/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: {phoneNumber},
            code: {otp}
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
    }

    return await response.json();
};