// api.js
const apiUrl = 'http://localhost:8000/api'; // Обновите порт, если он отличается

export const getChats = () => {
    return fetch(`${apiUrl}/chats/`)
        .then(response => response.json());
};

export const getMessages = (chatId) => {
    return fetch(`${apiUrl}/chats/${chatId}/messages/`)
        .then(response => response.json());
};

// api.js
export async function sendMessage(chatId, message) {
    try {
        const response = await fetch(`${apiUrl}/chats/${chatId}/messages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return response;
    } catch (error) {
        // Return an error object with a response property
        return {
            error: {
                response: {
                    status: error.code || 500,
                    statusText: error.message || 'Unknown error',
                },
            },
        };
    }
}



