import UserService from '../services/UserService'

const UseUser = (props) => {

    const register = (payload) => {
        UserService.create(payload)
            .then(res => {
                console.log(res.data)
            })
    }

    const login = (payload) => {
        UserService.login(payload)
            .then((res) => {
                //console.log('login', res)

                sessionStorage.setItem('isAuth', true);
                sessionStorage.setItem('accessToken', res.data.accessToken)
                sessionStorage.setItem('refreshToken', res.data.refreshToken)
                sessionStorage.setItem('user', res.data.user)
                //dispatch({ type: 'SET_TOKENS', payload: res.data })
                //props.history.push('/auth')
                //window.location.reload(true);
                window.location.href = "/main"; 

            })
            .catch(err => {
                console.log(err)
            })
    }


    const logout = async () => {
        await UserService.logout()
            .then(() => {
                sessionStorage.removeItem('isAuth')
                sessionStorage.removeItem('accessToken')
                sessionStorage.removeItem('refreshToken')
                window.location.href = "/";
                //dispatch({type:'SET_TOKENS', })
            })
    }


    return [login, register, logout]
}
export default UseUser