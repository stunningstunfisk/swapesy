import * as React from 'react';
import { View, Text } from 'react-native';

const UserProfile = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the User Profile.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>User Profile</Text>
        </View>
    );
}

export default UserProfile;