import { Platform } from 'react-native'



let baseURL = '';

{Platform.OS == 'android'

// ? baseURL = 'http://192.168.55.101:8080/api/v1'
// : baseURL = 'http://192.168.55.101:8080/api/v1'

// ? baseURL = 'http://192.168.137.55:8080/api/v1'
// : baseURL = 'http://192.168.137.55:8080/api/v1'

? baseURL = 'http://192.168.0.14:8080/api/v1'
: baseURL = 'http://192.168.0.14:8080/api/v1'
}

export default baseURL;