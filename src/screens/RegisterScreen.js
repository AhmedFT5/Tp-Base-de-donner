import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { initDB, registerUser } from '../database/database';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Initialisation de la BDD au chargement du composant
    useEffect(() => {
        const prepareDB = async () => {
            await initDB();
        };
        prepareDB();
    }, []);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Erreur", "Veuillez tout remplir");
            return;
        }

        const result = await registerUser(name, email, password);
        if (result.success) {
            Alert.alert("Succès", "Inscription réussie !");
            navigation.navigate('Login');
        } else {
            Alert.alert("Erreur", "Problème lors de l'inscription");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inscription</Text>
            <TextInput placeholder="Nom" style={styles.input} onChangeText={setName} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} onChangeText={setPassword} />
            <Button title="S'enregistrer" onPress={handleRegister} />
            <Button title="Aller à la connexion" onPress={() => navigation.navigate('Login')} color="gray" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    header: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});