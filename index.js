const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-token', (req, res) => {
    try {
        const { APP_ID, APP_CERTIFICATE, channelName, uid, role } = req.body;

        // Validation des données
        if (!APP_ID || !APP_CERTIFICATE || !channelName || !uid || !role) {
            return res.status(400).json({ error: 'Missing parameters. Please provide APP_ID, APP_CERTIFICATE, channelName, uid, and role.' });
        }

        // Vérification du type de rôle
        let roleConstant;
        if (role === 'publisher') {
            roleConstant = RtcRole.PUBLISHER;
        } else if (role === 'subscriber') {
            roleConstant = RtcRole.SUBSCRIBER;
        } else {
            return res.status(400).json({ error: 'Invalid role. Role must be either "publisher" or "subscriber".' });
        }

        // Tentative de génération du token
        const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, roleConstant, 3600);

        // Si le token est bien généré, renvoyer une réponse réussie
        return res.json({ token });

    } catch (error) {
        console.error('Error generating token:', error);
        
        // Gestion des erreurs serveur internes
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
