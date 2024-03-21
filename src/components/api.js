export async function getPawpularityScore(imagePath) {
    try {
        const response = await fetch(`http://localhost:5000/prediction-pet-score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ img_path: imagePath }) // Envoyer le chemin de l'image à l'API
        });
        const data = await response.json();
        return data.score; // Renvoie le score reçu de l'API
    } catch (error) {
        console.error('Error fetching pawpularity score:', error);
        return null; // En cas d'erreur, renvoie null ou gérer l'erreur selon vos besoins
    }
}

