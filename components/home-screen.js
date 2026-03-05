import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={styles.title}><Text style={{ color: '#007AFF' }}>HOME</Text>SCREEN</Text>
            <Text style={styles.subtitle}>Welcome & Enjoy!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginLeft: 15 },
    subtitle: { fontSize: 16, marginTop: 10, marginBottom: 20, textAlign: 'center' },
});

export default () => {
    return (
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    )
}