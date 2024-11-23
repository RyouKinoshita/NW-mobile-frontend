import { Platform } from 'react-native'



let baseURL = '';

{Platform.OS == 'android'

// ? baseURL = 'http://192.168.1.57:8080/api/v1'
// : baseURL = 'http://192.168.1.57:8080/api/v1'


// ? baseURL = 'http://172.20.10.2:8080/api/v1'
// : baseURL = 'http://172.20.10.2:8080/api/v1'

// ? baseURL = 'http://192.168.55.106:8080/api/v1'
// : baseURL = 'http://192.168.55.106:8080/api/v1'

// ? baseURL = 'http://192.168.69.104:8080/api/v1'
// : baseURL = 'http://192.168.69.104:8080/api/v1'

? baseURL = 'https://nw-mobile-backend.onrender.com/api/v1'
: baseURL = 'https://nw-mobile-backend.onrender.com/api/v1'
}
export default baseURL;