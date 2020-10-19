import React, { useState } from 'react'
import { View } from 'react-native'
import { Label, TextInput } from './Styles'

interface InputProps {
    title: string;
    type: string;
    maxLength: number;
    completeType: string;
    keyboard: string;
}

const Input: React.FC<InputProps> = ({title, type, maxLength, completeType, keyboard}) => {
    const [value, updateValue] = useState("")
    return (
        <View style={{width: "100%", alignItems: 'center'}}>
            <Label>{title}</Label>
            <TextInput
            maxLength={maxLength}
            autoCompleteType={completeType}
            keyboardType={keyboard}
            textContentType={type}
            onChangeText={(text) => {updateValue(text)} }
            value={value}
            />
        </View>
    )
}

export default Input;