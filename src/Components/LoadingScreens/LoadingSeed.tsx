import LottieView from 'lottie-react-native';
import React from 'react';


const LoadingSeed = () => {
    return <LottieView source={require('./loadingseed.json')} autoPlay loop />
}

export default LoadingSeed;
