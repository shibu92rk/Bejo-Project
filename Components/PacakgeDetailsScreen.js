import React, { useState, useEffect } from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const PacakgeDetailsScreen = ({ route, navigation }) => {
    const [rName, setRName] = useState(null);
    const [rPhNo, setRPhNo] = useState(null);
    const [instructions, setInstructions] = useState(null);
    const [size, setSize] = useState(null);

    const params = route.params;

    const handleNextPress = () => {
        if (!rName) {
            alert('Please fill Receiver Name');
            return;
        }
        if (!rPhNo) {
            alert('Please fill Phone Number');
            return;
        }
        if (!size) {
            alert('Please select package type');
            return;
        }
        navigation.navigate(
            'Payment',
            {
                rName: rName,
                phone: rPhNo,
                instructions: instructions,
                type: size,
                ...params
            },

        );
    }
    const data = [
        { label: 'Small (2lb)' },
        { label: 'Medium (5lb)' },
        { label: 'Large (10lb)' }
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionRowStyle}>
                        <Text style={styles.labelStyle}>Receiver's Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(name) =>
                                setRName(name)
                            }
                            placeholderTextColor="#8b9cb5"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionRowStyle}>
                        <Text style={styles.labelStyle}>Receiver's Ph No</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(phone) =>
                                setRPhNo(phone)
                            }
                            keyboardType={'number-pad'}
                            returnKeyType={'done'}
                            underlineColorAndroid="#f000"
                            placeholderTextColor="#8b9cb5"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionColumnStyle}>
                        <Text style={styles.labelStyle}>Pacakge Type</Text>
                        <RadioButtonRN
                            data={data}
                            selectedBtn={(e) => setSize(e.label)}
                        />
                    </View>
                    <View style={styles.SectionColumnStyle}>
                        <Text style={styles.labelStyle}>Drop Off Instructions</Text>
                        <TextInput
                            style={styles.textViewStyle}
                            onChangeText={(instructions) =>
                                setInstructions(instructions)
                            }
                            multiline={true}
                            underlineColorAndroid="#f000"
                            placeholderTextColor="#8b9cb5"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleNextPress}>
                        <Text style={styles.buttonTextStyle}>NEXT</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default PacakgeDetailsScreen;

const styles = StyleSheet.create({
    SectionRowStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    SectionColumnStyle: {
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#007aff',
        borderWidth: 0,
        color: '#007aff',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    labelStyle: {
        flex: 1,
        color: 'black',
        textAlignVertical: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    textViewStyle: {
        flex: 1,
        height: 50,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    dropDownStyle: {
        flex: 1,
        top: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});