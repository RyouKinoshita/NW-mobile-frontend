import { Platform } from 'react-native'



let baseURL = '';

{Platform.OS == 'android'

? baseURL = 'http://192.168.1.57:8080/api/v1'
: baseURL = 'http://192.168.1.57:8080/api/v1'

// ? baseURL = 'http://192.168.55.106:8080/api/v1'
// : baseURL = 'http://192.168.55.106:8080/api/v1'

}

export default baseURL;