import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { loginUser } from '../database/database';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const user = await loginUser(email, password);
        
        if (user) {
            // Connexion réussie : on passe à l'écran Planning avec le nom de l'user
            navigation.replace('Planning', { userName: user.name });
        } else {
            Alert.alert("Erreur", "Email ou mot de passe incorrect");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Connexion</Text>
            <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} autoCapitalize="none"/>
            <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} onChangeText={setPassword} />
            <Button title="Se connecter" onPress={handleLogin} />
            <Button title="Créer un compte" onPress={() => navigation.navigate('Register')} color="gray" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    header: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});