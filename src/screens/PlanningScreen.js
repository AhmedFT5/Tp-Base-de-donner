import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
// Utilisation d'Axios comme recommandé page 7 [cite: 201]
import axios from 'axios';

export default function PlanningScreen({ route, navigation }) {
    const { userName } = route.params;
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState(null);

    // URL fournie dans l'énoncé [cite: 549]
    const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=33.6&longitude=-7.6&daily=precipitation_sum&timezone=auto";

    const checkWeather = () => {
        setLoading(true);
        setAdvice(null);

        // Appel API avec Axios [cite: 209]
        axios.get(API_URL)
            .then(response => {
                // Récupération de la pluie prévue aujourd'hui (index 0)
                const rain = response.data.daily.precipitation_sum[0];
                
                // Règle métier [cite: 543-546]
                if (rain > 0) {
                    setAdvice(`Pluie prévue (${rain}mm) : \n🏀 Il est conseillé de jouer au BASKET (salle).`);
                } else {
                    setAdvice(`Pas de pluie : \n⚽ Vous pouvez planifier un match de FOOTBALL.`);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setAdvice("Erreur lors de la récupération météo.");
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bonjour {userName}</Text>
            <Text style={styles.subtitle}>Planifier une activité</Text>
            
            <View style={styles.box}>
                <Button title="Vérifier Météo & Sport" onPress={checkWeather} />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            
            {advice && (
                <Text style={styles.result}>{advice}</Text>
            )}

            <Button title="Déconnexion" color="red" onPress={() => navigation.replace('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 18, marginBottom: 30 },
    box: { marginBottom: 20, width: '100%' },
    result: { fontSize: 18, fontWeight: 'bold', marginVertical: 20, textAlign: 'center', color: '#333', padding: 10, backgroundColor: '#eee', borderRadius: 8 }
});